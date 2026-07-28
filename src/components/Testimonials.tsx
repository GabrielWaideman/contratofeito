'use client'

import React, { useState, useEffect } from 'react'
import { Star, ChevronLeft, ChevronRight, Quote, Plus, X, Send, CheckCircle2 } from 'lucide-react'

type Review = {
  id: number
  clientName: string
  content: string
  rating: number
}

const INITIAL_REVIEWS: Review[] = [
  {
    id: 1,
    clientName: 'João Silva',
    content: 'Atendimento excelente! Encontraram a chácara perfeita para minha família em tempo recorde. Muito satisfeito com a transparência.',
    rating: 5,
  },
  {
    id: 2,
    clientName: 'Maria Fernanda',
    content: 'Vendi minha casa com a Contrato Feito e foi a melhor escolha. Eles cuidaram de tudo, desde as fotos até a documentação final.',
    rating: 5,
  },
  {
    id: 3,
    clientName: 'Carlos e Ana',
    content: 'Profissionalismo do começo ao fim. Recomendamos de olhos fechados para quem busca investir em imóveis na região.',
    rating: 5,
  },
]

// ─── Modal de adicionar depoimento ────────────────────────────────────────────

function AddReviewModal({
  onClose,
  onAdd,
}: {
  onClose: () => void
  onAdd: (r: Omit<Review, 'id'>) => void
}) {
  const [name, setName] = useState('')
  const [content, setContent] = useState('')
  const [rating, setRating] = useState(5)
  const [hovered, setHovered] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) { setError('Por favor, informe seu nome.'); return }
    if (!content.trim() || content.trim().length < 20) { setError('Escreva pelo menos 20 caracteres no depoimento.'); return }
    setError('')
    onAdd({ clientName: name.trim(), content: content.trim(), rating })
    setSubmitted(true)
  }

  // Fecha automaticamente após mostrar a tela de sucesso
  useEffect(() => {
    if (submitted) {
      const t = setTimeout(onClose, 2200)
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
            <h4 className="text-white font-bold text-lg mb-2">Depoimento adicionado!</h4>
            <p className="text-slate-400 text-sm">Obrigado por compartilhar sua experiência.</p>
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
                maxLength={300}
                className="w-full bg-dark-800 border border-slate-700 text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-brand-500 placeholder-slate-600 transition-colors resize-none"
              />
              <p className="text-slate-600 text-xs text-right mt-1">{content.length}/300</p>
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
                className="flex-1 py-3 rounded-xl border border-slate-700 text-slate-400 hover:text-white hover:border-slate-500 text-sm font-medium transition-all"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex-1 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all hover:shadow-lg hover:shadow-brand-600/30"
              >
                <Send size={15} />
                Enviar Depoimento
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
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const navigate = (to: number) => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex(to)
    setTimeout(() => setIsAnimating(false), 500)
  }

  const nextReview = () => navigate((currentIndex + 1) % reviews.length)
  const prevReview = () => navigate((currentIndex - 1 + reviews.length) % reviews.length)

  useEffect(() => {
    if (showModal) return
    const timer = setInterval(nextReview, 6000)
    return () => clearInterval(timer)
  }, [currentIndex, reviews.length, showModal])

  const handleAddReview = (data: Omit<Review, 'id'>) => {
    const newReview: Review = { id: Date.now(), ...data }
    setReviews((prev) => [...prev, newReview])
    // Vai automaticamente para o novo depoimento após fechar o modal
    setTimeout(() => {
      setCurrentIndex(reviews.length) // índice do recém-adicionado
    }, 2400)
  }

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

          {/* Cards */}
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
                      "{review.content}"
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
          onAdd={handleAddReview}
        />
      )}
    </section>
  )
}
