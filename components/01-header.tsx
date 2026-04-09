"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { WhatsAppIcon } from "@/components/icons"
import { useLeadModal } from "./13-lead-modal"
import { cn } from "@/lib/utils"
import { isWithinBusinessHours } from "@/lib/business-hours"

const navLinks = [
  { href: "#servicos", label: "Serviços" },
  { href: "#unidades", label: "Unidades" },
  { href: "#dra-jessica", label: "Dra. Jéssica" },
  { href: "#faq", label: "FAQ" },
]

const WHATSAPP_LINK = "https://wa.me/5594991608181?text=Ol%C3%A1!%20Gostaria%20de%20agendar%20um%20exame%20na%20RX%20Digital."
const PHONE_LINK = "tel:+5594991608181"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [showCallNowButton, setShowCallNowButton] = useState(false)
  const { openModal } = useLeadModal()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const updateCallButtonVisibility = () => {
      setShowCallNowButton(isWithinBusinessHours())
    }

    updateCallButtonVisibility()
    const intervalId = window.setInterval(updateCallButtonVisibility, 60_000)

    return () => window.clearInterval(intervalId)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src={isScrolled 
                ? "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/rx-digital-escuro-fundo-transparente-UjnXFG9TyQcIed13I6ojYt6Ue4oTTl.png"
                : "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/rx-digital-branca-fundo-transparente-Ry0EQzmB8xDsCkmq3MLCWXxFWVu2Ux.png"
              }
              alt="RX Digital - Radiologia Odontológica"
              width={140}
              height={45}
              className="h-8 md:h-10 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-accent ${
                  isScrolled ? "text-foreground" : "text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            {showCallNowButton ? (
              <Button
                asChild
                variant="ghost"
                className={cn(
                  "gap-2 rounded-full border shadow-none active:scale-100",
                  isScrolled
                    ? "border-border/80 text-foreground hover:bg-muted/60"
                    : "border-white/35 text-white hover:bg-white/12",
                )}
              >
                <a href={PHONE_LINK}>Ligar agora - (94) 99160-8181</a>
              </Button>
            ) : null}
            <Button
              variant={isScrolled ? "whatsappOutline" : "whatsappOnDark"}
              onClick={openModal}
              className="gap-2"
            >
              <WhatsAppIcon className="!size-[1.1rem]" />
              WhatsApp
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button
                variant="ghost"
                size="icon"
                className={isScrolled ? "text-foreground" : "text-white"}
              >
                <Menu className="w-6 h-6" />
                <span className="sr-only">Abrir menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[350px]">
              <SheetTitle className="sr-only">Menu de navegação</SheetTitle>
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-8">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/rx-digital-escuro-fundo-transparente-UjnXFG9TyQcIed13I6ojYt6Ue4oTTl.png"
                    alt="RX Digital"
                    width={120}
                    height={40}
                    className="h-8 w-auto"
                  />
                </div>
                <nav className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="text-lg font-medium text-foreground hover:text-accent transition-colors py-2"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
                <div className="mt-auto pt-8 space-y-3">
                  {showCallNowButton ? (
                    <Button
                      asChild
                      variant="outline"
                      className="w-full rounded-full border-2"
                    >
                      <a href={PHONE_LINK}>Ligar agora - (94) 99160-8181</a>
                    </Button>
                  ) : null}
                  <Button
                    onClick={() => {
                      setIsOpen(false)
                      openModal()
                    }}
                    variant="whatsappOutline"
                    className="w-full gap-2"
                  >
                    <WhatsAppIcon className="!size-5" />
                    WhatsApp
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
