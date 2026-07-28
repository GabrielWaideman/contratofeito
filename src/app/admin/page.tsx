'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Home, Star, EyeOff, TrendingUp } from 'lucide-react'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    total: 0,
    featured: 0,
    drafts: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/properties')
      .then(res => res.json())
      .then(data => {
        if(Array.isArray(data)) {
          setStats({
            total: data.length,
            featured: data.filter(p => p.isFeatured).length,
            drafts: data.filter(p => !p.isPublished).length,
          })
        }
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Dashboard</h1>
        <p className="text-gray-500 mt-1">Visão geral do seu catálogo de imóveis.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 bg-brand-50 text-brand-600 rounded-xl flex items-center justify-center">
            <Home size={28} />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">Total de Imóveis</p>
            <p className="text-3xl font-black text-gray-900 leading-none mt-1">
              {loading ? '...' : stats.total}
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 bg-amber-50 text-amber-500 rounded-xl flex items-center justify-center">
            <Star size={28} />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">Em Destaque</p>
            <p className="text-3xl font-black text-gray-900 leading-none mt-1">
              {loading ? '...' : stats.featured}
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 bg-gray-50 text-gray-500 rounded-xl flex items-center justify-center">
            <EyeOff size={28} />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">Rascunhos (Ocultos)</p>
            <p className="text-3xl font-black text-gray-900 leading-none mt-1">
              {loading ? '...' : stats.drafts}
            </p>
          </div>
        </div>

      </div>

      <div className="bg-brand-600 text-white rounded-2xl p-8 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute -right-10 -top-10 text-white/10">
          <TrendingUp size={200} />
        </div>
        <div className="relative z-10">
          <h2 className="text-2xl font-black mb-2">Pronto para publicar mais?</h2>
          <p className="text-brand-100 font-medium max-w-md">Mantenha seu catálogo sempre atualizado para atrair mais clientes e fechar mais negócios.</p>
        </div>
        <Link 
          href="/admin/imoveis/novo"
          className="relative z-10 bg-white text-brand-600 hover:bg-gray-50 font-bold py-4 px-8 rounded-xl shadow-md hover:shadow-lg transition-all text-center whitespace-nowrap"
        >
          Adicionar Novo Imóvel
        </Link>
      </div>

    </div>
  )
}
