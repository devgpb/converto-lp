import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CONTACT_INFO } from "@/lib/constants"

export default function FinalCTA() {
  return (
    <section
      id="final-cta"
      className="relative overflow-hidden bg-gradient-to-br from-primary to-primary/80 py-20 text-primary-foreground"
    >
      <div className="absolute inset-0 bg-[url('/abstract-tech-pattern.png')] opacity-10" />
      <div className="container relative z-10 mx-auto px-4 text-center sm:px-6 lg:px-8">
        <h2 className="mb-6 text-3xl font-bold lg:text-5xl">Menos cliente esquecido, mais previsibilidade</h2>
        <p className="mx-auto mb-8 max-w-3xl text-xl opacity-90">
          Converto estrutura seu setor comercial dentro do WhatsApp: etapas claras, alertas de follow-up e historico guardado.
          Sem implantacao longa, sem custo alto, so controle diario das negociacoes.
        </p>

        <div className="mb-8 flex flex-col items-center justify-center gap-6 sm:flex-row">
          <Button
            size="lg"
            variant="secondary"
            className="px-12 py-6 text-lg shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-white/25"
            asChild
          >
            <a href="#precos">
              Testar gratis por 7 dias
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-primary-foreground bg-transparent px-12 py-6 text-lg text-primary-foreground transition-all duration-300 hover:bg-primary-foreground hover:text-primary"
            asChild
          >
            <a href={CONTACT_INFO.whatsappUrl} target="_blank" rel="noopener noreferrer">
              Falar com Especialista
            </a>
          </Button>
        </div>

        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-6 text-sm opacity-90 sm:grid-cols-3">
          <div>Comece em minutos no WhatsApp</div>
          <div>Suporte para configurar seu funil</div>
          <div>Mensalidade acessivel para empresas locais</div>
        </div>
      </div>
    </section>
  )
}
