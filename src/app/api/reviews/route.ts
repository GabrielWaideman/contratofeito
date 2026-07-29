import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prismaClient'
import { z } from 'zod'

// ─── Validação do POST público ────────────────────────────────────────────────
const reviewSchema = z.object({
  clientName: z.string().min(2, 'Nome muito curto').max(100).trim(),
  content: z.string().min(20, 'Depoimento muito curto').max(500).trim(),
  rating: z.number().int().min(1).max(5).default(5),
})

// GET — Público: retorna somente depoimentos aprovados
export async function GET() {
  try {
    const reviews = await prisma.review.findMany({
      where: { isApproved: true },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        clientName: true,
        content: true,
        rating: true,
        createdAt: true,
      },
    })
    return NextResponse.json(reviews)
  } catch (error) {
    console.error('GET /api/reviews error:', error)
    return NextResponse.json({ error: 'Erro ao buscar depoimentos' }, { status: 500 })
  }
}

// POST — Público: envia um novo depoimento (salvo como pendente)
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const result = reviewSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        { error: 'Dados inválidos', details: result.error.format() },
        { status: 400 }
      )
    }

    const { clientName, content, rating } = result.data

    await prisma.review.create({
      data: {
        clientName,
        content,
        rating,
        isApproved: false, // Aguarda aprovação do admin
      },
    })

    return NextResponse.json(
      { success: true, message: 'Depoimento enviado! Ele aparecerá após aprovação.' },
      { status: 201 }
    )
  } catch (error) {
    console.error('POST /api/reviews error:', error)
    return NextResponse.json({ error: 'Erro ao salvar depoimento' }, { status: 500 })
  }
}
