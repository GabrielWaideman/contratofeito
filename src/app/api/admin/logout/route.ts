import { NextResponse } from 'next/server'
import { buildClearCookie } from '@/lib/auth'

export async function POST() {
  const response = NextResponse.json({ success: true })
  
  // Limpa o cookie de sessão do admin
  response.cookies.set({
    name: 'cf_admin_token',
    value: '',
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  })
  response.headers.set('Set-Cookie', buildClearCookie())
  
  return response
}
