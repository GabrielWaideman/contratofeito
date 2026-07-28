import React from 'react'
import Image from 'next/image'

export default function AboutSection() {
  return (
    <section id="sobre" className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Images/Visuals */}
          <div className="w-full lg:w-1/2 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-square md:aspect-[4/3] w-full z-10">
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: 'url("/alvares.jpeg")',
                }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 to-transparent"></div>
              
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 text-white">
                  <p className="font-bold text-xl">Mais de 10 anos</p>
                  <p className="text-sm opacity-80">de experiência no mercado regional.</p>
                </div>
              </div>
            </div>
            
            {/* Decorative pattern */}
            <div className="absolute -top-6 -left-6 z-0 w-32 h-32 bg-[radial-gradient(#dc2626_2px,transparent_2px)] [background-size:16px_16px] opacity-20"></div>
            
            {/* Logo Badge Overlay */}
            <div className="absolute -bottom-8 right-0 md:-bottom-12 md:-right-12 z-20 bg-white p-6 rounded-2xl shadow-xl hidden sm:block border-4 border-gray-50">
              <div className="w-32 h-32 md:w-40 md:h-40 flex items-center justify-center">
                <Image src="/logo.png" alt="Contrato Feito Logo" width={300} height={300} className="w-full h-auto object-contain" />
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="w-full lg:w-1/2 mt-8 lg:mt-0">
            <h2 className="text-brand-600 font-bold tracking-widest text-sm uppercase mb-3 border-l-4 border-brand-600 pl-3">Sobre Nós</h2>
            <h3 className="text-3xl md:text-5xl font-extrabold text-dark-900 leading-tight mb-6 uppercase tracking-tight">
              Sua imobiliária digital em <span className="text-brand-600">Álvares Florence</span>
            </h3>
            
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
              A <strong className="text-dark-900 font-bold">Contrato Feito</strong> nasceu com o objetivo de descomplicar o mercado imobiliário. Nosso foco é exclusivo na compra e venda de imóveis urbanos e rurais.
            </p>
            
            <p className="text-lg text-slate-600 mb-10 leading-relaxed">
              Trabalhamos de forma transparente e digital, agilizando processos para que você alcance o seu sonho da chave na mão sem burocracias desnecessárias, sempre com a segurança que você merece.
            </p>

            <div className="flex flex-col sm:flex-row gap-6">
              <div className="bg-white rounded-xl p-6 border-l-4 border-brand-600 shadow-lg flex-1">
                <div className="text-brand-600 font-black text-3xl mb-1">CRECI</div>
                <div className="text-dark-900 font-bold text-xl">246817F</div>
                <div className="text-slate-500 text-sm mt-2">Registro profissional ativo e regular.</div>
              </div>
              
              <div className="bg-dark-900 rounded-xl p-6 border-l-4 border-gold-500 shadow-lg flex-1">
                <div className="text-gold-500 font-black text-3xl mb-1">100%</div>
                <div className="text-white font-bold text-xl">Foco em Vendas</div>
                <div className="text-gray-400 text-sm mt-2">Especialistas em fechamento de negócios.</div>
              </div>
            </div>
            
          </div>
          
        </div>
      </div>
    </section>
  )
}
