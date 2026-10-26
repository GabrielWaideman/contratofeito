import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prismaClient'
import { getSessionFromRequest, requireMaster, hashPassword } from '@/lib/auth'
import { createUserSchema } from '@/lib/validations'

export const dynamic = 'force-dynamic'

// GET /api/admin/users — Listar todos os usuários (só MASTER)
export async function GET(request: Request) {
  try {
    const session = getSessionFromRequest(request)
    if (!requireMaster(session)) {
      return NextResponse.json({ error: 'Acesso negado. Apenas usuários Master.' }, { status: 403 })
    }

    const users = await prisma.adminUser.findMany({
      select: {
        id: true,
        username: true,
        role: true,
        isActive: true,
        createdAt: true,
        lastLoginAt: true,
      },
      orderBy: [{ role: 'asc' }, { createdAt: 'asc' }],
    })

    return NextResponse.json(users)
  } catch (error) {
    console.error('List users error:', error)
    return NextResponse.json({ error: 'Erro interno.' }, { status: 500 })
  }
}

// POST /api/admin/users — Criar novo usuário (só MASTER)
export async function POST(request: Request) {
  try {
    const session = getSessionFromRequest(request)
    if (!requireMaster(session)) {
      return NextResponse.json({ error: 'Acesso negado. Apenas usuários Master.' }, { status: 403 })
    }

    const body = await request.json()
    const result = createUserSchema.safeParse(body)

    if (!result.success) {
      const firstError = result.error.errors[0]?.message || 'Dados inválidos.'
      return NextResponse.json({ error: firstError }, { status: 400 })
    }

    const { username, password, role, isActive } = result.data

    // Verificar duplicidade
    const existing = await prisma.adminUser.findUnique({ where: { username } })
    if (existing) {
      return NextResponse.json({ error: 'Este nome de usuário já está em uso.' }, { status: 409 })
    }

    const passwordHash = await hashPassword(password)

    const user = await prisma.adminUser.create({
      data: { username, passwordHash, role, isActive },
      select: {
        id: true,
        username: true,
        role: true,
        isActive: true,
        createdAt: true,
        lastLoginAt: true,
      },
    })

    return NextResponse.json(user, { status: 201 })
  } catch (error) {
    console.error('Create user error:', error)
    return NextResponse.json({ error: 'Erro interno.' }, { status: 500 })
  }
}
