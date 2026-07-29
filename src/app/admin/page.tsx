'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  Home, Star, EyeOff, TrendingUp, Bell, MessageSquare,
  BarChart2, Activity, Users, Calendar,
} from 'lucide-react'

// ─── Tipos ────────────────────────────────────────────────────────────────────
type BarPoint = { label: string; date?: string; count: number }

type AnalyticsData = {
  totalViews: number
  todayViews: number
  weekViews: number
  monthViews: number
  years: number[]
  daily: BarPoint[]
  weekly: BarPoint[]
  monthly: Record<number, BarPoint[]>
}

type FilterType = 'dia' | 'semana' | 'mes'

// ─── Bar Chart Component ──────────────────────────────────────────────────────
function BarChart({ data, height = 140 }: { data: BarPoint[]; height?: number }) {
  const max = Math.max(...data.map(d => d.count), 1)

  return (
    <div className="flex items-end gap-1.5 w-full" style={{ height }}>
      {data.map((bar, i) => {
        const pct = max > 0 ? (bar.count / max) * 100 : 0
        const isToday = i === data.length - 1
        return (
          <div key={i} className="flex-1 flex flex-col items-center gap-1 group relative">
            {/* Tooltip */}
            <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
              <div className="bg-gray-900 text-white text-xs font-bold px-2 py-1 rounded-lg whitespace-nowrap shadow-lg">
                {bar.count} acesso{bar.count !== 1 ? 's' : ''}
                {bar.date && <span className="font-normal text-gray-400 ml-1">({bar.date})</span>}
              </div>
              <div className="w-2 h-2 bg-gray-900 rotate-45 mx-auto -mt-1" />
            </div>
            {/* Barra */}
            <div
              className={`w-full rounded-t-md transition-all duration-500 ${
                isToday ? 'bg-brand-600' : 'bg-brand-600/30 group-hover:bg-brand-600/60'
              }`}
              style={{ height: `${Math.max(pct, bar.count > 0 ? 4 : 0)}%` }}
            />
            {/* Label */}
            <span className="text-[9px] text-gray-400 font-medium truncate max-w-full px-0.5 text-center">
              {bar.label}
            </span>
          </div>
        )
      })}
    </div>
  )
}

// ─── Dashboard Page ───────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const [stats, setStats]           = useState({ total: 0, featured: 0, drafts: 0 })
  const [pendingReviews, setPendingReviews] = useState(0)
  const [loading, setLoading]       = useState(true)
  const [reviewsLoading, setReviewsLoading] = useState(true)

  // Analytics
  const [analytics, setAnalytics]   = useState<AnalyticsData | null>(null)
  const [analyticsLoading, setAnalyticsLoading] = useState(true)
  const [filter, setFilter]         = useState<FilterType>('dia')
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear())

  useEffect(() => {
    // Imóveis
    fetch('/api/admin/properties')
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data)) {
          setStats({
            total:    data.length,
            featured: data.filter(p => p.isFeatured).length,
            drafts:   data.filter(p => !p.isPublished).length,
          })
        }
        setLoading(false)
      })
      .catch(() => setLoading(false))

    // Depoimentos pendentes
    fetch('/api/admin/reviews')
      .then(r => r.json())
      .then((data: Array<{ isApproved: boolean }>) => {
        if (Array.isArray(data)) setPendingReviews(data.filter(r => !r.isApproved).length)
        setReviewsLoading(false)
      })
      .catch(() => setReviewsLoading(false))

    // Analytics
    fetch('/api/admin/analytics')
      .then(r => r.json())
      .then(data => {
        setAnalytics(data)
        if (data.years?.length > 0) setSelectedYear(data.years[0])
        setAnalyticsLoading(false)
      })
      .catch(() => setAnalyticsLoading(false))
  }, [])

  // Dados do gráfico conforme filtro ativo — sempre retorna array
  const chartData: BarPoint[] = (() => {
    if (!analytics) return []
    if (filter === 'dia')    return analytics.daily    ?? []
    if (filter === 'semana') return analytics.weekly   ?? []
    return analytics.monthly?.[selectedYear]           ?? []
  })()

  const totalChart = chartData.reduce((s, d) => s + d.count, 0)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Dashboard</h1>
        <p className="text-gray-500 mt-1">Visão geral do site e catálogo de imóveis.</p>
      </div>

      {/* ─── Alerta de pendentes ────────────────────────────────────────────────── */}
      {!reviewsLoading && pendingReviews > 0 && (
        <Link
          href="/admin/depoimentos"
          className="flex items-start sm:items-center gap-4 bg-amber-50 border border-amber-200 rounded-2xl p-5 hover:bg-amber-100/70 transition-colors group"
        >
          <div className="relative shrink-0">
            <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center">
              <Bell size={22} />
            </div>
            <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white text-[10px] font-black rounded-full flex items-center justify-center shadow-sm">
              {pendingReviews > 9 ? '9+' : pendingReviews}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-amber-900 text-sm">
              {pendingReviews === 1 ? '1 depoimento aguarda aprovação' : `${pendingReviews} depoimentos aguardam aprovação`}
            </p>
            <p className="text-amber-700 text-xs mt-0.5">
              Clique para revisar e publicar no site.
            </p>
          </div>
          <span className="text-amber-600 font-bold text-xs whitespace-nowrap group-hover:underline shrink-0 hidden sm:block">
            Revisar agora →
          </span>
        </Link>
      )}

      {/* ─── Analytics de acessos ───────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Header do card */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-6 pt-6 pb-4 border-b border-gray-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-brand-50 text-brand-600 rounded-xl flex items-center justify-center">
              <BarChart2 size={20} />
            </div>
            <div>
              <h2 className="font-black text-gray-900 text-base">Acessos ao site</h2>
              <p className="text-gray-400 text-xs">Visitantes únicos por página</p>
            </div>
          </div>

          {/* Filtros de período */}
          <div className="flex items-center gap-2 flex-wrap">
            {(['dia', 'semana', 'mes'] as FilterType[]).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all capitalize ${
                  filter === f
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                }`}
              >
                {f === 'dia' ? 'Últimos 7 dias' : f === 'semana' ? 'Últimas 8 semanas' : 'Por mês'}
              </button>
            ))}

            {/* Seletor de ano (só aparece no filtro Mês) */}
            {filter === 'mes' && analytics && (analytics.years?.length ?? 0) > 0 && (
              <select
                value={selectedYear}
                onChange={e => setSelectedYear(Number(e.target.value))}
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-gray-100 text-gray-600 border-0 focus:outline-none focus:ring-2 focus:ring-brand-500/30 cursor-pointer"
              >
                {(analytics.years ?? []).map(y => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            )}
          </div>
        </div>

        {/* Mini stat cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-gray-100">
          {[
            { label: 'Total geral',   value: analytics?.totalViews,  icon: <Activity size={15} />,  color: 'text-brand-600'  },
            { label: 'Hoje',          value: analytics?.todayViews,  icon: <Calendar size={15} />,  color: 'text-green-600'  },
            { label: 'Esta semana',   value: analytics?.weekViews,   icon: <BarChart2 size={15} />, color: 'text-blue-600'   },
            { label: 'Este mês',      value: analytics?.monthViews,  icon: <Users size={15} />,     color: 'text-purple-600' },
          ].map(({ label, value, icon, color }) => (
            <div key={label} className="bg-white px-5 py-4">
              <div className={`flex items-center gap-1.5 mb-1 ${color}`}>
                {icon}
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">{label}</span>
              </div>
              <p className="text-2xl font-black text-gray-900">
                {analyticsLoading ? '—' : (value ?? 0).toLocaleString('pt-BR')}
              </p>
            </div>
          ))}
        </div>

        {/* Gráfico */}
        <div className="px-6 pt-6 pb-4">
          {analyticsLoading ? (
            <div className="flex items-center justify-center h-40 gap-3 text-gray-400">
              <div className="w-5 h-5 border-2 border-gray-200 border-t-brand-600 rounded-full animate-spin" />
              <span className="text-sm">Carregando dados...</span>
            </div>
          ) : chartData.length === 0 || totalChart === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 gap-2 text-gray-400">
              <BarChart2 size={32} className="text-gray-200" />
              <p className="text-sm font-medium">Nenhum acesso registrado ainda.</p>
              <p className="text-xs text-gray-300">Os dados aparecerão conforme visitantes acessam o site.</p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs text-gray-400">
                  Total no período: <span className="font-bold text-gray-700">{totalChart.toLocaleString('pt-BR')}</span> acesso{totalChart !== 1 ? 's' : ''}
                </p>
                <p className="text-xs text-gray-300">Passe o mouse sobre as barras</p>
              </div>
              <BarChart data={chartData} height={140} />
            </>
          )}
        </div>
      </div>

      {/* ─── Cards de estatísticas dos imóveis ─────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 bg-brand-50 text-brand-600 rounded-xl flex items-center justify-center">
            <Home size={28} />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">Total de Imóveis</p>
            <p className="text-3xl font-black text-gray-900 leading-none mt-1">{loading ? '...' : stats.total}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 bg-amber-50 text-amber-500 rounded-xl flex items-center justify-center">
            <Star size={28} />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">Em Destaque</p>
            <p className="text-3xl font-black text-gray-900 leading-none mt-1">{loading ? '...' : stats.featured}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 bg-gray-50 text-gray-500 rounded-xl flex items-center justify-center">
            <EyeOff size={28} />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">Rascunhos (Ocultos)</p>
            <p className="text-3xl font-black text-gray-900 leading-none mt-1">{loading ? '...' : stats.drafts}</p>
          </div>
        </div>
      </div>

      {/* ─── Ações rápidas ──────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-brand-600 text-white rounded-2xl p-8 shadow-lg flex flex-col justify-between gap-6 relative overflow-hidden">
          <div className="absolute -right-8 -top-8 text-white/10"><TrendingUp size={160} /></div>
          <div className="relative z-10">
            <h2 className="text-xl font-black mb-1">Publicar novo imóvel</h2>
            <p className="text-brand-100 text-sm font-medium">Mantenha o catálogo sempre atualizado.</p>
          </div>
          <Link href="/admin/imoveis/novo" className="relative z-10 bg-white text-brand-600 hover:bg-gray-50 font-bold py-3 px-6 rounded-xl shadow-md hover:shadow-lg transition-all text-center text-sm">
            Adicionar Imóvel
          </Link>
        </div>

        <div className="bg-gray-900 text-white rounded-2xl p-8 shadow-lg flex flex-col justify-between gap-6 relative overflow-hidden">
          <div className="absolute -right-8 -top-8 text-white/5"><MessageSquare size={160} /></div>
          <div className="relative z-10">
            <h2 className="text-xl font-black mb-1 flex items-center gap-2">
              Depoimentos
              {!reviewsLoading && pendingReviews > 0 && (
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-500 text-white text-xs font-black">
                  {pendingReviews > 9 ? '9+' : pendingReviews}
                </span>
              )}
            </h2>
            <p className="text-gray-400 text-sm font-medium">
              {reviewsLoading ? 'Carregando...' : pendingReviews > 0
                ? `${pendingReviews} ${pendingReviews === 1 ? 'pendente' : 'pendentes'} aguardando revisão.`
                : 'Nenhum depoimento pendente.'}
            </p>
          </div>
          <Link href="/admin/depoimentos" className="relative z-10 bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-xl transition-all text-center text-sm">
            Gerenciar Depoimentos
          </Link>
        </div>
      </div>
    </div>
  )
}
