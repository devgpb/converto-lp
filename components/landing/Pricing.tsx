"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"
import { PRICING_PLANS } from "@/lib/constants"

export default function Pricing() {
  return (
    <section id="precos" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">Organize Sua Equipe Hoje Mesmo</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Escolha o plano ideal e tenha controle total dos seus resultados</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {PRICING_PLANS.map((plan, idx) => (
            <Card key={plan.name} className={`relative animate-fade-in-up hover:shadow-2xl transition-all duration-500 hover:scale-105 ${plan.featured ? "border-primary border-2 animation-delay-200" : ""}`}>
              {plan.featured && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground px-6 py-1">
                  Mais Vendido
                </Badge>
              )}
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                <CardDescription className="text-lg">{plan.description}</CardDescription>
                <div className="mt-6">
                  <span className="text-5xl font-bold text-primary">{plan.price}</span>
                  <span className="text-muted-foreground text-lg">{plan.period}</span>
                </div>
                {plan.roiNote && (
                  <p className={`text-sm mt-2 ${plan.featured ? "text-primary font-semibold" : "text-muted-foreground"}`}>
                    {plan.roiNote}
                  </p>
                )}
              </CardHeader>
              <CardContent className="space-y-4">
                {plan.features.map((f) => (
                  <div key={f} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                    <span>{f}</span>
                  </div>
                ))}
                <Button className={`w-full mt-8 ${plan.featured ? "bg-primary hover:bg-primary/90 text-lg py-6 shadow-lg hover:shadow-primary/25" : "bg-transparent hover:bg-primary hover:text-primary-foreground"}`} variant={plan.featured ? undefined : "outline"}>
                  {plan.ctaLabel}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-6 text-lg">
            Pagamento seguro • Dados protegidos • <strong>Suporte especializado</strong>
          </p>
          <Button variant="link" className="text-primary text-lg hover:underline">Precisa de um plano enterprise? Fale com nossos especialistas</Button>
        </div>
      </div>
    </section>
  )
}
