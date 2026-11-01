import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prismaClient'
import { getSessionFromRequest } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  try {
    const session = getSessionFromRequest(request)
    if (!session) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const items = await prisma.evaluationRequest.findMany({
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(items)
  } catch (error) {
    console.error('Fetch evaluation requests error:', error)
    return NextResponse.json({ error: 'Erro ao carregar avaliações' }, { status: 500 })
  }
}

