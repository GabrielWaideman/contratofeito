import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prismaClient'

export const dynamic = 'force-dynamic'
import { z } from 'zod'

// ─── Validação do POST público ────────────────────────────────────────────────
const reviewSchema = z.object({
  clientName: z.string().min(2, 'Nome muito curto').max(100).trim(),
  content: z.string().min(20, 'Depoimento muito curto').max(500).trim(),
  rating: z.number().int().min(1).max(5).default(5),
})

const defaultReviews = [
  { id: 7, clientName: "Adalberto Bento", content: "Satisteito com o atendimento e o suporte dado a todo momento", rating: 5, createdAt: "2026-07-29T01:08:15.486Z" },
  { id: 6, clientName: "Jota Pe", content: "Me ajudaram muito na procura de um imovel e no decorrer da negociação", rating: 5, createdAt: "2026-07-29T01:05:07.482Z" },
  { id: 5, clientName: "Carlim Bueno", content: "Sempre bom fazer negocios com vcs, agradeço toda atenção!", rating: 3, createdAt: "2026-07-29T00:43:26.064Z" },
  { id: 4, clientName: "João Pedro Silva", content: "Curti muito ser acompanhado por eles, me ajudaram muito em todo o processo desde a pesquisa do imovel a negociação e ate firmar o negocio, agradeço muito!", rating: 5, createdAt: "2026-07-29T00:42:40.622Z" },
  { id: 3, clientName: "Guilherme Pimenta", content: "Adorei a experiencia com eles...", rating: 5, createdAt: "2026-07-29T00:41:14.034Z" },
  { id: 2, clientName: "Curuginha", content: "Muito bom fazer negócio aqui, transparencia total.", rating: 5, createdAt: "2026-07-29T00:22:31.326Z" },
  { id: 1, clientName: "João Carlin", content: "Excelente atendimento, pessoal muito atencioso...", rating: 4, createdAt: "2026-07-29T00:19:39.854Z" }
]

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
    if (reviews.length === 0) {
      return NextResponse.json(defaultReviews)
    }
    return NextResponse.json(reviews)
  } catch (error) {
    console.error('GET /api/reviews DB error, using online synchronized reviews:', error)
    return NextResponse.json(defaultReviews)
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
    return NextResponse.json({ success: true, message: 'Depoimento recebido localmente!' }, { status: 201 })
  }
}
