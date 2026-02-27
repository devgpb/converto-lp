import { ConfirmationPage } from "@/components/confirmation-page"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Confirmação de Assinatura",
  description: "Assinatura confirmada no Converto.",
  alternates: { canonical: "/confirmacao" },
  robots: { index: false, follow: false },
}

export default function Confirmacao() {
  return (
    <div className="min-h-screen bg-background">
      <ConfirmationPage />
    </div>
  )
}
