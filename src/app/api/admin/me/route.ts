import { NextResponse } from 'next/server'
import { getSessionFromRequest } from '@/lib/auth'

export const dynamic = 'force-dynamic'

// GET /api/admin/me — Retorna dados da sessão do usuário logado
export async function GET(request: Request) {
  try {
    const session = getSessionFromRequest(request)
    
    if (!session) {
      return NextResponse.json({ error: 'Não autenticado.' }, { status: 401 })
    }

    return NextResponse.json({
      userId: session.userId,
      username: session.username,
      role: session.role,
    })
  } catch (error) {
    console.error('Me error:', error)
    return NextResponse.json({ error: 'Erro interno.' }, { status: 500 })
  }
}
