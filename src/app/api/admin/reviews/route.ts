import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prismaClient'
import { getSessionFromRequest } from '@/lib/auth'

// GET — Admin: retorna TODOS os depoimentos (aprovados e pendentes)
export async function GET(request: Request) {
  try {
    const session = getSessionFromRequest(request)
    if (!session) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })

    const reviews = await prisma.review.findMany({
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(reviews)
  } catch (error) {
    console.error('GET /api/admin/reviews error:', error)
    return NextResponse.json({ error: 'Erro ao buscar depoimentos' }, { status: 500 })
  }
}
