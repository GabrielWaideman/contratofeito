'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

const VISITOR_KEY = 'cf_visitor_id'

/** ID anônimo e aleatório por navegador (não contém dados pessoais). */
function getVisitorId(): string | null {
  try {
    let id = localStorage.getItem(VISITOR_KEY)
    if (!id || id.length < 16) {
      id =
        typeof crypto !== 'undefined' && 'randomUUID' in crypto
          ? crypto.randomUUID()
          : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}-${Math.random().toString(36).slice(2)}`
      localStorage.setItem(VISITOR_KEY, id)
    }
    return id
  } catch {
    // localStorage indisponível (modo privado restrito etc.)
    return null
  }
}

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

    const visitorId = getVisitorId()
    if (!visitorId) return

    // Fire-and-forget silencioso
    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path: pathname, visitorId }),
      keepalive: true,
    }).catch(() => { /* silencioso */ })
  }, [pathname])

  return null
}
