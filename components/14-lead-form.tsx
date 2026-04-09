"use client"

import { useState } from "react"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { WhatsAppIcon } from "@/components/icons"

interface LeadFormProps {
  variant?: "card" | "inline"
  title?: string
  description?: string
  showLgpd?: boolean
}

function formatWhatsApp(value: string): string {
  const numbers = value.replace(/\D/g, "")
  if (numbers.length <= 2) return numbers
  if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`
  if (numbers.length <= 11) return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`
  return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`
}

function cleanWhatsApp(value: string): string {
  return value.replace(/\D/g, "")
}

export function LeadForm({ 
  variant = "card", 
  title = "Agende seu exame",
  description = "Deixe seu contato e nossa equipe chamará você imediatamente no WhatsApp.",
  showLgpd = true
}: LeadFormProps) {
  const [name, setName] = useState("")
  const [whatsapp, setWhatsapp] = useState("")
  const [consentChecked, setConsentChecked] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<{ name?: string; whatsapp?: string; consent?: string }>({})

  const validateForm = () => {
    const newErrors: { name?: string; whatsapp?: string; consent?: string } = {}
    
    if (!name.trim()) {
      newErrors.name = "Por favor, informe seu nome"
    }
    
    const cleanNumber = cleanWhatsApp(whatsapp)
    if (!cleanNumber) {
      newErrors.whatsapp = "Por favor, informe seu WhatsApp"
    } else if (cleanNumber.length < 10 || cleanNumber.length > 11) {
      newErrors.whatsapp = "WhatsApp inválido"
    }

    if (showLgpd && !consentChecked) {
      newErrors.consent = "Você precisa autorizar o uso dos dados para continuar"
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsSubmitting(true)
    
    // Track lead submit event
    if (typeof window !== "undefined") {
      const win = window as typeof window & { dataLayer?: unknown[] }
      if (win.dataLayer) {
        win.dataLayer.push({ event: "lead_submit" })
      }
    }
    
    // Build WhatsApp message
    const formattedPhone = formatWhatsApp(whatsapp)
    const message = `Olá! Me chamo ${name.trim()}. Quero agendar um exame na RX Digital. Meu WhatsApp é ${formattedPhone}. Pode me ajudar com horários e valores?`
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/5594991608181?text=${encodedMessage}`
    
    // Small delay for UX
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // Track WhatsApp open event
    if (typeof window !== "undefined") {
      const win = window as typeof window & { dataLayer?: unknown[] }
      if (win.dataLayer) {
        win.dataLayer.push({ event: "whatsapp_open" })
      }
    }
    
    // Open WhatsApp
    window.open(whatsappUrl, "_blank")
    
    setIsSubmitting(false)
  }

  const handleWhatsAppChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatWhatsApp(e.target.value)
    setWhatsapp(formatted)
    if (errors.whatsapp) {
      setErrors(prev => ({ ...prev, whatsapp: undefined }))
    }
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
    if (errors.name) {
      setErrors(prev => ({ ...prev, name: undefined }))
    }
  }

  const formContent = (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor={`name-${variant}`} className="text-sm font-medium text-foreground">
          Seu nome completo
        </label>
        <Input
          id={`name-${variant}`}
          type="text"
          placeholder="Digite seu nome"
          value={name}
          onChange={handleNameChange}
          className={`h-12 ${errors.name ? "border-destructive" : ""}`}
          disabled={isSubmitting}
        />
        {errors.name && (
          <p className="text-sm text-destructive">{errors.name}</p>
        )}
      </div>
      
      <div className="space-y-2">
        <label htmlFor={`whatsapp-${variant}`} className="text-sm font-medium text-foreground">
          WhatsApp com DDD
        </label>
        <Input
          id={`whatsapp-${variant}`}
          type="tel"
          placeholder="(99) 99999-9999"
          value={whatsapp}
          onChange={handleWhatsAppChange}
          className={`h-12 ${errors.whatsapp ? "border-destructive" : ""}`}
          disabled={isSubmitting}
          maxLength={16}
        />
        {errors.whatsapp && (
          <p className="text-sm text-destructive">{errors.whatsapp}</p>
        )}
      </div>
      
      <Button
        type="submit"
        variant="whatsapp"
        size="xl"
        className="w-full gap-2 font-semibold [&_svg]:!size-5"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="!size-5 animate-spin" />
            Abrindo WhatsApp...
          </>
        ) : (
          <>
            <WhatsAppIcon />
            Solicitar Atendimento Agora
          </>
        )}
      </Button>
      
      {showLgpd && (
        <div className="space-y-2">
          <div className="flex items-start gap-3 rounded-xl bg-muted/50 px-3 py-2.5">
            <Checkbox
              id={`consent-${variant}`}
              checked={consentChecked}
              onCheckedChange={(checked) => {
                const isChecked = checked === true
                setConsentChecked(isChecked)
                if (isChecked && errors.consent) {
                  setErrors((prev) => ({ ...prev, consent: undefined }))
                }
              }}
              disabled={isSubmitting}
              className="mt-0.5 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
            />
            <label
              htmlFor={`consent-${variant}`}
              className="text-sm leading-relaxed text-muted-foreground cursor-pointer"
            >
              Autorizo o uso dos meus dados para contato, conforme os termos de privacidade.
            </label>
          </div>
          {errors.consent && (
            <p className="text-sm text-destructive">{errors.consent}</p>
          )}
        </div>
      )}
    </form>
  )

  if (variant === "inline") {
    return formContent
  }

  return (
    <Card className="w-full max-w-md shadow-xl border-0 bg-background/95 backdrop-blur">
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-xl font-bold text-foreground">{title}</CardTitle>
        <CardDescription className="text-muted-foreground leading-relaxed">
          Deixe seu contato e nossa equipe chamará você imediatamente no WhatsApp para iniciar o atendimento.
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-8">
        {formContent}
      </CardContent>
    </Card>
  )
}
