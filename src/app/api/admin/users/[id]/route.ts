import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prismaClient'
import { getSessionFromRequest, requireMaster, hashPassword } from '@/lib/auth'
import { updateUserSchema } from '@/lib/validations'

// PUT /api/admin/users/[id] — Atualizar usuário (só MASTER)
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = getSessionFromRequest(request)
    if (!requireMaster(session)) {
      return NextResponse.json({ error: 'Acesso negado.' }, { status: 403 })
    }

    const userId = parseInt(params.id, 10)
    if (isNaN(userId)) {
      return NextResponse.json({ error: 'ID inválido.' }, { status: 400 })
    }

    const body = await request.json()
    const result = updateUserSchema.safeParse(body)

    if (!result.success) {
      const firstError = result.error.errors[0]?.message || 'Dados inválidos.'
      return NextResponse.json({ error: firstError }, { status: 400 })
    }

    const { username, password, role, isActive } = result.data

    // Verificar se o usuário existe
    const existing = await prisma.adminUser.findUnique({ where: { id: userId } })
    if (!existing) {
      return NextResponse.json({ error: 'Usuário não encontrado.' }, { status: 404 })
    }

    // Impedir que o MASTER rebaixe a si mesmo
    if (session!.userId === userId && role && role !== 'MASTER') {
      return NextResponse.json(
        { error: 'Você não pode rebaixar a si mesmo.' },
        { status: 400 }
      )
    }

    // Impedir que o MASTER desative a si mesmo
    if (session!.userId === userId && isActive === false) {
      return NextResponse.json(
        { error: 'Você não pode desativar sua própria conta.' },
        { status: 400 }
      )
    }

    // Se mudou o username, verificar duplicidade
    if (username && username !== existing.username) {
      const duplicate = await prisma.adminUser.findUnique({ where: { username } })
      if (duplicate) {
        return NextResponse.json({ error: 'Este nome de usuário já está em uso.' }, { status: 409 })
      }
    }

    // Montar dados de atualização
    const updateData: Record<string, unknown> = {}
    if (username) updateData.username = username
    if (role) updateData.role = role
    if (typeof isActive === 'boolean') updateData.isActive = isActive
    if (password && password.length > 0) {
      updateData.passwordHash = await hashPassword(password)
    }

    const user = await prisma.adminUser.update({
      where: { id: userId },
      data: updateData,
      select: {
        id: true,
        username: true,
        role: true,
        isActive: true,
        createdAt: true,
        lastLoginAt: true,
      },
    })

    return NextResponse.json(user)
  } catch (error) {
    console.error('Update user error:', error)
    return NextResponse.json({ error: 'Erro interno.' }, { status: 500 })
  }
}

// DELETE /api/admin/users/[id] — Remover usuário (só MASTER, não pode deletar a si mesmo)
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = getSessionFromRequest(request)
    if (!requireMaster(session)) {
      return NextResponse.json({ error: 'Acesso negado.' }, { status: 403 })
    }

    const userId = parseInt(params.id, 10)
    if (isNaN(userId)) {
      return NextResponse.json({ error: 'ID inválido.' }, { status: 400 })
    }

    // Não pode deletar a si mesmo
    if (session!.userId === userId) {
      return NextResponse.json(
        { error: 'Você não pode excluir sua própria conta.' },
        { status: 400 }
      )
    }

    // Verificar se existe
    const existing = await prisma.adminUser.findUnique({ where: { id: userId } })
    if (!existing) {
      return NextResponse.json({ error: 'Usuário não encontrado.' }, { status: 404 })
    }

    await prisma.adminUser.delete({ where: { id: userId } })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete user error:', error)
    return NextResponse.json({ error: 'Erro interno.' }, { status: 500 })
  }
}
