'use client'

import { useEffect, useState } from 'react'
import {
  ClipboardList,
  Search,
  MapPin,
  Phone,
  User,
  Home,
  FileText,
  CheckCircle2,
  Clock,
  Trash2,
  Copy,
  Check,
  Calendar,
} from 'lucide-react'

type EvaluationItem = {
  id: number
  modality: string
  name: string
  phone: string
  relation: string
  purpose: string
  category: string
  city: string
  neighborhood: string
  address: string
  totalArea: string | null
  builtArea: string | null
  bedrooms: string | null
  bathrooms: string | null
  garageSpots: string | null
  conservation: string
  documentStatus: string | null
  needsPtam: string | null
  notes: string | null
  formattedMessage: string
  status: 'PENDENTE' | 'ATENDIDO' | string
  createdAt: string
}

export default function AdminEvaluationsPage() {
  const [items, setItems] = useState<EvaluationItem[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<'TODAS' | 'PENDENTE' | 'ATENDIDO'>('TODAS')
  const [copiedId, setCopiedId] = useState<number | null>(null)

  useEffect(() => {
    fetch('/api/admin/evaluations')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setItems(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const handleToggleStatus = async (item: EvaluationItem) => {
    const nextStatus = item.status === 'ATENDIDO' ? 'PENDENTE' : 'ATENDIDO'
    const res = await fetch(`/api/admin/evaluations/${item.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: nextStatus }),
    })
    if (res.ok) {
      const updated = await res.json()
      setItems((prev) => prev.map((i) => (i.id === item.id ? updated : i)))
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Tem certeza que deseja excluir esta solicitação de avaliação?')) return
    const res = await fetch(`/api/admin/evaluations/${id}`, { method: 'DELETE' })
    if (res.ok) {
      setItems((prev) => prev.filter((i) => i.id !== id))
    }
  }

  const handleCopyMessage = (item: EvaluationItem) => {
    navigator.clipboard.writeText(item.formattedMessage || '')
    setCopiedId(item.id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const getClientWhatsappLink = (item: EvaluationItem) => {
    const digits = (item.phone || '').replace(/\D/g, '')
    const phoneWithCountry = digits.startsWith('55') ? digits : `55${digits}`
    const greeting = encodeURIComponent(
      `Olá ${item.name}! Recebemos sua solicitação de avaliação imobiliária (${item.category} em ${item.city}) pelo site da Contrato Feito.`
    )
    return `https://wa.me/${phoneWithCountry}?text=${greeting}`
  }

  const filtered = items.filter((item) => {
    if (statusFilter !== 'TODAS' && item.status !== statusFilter) return false
    if (!search.trim()) return true
    const q = search.toLowerCase().trim()
    return (
      item.name.toLowerCase().includes(q) ||
      item.phone.toLowerCase().includes(q) ||
      item.city.toLowerCase().includes(q) ||
      item.neighborhood.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q)
    )
  })

  const pendingCount = items.filter((i) => i.status !== 'ATENDIDO').length

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
            Solicitações de Avaliação
            {pendingCount > 0 && (
              <span className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-brand-600 text-white text-xs font-extrabold">
                {pendingCount} {pendingCount === 1 ? 'nova' : 'novas'}
              </span>
            )}
          </h1>
          <p className="text-gray-500 mt-1">
            Registros automáticos de clientes que preencheram o formulário de avaliação no site.
          </p>
        </div>

        {/* Filtros de status */}
        <div className="flex items-center gap-2 bg-white p-1.5 rounded-xl border border-gray-200 self-start">
          {(['TODAS', 'PENDENTE', 'ATENDIDO'] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setStatusFilter(tab)}
              className={`px-3.5 py-2 rounded-lg text-xs font-extrabold uppercase tracking-wider transition-all ${
                statusFilter === tab
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {tab === 'TODAS' ? 'Todas' : tab === 'PENDENTE' ? 'Pendentes' : 'Atendidas'}
            </button>
          ))}
        </div>
      </div>

      {/* Busca */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nome do solicitante, telefone, cidade ou bairro..."
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-brand-500 outline-none text-sm"
          />
        </div>
      </div>

      {/* Lista de Solicitações */}
      {loading ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center text-gray-400">
          Carregando solicitações de avaliação...
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center">
          <div className="w-14 h-14 rounded-2xl bg-gray-100 text-gray-400 flex items-center justify-center mx-auto mb-4">
            <ClipboardList size={28} />
          </div>
          <h3 className="text-gray-900 font-bold text-lg">Nenhuma solicitação encontrada</h3>
          <p className="text-gray-400 text-sm mt-1">
            Assim que um cliente clicar em enviar na página de Avaliações, os dados aparecerão aqui automaticamente.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {filtered.map((item) => {
            const isComplete = item.modality.toLowerCase().includes('completa')
            const isAttended = item.status === 'ATENDIDO'
            const formattedDate = new Date(item.createdAt).toLocaleString('pt-BR', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })

            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all hover:shadow-md"
              >
                {/* Topo do Card */}
                <div className="px-6 py-4 bg-gray-50/70 border-b border-gray-100 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider ${
                        isAttended
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                          : 'bg-amber-100 text-amber-800 border border-amber-200'
                      }`}
                    >
                      {isAttended ? <CheckCircle2 size={13} /> : <Clock size={13} />}
                      {isAttended ? 'Atendido' : 'Pendente'}
                    </span>

                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                        isComplete
                          ? 'bg-brand-50 text-brand-700 border border-brand-200'
                          : 'bg-blue-50 text-blue-700 border border-blue-200'
                      }`}
                    >
                      {item.modality}
                    </span>

                    <span className="inline-flex items-center gap-1.5 text-xs text-gray-500 font-medium ml-1">
                      <Calendar size={13} className="text-gray-400" />
                      {formattedDate}
                    </span>
                  </div>

                  {/* Ações Rápidas */}
                  <div className="flex flex-wrap items-center gap-2">
                    <a
                      href={getClientWhatsappLink(item)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#25D366] hover:bg-[#1ebe57] text-white text-xs font-bold shadow-sm transition-all"
                    >
                      <Phone size={13} />
                      Chamar no WhatsApp
                    </a>

                    <button
                      type="button"
                      onClick={() => handleToggleStatus(item)}
                      className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border transition-all ${
                        isAttended
                          ? 'bg-white text-gray-600 border-gray-200 hover:bg-gray-100'
                          : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-600 hover:text-white'
                      }`}
                    >
                      <CheckCircle2 size={14} />
                      {isAttended ? 'Voltar p/ Pendente' : 'Marcar Atendido'}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(item.id)}
                      className="p-2 rounded-xl text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                      title="Excluir solicitação"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                {/* Corpo do Card */}
                <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Dados Estruturados */}
                  <div className="lg:col-span-7 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                        <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1 flex items-center gap-1.5">
                          <User size={13} className="text-brand-600" />
                          Solicitante
                        </p>
                        <p className="font-extrabold text-gray-900 text-sm">{item.name}</p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          Relação: <strong className="text-gray-700">{item.relation}</strong>
                        </p>
                        <p className="text-xs text-brand-600 font-bold mt-1">{item.phone}</p>
                      </div>

                      <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                        <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1 flex items-center gap-1.5">
                          <Home size={13} className="text-brand-600" />
                          Imóvel e Finalidade
                        </p>
                        <p className="font-extrabold text-gray-900 text-sm">{item.category}</p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          Finalidade: <strong className="text-gray-700">{item.purpose}</strong>
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          Conservação: <strong className="text-gray-700">{item.conservation}</strong>
                        </p>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 space-y-2">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
                        <MapPin size={13} className="text-brand-600" />
                        Localização e Medidas
                      </p>
                      <p className="text-sm font-bold text-gray-900">
                        {item.address}, {item.neighborhood} — {item.city}
                      </p>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-600 pt-1">
                        <span>Área Total: <strong>{item.totalArea || 'Não informada'}</strong></span>
                        <span>Área Construída: <strong>{item.builtArea || 'Não informada'}</strong></span>
                        <span>Quartos: <strong>{item.bedrooms || '0'}</strong></span>
                        <span>Banheiros: <strong>{item.bathrooms || '0'}</strong></span>
                        <span>Vagas: <strong>{item.garageSpots || '0'}</strong></span>
                      </div>
                    </div>

                    {(item.documentStatus || item.needsPtam) && (
                      <div className="bg-brand-50/50 rounded-xl p-4 border border-brand-100 space-y-1">
                        <p className="text-[11px] font-bold uppercase tracking-wider text-brand-700 flex items-center gap-1.5">
                          <FileText size={13} />
                          Dados Documentais / PTAM
                        </p>
                        <p className="text-xs text-gray-700">
                          Situação Documental: <strong>{item.documentStatus}</strong>
                        </p>
                        <p className="text-xs text-gray-700">
                          Precisa de Parecer Técnico (PTAM): <strong>{item.needsPtam}</strong>
                        </p>
                      </div>
                    )}

                    {item.notes && (
                      <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                        <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1">
                          Observações do Solicitante
                        </p>
                        <p className="text-xs text-gray-700 whitespace-pre-line leading-relaxed">
                          {item.notes}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Mensagem Formatada (Idêntica ao WhatsApp) */}
                  <div className="lg:col-span-5 flex flex-col">
                    <div className="bg-gray-900 text-gray-100 rounded-xl p-4 flex-1 flex flex-col justify-between border border-gray-800">
                      <div>
                        <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-gray-800">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                            Mensagem gerada para o WhatsApp
                          </span>
                          <button
                            type="button"
                            onClick={() => handleCopyMessage(item)}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gray-800 hover:bg-gray-700 text-xs font-semibold text-gray-200 transition-colors"
                          >
                            {copiedId === item.id ? (
                              <>
                                <Check size={12} className="text-emerald-400" />
                                Copiado!
                              </>
                            ) : (
                              <>
                                <Copy size={12} />
                                Copiar texto
                              </>
                            )}
                          </button>
                        </div>

                        <pre className="text-xs text-gray-200 whitespace-pre-wrap font-sans leading-relaxed">
                          {item.formattedMessage}
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

