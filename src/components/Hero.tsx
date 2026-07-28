import React from 'react'
import FilterBar from './FilterBar'

export default function Hero() {
  return (
    <>
    <section className="relative w-full h-[80vh] min-h-[500px] flex items-center justify-center overflow-hidden pt-20">
      {/* Video Background & Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute min-w-full min-h-full w-auto h-auto object-cover top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <source src="/videobackground.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-dark-950/30"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-dark-900/80 via-dark-900/40 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 md:px-8 mt-10">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-600/20 border border-brand-600/30 backdrop-blur-md mb-6">
            <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></span>
            <span className="text-brand-100 text-xs font-bold tracking-wider uppercase">Álvares Florence e Região</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6 text-balance drop-shadow-lg uppercase tracking-tight">
            Saia do aluguel e <br className="hidden md:block" />
            <span className="text-brand-500">Conquiste seu primeiro imóvel</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl font-light text-balance drop-shadow-md">
            A <strong className="text-white font-bold">Contrato Feito</strong> ajuda você a encontrar a opção ideal para o seu momento, com segurança e agilidade.
          </p>
        </div>
      </div>
    </section>
    
    <FilterBar />
    </>
  )
}
