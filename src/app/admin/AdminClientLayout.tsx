'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutDashboard, Home, PlusSquare, LogOut, Menu, X, MessageSquare } from 'lucide-react'

export default function AdminClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Se estiver na página de login, não renderiza a sidebar
  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
    router.refresh()
  }

  const menuItems = [
    { href: '/admin', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { href: '/admin/imoveis', icon: <Home size={20} />, label: 'Imóveis' },
    { href: '/admin/imoveis/novo', icon: <PlusSquare size={20} />, label: 'Novo Imóvel' },
    { href: '/admin/depoimentos', icon: <MessageSquare size={20} />, label: 'Depoimentos' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar Mobile Toggle */}
      <button
        className="md:hidden fixed top-4 right-4 z-50 bg-white p-2 rounded-xl shadow-md text-gray-700"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-gray-900 text-white transform transition-transform duration-300 ease-in-out flex flex-col md:translate-x-0 ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } md:static md:shrink-0`}
      >
        <div className="p-6">
          <Link href="/admin" className="flex items-center gap-3 group">
            <div className="bg-white rounded-lg p-1.5 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform shrink-0 border border-gray-100">
              <img src="/logo.png" alt="Contrato Feito" className="h-8 w-auto object-contain" />
            </div>
            <div>
              <h2 className="font-bold text-lg leading-tight">Admin</h2>
              <p className="text-gray-400 text-xs font-medium">Contrato Feito</p>
            </div>
          </Link>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href))
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive
                    ? 'bg-brand-600 text-white shadow-md'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                {item.icon}
                <span className="font-semibold text-sm">{item.label}</span>
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-gray-800">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-gray-400 hover:text-red-400 hover:bg-red-400/10 transition-all font-semibold text-sm"
          >
            <LogOut size={20} />
            Sair
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0 overflow-y-auto">
        <div className="p-6 md:p-10 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
      
      {/* Overlay Mobile */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  )
}
