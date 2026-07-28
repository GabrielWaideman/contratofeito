import React from 'react'
import Link from 'next/link'
import { MapPin, Bed, Bath, Car, Square, Star } from 'lucide-react'
import { getAllProperties } from '@/lib/properties'

// Ícone de suíte (cama com coração — representa quarto premium)
function SuiteIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 9V4a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v5" />
      <path d="M2 11v9" />
      <path d="M22 11v9" />
      <path d="M2 15h20" />
      <path d="M7 11v4" />
      <path d="M17 11v4" />
      <path d="M7 11h10" />
      <path d="M12 6.5 C12 6.5 10 5 10 3.5a2 2 0 0 1 4 0C14 5 12 6.5 12 6.5z" />
    </svg>
  )
}

export default async function PropertySection() {
  const properties = await getAllProperties()

  return (
    <section id="imoveis" className="py-24 bg-white relative">
      <div className="container mx-auto px-4 md:px-8 mt-12 md:mt-24">

        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-brand-600 font-bold tracking-widest text-sm uppercase mb-3 border-l-4 border-brand-600 pl-3">Nosso Portfólio</h2>
            <h3 className="text-3xl md:text-5xl font-extrabold text-dark-900 leading-tight uppercase tracking-tight">Imóveis em Destaque</h3>
          </div>

          <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
            <button className="px-6 py-2 bg-brand-600 text-white rounded-md font-bold uppercase text-sm shadow-md">Todos</button>
            <button className="px-6 py-2 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-md font-bold uppercase text-sm transition-colors">Venda</button>
            <button className="px-6 py-2 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-md font-bold uppercase text-sm transition-colors">Locação</button>
          </div>
        </div>

        {/* Grid de cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.length === 0 ? (
            <p className="text-slate-500 col-span-full">Nenhum imóvel encontrado.</p>
          ) : (
            properties.map((property) => (
              <Link
                key={property.id}
                href={`/imoveis/${property.id}`}
                className="bg-white rounded-xl overflow-hidden shadow-lg border border-slate-200 group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col cursor-pointer"
              >
                {/* Imagem */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={property.imageUrl}
                    alt={property.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Badge Destaque (tipo RURAL/URBANO removido da visão do cliente) */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    {property.isFeatured && (
                      <span className="px-3 py-1 rounded-md bg-gold-500 text-dark-950 text-xs font-bold uppercase shadow-md flex items-center gap-1">
                        <Star size={10} fill="currentColor" /> Destaque
                      </span>
                    )}
                  </div>

                  {/* Preço */}
                  <div className="absolute bottom-4 right-4 bg-white px-4 py-2 rounded-md shadow-lg border-b-4 border-brand-600">
                    <span className="text-dark-900 font-bold text-base">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 }).format(property.price)}
                      {property.category === 'Locação' && <span className="text-slate-500 font-normal text-sm">/mês</span>}
                    </span>
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-brand-600/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-white font-bold uppercase tracking-widest text-sm border-2 border-white px-6 py-3 rounded-lg">
                      Ver Detalhes →
                    </span>
                  </div>
                </div>

                {/* Informações */}
                <div className="p-5 flex-1 flex flex-col">

                  {/* Localização: bairro + cidade */}
                  <div className="flex items-center gap-1 text-brand-600 text-xs font-bold uppercase tracking-wider mb-2">
                    <MapPin size={13} className="shrink-0" />
                    <span className="truncate">{property.neighborhood} · {property.city}</span>
                  </div>

                  {/* Título */}
                  <h4 className="text-lg font-bold text-dark-900 mb-4 line-clamp-2 leading-snug">{property.title}</h4>

                  {/* Stats */}
                  <div className="mt-auto pt-4 border-t border-slate-100">
                    <div className="flex flex-wrap gap-x-4 gap-y-2">
                      {property.bedrooms > 0 && (
                        <div className="flex items-center gap-1.5 text-slate-600">
                          <Bed size={15} className="text-slate-400 shrink-0" />
                          <span className="text-xs font-bold">{property.bedrooms} quarto{property.bedrooms > 1 ? 's' : ''}</span>
                        </div>
                      )}
                      {property.suites > 0 && (
                        <div className="flex items-center gap-1.5 text-slate-600">
                          <SuiteIcon size={15} />
                          <span className="text-xs font-bold">{property.suites} suíte{property.suites > 1 ? 's' : ''}</span>
                        </div>
                      )}
                      {property.bathrooms > 0 && (
                        <div className="flex items-center gap-1.5 text-slate-600">
                          <Bath size={15} className="text-slate-400 shrink-0" />
                          <span className="text-xs font-bold">{property.bathrooms} banheiro{property.bathrooms > 1 ? 's' : ''}</span>
                        </div>
                      )}
                      {property.garageSpots > 0 && (
                        <div className="flex items-center gap-1.5 text-slate-600">
                          <Car size={15} className="text-slate-400 shrink-0" />
                          <span className="text-xs font-bold">{property.garageSpots} vaga{property.garageSpots > 1 ? 's' : ''}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1.5 text-slate-600">
                        <Square size={15} className="text-slate-400 shrink-0" />
                        <span className="text-xs font-bold">
                          {property.area.toLocaleString('pt-BR')} {property.areaUnit}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>

        <div className="mt-16 text-center">
          <Link
            href="/imoveis"
            className="inline-block px-8 py-4 bg-brand-600 text-white rounded-md font-bold uppercase tracking-wider hover:bg-brand-700 transition-colors shadow-md hover:shadow-lg"
          >
            Ver todos os imóveis
          </Link>
        </div>

      </div>
    </section>
  )
}
