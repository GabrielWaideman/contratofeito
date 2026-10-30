'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import {
  ShieldCheck,
  FileText,
  Lock,
  Scale,
  CheckCircle2,
  AlertTriangle,
  Eye,
  UserCheck,
  Server,
  Cookie,
  Printer,
  Search,
  Copy,
  Check,
  ChevronRight,
  Info,
  Building2,
  Phone,
  Mail,
  MapPin,
  HelpCircle,
  Database,
  Globe,
  SlidersHorizontal,
} from 'lucide-react'

type SectionTab = 'all' | 'termos' | 'privacidade'

export default function PoliticasClient() {
  const [activeTab, setActiveTab] = useState<SectionTab>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [copied, setCopied] = useState(false)

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print()
    }
  }

  // Helper de busca simples para destacar ou filtrar seções
  const matchesSearch = (text: string) => {
    if (!searchQuery.trim()) return true
    return text.toLowerCase().includes(searchQuery.toLowerCase().trim())
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased overflow-x-hidden selection:bg-brand-500 selection:text-white">
      <Header />

      <main className="flex-1 pt-24 md:pt-28 pb-20">
        {/* ─── HERO BANNER ─────────────────────────────────────────────── */}
        <section className="bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950 text-white border-b border-dark-800 py-12 md:py-16 relative overflow-hidden">
          {/* Subtle background grid */}
          <div
            className="absolute inset-0 z-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage:
                'linear-gradient(to right, #dc2626 1px, transparent 1px), linear-gradient(to bottom, #dc2626 1px, transparent 1px)',
              backgroundSize: '48px 48px',
            }}
          />

          <div className="container mx-auto px-4 md:px-8 relative z-10">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-xs text-slate-400 mb-6 print:hidden">
              <Link href="/" className="hover:text-white transition-colors">
                Início
              </Link>
              <ChevronRight size={12} />
              <span className="text-brand-400 font-semibold">
                Políticas de Uso e Privacidade
              </span>
            </nav>

            <div className="max-w-4xl">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-brand-600/20 border border-brand-500/30 text-brand-300 text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-4">
                <ShieldCheck size={14} className="text-brand-400" />
                Segurança Jurídica • LGPD & Marco Civil da Internet
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-4">
                Políticas de Uso <span className="text-brand-500">e Privacidade</span>
              </h1>

              <p className="text-slate-300 text-base md:text-lg leading-relaxed mb-8 text-justify">
                Documento oficial da <strong className="text-white font-semibold">Contrato Feito Negócios Imobiliários</strong> que estabelece as regras de navegação, termos de serviço e o nosso rigoroso compromisso com a proteção e o tratamento de seus dados pessoais.
              </p>

              {/* Informações Regulatórias Rápidas */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-slate-800 text-xs">
                <div className="bg-dark-900/80 border border-slate-800/80 p-3 rounded-xl">
                  <span className="block text-slate-400 font-medium">Controladora:</span>
                  <span className="text-white font-bold">Contrato Feito</span>
                </div>
                <div className="bg-dark-900/80 border border-slate-800/80 p-3 rounded-xl">
                  <span className="block text-slate-400 font-medium">Registro Profissional:</span>
                  <span className="text-brand-400 font-bold">CRECI-SP 246817F</span>
                </div>
                <div className="bg-dark-900/80 border border-slate-800/80 p-3 rounded-xl">
                  <span className="block text-slate-400 font-medium">Foro de Eleição:</span>
                  <span className="text-white font-bold">Álvares Florence - SP</span>
                </div>
                <div className="bg-dark-900/80 border border-slate-800/80 p-3 rounded-xl">
                  <span className="block text-slate-400 font-medium">Conformidade Legal:</span>
                  <span className="text-green-400 font-bold">LGPD (Lei 13.709/18)</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── BARRA DE CONTROLE / FILTRO / AÇÕES (STICKY) ──────────────── */}
        <div className="sticky top-20 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm print:hidden">
          <div className="container mx-auto px-4 md:px-8 py-3.5 flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Tabs Selector */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200 w-full md:w-auto">
              <button
                type="button"
                onClick={() => setActiveTab('all')}
                className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'all'
                    ? 'bg-white text-brand-700 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Visão Completa
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('termos')}
                className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'termos'
                    ? 'bg-white text-brand-700 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                1. Termos de Uso
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('privacidade')}
                className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'privacidade'
                    ? 'bg-white text-brand-700 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                2. Política de Privacidade
              </button>
            </div>

            {/* Busca & Ações de utilidade */}
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:w-72">
                <Search
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                />
                <input
                  type="text"
                  placeholder="Pesquisar nos termos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-50 hover:bg-white focus:bg-white border border-slate-300 rounded-xl pl-9 pr-4 py-2 text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all"
                />
              </div>

              <button
                type="button"
                onClick={handlePrint}
                title="Imprimir ou Salvar em PDF"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-sm"
              >
                <Printer size={14} className="text-slate-500" />
                <span>Imprimir</span>
              </button>

              <button
                type="button"
                onClick={handleCopyLink}
                title="Copiar link da página"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-sm"
              >
                {copied ? (
                  <>
                    <Check size={14} className="text-green-600" />
                    <span className="text-green-700">Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} className="text-slate-500" />
                    <span className="hidden sm:inline">Copiar Link</span>
                  </>
                )}
              </button>
            </div>

          </div>
        </div>

        {/* ─── CORPO PRINCIPAL (2 COLUNAS: ÍNDICE STICKY + CONTEÚDO) ──── */}
        <div className="container mx-auto px-4 md:px-8 mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 items-start">
            
            {/* ─── SUMÁRIO LATERAL (DESKTOP) ─────────────────────────── */}
            <aside className="hidden lg:block sticky top-36 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-6 max-h-[calc(100vh-160px)] overflow-y-auto print:hidden">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 pb-2 border-b border-slate-100">
                  <SlidersHorizontal size={14} className="text-brand-600" />
                  Navegação Rápida
                </div>

                {/* Índice Termos de Uso */}
                {(activeTab === 'all' || activeTab === 'termos') && (
                  <div className="mb-5">
                    <p className="text-[11px] font-black uppercase tracking-wider text-brand-700 mb-2">
                      Termos de Uso
                    </p>
                    <ul className="space-y-1 text-xs text-slate-600">
                      <li>
                        <a href="#termos-intro" className="block py-1 hover:text-brand-600 transition-colors">
                          Apresentação & Boas-vindas
                        </a>
                      </li>
                      <li>
                        <a href="#termos-1" className="block py-1 hover:text-brand-600 transition-colors">
                          1. Funcionalidades do Site
                        </a>
                      </li>
                      <li>
                        <a href="#termos-2" className="block py-1 hover:text-brand-600 transition-colors">
                          2. Uso do Site por Você
                        </a>
                      </li>
                      <li>
                        <a href="#termos-3" className="block py-1 hover:text-brand-600 transition-colors">
                          3. Conteúdo & Propriedade
                        </a>
                      </li>
                      <li>
                        <a href="#termos-4" className="block py-1 hover:text-brand-600 transition-colors">
                          4. Limitações de Responsabilidade
                        </a>
                      </li>
                      <li>
                        <a href="#termos-5" className="block py-1 hover:text-brand-600 transition-colors">
                          5. Recomendações de Segurança
                        </a>
                      </li>
                      <li>
                        <a href="#termos-6" className="block py-1 hover:text-brand-600 transition-colors">
                          6. Penalidades
                        </a>
                      </li>
                      <li>
                        <a href="#termos-7" className="block py-1 hover:text-brand-600 transition-colors">
                          7. Outras Disposições & Foro
                        </a>
                      </li>
                      <li>
                        <a href="#termos-8" className="block py-1 hover:text-brand-600 transition-colors">
                          8. Glossário dos Termos
                        </a>
                      </li>
                    </ul>
                  </div>
                )}

                {/* Índice Política de Privacidade */}
                {(activeTab === 'all' || activeTab === 'privacidade') && (
                  <div>
                    <p className="text-[11px] font-black uppercase tracking-wider text-brand-700 mb-2">
                      Política de Privacidade
                    </p>
                    <ul className="space-y-1 text-xs text-slate-600">
                      <li>
                        <a href="#priv-1" className="block py-1 hover:text-brand-600 transition-colors">
                          1. Introdução & Aceite
                        </a>
                      </li>
                      <li>
                        <a href="#priv-2" className="block py-1 hover:text-brand-600 transition-colors">
                          2. Quem Somos (Controladora)
                        </a>
                      </li>
                      <li>
                        <a href="#priv-3" className="block py-1 hover:text-brand-600 transition-colors">
                          3. Dados Coletados & Cookies
                        </a>
                      </li>
                      <li>
                        <a href="#priv-4" className="block py-1 hover:text-brand-600 transition-colors">
                          4. Compartilhamento de Dados
                        </a>
                      </li>
                      <li>
                        <a href="#priv-5" className="block py-1 hover:text-brand-600 transition-colors">
                          5. Proteção e Segurança
                        </a>
                      </li>
                      <li>
                        <a href="#priv-6" className="block py-1 hover:text-brand-600 transition-colors">
                          6. Armazenamento & Cloud
                        </a>
                      </li>
                      <li>
                        <a href="#priv-7" className="block py-1 hover:text-brand-600 transition-colors">
                          7. Seus Direitos (LGPD)
                        </a>
                      </li>
                      <li>
                        <a href="#priv-8" className="block py-1 hover:text-brand-600 transition-colors">
                          8. Alterações & Foro
                        </a>
                      </li>
                      <li>
                        <a href="#priv-9" className="block py-1 hover:text-brand-600 transition-colors">
                          9. Glossário da Privacidade
                        </a>
                      </li>
                    </ul>
                  </div>
                )}
              </div>

              {/* Box de Contato de Privacidade */}
              <div className="pt-4 border-t border-slate-200">
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-slate-900 mb-1.5">
                    <HelpCircle size={14} className="text-brand-600" />
                    Dúvidas sobre seus dados?
                  </div>
                  <p className="text-slate-500 leading-relaxed mb-3 text-[11px] text-justify">
                    Entre em contato diretamente com nossa equipe para exercer seus direitos como titular.
                  </p>
                  <a
                    href="mailto:emersonantoniodemendonca@yahoo.com.br"
                    className="block text-center bg-brand-600 hover:bg-brand-700 text-white font-bold py-2 px-3 rounded-lg text-xs transition-colors shadow-sm"
                  >
                    Falar com a Imobiliária
                  </a>
                </div>
              </div>
            </aside>

            {/* ─── CONTEÚDO PRINCIPAL ───────────────────────────────── */}
            <div className="space-y-12">

              {/* ======================================================== */}
              {/* PARTE 1: TERMOS DE USO                                   */}
              {/* ======================================================== */}
              {(activeTab === 'all' || activeTab === 'termos') && (
                <section className="space-y-8 scroll-mt-36" id="parte-termos">
                  
                  {/* Cabeçalho da Parte I */}
                  <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
                    <div className="flex items-center gap-2.5 text-brand-600 font-bold text-xs uppercase tracking-widest mb-2">
                      <FileText size={16} />
                      Parte I • Condições Gerais de Navegação
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 uppercase tracking-tight mb-4">
                      Termos de Uso
                    </h2>
                    
                    <div id="termos-intro" className="prose prose-slate max-w-none text-slate-600 text-sm leading-relaxed space-y-3 text-justify">
                      <p className="font-semibold text-slate-900">
                        Bem-vindo ao CONTRATO FEITO NEGÓCIOS IMOBILIÁRIOS.
                      </p>
                      <p>
                        A seguir apresentamos os Termos de Uso (“Termos”), documento que relaciona as principais regras que devem ser observadas por todos que acessam o Site da Imobiliária (atualmente operando em{' '}
                        <a
                          href="https://contratofeito.vercel.app/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-brand-600 underline font-medium hover:text-brand-700"
                        >
                          https://contratofeito.vercel.app/
                        </a>{' '}
                        e futuramente em{' '}
                        <span className="font-medium text-slate-800">www.contratofeito.com</span>) ou utilizam suas funcionalidades, neste caso, “Você”.
                      </p>
                      <div className="p-4 bg-brand-50 border-l-4 border-brand-500 rounded-r-xl text-slate-800 text-xs sm:text-sm text-justify">
                        Como condição para acesso e uso das funcionalidades do Site, Você declara que fez a leitura completa e atenta das regras deste documento, estando plenamente ciente e de acordo com elas.
                      </div>
                    </div>
                  </div>

                  {/* 1. FUNCIONALIDADES DO SITE */}
                  {matchesSearch('Funcionalidades do Site Elegibilidade público-alvo') && (
                    <article id="termos-1" className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm scroll-mt-36">
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 pb-3 border-b border-slate-100 flex items-center gap-2">
                        <span className="text-brand-600">1.</span> FUNCIONALIDADES DO SITE
                      </h3>
                      <div className="space-y-4 text-slate-600 text-sm leading-relaxed text-justify">
                        <p>
                          <strong className="text-slate-800">1.1. Uso do Site:</strong> As informações e funções disponibilizadas a Você no Site são voltadas para pessoas jurídicas e pessoas físicas a partir de 18 (dezoito) anos de idade.
                        </p>
                        <p>
                          <strong className="text-slate-800">1.2. Elegibilidade:</strong> Caso Você não se enquadre no público-alvo do Site, definido no item 1.1, a sua solicitação de cadastro poderá ser recusada, não autorizada ou limitada.
                        </p>
                        <p>
                          <strong className="text-slate-800">1.3. Apresentação do Site:</strong> O Site e suas funcionalidades são apresentados a Você na maneira como estão disponíveis no momento do acesso, mas podem passar por constantes aprimoramentos e atualizações sem a necessidade de prévio aviso, razão pela qual os layouts podem variar.
                        </p>
                        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs sm:text-sm text-slate-700 text-justify">
                          <strong className="text-slate-900 block mb-1">1.3.1. Compromisso de Qualidade e Usabilidade:</strong>
                          Neste caso, nos comprometemos a preservar a funcionalidade do Site com esforços razoáveis, utilizando Layout que respeita a usabilidade e navegabilidade, sempre que possível, bem como exibir as funcionalidades de maneira clara, completa, precisa e suficiente, de modo que exista uma correta percepção do que está sendo praticado, e proteger, por meio do estado da técnica disponível, os dados coletados pelas funcionalidades disponibilizadas.
                        </div>
                      </div>
                    </article>
                  )}

                  {/* 2. USO DO SITE POR VOCÊ */}
                  {matchesSearch('USO DO SITE POR VOCÊ Acesso Funcionalidades Encomendar Pesquisar Cadastrar') && (
                    <article id="termos-2" className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm scroll-mt-36">
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 pb-3 border-b border-slate-100 flex items-center gap-2">
                        <span className="text-brand-600">2.</span> USO DO SITE POR VOCÊ
                      </h3>
                      <div className="space-y-4 text-slate-600 text-sm leading-relaxed text-justify">
                        <p>
                          <strong className="text-slate-800">2.1. Acesso ao Site:</strong> O acesso ao Site será efetuado através do uso da internet, não sendo permitido o acesso por nenhum outro meio diverso não autorizado por meio destes Termos.
                        </p>
                        <p>
                          <strong className="text-slate-800">2.2. Funcionalidades Disponíveis:</strong> No Site Você poderá conhecer a Imobiliária e ter acesso a todos os serviços oferecidos por meio desta, sendo possível:
                        </p>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                          {[
                            { letter: 'a', text: 'Acessar a área institucional do Site para conhecer um pouco mais sobre a Imobiliária;' },
                            { letter: 'b', text: 'Encomendar o seu imóvel, conforme as características que Você informar;' },
                            { letter: 'c', text: 'Pesquisar os imóveis urbanos e rurais disponíveis no Site para compra e locação;' },
                            { letter: 'd', text: 'Cadastrar o seu próprio imóvel para venda por meio da Imobiliária; e' },
                            { letter: 'e', text: 'Informar seus dados de contato para que a imobiliária lhe dê um atendimento direto.' },
                          ].map((item) => (
                            <li key={item.letter} className="flex items-start gap-3 p-3 bg-slate-50 border border-slate-200/80 rounded-xl">
                              <span className="w-6 h-6 rounded-lg bg-brand-100 text-brand-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                                {item.letter}
                              </span>
                              <span className="text-xs sm:text-sm text-slate-700 font-medium text-justify">{item.text}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </article>
                  )}

                  {/* 3. CONTEÚDO, DADOS SUBMETIDOS E PROPRIEDADE INTELECTUAL */}
                  {matchesSearch('CONTEÚDO DADOS SUBMETIDOS PROPRIEDADE INTELECTUAL mineração engenharia reversa') && (
                    <article id="termos-3" className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm scroll-mt-36">
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 pb-3 border-b border-slate-100 flex items-center gap-2">
                        <span className="text-brand-600">3.</span> CONTEÚDO, DADOS SUBMETIDOS E PROPRIEDADE INTELECTUAL
                      </h3>
                      <div className="space-y-4 text-slate-600 text-sm leading-relaxed text-justify">
                        <p>
                          <strong className="text-slate-800">3.1. Propriedade Intelectual:</strong> Ao acessar o Site, Você declara que irá respeitar todos os direitos de propriedade intelectual, incluindo, mas não se limitando, aos programas de computador, direitos autorais e direitos de propriedade industrial sobre as marcas, patentes, nomes de domínio, denominação social e desenhos industriais, eventualmente depositados ou registrados em nosso nome, bem como de todos os direitos referentes a terceiros que porventura estejam, ou estiveram, de alguma forma, disponíveis no Site, sendo que a sua infração poderá ensejar o pagamento de indenização por perdas e danos judicialmente apurados.
                        </p>
                        <p>
                          <strong className="text-slate-800">3.2. Seus Dados:</strong> Você é e continuará sendo o titular e proprietário de todos os dados, submetidos e/ou compartilhados no Site por Você (“Seus Dados”) bem como será o exclusivo responsável por eles.
                        </p>
                        <p>
                          <strong className="text-slate-800">3.3. Legalidade dos Seus Dados:</strong> A Imobiliária não se obriga a processar ou tratar quaisquer dos Seus Dados se houver razões para crer que tal processamento ou tratamento possa imputá-la qualquer infração de qualquer lei aplicável ou que o Site esteja sendo utilizado, sob o seu critério exclusivo, para quaisquer fins ilegais, ilícitos ou contrários à moralidade.
                        </p>
                        <p>
                          <strong className="text-slate-800">3.4. Armazenamento:</strong> A Imobiliária não presta e o Site não constitui serviço de armazenamento, portanto, a Imobiliária não possui qualquer obrigação de armazenar, reter ou fornecer a Você ou a quaisquer terceiros cópia de Seus Dados ou qualquer conteúdo.
                        </p>
                        <p>
                          <strong className="text-slate-800">3.5. Não mineração:</strong> É vedada a utilização de softwares de mineração de dados no Site, de qualquer tipo ou espécie, além de outro aqui não tipificado, que atue de modo similar.
                        </p>
                        <p>
                          <strong className="text-slate-800">3.6. Integridade do Site:</strong> Você se compromete a não acessar as áreas de programação do Site, seu banco de dados, códigos fonte ou qualquer outro conjunto de dados disponíveis nestes ambientes, bem como não realizar ou permitir engenharia reversa, nem traduzir, descompilar, copiar, modificar, reproduzir, alugar, sublicenciar, publicar, divulgar, transmitir, emprestar, distribuir ou, de outra maneira, dispor inapropriadamente das funcionalidades do Site.
                        </p>
                      </div>
                    </article>
                  )}

                  {/* 4. ISENÇÃO E LIMITAÇÕES DE RESPONSABILIDADE */}
                  {matchesSearch('ISENÇÃO E LIMITAÇÕES DE RESPONSABILIDADE Disponibilidade hackers bugs terceiros') && (
                    <article id="termos-4" className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm scroll-mt-36">
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 pb-3 border-b border-slate-100 flex items-center gap-2">
                        <span className="text-brand-600">4.</span> ISENÇÃO E LIMITAÇÕES DE RESPONSABILIDADE
                      </h3>
                      <div className="space-y-4 text-slate-600 text-sm leading-relaxed text-justify">
                        <p>
                          <strong className="text-slate-800">4.1. Disponibilidade do Site:</strong> Envidaremos nossos esforços para a manutenção da disponibilidade contínua e permanente do Site. No entanto, pode ocorrer, eventualmente, alguma indisponibilidade temporária decorrente de manutenção necessária ou mesmo gerada por motivo de força maior, como desastres naturais, falhas nos sistemas de comunicação e acesso à Internet, ataques cibernéticos invasivos, ou quaisquer fatos de terceiros que fogem da nossa esfera de vigilância e responsabilidade.
                        </p>
                        <p>
                          <strong className="text-slate-800">4.1.1. Restabelecimento do Acesso:</strong> Se isso ocorrer, será feito o que estiver ao nosso alcance para restabelecer o acesso ao Site o mais breve possível, dentro das limitações técnicas dos nossos serviços e serviços de terceiros, dos quais dependemos para ficar online. Por essa razão, Você fica ciente que não poderá pleitear indenização ou reparação de danos no caso do Site permanecer fora do ar, independente da motivação.
                        </p>
                        <p>
                          <strong className="text-slate-800">4.1.2. Manutenção Programada:</strong> Eventuais procedimentos de manutenção que acarretem a indisponibilidade do Site por longos períodos serão informados por meio dos canais oficiais.
                        </p>
                        
                        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-justify">
                          <p className="font-bold text-slate-900 mb-3 text-xs sm:text-sm">
                            4.1.3. Sem prejuízo de outras condições destes Termos, não nos responsabilizamos:
                          </p>
                          <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                            <li className="flex items-start gap-2">
                              <span className="text-brand-500 font-bold">•</span>
                              <span className="text-justify"><strong>a)</strong> Por quaisquer problemas, bugs, glitches ou funcionamentos indevidos que ocorrerem nos seus dispositivos e equipamentos;</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-brand-500 font-bold">•</span>
                              <span className="text-justify"><strong>b)</strong> Por qualquer dano direto ou indireto ocasionado por eventos de terceiros, a exemplo, mas não se limitando a ataque de hackers, falhas no sistema, no servidor ou na conexão à internet, inclusive por ações de softwares que possam, de algum modo, danificar ativos físicos ou lógicos em decorrência do acesso, utilização ou navegação no Site;</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-brand-500 font-bold">•</span>
                              <span className="text-justify"><strong>c)</strong> Pela navegação em quaisquer links externos disponibilizados no Site, sendo seu dever, a leitura dos Termos de Uso e Política de Privacidade do serviço acessado e agir conforme o determinado; e</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-brand-500 font-bold">•</span>
                              <span className="text-justify"><strong>d)</strong> Por verificar, controlar, aprovar ou garantir a adequação ou exatidão das informações ou dados disponibilizados em tais links para serviços de terceiros, não sendo, portanto, responsáveis por prejuízos, perdas ou danos ocorridos pela visita de tais sites, cabendo ao interessado verificar a confiabilidade das informações e dados ali exibidos antes de tomar alguma decisão ou praticar algum ato.</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </article>
                  )}

                  {/* 5. RECOMENDAÇÕES DE SEGURANÇA */}
                  {matchesSearch('RECOMENDAÇÕES DE SEGURANÇA cadeado certificado navegador') && (
                    <article id="termos-5" className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm scroll-mt-36">
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 pb-3 border-b border-slate-100 flex items-center gap-2">
                        <span className="text-brand-600">5.</span> RECOMENDAÇÕES DE SEGURANÇA
                      </h3>
                      <div className="space-y-4 text-slate-600 text-sm leading-relaxed text-justify">
                        <p>
                          <strong className="text-slate-800">5.1. Acesso ao Site:</strong> Sempre que acessar o Site, verifique se de fato está no ambiente que Nós disponibilizamos, ações de hackers podem, em uma tentativa de roubar seus dados, replicar um site ou áreas deste.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl">
                            <div className="flex items-center gap-2 font-bold text-emerald-900 text-xs sm:text-sm mb-1.5">
                              <Lock size={16} className="text-emerald-600" />
                              5.1.1. Verificação do Cadeado SSL
                            </div>
                            <p className="text-xs text-emerald-800 leading-relaxed text-justify">
                              Para verificar a integridade e veracidade do Site, clique no cadeado presente na barra de endereço do navegador, verificando os certificados presentes e informados.
                            </p>
                          </div>

                          <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl">
                            <div className="flex items-center gap-2 font-bold text-amber-900 text-xs sm:text-sm mb-1.5">
                              <AlertTriangle size={16} className="text-amber-600" />
                              5.1.2. Alerta de Insegurança
                            </div>
                            <p className="text-xs text-amber-800 leading-relaxed text-justify">
                              Caso o navegador não apresente os certificados e/ou retorne com a mensagem de que o acesso não é seguro, interrompa imediatamente o uso do Site e comunique a Imobiliária para que as devidas providências sejam tomadas.
                            </p>
                          </div>
                        </div>
                      </div>
                    </article>
                  )}

                  {/* 6. PENALIDADES */}
                  {matchesSearch('PENALIDADES suspensão bloqueio exclusão Conta cível penal') && (
                    <article id="termos-6" className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm scroll-mt-36">
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 pb-3 border-b border-slate-100 flex items-center gap-2">
                        <span className="text-brand-600">6.</span> PENALIDADES
                      </h3>
                      <div className="space-y-4 text-slate-600 text-sm leading-relaxed text-justify">
                        <p>
                          <strong className="text-slate-800">6.1. Sanções Aplicáveis:</strong> O descumprimento de qualquer cláusula destes Termos, poderá gerar: (i) suspensão temporária do Site para seu login; (ii) bloqueio e exclusão de sua Conta do Site e/ou (iii) responsabilização nas esferas cível e penal.
                        </p>
                        <p>
                          <strong className="text-slate-800">6.1.1. Ética e Boa-Fé:</strong> Você reconhece desde já e compromete-se durante a utilização do Site, a não realizar quaisquer ações que atentem contra a moralidade, a ética e boa-fé, obrigando-se a em nenhuma hipótese divulgar, instigar ou auxiliar a prática de atos ilícitos ou fraudulentos, devendo combatê-los sempre que tomar conhecimento sob pena das previsões da cláusula 6.1 acima.
                        </p>
                      </div>
                    </article>
                  )}

                  {/* 7. OUTRAS DISPOSIÇÕES */}
                  {matchesSearch('OUTRAS DISPOSIÇÕES Canais de Atendimento Atualização Novação Nulidade Comunicação Foro Álvares Florence') && (
                    <article id="termos-7" className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm scroll-mt-36">
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 pb-3 border-b border-slate-100 flex items-center gap-2">
                        <span className="text-brand-600">7.</span> OUTRAS DISPOSIÇÕES
                      </h3>
                      <div className="space-y-4 text-slate-600 text-sm leading-relaxed text-justify">
                        <p>
                          <strong className="text-slate-800">7.1. Canais de Atendimento:</strong> Você poderá utilizar os Canais de Atendimento da Imobiliária disponibilizados no Site toda vez que presenciar ou verificar algum conteúdo impróprio no Site, seja ele notadamente ilícito ou contrário às regras de uso estipuladas nestes Termos.
                        </p>
                        <p>
                          <strong className="text-slate-800">7.2. Atualização dos Termos:</strong> Estes Termos estão sujeitos a constante melhoria e aprimoramento. Assim, nos reservamos o direito de modificá-los a qualquer momento, conforme sua finalidade ou conveniência, tal qual para adequação e conformidade legal de disposição de lei ou norma que tenha força jurídica equivalente, incluindo as de órgãos reguladores, ou seja, Você deverá verificá-lo sempre que efetuar o acesso no Site.
                        </p>
                        <p className="text-xs sm:text-sm pl-4 border-l-2 border-slate-300">
                          <strong className="text-slate-800">7.2.1. Notificação de Alterações Relevantes:</strong> Ocorrendo atualizações relevantes nestes Termos, notificaremos Você pelas ferramentas disponíveis no Site ou pelos meios de contato fornecidos por Você.
                        </p>
                        <p>
                          <strong className="text-slate-800">7.3. Novação e renúncia:</strong> A tolerância do eventual descumprimento de quaisquer condições destes Termos não constituirá renúncia ou novação nem nos impedirá de exigir estas condições a qualquer tempo.
                        </p>
                        <p>
                          <strong className="text-slate-800">7.4. Nulidade:</strong> Se alguma disposição destes Termos for julgada inaplicável ou sem efeito, o restante continuará a viger normalmente.
                        </p>
                        <p>
                          <strong className="text-slate-800">7.5. Comunicação:</strong> Você reconhece que toda comunicação realizada por e-mail, telefone ou outros meios digitais é válida, eficaz e suficiente para a divulgação de qualquer assunto que se refira ao Site ou ao serviço que tenha solicitado que a Imobiliária o contatasse via estes canais de comunicação.
                        </p>
                        <p>
                          <strong className="text-slate-800">7.6. Direcionamentos:</strong> O acesso ao Site poderá direcionar Você a outras plataformas que, em razão de suas particularidades, contarão com seus próprios Termos de Uso.
                        </p>
                        <p>
                          <strong className="text-slate-800">7.7. Data e hora oficial:</strong> O Site tem como base a data e horários oficiais de Brasília (UTC/GMT -03:00).
                        </p>
                        <div className="p-4 bg-slate-900 text-white rounded-2xl text-justify">
                          <strong className="text-brand-400 block mb-1 text-xs uppercase tracking-wider">
                            7.8. Lei Aplicável e Foro de Eleição
                          </strong>
                          <p className="text-xs sm:text-sm text-slate-300">
                            Estes Termos serão interpretados segundo a legislação brasileira, no idioma português, e fica eleito o foro da Comarca de <strong>Álvares Florence, no Estado de São Paulo</strong>, para dirimir qualquer controvérsia, salvo se a legislação aplicável ressalvar especificamente outra competência pessoal, territorial ou funcional.
                          </p>
                        </div>
                      </div>
                    </article>
                  )}

                  {/* 8. GLOSSÁRIO DOS TERMOS DE USO */}
                  {matchesSearch('GLOSSÁRIO Imobiliária Canais de Atendimento Layout Link Usuários') && (
                    <article id="termos-8" className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm scroll-mt-36">
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 pb-3 border-b border-slate-100 flex items-center gap-2">
                        <span className="text-brand-600">8.</span> GLOSSÁRIO DOS TERMOS DE USO
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm">
                        {[
                          { term: 'i. Imobiliária', desc: 'Prestadora dos serviços oferecidos por meio do Site (Contrato Feito) e responsável pelo tratamento dos dados pessoais dos Usuários coletados por meio do Site (Controladora).' },
                          { term: 'ii. Canais de Atendimento', desc: 'Meios de contato disponibilizados pela Imobiliária para esclarecimento de dúvidas, que pode ser consultado a qualquer momento no rodapé do Site.' },
                          { term: 'iii. Layout', desc: 'Conjunto compreendido entre aparência, design e fluxos do Site.' },
                          { term: 'iv. Link', desc: 'Terminologia para endereço de internet.' },
                          { term: 'v. Usuários', desc: 'Pessoas naturais e/ou jurídicas relacionadas diretamente com a Imobiliária, que possuam uma conta de acesso e/ou acessem o Site com interesse nos serviços ofertados pela Imobiliária.' },
                        ].map((item) => (
                          <div key={item.term} className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl">
                            <span className="font-bold text-slate-900 block mb-1 text-brand-700">
                              {item.term}
                            </span>
                            <span className="text-slate-600 text-xs leading-relaxed text-justify block">
                              {item.desc}
                            </span>
                          </div>
                        ))}
                      </div>
                    </article>
                  )}

                </section>
              )}


              {/* ======================================================== */}
              {/* PARTE 2: POLÍTICA DE PRIVACIDADE E PROTEÇÃO DE DADOS (LGPD) */}
              {/* ======================================================== */}
              {(activeTab === 'all' || activeTab === 'privacidade') && (
                <section className="space-y-8 scroll-mt-36" id="parte-privacidade">
                  
                  {/* Cabeçalho da Parte II */}
                  <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
                    <div className="flex items-center gap-2.5 text-brand-600 font-bold text-xs uppercase tracking-widest mb-2">
                      <ShieldCheck size={16} />
                      Parte II • Proteção de Dados & LGPD
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 uppercase tracking-tight mb-2">
                      Política de Privacidade e Tratamento de Dados
                    </h2>
                    <p className="text-slate-500 text-xs sm:text-sm mb-6">
                      Em conformidade com a Lei Geral de Proteção de Dados Pessoais (LGPD – Lei nº 13.709/2018) e com o Marco Civil da Internet (Lei nº 12.965/2014).
                    </p>

                    <div id="priv-1" className="prose prose-slate max-w-none text-slate-600 text-sm leading-relaxed space-y-4 text-justify">
                      <h4 className="text-base font-bold text-slate-900 uppercase tracking-tight">
                        1. Introdução
                      </h4>
                      <p>
                        A presente Política tem por finalidade demonstrar o nosso compromisso com a privacidade e proteção dos seus Dados, além de estabelecer as regras sobre o Tratamento dos seus Dados Pessoais, dentro do escopo dos serviços e funcionalidades do presente site (“Site”), de acordo com as leis em vigor, com transparência e clareza junto a Você e ao mercado em geral.
                      </p>
                      <div className="p-4 bg-brand-50 border-l-4 border-brand-500 rounded-r-xl text-slate-800 text-xs sm:text-sm text-justify">
                        Como condição para acesso e uso das funcionalidades exclusivas no Site, Você declara que fez a leitura completa e atenta desta Política, estando plenamente ciente, conferindo, assim, sua livre e expressa concordância com os termos aqui estipulados, incluindo a coleta dos Dados aqui mencionados, bem como sua utilização para os fins abaixo especificados. Caso Você não esteja de acordo com as disposições desta Política, Você deverá descontinuar o seu acesso ou uso do Site.
                      </div>
                    </div>
                  </div>

                  {/* 2. QUEM SOMOS */}
                  {matchesSearch('Quem somos Imobiliária Contrato Feito Controladora e Operadora Usuário') && (
                    <article id="priv-2" className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm scroll-mt-36">
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 pb-3 border-b border-slate-100 flex items-center gap-2">
                        <span className="text-brand-600">2.</span> QUEM SOMOS
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                        <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl">
                          <div className="flex items-center gap-2 font-bold text-slate-900 mb-2">
                            <Building2 size={16} className="text-brand-600" />
                            Imobiliária (Contrato Feito)
                          </div>
                          <p className="text-slate-600 leading-relaxed text-xs sm:text-sm text-justify">
                            Prestadora dos serviços, desenvolvedora do CRM próprio e única responsável pelo controle e tratamento dos dados pessoais dos Usuários coletados por meio do Site (atuando como <strong>Controladora e Operadora</strong>).
                          </p>
                        </div>

                        <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl">
                          <div className="flex items-center gap-2 font-bold text-slate-900 mb-2">
                            <UserCheck size={16} className="text-brand-600" />
                            Usuário
                          </div>
                          <p className="text-slate-600 leading-relaxed text-xs sm:text-sm text-justify">
                            Indivíduos relacionados diretamente com a Imobiliária e que acessam o Site (“Você”) com interesse nos serviços ofertados pela Imobiliária.
                          </p>
                        </div>
                      </div>
                    </article>
                  )}

                  {/* 3. SOBRE OS DADOS COLETADOS */}
                  {matchesSearch('Sobre os dados coletados Dados cadastrais Identificação Digital Cookies Marco Civil da Internet') && (
                    <article id="priv-3" className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm scroll-mt-36">
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 pb-3 border-b border-slate-100 flex items-center gap-2">
                        <span className="text-brand-600">3.</span> SOBRE OS DADOS COLETADOS
                      </h3>
                      <div className="space-y-4 text-slate-600 text-sm leading-relaxed text-justify">
                        <p>
                          <strong className="text-slate-800">3.1. Como a Imobiliária coleta os Dados:</strong> Os Dados, incluindo Dados Pessoais, poderão ser coletados quando Você os submete ou quando Você interage com o Site, o que inclui:
                        </p>

                        {/* Detalhamento visual dos dados coletados */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                          {/* Dados Cadastrais */}
                          <div className="p-5 bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-2xl space-y-3">
                            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                              <UserCheck size={18} className="text-brand-600" />
                              Dados Cadastrais
                            </div>
                            <div className="text-xs text-slate-700">
                              <span className="font-semibold block text-slate-900 mb-1">Informações Coletadas:</span>
                              Nome completo, E-mail, Telefone/celular.
                            </div>
                            <div className="text-xs text-slate-600 bg-slate-100/70 p-3 rounded-xl border border-slate-200/60 text-justify">
                              <span className="font-bold text-slate-800 block mb-1">Finalidades do Tratamento:</span>
                              <ul className="list-disc pl-4 space-y-1">
                                <li>Identificar e autenticar Você;</li>
                                <li>Viabilizar o seu acesso aos produtos e serviços oferecidos através do Site;</li>
                                <li>Atendimento direto pelos corretores da Imobiliária, quando solicitado através do Site.</li>
                              </ul>
                            </div>
                          </div>

                          {/* Dados de Identificação Digital */}
                          <div className="p-5 bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-2xl space-y-3">
                            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                              <Globe size={18} className="text-brand-600" />
                              Dados de Identificação Digital
                            </div>
                            <div className="text-xs text-slate-700">
                              <span className="font-semibold block text-slate-900 mb-1">Informações Coletadas:</span>
                              Endereço IP e Porta Lógica de Origem, Dispositivo (versão do sistema operacional), Geolocalização, Registros de data e horário de cada ação que Você realizar, Quais telas você acessou, ID da sessão, Cookies.
                            </div>
                            <div className="text-xs text-slate-600 bg-slate-100/70 p-3 rounded-xl border border-slate-200/60 text-justify">
                              <span className="font-bold text-slate-800 block mb-1">Finalidades do Tratamento:</span>
                              <ul className="list-disc pl-4 space-y-1">
                                <li>Identificar e autenticar Você;</li>
                                <li>Cumprir com obrigações legais de manutenção de registros estabelecidas pelo <strong>Marco Civil da Internet (Lei nº 12.965/2014)</strong>.</li>
                              </ul>
                            </div>
                          </div>
                        </div>

                        <p className="text-xs sm:text-sm">
                          <strong className="text-slate-800">3.1.1. Coleta por outros meios:</strong> Além dos Dados listados acima, a Imobiliária também poderá coletar Dados Pessoais por outros meios além do Site, para se informar de todo o tratamento realizado pela Imobiliária, Você deverá contatá-la diretamente.
                        </p>

                        <p>
                          <strong className="text-slate-800">3.2. Dados necessários:</strong> Os serviços prestados através do Site dependem diretamente de alguns Dados informados, principalmente Dados cadastrais. Caso você opte por não fornecer à Imobiliária alguns desses Dados, a Imobiliária ficará impossibilitada de prestar total ou parcialmente os seus serviços a Você.
                        </p>

                        <p>
                          <strong className="text-slate-800">3.3. Atualização e Veracidade dos Dados:</strong> Você é o único responsável pela precisão, veracidade ou falta dela em relação aos Dados que você fornece ou pela sua desatualização. Fique atento pois é de sua responsabilidade garantir a exatidão ou mantê-los atualizados.
                        </p>

                        <p className="text-xs sm:text-sm pl-4 border-l-2 border-slate-300">
                          <strong className="text-slate-800">3.3.1. Recusa de Tratamento Ilegítimo:</strong> Da mesma forma, a Imobiliária não é obrigada a processar ou tratar quaisquer dos seus Dados se houver razões para crer que tal processamento ou tratamento possa imputar qualquer infração de qualquer lei aplicável, ou se Você estiver utilizando o Site para quaisquer fins ilegais, ilícitos ou contrários à moralidade.
                        </p>

                        <p>
                          <strong className="text-slate-800">3.4. Base de Dados:</strong> A base de dados formada por meio da coleta de Dados é de propriedade da imobiliária e está sob a responsabilidade desta, sendo que seu uso, acesso e compartilhamento, quando necessários, serão feitos dentro dos limites e propósitos dos negócios descritos nesta Política.
                        </p>

                        {/* Cookies Box */}
                        <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-start gap-3">
                          <Cookie size={20} className="text-brand-600 shrink-0 mt-0.5" />
                          <div className="text-xs sm:text-sm text-slate-700 text-justify">
                            <strong className="text-slate-900 block mb-1">3.5. Tecnologias empregadas (Cookies):</strong>
                            O Site utiliza Cookies, cabendo a Você configurar o seu navegador de Internet caso deseje bloqueá-los. Nesta hipótese, algumas funcionalidades que oferecemos poderão ser limitadas.
                            <span className="block mt-1 text-slate-500">
                              3.5.1. Todas as tecnologias utilizadas respeitarão sempre a legislação vigente e os termos desta Política.
                            </span>
                          </div>
                        </div>

                        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3">
                          <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
                          <p className="text-xs sm:text-sm text-emerald-900 font-medium text-justify">
                            <strong className="font-bold">3.6. Decisões Automatizadas:</strong> O Site não utiliza nenhum tipo de decisão unicamente automatizada que impacte Você.
                          </p>
                        </div>
                      </div>
                    </article>
                  )}

                  {/* 4. COMO A IMOBILIÁRIA PODE COMPARTILHAR DADOS E INFORMAÇÕES */}
                  {matchesSearch('compartilhar dados informações autoridades judiciais movimentações societárias') && (
                    <article id="priv-4" className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm scroll-mt-36">
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 pb-3 border-b border-slate-100 flex items-center gap-2">
                        <span className="text-brand-600">4.</span> COMO A IMOBILIÁRIA PODE COMPARTILHAR DADOS E INFORMAÇÕES
                      </h3>
                      <div className="space-y-4 text-slate-600 text-sm leading-relaxed text-justify">
                        <p className="font-semibold text-slate-800">
                          4.1. Hipóteses de compartilhamento dos Dados. Os Dados coletados e as atividades registradas podem ser compartilhados pela imobiliária:
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl">
                            <span className="w-8 h-8 rounded-lg bg-brand-100 text-brand-700 font-bold text-xs flex items-center justify-center mb-2">
                              01
                            </span>
                            <strong className="text-slate-900 block mb-1 text-xs sm:text-sm">Autoridades Competentes</strong>
                            <p className="text-xs text-slate-600 leading-relaxed text-justify">
                              Com autoridades judiciais, administrativas ou governamentais competentes, sempre que houver determinação legal, requerimento, requisição ou ordem judicial;
                            </p>
                          </div>

                          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl">
                            <span className="w-8 h-8 rounded-lg bg-brand-100 text-brand-700 font-bold text-xs flex items-center justify-center mb-2">
                              02
                            </span>
                            <strong className="text-slate-900 block mb-1 text-xs sm:text-sm">Operações Societárias</strong>
                            <p className="text-xs text-slate-600 leading-relaxed text-justify">
                              De forma automática, em caso de movimentações societárias, como fusão, aquisição e incorporação; e
                            </p>
                          </div>

                          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl">
                            <span className="w-8 h-8 rounded-lg bg-brand-100 text-brand-700 font-bold text-xs flex items-center justify-center mb-2">
                              03
                            </span>
                            <strong className="text-slate-900 block mb-1 text-xs sm:text-sm">Hipóteses Específicas</strong>
                            <p className="text-xs text-slate-600 leading-relaxed text-justify">
                              Para hipóteses específicas que, quando aplicáveis, serão informadas diretamente pela Imobiliária.
                            </p>
                          </div>
                        </div>
                      </div>
                    </article>
                  )}

                  {/* 5. COMO SEUS DADOS SÃO PROTEGIDOS E COMO VOCÊ TAMBÉM PODERÁ PROTEGÊ-LOS */}
                  {matchesSearch('dados são protegidos senhas Cuidados links externos parceiros') && (
                    <article id="priv-5" className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm scroll-mt-36">
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 pb-3 border-b border-slate-100 flex items-center gap-2">
                        <span className="text-brand-600">5.</span> COMO SEUS DADOS SÃO PROTEGIDOS E COMO VOCÊ TAMBÉM PODERÁ PROTEGÊ-LOS
                      </h3>
                      <div className="space-y-4 text-slate-600 text-sm leading-relaxed text-justify">
                        <p>
                          <strong className="text-slate-800">5.1. Compartilhamento de senhas:</strong> Você também é responsável pelo sigilo de seus Dados Pessoais e deve ter sempre ciência de que o compartilhamento de senhas e dados de acesso viola esta Política e pode comprometer a segurança dos seus Dados e do Site.
                        </p>
                        <p>
                          <strong className="text-slate-800">5.2. Cuidados que Você deve tomar:</strong> É muito importante que Você proteja seus Dados contra acesso não autorizado ao seu computador, conta ou senha, além de se certificar de sempre clicar em “sair” ao encerrar sua navegação em um computador compartilhado.
                        </p>
                        <p>
                          <strong className="text-slate-800">5.3. Acesso aos Dados Pessoais, proporcionalidade e relevância:</strong> Internamente, os Dados Pessoais coletados são acessados somente por profissionais devidamente autorizados, respeitando os princípios de proporcionalidade, necessidade e relevância para os objetivos do negócio, além do compromisso de confidencialidade e preservação da sua privacidade nos termos desta Política.
                        </p>
                        <p>
                          <strong className="text-slate-800">5.4. Links externos:</strong> Quando Você utilizar o Site, Você poderá ser conduzido, via link a outros portais ou plataformas, que poderão coletar suas informações e ter sua própria Política de Tratamento de Dados.
                        </p>
                        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs sm:text-sm text-slate-700 space-y-2 text-justify">
                          <p>
                            <strong className="text-slate-900">5.4.1. Responsabilidade sobre sites terceiros:</strong> Caberá a Você ler as Políticas de Privacidade e Tratamento de Dados de tais portais ou plataformas fora do Site, sendo de sua responsabilidade aceitá-la ou rejeitá-la. A Imobiliária não é responsável pelas Políticas de Privacidade e Tratamento de Dados de terceiros e nem pelo conteúdo de quaisquer websites ou serviços ligados a ambientes que não sejam o do Site.
                          </p>
                          <p>
                            <strong className="text-slate-900">5.4.2. Serviços de parceiros:</strong> Alguns parceiros comerciais, eventualmente, podem oferecer serviços por meio de funcionalidades ou sites que podem ser acessados a partir do Site. Os Dados fornecidos por Você a estes parceiros serão de responsabilidade destes, estando assim sujeitos às suas próprias práticas de coleta e uso de dados.
                          </p>
                        </div>
                        <p>
                          <strong className="text-slate-800">5.5. Processamento por terceiros sob diretriz da Imobiliária:</strong> Caso empresas terceirizadas realizem o Tratamento em nome da Imobiliária de quaisquer Dados Pessoais coletados por meio do Site, as mesmas respeitarão as condições aqui estipuladas e as normas de segurança da informação, obrigatoriamente.
                        </p>
                      </div>
                    </article>
                  )}

                  {/* 6. COMO OS SEUS DADOS PESSOAIS SÃO ARMAZENADOS E O REGISTRO DE ATIVIDADES */}
                  {matchesSearch('dados pessoais são armazenados registro de atividades servidores nuvem cloud computing') && (
                    <article id="priv-6" className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm scroll-mt-36">
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 pb-3 border-b border-slate-100 flex items-center gap-2">
                        <span className="text-brand-600">6.</span> COMO OS SEUS DADOS PESSOAIS SÃO ARMAZENADOS E O REGISTRO DE ATIVIDADES
                      </h3>
                      <div className="space-y-4 text-slate-600 text-sm leading-relaxed text-justify">
                        <p>
                          <strong className="text-slate-800">6.1. Definição do Armazenamento:</strong> Os Dados Pessoais coletados e os registros de atividades são armazenados conforme definido pela Imobiliária. Caso tenha alguma dúvida, entre em contato diretamente com a Imobiliária.
                        </p>
                        <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-start gap-3">
                          <Server size={20} className="text-brand-600 shrink-0 mt-0.5" />
                          <p className="text-xs sm:text-sm text-slate-700 text-justify">
                            <strong className="text-slate-900 block mb-1">6.2. Infraestrutura e Cloud Computing:</strong>
                            Os Dados coletados serão armazenados no banco de dados da Imobiliária, em servidores localizados no Brasil, bem como em ambiente de uso de recursos ou servidores na nuvem (<em>cloud computing</em>), o que poderá exigir uma transferência e/ou processamento destes Dados fora do Brasil, sempre observando níveis adequados de segurança da informação.
                          </p>
                        </div>
                      </div>
                    </article>
                  )}

                  {/* 7. QUAIS SÃO OS SEUS DIREITOS E COMO EXERCÊ-LOS (LGPD) */}
                  {matchesSearch('DIREITOS confirmação exibição retificação limitação oposição exclusão artigo 16 anonimização') && (
                    <article id="priv-7" className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm scroll-mt-36">
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 pb-3 border-b border-slate-100 flex items-center gap-2">
                        <span className="text-brand-600">7.</span> QUAIS SÃO OS SEUS DIREITOS E COMO EXERCÊ-LOS (LGPD)
                      </h3>
                      <div className="space-y-4 text-slate-600 text-sm leading-relaxed text-justify">
                        <p>
                          <strong className="text-slate-800">7.1. Seus Direitos Básicos:</strong> Você poderá solicitar à Imobiliária a confirmação da existência de tratamento de Dados Pessoais, além da exibição ou retificação de seus Dados Pessoais.
                        </p>

                        {/* Cards de Direitos do Titular */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-center">
                            <div className="w-8 h-8 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center mx-auto mb-2">
                              <Eye size={16} />
                            </div>
                            <strong className="text-slate-900 text-xs sm:text-sm block mb-1">Limitação</strong>
                            <p className="text-[11px] text-slate-600 leading-relaxed text-justify">
                              Requerer a limitação do uso de seus Dados Pessoais tratados pela Imobiliária.
                            </p>
                          </div>

                          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-center">
                            <div className="w-8 h-8 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center mx-auto mb-2">
                              <Scale size={16} />
                            </div>
                            <strong className="text-slate-900 text-xs sm:text-sm block mb-1">Oposição e Revogação</strong>
                            <p className="text-[11px] text-slate-600 leading-relaxed text-justify">
                              Manifestar sua oposição e/ou revogar o consentimento outorgado anteriormente.
                            </p>
                          </div>

                          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-center">
                            <div className="w-8 h-8 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center mx-auto mb-2">
                              <Lock size={16} />
                            </div>
                            <strong className="text-slate-900 text-xs sm:text-sm block mb-1">Exclusão dos Dados</strong>
                            <p className="text-[11px] text-slate-600 leading-relaxed text-justify">
                              Solicitar a exclusão dos seus Dados Pessoais que tenham sido coletados.
                            </p>
                          </div>
                        </div>

                        <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-xs sm:text-sm text-amber-900 leading-relaxed text-justify">
                          <strong className="block mb-1.5 font-bold flex items-center gap-1.5">
                            <Info size={16} className="text-amber-700" />
                            7.2.1. Hipóteses Legais de Retenção de Dados (Art. 16 da LGPD):
                          </strong>
                          Caso Você solicite a exclusão de seus Dados Pessoais, pode ocorrer que os Dados precisem ser mantidos por período superior ao pedido de exclusão, nos termos do artigo 16 da Lei Geral de Proteção de Dados Pessoais, para:
                          <ul className="list-disc pl-5 mt-2 space-y-1 text-xs text-amber-800">
                            <li><strong>(i)</strong> cumprimento de obrigação legal ou regulatória;</li>
                            <li><strong>(ii)</strong> estudo por órgão de pesquisa; e</li>
                            <li><strong>(iii)</strong> transferência a terceiro (respeitados os requisitos de tratamento de dados dispostos na mesma Lei).</li>
                          </ul>
                          <p className="mt-2 text-xs font-medium">
                            Em todos os casos mediante a anonimização dos Dados Pessoais, desde que possível.
                          </p>
                        </div>
                      </div>
                    </article>
                  )}

                  {/* 8. INFORMAÇÕES SOBRE ESSA POLÍTICA */}
                  {matchesSearch('INFORMAÇÕES SOBRE ESSA POLÍTICA Alteração Inaplicabilidade Canais Atendimento Foro domicílio Álvares Florence') && (
                    <article id="priv-8" className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm scroll-mt-36">
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 pb-3 border-b border-slate-100 flex items-center gap-2">
                        <span className="text-brand-600">8.</span> INFORMAÇÕES SOBRE ESSA POLÍTICA
                      </h3>
                      <div className="space-y-4 text-slate-600 text-sm leading-relaxed text-justify">
                        <p>
                          <strong className="text-slate-800">8.1. Alteração do teor e atualização:</strong> Você reconhece o nosso direito de alterar o teor desta Política a qualquer momento, conforme a finalidade ou necessidade, tal qual para adequação e conformidade legal de disposição de lei ou norma que tenha força jurídica equivalente, cabendo a Você verificá-la sempre que efetuar o acesso ao Site ou utilizar nossos serviços.
                        </p>
                        <p>
                          <strong className="text-slate-800">8.2. Inaplicabilidade:</strong> Caso algum ponto desta Política seja considerado inaplicável por Autoridade de Dados ou judicial, as demais condições permanecerão em pleno vigor e efeito.
                        </p>
                        <p>
                          <strong className="text-slate-800">8.3. Canais de Atendimento:</strong> Em caso de qualquer dúvida com relação ao Tratamento de seus Dados Pessoais, você poderá entrar em contato diretamente com a Imobiliária.
                        </p>
                        
                        <div className="p-4 bg-slate-900 text-white rounded-2xl space-y-2 text-justify">
                          <strong className="text-brand-400 block text-xs uppercase tracking-wider">
                            8.4. Lei Aplicável e Foro de Eleição
                          </strong>
                          <p className="text-xs sm:text-sm text-slate-300">
                            Essa Política será interpretada segundo a legislação brasileira, no idioma português, sendo eleito o foro do seu domicílio para dirimir qualquer controvérsia que envolva este documento, salvo ressalva específica de competência pessoal, territorial ou funcional pela legislação aplicável.
                          </p>
                          <p className="text-xs text-slate-400 pt-2 border-t border-slate-800">
                            <strong>8.4.1. Usuários no exterior:</strong> Você, caso não possua domicílio no Brasil, e em razão dos serviços oferecidos pela Imobiliária apenas em território nacional, se submete à legislação brasileira, concordando, portanto, que em havendo litígio a ser solucionado, a ação deverá ser proposta no <strong>Foro da Comarca de Álvares Florence/SP</strong>.
                          </p>
                        </div>
                      </div>
                    </article>
                  )}

                  {/* 9. GLOSSÁRIO DA POLÍTICA DE PRIVACIDADE */}
                  {matchesSearch('GLOSSÁRIO Controlador Operador Dados Pessoais Anonimização Cloud Computing Cookies IP ID de Sessão Tratamento') && (
                    <article id="priv-9" className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm scroll-mt-36">
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 pb-3 border-b border-slate-100 flex items-center gap-2">
                        <span className="text-brand-600">9.</span> GLOSSÁRIO DA POLÍTICA DE PRIVACIDADE
                      </h3>
                      <p className="text-xs text-slate-500 mb-4">
                        9.1. Para os fins desta Política, devem se considerar as seguintes definições e descrições para seu melhor entendimento:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm">
                        {[
                          { term: 'Controlador e Operador de Dados', desc: 'Pessoa natural ou jurídica, de direito público ou privado, a quem competem as decisões e a execução técnica referente ao tratamento de dados pessoais. Neste caso, a própria Imobiliária (Contrato Feito).' },
                          { term: 'Dados', desc: 'Quaisquer informações inseridas, tratadas ou transmitidas através do Site.' },
                          { term: 'Dados Pessoais', desc: 'Dados relacionados a pessoa natural identificada ou identificável.' },
                          { term: 'Anonimização', desc: 'Utilização de meios técnicos razoáveis e disponíveis no momento do Tratamento, por meio dos quais um dado perde a possibilidade de associação, direta ou indireta, a um indivíduo.' },
                          { term: 'Cloud Computing', desc: 'Ou computação em nuvem, é tecnologia de virtualização de serviços construída a partir da interligação de mais de um servidor por meio de uma rede de informação comum (p.ex. a Internet), com objetivo de reduzir custos e aumentar a disponibilidade dos serviços sustentados.' },
                          { term: 'Site', desc: 'Designa o presente endereço eletrônico e seus subdomínios.' },
                          { term: 'Conta de Acesso', desc: 'Credencial necessária para utilizar ou acessar as funcionalidades exclusivas do Site.' },
                          { term: 'Cookies', desc: 'Pequenos arquivos enviados pelo Site, salvos nos seus dispositivos, que armazenam as preferências e poucas outras informações, com a finalidade de personalizar sua navegação de acordo com o seu perfil.' },
                          { term: 'IP', desc: 'Abreviatura de Internet Protocol. É o conjunto alfanumérico que identifica os dispositivos dos Usuários na Internet.' },
                          { term: 'ID de Sessão', desc: 'Identificação da sessão de usuários quando é efetuado o acesso ao Site.' },
                          { term: 'Decisões unicamente automatizadas', desc: 'Tratam-se de decisões que afetam um usuário que foram programadas para funcionar automaticamente, sem a necessidade de uma operação humana, com base em tratamento automatizado de dados pessoais.' },
                          { term: 'Tratamento', desc: 'Toda operação realizada com Dados Pessoais, como as que se referem a coleta, produção, recepção, classificação, utilização, acesso, reprodução, transmissão, distribuição, processamento, arquivamento, armazenamento, eliminação, avaliação ou controle da informação, modificação, comunicação, transferência, difusão ou extração.' },
                        ].map((item) => (
                          <div key={item.term} className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl">
                            <span className="font-bold text-slate-900 block mb-1 text-brand-700">
                              {item.term}
                            </span>
                            <span className="text-slate-600 text-xs leading-relaxed text-justify block">
                              {item.desc}
                            </span>
                          </div>
                        ))}
                      </div>
                    </article>
                  )}

                </section>
              )}

              {/* ─── CANAIS DE ATENDIMENTO E CONTATO OFICIAL ─────────── */}
              <div className="bg-gradient-to-r from-brand-600 via-brand-700 to-brand-800 text-white rounded-3xl p-6 sm:p-8 shadow-xl">
                <div className="max-w-3xl">
                  <span className="inline-block px-3 py-1 bg-white/20 text-white text-[11px] font-bold uppercase tracking-wider rounded-full mb-3">
                    Transparência & Contato
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight mb-3">
                    Ficou com alguma dúvida ou precisa exercer seus direitos?
                  </h3>
                  <p className="text-brand-100 text-xs sm:text-sm leading-relaxed mb-6 text-justify">
                    A Contrato Feito preza pela lisura e pelo respeito integral à legislação. Estamos à disposição para esclarecer qualquer aspecto das nossas políticas e do tratamento de dados.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/20 text-xs">
                    <div className="flex items-start gap-2.5">
                      <MapPin size={16} className="text-brand-200 shrink-0 mt-0.5" />
                      <div>
                        <span className="block font-bold text-white">Sede Física</span>
                        <span className="text-brand-100">
                          R. Deputado Castro de Carvalho, 207 - Álvares Florence/SP
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <Phone size={16} className="text-brand-200 shrink-0 mt-0.5" />
                      <div>
                        <span className="block font-bold text-white">Telefone & WhatsApp</span>
                        <a href="tel:+5517997225062" className="text-brand-100 hover:text-white transition-colors block">
                          (17) 99722-5062
                        </a>
                        <a href="tel:+5517997629089" className="text-brand-100 hover:text-white transition-colors block">
                          (17) 99762-9089
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <Mail size={16} className="text-brand-200 shrink-0 mt-0.5" />
                      <div>
                        <span className="block font-bold text-white">E-mail Oficial</span>
                        <a
                          href="mailto:emersonantoniodemendonca@yahoo.com.br"
                          className="text-brand-100 hover:text-white transition-colors break-all"
                        >
                          emersonantoniodemendonca@yahoo.com.br
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

