"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { scrollToSection } from "@/lib/utils"
import { CORPORATE_ACCESS_URL } from "@/lib/constants"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <Image src="/logo-c.svg" alt="Converto Logo" width={40} height={40} className="rounded-lg" />
            <span className="text-xl font-bold text-foreground">Converto</span>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            <button onClick={() => scrollToSection("galeria")} className="text-muted-foreground hover:text-foreground transition-colors">Galeria</button>
            <button onClick={() => scrollToSection("beneficios")} className="text-muted-foreground hover:text-foreground transition-colors">Benefícios</button>
            <button onClick={() => scrollToSection("recursos")} className="text-muted-foreground hover:text-foreground transition-colors">Recursos</button>
            <button onClick={() => scrollToSection("precos")} className="text-muted-foreground hover:text-foreground transition-colors">Preços</button>
            <button onClick={() => scrollToSection("faq")} className="text-muted-foreground hover:text-foreground transition-colors">FAQ</button>
            <Button variant="outline" size="sm" asChild>
              <a href={CORPORATE_ACCESS_URL} target="_blank" rel="noopener noreferrer">Acesso Corporativo</a>
            </Button>
            <Button size="sm" className="bg-primary hover:bg-primary/90" onClick={() => scrollToSection("precos")}>
              Comprar Agora
            </Button>
          </nav>

          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

          {isMenuOpen && (
            <div className="md:hidden py-4 border-t animate-fade-in">
              <nav className="flex flex-col space-y-4">
                <button onClick={() => { scrollToSection("galeria"); setIsMenuOpen(false) }} className="text-muted-foreground hover:text-foreground transition-colors text-left">Galeria</button>
                <button onClick={() => { scrollToSection("beneficios"); setIsMenuOpen(false) }} className="text-muted-foreground hover:text-foreground transition-colors text-left">Benefícios</button>
                <button onClick={() => { scrollToSection("recursos"); setIsMenuOpen(false) }} className="text-muted-foreground hover:text-foreground transition-colors text-left">Recursos</button>
                <button onClick={() => { scrollToSection("precos"); setIsMenuOpen(false) }} className="text-muted-foreground hover:text-foreground transition-colors text-left">Preços</button>
                <button onClick={() => { scrollToSection("faq"); setIsMenuOpen(false) }} className="text-muted-foreground hover:text-foreground transition-colors text-left">FAQ</button>
                <div className="pt-2">
                  <Button variant="outline" size="sm" asChild className="w-full">
                    <a href={CORPORATE_ACCESS_URL} target="_blank" rel="noopener noreferrer">Acesso Corporativo</a>
                  </Button>
                </div>
                <div className="pt-4">
                  <Button size="sm" className="bg-primary hover:bg-primary/90 w-full" onClick={() => { scrollToSection("precos"); setIsMenuOpen(false) }}>
                    Comprar Agora
                  </Button>
                </div>
              </nav>
            </div>
          )}
      </div>
    </header>
  )
}
