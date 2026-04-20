"use client"

import { useEffect, useRef } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import { trackHomeEventOnce } from "@/lib/lp-tracking"
import { scrollToSection } from "@/lib/utils"
import Image from 'next/image'
import { GearBackgroundDiv } from "../gear-background-div"

const HERO_VIDEO_ID = "6BwRz-BKDNI"
const YOUTUBE_IFRAME_API_SRC = "https://www.youtube.com/iframe_api"
const YOUTUBE_PLAYER_STATE_PLAYING = 1
const HERO_TITLE = "Você está perdendo vendas no WhatsApp todos os dias"
const HERO_TITLE_WORDS = HERO_TITLE.split(" ")

type YouTubePlayerEvent = {
  data: number
}

type YouTubePlayer = {
  destroy: () => void
}

type YouTubePlayerConstructor = new (
  element: HTMLIFrameElement,
  options: {
    events: {
      onStateChange: (event: YouTubePlayerEvent) => void
    }
  }
) => YouTubePlayer

declare global {
  interface Window {
    YT?: {
      Player?: YouTubePlayerConstructor
    }
    onYouTubeIframeAPIReady?: () => void
  }
}

export default function Hero() {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const playerRef = useRef<YouTubePlayer | null>(null)

  useEffect(() => {
    let isMounted = true

    const trackVideoPlay = () => {
      trackHomeEventOnce(
        {
          eventName: "video_play",
          section: "hero",
          videoId: HERO_VIDEO_ID,
          metadata: {
            video_provider: "youtube",
          },
        },
        `video:${HERO_VIDEO_ID}:play`
      )
    }

    const setupPlayer = () => {
      const Player = window.YT?.Player
      if (!isMounted || !iframeRef.current || !Player || playerRef.current) return

      playerRef.current = new Player(iframeRef.current, {
        events: {
          onStateChange: (event) => {
            if (event.data === YOUTUBE_PLAYER_STATE_PLAYING) {
              trackVideoPlay()
            }
          },
        },
      })
    }

    if (window.YT?.Player) {
      setupPlayer()
    } else {
      const previousReady = window.onYouTubeIframeAPIReady
      window.onYouTubeIframeAPIReady = () => {
        previousReady?.()
        setupPlayer()
      }

      if (!document.querySelector(`script[src="${YOUTUBE_IFRAME_API_SRC}"]`)) {
        const script = document.createElement("script")
        script.src = YOUTUBE_IFRAME_API_SRC
        script.async = true
        document.body.appendChild(script)
      }
    }

    return () => {
      isMounted = false
      playerRef.current?.destroy()
      playerRef.current = null
    }
  }, [])

  return (
    <section id="hero" className="bg-gradient-to-br from-background to-muted/20 ">
      <GearBackgroundDiv corner="bottom-left" size="large">
      <GearBackgroundDiv corner="top-right" size="large" className="py-20 lg:py-32  container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
         

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 animate-fade-in-up">
            <span className="sr-only">{HERO_TITLE}</span>
            <span className="hero-title-color-cycle" aria-hidden="true">
              {HERO_TITLE_WORDS.map((word, wordIndex) => {
                const delayOffset =
                  HERO_TITLE_WORDS.slice(0, wordIndex).reduce((total, currentWord) => total + currentWord.length, 0) +
                  wordIndex

                return (
                  <span key={`${word}-${wordIndex}`} className="hero-title-word">
                    {Array.from(word).map((character, characterIndex) => (
                      <span
                        key={`${character}-${wordIndex}-${characterIndex}`}
                        className="hero-title-letter"
                        style={{ animationDelay: `${(delayOffset + characterIndex) * 0.05}s` }}
                      >
                        {character}
                      </span>
                    ))}
                    {wordIndex < HERO_TITLE_WORDS.length - 1 ? (
                      <span className="hero-title-space" aria-hidden="true">
                        {"\u00A0"}
                      </span>
                    ) : null}
                  </span>
                )
              })}
            </span>
          </h1>

          <Badge
            variant="secondary"
            className="mb-6 animate-fade-in-up bg-primary/10 text-primary border-primary/20"
          >
            E o pior: você nem sabe quais clientes ficaram sem resposta
          </Badge>
          

          {/* <div className="mx-auto mb-12 w-full max-w-4xl animate-fade-in-up">
            <div className="overflow-hidden rounded-lg border border-border bg-black shadow-2xl">
              <iframe
                ref={iframeRef}
                className="aspect-video w-full"
                src={`https://www.youtube.com/embed/${HERO_VIDEO_ID}?enablejsapi=1&rel=0&modestbranding=1`}
                title="Demonstração do Converto no WhatsApp Web"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div> */}

           

          {/* <p className={`text-xl text-muted-foreground mb-8 max-w-3xl mx-auto transition-all duration-1000 delay-400 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
            Organize conversas, prazos e follow-ups no canal que você já usa. Nada de implantação demorada ou ferramentas complicadas — só visibilidade diária de quem está comprando e quem precisa de retorno.
          </p> */}

          <div className="flex flex-col gap-6 justify-center items-center mb-12 animate-fade-in-up">
            {/* <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-lg px-10 py-6 shadow-2xl hover:shadow-primary/25 transition-all duration-300 hover:scale-105"
              onClick={() => scrollToSection("precos")}
            >
              Começar grátis por 7 dias
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button> */}
           
          

          <div className="flex flex-wrap items-center justify-center gap-4 max-w-3xl mx-auto animate-fade-in-up">
            <div className="inline-flex items-center justify-center gap-2 rounded-lg bg-muted/30 px-4 py-3">
              <CheckCircle className="h-5 w-5 shrink-0 text-primary" />
              <div className="text-sm text-muted-foreground">Veja o vídeo e descubra</div>
            </div>

          </div>

           <Button
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary/10 text-lg px-10 py-6"
              onClick={() => {
                trackHomeEventOnce(
                  {
                    eventName: "cta_click",
                    section: "hero",
                    ctaId: "hero_saber_mais",
                    metadata: { destination_section: "impacto_inicial" },
                  },
                  "cta:hero_saber_mais"
                )
                scrollToSection("impacto-inicial")
              }}
            >
              SABER MAIS
            </Button>
          </div>

        </div>
      </GearBackgroundDiv>
      </GearBackgroundDiv>
    </section>
  )
}
