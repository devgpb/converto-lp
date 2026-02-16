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
            Funciona direto no WhatsApp — sem trocar de sistema
          </Badge>

          <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 transition-all duration-1000 delay-200 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
            O problema não é falta de lead.
            <span className="text-primary block mt-2 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              É falta de controle das negociações.
            </span>
          </h1>

          <p className={`text-xl text-muted-foreground mb-8 max-w-3xl mx-auto transition-all duration-1000 delay-400 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
            Você vende pelo WhatsApp todos os dias, mas não sabe quantos clientes estão em negociação, quem está esperando retorno ou onde o dinheiro escapa. O Converto organiza tudo isso dentro do próprio WhatsApp, sem implantação complexa nem treinamento técnico.
          </p>

          <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 transition-all duration-1000 delay-600 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-lg px-10 py-6 shadow-2xl hover:shadow-primary/25 transition-all duration-300 hover:scale-105"
              onClick={() => scrollToSection("precos")}
            >
              Começar grátis por 7 dias
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          <div className={`grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto transition-all duration-1000 delay-800 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
            <div className="flex items-center justify-center p-4 bg-muted/30 rounded-lg">
              <CheckCircle className="h-5 w-5 text-primary mr-2" />
              <div className="text-sm text-muted-foreground">Sem abandonar o WhatsApp</div>
            </div>
            <div className="flex items-center justify-center p-4 bg-muted/30 rounded-lg">
              <CheckCircle className="h-5 w-5 text-primary mr-2" />
              <div className="text-sm text-muted-foreground">Configuração em minutos</div>
            </div>
            <div className="flex items-center justify-center p-4 bg-muted/30 rounded-lg">
              <CheckCircle className="h-5 w-5 text-primary mr-2" />
              <div className="text-sm text-muted-foreground">Mensalidade acessível</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
