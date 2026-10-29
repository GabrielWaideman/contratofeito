import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPropertyById, getSuggestedProperties } from '@/lib/properties'
import { buildPropertyMetadata } from '@/lib/seo'
import PropertyClient from './PropertyClient'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const propertyId = Number(params.id)
  if (isNaN(propertyId)) {
    return {
      title: 'Imóvel não encontrado',
    }
  }

  const property = await getPropertyById(propertyId)
  if (!property) {
    return {
      title: 'Imóvel não encontrado',
      description: 'O imóvel solicitado não foi encontrado em nosso catálogo.',
    }
  }

  return buildPropertyMetadata(property)
}

export default async function PropertyPage({ params }: { params: { id: string } }) {
  const propertyId = Number(params.id)
  
  if (isNaN(propertyId)) {
    notFound()
  }

  const property = await getPropertyById(propertyId)

  if (!property) {
    notFound()
  }

  const suggestions = await getSuggestedProperties(propertyId, 6)

  return <PropertyClient property={property} suggestions={suggestions} />
}
