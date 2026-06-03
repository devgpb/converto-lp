"use client"

import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { trackHomeEventOnce } from "@/lib/lp-tracking"

export function PricingPlansCtaButton() {
  const router = useRouter()

  const handleGetStarted = () => {
    // Trial de 7 dias com cobrança iniciando após confirmação do cliente.
    trackHomeEventOnce(
      {
        eventName: "cta_click",
        section: "precos",
        ctaId: "pricing_comecar_agora",
        metadata: { destination_path: "/cadastro" },
      },
      "cta:pricing_comecar_agora"
    )
    router.push("/cadastro")
  }

  return (
    <Button
      onClick={handleGetStarted}
      size="lg"
      className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg font-semibold"
    >
      Começar agora - Grátis por 7 dias
    </Button>
  )
}
