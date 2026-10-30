import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prismaClient'
import { loginSchema } from '@/lib/validations'
import { verifyPassword, hashPassword, needsRehash, signToken, buildSessionCookie, checkRateLimit } from '@/lib/auth'

export async function POST(request: Request) {
  try {
    // 1. Rate Limiting (por IP, proxy-aware se necessário)
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1'
    const rateLimit = checkRateLimit(ip)

    if (rateLimit.blocked) {
      return NextResponse.json(
        { error: 'Muitas tentativas falhas. Tente novamente em 15 minutos.' },
        { status: 429 }
      )
    }

    // 2. Parse JSON body
    const body = await request.json()

    // 3. Validar input via Zod
    const result = loginSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json({ error: 'Credenciais inválidas.' }, { status: 400 })
    }

    const { username, password } = result.data

    // 4. Buscar usuário via Prisma (imune a SQL injection)
    const user = await prisma.adminUser.findUnique({
      where: { username },
    })

    if (!user || !user.isActive) {
      return NextResponse.json({ error: 'Credenciais inválidas.' }, { status: 401 })
    }

    // 5. Verificar senha (bcrypt)
    const isValid = await verifyPassword(password, user.passwordHash)
    if (!isValid) {
      return NextResponse.json({ error: 'Credenciais inválidas.' }, { status: 401 })
    }

    // 6. Atualizar lastLoginAt (e restaurar hash para o custo atual, se estiver mais fraco)
    const newHash = needsRehash(user.passwordHash) ? await hashPassword(password) : null
    await prisma.adminUser.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date(), ...(newHash ? { passwordHash: newHash } : {}) },
    })

    // 7. Gerar Token e Cookie
    const token = signToken({ userId: user.id, username: user.username, role: user.role })
    const isProduction = process.env.NODE_ENV === 'production'

    // 8. Responder com cookie HTTP-Only
    const response = NextResponse.json({ success: true })
    response.cookies.set({
      name: 'cf_admin_token',
      value: token,
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 8 * 60 * 60,
      secure: isProduction,
    })

    return response
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ error: 'Erro interno no servidor.' }, { status: 500 })
  }
}
