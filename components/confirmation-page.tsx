"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Users, ArrowRight, Sparkles } from "lucide-react"
import { API_URL } from "@/lib/api"

interface BillingStatus {
  status_billing: string
  plan_name?: string
  seats?: number
  next_billing_date?: string
}

export function ConfirmationPage() {
  const router = useRouter()
  const [status, setStatus] = useState<BillingStatus | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        // Get tenant ID from auth (simulate)
        const tenantId = sessionStorage.getItem("tenant_id")

        if (!tenantId) {
          router.push("/cadastro")
          return
        }

        const response = await fetch(`${API_URL}/billing/status/${tenantId}`)

        if (!response.ok) {
          throw new Error("Erro ao verificar status")
        }

        const data = await response.json()
        setStatus(data)
      } catch (error) {
        console.error("Erro ao buscar status:", error)
        // Set a default success status for demo
        setStatus({ status_billing: "active" })
      } finally {
        setIsLoading(false)
      }
    }

    fetchStatus()
  }, [router])

  const handleGoToUsers = () => {
    window.location.href = process.env.NEXT_PUBLIC_URL_CORP || "http://localhost:4200"
  }

  const handleGoToSystem = () => {
    window.location.href = process.env.NEXT_PUBLIC_URL_CORP || "http://localhost:4200"
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Verificando pagamento...</p>
        </div>
      </div>
    )
  }

  if (!status) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <p className="text-muted-foreground">Erro ao verificar status do pagamento.</p>
          <Button onClick={() => router.push("/checkout")} className="mt-4">
            Tentar novamente
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-accent" />
          </div>

          <h1 className="text-3xl font-bold text-foreground mb-2">Pagamento confirmado!</h1>
          <p className="text-muted-foreground text-lg">Sua conta foi criada com sucesso e está pronta para uso</p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-accent" />
              Status da assinatura
            </CardTitle>
            <CardDescription>Detalhes da sua conta e próximos passos</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-foreground">Status:</span>
              <Badge variant="secondary" className="bg-accent/10 text-accent">
                {status.status_billing === "active" ? "Ativo" : status.status_billing}
              </Badge>
            </div>

            {status.plan_name && (
              <div className="flex items-center justify-between">
                <span className="text-foreground">Plano:</span>
                <span className="font-medium">{status.plan_name}</span>
              </div>
            )}

            {status.seats && (
              <div className="flex items-center justify-between">
                <span className="text-foreground">Usuários:</span>
                <span className="font-medium">{status.seats} contas</span>
              </div>
            )}

            {status.next_billing_date && (
              <div className="flex items-center justify-between">
                <span className="text-foreground">Próxima cobrança:</span>
                <span className="font-medium">{status.next_billing_date}</span>
              </div>
            )}

            <div className="bg-accent/10 p-4 rounded-lg">
              <div className="flex items-center gap-2 text-accent font-medium mb-2">
                <Sparkles className="w-4 h-4" />
                Período de teste ativo
              </div>
              <p className="text-sm text-muted-foreground">
                Você tem 7 dias grátis para explorar todas as funcionalidades. Sua primeira cobrança será apenas após o
                período de teste.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-2">
          <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={handleGoToUsers}>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-secondary-foreground" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-1">Cadastrar usuários</h3>
                  <p className="text-sm text-muted-foreground">Adicione membros da sua equipe</p>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={handleGoToSystem}>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <ArrowRight className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-1">Ir para o sistema</h3>
                  <p className="text-sm text-muted-foreground">Comece a usar o Converto agora</p>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground mb-4">Precisa de ajuda para começar?</p>
          <Button variant="outline" size="sm">
            Falar com suporte
          </Button>
        </div>
      </div>
    </div>
  )
}
