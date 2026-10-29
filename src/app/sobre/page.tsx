import type { Metadata } from 'next'
import { getSiteUrl, SITE_NAME, DEFAULT_OG_IMAGE } from '@/lib/seo'
import SobreClient from './SobreClient'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Sobre a Contrato Feito | Nossa História e Missão',
  description:
    'Conheça a Contrato Feito: história, valores, compromisso ético e atuação no mercado imobiliário urbano e rural de Álvares Florence e região.',
  alternates: {
    canonical: `${getSiteUrl()}/sobre`,
  },
  openGraph: {
    title: 'Sobre a Contrato Feito | Nossa História e Missão',
    description:
      'Conheça nossa trajetória, ética e dedicação aos clientes em Álvares Florence, Votuporanga e toda a região noroeste paulista.',
    url: `${getSiteUrl()}/sobre`,
    siteName: SITE_NAME,
    locale: 'pt_BR',
    type: 'website',
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'Sobre a Contrato Feito - Imobiliária Digital',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sobre a Contrato Feito | Nossa História e Missão',
    description:
      'Conheça nossa trajetória, ética e dedicação aos clientes em Álvares Florence, Votuporanga e região.',
    images: [DEFAULT_OG_IMAGE],
  },
}

export default function SobrePage() {
  return <SobreClient />
}
