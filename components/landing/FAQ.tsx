"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FAQ() {
  return (
    <section id="faq" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">Perguntas Frequentes</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Tire todas as suas dúvidas sobre o Converto</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="border rounded-lg px-6 hover:shadow-lg transition-all duration-300">
              <AccordionTrigger className="text-left text-lg font-semibold">O Converto substitui o WhatsApp?</AccordionTrigger>
              <AccordionContent className="text-base leading-relaxed">
                Não. Ele funciona junto com o WhatsApp Web, adicionando etapas, histórico e alertas de follow-up nas conversas que você já tem.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border rounded-lg px-6 hover:shadow-lg transition-all duration-300">
              <AccordionTrigger className="text-left text-lg font-semibold">Quanto tempo leva para começar?</AccordionTrigger>
              <AccordionContent className="text-base leading-relaxed">
                Menos de 30 minutos. Instale a extensão, escolha as etapas do funil e já comece a mover conversas. Não precisa de treinamento técnico.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border rounded-lg px-6 hover:shadow-lg transition-all duration-300">
              <AccordionTrigger className="text-left text-lg font-semibold">E se minha equipe não usar?</AccordionTrigger>
              <AccordionContent className="text-base leading-relaxed">
                O processo fica no próprio canal que eles já usam. Funil visual, alertas e listas deixam claro quem deve falar com quem, então a adoção acontece no primeiro dia.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border rounded-lg px-6 hover:shadow-lg transition-all duration-300">
              <AccordionTrigger className="text-left text-lg font-semibold">Preciso parar a operação para configurar?</AccordionTrigger>
              <AccordionContent className="text-base leading-relaxed">
                Não. Você continua atendendo normalmente enquanto conecta o Converto. As conversas ativas já aparecem no funil.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="border rounded-lg px-6 hover:shadow-lg transition-all duration-300">
              <AccordionTrigger className="text-left text-lg font-semibold">Como ficam os dados dos clientes?</AccordionTrigger>
              <AccordionContent className="text-base leading-relaxed">
                Histórico, valores e anotações ficam salvos por cliente, com backup e acesso controlado. Se um vendedor sair, o dono continua com todo o contexto.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6" className="border rounded-lg px-6 hover:shadow-lg transition-all duration-300">
              <AccordionTrigger className="text-left text-lg font-semibold">Como funciona o trial?</AccordionTrigger>
              <AccordionContent className="text-base leading-relaxed">
                7 dias completos para testar com o time. A cobrança só começa depois da confirmação de continuação.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  )
}
