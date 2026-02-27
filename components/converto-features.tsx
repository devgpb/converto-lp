"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MessageSquare, Users, Calendar, BarChart3, Zap, Chrome, Database } from "lucide-react"
import { scrollToSection } from "@/lib/utils"

export default function ConvertoFeatures() {
  const features = [
    {
      icon: <Chrome className="w-8 h-8" />,
      title: "Funil organizado no WhatsApp",
      summary: "Etapas visuais para acompanhar cada cliente sem sair do WhatsApp.",
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: "Histórico que não se perde",
      summary: "Registros e decisões ficam salvos por cliente para ninguém perder contexto.",
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Alertas e follow-ups automáticos",
      summary: "Lembretes automáticos ajudam o time a responder no momento certo.",
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Visão da carteira em minutos",
      summary: "Acompanhe etapas e vendedores com clareza, sem depender de planilhas.",
    },
  ]

  return (
    <section
      id="beneficios"
      className="w-full px-4 py-16 sm:py-20 bg-gradient-to-br from-background via-muted/30 to-background relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="bg-parallax-element bg-size-lg animate-float-slow">
          <MessageSquare className="w-full h-full text-primary/10" />
        </div>
        <div className="bg-parallax-element bg-size-md animate-float-medium animation-delay-1000">
          <Users className="w-full h-full text-accent/10" />
        </div>
        <div className="bg-parallax-element bg-size-sm animate-float-fast animation-delay-2000">
          <BarChart3 className="w-full h-full text-primary/10" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 animate-fade-in-up">
          <Badge className="mb-4 bg-primary text-primary-foreground border-primary/20 hover:bg-primary/90">
            <Zap className="w-4 h-4 mr-2" />
            Gestão comercial simples para quem vende no WhatsApp
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 gradient-text text-balance leading-tight">
            Converto é o jeito mais fácil de controlar vendas sem sair do WhatsApp
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Ele não substitui o WhatsApp: ele coloca processo, histórico e cobrança de follow-up dentro dele. Simples, acessível e feito para pequenas empresas locais.
          </p>
        </div>

        {/* Features Grid */}
        <div className="w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
            {features.map((feature, index) => (
              <Card key={index} className="transition-all duration-300 hover-lift h-full hover:bg-muted/40">
                <CardContent className="p-6 h-full">
                  <div className="flex flex-col items-center text-center gap-4 h-full">
                    <div className="p-3 rounded-xl bg-emerald-100 text-emerald-700">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-semibold text-emerald-700 leading-snug">{feature.title}</h3>
                    <p className="text-base sm:text-lg text-muted-foreground text-pretty leading-relaxed">{feature.summary}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground px-10 py-6 text-lg"
              onClick={() => scrollToSection("precos")}
            >
              Começar grátis por 7 dias
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
