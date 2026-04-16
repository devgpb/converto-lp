"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { BarChart3, Chrome, Cog, MessageSquare, Users, X, ZoomIn } from "lucide-react"
import { trackHomeEventOnce } from "@/lib/lp-tracking"
import { scrollToSection } from "@/lib/utils"
import { GearBackgroundDiv } from "./gear-background-div"

type FeatureImage = {
  src: string
  width: number
  height: number
}

type Feature = {
  id: string
  title: string
  subtitle: string
  image: FeatureImage
}

const features: Feature[] = [
  {
    id: "extensao_navegador",
    title: "Extensão de navegador",
    subtitle: "A principal funcionalidade conecta o WhatsApp Web ao Converto e centraliza a operação comercial.",
    image: { src: "/ext_whatss.png", width: 1920, height: 918 },
  },
  {
    id: "relatorio_vendas_tempo_real",
    title: "Relatório de vendas em tempo real",
    subtitle: "Acompanhe leads, atendimentos, eventos e fechamentos com dados atualizados durante o dia.",
    image: { src: "/crm-sales-dashboard.png", width: 1908, height: 913 },
  },
  {
    id: "funil_vendas_interativo",
    title: "Funil de vendas interativo",
    subtitle: "Organize cada cliente por etapa e veja onde as oportunidades avançam ou ficam paradas.",
    image: { src: "/listagem_clientes.png", width: 1903, height: 907 },
  },
  {
    id: "calendario_eventos",
    title: "Calendário de eventos",
    subtitle: "Visualize reuniões, retornos e compromissos comerciais em uma agenda simples para o time.",
    image: { src: "/tablet-crm-calendario-reunioes.png", width: 1024, height: 524 },
  },
  {
    id: "gerador_lista_ligacoes",
    title: "Gerador de lista de ligações",
    subtitle: "Monte listas de contatos por vendedor, cidade ou status para acelerar a rotina de chamadas.",
    image: { src: "/ligacoes.png", width: 1920, height: 926 },
  },
  {
    id: "cadastro_clientes",
    title: "Cadastro de clientes",
    subtitle: "Registre dados, origem, status e observações para manter o histórico comercial sempre acessível.",
    image: { src: "/listagem_clientes.png", width: 1903, height: 907 },
  },
  {
    id: "mensagens_padrao_whatsapp",
    title: "Mensagens padrão para WhatsApp",
    subtitle: "Crie respostas prontas para abordagens, follow-ups e confirmações sem perder o tom da equipe.",
    image: { src: "/ext_whatss.png", width: 1920, height: 918 },
  },
  {
    id: "administracao_usuarios",
    title: "Administração de usuários",
    subtitle: "Controle acessos, responsáveis e permissões para cada vendedor trabalhar com clareza.",
    image: { src: "/import.png", width: 1918, height: 921 },
  },
  {
    id: "cadastro_produtos",
    title: "Cadastro de produtos",
    subtitle: "Mantenha produtos e ofertas organizados para associar oportunidades ao que sua equipe vende.",
    image: { src: "/import.png", width: 1918, height: 921 },
  },
  {
    id: "relatorios_vendedores",
    title: "Relatórios de vendedores",
    subtitle: "Compare desempenho individual, atendimentos e evolução de carteira com visão para gestão.",
    image: { src: "/crm-sales-dashboard.png", width: 1908, height: 913 },
  },
  {
    id: "criacao_eventos_lembretes",
    title: "Criação de eventos e lembretes",
    subtitle: "Agende próximos passos e receba lembretes para nenhum cliente ficar sem retorno.",
    image: { src: "/tablet-crm-calendario-reunioes.png", width: 1024, height: 524 },
  },
]

export default function ConvertoFeatures() {
  const [zoomedFeature, setZoomedFeature] = useState<Feature | null>(null)

  useEffect(() => {
    if (!zoomedFeature) return

    const handlePopState = () => {
      setZoomedFeature(null)
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        window.history.back()
      }
    }

    document.body.style.overflow = "hidden"
    window.addEventListener("popstate", handlePopState)
    window.addEventListener("keydown", handleKeyDown)

    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("popstate", handlePopState)
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [zoomedFeature])

  const openZoom = (feature: Feature, index: number) => {
    trackHomeEventOnce(
      {
        eventName: "feature_zoom",
        section: "beneficios",
        metadata: {
          feature_id: feature.id,
          feature_title: feature.title,
          feature_index: index + 1,
          image_src: feature.image.src,
        },
      },
      `feature_zoom:${feature.id}`
    )
    setZoomedFeature(feature)
    window.history.pushState({ convertoFeatureZoom: feature.title }, "", window.location.href)
  }

  const closeZoom = () => {
    window.history.back()
  }

  return (
    <section
      id="beneficios"
      className="w-full px-4 py-16 sm:py-20 bg-gradient-to-br from-background via-muted/30 to-background relative overflow-hidden"
    >
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

        {/* <div className="text-center mb-12 sm:mb-16 animate-fade-in-up">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 gradient-text text-balance leading-tight">
            O que é o Converto?
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Uma integração completa como CRM integrado ao WhatsApp Web que funciona por um aplicativo principal acessível pela internet e uma extensão de navegador que permite conectar com o sistema principal. Centralizando todas as informações sem precisar de complexidade. Instalação em poucos cliques e sem travamentos.
          </p>
        </div> */}

        {/* Mais de 100 clientes */}
        {/* <div className="mx-auto w-full max-w-4xl">
          <Image
            src="/LP_Imagem_1.png"
            alt="Mais de 100 clientes em Pernambuco"
            width={1536}
            height={1024}
            sizes="100vw"
            className="h-auto w-full"
          />
        </div> */}

        <div className="mx-auto mb-12 flex max-w-3xl items-center justify-center gap-4 sm:mb-16">
          <div className="h-px flex-1 bg-emerald-300/80" />
          <Cog className="h-10 w-10 shrink-0 animate-spin-slower text-emerald-700 sm:h-12 sm:w-12" aria-hidden="true" />
          <div className="h-px flex-1 bg-emerald-300/80" />
        </div>

        <div className="text-center mb-10 sm:mb-14 animate-fade-in-up">
          <div className="mb-4 flex items-center justify-center gap-2 text-sm font-semibold uppercase text-emerald-700">
            <Chrome className="h-4 w-4" aria-hidden="true" />
            Funcionalidades
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 gradient-text text-balance leading-tight">
            Tudo que a equipe usa para vender no WhatsApp
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Recursos conectados para acompanhar clientes, organizar rotinas e medir resultados sem depender de planilhas paralelas.
          </p>
        </div>

        <GearBackgroundDiv corner="bottom-right" size="giant" className="w-full">
          <div className="space-y-8 sm:space-y-10">
            {features.map((feature, index) => {
              const imageFirstOnDesktop = index % 2 === 1

              return (
                <article
                  key={feature.title}
                  className="grid items-center gap-5 border-b border-emerald-200/70 pb-8 sm:gap-8 sm:pb-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]"
                >
                  <div className={imageFirstOnDesktop ? "lg:order-2" : undefined}>
                    <div className="mb-3 flex items-center gap-3 text-sm font-semibold text-emerald-700">
                      <span className="flex h-8 w-8 items-center justify-center rounded-md border border-emerald-200 bg-emerald-50 text-emerald-800">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span>Converto CRM</span>
                    </div>
                    <h3 className="text-2xl font-bold leading-tight text-foreground sm:text-3xl">
                      {feature.title}
                    </h3>
                    <p className="mt-3 text-base leading-relaxed text-muted-foreground sm:text-lg">
                      {feature.subtitle}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => openZoom(feature, index)}
                    className={`group relative block w-full overflow-hidden rounded-lg border border-emerald-200 bg-background shadow-sm transition duration-300 hover:border-emerald-400 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 ${
                      imageFirstOnDesktop ? "lg:order-1" : ""
                    }`}
                    aria-label={`Ampliar imagem de ${feature.title}`}
                  >
                    <Image
                      src={feature.image.src}
                      alt={feature.title}
                      width={feature.image.width}
                      height={feature.image.height}
                      sizes="(min-width: 1024px) 52vw, 100vw"
                      className="h-auto w-full"
                    />
                    <span className="absolute bottom-3 right-3 flex items-center gap-2 rounded-md bg-background/95 px-3 py-2 text-xs font-semibold text-emerald-800 shadow-sm transition group-hover:bg-emerald-50">
                      <ZoomIn className="h-4 w-4" aria-hidden="true" />
                      Ampliar
                    </span>
                  </button>
                </article>
              )
            })}
          </div>

          <div className="text-center mt-12">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground px-10 py-6 text-lg"
              onClick={() => {
                trackHomeEventOnce(
                  {
                    eventName: "cta_click",
                    section: "beneficios",
                    ctaId: "beneficios_comecar_gratis",
                    metadata: { destination_section: "precos" },
                  },
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

      {zoomedFeature ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-3 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={`Imagem ampliada de ${zoomedFeature.title}`}
          onClick={closeZoom}
        >
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation()
              closeZoom()
            }}
            className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-md bg-background text-foreground shadow-lg transition hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 sm:right-5 sm:top-5"
            aria-label="Fechar imagem ampliada"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
          <div className="w-full max-w-6xl" onClick={(event) => event.stopPropagation()}>
            <Image
              src={zoomedFeature.image.src}
              alt={zoomedFeature.title}
              width={zoomedFeature.image.width}
              height={zoomedFeature.image.height}
              sizes="100vw"
              className="max-h-[86vh] w-full rounded-lg object-contain"
              priority
            />
            <p className="mt-3 text-center text-sm font-medium text-white">
              {zoomedFeature.title}
            </p>
          </div>
        </div>
      ) : null}
    </section>
  )
}
