"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import { trackHomeEventOnce } from "@/lib/lp-tracking"
import { scrollToSection } from "@/lib/utils"

export default function Hero() {
  return (
    <section id="hero" className="py-20 lg:py-32 bg-gradient-to-br from-background to-muted/20 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
         

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 animate-fade-in-up">
            Pare de perder vendas no WhatsApp por falta de controle.
            <span className="text-primary block mt-2 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              
            </span>
          </h1>
           <Badge
            variant="secondary"
            className="mb-6 animate-fade-in-up bg-primary/10 text-primary border-primary/20"
          >
            Organize conversas, acompanhe negociações e visualize seu comercial direto no WhatsApp Web
          </Badge>

          {/* <p className={`text-xl text-muted-foreground mb-8 max-w-3xl mx-auto transition-all duration-1000 delay-400 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
            Organize conversas, prazos e follow-ups no canal que você já usa. Nada de implantação demorada ou ferramentas complicadas — só visibilidade diária de quem está comprando e quem precisa de retorno.
          </p> */}

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-fade-in-up">
            {/* <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-lg px-10 py-6 shadow-2xl hover:shadow-primary/25 transition-all duration-300 hover:scale-105"
              onClick={() => scrollToSection("precos")}
            >
              Começar grátis por 7 dias
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button> */}
            <Button
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary/10 text-lg px-10 py-6"
              onClick={() => {
                trackHomeEventOnce(
                  { eventName: "cta_click", section: "hero", ctaId: "hero_ver_como_funciona" },
                  "cta:hero_ver_como_funciona"
                )
                scrollToSection("beneficios")
              }}
            >
              Ver como funciona
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto animate-fade-in-up">
            <div className="flex items-center justify-center p-4 bg-muted/30 rounded-lg">
              <CheckCircle className="h-5 w-5 text-primary mr-2" />
              <div className="text-sm text-muted-foreground">Sem abandonar o WhatsApp</div>
            </div>
            <div className="flex items-center justify-center p-4 bg-muted/30 rounded-lg">
              <CheckCircle className="h-5 w-5 text-primary mr-2" />
              <div className="text-sm text-muted-foreground">Método Rápido</div>
            </div>
            <div className="flex items-center justify-center p-4 bg-muted/30 rounded-lg">
              <CheckCircle className="h-5 w-5 text-primary mr-2" />
              <div className="text-sm text-muted-foreground">Veja o que está parado</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
