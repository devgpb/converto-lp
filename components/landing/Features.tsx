"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, BarChart3, CheckSquare, MessageCircle, Timer } from "lucide-react"
import { scrollToSection } from "@/lib/utils"

export default function Features() {
  const features = [
    {
      icon: MessageCircle,
      title: "Nunca mais esqueça um cliente",
      description: "Lembretes automáticos no próprio WhatsApp avisam quem precisa de retorno antes de sumir.",
      result: "Cada conversa vira um cartão com responsável, etapa e próxima ação.",
    },
    {
      icon: Timer,
      title: "Follow-up no dia certo",
      description: "Agenda diária pronta com quem deve ser cobrado hoje e por qual etapa está.",
      result: "Alertas diários evitam que pedidos fiquem parados ou atrasem decisões.",
    },
    {
      icon: CheckSquare,
      title: "Equipe organizada e sob controle",
      description: "Etapas simples que todo vendedor segue. O gestor enxerga quem está com cada negociação.",
      result: "Funil visual dentro do WhatsApp mantém padrão e facilita a cobrança de resultado.",
    },
    {
      icon: BarChart3,
      title: "Veja exatamente quantos leads convertem",
      description: "Visão por etapa e por vendedor em minutos, sem planilha paralela.",
      result: "Previsibilidade simples: quantos entram, quantos avançam e onde está travando.",
    },
  ]

  return (
    <section id="recursos" className="py-5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">Para quem vende no WhatsApp e precisa de controle</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Mais controle, menos cliente esquecido e operação organizada. Estes são os resultados que você enxerga já no primeiro dia.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card
              key={feature.title}
              className="hover:shadow-xl transition-all duration-500 hover:scale-105 animate-fade-in-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-center gap-3">
                  <feature.icon className="h-6 w-6 text-primary" />
                  <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                <div className="border-t pt-4 text-primary font-semibold leading-relaxed">{feature.result}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12 flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="bg-primary text-primary-foreground px-10 py-6 text-lg"
            onClick={() => scrollToSection("precos")}
          >
            Começar grátis agora
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="px-10 py-6 text-lg"
            onClick={() => scrollToSection("beneficios")}
          >
            Ver detalhes dos benefícios
          </Button>
        </div>
      </div>
    </section>
  )
}
