"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { trackHomeEventOnce } from "@/lib/lp-tracking"
// import { CORPORATE_ACCESS_URL } from "@/lib/constants"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navLinks = [
    { href: "/blog", label: "Blog" },
    { href: "#galeria", label: "Galeria" },
    { href: "#beneficios", label: "Benefícios" },
    { href: "#recursos", label: "Recursos" },
    { href: "#precos", label: "Preços" },
    { href: "#faq", label: "FAQ" },
  ]

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <Image src="/logo-c.svg" alt="Converto Logo" width={40} height={40} className="rounded-lg" />
            <span className="text-xl font-bold text-foreground">Converto</span>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
            {/* <Button variant="outline" size="sm" asChild>
              <a href={CORPORATE_ACCESS_URL} target="_blank" rel="noopener noreferrer">Acesso Corporativo</a>
            </Button> */}
            <Button size="sm" className="bg-primary hover:bg-primary/90" asChild>
              <a
                href="#precos"
                onClick={() =>
                  trackHomeEventOnce(
                    {
                      eventName: "cta_click",
                      section: "hero",
                      ctaId: "header_testar_gratis",
                      metadata: { destination_section: "precos" },
                    },
                    "cta:header_testar_gratis"
                  )
                }
              >
                Testar grátis
              </a>
            </Button>
          </nav>

          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

          {isMenuOpen && (
            <div className="md:hidden py-4 border-t animate-fade-in">
              <nav className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-muted-foreground hover:text-foreground transition-colors text-left"
                  >
                    {link.label}
                  </a>
                ))}
                <div className="pt-2">
                  {/* <Button variant="outline" size="sm" asChild className="w-full">
                    <a href={CORPORATE_ACCESS_URL} target="_blank" rel="noopener noreferrer">Acesso Corporativo</a>
                  </Button> */}
                </div>
                <div className="pt-4">
                  <Button size="sm" className="bg-primary hover:bg-primary/90 w-full" asChild>
                    <a
                      href="#precos"
                      onClick={() => {
                        trackHomeEventOnce(
                          {
                            eventName: "cta_click",
                            section: "hero",
                            ctaId: "mobile_header_testar_gratis",
                            metadata: { destination_section: "precos" },
                          },
                          "cta:mobile_header_testar_gratis"
                        )
                        setIsMenuOpen(false)
                      }}
                    >
                      Testar grátis
                    </a>
                  </Button>
                </div>
              </nav>
            </div>
          )}
      </div>
    </header>
  )
}
