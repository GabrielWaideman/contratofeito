import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prismaClient'
import { getSessionFromRequest } from '@/lib/auth'

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = getSessionFromRequest(request)
    if (!session) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const id = Number(params.id)
    if (isNaN(id)) {
      return NextResponse.json({ error: 'ID inválido' }, { status: 400 })
    }

    const body = await request.json()
    const status = body.status === 'ATENDIDO' ? 'ATENDIDO' : 'PENDENTE'

    const updated = await prisma.evaluationRequest.update({
      where: { id },
      data: { status },
    })

    return NextResponse.json(updated)
  } catch (error) {
    console.error('Update evaluation request status error:', error)
    return NextResponse.json({ error: 'Erro ao atualizar status' }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = getSessionFromRequest(request)
    if (!session) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const id = Number(params.id)
    if (isNaN(id)) {
      return NextResponse.json({ error: 'ID inválido' }, { status: 400 })
    }

    await prisma.evaluationRequest.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete evaluation request error:', error)
    return NextResponse.json({ error: 'Erro ao excluir solicitação' }, { status: 500 })
  }
}

