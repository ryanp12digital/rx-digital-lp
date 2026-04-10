import { Header } from "@/components/01-header"
import { Hero } from "@/components/02-hero"
import { Services } from "@/components/03-services"
import { TomographySpotlight } from "@/components/04-tomography-spotlight"
import { WhyRxDigital } from "@/components/05-why-rx-digital"
import { Reviews } from "@/components/06-reviews"
import { FeedCarousel } from "@/components/06b-feed-carousel"
import { About } from "@/components/07-about"
import { Units } from "@/components/08-units"
import { FAQ } from "@/components/09-faq"
import { FinalCTA } from "@/components/10-final-cta"
import { Footer } from "@/components/11-footer"
import { FloatingWhatsApp } from "@/components/12-floating-whatsapp"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Services />
      <TomographySpotlight />
      <WhyRxDigital />
      <Reviews />
      <FeedCarousel />
      <About />
      <Units />
      <FAQ />
      <FinalCTA />
      <Footer />
      <FloatingWhatsApp />
    </main>
  )
}
