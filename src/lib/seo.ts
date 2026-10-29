import type { Metadata } from 'next'
import type { Property } from '@/lib/properties'

export function getSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, '')
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL.replace(/\/$/, '')}`
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL.replace(/\/$/, '')}`
  }
  return 'https://contratofeito.com.br'
}

export const SITE_NAME = 'Contrato Feito - Imobiliária Digital'
export const DEFAULT_TITLE = 'Contrato Feito | Imobiliária Digital em Álvares Florence e Região'
export const DEFAULT_DESCRIPTION =
  'Especialistas na compra, venda e locação de imóveis urbanos e rurais em Álvares Florence, Votuporanga e região. Encontre casas de alto padrão, terrenos, chácaras e fazendas com assessoria completa.'
export const DEFAULT_OG_IMAGE = '/og-image.jpg'

export function toAbsoluteUrl(url?: string | null): string {
  if (!url) return `${getSiteUrl()}${DEFAULT_OG_IMAGE}`
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url
  }
  const cleanPath = url.startsWith('/') ? url : `/${url}`
  return `${getSiteUrl()}${cleanPath}`
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0,
  }).format(value)
}

export function formatPropertyDescription(property: Property): string {
  const parts: string[] = []

  const formattedPrice = formatCurrency(property.price)
  parts.push(formattedPrice)

  const location = [property.neighborhood, property.city, property.state]
    .filter(Boolean)
    .join(', ')
  if (location) {
    parts.push(`em ${location}`)
  }

  const specs: string[] = []
  if (property.bedrooms) {
    specs.push(`${property.bedrooms} ${property.bedrooms === 1 ? 'quarto' : 'quartos'}`)
  }
  if (property.suites) {
    specs.push(`${property.suites} ${property.suites === 1 ? 'suíte' : 'suítes'}`)
  }
  if (property.bathrooms) {
    specs.push(`${property.bathrooms} banh.`)
  }
  if (property.garageSpots) {
    specs.push(`${property.garageSpots} ${property.garageSpots === 1 ? 'vaga' : 'vagas'}`)
  }
  if (property.area) {
    specs.push(`${property.area} ${property.areaUnit || 'm²'}`)
  }

  if (specs.length > 0) {
    parts.push(`(${specs.join(' • ')})`)
  }

  if (property.features && property.features.length > 0) {
    const highlights = property.features.slice(0, 3).join(', ')
    parts.push(`Destaques: ${highlights}`)
  }

  parts.push('Confira fotos e detalhes na Contrato Feito.')

  return parts.join(' • ')
}

export function buildPropertyMetadata(property: Property): Metadata {
  const siteUrl = getSiteUrl()
  const pageUrl = `${siteUrl}/imoveis/${property.id}`
  const formattedPrice = formatCurrency(property.price)
  const title = `${property.title} | ${formattedPrice}`
  const description = formatPropertyDescription(property)

  const chosenImage = property.imageUrl || property.images?.[0] || DEFAULT_OG_IMAGE
  const absoluteImageUrl = toAbsoluteUrl(chosenImage)

  return {
    title,
    description,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: `${property.title} - ${formattedPrice} | Contrato Feito`,
      description,
      url: pageUrl,
      siteName: SITE_NAME,
      locale: 'pt_BR',
      type: 'article',
      images: [
        {
          url: absoluteImageUrl,
          width: 1200,
          height: 630,
          alt: property.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${property.title} - ${formattedPrice}`,
      description,
      images: [absoluteImageUrl],
    },
  }
}
