'use client'

import { useEffect, useState, useCallback } from 'react'
import {
  Star,
  CheckCircle2,
  XCircle,
  Trash2,
  Loader2,
  MessageSquare,
  Clock,
  ShieldCheck,
  AlertTriangle,
  Plus,
  X,
  Send,
} from 'lucide-react'

type Review = {
  id: number
  clientName: string
  content: string
  rating: number
  isApproved: boolean
  createdAt: string
}

type Filter = 'all' | 'pending' | 'approved'

// ─── Sub-componentes utilitários ─────────────────────────────────────────────

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={14}
          className={s <= rating ? 'fill-amber-400 text-amber-400' : 'fill-transparent text-gray-300'}
        />
      ))}
    </div>
  )
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

// ─── Modal para adicionar depoimento ─────────────────────────────────────────

function AddReviewModal({
  onClose,
  onSaved,
}: {
  onClose: () => void
  onSaved: (review: Review) => void
}) {
  const [name, setName]         = useState('')
  const [content, setContent]   = useState('')
  const [rating, setRating]     = useState(5)
  const [hovered, setHovered]   = useState(0)
  const [approved, setApproved] = useState(true)   // admin pode escolher publicar direto
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) { setError('Informe o nome do cliente.'); return }
    if (content.trim().length < 10) { setError('Escreva pelo menos 10 caracteres.'); return }
    setError('')
    setLoading(true)

    try {
      // Usa a rota pública de POST e depois aprova via PATCH se necessário
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clientName: name.trim(), content: content.trim(), rating }),
      })

      if (!res.ok) { setError('Erro ao salvar. Tente novamente.'); setLoading(false); return }

      // Busca o review recém-criado (último da lista admin)
      const listRes = await fetch('/api/admin/reviews')
      if (!listRes.ok) { onClose(); return }
      const list: Review[] = await listRes.json()
      const newest = list[0] // ordenado por createdAt desc

      // Se admin quiser publicar direto, aprova imediatamente
      if (approved && newest) {
        await fetch(`/api/admin/reviews/${newest.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ isApproved: true }),
        })
        onSaved({ ...newest, isApproved: true })
      } else if (newest) {
        onSaved(newest)
      }

      onClose()
    } catch {
      setError('Erro de conexão. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden border border-gray-100">
        {/* Header */}
        <div className="flex items-center justify-between px-7 pt-7 pb-5 border-b border-gray-100">
          <div>
            <h3 className="text-gray-900 font-extrabold text-xl tracking-tight">Adicionar Depoimento</h3>
            <p className="text-gray-400 text-sm mt-0.5">Cadastre um depoimento manualmente</p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-200 transition-all"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-7 py-6 space-y-5">
          {/* Nome */}
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
              Nome do cliente
            </label>
            <input
              type="text"
              placeholder="Ex: João Silva"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={100}
              className="w-full border border-gray-200 text-gray-900 text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/10 placeholder-gray-300 transition-all"
            />
          </div>

          {/* Avaliação */}
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
              Avaliação
            </label>
            <div className="flex gap-2 items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onMouseEnter={() => setHovered(star)}
                  onMouseLeave={() => setHovered(0)}
                  onClick={() => setRating(star)}
                  className="focus:outline-none transition-transform hover:scale-110"
                >
                  <Star
                    size={28}
                    className={`transition-colors ${
                      star <= (hovered || rating)
                        ? 'fill-amber-400 text-amber-400'
                        : 'fill-transparent text-gray-300'
                    }`}
                  />
                </button>
              ))}
              <span className="text-gray-400 text-sm ml-1">
                {rating === 5 ? 'Excelente!' : rating === 4 ? 'Muito bom' : rating === 3 ? 'Bom' : rating === 2 ? 'Regular' : 'Ruim'}
              </span>
            </div>
          </div>

          {/* Depoimento */}
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
              Depoimento
            </label>
            <textarea
              placeholder="Escreva o depoimento do cliente..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
              maxLength={500}
              className="w-full border border-gray-200 text-gray-900 text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/10 placeholder-gray-300 transition-all resize-none"
            />
            <p className="text-gray-300 text-xs text-right mt-1">{content.length}/500</p>
          </div>

          {/* Toggle publicar direto */}
          <div className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-gray-700">Publicar no site imediatamente</p>
              <p className="text-xs text-gray-400 mt-0.5">Aprovado direto, sem precisar revisar</p>
            </div>
            <button
              type="button"
              onClick={() => setApproved(!approved)}
              className={`relative w-11 h-6 rounded-full transition-colors focus:outline-none ${
                approved ? 'bg-brand-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                  approved ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Erro */}
          {error && (
            <p className="text-red-500 text-sm flex items-center gap-2">
              <X size={14} /> {error}
            </p>
          )}

          {/* Botões */}
          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-500 hover:text-gray-700 hover:border-gray-300 text-sm font-medium transition-all disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all hover:shadow-lg hover:shadow-brand-600/20 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <><Loader2 size={15} className="animate-spin" /> Salvando...</>
              ) : (
                <><Send size={15} /> Salvar Depoimento</>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// ─── Página principal ─────────────────────────────────────────────────────────

export default function AdminDepoimentosPage() {
  const [reviews, setReviews]           = useState<Review[]>([])
  const [loading, setLoading]           = useState(true)
  const [filter, setFilter]             = useState<Filter>('all')
  const [actionLoading, setActionLoading] = useState<number | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null)
  const [toast, setToast]               = useState<{ msg: string; type: 'success' | 'error' } | null>(null)
  const [showAddModal, setShowAddModal] = useState(false)

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3500)
  }

  const fetchReviews = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/reviews')
      if (res.ok) setReviews(await res.json())
    } catch {
      showToast('Erro ao carregar depoimentos.', 'error')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchReviews() }, [fetchReviews])

  const handleToggleApproval = async (review: Review) => {
    setActionLoading(review.id)
    try {
      const res = await fetch(`/api/admin/reviews/${review.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isApproved: !review.isApproved }),
      })
      if (res.ok) {
        setReviews((prev) => prev.map((r) => (r.id === review.id ? { ...r, isApproved: !r.isApproved } : r)))
        showToast(!review.isApproved ? '✓ Depoimento aprovado e publicado no site!' : '⚠ Depoimento removido do site (reprovado).')
      } else {
        showToast('Erro ao atualizar. Tente novamente.', 'error')
      }
    } catch {
      showToast('Erro de conexão.', 'error')
    } finally {
      setActionLoading(null)
    }
  }

  const handleDelete = async (id: number) => {
    setActionLoading(id)
    setDeleteConfirm(null)
    try {
      const res = await fetch(`/api/admin/reviews/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setReviews((prev) => prev.filter((r) => r.id !== id))
        showToast('Depoimento excluído com sucesso.')
      } else {
        showToast('Erro ao excluir. Tente novamente.', 'error')
      }
    } catch {
      showToast('Erro de conexão.', 'error')
    } finally {
      setActionLoading(null)
    }
  }

  // Chamado pelo modal ao salvar um novo review
  const handleReviewSaved = (newReview: Review) => {
    setReviews((prev) => [newReview, ...prev])
    showToast(
      newReview.isApproved
        ? '✓ Depoimento adicionado e publicado no site!'
        : '✓ Depoimento adicionado como pendente.'
    )
  }

  // ─── Estatísticas ────────────────────────────────────────────────────────────
  const total    = reviews.length
  const approved = reviews.filter((r) => r.isApproved).length
  const pending  = reviews.filter((r) => !r.isApproved).length

  const filtered = reviews.filter((r) => {
    if (filter === 'pending')  return !r.isApproved
    if (filter === 'approved') return r.isApproved
    return true
  })

  return (
    <div className="space-y-8">

      {/* Toast global */}
      {toast && (
        <div
          className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-2xl shadow-2xl text-sm font-semibold animate-fade-in-down ${
            toast.type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
          }`}
        >
          {toast.type === 'success' ? <CheckCircle2 size={18} /> : <AlertTriangle size={18} />}
          {toast.msg}
        </div>
      )}

      {/* Cabeçalho + botão Adicionar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Depoimentos</h1>
          <p className="text-gray-500 mt-1">
            Gerencie os depoimentos dos clientes. Aprove para publicar no site.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-bold px-5 py-3 rounded-xl shadow-md hover:shadow-lg transition-all text-sm whitespace-nowrap"
        >
          <Plus size={18} />
          Adicionar Depoimento
        </button>
      </div>

      {/* Cards de estatísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-gray-50 text-gray-500 rounded-xl flex items-center justify-center shrink-0">
            <MessageSquare size={22} />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total</p>
            <p className="text-2xl font-black text-gray-900 leading-none mt-0.5">{loading ? '—' : total}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center shrink-0">
            <ShieldCheck size={22} />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Aprovados</p>
            <p className="text-2xl font-black text-gray-900 leading-none mt-0.5">{loading ? '—' : approved}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-amber-50 text-amber-500 rounded-xl flex items-center justify-center shrink-0">
            <Clock size={22} />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Pendentes</p>
            <p className="text-2xl font-black text-gray-900 leading-none mt-0.5">{loading ? '—' : pending}</p>
          </div>
        </div>
      </div>

      {/* Tabs de filtro + lista */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex border-b border-gray-100">
          {([
            { key: 'all',      label: `Todos (${total})`        },
            { key: 'pending',  label: `Pendentes (${pending})`  },
            { key: 'approved', label: `Aprovados (${approved})` },
          ] as const).map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`px-6 py-4 text-sm font-semibold transition-all border-b-2 -mb-px ${
                filter === tab.key
                  ? 'border-brand-600 text-brand-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
              {/* Badge vermelho para pendentes */}
              {tab.key === 'pending' && pending > 0 && (
                <span className="ml-2 inline-flex items-center justify-center w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold">
                  {pending > 9 ? '9+' : pending}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="divide-y divide-gray-50">
          {loading && (
            <div className="flex items-center justify-center py-20 gap-3 text-gray-400">
              <Loader2 size={20} className="animate-spin" />
              <span className="text-sm font-medium">Carregando depoimentos...</span>
            </div>
          )}

          {!loading && filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 gap-3 text-gray-400">
              <MessageSquare size={36} className="text-gray-200" />
              <p className="text-sm font-medium">
                {filter === 'pending'  ? 'Nenhum depoimento pendente. 🎉' :
                 filter === 'approved' ? 'Nenhum depoimento aprovado ainda.' :
                 'Nenhum depoimento cadastrado.'}
              </p>
              {filter === 'all' && (
                <button
                  onClick={() => setShowAddModal(true)}
                  className="mt-2 inline-flex items-center gap-1.5 text-brand-600 hover:text-brand-700 text-sm font-semibold"
                >
                  <Plus size={16} /> Adicionar o primeiro
                </button>
              )}
            </div>
          )}

          {!loading && filtered.map((review) => (
            <div
              key={review.id}
              className={`p-6 flex flex-col sm:flex-row sm:items-start gap-4 transition-colors ${
                review.isApproved ? 'bg-white' : 'bg-amber-50/30'
              }`}
            >
              {/* Avatar */}
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white font-bold text-lg shadow-sm shrink-0">
                {review.clientName.charAt(0).toUpperCase()}
              </div>

              {/* Conteúdo */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-3 mb-1">
                  <span className="font-bold text-gray-900">{review.clientName}</span>
                  <StarRating rating={review.rating} />
                  <span className="text-xs text-gray-400">{formatDate(review.createdAt)}</span>
                  {review.isApproved ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                      <CheckCircle2 size={11} /> Publicado
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-700">
                      <Clock size={11} /> Pendente
                    </span>
                  )}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">{review.content}</p>
              </div>

              {/* Ações */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => handleToggleApproval(review)}
                  disabled={actionLoading === review.id}
                  title={review.isApproved ? 'Reprovar (remover do site)' : 'Aprovar (publicar no site)'}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                    review.isApproved
                      ? 'bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-600'
                      : 'bg-green-50 text-green-700 hover:bg-green-100'
                  }`}
                >
                  {actionLoading === review.id ? (
                    <Loader2 size={13} className="animate-spin" />
                  ) : review.isApproved ? (
                    <><XCircle size={13} /> Reprovar</>
                  ) : (
                    <><CheckCircle2 size={13} /> Aprovar</>
                  )}
                </button>

                {deleteConfirm === review.id ? (
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleDelete(review.id)}
                      disabled={actionLoading === review.id}
                      className="px-3 py-2 rounded-xl bg-red-600 text-white text-xs font-semibold hover:bg-red-700 transition-colors disabled:opacity-50"
                    >
                      Confirmar
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(null)}
                      className="px-3 py-2 rounded-xl bg-gray-100 text-gray-600 text-xs font-semibold hover:bg-gray-200 transition-colors"
                    >
                      Cancelar
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setDeleteConfirm(review.id)}
                    disabled={actionLoading === review.id}
                    title="Excluir permanentemente"
                    className="w-9 h-9 rounded-xl bg-gray-100 text-gray-400 hover:bg-red-50 hover:text-red-500 flex items-center justify-center transition-all disabled:opacity-50"
                  >
                    <Trash2 size={15} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal de adicionar */}
      {showAddModal && (
        <AddReviewModal
          onClose={() => setShowAddModal(false)}
          onSaved={handleReviewSaved}
        />
      )}
    </div>
  )
}
