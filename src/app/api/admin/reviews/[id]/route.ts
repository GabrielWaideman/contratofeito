import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prismaClient'
import { getSessionFromRequest } from '@/lib/auth'

// PATCH — Admin: alterna o campo isApproved do depoimento
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = getSessionFromRequest(request)
    if (!session) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })

    const id = parseInt(params.id, 10)
    if (isNaN(id)) return NextResponse.json({ error: 'ID inválido' }, { status: 400 })

    const body = await request.json()
    const { isApproved } = body

    if (typeof isApproved !== 'boolean') {
      return NextResponse.json({ error: 'Campo isApproved deve ser booleano' }, { status: 400 })
    }

    const updated = await prisma.review.update({
      where: { id },
      data: { isApproved },
    })

    return NextResponse.json({ success: true, review: updated })
  } catch (error: unknown) {
    const prismaError = error as { code?: string }
    if (prismaError?.code === 'P2025') {
      return NextResponse.json({ error: 'Depoimento não encontrado' }, { status: 404 })
    }
    console.error('PATCH /api/admin/reviews/[id] error:', error)
    return NextResponse.json({ error: 'Erro ao atualizar depoimento' }, { status: 500 })
  }
}

// DELETE — Admin: exclui o depoimento permanentemente
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = getSessionFromRequest(request)
    if (!session) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })

    const id = parseInt(params.id, 10)
    if (isNaN(id)) return NextResponse.json({ error: 'ID inválido' }, { status: 400 })

    await prisma.review.delete({ where: { id } })

    return NextResponse.json({ success: true })
  } catch (error: unknown) {
    const prismaError = error as { code?: string }
    if (prismaError?.code === 'P2025') {
      return NextResponse.json({ error: 'Depoimento não encontrado' }, { status: 404 })
    }
    console.error('DELETE /api/admin/reviews/[id] error:', error)
    return NextResponse.json({ error: 'Erro ao excluir depoimento' }, { status: 500 })
  }
}
