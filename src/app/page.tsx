import Header from '@/components/Header'
import Hero from '@/components/Hero'
import FilterBar from '@/components/FilterBar'
import PropertySection from '@/components/PropertySection'
import AboutSection from '@/components/AboutSection'
import Testimonials from '@/components/Testimonials'
import Footer from '@/components/Footer'

export const dynamic = 'force-dynamic'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col w-full max-w-[100vw] overflow-x-hidden">
      <Header />
      <Hero />
      <PropertySection />
      <AboutSection />
      <Testimonials />
      <Footer />
    </main>
  );
}
