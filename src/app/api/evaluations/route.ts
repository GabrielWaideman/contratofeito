import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prismaClient'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const name = String(body.name || '').trim()
    const phone = String(body.phone || '').trim()
    const city = String(body.city || '').trim()
    const neighborhood = String(body.neighborhood || '').trim()
    const address = String(body.address || '').trim()

    if (!name || !phone || !city || !neighborhood || !address) {
      return NextResponse.json(
        { error: 'Campos obrigatórios ausentes.' },
        { status: 400 }
      )
    }

    const created = await prisma.evaluationRequest.create({
      data: {
        modality: String(body.modality || 'Simples (Mercadológica)').slice(0, 60),
        name: name.slice(0, 150),
        phone: phone.slice(0, 30),
        relation: String(body.relation || 'Proprietário').slice(0, 60),
        purpose: String(body.purpose || 'Venda').slice(0, 80),
        category: String(body.category || 'Urbano - Casa').slice(0, 80),
        city: city.slice(0, 100),
        neighborhood: neighborhood.slice(0, 100),
        address: address.slice(0, 255),
        totalArea: body.totalArea ? String(body.totalArea).slice(0, 60) : null,
        builtArea: body.builtArea ? String(body.builtArea).slice(0, 60) : null,
        bedrooms: body.bedrooms ? String(body.bedrooms).slice(0, 20) : null,
        bathrooms: body.bathrooms ? String(body.bathrooms).slice(0, 20) : null,
        garageSpots: body.garageSpots ? String(body.garageSpots).slice(0, 20) : null,
        conservation: String(body.conservation || 'Ótimo estado').slice(0, 80),
        documentStatus: body.documentStatus ? String(body.documentStatus).slice(0, 120) : null,
        needsPtam: body.needsPtam ? String(body.needsPtam).slice(0, 40) : null,
        notes: body.notes ? String(body.notes) : null,
        formattedMessage: String(body.formattedMessage || ''),
      },
    })

    return NextResponse.json({ success: true, id: created.id }, { status: 201 })
  } catch (error) {
    console.error('Create evaluation request error:', error)
    return NextResponse.json(
      { error: 'Erro ao registrar solicitação de avaliação.' },
      { status: 500 }
    )
  }
}

