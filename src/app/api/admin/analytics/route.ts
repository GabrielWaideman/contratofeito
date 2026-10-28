import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prismaClient'
import { getSessionFromRequest } from '@/lib/auth'

export const dynamic = 'force-dynamic'

// ─── Fuso horário ─────────────────────────────────────────────────────────────
// O servidor (Vercel) roda em UTC. Para que "hoje", "semana" e "mês" sigam o dia
// do Brasil (Brasília, UTC-3, sem horário de verão), deslocamos os horários em -3h
// e lemos os campos com os getters UTC.
const BRT_OFFSET_MS = -3 * 60 * 60 * 1000
const DAY_MS = 24 * 60 * 60 * 1000

const PT_DAYS   = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
const PT_MONTHS = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']

type Row = { day: number; year: number; month: number; visitorId: string }
type Point = { label: string; date?: string; count: number; views: number }

const dayNumberOf = (ms: number) => Math.floor((ms + BRT_OFFSET_MS) / DAY_MS)
const weekdayOf   = (dayNum: number) => (dayNum + 4) % 7            // 0 = Dom (dia 0 da época era quinta)
const mondayOf    = (dayNum: number) => dayNum - ((weekdayOf(dayNum) + 6) % 7)
const pad         = (n: number) => n.toString().padStart(2, '0')
const fmtDate     = (dayNum: number) => {
  const d = new Date(dayNum * DAY_MS)
  return `${pad(d.getUTCDate())}/${pad(d.getUTCMonth() + 1)}`
}

/** count = visitantes únicos | views = total de visualizações */
function summarize(rows: Row[]): { count: number; views: number } {
  const ids = new Set<string>()
  for (const r of rows) ids.add(r.visitorId)
  return { count: ids.size, views: rows.length }
}

// GET — Admin: retorna dados de analytics agregados
export async function GET(request: Request) {
  try {
    const session = getSessionFromRequest(request)
    if (!session) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })

    // Somente acessos de visitantes identificados e que não são robôs
    const raw = await prisma.pageView.findMany({
      where: { isBot: false, visitorId: { not: null } },
      select: { visitedAt: true, visitorId: true },
    })

    const rows: Row[] = raw.map(v => {
      const shifted = new Date(v.visitedAt.getTime() + BRT_OFFSET_MS)
      return {
        day:   Math.floor(shifted.getTime() / DAY_MS),
        year:  shifted.getUTCFullYear(),
        month: shifted.getUTCMonth(),
        visitorId: v.visitorId as string,
      }
    })

    const nowMs     = Date.now()
    const today     = dayNumberOf(nowMs)
    const thisWeek  = mondayOf(today)
    const nowShift  = new Date(nowMs + BRT_OFFSET_MS)
    const thisYear  = nowShift.getUTCFullYear()
    const thisMonth = nowShift.getUTCMonth()

    // ─── Totais rápidos (visitantes únicos) ───────────────────────────────────
    const total = summarize(rows)
    const todayS = summarize(rows.filter(r => r.day === today))
    const weekS  = summarize(rows.filter(r => r.day >= thisWeek && r.day <= today))
    const monthS = summarize(rows.filter(r => r.year === thisYear && r.month === thisMonth))

    // ─── Anos disponíveis ──────────────────────────────────────────────────────
    const yearsSet = new Set(rows.map(r => r.year))
    yearsSet.add(thisYear)
    const years = Array.from(yearsSet).sort((a, b) => b - a)

    // ─── Últimos 7 dias ────────────────────────────────────────────────────────
    const daily: Point[] = []
    for (let i = 6; i >= 0; i--) {
      const d = today - i
      daily.push({
        label: PT_DAYS[weekdayOf(d)],
        date:  fmtDate(d),
        ...summarize(rows.filter(r => r.day === d)),
      })
    }

    // ─── Últimas 8 semanas (segunda a domingo) ─────────────────────────────────
    const weekly: Point[] = []
    for (let i = 7; i >= 0; i--) {
      const ws = thisWeek - i * 7
      weekly.push({
        label: fmtDate(ws),
        date:  `${fmtDate(ws)} a ${fmtDate(ws + 6)}`,
        ...summarize(rows.filter(r => r.day >= ws && r.day < ws + 7)),
      })
    }

    // ─── Meses por ano ─────────────────────────────────────────────────────────
    const monthly: Record<number, Point[]> = {}
    for (const year of years) {
      monthly[year] = PT_MONTHS.map((label, month) => ({
        label,
        date: `${label}/${year}`,
        ...summarize(rows.filter(r => r.year === year && r.month === month)),
      }))
    }

    return NextResponse.json({
      totalViews:  total.count,
      todayViews:  todayS.count,
      weekViews:   weekS.count,
      monthViews:  monthS.count,
      // Visualizações de página (um mesmo visitante pode ver várias páginas)
      totalPageViews: total.views,
      todayPageViews: todayS.views,
      weekPageViews:  weekS.views,
      monthPageViews: monthS.views,
      years,
      daily,
      weekly,
      monthly,
    })
  } catch (error) {
    console.error('GET /api/admin/analytics error:', error)
    return NextResponse.json({ error: 'Erro ao buscar analytics' }, { status: 500 })
  }
}
