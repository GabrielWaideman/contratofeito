'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, SlidersHorizontal, ChevronDown, ChevronUp } from 'lucide-react'
import type { Property } from '@/lib/properties'

type SelectOption = {
  id?: number
  label: string
  value: string
  isDefault: boolean
}

type OptionsMap = {
  category: SelectOption[]
  type: SelectOption[]
  purpose: SelectOption[]
}

export default function FilterBar({ properties = [] }: { properties?: Property[] }) {
  const router = useRouter()

  const [options, setOptions] = useState<OptionsMap>({
    category: [
      { label: 'Venda', value: 'Venda', isDefault: true },
      { label: 'Locação', value: 'Locação', isDefault: true },
    ],
    type: [
      { label: 'Casa', value: 'Casa', isDefault: true },
      { label: 'Apartamento', value: 'Apartamento', isDefault: true },
      { label: 'Terreno', value: 'Terreno', isDefault: true },
      { label: 'Chácara/Sítio', value: 'Chácara/Sítio', isDefault: true },
    ],
    purpose: [
      { label: 'Residencial', value: 'Residencial', isDefault: true },
      { label: 'Comercial', value: 'Comercial', isDefault: true },
      { label: 'Rural', value: 'Rural', isDefault: true },
    ],
  })

  const [selectedCategory, setSelectedCategory] = useState<string>('Venda')
  const [categoryTouched, setCategoryTouched] = useState<boolean>(false)
  const [finalidade, setFinalidade] = useState<string>('')
  const [type, setType] = useState<string>('')
  const [city, setCity] = useState<string>('')
  const [neighborhood, setNeighborhood] = useState<string>('')
  const [codigo, setCodigo] = useState<string>('')
  const [bedrooms, setBedrooms] = useState<string>('')
  const [bathrooms, setBathrooms] = useState<string>('')
  const [priceMin, setPriceMin] = useState<string>('')
  const [priceMax, setPriceMax] = useState<string>('')
  const [mobileOpen, setMobileOpen] = useState<boolean>(false)

  useEffect(() => {
    fetch('/api/property-options')
      .then(r => r.json())
      .then((data: OptionsMap) => {
        if (data.category && data.type && data.purpose) {
          setOptions(data)
          if (data.category.length > 0 && !data.category.find(c => c.value === selectedCategory)) {
            setSelectedCategory(data.category[0].value)
          }
        }
      })
      .catch(() => {
        console.error("Falha ao carregar opções dinâmicas no FilterBar")
      })
  }, [])

  const cities = useMemo(() => {
    const base = ['Álvares Florence', 'Votuporanga']
    const fromProps = properties.map(p => p.city?.trim()).filter((c): c is string => Boolean(c))
    return Array.from(new Set([...base, ...fromProps])).sort((a, b) => a.localeCompare(b, 'pt-BR'))
  }, [properties])

  const neighborhoods = useMemo(() => {
    const filteredProps = city
      ? properties.filter(p => p.city?.trim().toLowerCase() === city.trim().toLowerCase())
      : properties
    const fromProps = filteredProps.map(p => p.neighborhood?.trim()).filter((n): n is string => Boolean(n))
    const base = city ? [] : ['Centro', 'Zona Rural', 'Jardim das Flores']
    return Array.from(new Set([...base, ...fromProps])).sort((a, b) => a.localeCompare(b, 'pt-BR'))
  }, [properties, city])

  const handleCityChange = (newCity: string) => {
    setCity(newCity)
    setNeighborhood('')
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()

    // Se o usuário digitou um código e não clicou em uma aba de modalidade específica,
    // buscamos em todas as modalidades para não ocultar o imóvel buscado pelo código.
    const shouldIncludeCategory = selectedCategory && (!codigo.trim() || categoryTouched)
    if (shouldIncludeCategory) params.set('category', selectedCategory)
    if (finalidade) params.set('finalidade', finalidade)
    if (type) params.set('type', type)
    if (city) params.set('city', city)
    if (neighborhood) params.set('neighborhood', neighborhood)
    if (codigo.trim()) params.set('codigo', codigo.trim())
    if (bedrooms) params.set('bedrooms', bedrooms)
    if (bathrooms) params.set('bathrooms', bathrooms)
    if (priceMin.trim()) params.set('priceMin', priceMin.trim())
    if (priceMax.trim()) params.set('priceMax', priceMax.trim())

    const queryString = params.toString()
    router.push(queryString ? `/imoveis?${queryString}` : '/imoveis')
  }

  return (
    <div className="container mx-auto px-4 -mt-8 -mb-8 md:-mt-16 md:-mb-16 relative z-30">
      <form
        onSubmit={handleSearch}
        className="bg-white rounded-lg shadow-xl p-3.5 md:p-6 border-t-4 border-brand-600 flex flex-col gap-4"
      >
        {/* Botão compacto exclusivo para Mobile */}
        <button
          type="button"
          onClick={() => setMobileOpen(prev => !prev)}
          className="md:hidden w-full flex items-center justify-between gap-3 py-1.5 px-1 text-left"
        >
          <span className="flex items-center gap-2.5 text-slate-800 font-extrabold text-sm uppercase tracking-wider">
            <span className="w-8 h-8 rounded-md bg-brand-600 text-white flex items-center justify-center shrink-0 shadow-sm">
              <SlidersHorizontal size={16} />
            </span>
            Buscar e Filtrar Imóveis
          </span>
          <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-md bg-slate-100 text-brand-600 border border-slate-200">
            {mobileOpen ? 'Fechar' : 'Filtros'}
            {mobileOpen ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
          </span>
        </button>

        {/* Conteúdo dos filtros: sempre visível no Desktop (md:flex), expansível no Mobile */}
        <div className={`${mobileOpen ? 'flex border-t border-slate-100 pt-3' : 'hidden'} md:flex md:border-0 md:pt-0 flex-col gap-4`}>
        {/* Tabs - Dinâmicas a partir da Categoria */}
        <div className="flex flex-wrap gap-2 mb-2">
          {options.category.map(cat => (
            <button
              key={cat.value}
              type="button"
              onClick={() => {
                setCategoryTouched(true)
                setSelectedCategory(prev => (prev === cat.value ? '' : cat.value))
              }}
              className={`px-6 py-2 text-sm font-bold uppercase tracking-wider rounded-md transition-colors ${
                selectedCategory === cat.value
                  ? 'bg-brand-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Inputs - Linha 1 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="flex flex-col">
            <label className="text-xs text-slate-500 mb-1">Finalidade</label>
            <select
              value={finalidade}
              onChange={e => setFinalidade(e.target.value)}
              className="border border-slate-300 rounded-md p-3 text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              <option value="">Todas</option>
              {options.purpose.map(purp => (
                <option key={purp.value} value={purp.value}>{purp.label}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-xs text-slate-500 mb-1">Qual o tipo?</label>
            <select
              value={type}
              onChange={e => setType(e.target.value)}
              className="border border-slate-300 rounded-md p-3 text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              <option value="">Selecione o tipo</option>
              {options.type.map(t => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </div>
          
          <div className="flex flex-col">
            <label className="text-xs text-slate-500 mb-1">Cidade</label>
            <select
              value={city}
              onChange={e => handleCityChange(e.target.value)}
              className="border border-slate-300 rounded-md p-3 text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              <option value="">Selecione a cidade</option>
              {cities.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-xs text-slate-500 mb-1">Bairro</label>
            <select
              value={neighborhood}
              onChange={e => setNeighborhood(e.target.value)}
              className="border border-slate-300 rounded-md p-3 text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              <option value="">Todos os bairros</option>
              {neighborhoods.map(n => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-xs text-slate-500 mb-1">Código do Imóvel</label>
            <input
              type="text"
              value={codigo}
              onChange={e => setCodigo(e.target.value)}
              placeholder="Ex: 1234"
              className="border border-slate-300 rounded-md p-3 text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>
        </div>

        {/* Inputs - Linha 2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="flex flex-col">
            <label className="text-xs text-slate-500 mb-1">Quartos</label>
            <select
              value={bedrooms}
              onChange={e => setBedrooms(e.target.value)}
              className="border border-slate-300 rounded-md p-3 text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              <option value="">Qualquer</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-xs text-slate-500 mb-1">Banheiros</label>
            <select
              value={bathrooms}
              onChange={e => setBathrooms(e.target.value)}
              className="border border-slate-300 rounded-md p-3 text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              <option value="">Qualquer</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-xs text-slate-500 mb-1">Valor mínimo</label>
            <input
              type="text"
              value={priceMin}
              onChange={e => setPriceMin(e.target.value)}
              placeholder="R$ 0"
              className="border border-slate-300 rounded-md p-3 text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-xs text-slate-500 mb-1">Valor máximo</label>
            <input
              type="text"
              value={priceMax}
              onChange={e => setPriceMax(e.target.value)}
              placeholder="Sem limite"
              className="border border-slate-300 rounded-md p-3 text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              className="w-full bg-brand-600 hover:bg-brand-700 text-white p-3 rounded-md font-bold uppercase flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Search size={20} />
              Buscar
            </button>
          </div>
        </div>
        </div>

      </form>
    </div>
  )
}
