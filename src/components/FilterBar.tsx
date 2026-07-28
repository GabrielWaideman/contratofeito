'use client'

import React from 'react'
import { Search } from 'lucide-react'

export default function FilterBar() {
  return (
    <div className="container mx-auto px-4 -mt-16 -mb-16 relative z-30">
      <div className="bg-white rounded-lg shadow-xl p-4 md:p-6 border-t-4 border-brand-600 flex flex-col gap-4">
        {/* Tabs - Mantidas como atalhos rápidos para Modalidade */}
        <div className="flex flex-wrap gap-2 mb-2">
          <button className="bg-brand-600 text-white px-6 py-2 text-sm font-bold uppercase tracking-wider rounded-md">Venda</button>
          <button className="bg-slate-100 text-slate-600 hover:bg-slate-200 px-6 py-2 text-sm font-bold uppercase tracking-wider rounded-md transition-colors">Locação</button>
          <button className="bg-slate-100 text-slate-600 hover:bg-slate-200 px-6 py-2 text-sm font-bold uppercase tracking-wider rounded-md transition-colors hidden sm:block">Lançamentos</button>
        </div>

        {/* Inputs - Linha 1 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="flex flex-col">
            <label className="text-xs text-slate-500 mb-1">Finalidade</label>
            <select className="border border-slate-300 rounded-md p-3 text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500">
              <option>Selecione</option>
              <option>Residencial</option>
              <option>Comercial</option>
              <option>Rural</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-xs text-slate-500 mb-1">Qual o tipo?</label>
            <select className="border border-slate-300 rounded-md p-3 text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500">
              <option>Selecione o tipo</option>
              <option>Casa</option>
              <option>Apartamento</option>
              <option>Terreno</option>
              <option>Chácara/Sítio</option>
            </select>
          </div>
          
          <div className="flex flex-col">
            <label className="text-xs text-slate-500 mb-1">Cidade</label>
            <select className="border border-slate-300 rounded-md p-3 text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500">
              <option>Selecione a cidade</option>
              <option>Álvares Florence</option>
              <option>Votuporanga</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-xs text-slate-500 mb-1">Bairro</label>
            <select className="border border-slate-300 rounded-md p-3 text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500">
              <option>Todos os bairros</option>
              <option>Centro</option>
              <option>Zona Rural</option>
              <option>Jardim das Flores</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-xs text-slate-500 mb-1">Código do Imóvel</label>
            <input type="text" placeholder="Ex: 1234" className="border border-slate-300 rounded-md p-3 text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500" />
          </div>
        </div>

        {/* Inputs - Linha 2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="flex flex-col">
            <label className="text-xs text-slate-500 mb-1">Quartos</label>
            <select className="border border-slate-300 rounded-md p-3 text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500">
              <option>Qualquer</option>
              <option>1+</option>
              <option>2+</option>
              <option>3+</option>
              <option>4+</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-xs text-slate-500 mb-1">Banheiros</label>
            <select className="border border-slate-300 rounded-md p-3 text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500">
              <option>Qualquer</option>
              <option>1+</option>
              <option>2+</option>
              <option>3+</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-xs text-slate-500 mb-1">Valor mínimo</label>
            <input type="text" placeholder="R$ 0" className="border border-slate-300 rounded-md p-3 text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500" />
          </div>

          <div className="flex flex-col">
            <label className="text-xs text-slate-500 mb-1">Valor máximo</label>
            <input type="text" placeholder="Sem limite" className="border border-slate-300 rounded-md p-3 text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500" />
          </div>

          <div className="flex items-end">
            <button className="w-full bg-brand-600 hover:bg-brand-700 text-white p-3 rounded-md font-bold uppercase flex items-center justify-center gap-2 transition-colors">
              <Search size={20} />
              Buscar
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}
