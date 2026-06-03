import { CheckCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { GearBackgroundDiv } from "../gear-background-div"

const HERO_VIDEO_ID = "6BwRz-BKDNI"
const HERO_TITLE = "Voce esta perdendo vendas no WhatsApp todos os dias"
const HERO_TITLE_WORDS = HERO_TITLE.split(" ")

export default function Hero() {
  return (
    <section id="hero" className="bg-gradient-to-br from-background to-muted/20">
      <GearBackgroundDiv corner="bottom-left" size="large">
        <GearBackgroundDiv
          corner="top-right"
          size="large"
          className="container mx-auto px-4 py-20 sm:px-6 lg:px-8 lg:py-32"
        >
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-6 text-4xl font-bold text-foreground animate-fade-in-up sm:text-5xl lg:text-6xl">
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
              className="mb-6 border-primary/20 bg-primary/10 text-primary animate-fade-in-up"
            >
              E o pior: voce nem sabe quais clientes ficaram sem resposta
            </Badge>

            <div className="mx-auto mb-12 w-full max-w-4xl animate-fade-in-up">
              <div className="overflow-hidden rounded-lg border border-border bg-black shadow-2xl">
                <iframe
                  className="aspect-video w-full"
                  src={`https://www.youtube.com/embed/${HERO_VIDEO_ID}?rel=0&modestbranding=1`}
                  title="Demonstracao do Converto no WhatsApp Web"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>

            <div className="mb-12 flex flex-col items-center justify-center gap-6 animate-fade-in-up">
              <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-4">
                <div className="inline-flex items-center justify-center gap-2 rounded-lg bg-muted/30 px-4 py-3">
                  <CheckCircle className="h-5 w-5 shrink-0 text-primary" />
                  <div className="text-sm text-muted-foreground">Veja o video e descubra</div>
                </div>
              </div>

              <Button
                size="lg"
                variant="outline"
                className="border-primary px-10 py-6 text-lg text-primary hover:bg-primary/10"
                asChild
              >
                <a href="#impacto-inicial">SABER MAIS</a>
              </Button>
            </div>
          </div>
        </GearBackgroundDiv>
      </GearBackgroundDiv>
    </section>
  )
}
