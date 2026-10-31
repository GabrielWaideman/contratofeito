import type { Metadata } from 'next'
import { getAllProperties } from '@/lib/properties'
import { getSiteUrl, SITE_NAME, DEFAULT_OG_IMAGE } from '@/lib/seo'
import ImoveisClient from './ImoveisClient'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Catálogo de Imóveis | Venda e Locação',
  description:
    'Encontre casas, terrenos, chácaras e fazendas em Álvares Florence, Votuporanga e região. Filtre por tipo, cidade, valor e encontre o imóvel ideal.',
  alternates: {
    canonical: `${getSiteUrl()}/imoveis`,
  },
  openGraph: {
    title: 'Catálogo de Imóveis Urbanos e Rurais | Contrato Feito',
    description:
      'Explore as melhores oportunidades em imóveis residenciais, comerciais e rurais em Álvares Florence, Votuporanga e região.',
    url: `${getSiteUrl()}/imoveis`,
    siteName: SITE_NAME,
    locale: 'pt_BR',
    type: 'website',
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'Catálogo de Imóveis Contrato Feito',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Catálogo de Imóveis | Contrato Feito',
    description:
      'Encontre casas, chácaras, terrenos e fazendas em Álvares Florence, Votuporanga e região.',
    images: [DEFAULT_OG_IMAGE],
  },
}

export default async function ImoveisPage({
  searchParams,
}: {
  searchParams?: Record<string, string | string[] | undefined>
}) {
  const properties = await getAllProperties()
  
  return <ImoveisClient initialProperties={properties} initialSearchParams={searchParams} />
}
