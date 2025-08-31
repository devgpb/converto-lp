"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FAQ() {
  return (
    <section id="faq" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">Perguntas Frequentes</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Tire todas as suas dúvidas sobre o Conversor</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="border rounded-lg px-6 hover:shadow-lg transition-all duration-300">
              <AccordionTrigger className="text-left text-lg font-semibold">Como o Conversor organiza minha equipe?</AccordionTrigger>
              <AccordionContent className="text-base leading-relaxed">
                Automatiza tarefas, distribui leads, agenda follow-ups e oferece visões claras dos resultados por vendedor e por etapa do funil.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border rounded-lg px-6 hover:shadow-lg transition-all duration-300">
              <AccordionTrigger className="text-left text-lg font-semibold">É difícil implementar?</AccordionTrigger>
              <AccordionContent className="text-base leading-relaxed">
                Não. A implementação é guiada e sua equipe começa a operar em poucas horas, com treinamentos e suporte.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border rounded-lg px-6 hover:shadow-lg transition-all duration-300">
              <AccordionTrigger className="text-left text-lg font-semibold">Funciona no celular?</AccordionTrigger>
              <AccordionContent className="text-base leading-relaxed">
                Sim. Interface responsiva e app mobile para acompanhar e agir de onde estiver.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border rounded-lg px-6 hover:shadow-lg transition-all duration-300">
              <AccordionTrigger className="text-left text-lg font-semibold">Posso integrar com WhatsApp e email?</AccordionTrigger>
              <AccordionContent className="text-base leading-relaxed">
                Sim. Integrações nativas e via API com WhatsApp, email, calendários e dezenas de outras ferramentas.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="border rounded-lg px-6 hover:shadow-lg transition-all duration-300">
              <AccordionTrigger className="text-left text-lg font-semibold">Que tipo de suporte minha equipe terá?</AccordionTrigger>
              <AccordionContent className="text-base leading-relaxed">
                Plano Básico: suporte por email + treinamentos online. Plano Premium: suporte VIP 24/7 + gerente dedicado e consultoria.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6" className="border rounded-lg px-6 hover:shadow-lg transition-all duration-300">
              <AccordionTrigger className="text-left text-lg font-semibold">Vocês garantem mais controle dos resultados?</AccordionTrigger>
              <AccordionContent className="text-base leading-relaxed">
                Sim. Em até 60 dias você terá visão completa de vendas por vendedor, oportunidades e gargalos. Caso contrário, devolvemos seu investimento.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  )
}

