'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, Home } from 'lucide-react'

export default function Header({ theme = 'light' }: { theme?: 'light' | 'dark' }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Início', href: '/' },
    { name: 'Imóveis', href: '/imoveis' },
    { name: 'Sobre Nós', href: '/sobre' },
    { name: 'Avaliações', href: '/#avaliacoes' },
  ]

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 shadow-sm py-4 ${
      theme === 'dark' ? 'bg-dark-950' : 'bg-white'
    }`}>
      <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <Image src="/logo.png" alt="Contrato Feito Logo" width={300} height={100} className="h-20 w-auto object-contain" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className={`font-semibold text-sm hover:text-brand-600 transition-colors uppercase tracking-wide ${
                theme === 'dark' ? 'text-white' : 'text-slate-800'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <a href="#contato" className="bg-brand-600 hover:bg-brand-700 text-white px-8 py-3 rounded-md font-bold text-sm transition-all shadow-md hover:shadow-lg uppercase tracking-wider">
            Fale Conosco
          </a>
        </nav>

        {/* Mobile Toggle */}
        <button 
          className={`md:hidden p-2 ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t border-slate-100 py-4 px-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-slate-700 font-medium py-2 px-4 hover:bg-brand-50 rounded-lg"
            >
              {link.name}
            </Link>
          ))}
          <a 
            href="#contato" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="bg-brand-600 text-white text-center py-3 rounded-lg font-medium mt-2"
          >
            Fale Conosco
          </a>
        </div>
      )}
    </header>
  )
}
