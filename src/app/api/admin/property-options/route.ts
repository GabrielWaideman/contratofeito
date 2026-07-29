import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prismaClient'
import { getSessionFromRequest } from '@/lib/auth'
import { z } from 'zod'

const VALID_FIELDS = ['category', 'type', 'purpose'] as const

const createOptionSchema = z.object({
  field: z.enum(VALID_FIELDS),
  label: z.string().min(1).max(100).trim(),
  value: z.string().min(1).max(100).trim(),
})

// POST — Admin: cria uma nova opção de dropdown
export async function POST(request: Request) {
  try {
    const session = getSessionFromRequest(request)
    if (!session) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })

    const body = await request.json()
    const result = createOptionSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json({ error: 'Dados inválidos', details: result.error.format() }, { status: 400 })
    }

    const { field, label, value } = result.data

    const option = await prisma.propertyOption.create({
      data: { field, label, value },
    })

    return NextResponse.json({ success: true, option }, { status: 201 })
  } catch (error: unknown) {
    const prismaError = error as { code?: string }
    if (prismaError?.code === 'P2002') {
      return NextResponse.json({ error: 'Essa opção já existe neste campo.' }, { status: 409 })
    }
    console.error('POST /api/admin/property-options error:', error)
    return NextResponse.json({ error: 'Erro ao criar opção' }, { status: 500 })
  }
}
