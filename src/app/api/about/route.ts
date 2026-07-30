import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prismaClient'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const about = await prisma.aboutPage.findFirst()
    if (!about) {
      return NextResponse.json(null, { status: 404 })
    }
    return NextResponse.json(about)
  } catch (error) {
    console.error('GET /api/about error:', error)
    return NextResponse.json({ error: 'Erro ao buscar dados' }, { status: 500 })
  }
}
