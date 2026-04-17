"use client"

import { useState, createContext, useContext, useCallback } from "react"
import { useRouter } from "next/navigation"
import { X, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { WhatsAppIcon } from "@/components/icons"

interface LeadModalContextType {
  openModal: () => void
  closeModal: () => void
  isOpen: boolean
}

const LeadModalContext = createContext<LeadModalContextType | null>(null)
const LEAD_API_ENDPOINT = "/api/lead"
const N8N_WEBHOOK_URL = "https://n8n-webhook.axmxa0.easypanel.host/webhook/rx-digital-lp"

export function useLeadModal() {
  const context = useContext(LeadModalContext)
  if (!context) {
    throw new Error("useLeadModal must be used within LeadModalProvider")
  }
  return context
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

export function LeadModalProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState("")
  const [whatsapp, setWhatsapp] = useState("")
  const [consentChecked, setConsentChecked] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<{ name?: string; whatsapp?: string; consent?: string }>({})

  const openModal = useCallback(() => setIsOpen(true), [])
  const closeModal = useCallback(() => {
    setIsOpen(false)
    setName("")
    setWhatsapp("")
    setConsentChecked(true)
    setErrors({})
  }, [])

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

    if (!consentChecked) {
      newErrors.consent = "Você precisa autorizar o uso dos dados para continuar"
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const buildLeadPayload = () => {
    const phone = cleanWhatsApp(whatsapp)
    return {
      name: name.trim(),
      whatsapp: phone,
      whatsappFormatted: formatWhatsApp(phone),
      consentGiven: consentChecked,
      source: "rx-digital-lp",
      variant: "modal",
      pageUrl: typeof window !== "undefined" ? window.location.href : "",
      createdAt: new Date().toISOString(),
    }
  }

  const sendLeadToApi = async (payload: ReturnType<typeof buildLeadPayload>) => {
    const response = await fetch(LEAD_API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      keepalive: true,
    })

    if (!response.ok) {
      throw new Error("Falha no endpoint interno de lead")
    }
  }

  const sendLeadDirectToN8n = async (payload: ReturnType<typeof buildLeadPayload>) => {
    const response = await fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      keepalive: true,
    })

    if (!response.ok) {
      throw new Error("Falha no webhook direto")
    }
  }

  const sendLeadBeacon = (payload: ReturnType<typeof buildLeadPayload>) => {
    if (typeof navigator === "undefined" || !navigator.sendBeacon) {
      return false
    }

    const blob = new Blob([JSON.stringify(payload)], {
      type: "application/json",
    })

    return navigator.sendBeacon(N8N_WEBHOOK_URL, blob)
  }

  const submitLeadWebhook = async () => {
    const payload = buildLeadPayload()

    try {
      await sendLeadToApi(payload)
      return
    } catch (apiError) {
      console.warn("Falha no /api/lead, tentando envio direto:", apiError)
    }

    try {
      await sendLeadDirectToN8n(payload)
      return
    } catch (directError) {
      console.warn("Falha no webhook direto via fetch:", directError)
    }

    const queued = sendLeadBeacon(payload)
    if (!queued) {
      throw new Error("Nenhuma estratégia de envio do lead funcionou")
    }
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
    
    await new Promise(resolve => setTimeout(resolve, 500))

    try {
      await submitLeadWebhook()
    } catch (error) {
      console.error("Erro ao enviar lead para webhook:", error)
    }
    
    // Track redirect event
    if (typeof window !== "undefined") {
      const win = window as typeof window & { dataLayer?: unknown[] }
      if (win.dataLayer) {
        win.dataLayer.push({ event: "lead_redirect_thank_you" })
      }
    }

    setIsSubmitting(false)
    closeModal()
    router.push("/obrigado")
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

  return (
    <LeadModalContext.Provider value={{ openModal, closeModal, isOpen }}>
      {children}
      
      {/* Modal Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-100 flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal()
          }}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          
          {/* Modal */}
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            {/* Close button */}
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              onClick={closeModal}
              className="absolute top-3 right-3 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted"
              aria-label="Fechar"
            >
              <X className="size-5!" strokeWidth={2} />
            </Button>
            
            {/* Content */}
            <div className="p-6 pb-8">
              <div className="text-center mb-6">
                <h2 className="text-xl font-bold text-foreground mb-2">
                  Agende seu exame
                </h2>
                <p className="text-sm text-muted-foreground">
                  Deixe seu contato e nossa equipe chamará você imediatamente no WhatsApp para iniciar o atendimento.
                </p>
              </div>
              
              <form
                id="lead-form-modal"
                className="gtm-lead-form space-y-4"
                data-gtm-form="lead"
                onSubmit={handleSubmit}
              >
                <div className="space-y-2">
                  <label htmlFor="modal-name" className="text-sm font-medium text-foreground">
                    Seu nome completo
                  </label>
                  <Input
                    id="modal-name"
                    type="text"
                    placeholder="Digite seu nome"
                    value={name}
                    onChange={handleNameChange}
                    className={`h-12 ${errors.name ? "border-destructive" : ""}`}
                    disabled={isSubmitting}
                    autoFocus
                  />
                  {errors.name && (
                    <p className="text-sm text-destructive">{errors.name}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="modal-whatsapp" className="text-sm font-medium text-foreground">
                    WhatsApp com DDD
                  </label>
                  <Input
                    id="modal-whatsapp"
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

                <div className="space-y-2">
                  <div className="flex items-start gap-3 rounded-xl bg-muted/50 px-3 py-2.5">
                    <Checkbox
                      id="modal-consent"
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
                      htmlFor="modal-consent"
                      className="cursor-pointer text-sm leading-relaxed text-muted-foreground"
                    >
                      Autorizo o uso dos meus dados para contato, conforme os termos de privacidade.
                    </label>
                  </div>
                  {errors.consent && (
                    <p className="text-sm text-destructive">{errors.consent}</p>
                  )}
                </div>
                
                <Button
                  type="submit"
                  variant="whatsapp"
                  size="xl"
                  className="w-full gap-2 font-semibold [&_svg]:size-5!"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="size-5! animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <WhatsAppIcon />
                      Solicitar Atendimento Agora
                    </>
                  )}
                </Button>
                
              </form>
            </div>
          </div>
        </div>
      )}
    </LeadModalContext.Provider>
  )
}
