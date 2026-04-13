import { Header } from "@/components/01-header"
import { Hero } from "@/components/02-hero"
import { Services } from "@/components/03-services"
import { FeedCarousel } from "@/components/04-feed-carousel"
import { WhyRxDigital } from "@/components/05-why-rx-digital"
import { Reviews } from "@/components/06-reviews"
import { About } from "@/components/07-about"
import { Units } from "@/components/08-units"
import { FAQ } from "@/components/09-faq"
import { FinalCTA } from "@/components/10-final-cta"
import { Footer } from "@/components/11-footer"
import { FloatingWhatsApp } from "@/components/12-floating-whatsapp"
import { PartnerSupport } from "@/components/17-partner-support"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Services />
      <PartnerSupport />
      <FeedCarousel />
      <WhyRxDigital />
      <Reviews />
      <About />
      <Units />
      <PartnerSupport />
      <FAQ />
      <FinalCTA />
      <Footer />
      <FloatingWhatsApp />
    </main>
  )
}
