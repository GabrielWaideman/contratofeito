import { getAllProperties } from '@/lib/properties'
import ImoveisClient from './ImoveisClient'

export default async function ImoveisPage() {
  const properties = await getAllProperties()
  
  return <ImoveisClient initialProperties={properties} />
}
