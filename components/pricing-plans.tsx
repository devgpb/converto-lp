import { Check, Sparkles } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PRICING_PLANS } from "@/lib/constants"

export function PricingPlans() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mb-16 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-2 text-sm font-medium text-accent">
          <Sparkles className="h-4 w-4" />
          7 dias gratis
        </div>
        <h2 className="gradient-text mb-4 text-4xl font-bold text-balance text-foreground md:text-5xl">
          Mensalidade acessivel, sem implantacao
        </h2>
        <p className="mx-auto max-w-2xl text-xl text-balance text-muted-foreground">
          Ative o trial em minutos e veja sua operacao organizada ja na primeira semana. Escolha o plano que cabe no seu time.
        </p>
      </div>

      <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2">
        {PRICING_PLANS.map((plan) => (
          <Card
            key={plan.name}
            className={`relative transition-all duration-300 hover:shadow-lg ${
              plan.featured ? "pricing-card-popular border-primary shadow-lg" : "border-border hover:border-primary/50"
            }`}
          >
            {plan.featured ? (
              <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground">
                Mais procurado
              </Badge>
            ) : null}

            <CardHeader className="pb-4 text-center">
              <CardTitle className="text-xl font-bold text-foreground">{plan.name}</CardTitle>
              <CardDescription className="text-muted-foreground">{plan.description}</CardDescription>
              <div className="mt-4">
                <span className="text-3xl font-bold text-foreground">{plan.price}</span>
                <span className="ml-1 text-muted-foreground">{plan.period}</span>
              </div>
              {plan.roiNote ? <p className="text-sm font-medium text-emerald-700">{plan.roiNote}</p> : null}
            </CardHeader>

            <CardContent>
              <ul className="mb-6 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <Check className="h-4 w-4 shrink-0 text-primary" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button className="w-full" size="lg" asChild>
                <a href="/cadastro">{plan.ctaLabel}</a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center">
        <p className="mt-4 text-sm text-muted-foreground">Cobranca apos 7 dias • Cancele quando quiser • Suporte incluido</p>
      </div>
    </div>
  )
}
