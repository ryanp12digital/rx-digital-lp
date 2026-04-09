"use client"

import Image from "next/image"
import { MapPin, Star, Cpu, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { WhatsAppIcon } from "@/components/icons"
import { useLeadModal } from "./13-lead-modal"
import heroBackground from "@/public/radiologia-odontologica-maraba.jpg"

const trustBadges = [
  { icon: MapPin, text: "2 unidades em Marabá" },
  { icon: Star, text: "Avaliação 5.0 no Google" },
  { icon: Cpu, text: "Tecnologia Digital" },
  { icon: Clock, text: "Resultados Rápidos" },
]

export function Hero() {
  const { openModal } = useLeadModal()

  return (
    <section className="relative flex min-h-[820px] items-center overflow-hidden pt-20 pb-24 md:pb-20">
      {/* Background Image with Green Overlay */}
      <div className="absolute inset-0 z-0">
        {/* Background image */}
        <Image
          src={heroBackground}
          alt="Profissional em estação de radiologia odontológica da RX Digital em Marabá"
          fill
          className="object-cover"
          priority
        />
        {/* Green overlay with gradient - softer for better legibility */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f3d2e]/90 via-[#1a5240]/85 to-[#2d6a4f]/80" />
        {/* Subtle noise overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` 
          }} 
        />
        {/* Light glow effect */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.08),transparent_60%)]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-[900px] mx-auto text-center">
          {/* Content */}
          <div className="text-white space-y-6 flex flex-col justify-start items-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-balance">
              Radiologia Odontológica em Marabá
            </h1>
            
            <p className="text-lg sm:text-xl text-white/90 leading-relaxed max-w-2xl mx-auto">
              Exames digitais, tomografia (Cone Beam) e documentação ortodôntica com agilidade, tecnologia e atendimento humanizado.
            </p>

            {/* CTA Button */}
            <div className="pt-4">
              <Button
                onClick={openModal}
                variant="whatsapp"
                size="xl"
                className="gap-3 text-lg font-semibold shadow-xl [&_svg]:!size-6"
              >
                <WhatsAppIcon />
                Agendar pelo WhatsApp
              </Button>
            </div>
            
            {/* Trust Badges */}
            <div className="mx-auto w-full max-w-4xl pt-10 xl:max-w-5xl align-middle flex flex-col justify-start items-center">
              <div className="grid w-[900px] max-w-full grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 md:gap-3 lg:gap-4">
                {trustBadges.map((badge) => (
                  <div
                    key={badge.text}
                    className="group rounded-xl border border-white/20 bg-white/10 px-4 py-3.5 backdrop-blur-sm transition-colors duration-200 hover:bg-white/15 sm:px-5 sm:py-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-white/12 ring-1 ring-white/20 transition-colors duration-200 group-hover:bg-white/18 sm:h-11 sm:w-11">
                        <badge.icon className="h-5 w-5 text-white/90" />
                      </div>

                      <span className="min-w-0 text-left text-xs font-medium leading-tight text-white sm:text-sm">
                        {badge.text}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg
          viewBox="0 0 1440 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
          preserveAspectRatio="none"
        >
          <path
            d="M0 100V60C240 20 480 0 720 20C960 40 1200 80 1440 60V100H0Z"
            className="fill-background"
          />
        </svg>
      </div>
    </section>
  )
}
