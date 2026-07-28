'use client'

import { notFound } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { getPropertyById, getSuggestedProperties, Property } from '@/lib/properties'
import {
  MapPin, Bed, Bath, Square, CheckCircle2,
  ChevronLeft, ChevronRight, Phone,
  ArrowLeft, Star, Car, Trees, X, ZoomIn,
  Home, Ruler
} from 'lucide-react'

// ─── Galeria: apenas foto principal + thumbs mobile ────────────────────────────
// O active state e as thumbs desktop são controlados pela página pai
function PhotoGallery({
  images, title, active, setActive
}: {
  images: string[]
  title: string
  active: number
  setActive: (i: number) => void
}) {
  const [lightbox, setLightbox] = useState(false)

  const prev = () => setActive(active === 0 ? images.length - 1 : active - 1)
  const next = () => setActive(active === images.length - 1 ? 0 : active + 1)

  useEffect(() => {
    if (!lightbox) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'Escape') setLightbox(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightbox, active])

  return (
    <>
      {/* Foto principal — sem wrapper de thumbnails, só a foto */}
      <div
        className="relative w-full rounded-2xl overflow-hidden cursor-zoom-in group shadow-md bg-gray-100"
        style={{ aspectRatio: '16/9' }}
        onClick={() => setLightbox(true)}
      >
        <img
          src={images[active]}
          alt={`${title} - foto ${active + 1}`}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
        />

        {/* Setas */}
        <button
          onClick={(e) => { e.stopPropagation(); prev() }}
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 md:opacity-0 md:group-hover:opacity-100 backdrop-blur-sm"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); next() }}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 md:opacity-0 md:group-hover:opacity-100 backdrop-blur-sm"
        >
          <ChevronRight size={20} />
        </button>

        {/* Contador */}
        <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm text-gray-700 text-xs font-semibold px-3 py-1.5 rounded-full shadow flex items-center gap-1.5">
          <ZoomIn size={11} />
          {active + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnails horizontais — MOBILE only */}
      <div className="flex md:hidden gap-2 mt-2.5 overflow-x-auto pb-0.5">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`shrink-0 w-16 h-12 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
              active === i
                ? 'border-brand-600 shadow-md opacity-100'
                : 'border-transparent opacity-50 hover:opacity-80'
            }`}
          >
            <img src={img} alt={`thumb ${i + 1}`} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[300] bg-black/80 backdrop-blur-md flex items-center justify-center"
          onClick={() => setLightbox(false)}
        >
          <button
            className="absolute top-5 right-5 w-10 h-10 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-all"
            onClick={() => setLightbox(false)}
          >
            <X size={18} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); prev() }}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/15 hover:bg-brand-600 text-white w-12 h-12 rounded-full flex items-center justify-center transition-all"
          >
            <ChevronLeft size={22} />
          </button>
          <img
            src={images[active]}
            alt={title}
            className="max-w-[90vw] max-h-[85vh] object-contain rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={(e) => { e.stopPropagation(); next() }}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/15 hover:bg-brand-600 text-white w-12 h-12 rounded-full flex items-center justify-center transition-all"
          >
            <ChevronRight size={22} />
          </button>
          <p className="absolute bottom-5 text-white/40 text-sm font-mono">{active + 1} / {images.length}</p>
        </div>
      )}
    </>
  )
}

// ─── Barra de Info Abaixo da Galeria ──────────────────────────────────────────
function InfoStrip({ property, whatsappMsg }: { property: Property; whatsappMsg: string }) {
  const price = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(property.price)

  type MetricEntry = { icon: React.ReactNode; value: string | number; label: string }
  const metrics: MetricEntry[] = [
    property.bedrooms > 0 && { icon: <Bed size={19} />, value: property.bedrooms, label: 'Quartos' },
    property.suites > 0 && { icon: <Home size={19} />, value: property.suites, label: 'Suítes' },
    property.bathrooms > 0 && { icon: <Bath size={19} />, value: property.bathrooms, label: 'Banheiros' },
    property.garageSpots > 0 && { icon: <Car size={19} />, value: property.garageSpots, label: 'Vagas' },
    property.builtArea && property.builtArea > 0 && {
      icon: <Ruler size={19} />,
      value: `${property.builtArea.toLocaleString('pt-BR')} ${property.builtAreaUnit ?? 'm²'}`,
      label: 'Área construída',
    },
    {
      icon: property.areaUnit?.toLowerCase().includes('alq') ? <Trees size={19} /> : <Square size={19} />,
      value: `${property.area.toLocaleString('pt-BR')} ${property.areaUnit ?? 'm²'}`,
      label: 'Área total',
    },
  ].filter(Boolean) as MetricEntry[]

  return (
    <div className="mt-4 rounded-2xl border border-gray-100 bg-white/60 backdrop-blur-sm overflow-hidden shadow-sm">

      {/* Linha de topo: título + localização + preço */}
      <div className="px-6 md:px-8 pt-6 pb-5 border-b border-gray-100">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">

          {/* Esquerda: badges, título, localização */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="text-[11px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-brand-50 text-brand-700 border border-brand-100">
                {property.category}
              </span>
              {property.isFeatured && (
                <span className="text-[11px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-100 flex items-center gap-1">
                  <Star size={9} fill="currentColor" /> Destaque
                </span>
              )}
              <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-gray-50 text-gray-400 border border-gray-100">
                Cód. #{String(property.id).padStart(4, '0')}
              </span>
            </div>

            <h1 className="text-gray-900 font-extrabold text-2xl md:text-3xl leading-snug tracking-tight mb-2">
              {property.title}
            </h1>

            <div className="flex items-center gap-1.5 text-gray-600 text-base font-medium">
              <MapPin size={14} className="text-brand-600 shrink-0" />
              {property.neighborhood} · {property.city} — {property.state}
            </div>
          </div>

          {/* Direita: preço dentro de retângulo vermelho */}
          <div className="shrink-0">
            <p className="text-gray-400 text-[11px] uppercase tracking-widest font-semibold mb-2 md:text-right">
              {property.category === 'Locação' ? 'Aluguel mensal' : 'Valor de venda'}
            </p>
            <div className="bg-brand-600 rounded-xl px-5 py-3.5 text-white shadow-md shadow-brand-200">
              <p className="font-black leading-none text-white" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.4rem)' }}>
                {price}
              </p>
              {property.category === 'Locação' && (
                <span className="text-white/70 text-sm font-normal">/mês</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Linha de métricas — grid proporcional, sem scroll em nenhum tamanho */}
      <div className="px-6 md:px-8 pt-5 pb-4 border-b border-gray-100">
        <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${metrics.length}, 1fr)` }}>
          {metrics.map(({ icon, value, label }) => (
            <div key={label} className="flex flex-col items-center gap-1 group text-center">
              <span className="text-brand-600 group-hover:scale-110 transition-transform duration-200">
                {icon}
              </span>
              <p className="text-gray-900 font-extrabold text-sm md:text-xl leading-none">{value}</p>
              <p className="text-gray-400 text-[9px] md:text-[10px] uppercase tracking-wider font-medium">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Linha de botões de contato */}
      <div className="px-6 md:px-8 py-5 flex flex-col sm:flex-row gap-3">
        <a
          href={`https://wa.me/5517999999999?text=${whatsappMsg}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe57] text-white font-bold text-sm py-3.5 px-7 rounded-xl shadow-sm hover:shadow-md hover:shadow-green-200 transition-all duration-200 hover:-translate-y-0.5 whitespace-nowrap"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          Falar no WhatsApp
        </a>
        <a
          href="tel:+5517999999999"
          className="inline-flex items-center justify-center gap-2 bg-white border border-gray-200 hover:border-brand-500 text-gray-700 hover:text-brand-700 font-bold text-sm py-3.5 px-7 rounded-xl transition-all duration-200 hover:-translate-y-0.5 whitespace-nowrap shadow-sm"
        >
          <Phone size={15} className="text-brand-600" />
          Ligar Agora
        </a>
      </div>

      {/* Rodapé do strip: CRECI */}
      <div className="px-6 md:px-8 pb-4 border-t border-gray-50">
        <p className="text-gray-500 text-xs font-semibold pt-3">
          CRECI-SP 246817F &nbsp;·&nbsp; Atendimento de segunda a sábado &nbsp;·&nbsp; Contrato Feito Imobiliária
        </p>
      </div>
    </div>
  )
}

// ─── Carrossel de Sugestões ────────────────────────────────────────────────────
function SuggestionsCarousel({ properties }: { properties: Property[] }) {
  const [index, setIndex] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const visibleCount = 3
  const maxIndex = Math.max(0, properties.length - visibleCount)

  const resetTimer = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => setIndex((i) => (i >= maxIndex ? 0 : i + 1)), 5000)
  }

  useEffect(() => {
    resetTimer()
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [maxIndex])

  const priceFormat = (p: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0 }).format(p)

  return (
    <div>
      <div className="flex justify-between items-end mb-8">
        <div>
          <p className="text-brand-600 text-xs font-bold uppercase tracking-widest mb-1">Seleção especial</p>
          <h2 className="text-gray-900 text-2xl md:text-3xl font-extrabold tracking-tight">Você também pode gostar</h2>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => { setIndex((i) => Math.max(i - 1, 0)); resetTimer() }}
            disabled={index === 0}
            className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-brand-600 hover:border-brand-600 hover:text-white disabled:opacity-25 transition-all shadow-sm"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => { setIndex((i) => Math.min(i + 1, maxIndex)); resetTimer() }}
            disabled={index >= maxIndex}
            className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-brand-600 hover:border-brand-600 hover:text-white disabled:opacity-25 transition-all shadow-sm"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div className="overflow-hidden">
        <div
          className="flex gap-5 transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(calc(-${index} * (100% / ${visibleCount} + 8px)))` }}
        >
          {properties.map((p) => (
            <div key={p.id} className="shrink-0 w-full md:w-[calc(33.333%-14px)]">
              <Link href={`/imoveis/${p.id}`} className="block group">
                <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-gray-200 transition-all duration-300 hover:-translate-y-1.5">
                  <div className="relative h-48 overflow-hidden">
                    <img src={p.imageUrl} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <div className="absolute bottom-3 left-3">
                      <span className="bg-white text-gray-900 font-bold text-sm px-3 py-1.5 rounded-lg shadow border-b-[3px] border-brand-600">
                        {priceFormat(p.price)}
                        {p.category === 'Locação' && <span className="text-gray-400 text-xs font-normal">/mês</span>}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-1.5 text-brand-600 text-xs font-bold uppercase tracking-wider mb-2">
                      <MapPin size={11} className="shrink-0" />
                      <span className="truncate">{p.neighborhood} · {p.city}</span>
                    </div>
                    <h3 className="text-gray-900 font-bold text-sm line-clamp-2 mb-3">{p.title}</h3>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-gray-400 text-xs border-t border-gray-100 pt-3">
                      {p.bedrooms > 0 && <span className="flex items-center gap-1"><Bed size={12} className="text-brand-500" /> {p.bedrooms} qtos</span>}
                      {p.bathrooms > 0 && <span className="flex items-center gap-1"><Bath size={12} className="text-brand-500" /> {p.bathrooms} ban.</span>}
                      <span className="flex items-center gap-1"><Square size={12} className="text-brand-500" /> {p.area} {p.areaUnit}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-2 justify-center mt-7">
        {Array.from({ length: maxIndex + 1 }).map((_, i) => (
          <button
            key={i}
            onClick={() => { setIndex(i); resetTimer() }}
            className={`rounded-full transition-all duration-300 ${i === index ? 'w-7 h-2.5 bg-brand-600' : 'w-2.5 h-2.5 bg-gray-200 hover:bg-gray-300'}`}
          />
        ))}
      </div>
    </div>
  )
}

// ─── Componente Principal (Client) ──────────────────────────────────────────────
export default function PropertyClient({ 
  property, 
  suggestions 
}: { 
  property: Property, 
  suggestions: Property[] 
}) {
  const [activePhoto, setActivePhoto] = useState(0)
  
  const whatsappMsg = encodeURIComponent(
    `Olá! Tenho interesse no imóvel "${property.title}" (Cód. ${property.id}) que vi no site.`
  )

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans selection:bg-brand-200">
      <Header />

      <main className="flex-1 pt-32 pb-24">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">

          {/* Layout Principal: Imagem + Thumbs em uma linha, e InfoStrip embaixo da imagem. */}
          <div className="flex flex-col gap-3">
            
            {/* Linha 1: Foto + Thumbs */}
            <div className="flex gap-4 w-full items-stretch">
              {/* Foto Principal */}
              <div className="flex-1 min-w-0">
                <PhotoGallery
                  images={property.images}
                  title={property.title}
                  active={activePhoto}
                  setActive={setActivePhoto}
                />
              </div>

              {/* Thumbnails DESKTOP (Fixado na altura da imagem principal) */}
              <div className="hidden md:block shrink-0 w-[110px] relative">
                {/* O absolute inset-0 faz a div ter exatamente 100% da altura do flex pai (Foto) */}
                <div 
                  className="absolute inset-0 flex flex-col gap-3 overflow-y-auto overflow-x-hidden pr-2.5"
                  style={{ scrollbarWidth: 'thin', scrollbarColor: '#cbd5e1 transparent' }}
                >
                  {property.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActivePhoto(i)}
                      className={`w-full shrink-0 aspect-square rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                        activePhoto === i
                          ? 'border-brand-600 shadow-md opacity-100'
                          : 'border-gray-200 opacity-50 hover:opacity-80 hover:border-gray-300'
                      }`}
                    >
                      <img src={img} alt={`thumb ${i + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Linha 2: InfoStrip (126px é 110px da galeria + 16px do gap-4) */}
            <div className="w-full md:w-[calc(100%-126px)]">
              <InfoStrip property={property} whatsappMsg={whatsappMsg} />
            </div>
          </div>

          {/* ── Divisor ── */}
          <div className="my-12 h-px bg-gray-100" />

          {/* ── Descrição ── */}
          <section className="mb-10 max-w-3xl">
            <h2 className="text-gray-900 font-extrabold text-xl mb-5 flex items-center gap-3">
              <span className="w-1 h-6 rounded-full bg-brand-600 inline-block" />
              Sobre este imóvel
            </h2>
            <p className="text-gray-500 leading-loose text-base">{property.description}</p>
          </section>

          {/* ── Diferenciais ── */}
          {property.features && property.features.length > 0 && (
            <section className="mb-16">
              <h2 className="text-gray-900 font-extrabold text-xl mb-5 flex items-center gap-3">
                <span className="w-1 h-6 rounded-full bg-brand-600 inline-block" />
                Diferenciais
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {property.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-3 text-gray-600 text-sm bg-white rounded-xl px-4 py-3.5 border border-gray-100 shadow-sm hover:border-brand-200 hover:shadow-md transition-all duration-200"
                  >
                    <CheckCircle2 size={15} className="text-brand-600 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* ── Imóveis sugeridos ── */}
          <div className="pt-16 border-t border-gray-200">
            <SuggestionsCarousel properties={suggestions} />
          </div>

        </div>
      </main>

      <Footer />
    </div>
  )
}
