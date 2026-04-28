"use client"

import { useEffect, useState } from "react"
import { WhatsAppIcon } from "@/components/icons"
import { Button } from "@/components/ui/button"

const WHATSAPP_URL = "https://wa.me/5594991608181"

export default function ObrigadoPage() {
  const [secondsLeft, setSecondsLeft] = useState(2)

  useEffect(() => {
    const win = window as typeof window & { dataLayer?: unknown[] }
    win.dataLayer?.push({ event: "lead_redirect_thank_you" })

    const intervalId = window.setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)

    const timeoutId = window.setTimeout(() => {
      window.location.href = WHATSAPP_URL
    }, 2000)

    return () => {
      window.clearInterval(intervalId)
      window.clearTimeout(timeoutId)
    }
  }, [])

  return (
    <main className="min-h-screen bg-background px-4">
      <section className="mx-auto flex min-h-screen w-full max-w-2xl items-center justify-center">
        <div className="w-full rounded-2xl border border-border bg-card p-8 text-center shadow-sm sm:p-10">
          <div className="mb-5 inline-flex items-center justify-center rounded-full bg-[#25D366]/15 p-4 text-[#25D366]">
            <WhatsAppIcon className="size-8!" />
          </div>

          <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
            Obrigado pelo seu contato!
          </h1>

          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Em instantes vamos abrir o WhatsApp para você continuar seu atendimento com nossa equipe.
          </p>

          <p className="mt-6 text-lg font-semibold text-foreground">
            Redirecionando em{" "}
            <span className="inline-flex min-w-10 items-center justify-center rounded-full bg-primary/10 px-3 py-1 text-primary">
              {secondsLeft}
            </span>{" "}
            segundo{secondsLeft === 1 ? "" : "s"}...
          </p>

          <Button
            variant="whatsapp"
            size="xl"
            className="mt-8 w-full gap-2 font-semibold sm:w-auto"
            onClick={() => {
              window.location.href = WHATSAPP_URL
            }}
          >
            <WhatsAppIcon />
            Ir para o WhatsApp agora
          </Button>
        </div>
      </section>
    </main>
  )
}
