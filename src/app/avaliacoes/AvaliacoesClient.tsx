'use client'

import React, { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import {
  TrendingUp,
  FileCheck2,
  CheckCircle2,
  User,
  Home,
  FileText,
  MessageSquare,
  MapPin,
  ShieldCheck,
  AlertCircle,
  Sparkles,
} from 'lucide-react'

type EvaluationType = 'simples' | 'completa'

const WHATSAPP_NUMBER = '5517997225062'

function formatPhoneMask(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 11)
  if (digits.length === 0) return ''
  if (digits.length <= 2) return `(${digits}`
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`
  }
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`
}

export default function AvaliacoesClient() {
  const [evaluationType, setEvaluationType] = useState<EvaluationType>('simples')

  // Seção 1: Dados do Proprietário / Solicitante
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [relation, setRelation] = useState('Proprietário')

  // Seção 2: Dados do Imóvel
  const [purpose, setPurpose] = useState('Venda')
  const [category, setCategory] = useState('Urbano - Casa')
  const [city, setCity] = useState('')
  const [neighborhood, setNeighborhood] = useState('')
  const [address, setAddress] = useState('')
  const [totalArea, setTotalArea] = useState('')
  const [totalAreaUnit, setTotalAreaUnit] = useState('m²')
  const [builtArea, setBuiltArea] = useState('')
  const [bedrooms, setBedrooms] = useState('')
  const [bathrooms, setBathrooms] = useState('')
  const [garageSpots, setGarageSpots] = useState('')
  const [conservation, setConservation] = useState('Ótimo estado')

  // Seção 3: Campos Condicionais (Avaliação Completa e Documental)
  const [documentStatus, setDocumentStatus] = useState('Escritura/Matrícula registrada em dia')
  const [needsPtam, setNeedsPtam] = useState('Sim')

  // Seção 4: Observações Finais
  const [notes, setNotes] = useState('')

  const [error, setError] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!name.trim()) {
      setError('Por favor, preencha o seu Nome Completo.')
      return
    }
    const cleanDigits = phone.replace(/\D/g, '')
    if (cleanDigits.length < 10) {
      setError('Por favor, informe um Telefone / WhatsApp válido com DDD.')
      return
    }
    if (!city.trim() || !neighborhood.trim() || !address.trim()) {
      setError('Por favor, preencha a Cidade, o Bairro/Região e o Endereço aproximado do imóvel.')
      return
    }

    const modalidadeLabel =
      evaluationType === 'simples'
        ? 'Simples (Mercadológica)'
        : 'Completa/Documental'

    const areaTotalText = totalArea.trim() ? `${totalArea.trim()} ${totalAreaUnit}` : 'Não informada'
    const areaConstruidaText = builtArea.trim() ? `${builtArea.trim()} m²` : 'Não informada'
    const quartosText = bedrooms.trim() || '0'
    const banheirosText = bathrooms.trim() || '0'
    const vagasText = garageSpots.trim() || '0'
    const obsText = notes.trim() || 'Nenhuma observação adicional.'

    const lines: string[] = [
      'Olá! Gostaria de solicitar uma avaliação imobiliária pelo site.',
      '',
      `📋 *Modalidade escolhida:* ${modalidadeLabel}`,
      `👤 *Solicitante:* ${name.trim()} (${relation})`,
      `📞 *Contato:* ${phone.trim()}`,
      `🏠 *Imóvel:* ${category} - *Finalidade:* ${purpose}`,
      `📍 *Localização:* ${address.trim()}, ${neighborhood.trim()} - ${city.trim()}`,
      `📐 *Medidas e Cômodos:* Área Total: ${areaTotalText} | Área Construída: ${areaConstruidaText} | Quartos: ${quartosText} | Banheiros: ${banheirosText} | Vagas: ${vagasText}`,
      `✨ *Conservação:* ${conservation}`,
    ]

    if (evaluationType === 'completa') {
      lines.push(
        `📄 *Situação Documental:* ${documentStatus} | *Precisa de PTAM:* ${needsPtam}`
      )
    }

    lines.push(`💬 *Observações:* ${obsText}`)

    const message = lines.join('\n')

    // Registra a solicitação imediatamente no banco de dados (mesmo que o cliente não conclua o envio no WhatsApp)
    fetch('/api/evaluations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      keepalive: true,
      body: JSON.stringify({
        modality: modalidadeLabel,
        name: name.trim(),
        phone: phone.trim(),
        relation,
        purpose,
        category,
        city: city.trim(),
        neighborhood: neighborhood.trim(),
        address: address.trim(),
        totalArea: areaTotalText,
        builtArea: areaConstruidaText,
        bedrooms: quartosText,
        bathrooms: banheirosText,
        garageSpots: vagasText,
        conservation,
        documentStatus: evaluationType === 'completa' ? documentStatus : null,
        needsPtam: evaluationType === 'completa' ? needsPtam : null,
        notes: obsText,
        formattedMessage: message,
      }),
    }).catch(() => {})

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 overflow-x-hidden">
      <Header />

      <main className="flex-1 pt-28 pb-24">
        {/* ─── Hero Section ──────────────────────────────────────────────────────── */}
        <section className="relative bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950 border-b border-dark-800 py-16 md:py-20 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none opacity-25">
            <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-brand-600/20 blur-3xl" />
            <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-brand-500/10 blur-3xl" />
          </div>

          <div className="container mx-auto px-4 md:px-8 relative z-10 text-center max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-600/15 border border-brand-500/30 text-brand-400 text-xs font-extrabold uppercase tracking-widest mb-5">
              <ShieldCheck size={14} />
              Emerson Antonio · CRECI-SP 246817F
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-5">
              Avalie seu Imóvel com <span className="text-brand-500">Precisão e Segurança</span>
            </h1>

            <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-light">
              Escolha a modalidade ideal para a sua necessidade e receba um atendimento especializado diretamente no seu WhatsApp.
            </p>
          </div>
        </section>

        {/* ─── Conteúdo Principal ────────────────────────────────────────────────── */}
        <div className="container mx-auto px-4 md:px-8 max-w-4xl -mt-8 relative z-20">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* ─── Seletor de Tipo de Avaliação ──────────────────────────────────── */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8">
              <div className="mb-5">
                <span className="text-xs font-extrabold uppercase tracking-widest text-brand-600">
                  Passo 1 · Modalidade
                </span>
                <h2 className="text-xl md:text-2xl font-extrabold text-gray-900 mt-1">
                  Selecione o Tipo de Avaliação
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Card 1: Avaliação Simples */}
                <button
                  type="button"
                  onClick={() => setEvaluationType('simples')}
                  className={`text-left rounded-2xl p-6 border-2 transition-all duration-200 relative flex flex-col justify-between gap-4 cursor-pointer ${
                    evaluationType === 'simples'
                      ? 'border-brand-600 bg-brand-50/40 shadow-md ring-2 ring-brand-500/15'
                      : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50/60'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                        evaluationType === 'simples'
                          ? 'bg-brand-600 text-white shadow-sm'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      <TrendingUp size={24} />
                    </div>
                    <span
                      className={`inline-flex items-center gap-1 text-xs font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                        evaluationType === 'simples'
                          ? 'bg-brand-600 text-white'
                          : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {evaluationType === 'simples' ? (
                        <>
                          <CheckCircle2 size={12} /> Selecionada
                        </>
                      ) : (
                        'Selecionar'
                      )}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-extrabold text-gray-900 mb-1.5">
                      Avaliação Simples (Mercadológica)
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Ideal para proprietários que desejam saber o valor estimado para venda ou locação rápida no mercado atual.
                    </p>
                  </div>
                </button>

                {/* Card 2: Avaliação Completa e Documental */}
                <button
                  type="button"
                  onClick={() => setEvaluationType('completa')}
                  className={`text-left rounded-2xl p-6 border-2 transition-all duration-200 relative flex flex-col justify-between gap-4 cursor-pointer ${
                    evaluationType === 'completa'
                      ? 'border-brand-600 bg-brand-50/40 shadow-md ring-2 ring-brand-500/15'
                      : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50/60'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                        evaluationType === 'completa'
                          ? 'bg-brand-600 text-white shadow-sm'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      <FileCheck2 size={24} />
                    </div>
                    <span
                      className={`inline-flex items-center gap-1 text-xs font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                        evaluationType === 'completa'
                          ? 'bg-brand-600 text-white'
                          : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {evaluationType === 'completa' ? (
                        <>
                          <CheckCircle2 size={12} /> Selecionada
                        </>
                      ) : (
                        'Selecionar'
                      )}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-extrabold text-gray-900 mb-1.5">
                      Avaliação Completa e Documental
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Análise aprofundada com parecer técnico (PTAM) e verificação documental. Ideal para inventários, partilhas, processos ou venda segura.
                    </p>
                  </div>
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-5 py-4 rounded-2xl flex items-center gap-3 text-sm font-semibold shadow-sm">
                <AlertCircle size={20} className="shrink-0 text-red-600" />
                <span>{error}</span>
              </div>
            )}

            {/* ─── Seção 1: Dados do Proprietário / Solicitante ──────────────────── */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center shrink-0">
                  <User size={20} />
                </div>
                <div>
                  <h2 className="text-lg font-extrabold text-gray-900">
                    1. Dados do Proprietário / Solicitante
                  </h2>
                  <p className="text-xs text-gray-500">Informe seus dados para retorno do corretor avaliador.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="md:col-span-1">
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Seu nome completo"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 text-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    Telefone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(formatPhoneMask(e.target.value))}
                    placeholder="(00) 00000-0000"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 text-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    Relação com o imóvel
                  </label>
                  <select
                    value={relation}
                    onChange={(e) => setRelation(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 text-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15 outline-none transition-all"
                  >
                    <option value="Proprietário">Proprietário</option>
                    <option value="Herdeiro">Herdeiro</option>
                    <option value="Representante/Procurador">Representante/Procurador</option>
                    <option value="Outro">Outro</option>
                  </select>
                </div>
              </div>
            </div>

            {/* ─── Seção 2: Dados do Imóvel ──────────────────────────────────────── */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center shrink-0">
                  <Home size={20} />
                </div>
                <div>
                  <h2 className="text-lg font-extrabold text-gray-900">
                    2. Dados do Imóvel
                  </h2>
                  <p className="text-xs text-gray-500">Características, localização e estado de conservação.</p>
                </div>
              </div>

              {/* Finalidade e Categoria */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    Finalidade principal
                  </label>
                  <select
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 text-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15 outline-none transition-all"
                  >
                    <option value="Venda">Venda</option>
                    <option value="Locação">Locação</option>
                    <option value="Inventário/Partilha">Inventário/Partilha</option>
                    <option value="Regularização/Judicial">Regularização/Judicial</option>
                    <option value="Apenas consulta de patrimônio">Apenas consulta de patrimônio</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    Categoria do Imóvel
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 text-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15 outline-none transition-all"
                  >
                    <option value="Urbano - Casa">Urbano - Casa</option>
                    <option value="Urbano - Apartamento">Urbano - Apartamento</option>
                    <option value="Urbano - Terreno/Lote">Urbano - Terreno/Lote</option>
                    <option value="Comercial">Comercial</option>
                    <option value="Imóvel Rural / Chácara / Sítio">Imóvel Rural / Chácara / Sítio</option>
                  </select>
                </div>
              </div>

              {/* Localização */}
              <div className="pt-2">
                <p className="text-xs font-extrabold uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-1.5">
                  <MapPin size={14} className="text-brand-600" />
                  Localização do Imóvel
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                      Cidade *
                    </label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Ex: Álvares Florence"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 text-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15 outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                      Bairro / Região *
                    </label>
                    <input
                      type="text"
                      required
                      value={neighborhood}
                      onChange={(e) => setNeighborhood(e.target.value)}
                      placeholder="Ex: Centro ou Zona Rural"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 text-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15 outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                      Endereço aproximado *
                    </label>
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Rua, número ou rodovia/referência"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 text-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15 outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Características básicas */}
              <div className="pt-2">
                <p className="text-xs font-extrabold uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-1.5">
                  <Sparkles size={14} className="text-brand-600" />
                  Características Básicas e Conservação
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                      Área total aproximada
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={totalArea}
                        onChange={(e) => setTotalArea(e.target.value)}
                        placeholder="Ex: 250"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 text-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15 outline-none transition-all"
                      />
                      <select
                        value={totalAreaUnit}
                        onChange={(e) => setTotalAreaUnit(e.target.value)}
                        className="px-3 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-700 text-xs font-bold focus:border-brand-500 outline-none shrink-0"
                      >
                        <option value="m²">m²</option>
                        <option value="alqueires">alqueires</option>
                        <option value="hectares">hectares</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                      Área construída (m²)
                    </label>
                    <input
                      type="text"
                      value={builtArea}
                      onChange={(e) => setBuiltArea(e.target.value)}
                      placeholder="Ex: 140"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 text-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15 outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                      Estado de conservação
                    </label>
                    <select
                      value={conservation}
                      onChange={(e) => setConservation(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 text-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15 outline-none transition-all"
                    >
                      <option value="Novo/Na planta">Novo/Na planta</option>
                      <option value="Ótimo estado">Ótimo estado</option>
                      <option value="Precisa de pequenos reparos">Precisa de pequenos reparos</option>
                      <option value="Precisa de reforma geral">Precisa de reforma geral</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                      Quantidade de quartos
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={bedrooms}
                      onChange={(e) => setBedrooms(e.target.value)}
                      placeholder="Ex: 3"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 text-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15 outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                      Banheiros
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={bathrooms}
                      onChange={(e) => setBathrooms(e.target.value)}
                      placeholder="Ex: 2"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 text-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15 outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                      Vagas de garagem
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={garageSpots}
                      onChange={(e) => setGarageSpots(e.target.value)}
                      placeholder="Ex: 2"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 text-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15 outline-none transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* ─── Seção 3: Campos Condicionais (Avaliação Completa e Documental) ── */}
            {evaluationType === 'completa' && (
              <div className="bg-white rounded-2xl shadow-md border-2 border-brand-600/30 p-6 md:p-8 space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                  <div className="w-10 h-10 rounded-xl bg-brand-600 text-white flex items-center justify-center shrink-0">
                    <FileText size={20} />
                  </div>
                  <div>
                    <span className="text-[11px] font-extrabold uppercase tracking-widest text-brand-600">
                      Exclusivo · Avaliação Completa e Documental
                    </span>
                    <h2 className="text-lg font-extrabold text-gray-900">
                      3. Informações Documentais e Parecer Técnico (PTAM)
                    </h2>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                      Situação Documental Atual
                    </label>
                    <select
                      value={documentStatus}
                      onChange={(e) => setDocumentStatus(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 text-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15 outline-none transition-all"
                    >
                      <option value="Escritura/Matrícula registrada em dia">
                        Escritura/Matrícula registrada em dia
                      </option>
                      <option value="Apenas contrato de compra e venda / Posse">
                        Apenas contrato de compra e venda / Posse
                      </option>
                      <option value="Em processo de inventário">
                        Em processo de inventário
                      </option>
                      <option value="Possui pendências na prefeitura/incra">
                        Possui pendências na prefeitura/incra
                      </option>
                      <option value="Não sei informar">Não sei informar</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                      Necessita de Parecer Técnico assinado (PTAM)?
                    </label>
                    <div className="flex flex-wrap gap-2.5 pt-1">
                      {(['Sim', 'Não', 'Preciso de orientação'] as const).map((option) => (
                        <label
                          key={option}
                          className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-bold cursor-pointer transition-all ${
                            needsPtam === option
                              ? 'border-brand-600 bg-brand-600 text-white shadow-sm'
                              : 'border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          <input
                            type="radio"
                            name="needsPtam"
                            value={option}
                            checked={needsPtam === option}
                            onChange={() => setNeedsPtam(option)}
                            className="sr-only"
                          />
                          <span>{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ─── Seção 4: Observações Finais ──────────────────────────────────── */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 space-y-5">
              <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center shrink-0">
                  <MessageSquare size={20} />
                </div>
                <div>
                  <h2 className="text-lg font-extrabold text-gray-900">
                    {evaluationType === 'completa' ? '4. Observações Finais' : '3. Observações Finais'}
                  </h2>
                  <p className="text-xs text-gray-500">
                    Diferenciais do imóvel ou detalhes adicionais (opcional).
                  </p>
                </div>
              </div>

              <div>
                <textarea
                  rows={4}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Diferenciais do imóvel ou detalhes adicionais (ex: móveis planejados, benfeitorias, área de lazer, etc.)"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 text-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15 outline-none transition-all resize-y"
                />
              </div>

              {/* Botão Principal de Submit WhatsApp */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-[#25D366] hover:bg-[#1ebe57] text-white font-extrabold text-sm md:text-base py-4 px-6 rounded-xl shadow-lg shadow-green-600/20 hover:shadow-xl hover:shadow-green-600/30 transition-all duration-200 flex items-center justify-center gap-3 cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5 shrink-0"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Enviar Dados e Solicitar Avaliação no WhatsApp
                </button>
                <p className="text-center text-xs text-gray-400 mt-3">
                  Você será redirecionado para o WhatsApp oficial da Contrato Feito com todas as informações preenchidas.
                </p>
              </div>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  )
}

