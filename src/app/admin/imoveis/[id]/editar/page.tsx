'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import PropertyForm from '@/components/admin/PropertyForm'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function EditPropertyPage({ params }: { params: { id: string } }) {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/admin/properties/${params.id}`)
      .then(res => res.json())
      .then(resData => {
        setData(resData)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [params.id])

  if (loading) return <div>Carregando...</div>
  if (!data) return <div>Imóvel não encontrado.</div>

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Link href="/admin/imoveis" className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:text-brand-600 hover:border-brand-200 transition-colors shadow-sm">
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Editar Imóvel</h1>
          <p className="text-gray-500 mt-1">Cód. #{String(data.id).padStart(4, '0')}</p>
        </div>
      </div>

      <PropertyForm initialData={data} />
    </div>
  )
}
