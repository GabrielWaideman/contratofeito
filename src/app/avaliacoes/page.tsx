import type { Metadata } from 'next'
import { getSiteUrl, SITE_NAME, DEFAULT_OG_IMAGE } from '@/lib/seo'
import AvaliacoesClient from './AvaliacoesClient'

export const metadata: Metadata = {
  title: 'Solicitação de Avaliação Imobiliária | Contrato Feito',
  description:
    'Avalie seu imóvel urbano ou rural com precisão e segurança em Álvares Florence, Votuporanga e região. Avaliação mercadológica simples ou completa com Parecer Técnico (PTAM).',
  alternates: {
    canonical: `${getSiteUrl()}/avaliacoes`,
  },
  openGraph: {
    title: 'Avalie seu Imóvel com Precisão e Segurança | Contrato Feito',
    description:
      'Escolha a modalidade ideal para a sua necessidade e receba um atendimento especializado diretamente no seu WhatsApp.',
    url: `${getSiteUrl()}/avaliacoes`,
    siteName: SITE_NAME,
    locale: 'pt_BR',
    type: 'website',
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'Avaliação Imobiliária - Contrato Feito',
      },
    ],
  },
}

export default function AvaliacoesPage() {
  return <AvaliacoesClient />
}

