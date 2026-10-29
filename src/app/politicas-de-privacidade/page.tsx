import type { Metadata } from 'next'
import { getSiteUrl, SITE_NAME, DEFAULT_OG_IMAGE } from '@/lib/seo'
import PoliticasClient from './PoliticasClient'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Políticas de Uso e Privacidade | Contrato Feito',
  description:
    'Conheça as Políticas de Uso e Privacidade da Contrato Feito Negócios Imobiliários. Regras de navegação, segurança digital e tratamento responsável de dados pessoais (LGPD).',
  alternates: {
    canonical: `${getSiteUrl()}/politicas-de-privacidade`,
  },
  openGraph: {
    title: 'Políticas de Uso e Privacidade | Contrato Feito',
    description:
      'Termos de uso, segurança, cookies e tratamento de dados pessoais conforme a LGPD e Marco Civil da Internet na Contrato Feito.',
    url: `${getSiteUrl()}/politicas-de-privacidade`,
    siteName: SITE_NAME,
    locale: 'pt_BR',
    type: 'website',
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'Políticas de Uso e Privacidade - Contrato Feito Imobiliária',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Políticas de Uso e Privacidade | Contrato Feito',
    description:
      'Termos de uso, segurança e política de privacidade conforme a LGPD na Contrato Feito.',
    images: [DEFAULT_OG_IMAGE],
  },
}

export default function PoliticasPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Políticas de Uso e Privacidade – Contrato Feito Negócios Imobiliários',
    description:
      'Termos de uso do site e política de privacidade em conformidade com a Lei Geral de Proteção de Dados (LGPD) e o Marco Civil da Internet.',
    url: `${getSiteUrl()}/politicas-de-privacidade`,
    publisher: {
      '@type': 'RealEstateAgent',
      name: 'Contrato Feito Negócios Imobiliários',
      url: getSiteUrl(),
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'R. Deputado Castro de Carvalho, 207',
        addressLocality: 'Álvares Florence',
        addressRegion: 'SP',
        addressCountry: 'BR',
      },
      telephone: '+5517997225062',
      email: 'emersonantoniodemendonca@yahoo.com.br',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PoliticasClient />
    </>
  )
}

