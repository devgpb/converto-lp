"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { scrollToSection } from "@/lib/utils"

export default function FinalCTA() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/abstract-tech-pattern.png')] opacity-10"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-3xl lg:text-5xl font-bold mb-6">Pare de Perder Vendas por Desorganização</h2>
        <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
          Mais de 10.000 empresas já organizaram suas equipes e têm controle total dos resultados. Seja a próxima a dominar sua operação de vendas.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
          <Button
            size="lg"
            variant="secondary"
            className="text-lg px-12 py-6 shadow-2xl hover:shadow-white/25 transition-all duration-300 hover:scale-105"
            onClick={() => scrollToSection("precos")}
          >
            Começar Agora - R$ 97/mês
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="text-lg px-12 py-6 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent transition-all duration-300"
          >
            Falar com Especialista
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto text-sm opacity-90">
          <div>Implementação em 24h</div>
          <div>Suporte especializado</div>
          <div>Garantia de resultados</div>
        </div>
      </div>
    </section>
  )
}
