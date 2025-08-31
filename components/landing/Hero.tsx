"use client"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle } from "lucide-react"
import { scrollToSection } from "@/lib/utils"

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)
  useEffect(() => setIsVisible(true), [])

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-br from-background to-muted/20 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <Badge
            variant="secondary"
            className={`mb-6 transition-all duration-1000 ${isVisible ? "animate-bounce" : "opacity-0"} bg-primary/10 text-primary border-primary/20`}
          >
            Novo: Integração com WhatsApp disponível
          </Badge>

          <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 transition-all duration-1000 delay-200 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
            Organize Sua Equipe de Vendas e
            <span className="text-primary block mt-2 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Controle Cada Resultado
            </span>
          </h1>

          <p className={`text-xl text-muted-foreground mb-8 max-w-3xl mx-auto transition-all duration-1000 delay-400 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
            A ferramenta poderosa que vai finalmente organizar sua equipe de vendas e te manter de olho nos resultados
            sem perder nenhum contato. Aumente suas vendas em até 300% com
            <strong className="text-primary"> controle total do seu pipeline.</strong>
          </p>

          <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 transition-all duration-1000 delay-600 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-lg px-10 py-6 shadow-2xl hover:shadow-primary/25 transition-all duration-300 hover:scale-105"
              onClick={() => scrollToSection("precos")}
            >
              Comprar Agora
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          <div className={`grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto transition-all duration-1000 delay-800 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
            <div className="flex items-center justify-center p-4 bg-muted/30 rounded-lg">
              <CheckCircle className="h-5 w-5 text-primary mr-2" />
              <div className="text-sm text-muted-foreground">Sem cartão de crédito</div>
            </div>
            <div className="flex items-center justify-center p-4 bg-muted/30 rounded-lg">
              <CheckCircle className="h-5 w-5 text-primary mr-2" />
              <div className="text-sm text-muted-foreground">Suporte 24/7</div>
            </div>
            <div className="flex items-center justify-center p-4 bg-muted/30 rounded-lg">
              <CheckCircle className="h-5 w-5 text-primary mr-2" />
              <div className="text-sm text-muted-foreground">Implementação rápida</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
