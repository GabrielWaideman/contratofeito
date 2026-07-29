import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prismaClient'

// ─── Opções padrão (sempre presentes, não podem ser excluídas) ────────────────
const DEFAULTS: Record<string, { label: string; value: string }[]> = {
  category: [
    { label: 'Venda',   value: 'Venda'   },
    { label: 'Locação', value: 'Locação' },
  ],
  type: [
    { label: 'Urbano', value: 'URBANO' },
    { label: 'Rural',  value: 'RURAL'  },
  ],
  purpose: [
    { label: 'Residencial', value: 'Residencial' },
    { label: 'Comercial',   value: 'Comercial'   },
    { label: 'Rural',       value: 'Rural'        },
  ],
}

// GET — Público: retorna todas as opções (padrão + customizadas) por campo
export async function GET() {
  try {
    const customOptions = await prisma.propertyOption.findMany({
      orderBy: { createdAt: 'asc' },
    })

    const result: Record<string, { id?: number; label: string; value: string; isDefault: boolean }[]> = {}

    for (const field of Object.keys(DEFAULTS)) {
      const defaults = DEFAULTS[field].map(o => ({ ...o, isDefault: true }))
      const custom   = customOptions
        .filter(o => o.field === field)
        .map(o => ({ id: o.id, label: o.label, value: o.value, isDefault: false }))

      // Evita duplicatas (caso alguém cadastre um valor igual ao padrão)
      const defaultValues = new Set(defaults.map(d => d.value))
      const merged = [...defaults, ...custom.filter(c => !defaultValues.has(c.value))]
      result[field] = merged
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error('GET /api/property-options error:', error)
    return NextResponse.json({ error: 'Erro ao buscar opções' }, { status: 500 })
  }
}
