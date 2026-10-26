import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prismaClient'

export const dynamic = 'force-dynamic'

// ─── Opções padrão (sempre presentes) ────────────────
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

const onlineOptions = {
  category: [
    { label: "Venda", value: "Venda", isDefault: true },
    { label: "Locação", value: "Locação", isDefault: true },
    { id: 14, label: "Permuta", value: "Permuta", isDefault: false },
    { id: 15, label: "Financiar", value: "Financiar", isDefault: false }
  ],
  type: [
    { label: "Urbano", value: "URBANO", isDefault: true },
    { label: "Rural", value: "RURAL", isDefault: true },
    { id: 1, label: "Fazenda", value: "Fazenda", isDefault: false },
    { id: 2, label: "Apartamento", value: "Apartamento", isDefault: false },
    { id: 3, label: "Casa", value: "Casa", isDefault: false },
    { id: 4, label: "Alto Padrão", value: "Alto Padrão", isDefault: false },
    { id: 5, label: "Casa com Edícula", value: "Casa com Edícula", isDefault: false },
    { id: 6, label: "Casa em Condomínio", value: "Casa em Condomínio", isDefault: false },
    { id: 7, label: "Chácara", value: "Chácara", isDefault: false },
    { id: 8, label: "Kitnet", value: "Kitnet", isDefault: false },
    { id: 9, label: "Loteamento", value: "Loteamento", isDefault: false },
    { id: 10, label: "Sala Comercial", value: "Sala Comercial", isDefault: false },
    { id: 11, label: "Sítio", value: "Sítio", isDefault: false },
    { id: 12, label: "Sobrado", value: "Sobrado", isDefault: false },
    { id: 13, label: "Terreno", value: "Terreno", isDefault: false }
  ],
  purpose: [
    { label: "Residencial", value: "Residencial", isDefault: true },
    { label: "Comercial", value: "Comercial", isDefault: true },
    { label: "Rural", value: "Rural", isDefault: true },
    { id: 16, label: "Industrial", value: "Industrial", isDefault: false }
  ]
}

// GET — Público: retorna todas as opções (padrão + customizadas) por campo
export async function GET() {
  try {
    const customOptions = await prisma.propertyOption.findMany({
      orderBy: { createdAt: 'asc' },
    })

    if (customOptions.length === 0) {
      return NextResponse.json(onlineOptions)
    }

    const result: Record<string, { id?: number; label: string; value: string; isDefault: boolean }[]> = {}

    for (const field of Object.keys(DEFAULTS)) {
      const defaults = DEFAULTS[field].map(o => ({ ...o, isDefault: true }))
      const custom   = customOptions
        .filter(o => o.field === field)
        .map(o => ({ id: o.id, label: o.label, value: o.value, isDefault: false }))

      const defaultValues = new Set(defaults.map(d => d.value))
      const merged = [...defaults, ...custom.filter(c => !defaultValues.has(c.value))]
      result[field] = merged
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error('GET /api/property-options DB error, using online synchronized options:', error)
    return NextResponse.json(onlineOptions)
  }
}
