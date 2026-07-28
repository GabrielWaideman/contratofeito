import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
// O middleware atua como uma primeira barreira (Edge Runtime).
// Ele verifica a existência do cookie para barrar acessos comuns e injeta cabeçalhos de segurança.
// A validação criptográfica real do JWT é feita de forma "blindada" nos Server Components (ex: layout do admin)
// e nas rotas da API, prevenindo vazamentos do frontend (Layout Leak).

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Clonar headers para injetar o pathname para que Server Components possam lê-lo
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-pathname', pathname)

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
  
  // Headers de segurança
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')

  // Proteção da rota /admin/*
  if (pathname.startsWith('/admin')) {
    // Ignorar a rota de login e APIs públicas de admin
    if (
      pathname === '/admin/login' || 
      pathname.startsWith('/api/admin/login') ||
      pathname.startsWith('/api/admin/logout') ||
      pathname.startsWith('/api/admin/seed')
    ) {
      return response
    }

    const token = request.cookies.get('cf_admin_token')?.value

    if (!token) {
      // Se não tem cookie, redireciona para login rapidamente
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
    
    // Cookie presente. Passa a requisição adiante. 
    // O Server Component (layout.tsx) vai validar a assinatura criptográfica do JWT.
  }

  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
