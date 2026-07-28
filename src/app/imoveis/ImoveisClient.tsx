'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Property } from '@/lib/properties'
import {
  MapPin, Bed, Bath, Car, Square, SlidersHorizontal,
  X, Search, ChevronDown, LayoutGrid, List, Star, CheckCircle2
} from 'lucide-react'

// ─── Types ────────────────────────────────────────────────────────────────────

type SortOption = 'relevance' | 'price-asc' | 'price-desc' | 'area-asc' | 'area-desc'

type Filters = {
  search: string
  codigo: string
  finalidade: string
  type: string
  category: string
  state: string
  city: string
  neighborhood: string
  bedrooms: string
  bathrooms: string
  garageSpots: string
  priceMin: string
  priceMax: string
}

const defaultFilters: Filters = {
  search: '',
  codigo: '',
  finalidade: '',
  type: '',
  category: '',
  state: '',
  city: '',
  neighborhood: '',
  bedrooms: '',
  bathrooms: '',
  garageSpots: '',
  priceMin: '',
  priceMax: '',
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function unique<T>(arr: T[]): T[] {
  return Array.from(new Set(arr))
}

function applyFilters(list: Property[], f: Filters, sort: SortOption): Property[] {
  let result = list.filter((p) => {
    if (f.codigo && p.id.toString() !== f.codigo) return false

    const search = f.search.toLowerCase()
    if (
      search &&
      !p.title.toLowerCase().includes(search) &&
      !p.city.toLowerCase().includes(search) &&
      !p.neighborhood.toLowerCase().includes(search)
    ) return false
    if (f.type && p.type !== f.type) return false
    if (f.category && p.category !== f.category) return false
    if (f.state && p.state !== f.state) return false
    if (f.city && p.city !== f.city) return false
    if (f.neighborhood && p.neighborhood !== f.neighborhood) return false
    if (f.bedrooms && p.bedrooms < Number(f.bedrooms)) return false
    if (f.bathrooms && p.bathrooms < Number(f.bathrooms)) return false
    if (f.garageSpots && p.garageSpots < Number(f.garageSpots)) return false
    const pMin = f.priceMin === '' ? null : Number(f.priceMin.replace(/\D/g, ''))
    const pMax = f.priceMax === '' ? null : Number(f.priceMax.replace(/\D/g, ''))
    if (pMin !== null && !isNaN(pMin) && p.price < pMin) return false
    if (pMax !== null && !isNaN(pMax) && p.price > pMax) return false
    return true
  })

  switch (sort) {
    case 'price-asc': result.sort((a, b) => a.price - b.price); break
    case 'price-desc': result.sort((a, b) => b.price - a.price); break
    case 'area-asc': result.sort((a, b) => a.area - b.area); break
    case 'area-desc': result.sort((a, b) => b.area - a.area); break
    default: result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0)); break
  }
  return result
}

const formatCurrency = (v: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 }).format(v)

// ─── Sub-components (fora do componente principal para evitar remontagem) ─────

function SelectField({
  label, value, options, disabled, onChange,
}: {
  label: string
  value: string
  options: string[]
  disabled?: boolean
  onChange: (v: string) => void
}) {
  return (
    <div>
      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">{label}</label>
      <div className="relative">
        <select
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none bg-white border border-gray-200 text-gray-900 text-sm rounded-lg px-3 py-2.5 pr-8 focus:outline-none focus:border-brand-500 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <option value="">Todos</option>
          {options.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
        <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
      </div>
    </div>
  )
}

function CounterField({
  label, value, max = 5, onChange,
}: {
  label: string
  value: string
  max?: number
  onChange: (v: string) => void
}) {
  return (
    <div>
      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">{label}</label>
      <div className="flex gap-1.5 flex-wrap">
        <button
          type="button"
          onClick={() => onChange('')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${value === '' ? 'bg-brand-600 border-brand-600 text-gray-900' : 'bg-white border-gray-200 text-gray-500 hover:border-brand-500 hover:text-gray-900'}`}
        >
          Qualquer
        </button>
        {Array.from({ length: max }, (_, i) => i + 1).map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => onChange(value === String(n) ? '' : String(n))}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${value === String(n) ? 'bg-brand-600 border-brand-600 text-gray-900' : 'bg-white border-gray-200 text-gray-500 hover:border-brand-500 hover:text-gray-900'}`}
          >
            {n}{n === max ? '+' : ''}
          </button>
        ))}
      </div>
    </div>
  )
}

// ─── FilterPanel (componente externo ao page) ─────────────────────────────────

function FilterPanel({
  pending,
  onChange,
  onApply,
  onClear,
  allStates,
  allCities,
  allNeighborhoods,
  resultCount,
}: {
  pending: Filters
  onChange: (key: keyof Filters, value: string) => void
  onApply: () => void
  onClear: () => void
  allStates: string[]
  allCities: string[]
  allNeighborhoods: string[]
  resultCount: number
}) {
  return (
    <div className="space-y-6">

      {/* Busca e Código */}
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Buscar</label>
          <div className="relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
            <input
              type="text"
              placeholder="Título, cidade ou bairro..."
              value={pending.search}
              onChange={(e) => onChange('search', e.target.value)}
              className="w-full bg-white border border-gray-200 text-gray-900 text-sm rounded-lg pl-9 pr-8 py-2.5 focus:outline-none focus:border-brand-500 placeholder-gray-400 transition-colors"
            />
            {pending.search && (
              <button
                type="button"
                onClick={() => onChange('search', '')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-900 transition-colors"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Código do Imóvel</label>
          <input
            type="text"
            placeholder="Ex: 1234"
            value={pending.codigo}
            onChange={(e) => onChange('codigo', e.target.value)}
            className="w-full bg-white border border-gray-200 text-gray-900 text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:border-brand-500 placeholder-gray-400 transition-colors"
          />
        </div>
      </div>

      {/* Classificação */}
      <div className="border-t border-gray-100 pt-5 space-y-4">
        <SelectField
          label="Finalidade"
          value={pending.finalidade}
          options={['Residencial', 'Comercial', 'Rural']}
          onChange={(v) => onChange('finalidade', v)}
        />
        <SelectField
          label="Tipo de Imóvel"
          value={pending.type}
          options={['URBANO', 'RURAL']}
          onChange={(v) => onChange('type', v)}
        />
        <SelectField
          label="Modalidade"
          value={pending.category}
          options={['Venda', 'Locação']}
          onChange={(v) => onChange('category', v)}
        />
      </div>

      {/* Localização */}
      <div className="border-t border-gray-100 pt-5">
        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Localização</p>
        <div className="space-y-3">
          <SelectField
            label="Estado"
            value={pending.state}
            options={allStates}
            onChange={(v) => onChange('state', v)}
          />
          <SelectField
            label="Cidade"
            value={pending.city}
            options={allCities}
            disabled={!pending.state}
            onChange={(v) => onChange('city', v)}
          />
          <SelectField
            label="Bairro / Zona"
            value={pending.neighborhood}
            options={allNeighborhoods}
            disabled={!pending.city}
            onChange={(v) => onChange('neighborhood', v)}
          />
        </div>
      </div>

      {/* Características */}
      <div className="border-t border-gray-100 pt-5 space-y-4">
        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Características</p>
        <CounterField label="Quartos (mínimo)" value={pending.bedrooms} onChange={(v) => onChange('bedrooms', v)} />
        <CounterField label="Banheiros (mínimo)" value={pending.bathrooms} max={4} onChange={(v) => onChange('bathrooms', v)} />
        <CounterField label="Vagas de Garagem (mínimo)" value={pending.garageSpots} max={4} onChange={(v) => onChange('garageSpots', v)} />
      </div>

      {/* Preço */}
      <div className="border-t border-gray-100 pt-5">
        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Faixa de Preço (R$)</p>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs text-gray-500 mb-1">Mínimo</label>
            <input
              type="number"
              placeholder="0"
              value={pending.priceMin}
              onChange={(e) => onChange('priceMin', e.target.value)}
              className="w-full bg-white border border-gray-200 text-gray-900 text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:border-brand-500 placeholder-gray-400 transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Máximo</label>
            <input
              type="number"
              placeholder="Sem limite"
              value={pending.priceMax}
              onChange={(e) => onChange('priceMax', e.target.value)}
              className="w-full bg-white border border-gray-200 text-gray-900 text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:border-brand-500 placeholder-gray-400 transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Botões Aplicar / Limpar */}
      <div className="border-t border-gray-100 pt-5">
        <button
          type="button"
          onClick={onApply}
          className="w-full relative overflow-hidden group bg-brand-600 hover:bg-brand-700 text-gray-900 text-sm font-semibold tracking-wide py-3 rounded-lg transition-all duration-300 hover:shadow-md hover:shadow-brand-600/40"
        >
          <span className="flex items-center justify-center gap-2">
            <CheckCircle2 size={14} className="opacity-80" />
            Aplicar
            <span className="text-brand-100 font-normal text-xs">
              ({resultCount} resultado{resultCount !== 1 ? 's' : ''})
            </span>
          </span>
        </button>
        <button
          type="button"
          onClick={onClear}
          className="mt-2 w-full text-xs font-medium text-gray-500 hover:text-gray-700 transition-colors py-2 flex items-center justify-center gap-1.5 tracking-wide"
        >
          <X size={12} className="opacity-70" />
          Limpar filtros
        </button>
      </div>
    </div>
  )
}

// Ícone de suíte
function SuiteIcon({ size = 15, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M2 9V4a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v5" />
      <path d="M2 11v9" /><path d="M22 11v9" /><path d="M2 15h20" />
      <path d="M7 11v4" /><path d="M17 11v4" /><path d="M7 11h10" />
      <path d="M12 6.5 C12 6.5 10 5 10 3.5a2 2 0 0 1 4 0C14 5 12 6.5 12 6.5z" />
    </svg>
  )
}

// Stats row reutilizável
function PropertyStats({ property, size = 14, className = '' }: { property: Property; size?: number; className?: string }) {
  return (
    <div className={`flex flex-wrap gap-x-4 gap-y-2 text-gray-500 text-xs ${className}`}>
      {property.bedrooms > 0 && (
        <span className="flex items-center gap-1.5">
          <Bed size={size} className="text-brand-500 shrink-0" />
          {property.bedrooms} qto{property.bedrooms > 1 ? 's' : ''}
        </span>
      )}
      {property.suites > 0 && (
        <span className="flex items-center gap-1.5">
          <SuiteIcon size={size} className="text-brand-500 shrink-0" />
          {property.suites} suíte{property.suites > 1 ? 's' : ''}
        </span>
      )}
      {property.bathrooms > 0 && (
        <span className="flex items-center gap-1.5">
          <Bath size={size} className="text-brand-500 shrink-0" />
          {property.bathrooms} ban
        </span>
      )}
      {property.garageSpots > 0 && (
        <span className="flex items-center gap-1.5">
          <Car size={size} className="text-brand-500 shrink-0" />
          {property.garageSpots} vaga{property.garageSpots > 1 ? 's' : ''}
        </span>
      )}
      <span className="flex items-center gap-1.5">
        <Square size={size} className="text-brand-500 shrink-0" />
        {property.area.toLocaleString('pt-BR')} {property.areaUnit}
      </span>
    </div>
  )
}

// ─── Property Card ────────────────────────────────────────────────────────────

function PropertyCard({ property, view }: { property: Property; view: 'grid' | 'list' }) {
  const isLocacao = property.category === 'Locação'

  if (view === 'list') {
    return (
      <Link href={`/imoveis/${property.id}`} className="group block">
        <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:border-brand-600/60 transition-all duration-300 hover:shadow-xl hover:shadow-brand-600/10 flex flex-col sm:flex-row">

          {/* Imagem */}
          <div className="relative sm:w-64 h-48 sm:h-auto shrink-0 overflow-hidden">
            <img
              src={property.imageUrl}
              alt={property.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Badge Destaque apenas */}
            {property.isFeatured && (
              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-1 rounded bg-gold-500 text-dark-950 text-xs font-bold uppercase shadow-md flex items-center gap-1">
                  <Star size={10} fill="currentColor" /> Destaque
                </span>
              </div>
            )}
          </div>

          {/* Conteúdo */}
          <div className="p-5 flex flex-col justify-between flex-1 min-w-0">
            <div>
              <div className="flex items-center gap-1.5 text-brand-500 text-xs font-bold uppercase tracking-wider mb-2">
                <MapPin size={12} className="shrink-0" />
                <span className="truncate">{property.neighborhood} · {property.city} - {property.state}</span>
              </div>
              <h3 className="text-gray-900 font-bold text-lg group-hover:text-brand-400 transition-colors line-clamp-1 mb-2">
                {property.title}
              </h3>
              <p className="text-gray-500 text-sm line-clamp-2">{property.description}</p>
            </div>

            <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-gray-100">
              <PropertyStats property={property} size={14} />
              <div className="text-right shrink-0">
                <p className="text-xs text-gray-500 uppercase tracking-wider">{isLocacao ? 'Aluguel/mês' : 'Venda'}</p>
                <p className="text-brand-400 font-extrabold text-xl">
                  {formatCurrency(property.price)}
                  {isLocacao && <span className="text-gray-500 font-normal text-sm">/mês</span>}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    )
  }

  // ── Modo grid ──
  return (
    <Link href={`/imoveis/${property.id}`} className="group block h-full">
      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:border-brand-600/60 transition-all duration-300 hover:shadow-xl hover:shadow-brand-600/10 hover:-translate-y-1 flex flex-col h-full">

        {/* Imagem */}
        <div className="relative h-52 overflow-hidden">
          <img
            src={property.imageUrl}
            alt={property.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />

          {/* Badge Destaque apenas */}
          {property.isFeatured && (
            <div className="absolute top-3 left-3">
              <span className="px-2.5 py-1 rounded bg-gold-500 text-dark-950 text-xs font-bold uppercase shadow-md flex items-center gap-1">
                <Star size={10} fill="currentColor" /> Destaque
              </span>
            </div>
          )}

          {/* Preço */}
          <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-lg border-b-2 border-brand-600">
            <span className="text-dark-900 font-extrabold text-sm">
              {formatCurrency(property.price)}
              {isLocacao && <span className="text-gray-500 font-normal text-xs">/mês</span>}
            </span>
          </div>

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-brand-600/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="text-gray-900 font-bold uppercase tracking-widest text-sm border-2 border-white px-5 py-2.5 rounded-lg">
              Ver Detalhes →
            </span>
          </div>
        </div>

        {/* Informações */}
        <div className="p-5 flex-1 flex flex-col">
          <div className="flex items-center gap-1 text-brand-500 text-xs font-bold uppercase tracking-wider mb-2">
            <MapPin size={12} className="shrink-0" />
            <span className="truncate">{property.neighborhood} · {property.city}</span>
          </div>
          <h3 className="text-gray-900 font-bold text-base group-hover:text-brand-400 transition-colors line-clamp-2 mb-auto">
            {property.title}
          </h3>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <PropertyStats property={property} size={13} />
          </div>
        </div>
      </div>
    </Link>
  )
}

// ─── Página Principal ─────────────────────────────────────────────────────────

export default function ImoveisClient({ initialProperties }: { initialProperties: Property[] }) {
  // pending = o que o usuário está configurando na sidebar
  const [pending, setPending] = useState<Filters>(defaultFilters)
  // applied = o que foi efetivamente aplicado (usado para filtrar resultados)
  const [applied, setApplied] = useState<Filters>(defaultFilters)
  const [sort, setSort] = useState<SortOption>('relevance')
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleChange = (key: keyof Filters, value: string) => {
    setPending((prev) => {
      const next = { ...prev, [key]: value }
      if (key === 'state') { next.city = ''; next.neighborhood = '' }
      if (key === 'city') { next.neighborhood = '' }
      return next
    })
  }

  const handleApply = () => {
    setApplied({ ...pending })
    setMobileOpen(false)
  }

  const handleClear = () => {
    setPending(defaultFilters)
    setApplied(defaultFilters)
  }

  // Listas derivadas dos filtros PENDENTES (para os selects de cascata reagirem enquanto o usuário configura)
  const allStates = useMemo(() => unique(initialProperties.map((p) => p.state)).sort(), [initialProperties])
  const allCities = useMemo(
    () => unique(initialProperties.filter((p) => !pending.state || p.state === pending.state).map((p) => p.city)).sort(),
    [pending.state, initialProperties]
  )
  const allNeighborhoods = useMemo(
    () => unique(
      initialProperties.filter((p) =>
        (!pending.state || p.state === pending.state) &&
        (!pending.city || p.city === pending.city)
      ).map((p) => p.neighborhood)
    ).sort(),
    [pending.state, pending.city, initialProperties]
  )

  // Preview count (baseado nos pending, para o botão "Aplicar · X resultados")
  const previewResults = useMemo(() => applyFilters(initialProperties, pending, sort), [pending, sort, initialProperties])

  // Resultados reais (baseados nos applied)
  const results = useMemo(() => applyFilters(initialProperties, applied, sort), [applied, sort, initialProperties])

  // Chips de filtros ativos
  const activeChips = useMemo(() => {
    const labels: Record<string, string> = {
      search: 'Busca', type: 'Tipo', category: 'Modalidade',
      state: 'Estado', city: 'Cidade', neighborhood: 'Bairro',
      bedrooms: 'Quartos', bathrooms: 'Banheiros', garageSpots: 'Vagas',
      priceMin: 'Mín R$', priceMax: 'Máx R$',
    }
    return Object.entries(applied).filter(([, v]) => v !== '').map(([k, v]) => ({
      key: k as keyof Filters,
      label: `${labels[k]}: ${['bedrooms', 'bathrooms', 'garageSpots'].includes(k) ? v + '+' : v}`,
    }))
  }, [applied])

  const removeChip = (key: keyof Filters) => {
    const next = { ...applied, [key]: '' }
    setApplied(next)
    setPending(next)
  }

  const filterPanelProps = {
    pending,
    onChange: handleChange,
    onApply: handleApply,
    onClear: handleClear,
    allStates,
    allCities,
    allNeighborhoods,
    resultCount: previewResults.length,
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 overflow-x-hidden">
      <Header />

      <main className="flex-1 pt-28 pb-24">
        {/* Banner */}
        <div className="bg-gradient-to-r from-dark-950 via-dark-900 to-dark-950 border-b border-dark-800 py-10 mb-8">
          <div className="container mx-auto px-4 md:px-8">
            <p className="text-brand-500 text-xs font-bold uppercase tracking-widest mb-2">Contrato Feito</p>
            <h1 className="text-white font-extrabold text-3xl md:text-4xl uppercase tracking-tight mb-2">
              Todos os Imóveis
            </h1>
            <p className="text-gray-400 text-sm">
              {initialProperties.length} imóveis disponíveis · Use os filtros para encontrar o seu
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 md:px-8">
          <div className="flex gap-8 items-start">

            {/* ── Sidebar desktop ──────────────────────────────────── */}
            <aside className="hidden lg:block w-72 shrink-0 sticky top-28">
              <div className="bg-white border border-gray-100 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-6">
                  <SlidersHorizontal size={16} className="text-brand-500" />
                  <h2 className="text-gray-900 font-bold text-sm uppercase tracking-wider">Filtros</h2>
                  {activeChips.length > 0 && (
                    <span className="bg-brand-600 text-gray-900 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center ml-auto">
                      {activeChips.length}
                    </span>
                  )}
                </div>
                <FilterPanel {...filterPanelProps} />
              </div>
            </aside>

            {/* ── Conteúdo principal ───────────────────────────────── */}
            <div className="flex-1 min-w-0">

              {/* Barra de resultados */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-5">
                <div className="flex items-center gap-3">
                  {/* Botão filtros mobile */}
                  <button
                    onClick={() => setMobileOpen(true)}
                    className="lg:hidden flex items-center gap-2 bg-white border border-gray-200 hover:border-brand-500 text-gray-900 text-sm font-bold px-4 py-2.5 rounded-xl transition-all"
                  >
                    <SlidersHorizontal size={15} />
                    Filtros
                    {activeChips.length > 0 && (
                      <span className="bg-brand-600 text-gray-900 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                        {activeChips.length}
                      </span>
                    )}
                  </button>
                  <p className="text-gray-500 text-sm">
                    <span className="text-gray-900 font-bold">{results.length}</span> imóvel{results.length !== 1 ? 'is' : ''} encontrado{results.length !== 1 ? 's' : ''}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  {/* Ordenação */}
                  <div className="relative">
                    <select
                      value={sort}
                      onChange={(e) => setSort(e.target.value as SortOption)}
                      className="appearance-none bg-white border border-gray-200 text-gray-900 text-sm rounded-xl pl-3 pr-8 py-2.5 focus:outline-none focus:border-brand-500 transition-colors cursor-pointer"
                    >
                      <option value="relevance">Mais Relevantes</option>
                      <option value="price-asc">Menor Preço</option>
                      <option value="price-desc">Maior Preço</option>
                      <option value="area-asc">Menor Área</option>
                      <option value="area-desc">Maior Área</option>
                    </select>
                    <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                  </div>

                  {/* Grid / List */}
                  <div className="flex border border-gray-200 rounded-xl overflow-hidden">
                    <button onClick={() => setView('grid')} className={`p-2.5 transition-colors ${view === 'grid' ? 'bg-brand-600 text-gray-900' : 'bg-white text-gray-500 hover:text-gray-900'}`}>
                      <LayoutGrid size={16} />
                    </button>
                    <button onClick={() => setView('list')} className={`p-2.5 transition-colors ${view === 'list' ? 'bg-brand-600 text-gray-900' : 'bg-white text-gray-500 hover:text-gray-900'}`}>
                      <List size={16} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Chips de filtros ativos */}
              {activeChips.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-5">
                  {activeChips.map(({ key, label }) => (
                    <span key={key} className="inline-flex items-center gap-1.5 bg-brand-600/20 border border-brand-600/40 text-brand-300 text-xs font-bold px-3 py-1.5 rounded-full">
                      {label}
                      <button onClick={() => removeChip(key)} className="hover:text-gray-900 transition-colors ml-1">
                        <X size={12} />
                      </button>
                    </span>
                  ))}
                  <button onClick={handleClear} className="text-xs font-bold text-gray-500 hover:text-gray-900 transition-colors px-2">
                    Limpar tudo
                  </button>
                </div>
              )}

              {/* Lista de imóveis */}
              {results.length === 0 ? (
                <div className="text-center py-32">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-gray-900 font-bold text-xl mb-2">Nenhum imóvel encontrado</h3>
                  <p className="text-gray-500 text-sm mb-6">Tente ajustar ou limpar os filtros.</p>
                  <button
                    onClick={handleClear}
                    className="bg-brand-600 hover:bg-brand-700 text-gray-900 font-bold px-6 py-3 rounded-xl transition-colors"
                  >
                    Limpar Filtros
                  </button>
                </div>
              ) : (
                <div className={
                  view === 'grid'
                    ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6'
                    : 'flex flex-col gap-5'
                }>
                  {results.map((p) => <PropertyCard key={p.id} property={p} view={view} />)}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* ── Mobile Drawer ─────────────────────────────────────────── */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-80 max-w-[90vw] bg-white border-l border-gray-100 overflow-y-auto p-6 shadow-2xl flex flex-col">
            <div className="flex items-center justify-between mb-6 shrink-0">
              <div className="flex items-center gap-2">
                <SlidersHorizontal size={16} className="text-brand-500" />
                <h2 className="text-gray-900 font-bold text-sm uppercase tracking-wider">Filtros</h2>
              </div>
              <button onClick={() => setMobileOpen(false)} className="text-gray-500 hover:text-gray-900 transition-colors">
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <FilterPanel {...filterPanelProps} />
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
