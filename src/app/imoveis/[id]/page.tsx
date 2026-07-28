import { notFound } from 'next/navigation'
import { getPropertyById, getSuggestedProperties } from '@/lib/properties'
import PropertyClient from './PropertyClient'

export const dynamic = 'force-dynamic'

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
