"use client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Sparkles } from "lucide-react"

interface Plan {
  id: string
  title: string
  description: string
  price: string
  priceDetail?: string
  features: string[]
  popular?: boolean
}

const plans: Plan[] = [
  {
    id: "starter",
    title: "1 conta",
    description: "Plano starter para teste e gerência de uma pessoa só",
    price: "R$29,90",
    priceDetail: "/mês",
    features: ["Dashboard completo", "Relatórios básicos", "Suporte por email", "Integração básica"],
  },
  {
    id: "team",
    title: "2 até 3 contas",
    description: "Para equipes de vendas",
    price: "R$23,00",
    priceDetail: "por conta/mês",
    popular: true,
    features: [
      "Tudo do plano anterior",
      "Colaboração em equipe",
      "Relatórios avançados",
      "Suporte prioritário",
    ],
  },
  {
    id: "medium",
    title: "4 até 5 contas",
    description: "Para empresas médias",
    price: "R$26,00",
    priceDetail: "por conta/mês",
    features: [
      "Tudo do plano anterior",
      "Analytics avançado",
      "API personalizada",
      "Suporte telefônico",
      "Treinamento incluído",
    ],
  },
  {
    id: "large",
    title: "6+ contas",
    description: "Para empresas grandes",
    price: "R$30,00",
    priceDetail: "por conta/mês",
    features: [
      "Tudo do plano anterior",
      "Gerente de conta dedicado",
      "SLA garantido",
      "Customizações",
      "Onboarding personalizado",
    ],
  },
]

export function PricingPlans() {
  const router = useRouter()

  const handleGetStarted = () => {
    // Trial de 7 dias com cobrança iniciando após confirmação do cliente.
    router.push("/cadastro")
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium mb-6">
          <Sparkles className="w-4 h-4" />7 dias grátis
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
          Mensalidade acessível, sem implantação
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
          Ative o trial em minutos e veja sua operação organizada já na primeira semana. Escolha o plano que cabe no seu time.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {plans.map((plan) => (
          <Card
            key={plan.id}
            className={`relative transition-all duration-300 hover:shadow-lg ${
              plan.popular ? "border-primary shadow-lg scale-105" : "border-border hover:border-primary/50"
            }`}
          >
            {plan.popular && (
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground">
                Mais Popular
              </Badge>
            )}

            <CardHeader className="text-center pb-4">
              <CardTitle className="text-xl font-bold text-foreground">{plan.title}</CardTitle>
              <CardDescription className="text-muted-foreground">{plan.description}</CardDescription>
              <div className="mt-4">
                <span className="text-3xl font-bold text-foreground">{plan.price}</span>
                {plan.priceDetail && <span className="text-muted-foreground ml-1">{plan.priceDetail}</span>}
              </div>
            </CardHeader>

            <CardContent>
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center">
        <Button
          onClick={handleGetStarted}
          size="lg"
          className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg font-semibold"
        >
          Começar agora - Grátis por 7 dias
        </Button>
        <p className="text-sm text-muted-foreground mt-4">Cobrança após 7 dias • Cancele quando quiser • Suporte incluído</p>
      </div>
    </div>
  )
}
