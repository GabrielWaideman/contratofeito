import type { Metadata } from 'next'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import PropertySection from '@/components/PropertySection'
import AboutSection from '@/components/AboutSection'
import Testimonials from '@/components/Testimonials'
import Footer from '@/components/Footer'
import { getAllProperties } from '@/lib/properties'
import { getSiteUrl, SITE_NAME, DEFAULT_TITLE, DEFAULT_DESCRIPTION, DEFAULT_OG_IMAGE } from '@/lib/seo'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: DEFAULT_TITLE,
  description: DEFAULT_DESCRIPTION,
  alternates: {
    canonical: getSiteUrl(),
  },
  openGraph: {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    url: getSiteUrl(),
    siteName: SITE_NAME,
    locale: 'pt_BR',
    type: 'website',
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'Contrato Feito - Imobiliária Digital em Álvares Florence e Região',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
}

export default async function Home() {
  const properties = await getAllProperties()

  return (
    <main className="min-h-screen flex flex-col w-full max-w-[100vw] overflow-x-hidden">
      <Header />
      <Hero properties={properties} />
      <PropertySection properties={properties} />
      <AboutSection />
      <Testimonials />
      <Footer />
    </main>
  );
}
