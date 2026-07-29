'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { Star, ChevronLeft, ChevronRight, Quote, Plus, X, Send, CheckCircle2, MessageSquare, Loader2 } from 'lucide-react'

type Review = {
  id: number
  clientName: string
  content: string
  rating: number
}

// ─── Skeleton de loading ───────────────────────────────────────────────────────
function ReviewSkeleton() {
  return (
    <div className="bg-dark-800/60 backdrop-blur-xl border border-dark-700/50 rounded-3xl p-8 md:p-12 shadow-2xl animate-pulse flex flex-col items-center gap-6">
      <div className="flex gap-2">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="w-6 h-6 bg-dark-700 rounded-full" />
        ))}
      </div>
      <div className="w-full space-y-3 max-w-2xl">
        <div className="h-4 bg-dark-700 rounded-full w-full" />
        <div className="h-4 bg-dark-700 rounded-full w-5/6 mx-auto" />
        <div className="h-4 bg-dark-700 rounded-full w-4/6 mx-auto" />
      </div>
      <div className="flex flex-col items-center gap-2">
        <div className="w-14 h-14 rounded-full bg-dark-700" />
        <div className="h-4 bg-dark-700 rounded-full w-28" />
      </div>
    </div>
  )
}

// ─── Modal de adicionar depoimento ────────────────────────────────────────────
function AddReviewModal({
  onClose,
  onSuccess,
}: {
  onClose: () => void
  onSuccess: () => void
}) {
  const [name, setName] = useState('')
  const [content, setContent] = useState('')
  const [rating, setRating] = useState(5)
  const [hovered, setHovered] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) { setError('Por favor, informe seu nome.'); return }
    if (!content.trim() || content.trim().length < 20) { setError('Escreva pelo menos 20 caracteres no depoimento.'); return }
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clientName: name.trim(), content: content.trim(), rating }),
      })

      if (!res.ok) {
        const data = await res.json()
        setError(data.error || 'Erro ao enviar. Tente novamente.')
        setLoading(false)
        return
      }

      setSubmitted(true)
      onSuccess() // Notifica o pai para recarregar se necessário
    } catch {
      setError('Erro de conexão. Tente novamente.')
      setLoading(false)
    }
  }

  // Fecha automaticamente após mostrar a tela de sucesso
  useEffect(() => {
    if (submitted) {
      const t = setTimeout(onClose, 2500)
      return () => clearTimeout(t)
    }
  }, [submitted, onClose])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-dark-900 border border-dark-700 rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-7 pt-7 pb-5 border-b border-dark-800">
          <div>
            <h3 className="text-white font-extrabold text-xl tracking-tight">Adicionar Depoimento</h3>
            <p className="text-slate-400 text-sm mt-0.5">Sua opinião é muito importante para nós</p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-dark-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-dark-700 transition-all"
          >
            <X size={18} />
          </button>
        </div>

        {submitted ? (
          /* Tela de sucesso */
          <div className="px-7 py-14 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-brand-600/20 border border-brand-600/40 flex items-center justify-center mb-4">
              <CheckCircle2 size={32} className="text-brand-500" />
            </div>
            <h4 className="text-white font-bold text-lg mb-2">Depoimento enviado!</h4>
            <p className="text-slate-400 text-sm">
              Obrigado! Seu depoimento será exibido após aprovação da nossa equipe.
            </p>
          </div>
        ) : (
          /* Formulário */
          <form onSubmit={handleSubmit} className="px-7 py-6 space-y-5">
            {/* Nome */}
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Seu nome
              </label>
              <input
                type="text"
                placeholder="Ex: João Silva"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={60}
                className="w-full bg-dark-800 border border-slate-700 text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-brand-500 placeholder-slate-600 transition-colors"
              />
            </div>

            {/* Avaliação em estrelas */}
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Avaliação
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onMouseEnter={() => setHovered(star)}
                    onMouseLeave={() => setHovered(0)}
                    onClick={() => setRating(star)}
                    className="focus:outline-none transition-transform hover:scale-110"
                    aria-label={`${star} estrela${star > 1 ? 's' : ''}`}
                  >
                    <Star
                      size={28}
                      className={`transition-colors ${
                        star <= (hovered || rating)
                          ? 'fill-gold-500 text-gold-500'
                          : 'fill-transparent text-slate-600'
                      }`}
                    />
                  </button>
                ))}
                <span className="text-slate-400 text-sm self-center ml-2">
                  {rating === 5 ? 'Excelente!' : rating === 4 ? 'Muito bom' : rating === 3 ? 'Bom' : rating === 2 ? 'Regular' : 'Ruim'}
                </span>
              </div>
            </div>

            {/* Texto do depoimento */}
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Depoimento
              </label>
              <textarea
                placeholder="Conte sua experiência com a Contrato Feito..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={4}
                maxLength={500}
                className="w-full bg-dark-800 border border-slate-700 text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-brand-500 placeholder-slate-600 transition-colors resize-none"
              />
              <p className="text-slate-600 text-xs text-right mt-1">{content.length}/500</p>
            </div>

            {/* Erro */}
            {error && (
              <p className="text-brand-400 text-sm flex items-center gap-2">
                <X size={14} /> {error}
              </p>
            )}

            {/* Botões */}
            <div className="flex gap-3 pt-1">
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="flex-1 py-3 rounded-xl border border-slate-700 text-slate-400 hover:text-white hover:border-slate-500 text-sm font-medium transition-all disabled:opacity-50"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all hover:shadow-lg hover:shadow-brand-600/30 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <><Loader2 size={15} className="animate-spin" /> Enviando...</>
                ) : (
                  <><Send size={15} /> Enviar Depoimento</>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

// ─── Componente principal ─────────────────────────────────────────────────────

export default function Testimonials() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const fetchReviews = useCallback(async () => {
    try {
      const res = await fetch('/api/reviews')
      if (res.ok) {
        const data = await res.json()
        setReviews(data)
      }
    } catch (err) {
      console.error('Erro ao carregar depoimentos:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchReviews()
  }, [fetchReviews])

  const navigate = (to: number) => {
    if (isAnimating || reviews.length === 0) return
    setIsAnimating(true)
    setCurrentIndex(to)
    setTimeout(() => setIsAnimating(false), 500)
  }

  const nextReview = useCallback(() => {
    if (reviews.length === 0) return
    navigate((currentIndex + 1) % reviews.length)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, reviews.length, isAnimating])

  const prevReview = () => {
    if (reviews.length === 0) return
    navigate((currentIndex - 1 + reviews.length) % reviews.length)
  }

  useEffect(() => {
    if (showModal || reviews.length === 0) return
    const timer = setInterval(nextReview, 6000)
    return () => clearInterval(timer)
  }, [nextReview, showModal, reviews.length])

  // Garante que o índice não fique fora dos bounds ao recarregar
  useEffect(() => {
    if (reviews.length > 0 && currentIndex >= reviews.length) {
      setCurrentIndex(0)
    }
  }, [reviews.length, currentIndex])

  return (
    <section id="avaliacoes" className="py-24 bg-dark-900 relative overflow-hidden flex flex-col items-center min-h-[600px]">

      {/* Background decorativo */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand-600/10 rounded-full mix-blend-screen filter blur-[100px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-gold-500/5 rounded-full mix-blend-screen filter blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10 w-full">

        {/* Cabeçalho */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-brand-600 font-bold tracking-widest text-sm uppercase mb-3">Depoimentos</h2>
          <h3 className="text-3xl md:text-5xl font-extrabold text-white leading-tight uppercase tracking-tight">
            O que dizem sobre nós
          </h3>
        </div>

        {/* Carrossel */}
        <div className="relative max-w-4xl mx-auto">

          {/* Estado de loading */}
          {loading && <ReviewSkeleton />}

          {/* Sem depoimentos */}
          {!loading && reviews.length === 0 && (
            <div className="bg-dark-800/60 backdrop-blur-xl border border-dark-700/50 rounded-3xl p-12 shadow-2xl flex flex-col items-center gap-4 text-center">
              <div className="w-16 h-16 rounded-full bg-dark-700 flex items-center justify-center">
                <MessageSquare size={28} className="text-slate-500" />
              </div>
              <h4 className="text-white font-bold text-lg">Seja o primeiro a avaliar!</h4>
              <p className="text-slate-400 text-sm max-w-sm">
                Ainda não temos depoimentos cadastrados. Clique abaixo e compartilhe sua experiência com a Contrato Feito.
              </p>
            </div>
          )}

          {/* Cards do carrossel */}
          {!loading && reviews.length > 0 && (
            <>
              <div className="relative">
                {reviews.map((review, index) => {
                  const isActive = index === currentIndex
                  return (
                    <div
                      key={review.id}
                      className={`transition-all duration-700 ease-in-out ${
                        isActive
                          ? 'opacity-100 translate-y-0 scale-100 relative z-20'
                          : 'opacity-0 translate-y-8 scale-95 absolute inset-0 z-0 pointer-events-none'
                      }`}
                    >
                      <div className="bg-dark-800/60 backdrop-blur-xl border border-dark-700/50 rounded-3xl p-8 md:p-12 shadow-2xl relative text-center flex flex-col items-center">
                        <Quote className="text-brand-600 opacity-20 absolute top-8 left-8 w-16 h-16" />
                        <Quote className="text-brand-600 opacity-20 absolute bottom-8 right-8 w-16 h-16 rotate-180" />

                        <div className="flex gap-1 mb-6">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} size={24} className="fill-gold-500 text-gold-500 drop-shadow-md" />
                          ))}
                        </div>

                        <p className="text-white text-xl md:text-2xl mb-8 leading-relaxed font-light max-w-2xl">
                          &quot;{review.content}&quot;
                        </p>

                        <div className="flex flex-col items-center gap-2">
                          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white font-bold text-xl shadow-lg border-2 border-dark-800">
                            {review.clientName.charAt(0).toUpperCase()}
                          </div>
                          <div className="text-center">
                            <h4 className="text-white font-bold text-lg">{review.clientName}</h4>
                            <span className="text-brand-400 text-sm font-medium tracking-wide uppercase">Cliente Real</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Controles de navegação */}
              <div className="flex items-center justify-center gap-6 mt-10">
                <button
                  onClick={prevReview}
                  className="w-12 h-12 rounded-full border border-dark-700 bg-dark-800/50 flex items-center justify-center text-white hover:bg-brand-600 hover:border-brand-600 transition-colors shadow-lg group"
                  aria-label="Depoimento anterior"
                >
                  <ChevronLeft className="group-hover:-translate-x-1 transition-transform" />
                </button>

                <div className="flex gap-2 items-center">
                  {reviews.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => navigate(idx)}
                      className={`h-2.5 rounded-full transition-all duration-300 ${
                        idx === currentIndex ? 'w-8 bg-brand-600' : 'w-2.5 bg-dark-700 hover:bg-dark-600'
                      }`}
                      aria-label={`Ir para o depoimento ${idx + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={nextReview}
                  className="w-12 h-12 rounded-full border border-dark-700 bg-dark-800/50 flex items-center justify-center text-white hover:bg-brand-600 hover:border-brand-600 transition-colors shadow-lg group"
                  aria-label="Próximo depoimento"
                >
                  <ChevronRight className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </>
          )}

          {/* Botão adicionar depoimento */}
          <div className="flex justify-center mt-10">
            <button
              onClick={() => setShowModal(true)}
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-white border border-slate-700 hover:border-brand-600 hover:bg-brand-600/10 px-5 py-2.5 rounded-full transition-all duration-300 group"
            >
              <Plus size={16} className="group-hover:rotate-90 transition-transform duration-300" />
              Adicionar seu depoimento
            </button>
          </div>

        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <AddReviewModal
          onClose={() => setShowModal(false)}
          onSuccess={fetchReviews}
        />
      )}
    </section>
  )
}
