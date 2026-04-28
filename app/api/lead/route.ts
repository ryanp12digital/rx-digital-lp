import { NextResponse } from "next/server"

const WEBHOOK_URLS = [
  "https://n8n-webhook.axmxa0.easypanel.host/webhook/rx-digital-lp",
  "https://python-auto-relatorio-trafego.axmxa0.easypanel.host/meta-new-lead",
]

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const responses = await Promise.allSettled(
      WEBHOOK_URLS.map((url) =>
        fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
          cache: "no-store",
        }),
      ),
    )

    const hasSuccess = responses.some(
      (result) => result.status === "fulfilled" && result.value.ok,
    )

    if (!hasSuccess) {
      return NextResponse.json(
        { ok: false, error: "Nenhum webhook respondeu com sucesso" },
        { status: 502 },
      )
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("Erro no endpoint de lead:", error)
    return NextResponse.json(
      { ok: false, error: "Falha ao processar lead" },
      { status: 500 },
    )
  }
}
