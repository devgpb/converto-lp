"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageSquare, Users, Calendar, BarChart3, Chrome, Database, Cog } from "lucide-react"
import { trackHomeEventOnce } from "@/lib/lp-tracking"
import { scrollToSection } from "@/lib/utils"
import { GearBackgroundDiv } from "./gear-background-div"
import Image from "next/image"

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
          {/* <Badge className="mb-4 bg-primary text-primary-foreground border-primary/20 hover:bg-primary/90">
            <Zap className="w-4 h-4 mr-2" />
            Gestão comercial simples para quem vende no WhatsApp
          </Badge> */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 gradient-text text-balance leading-tight">
            O que é o Converto?
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Uma integração completa como CRM integrado ao whatsapp web que funciona por um aplicativo principal acessável pela internet e uma extensão de navegador que permite conectar com o sistema principal. Centralizando todas as informações sem precisar de complexidade. Instalação em poucos cliques e sem travamentos.
          </p>
        </div>

        
        <div className="mx-auto w-full max-w-4xl">
          <Image
            src="/LP_Imagem_1.png"
            alt="Mais de 100 clientes em Pernambuco"
            width={1000}
            height={200}
            sizes="100vw"
            className="h-auto w-full"
          />
        </div>

        <div className="mx-auto mb-12 flex max-w-3xl items-center justify-center gap-4 sm:mb-16">
          <div className="h-px flex-1 bg-emerald-300/80" />
          <Cog className="h-10 w-10 shrink-0 animate-spin-slower text-emerald-700 sm:h-12 sm:w-12" aria-hidden="true" />
          <div className="h-px flex-1 bg-emerald-300/80" />
        </div>

        <div className="text-center mb-12 sm:mb-16 animate-fade-in-up">
          {/* <Badge className="mb-4 bg-primary text-primary-foreground border-primary/20 hover:bg-primary/90">
            <Zap className="w-4 h-4 mr-2" />
            Gestão comercial simples para quem vende no WhatsApp
          </Badge> */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 gradient-text text-balance leading-tight">
            Maneira fácil de controlar vendas sem sair do WhatsApp
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
          </p>
        </div>

        {/* Features Grid */}
        <GearBackgroundDiv corner="bottom-right" size="giant" className="w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 w-full">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="h-full border-emerald-200/70 bg-background/95 shadow-sm transition-all duration-300 hover-lift hover:border-emerald-300 hover:bg-emerald-50/50"
              >
                <CardContent className="p-4 sm:p-5 h-full">
                  <div className="flex h-full flex-col gap-3 text-left">
                    <div className="flex items-center gap-3">
                      <div className="shrink-0 text-emerald-700 [&_svg]:h-6 [&_svg]:w-6 sm:[&_svg]:h-7 sm:[&_svg]:w-7">
                        {feature.icon}
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-emerald-800 leading-tight">
                        {feature.title}
                      </h3>
                    </div>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                      {feature.summary}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground px-10 py-6 text-lg"
              onClick={() => {
                trackHomeEventOnce(
                  { eventName: "cta_click", section: "beneficios", ctaId: "beneficios_comecar_gratis" },
                  "cta:beneficios_comecar_gratis"
                )
                scrollToSection("precos")
              }}
            >
              Começar grátis por 7 dias
            </Button>
          </div>
        </GearBackgroundDiv>
      </div>
    </section>
  )
}
