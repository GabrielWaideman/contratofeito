import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prismaClient'

// POST — Público: registra um acesso de página
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const path = typeof body?.path === 'string' ? body.path.slice(0, 191) : null

    if (!path) return NextResponse.json({ ok: false }, { status: 400 })

    // Nunca rastreia rotas administrativas
    if (path.startsWith('/admin') || path.startsWith('/api')) {
      return NextResponse.json({ ok: false })
    }

    await prisma.pageView.create({ data: { path } })

    return NextResponse.json({ ok: true })
  } catch {
    // Tracking nunca deve quebrar o site
    return NextResponse.json({ ok: false })
  }
}
