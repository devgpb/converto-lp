import type { Metadata } from "next"
import { RegistrationForm } from "@/components/registration-form"

export const metadata: Metadata = {
  title: "Cadastro",
  description: "Crie sua conta no Converto para iniciar o período de teste.",
  alternates: { canonical: "/cadastro" },
  robots: { index: false, follow: false },
}

export default function CadastroPage() {
  return (
    <div className="min-h-screen bg-background">
      <RegistrationForm />
    </div>
  )
}
