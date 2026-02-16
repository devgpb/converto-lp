"use client"

import { Card, CardContent } from "@/components/ui/card"
import { ListChecks, MessageCircle, Timer, Wallet } from "lucide-react"

export default function Features() {
  const features = [
    {
      icon: MessageCircle,
      title: "Conversas espalhadas, dinheiro perdido",
      description:
        "O dono não enxerga quantos clientes estão ativos e quais aguardam resposta. Cada chat esquecido vira venda perdida.",
      result: "Converto transforma cada conversa em um cartão com dono, etapa e próxima ação.",
    },
    {
      icon: Timer,
      title: "Follow-up atrasado",
      description: "Vendedor promete retorno e esquece. O cliente some, o dia segue e ninguém sabe onde travou.",
      result: "Alertas diários no próprio WhatsApp mostram quem precisa de retorno hoje.",
    },
    {
      icon: ListChecks,
      title: "Equipe sem processo",
      description: "Sem etapas claras, cada um atende de um jeito. Fica impossível cobrar padrão e prever resultados.",
      result: "Funil visual dentro do WhatsApp cria um passo a passo simples que qualquer vendedor segue.",
    },
    {
      icon: Wallet,
      title: "Planilhas e CRMs caros não colam",
      description: "Implantação demorada, custo alto e ninguém usa. O problema volta em poucas semanas.",
      result: "O Converto roda no canal que você já usa, com mensalidade baixa e setup em minutos.",
    },
  ]

  return (
    <section id="recursos" className="py-5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">Para quem vende no WhatsApp e precisa de controle</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Não é sobre ter mais leads, é sobre saber o que está acontecendo com cada negociação. Estes são os problemas
            que o Converto resolve logo no primeiro dia.
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
      </div>
    </section>
  )
}
