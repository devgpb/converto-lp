"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, CreditCard, Users, Shield } from "lucide-react"
import { API_URL } from "@/lib/api"

interface Plan {
  id: string
  label: string
  priceId: string
  description: string
  pricePerSeat: number
  minSeats: number
  maxSeats?: number
}

const plans: Plan[] = [
  {
    id: "starter",
    label: "1 conta",
    priceId: "price_1S2YPWGIUmR0keuMJ9riRMxo",
    description: "Ideal para freelancers e pequenos negócios",
    pricePerSeat: 29.9,
    minSeats: 1,
    maxSeats: 1,
  },
  {
    id: "team",
    label: "2 até 3 contas",
    priceId: "price_1S2YPWGIUmR0keuMJ9riRMxo",
    description: "Perfeito para equipes pequenas",
    pricePerSeat: 23.0,
    minSeats: 2,
    maxSeats: 3,
  },
  {
    id: "medium",
    label: "4 até 5 contas",
    priceId: "price_1S2YPWGIUmR0keuMJ9riRMxo",
    description: "Para empresas em crescimento",
    pricePerSeat: 26.0,
    minSeats: 4,
    maxSeats: 5,
  },
  {
    id: "large",
    label: "6+ contas",
    priceId: "price_1S2YPWGIUmR0keuMJ9riRMxo",
    description: "Para grandes organizações",
    pricePerSeat: 30.0,
    minSeats: 6,
  },
]

export function CheckoutForm() {
  const router = useRouter()
  const [selectedPlan, setSelectedPlan] = useState(plans[0].id)
  const [seats, setSeats] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [accountType, setAccountType] = useState<"company" | "personal">("company")

  useEffect(() => {
    try {
      const at = sessionStorage.getItem("account_type")
      if (at === "personal" || at === "company") {
        setAccountType(at)
        if (at === "personal") {
          // Força 1 conta e plano de 1 conta
          setSeats(1)
          setSelectedPlan("starter")
        }
      }
    } catch {}
  }, [])

  const visiblePlans = accountType === "personal" ? plans.filter((p) => (p.maxSeats ?? p.minSeats) === 1) : plans
  const currentPlan = visiblePlans.find((p) => p.id === selectedPlan) || visiblePlans[0]
  const seatsEffective = accountType === "personal" ? 1 : seats
  const totalPrice = currentPlan.pricePerSeat * seatsEffective

  const handlePlanChange = (planId: string) => {
    const plan = plans.find((p) => p.id === planId)!
    if (accountType === "personal" && plan.minSeats > 1) {
      setSelectedPlan("starter")
      setSeats(1)
      return
    }
    setSelectedPlan(planId)
    setSeats(plan.minSeats)
    setError("")
  }

  const handleSeatsChange = (value: string) => {
    if (accountType === "personal") {
      setSeats(1)
      return
    }
    const numSeats = Number.parseInt(value) || 1
    const plan = currentPlan

    if (numSeats < plan.minSeats) {
      setSeats(plan.minSeats)
    } else if (plan.maxSeats && numSeats > plan.maxSeats) {
      setSeats(plan.maxSeats)
    } else {
      setSeats(numSeats)
    }
    setError("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (accountType !== "personal" && (seats < currentPlan.minSeats || (currentPlan.maxSeats && seats > currentPlan.maxSeats))) {
      setError(`Número de contas deve estar entre ${currentPlan.minSeats} e ${currentPlan.maxSeats || "∞"}`)
      return
    }

    setIsLoading(true)
    setError("")

    try {
      // Get tenant ID from auth (simulate)
      const tenantId = sessionStorage.getItem("tenant_id") // This would come from your auth service

      if (!tenantId) {
        throw new Error("Sessão expirada. Faça login novamente.")
      }

      const response = await fetch(`${API_URL}/billing/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tenant_id: tenantId,
          price_id: currentPlan.priceId,
          seatCountInicial: accountType === "personal" ? 1 : seats,
          success_url: `${window.location.origin}/confirmacao`,
          cancel_url: `${window.location.origin}/checkout`,
        }),
      })

      if (!response.ok) {
        throw new Error("Erro ao processar pagamento")
      }

      const data = await response.json()
      window.location.href = data.checkout_url
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao processar. Tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-4 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>

          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground mb-2">Finalizar assinatura</h1>
            <p className="text-muted-foreground">
              {accountType === "personal" ? "Escolha seu plano" : "Escolha seu plano e número de usuários"}
            </p>
          </div>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Selecione seu plano
              </CardTitle>
              <CardDescription>Escolha o plano que melhor se adequa ao tamanho da sua equipe</CardDescription>
            </CardHeader>

            <CardContent>
              <RadioGroup value={selectedPlan} onValueChange={handlePlanChange}>
                <div className="space-y-3">
                  {visiblePlans.map((plan) => (
                    <div
                      key={plan.id}
                      className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <RadioGroupItem value={plan.id} id={plan.id} />
                      <div className="flex-1">
                        <Label htmlFor={plan.id} className="flex items-center justify-between cursor-pointer">
                          <div>
                            <div className="font-medium text-foreground">{plan.label}</div>
                            <div className="text-sm text-muted-foreground">{plan.description}</div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-foreground">
                              R$ {plan.pricePerSeat.toFixed(2).replace(".", ",")}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {plan.maxSeats === 1 ? "fixo" : "por conta/mês"}
                            </div>
                          </div>
                        </Label>
                      </div>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {accountType !== "personal" && (
            <Card>
              <CardHeader>
                <CardTitle>Número de usuários</CardTitle>
                <CardDescription>Quantos usuários terão acesso ao sistema?</CardDescription>
              </CardHeader>

              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="seats">Número de contas</Label>
                    <Input
                      id="seats"
                      type="number"
                      min={currentPlan.minSeats}
                      max={currentPlan.maxSeats}
                      value={seats}
                      onChange={(e) => handleSeatsChange(e.target.value)}
                      className="w-full"
                    />
                    <p className="text-sm text-muted-foreground">
                      {currentPlan.maxSeats
                        ? `Entre ${currentPlan.minSeats} e ${currentPlan.maxSeats} contas`
                        : `Mínimo ${currentPlan.minSeats} contas`}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Resumo do pedido
              </CardTitle>
            </CardHeader>

            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-foreground">Plano selecionado:</span>
                  <span className="font-medium">{currentPlan.label}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-foreground">Número de contas:</span>
                  <span className="font-medium">{accountType === "personal" ? 1 : seats}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-foreground">Valor por conta:</span>
                  <span className="font-medium">R$ {currentPlan.pricePerSeat.toFixed(2).replace(".", ",")}</span>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>Total mensal:</span>
                    <span className="text-primary">R$ {(currentPlan.pricePerSeat * (accountType === "personal" ? 1 : seats)).toFixed(2).replace(".", ",")}</span>
                  </div>
                </div>

                <div className="bg-accent/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 text-accent font-medium mb-2">
                    <Shield className="w-4 h-4" />7 dias grátis
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Você não será cobrado nos primeiros 7 dias. Cancele a qualquer momento.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 text-lg font-semibold"
              disabled={isLoading}
            >
              {isLoading ? "Processando..." : "Ir para pagamento"}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Pagamento seguro processado via Stripe • SSL 256-bit
          </p>
        </div>
      </div>
    </div>
  )
}
