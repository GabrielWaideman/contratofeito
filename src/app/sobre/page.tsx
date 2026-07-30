'use client'

import React, { useEffect, useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Image from 'next/image'
import Link from 'next/link'
import {
  MapPin,
  Phone,
  MessageCircle,
  Award,
  Target,
  Eye,
  Shield,
  ChevronRight,
  Building2,
  TreePine,
  Handshake,
  Lightbulb,
  Users,
  Leaf,
} from 'lucide-react'

// ─── Tipos ────────────────────────────────────────────────────────────────────
type ValueItem = {
  title: string
  text: string
}

type AboutData = {
  heroTitle: string
  heroSubtitle: string
  bannerImageUrl: string | null
  historyText: string
  historyImageUrl: string | null
  missionText: string
  visionText: string
  valuesText: string
  cityName: string
  cityText: string
  cityImageUrl: string | null
  agentName: string
  agentCreci: string
  agentPhone: string
  agentWhatsapp: string
  agentImageUrl: string | null
  agentBio: string | null
}

const valueIcons = [Shield, Award, Lightbulb, Users, Leaf]

// ─── Skeleton ─────────────────────────────────────────────────────────────────
function Skeleton({ className }: { className?: string }) {
  return <div className={`bg-dark-700/60 animate-pulse rounded-lg ${className}`} />
}

function PageSkeleton() {
  return (
    <div className="min-h-screen bg-dark-950">
      <div className="h-[55vh] bg-dark-800 animate-pulse" />
      <div className="container mx-auto px-4 py-16 space-y-6">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-5 w-full max-w-3xl" />
        ))}
      </div>
    </div>
  )
}

// ─── Componente Principal ─────────────────────────────────────────────────────
export default function SobrePage() {
  const [data, setData] = useState<AboutData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/about')
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => setData(d))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <PageSkeleton />

  if (!data) {
    return (
      <div className="min-h-screen bg-dark-950 flex flex-col items-center justify-center text-white">
        <Header theme="dark" />
        <p className="text-slate-400 text-base mt-32 px-4 text-center">Conteúdo em construção. Volte em breve.</p>
      </div>
    )
  }

  const values: ValueItem[] = (() => {
    try {
      return JSON.parse(data.valuesText)
    } catch {
      return []
    }
  })()

  const historyParagraphs = data.historyText.split('\n\n').filter(Boolean)

  return (
    <div className="min-h-screen bg-dark-950 overflow-x-hidden">
      <Header theme="dark" />

      {/* ─── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[55vh] sm:min-h-[65vh] flex items-center py-10 pt-28 sm:pt-32 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          {data.bannerImageUrl ? (
            <Image
              src={data.bannerImageUrl}
              alt="Banner Sobre Nós"
              fill
              className="object-cover object-top sm:object-center"
              priority
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950" />
          )}
          {/* Overlay mais denso no mobile para legibilidade */}
          <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/70 to-dark-900/40" />
          {/* Blobs */}
          <div className="absolute top-16 right-0 sm:right-1/4 w-[200px] sm:w-[500px] h-[200px] sm:h-[500px] bg-brand-600/15 rounded-full blur-[70px] sm:blur-[120px]" />
          <div className="absolute bottom-8 left-0 sm:left-1/4 w-[160px] sm:w-[400px] h-[160px] sm:h-[400px] bg-gold-500/10 rounded-full blur-[50px] sm:blur-[100px]" />
        </div>

        {/* Decorative grid */}
        <div
          className="absolute inset-0 z-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(to right, #dc2626 1px, transparent 1px), linear-gradient(to bottom, #dc2626 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        <div className="container mx-auto px-5 md:px-8 relative z-10 w-full">
          <div className="max-w-4xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-1.5 bg-brand-600/20 border border-brand-600/30 text-white text-[9px] sm:text-xs font-bold uppercase tracking-widest px-2.5 sm:px-4 py-1 sm:py-2 rounded-full mb-3 sm:mb-6">
              <Building2 size={11} className="text-brand-500" />
              Contrato Feito Imobiliária Digital
            </div>

            {/* Título */}
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-extrabold text-white leading-tight tracking-tight uppercase mb-3 sm:mb-6">
              {data.heroTitle}
            </h1>

            {/* Subtítulo — visível no mobile mas menor */}
            <p className="text-sm sm:text-lg md:text-xl text-slate-300 max-w-2xl leading-relaxed mb-1 sm:mb-0">
              {data.heroSubtitle}
            </p>

            {/* Stats bar */}
            <div className="flex gap-5 sm:gap-8 mt-5 sm:mt-12 pt-4 sm:pt-8 border-t border-white/10">
              {[
                { value: '10+', label: 'Anos de Mercado' },
                { value: '100%', label: 'Digital' },
                { value: data.agentCreci.replace(/CRECI\s*(SP)?\s*/i, ''), label: 'CRECI' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-xl sm:text-3xl font-black text-brand-500 leading-none">{stat.value}</div>
                  <div className="text-[10px] sm:text-sm text-slate-400 font-medium mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── HISTÓRIA ─────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-dark-900 relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-600/30 to-transparent" />

        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-stretch">
            {/* Texto */}
            <div>
              <h2 className="text-brand-600 font-bold tracking-widest text-xs uppercase mb-3 border-l-4 border-brand-600 pl-3">
                Nossa Trajetória
              </h2>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight tracking-tight uppercase mb-8">
                Uma jornada de{' '}
                <span className="text-brand-500">determinação</span> e{' '}
                <span className="text-gold-400">paixão</span>
              </h3>

              <div className="space-y-5">
                {historyParagraphs.map((para, idx) => (
                  <p key={idx} className="text-slate-300 leading-relaxed text-sm sm:text-base">
                    {para}
                  </p>
                ))}
              </div>
            </div>

            {/* Visual column: Missão / Visão / Imagem */}
            <div className="flex flex-col gap-5 h-full">
              {/* Card Missão */}
              <div className="bg-dark-800/60 backdrop-blur border border-dark-700/50 rounded-2xl p-6 sm:p-8 relative overflow-hidden group hover:border-brand-600/40 transition-all duration-300">
                <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-brand-600 to-transparent" />
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-brand-600/20 border border-brand-600/30 flex items-center justify-center shrink-0">
                    <Target size={16} className="text-brand-500" />
                  </div>
                  <h4 className="text-white font-extrabold text-base sm:text-lg uppercase tracking-wide">Missão</h4>
                </div>
                <p className="text-slate-300 leading-relaxed text-sm">{data.missionText}</p>
              </div>

              {/* Card Visão */}
              <div className="bg-dark-800/60 backdrop-blur border border-dark-700/50 rounded-2xl p-6 sm:p-8 relative overflow-hidden group hover:border-gold-500/40 transition-all duration-300">
                <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-gold-500 to-transparent" />
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gold-500/20 border border-gold-500/30 flex items-center justify-center shrink-0">
                    <Eye size={16} className="text-gold-400" />
                  </div>
                  <h4 className="text-white font-extrabold text-base sm:text-lg uppercase tracking-wide">Visão</h4>
                </div>
                <p className="text-slate-300 leading-relaxed text-sm">{data.visionText}</p>
              </div>

              {/* Imagem decorativa — oculta no mobile se for apenas logo fallback */}
              {data.historyImageUrl ? (
                <div className="rounded-2xl overflow-hidden h-52 sm:flex-1 sm:min-h-[12rem] relative">
                  <Image
                    src={data.historyImageUrl}
                    alt="Imagem Nossa Trajetória"
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                // Sem imagem: mostra só no desktop como elemento decorativo
                <div className="hidden lg:flex flex-1 rounded-2xl items-center justify-center min-h-[12rem] relative overflow-hidden group">
                  <div className="absolute inset-0 bg-dark-800/10 backdrop-blur-sm flex items-center justify-center rounded-2xl">
                    <Image
                      src="/logo.png"
                      alt="Contrato Feito Logo"
                      width={220}
                      height={80}
                      className="object-contain opacity-50 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-md"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ─── VALORES E PRINCÍPIOS ─────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-white relative">
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-brand-600 font-bold tracking-widest text-xs uppercase mb-3">
              A Contrato Feito
            </h2>
            <h3 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-slate-900 uppercase tracking-tight">
              Valores e Princípios
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 max-w-5xl mx-auto">
            {values.map((val, idx) => {
              const Icon = valueIcons[idx] ?? Shield
              return (
                <div
                  key={idx}
                  className={`bg-slate-50 border border-slate-200 rounded-xl sm:rounded-2xl p-4 sm:p-8 hover:shadow-xl hover:shadow-slate-200/50 hover:border-brand-200 hover:-translate-y-1 transition-all duration-300 group flex sm:flex-col items-start gap-4 sm:gap-0 ${
                    idx === values.length - 1 && values.length % 2 !== 0 && values.length % 3 !== 0
                      ? 'sm:col-span-2 lg:col-span-1'
                      : ''
                  }`}
                >
                  <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center shrink-0 sm:mb-5 group-hover:border-brand-200 group-hover:bg-brand-50 transition-colors">
                    <Icon size={17} className="text-brand-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-slate-900 font-extrabold text-sm sm:text-lg mb-1 sm:mb-2 leading-snug">
                      {val.title}
                    </h4>
                    <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">{val.text}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── ÁLVARES FLORENCE ─────────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-dark-900 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
        <div className="absolute bottom-0 right-0 w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bg-gold-500/5 rounded-full blur-[80px] sm:blur-[100px]" />

        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
            {/* Imagem — aparece abaixo do texto no mobile */}
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-2xl order-2 lg:order-1 group">
              {data.cityImageUrl ? (
                <Image
                  src={data.cityImageUrl}
                  alt={data.cityName}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-dark-800 to-dark-700 flex items-center justify-center">
                  <div className="text-center text-slate-500">
                    <MapPin size={40} className="mx-auto mb-2" />
                    <p className="text-sm">Imagem da cidade</p>
                  </div>
                </div>
              )}
              {/* Overlay + badge */}
              <div className="absolute inset-0 bg-gradient-to-t from-dark-950/80 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-2.5 sm:p-3 flex items-center gap-2.5 sm:gap-3">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gold-500/20 border border-gold-500/30 flex items-center justify-center shrink-0">
                    <MapPin size={13} className="text-gold-400" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-xs sm:text-sm leading-tight">{data.cityName}, SP</p>
                    <p className="text-white/60 text-[11px] sm:text-xs">Nossa sede e região de atuação</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Texto */}
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 bg-gold-500/15 border border-gold-500/25 text-gold-400 text-[10px] sm:text-xs font-bold uppercase tracking-widest px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-5 sm:mb-6">
                <MapPin size={11} />
                Nossa Cidade
              </div>
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white uppercase tracking-tight leading-tight mb-1">
                Prazer,
              </h3>
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gold-400 uppercase tracking-tight leading-tight mb-6 sm:mb-8">
                {data.cityName}!
              </h3>
              <p className="text-slate-300 leading-relaxed text-sm sm:text-base">{data.cityText}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CORRETOR RESPONSÁVEL ─────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-dark-950 relative">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(220,38,38,0.08)_0%,_transparent_70%)]" />
        </div>

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-brand-600 font-bold tracking-widest text-xs uppercase mb-3">
              Quem nos representa
            </h2>
            <h3 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-white uppercase tracking-tight">
              Corretor Responsável
            </h3>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="bg-dark-800/60 backdrop-blur-xl border border-dark-700/50 rounded-3xl p-6 sm:p-8 md:p-12 shadow-2xl relative overflow-hidden">
              {/* Top accent */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-600 via-gold-500 to-brand-600" />

              <div className="flex flex-col items-center gap-6 sm:gap-8">
                {/* Avatar — centralizado no mobile */}
                <div className="relative shrink-0">
                  <div className="w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 rounded-2xl overflow-hidden border-4 border-dark-700 shadow-xl">
                    {data.agentImageUrl ? (
                      <Image
                        src={data.agentImageUrl}
                        alt={data.agentName}
                        width={176}
                        height={176}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-brand-700 to-brand-900 flex items-center justify-center">
                        <span className="text-white font-black text-4xl sm:text-5xl">
                          {data.agentName.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>
                  {/* Badge Logo */}
                  <div className="absolute -bottom-3 -right-3 bg-white p-1.5 sm:p-2 rounded-xl shadow-xl flex items-center justify-center h-9 sm:h-10 w-auto border-2 border-dark-800">
                    <Image src="/logo.png" alt="Contrato Feito Logo" width={60} height={20} className="h-full w-auto object-contain" />
                  </div>
                </div>

                {/* Info — sempre centralizado */}
                <div className="flex-1 text-center w-full">
                  <h4 className="text-white font-extrabold text-xl sm:text-2xl md:text-3xl tracking-tight mb-1">
                    {data.agentName}
                  </h4>
                  <p className="text-brand-400 font-bold text-xs sm:text-sm uppercase tracking-widest mb-5">
                    {data.agentCreci}
                  </p>

                  {data.agentBio && (
                    <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-md mx-auto">{data.agentBio}</p>
                  )}

                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <a
                      href={`tel:${data.agentPhone.replace(/\D/g, '')}`}
                      className="inline-flex items-center justify-center gap-2 bg-dark-700 hover:bg-dark-600 border border-dark-600 hover:border-dark-500 text-white font-semibold text-sm px-5 py-3 rounded-xl transition-all"
                    >
                      <Phone size={15} />
                      {data.agentPhone}
                    </a>
                    <a
                      href={data.agentWhatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm px-6 py-3 rounded-xl transition-all shadow-lg shadow-emerald-600/20 hover:shadow-emerald-500/30"
                    >
                      <MessageCircle size={15} />
                      Falar no WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA FINAL ────────────────────────────────────────────────────── */}
      <section className="py-14 sm:py-20 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h3 className="text-xl sm:text-2xl md:text-4xl font-extrabold text-slate-900 uppercase tracking-tight mb-3 sm:mb-4 px-2">
            Pronto para encontrar o seu imóvel?
          </h3>
          <p className="text-slate-600 text-sm sm:text-base mb-7 sm:mb-8 max-w-xl mx-auto px-2">
            Navegue pelo nosso catálogo e descubra as melhores oportunidades urbanas e rurais da região.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0">
            <Link
              href="/imoveis"
              className="inline-flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-bold px-7 py-3.5 sm:px-8 sm:py-4 rounded-xl transition-all shadow-lg shadow-brand-600/20 hover:shadow-brand-600/30 text-sm uppercase tracking-wider"
            >
              Ver Imóveis
              <ChevronRight size={16} />
            </Link>
            <a
              href={data.agentWhatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-slate-300 hover:border-brand-600 text-slate-700 hover:text-brand-600 bg-white hover:bg-brand-50 font-semibold px-7 py-3.5 sm:px-8 sm:py-4 rounded-xl transition-all text-sm uppercase tracking-wider shadow-sm"
            >
              <MessageCircle size={15} />
              Falar com Corretor
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
