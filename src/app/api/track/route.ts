import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prismaClient'

export const dynamic = 'force-dynamic'

// Janela em que recarregar/voltar na mesma página não conta como novo acesso
const DEDUPE_WINDOW_MS = 30 * 60 * 1000

const BOT_REGEX =
  /bot|crawl|spider|slurp|headless|lighthouse|pingdom|uptime|monitor|facebookexternalhit|whatsapp|preview|curl|wget|python-requests|axios|node-fetch|go-http-client|java\/|httpclient/i

const VISITOR_ID_REGEX = /^[A-Za-z0-9_-]{16,64}$/

// POST — Público: registra um acesso de página
export async function POST(request: Request) {
  try {
    // Em desenvolvimento local não grava, para não poluir os dados reais de produção
    // (o .env local aponta para o mesmo banco). Para testar: ALLOW_DEV_TRACKING=true
    if (process.env.NODE_ENV !== 'production' && process.env.ALLOW_DEV_TRACKING !== 'true') {
      return NextResponse.json({ ok: false, skipped: 'dev' })
    }

    const body = await request.json()
    const path = typeof body?.path === 'string' ? body.path.slice(0, 191) : null
    const visitorId =
      typeof body?.visitorId === 'string' && VISITOR_ID_REGEX.test(body.visitorId) ? body.visitorId : null

    if (!path || !path.startsWith('/') || !visitorId) {
      return NextResponse.json({ ok: false }, { status: 400 })
    }

    // Nunca rastreia rotas administrativas
    if (path.startsWith('/admin') || path.startsWith('/api')) {
      return NextResponse.json({ ok: false })
    }

    // Robôs/crawlers não entram nas estatísticas
    const userAgent = request.headers.get('user-agent') || ''
    if (!userAgent || BOT_REGEX.test(userAgent)) {
      return NextResponse.json({ ok: false, skipped: 'bot' })
    }

    // Mesmo visitante na mesma página dentro da janela = não conta de novo
    const recent = await prisma.pageView.findFirst({
      where: {
        visitorId,
        path,
        visitedAt: { gte: new Date(Date.now() - DEDUPE_WINDOW_MS) },
      },
      select: { id: true },
    })
    if (recent) return NextResponse.json({ ok: true, deduped: true })

    await prisma.pageView.create({ data: { path, visitorId } })

    return NextResponse.json({ ok: true })
  } catch {
    // Tracking nunca deve quebrar o site
    return NextResponse.json({ ok: false })
  }
}
