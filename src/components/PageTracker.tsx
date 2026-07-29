'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

/**
 * Componente invisível que registra um acesso de página.
 * Dispara uma única vez por navegação de rota, ignorando rotas admin/api.
 * Adicionado no layout raiz para cobrir todas as páginas públicas.
 */
export default function PageTracker() {
  const pathname  = usePathname()
  const trackedRef = useRef<string | null>(null)

  useEffect(() => {
    // Não rastreia admin nem api
    if (pathname.startsWith('/admin') || pathname.startsWith('/api')) return
    // Evita double-fire em StrictMode
    if (trackedRef.current === pathname) return
    trackedRef.current = pathname

    // Fire-and-forget silencioso
    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path: pathname }),
    }).catch(() => { /* silencioso */ })
  }, [pathname])

  return null
}
