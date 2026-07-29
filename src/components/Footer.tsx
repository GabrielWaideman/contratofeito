import React from 'react'
import Link from 'next/link'
import { MapPin, Phone, Mail, Lock } from 'lucide-react'

export default function Footer() {
  return (
    <footer id="contato" className="bg-dark-950 pt-20 pb-28 md:pb-10 border-t border-dark-800">
      <div className="container mx-auto px-4 md:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6 group">
              <img
                src="/logo.png"
                alt="Contrato Feito Logo"
                className="h-20 w-auto object-contain"
              />
            </Link>
            <p className="text-gray-400 mb-6 text-sm leading-relaxed">
              Transformando a maneira como você compra e vende imóveis em Álvares Florence e região. Foco exclusivo, transparência total.
            </p>
            <div className="text-gray-300 font-bold text-sm bg-dark-900 border border-dark-800 inline-block px-4 py-2 rounded-lg">
              CRECI-SP 246817F
            </div>
          </div>

          {/* Links Úteis */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Links Úteis</h4>
            <ul className="flex flex-col gap-4">
              <li><Link href="/#imoveis" className="text-slate-400 hover:text-brand-400 transition-colors text-sm">Comprar Imóvel</Link></li>
              <li><Link href="/#sobre" className="text-slate-400 hover:text-brand-400 transition-colors text-sm">Sobre Nós</Link></li>
              <li><Link href="/#avaliacoes" className="text-slate-400 hover:text-brand-400 transition-colors text-sm">Avaliações</Link></li>
              <li><Link href="#" className="text-slate-400 hover:text-brand-400 transition-colors text-sm">Política de Privacidade</Link></li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Contato</h4>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-brand-500 mt-0.5 shrink-0" />
                <span className="text-slate-400 text-sm leading-relaxed">
                  Álvares Florence - SP<br />
                  CEP: 15540-019
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-brand-500 shrink-0" />
                <a href="tel:+5517999999999" className="text-slate-400 hover:text-brand-400 transition-colors text-sm">
                  (17) 99999-9999
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-brand-500 shrink-0" />
                <a href="mailto:contato@contratofeito.com.br" className="text-slate-400 hover:text-brand-400 transition-colors text-sm">
                  contato@contratofeito.com.br
                </a>
              </li>
            </ul>
          </div>

          {/* Redes Sociais */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Siga-nos</h4>
            <div className="flex gap-3 flex-wrap">

              {/* Instagram */}
              <a href="#" aria-label="Instagram" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-brand-400 hover:bg-brand-600 hover:text-white transition-all">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>

              {/* Facebook */}
              <a href="#" aria-label="Facebook" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-brand-400 hover:bg-brand-600 hover:text-white transition-all">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3.81l.5-4h-4.31V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>

              {/* TikTok */}
              <a href="#" aria-label="TikTok" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-brand-400 hover:bg-brand-600 hover:text-white transition-all">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.26 8.26 0 0 0 4.82 1.54V6.78a4.85 4.85 0 0 1-1.05-.09z"/>
                </svg>
              </a>

              {/* YouTube */}
              <a href="#" aria-label="YouTube" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-brand-400 hover:bg-red-600 hover:text-white transition-all">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.54 3.6 12 3.6 12 3.6s-7.54 0-9.38.45A3.02 3.02 0 0 0 .5 6.19C.06 8.04 0 12 0 12s.06 3.96.5 5.81a3.02 3.02 0 0 0 2.12 2.14C4.46 20.4 12 20.4 12 20.4s7.54 0 9.38-.45a3.02 3.02 0 0 0 2.12-2.14C23.94 15.96 24 12 24 12s-.06-3.96-.5-5.81zM9.6 15.6V8.4l6.27 3.6-6.27 3.6z"/>
                </svg>
              </a>

            </div>
            
            <div className="mt-8">
              <p className="text-slate-400 text-sm mb-3">Inicie seu atendimento</p>
              <a
                href="https://wa.me/5517999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-xl font-semibold transition-all"
              >
                Chamar no WhatsApp
              </a>
            </div>
          </div>
          
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm text-center md:text-left">
            &copy; {new Date().getFullYear()} Contrato Feito Imobiliária. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-3">
            <p className="text-slate-500 text-sm">
              Desenvolvido com excelência.
            </p>
            <Link href="/admin" aria-label="Acesso Restrito" className="text-slate-800 hover:text-brand-500 transition-colors">
              <Lock size={14} />
            </Link>
          </div>
        </div>

      </div>
    </footer>
  )
}
