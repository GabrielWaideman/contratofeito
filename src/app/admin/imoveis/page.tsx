'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  Plus, Search, Edit, Trash2, ExternalLink, Image as ImageIcon,
  BadgeDollarSign, CheckCircle2, X, Loader2, AlertCircle, RotateCcw,
} from 'lucide-react'

const formatBRL = (val: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 }).format(val || 0)

function SaleModal({
  property,
  onClose,
  onSaved,
}: {
  property: any
  onClose: () => void
  onSaved: (updated: any) => void
}) {
  const [sellerName, setSellerName] = useState<string>(property.sellerName || '')
  const [buyerName, setBuyerName] = useState<string>(property.buyerName || '')
  const [saleValue, setSaleValue] = useState<number>(
    property.saleValue !== null && property.saleValue !== undefined
      ? Number(property.saleValue)
      : Number(property.price) || 0
  )
  const [commissionReceivable, setCommissionReceivable] = useState<number>(
    property.commissionReceivable !== null && property.commissionReceivable !== undefined
      ? Number(property.commissionReceivable)
      : 0
  )
  const [commissionReceived, setCommissionReceived] = useState<number>(
    property.commissionReceived !== null && property.commissionReceived !== undefined
      ? Number(property.commissionReceived)
      : 0
  )
  const [hadExchange, setHadExchange] = useState<boolean>(Boolean(property.hadExchange))
  const [saleNotes, setSaleNotes] = useState<string>(property.saleNotes || '')
  const [saving, setSaving] = useState(false)
  const [reverting, setReverting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleCurrencyChange = (rawInput: string, setter: (v: number) => void) => {
    const digits = rawInput.replace(/[^0-9]/g, '')
    setter(digits ? parseFloat(digits) / 100 : 0)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!sellerName.trim()) {
      setError('Informe o Nome do Vendedor.')
      return
    }
    if (!buyerName.trim()) {
      setError('Informe o Nome do Comprador.')
      return
    }

    setSaving(true)
    try {
      const res = await fetch(`/api/admin/properties/${property.id}/sale`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sellerName: sellerName.trim(),
          buyerName: buyerName.trim(),
          saleValue,
          commissionReceivable,
          commissionReceived,
          hadExchange,
          saleNotes: saleNotes.trim() || null,
        }),
      })

      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Erro ao salvar os dados da venda.')
        setSaving(false)
        return
      }

      onSaved(data)
      onClose()
    } catch {
      setError('Erro de conexão ao registrar venda.')
      setSaving(false)
    }
  }

  const handleUnmarkSale = async () => {
    if (!confirm('Deseja desmarcar este imóvel como vendido e limpar os dados da venda? O imóvel voltará para o status Publicado.')) {
      return
    }
    setError(null)
    setReverting(true)
    try {
      const res = await fetch(`/api/admin/properties/${property.id}/sale`, {
        method: 'DELETE',
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Erro ao desmarcar venda.')
        setReverting(false)
        return
      }
      onSaved(data)
      onClose()
    } catch {
      setError('Erro de conexão ao desmarcar venda.')
      setReverting(false)
    }
  }

  const cleanCode = property.code ? property.code.replace(/^#/, '') : null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-100 w-full max-w-2xl overflow-hidden my-8 z-10">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 px-6 pt-6 pb-4 border-b border-gray-100 bg-gray-50/60">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <BadgeDollarSign size={24} />
            </div>
            <div>
              <h2 className="text-lg font-black text-gray-900 leading-snug">
                {property.isSold ? 'Dados da Venda do Imóvel' : 'Marcar Imóvel como Vendido'}
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                {cleanCode && <span className="font-mono font-bold text-gray-700 mr-1.5">Cód. {cleanCode}</span>}
                {property.title} · <span className="font-semibold text-gray-700">Anunciado por {formatBRL(property.price)}</span>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white border border-gray-200 hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-700 transition-colors shrink-0"
          >
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          {error && (
            <div className="bg-red-50 text-red-700 border border-red-200 rounded-xl p-3.5 text-sm font-medium flex items-center gap-2.5">
              <AlertCircle size={18} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Vendedor e Comprador */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Nome do Vendedor *
              </label>
              <input
                type="text"
                required
                value={sellerName}
                onChange={e => setSellerName(e.target.value)}
                placeholder="Nome completo do vendedor"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 text-sm focus:border-brand-500 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Nome do Comprador *
              </label>
              <input
                type="text"
                required
                value={buyerName}
                onChange={e => setBuyerName(e.target.value)}
                placeholder="Nome completo do comprador"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 text-sm focus:border-brand-500 outline-none transition-all"
              />
            </div>
          </div>

          {/* Valores Contábeis */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Valor Contábil da Venda
              </label>
              <input
                type="text"
                required
                value={formatBRL(saleValue)}
                onChange={e => handleCurrencyChange(e.target.value, setSaleValue)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 text-sm font-mono font-bold focus:border-brand-500 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Corretagem a Receber
              </label>
              <input
                type="text"
                required
                value={formatBRL(commissionReceivable)}
                onChange={e => handleCurrencyChange(e.target.value, setCommissionReceivable)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-amber-700 text-sm font-mono font-bold focus:border-brand-500 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Corretagem Recebida
              </label>
              <input
                type="text"
                required
                value={formatBRL(commissionReceived)}
                onChange={e => handleCurrencyChange(e.target.value, setCommissionReceived)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-emerald-700 text-sm font-mono font-bold focus:border-brand-500 outline-none transition-all"
              />
            </div>
          </div>

          {/* Teve Permuta? Sim ou Não */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
              Teve Permuta?
            </label>
            <div className="inline-flex rounded-xl border border-gray-200 p-1 bg-gray-50 gap-1">
              <button
                type="button"
                onClick={() => setHadExchange(true)}
                className={`px-6 py-2 rounded-lg text-xs font-extrabold uppercase tracking-wider transition-all ${
                  hadExchange
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Sim
              </button>
              <button
                type="button"
                onClick={() => setHadExchange(false)}
                className={`px-6 py-2 rounded-lg text-xs font-extrabold uppercase tracking-wider transition-all ${
                  !hadExchange
                    ? 'bg-gray-800 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Não
              </button>
            </div>
          </div>

          {/* Observação */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Observação
            </label>
            <textarea
              rows={4}
              value={saleNotes}
              onChange={e => setSaleNotes(e.target.value)}
              placeholder="Digite observações gerais sobre a venda, forma de pagamento, detalhes da permuta, datas de parcelas, etc..."
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 text-sm focus:border-brand-500 outline-none transition-all resize-y"
            />
          </div>

          {/* Rodapé do Modal */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-gray-100">
            <div>
              {property.isSold && (
                <button
                  type="button"
                  onClick={handleUnmarkSale}
                  disabled={reverting || saving}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 text-xs font-bold uppercase tracking-wider transition-colors disabled:opacity-50"
                >
                  {reverting ? <Loader2 size={14} className="animate-spin" /> : <RotateCcw size={14} />}
                  Desmarcar Venda
                </button>
              )}
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <button
                type="button"
                onClick={onClose}
                disabled={saving || reverting}
                className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm font-bold transition-colors disabled:opacity-50"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={saving || reverting}
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold shadow-md hover:shadow-lg transition-all disabled:opacity-60"
              >
                {saving ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Salvando...
                  </>
                ) : (
                  <>
                    <CheckCircle2 size={16} />
                    Confirmar Venda
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function PropertiesListPage() {
  const [properties, setProperties] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [saleModalProperty, setSaleModalProperty] = useState<any | null>(null)

  useEffect(() => {
    fetch('/api/admin/properties')
      .then(res => res.json())
      .then(data => {
        if(Array.isArray(data)) setProperties(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const handleDelete = async (id: number) => {
    if (!confirm('Tem certeza que deseja excluir este imóvel definitivamente?')) return
    
    await fetch(`/api/admin/properties/${id}`, { method: 'DELETE' })
    setProperties(properties.filter(p => p.id !== id))
  }

  const handleSaleSaved = (updatedProp: any) => {
    setProperties(prev => prev.map(p => (p.id === updatedProp.id ? updatedProp : p)))
  }

  const filtered = properties.filter(p => 
    p.title.toLowerCase().includes(search.toLowerCase()) || 
    (p.code && p.code.toLowerCase().includes(search.toLowerCase()))
  )

  const priceFormat = (val: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 }).format(val)

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Imóveis</h1>
          <p className="text-gray-500 mt-1">Gerencie seu catálogo de propriedades.</p>
        </div>
        <Link 
          href="/admin/imoveis/novo"
          className="bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 px-6 rounded-xl flex items-center gap-2 shadow-md hover:shadow-lg transition-all"
        >
          <Plus size={20} />
          Novo Imóvel
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Buscar por título ou código..." 
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-brand-500 outline-none"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100 text-xs uppercase tracking-wider font-bold text-gray-500">
                <th className="px-6 py-4">Cód.</th>
                <th className="px-6 py-4">Imóvel</th>
                <th className="px-6 py-4">Preço</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr><td colSpan={5} className="px-6 py-8 text-center text-gray-400">Carregando...</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={5} className="px-6 py-8 text-center text-gray-400">Nenhum imóvel encontrado.</td></tr>
              ) : (
                filtered.map(p => (
                  <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs font-bold text-gray-700">
                      {p.code ? p.code.replace(/^#/, '') : '—'}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden shrink-0 border border-gray-200 flex items-center justify-center">
                          {p.imageUrl ? (
                            <img src={p.imageUrl} alt="" className="w-full h-full object-cover" />
                          ) : <ImageIcon size={20} className="text-gray-400" />}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 text-sm line-clamp-1">{p.title}</p>
                          <p className="text-xs text-gray-400 mt-0.5">{p.city} - {p.state} • {p.category}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-bold text-gray-900 text-sm">
                      <div>{priceFormat(p.price)}</div>
                      {p.isSold && p.saleValue !== null && p.saleValue !== undefined && (
                        <div className="text-[11px] font-semibold text-emerald-700 mt-0.5">
                          Vendido: {priceFormat(Number(p.saleValue))}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {p.isSold ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-full text-xs font-extrabold uppercase tracking-wider">
                          <CheckCircle2 size={12} />
                          Vendido
                        </span>
                      ) : p.isPublished ? (
                        <span className="inline-flex px-2 py-1 bg-green-50 text-green-700 border border-green-200 rounded-full text-xs font-bold uppercase tracking-wider">Publicado</span>
                      ) : (
                        <span className="inline-flex px-2 py-1 bg-gray-100 text-gray-600 border border-gray-200 rounded-full text-xs font-bold uppercase tracking-wider">Rascunho</span>
                      )}
                      {!p.isSold && p.isFeatured && (
                        <span className="inline-flex px-2 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-full text-xs font-bold uppercase tracking-wider ml-1">Destaque</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setSaleModalProperty(p)}
                          className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 border ${
                            p.isSold
                              ? 'bg-emerald-600 text-white border-emerald-600 hover:bg-emerald-700 shadow-sm'
                              : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-600 hover:text-white hover:border-emerald-600'
                          }`}
                          title={p.isSold ? 'Ver / Editar dados da venda' : 'Marcar como Vendido'}
                        >
                          <BadgeDollarSign size={15} />
                          <span>{p.isSold ? 'Vendido' : 'Marcar Vendido'}</span>
                        </button>
                        <a href={`/imoveis/${p.id}`} target="_blank" className="p-2 text-gray-400 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-colors" title="Ver no site">
                          <ExternalLink size={18} />
                        </a>
                        <Link href={`/admin/imoveis/${p.id}/editar`} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Editar">
                          <Edit size={18} />
                        </Link>
                        <button onClick={() => handleDelete(p.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Excluir">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {saleModalProperty && (
        <SaleModal
          property={saleModalProperty}
          onClose={() => setSaleModalProperty(null)}
          onSaved={handleSaleSaved}
        />
      )}
    </div>
  )
}
