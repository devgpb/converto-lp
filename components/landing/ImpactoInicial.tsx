import type { ReactNode } from "react"
import {
  BellRing,
  CheckCircle2,
  Clock3,
  KanbanSquare,
  MessageCircle,
  MessagesSquare,
  MousePointerClick,
  Smartphone,
  Table2,
  TimerReset,
  TrendingDown,
  UsersRound,
} from "lucide-react"

const impactItems = [
  {
    title: "A maioria das empresas acha que está vendendo mal... quando na verdade está só desorganizada.",
    subtitle: "A maioria das empresas não sabe disso e perde vendas todos os dias por isso.",
    illustration: "lost-sales",
  },
  {
    title: "Você conversa... mas não converte.",
    subtitle: "Sem sequência, boas conversas esfriam antes de virar venda.",
    illustration: "many-touches",
  },
  {
    title: "Você não perde vendas porque não sabe vender. Você perde porque não acompanha.",
    subtitle: "Quem sabe quando voltar a falar com cada cliente, vende. Quem esquece... perde.",
    illustration: "follow-up-reminder",
  },
  {
    title: "Já tentei CRM e não funcionou...",
    subtitle:
      "O problema não é você. É que essas ferramentas foram feitas pra empresas grandes. Não pra quem vende no WhatsApp, no dia a dia real.",
    illustration: "wrong-crm",
  },
  {
    title: "O Converto organiza seu WhatsApp sem mudar sua rotina.",
    subtitle: "Cada conversa vira uma oportunidade. Você vê:",
    points: ["em que etapa está", "quem precisa de resposta", "quem está parado"],
    illustration: "converto-flow",
  },
] as const

type Illustration = (typeof impactItems)[number]["illustration"]

const IllustrationFrame = ({ children }: { children: ReactNode }) => (
  <div className="relative min-h-56 overflow-hidden rounded-lg border border-emerald-200/80 bg-white p-5 shadow-sm sm:min-h-64 sm:p-6">
    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-600 via-emerald-400 to-emerald-600" />
    {children}
  </div>
)

const LostSalesIllustration = () => (
  <IllustrationFrame>
    <div className="flex h-full min-h-48 flex-col justify-between gap-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-5xl font-bold leading-none text-emerald-700 sm:text-6xl">+70%</div>
          <p className="mt-2 max-w-52 text-sm font-medium leading-snug text-muted-foreground">
            das vendas se perdem por falta de acompanhamento
          </p>
        </div>
        <div className="rounded-lg border border-red-100 bg-red-50 p-3 text-red-500">
          <TrendingDown className="h-7 w-7" aria-hidden="true" />
        </div>
      </div>

      <div className="flex items-end gap-2">
        {[72, 54, 39, 24].map((height, index) => (
          <div key={height} className="flex flex-1 flex-col items-center gap-2">
            <div
              className={`w-full rounded-sm ${
                index === 0 ? "bg-emerald-600" : index === 1 ? "bg-emerald-400" : "bg-emerald-200"
              }`}
              style={{ height }}
            />
            <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
          </div>
        ))}
        <div className="mb-8 flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
          <BellRing className="h-5 w-5" aria-hidden="true" />
        </div>
      </div>
    </div>
  </IllustrationFrame>
)

const ManyTouchesIllustration = () => (
  <IllustrationFrame>
    <div className="flex h-full min-h-48 flex-col justify-between gap-6">
      <div className="flex items-center justify-between gap-3">
        <div className="rounded-lg bg-emerald-50 p-3 text-emerald-700">
          <MessagesSquare className="h-7 w-7" aria-hidden="true" />
        </div>
        <div className="rounded-lg border border-emerald-200 px-3 py-2 text-sm font-bold text-emerald-700">80%</div>
      </div>

      <div className="relative">
        <div className="absolute left-4 right-4 top-1/2 h-px -translate-y-1/2 bg-emerald-200" />
        <div className="relative grid grid-cols-4 gap-2">
          {["1", "2", "3", "4+"].map((step, index) => (
            <div key={step} className="flex flex-col items-center gap-2">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-lg border text-sm font-bold ${
                  index < 3
                    ? "border-emerald-200 bg-white text-emerald-700"
                    : "border-emerald-600 bg-emerald-600 text-white"
                }`}
              >
                {step}
              </div>
              <MessageCircle className="h-4 w-4 text-emerald-600" aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>

      <p className="text-sm font-medium leading-snug text-muted-foreground">
        dos clientes compram só depois de vários contatos, e a maioria nunca recebe retorno.
      </p>
    </div>
  </IllustrationFrame>
)

const FollowUpReminderIllustration = () => (
  <IllustrationFrame>
    <div className="flex h-full min-h-48 flex-col justify-between gap-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-600 text-white">
            <BellRing className="h-6 w-6" aria-hidden="true" />
          </div>
          <div>
            <div className="text-sm font-bold uppercase tracking-normal text-emerald-700">Próximo contato</div>
            <p className="text-sm font-medium text-muted-foreground">ninguém fica esquecido</p>
          </div>
        </div>
        <Clock3 className="h-8 w-8 text-emerald-600" aria-hidden="true" />
      </div>

      <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-3">
        {[
          ["Hoje", "Responder proposta"],
          ["Amanhã", "Retomar orçamento"],
          ["Sexta", "Chamar cliente parado"],
        ].map(([when, label], index) => (
          <div key={when} className="contents">
            <div className="rounded-sm bg-emerald-50 px-2 py-1 text-xs font-bold text-emerald-700">{when}</div>
            <div className="flex items-center gap-2 rounded-lg border border-emerald-100 bg-emerald-50/60 px-3 py-2 text-sm font-medium text-foreground">
              {index === 0 ? (
                <BellRing className="h-4 w-4 text-emerald-700" aria-hidden="true" />
              ) : index === 2 ? (
                <CheckCircle2 className="h-4 w-4 text-emerald-700" aria-hidden="true" />
              ) : (
                <MessageCircle className="h-4 w-4 text-emerald-700" aria-hidden="true" />
              )}
              {label}
            </div>
          </div>
        ))}
      </div>

      <p className="text-sm font-medium leading-snug text-muted-foreground">
        O importante não é correr. É saber quem precisa de retorno no momento certo.
      </p>
    </div>
  </IllustrationFrame>
)

const WrongCrmIllustration = () => (
  <IllustrationFrame>
    <div className="flex h-full min-h-48 flex-col justify-between gap-5">
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-slate-500">
          <Table2 className="mx-auto h-7 w-7" aria-hidden="true" />
          <div className="mt-3 space-y-1.5">
            <span className="block h-1.5 rounded-full bg-slate-200" />
            <span className="block h-1.5 w-2/3 rounded-full bg-slate-200" />
            <span className="block h-1.5 w-5/6 rounded-full bg-slate-200" />
          </div>
        </div>
        <div className="text-xs font-bold uppercase tracking-normal text-muted-foreground">vs</div>
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-emerald-700">
          <Smartphone className="mx-auto h-7 w-7" aria-hidden="true" />
          <div className="mt-3 space-y-2">
            <span className="ml-auto block h-5 w-4/5 rounded-lg rounded-br-sm bg-emerald-600" />
            <span className="block h-5 w-3/4 rounded-lg rounded-bl-sm bg-white" />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 rounded-lg border border-emerald-100 bg-white px-3 py-3">
        <TimerReset className="h-5 w-5 shrink-0 text-emerald-700" aria-hidden="true" />
        <p className="text-sm font-medium leading-snug text-muted-foreground">
          Simples para a rotina real de quem vende no WhatsApp todos os dias.
        </p>
      </div>
    </div>
  </IllustrationFrame>
)

const ConvertoFlowIllustration = () => (
  <IllustrationFrame>
    <div className="flex h-full min-h-48 flex-col justify-between gap-5">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-600 text-white">
            <KanbanSquare className="h-6 w-6" aria-hidden="true" />
          </div>
          <div>
            <div className="text-sm font-bold uppercase tracking-normal text-emerald-700">Converto</div>
            <p className="text-sm text-muted-foreground">WhatsApp organizado</p>
          </div>
        </div>
        <MousePointerClick className="h-6 w-6 text-emerald-700" aria-hidden="true" />
      </div>

      <div className="grid grid-cols-3 gap-2">
        {[
          ["Novo", UsersRound],
          ["Responder", BellRing],
          ["Parado", Clock3],
        ].map(([label, Icon]) => (
          <div key={label as string} className="rounded-lg border border-emerald-100 bg-emerald-50/70 p-3">
            <Icon className="mb-3 h-5 w-5 text-emerald-700" aria-hidden="true" />
            <span className="block text-xs font-bold leading-tight text-emerald-900">{label as string}</span>
          </div>
        ))}
      </div>

      <p className="text-sm font-medium leading-snug text-muted-foreground">
        Sem planilha. Sem sistema complexo. Sem sair do WhatsApp.
      </p>
    </div>
  </IllustrationFrame>
)

const renderIllustration = (illustration: Illustration) => {
  if (illustration === "lost-sales") return <LostSalesIllustration />
  if (illustration === "many-touches") return <ManyTouchesIllustration />
  if (illustration === "follow-up-reminder") return <FollowUpReminderIllustration />
  if (illustration === "wrong-crm") return <WrongCrmIllustration />
  return <ConvertoFlowIllustration />
}

export default function ImpactoInicial() {
  return (
    <section
      id="impacto-inicial"
      className="relative overflow-hidden bg-gradient-to-br from-background via-emerald-50/40 to-background px-4 py-16 sm:py-20"
    >
      <div className="absolute inset-0 pointer-events-none">
        <MessageCircle className="absolute left-4 top-10 h-16 w-16 text-emerald-600/5 sm:left-12 sm:h-24 sm:w-24" />
        <BellRing className="absolute bottom-20 right-6 h-20 w-20 text-emerald-600/5 sm:right-14 sm:h-28 sm:w-28" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-14">
          <p className="mb-3 text-sm font-bold uppercase tracking-normal text-emerald-700">
            O problema aparece antes da venda
          </p>
          <h2 className="text-3xl font-bold leading-tight text-foreground sm:text-4xl md:text-5xl">
            O WhatsApp vende muito. A desorganização vende contra você.
          </h2>
        </div>

        <div className="space-y-5 sm:space-y-6">
          {impactItems.map((item, index) => (
            <article
              key={item.title}
              className="grid gap-5 rounded-lg border border-emerald-200/70 bg-background/95 p-4 shadow-sm sm:p-6 lg:grid-cols-2 lg:items-center lg:gap-8"
            >
              <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-sm font-bold text-emerald-700">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <h3 className="text-2xl font-bold leading-tight text-foreground sm:text-3xl">{item.title}</h3>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">{item.subtitle}</p>
                {"points" in item ? (
                  <ul className="mt-4 grid gap-2 text-base font-medium text-emerald-800 sm:text-lg">
                    {item.points.map((point) => (
                      <li key={point} className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-700" aria-hidden="true" />
                        {point}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>

              <div className={index % 2 === 1 ? "lg:order-1" : ""}>{renderIllustration(item.illustration)}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
