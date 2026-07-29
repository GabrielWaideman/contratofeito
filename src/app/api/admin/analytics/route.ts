import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prismaClient'
import { getSessionFromRequest } from '@/lib/auth'

// ─── Helpers de data ──────────────────────────────────────────────────────────

function startOfDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate())
}

function startOfWeek(d: Date) {
  const day = d.getDay() // 0=dom, 1=seg...
  const diff = d.getDate() - day + (day === 0 ? -6 : 1) // segunda-feira
  return new Date(d.getFullYear(), d.getMonth(), diff)
}

function startOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), 1)
}

function addDays(d: Date, n: number) {
  return new Date(d.getTime() + n * 86400000)
}

const PT_DAYS  = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
const PT_MONTHS = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']

// GET — Admin: retorna dados de analytics agregados
export async function GET(request: Request) {
  try {
    const session = getSessionFromRequest(request)
    if (!session) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })

    // Lê todos os page views (para sites pequenos isso é viável)
    const allViews = await prisma.pageView.findMany({
      select: { visitedAt: true },
      orderBy: { visitedAt: 'asc' },
    })

    const now = new Date()

    // ─── Totais rápidos ────────────────────────────────────────────────────────
    const todayStart = startOfDay(now)
    const weekStart  = startOfWeek(now)
    const monthStart = startOfMonth(now)

    const todayViews  = allViews.filter(v => v.visitedAt >= todayStart).length
    const weekViews   = allViews.filter(v => v.visitedAt >= weekStart).length
    const monthViews  = allViews.filter(v => v.visitedAt >= monthStart).length
    const totalViews  = allViews.length

    // ─── Anos disponíveis ──────────────────────────────────────────────────────
    const yearsSet = new Set(allViews.map(v => v.visitedAt.getFullYear()))
    yearsSet.add(now.getFullYear()) // Garante o ano atual mesmo sem dados
    const years = Array.from(yearsSet).sort((a, b) => b - a)

    // ─── Últimos 7 dias ────────────────────────────────────────────────────────
    const daily: { label: string; date: string; count: number }[] = []
    for (let i = 6; i >= 0; i--) {
      const day   = startOfDay(addDays(now, -i))
      const next  = addDays(day, 1)
      const count = allViews.filter(v => v.visitedAt >= day && v.visitedAt < next).length
      daily.push({
        label: PT_DAYS[day.getDay()],
        date:  `${day.getDate().toString().padStart(2,'0')}/${(day.getMonth()+1).toString().padStart(2,'0')}`,
        count,
      })
    }

    // ─── Últimas 8 semanas ─────────────────────────────────────────────────────
    const weekly: { label: string; count: number }[] = []
    for (let i = 7; i >= 0; i--) {
      const wStart = startOfWeek(addDays(now, -i * 7))
      const wEnd   = addDays(wStart, 7)
      const count  = allViews.filter(v => v.visitedAt >= wStart && v.visitedAt < wEnd).length
      weekly.push({
        label: `${wStart.getDate().toString().padStart(2,'0')}/${(wStart.getMonth()+1).toString().padStart(2,'0')}`,
        count,
      })
    }

    // ─── Meses por ano ─────────────────────────────────────────────────────────
    const monthly: Record<number, { label: string; count: number }[]> = {}
    for (const year of years) {
      monthly[year] = PT_MONTHS.map((label, month) => {
        const mStart = new Date(year, month, 1)
        const mEnd   = new Date(year, month + 1, 1)
        const count  = allViews.filter(v => v.visitedAt >= mStart && v.visitedAt < mEnd).length
        return { label, count }
      })
    }

    return NextResponse.json({
      totalViews,
      todayViews,
      weekViews,
      monthViews,
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
