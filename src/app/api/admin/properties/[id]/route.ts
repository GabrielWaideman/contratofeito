import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prismaClient'
import { propertySchema } from '@/lib/validations'
import { getSessionFromRequest } from '@/lib/auth'

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = getSessionFromRequest(request)
    if (!session) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })

    const id = Number(params.id)
    if (isNaN(id)) return NextResponse.json({ error: 'ID inválido' }, { status: 400 })

    const property = await prisma.property.findUnique({
      where: { id },
    })

    if (!property) return NextResponse.json({ error: 'Não encontrado' }, { status: 404 })

    const formattedProperty = {
      ...property,
      images: JSON.parse(property.images as string),
      features: JSON.parse(property.features as string),
    }

    return NextResponse.json(formattedProperty)
  } catch (error) {
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = getSessionFromRequest(request)
    if (!session) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })

    const id = Number(params.id)
    if (isNaN(id)) return NextResponse.json({ error: 'ID inválido' }, { status: 400 })

    const body = await request.json()
    const result = propertySchema.safeParse(body)
    
    if (!result.success) {
      return NextResponse.json({ error: 'Dados inválidos', details: result.error.format() }, { status: 400 })
    }

    const data = result.data

    const property = await prisma.property.update({
      where: { id },
      data: {
        ...data,
        images: JSON.stringify(data.images),
        features: JSON.stringify(data.features),
      },
    })

    return NextResponse.json({ success: true, id: property.id })
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao atualizar' }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = getSessionFromRequest(request)
    if (!session) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })

    const id = Number(params.id)
    if (isNaN(id)) return NextResponse.json({ error: 'ID inválido' }, { status: 400 })

    // Hard delete
    await prisma.property.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao excluir' }, { status: 500 })
  }
}
