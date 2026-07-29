'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { Star, X, ChevronRight, MessageSquare } from 'lucide-react'

type Review = {
  id: number
  clientName: string
  content: string
  rating: number
}

const DISPLAY_DURATION = 8000  // ms que cada depoimento fica visível
const APPEAR_DELAY    = 2200   // delay inicial antes do primeiro aparecer
const MAX_REVIEWS     = 4      // máximo de depoimentos no ciclo

// Embaralha e pega até N itens
function pickRandom<T>(arr: T[], n: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, n)
}

// Páginas onde o toast deve aparecer
const ALLOWED_PATHS = ['/', '/imoveis']

export default function TestimonialToast() {
  const pathname = usePathname()
  const [queue, setQueue]           = useState<Review[]>([])
  const [currentIdx, setCurrentIdx] = useState(0)
  const [phase, setPhase]           = useState<'hidden' | 'enter' | 'visible' | 'exit'>('hidden')
  const [dismissed, setDismissed]   = useState(false)
  const timerRef                    = useRef<ReturnType<typeof setTimeout> | null>(null)

  // ─── Busca e monta a fila de depoimentos ────────────────────────────────────
  const fetchQueue = useCallback(async () => {
    try {
      const res = await fetch('/api/reviews')
      if (!res.ok) return
      const data: Review[] = await res.json()
      if (!data || data.length === 0) return
      setQueue(pickRandom(data, MAX_REVIEWS))
    } catch {
      // silencioso
    }
  }, [])

  useEffect(() => { fetchQueue() }, [fetchQueue])

  // ─── Inicia o primeiro depoimento após o delay inicial ───────────────────────
  useEffect(() => {
    if (queue.length === 0) return
    const t = setTimeout(() => setPhase('enter'), APPEAR_DELAY)
    return () => clearTimeout(t)
  }, [queue])

  // ─── Controla as transições de fase ─────────────────────────────────────────
  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current)

    if (phase === 'enter') {
      // Após a animação de entrada, marca como visível
      timerRef.current = setTimeout(() => setPhase('visible'), 600)
    }

    if (phase === 'visible') {
      // Permanece visível por DISPLAY_DURATION, depois sai
      timerRef.current = setTimeout(() => setPhase('exit'), DISPLAY_DURATION)
    }

    if (phase === 'exit') {
      // Após a animação de saída, avança para o próximo ou encerra
      timerRef.current = setTimeout(() => {
        const nextIdx = currentIdx + 1
        if (nextIdx < queue.length) {
          setCurrentIdx(nextIdx)
          setPhase('enter')
        } else {
          setDismissed(true)
        }
      }, 500)
    }

    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [phase, currentIdx, queue.length])

  // ─── Fechar manualmente ──────────────────────────────────────────────────────
  const handleDismiss = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    setPhase('exit')
    setTimeout(() => setDismissed(true), 500)
  }, [])

  // ─── Ir para seção de depoimentos ───────────────────────────────────────────
  const handleVerMais = (e: React.MouseEvent) => {
    e.preventDefault()
    handleDismiss()
    setTimeout(() => {
      document.getElementById('avaliacoes')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 300)
  }

  // Não renderiza em páginas não autorizadas
  if (!ALLOWED_PATHS.includes(pathname)) return null
  if (dismissed || queue.length === 0) return null

  const review = queue[currentIdx]
  if (!review) return null

  const isLong  = review.content.length > 120
  const preview = isLong ? review.content.slice(0, 118).trimEnd() + '…' : review.content

  // ─── Classes de animação por fase ────────────────────────────────────────────
  const animClass =
    phase === 'enter'
      ? 'opacity-100 translate-y-0'
      : phase === 'visible'
      ? 'opacity-100 translate-y-0'
      : 'opacity-0 translate-y-6 pointer-events-none'

  // Progresso (0 → 1 em DISPLAY_DURATION ms)
  const progressKey = `${currentIdx}-${phase}` // reinicia a animação por depoimento

  return (
    <div
      aria-live="polite"
      aria-label={`Depoimento de ${review.clientName}`}
      className={`
        fixed z-40
        bottom-4 left-3 w-[220px]
        md:left-6 md:bottom-24 md:w-[300px]
        transition-all duration-500 ease-out
        ${animClass}
      `}
    >
      {/* Card — fundo escuro sólido sempre legível */}
      <div className="
        relative rounded-2xl overflow-hidden
        bg-gray-900 border border-gray-700/80
        shadow-[0_12px_40px_rgba(0,0,0,0.55)]
      ">

        {/* Faixa superior dourada fina */}
        <div className="h-0.5 w-full bg-gradient-to-r from-brand-600 via-gold-500 to-brand-600" />

        {/* Indicador de posição na fila */}
        {queue.length > 1 && (
          <div className="absolute top-3 left-1/2 -translate-x-1/2 flex gap-1">
            {queue.map((_, i) => (
              <span
                key={i}
                className={`block h-1 rounded-full transition-all duration-300 ${
                  i === currentIdx
                    ? 'w-4 bg-brand-500'
                    : i < currentIdx
                    ? 'w-1.5 bg-gray-600'
                    : 'w-1.5 bg-gray-700'
                }`}
              />
            ))}
          </div>
        )}

        {/* Botão fechar */}
        <button
          onClick={handleDismiss}
          aria-label="Fechar"
          className="absolute top-3 right-3 w-6 h-6 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center text-gray-400 hover:text-white transition-all"
        >
          <X size={12} />
        </button>

        {/* Corpo */}
        <div className="px-3 pt-5 pb-2 md:px-4 md:pt-6 md:pb-3">
          <div className="flex items-start gap-2 md:gap-3">
            {/* Avatar */}
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white font-bold text-sm md:text-base shadow-md shrink-0 border border-gray-700">
              {review.clientName.charAt(0).toUpperCase()}
            </div>

            <div className="flex-1 min-w-0 pr-5">
              {/* Nome + estrelas */}
              <div className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5 mb-1">
                <span className="text-white font-bold text-xs md:text-sm leading-none">
                  {review.clientName}
                </span>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={10}
                      className={i < review.rating
                        ? 'fill-amber-400 text-amber-400'
                        : 'fill-transparent text-gray-600'}
                    />
                  ))}
                </div>
              </div>

              {/* Texto */}
              <p className="text-gray-300 text-[11px] md:text-xs leading-relaxed">
                &ldquo;{preview}&rdquo;
              </p>

              {/* Ver mais */}
              {isLong && (
                <button
                  onClick={handleVerMais}
                  className="mt-2 inline-flex items-center gap-1 text-brand-400 hover:text-brand-300 text-xs font-semibold transition-colors group"
                >
                  ver mais
                  <ChevronRight size={11} className="group-hover:translate-x-0.5 transition-transform" />
                </button>
              )}
            </div>
          </div>

          {/* Label discreta — oculta no mobile para economizar espaço */}
          <div className="hidden md:flex items-center gap-1.5 mt-3 mb-1">
            <MessageSquare size={10} className="text-gray-600" />
            <span className="text-gray-600 text-[10px] font-medium tracking-wide uppercase">
              Depoimento de cliente real
            </span>
          </div>
        </div>

        {/* Barra de progresso */}
        <div className="h-0.5 bg-gray-800">
          {phase === 'visible' && (
            <div
              key={progressKey}
              className="h-full bg-brand-600/70 origin-left rounded-full"
              style={{ animation: `progress-shrink ${DISPLAY_DURATION}ms linear forwards` }}
            />
          )}
        </div>
      </div>
    </div>
  )
}
