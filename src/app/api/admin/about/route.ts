import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prismaClient'
import { getSessionFromRequest } from '@/lib/auth'

export const dynamic = 'force-dynamic'

// GET — Admin: retorna os dados atuais da Página Sobre
export async function GET(request: Request) {
  try {
    const session = getSessionFromRequest(request)
    if (!session) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })

    const about = await prisma.aboutPage.findFirst()
    return NextResponse.json(about ?? null)
  } catch (error) {
    console.error('GET /api/admin/about error:', error)
    return NextResponse.json({ error: 'Erro ao buscar dados' }, { status: 500 })
  }
}

// PUT — Admin: cria ou atualiza os dados da Página Sobre (upsert)
export async function PUT(request: Request) {
  try {
    const session = getSessionFromRequest(request)
    if (!session) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })

    const body = await request.json()

    const {
      heroTitle,
      heroSubtitle,
      bannerImageUrl,
      historyText,
      historyImageUrl,
      missionText,
      visionText,
      valuesText,
      cityName,
      cityText,
      cityImageUrl,
      agentName,
      agentCreci,
      agentPhone,
      agentWhatsapp,
      agentImageUrl,
      agentBio,
    } = body

    // Validações básicas
    if (!heroTitle || !heroSubtitle || !historyText || !missionText || !visionText || !valuesText || !cityName || !cityText || !agentName || !agentCreci || !agentPhone || !agentWhatsapp) {
      return NextResponse.json({ error: 'Campos obrigatórios ausentes.' }, { status: 400 })
    }

    const existing = await prisma.aboutPage.findFirst()

    let result
    if (existing) {
      result = await prisma.aboutPage.update({
        where: { id: existing.id },
        data: {
          heroTitle,
          heroSubtitle,
          bannerImageUrl: bannerImageUrl || null,
          historyText,
          historyImageUrl: historyImageUrl || null,
          missionText,
          visionText,
          valuesText,
          cityName,
          cityText,
          cityImageUrl: cityImageUrl || null,
          agentName,
          agentCreci,
          agentPhone,
          agentWhatsapp,
          agentImageUrl: agentImageUrl || null,
          agentBio: agentBio || null,
        },
      })
    } else {
      result = await prisma.aboutPage.create({
        data: {
          heroTitle,
          heroSubtitle,
          bannerImageUrl: bannerImageUrl || null,
          historyText,
          historyImageUrl: historyImageUrl || null,
          missionText,
          visionText,
          valuesText,
          cityName,
          cityText,
          cityImageUrl: cityImageUrl || null,
          agentName,
          agentCreci,
          agentPhone,
          agentWhatsapp,
          agentImageUrl: agentImageUrl || null,
          agentBio: agentBio || null,
        },
      })
    }

    return NextResponse.json({ success: true, data: result })
  } catch (error) {
    console.error('PUT /api/admin/about error:', error)
    return NextResponse.json({ error: 'Erro ao salvar dados' }, { status: 500 })
  }
}
