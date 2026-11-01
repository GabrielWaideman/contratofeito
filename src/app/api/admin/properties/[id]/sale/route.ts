import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prismaClient'
import { propertySaleSchema } from '@/lib/validations'
import { getSessionFromRequest } from '@/lib/auth'

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = getSessionFromRequest(request)
    if (!session) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })

    const id = Number(params.id)
    if (isNaN(id)) return NextResponse.json({ error: 'ID inválido' }, { status: 400 })

    const body = await request.json()
    const parsed = propertySaleSchema.safeParse(body)
    if (!parsed.success) {
      const firstIssue = parsed.error.issues?.[0]?.message || 'Dados inválidos para registro de venda'
      return NextResponse.json({ error: firstIssue, details: parsed.error.format() }, { status: 400 })
    }

    const existing = await prisma.property.findUnique({ where: { id } })
    if (!existing) return NextResponse.json({ error: 'Imóvel não encontrado' }, { status: 404 })

    const data = parsed.data

    const updated = await prisma.property.update({
      where: { id },
      data: {
        isSold: true,
        soldAt: existing.soldAt ?? new Date(),
        isPublished: false,
        isFeatured: false,
        sellerName: data.sellerName,
        buyerName: data.buyerName,
        saleValue: data.saleValue,
        commissionReceivable: data.commissionReceivable,
        commissionReceived: data.commissionReceived,
        hadExchange: data.hadExchange,
        saleNotes: data.saleNotes,
      },
    })

    return NextResponse.json({
      ...updated,
      price: Number(updated.price),
      saleValue: updated.saleValue !== null ? Number(updated.saleValue) : null,
      commissionReceivable: updated.commissionReceivable !== null ? Number(updated.commissionReceivable) : null,
      commissionReceived: updated.commissionReceived !== null ? Number(updated.commissionReceived) : null,
      images: JSON.parse(updated.images as string),
      features: JSON.parse(updated.features as string),
    })
  } catch (error) {
    console.error('Update property sale error:', error)
    return NextResponse.json({ error: 'Erro ao registrar venda do imóvel' }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = getSessionFromRequest(request)
    if (!session) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })

    const id = Number(params.id)
    if (isNaN(id)) return NextResponse.json({ error: 'ID inválido' }, { status: 400 })

    const updated = await prisma.property.update({
      where: { id },
      data: {
        isSold: false,
        soldAt: null,
        sellerName: null,
        buyerName: null,
        saleValue: null,
        commissionReceivable: null,
        commissionReceived: null,
        hadExchange: false,
        saleNotes: null,
        isPublished: true,
      },
    })

    return NextResponse.json({
      ...updated,
      price: Number(updated.price),
      saleValue: null,
      commissionReceivable: null,
      commissionReceived: null,
      images: JSON.parse(updated.images as string),
      features: JSON.parse(updated.features as string),
    })
  } catch (error) {
    console.error('Remove property sale error:', error)
    return NextResponse.json({ error: 'Erro ao desmarcar venda do imóvel' }, { status: 500 })
  }
}

