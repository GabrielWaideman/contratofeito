'use client'

import PropertyForm from '@/components/admin/PropertyForm'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function NewPropertyPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Link href="/admin/imoveis" className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:text-brand-600 hover:border-brand-200 transition-colors shadow-sm">
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Novo Imóvel</h1>
          <p className="text-gray-500 mt-1">Preencha os dados para adicionar ao catálogo.</p>
        </div>
      </div>

      <PropertyForm />
    </div>
  )
}
