import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prismaClient'
import { propertySchema } from '@/lib/validations'
import { getSessionFromRequest } from '@/lib/auth'

export async function GET(request: Request) {
  try {
    // 1. Verificar Autenticação (redundante, pois o middleware já protege, mas é boa prática)
    const session = getSessionFromRequest(request)
    if (!session) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })

    // 2. Buscar imóveis (ordenados por mais recentes)
    const properties = await prisma.property.findMany({
      orderBy: { createdAt: 'desc' },
    })

    // Como as imagens/features estão como String (JSON) no DB, precisamos parsear
    const formattedProperties = properties.map(p => ({
      ...p,
      images: JSON.parse(p.images as string),
      features: JSON.parse(p.features as string),
    }))

    return NextResponse.json(formattedProperties)
  } catch (error) {
    console.error('Fetch properties error:', error)
    return NextResponse.json({ error: 'Erro ao buscar imóveis' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = getSessionFromRequest(request)
    if (!session) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })

    const body = await request.json()

    // Validação Zod — Garante que todos os tipos estão corretos e remove campos extras
    const result = propertySchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { error: 'Dados inválidos', details: result.error.format() },
        { status: 400 }
      )
    }

    const data = result.data

    // Cria no banco via Prisma ORM (Totalmente parametrizado, sem SQL injection)
    const property = await prisma.property.create({
      data: {
        ...data,
        images: JSON.stringify(data.images),
        features: JSON.stringify(data.features),
      },
    })

    return NextResponse.json({ success: true, id: property.id }, { status: 201 })
  } catch (error) {
    console.error('Create property error:', error)
    return NextResponse.json({ error: 'Erro ao criar imóvel' }, { status: 500 })
  }
}
