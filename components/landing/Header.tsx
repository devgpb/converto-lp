"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { scrollToSection } from "@/lib/utils"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <Image src="/logo-c.svg" alt="Convertor Logo" width={40} height={40} className="rounded-lg" />
            <span className="text-xl font-bold text-foreground">Conversor</span>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            <button onClick={() => scrollToSection("recursos")} className="text-muted-foreground hover:text-foreground transition-colors">Recursos</button>
            <button onClick={() => scrollToSection("galeria")} className="text-muted-foreground hover:text-foreground transition-colors">Galeria</button>
            <button onClick={() => scrollToSection("recursos")} className="text-muted-foreground hover:text-foreground transition-colors">Benefícios</button>
            <button onClick={() => scrollToSection("precos")} className="text-muted-foreground hover:text-foreground transition-colors">Preços</button>
            <button onClick={() => scrollToSection("faq")} className="text-muted-foreground hover:text-foreground transition-colors">FAQ</button>
            <Button size="sm" className="bg-primary hover:bg-primary/90">Comprar Agora</Button>
          </nav>

          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t animate-fade-in">
            <nav className="flex flex-col space-y-4">
              <button onClick={() => { scrollToSection("recursos"); setIsMenuOpen(false) }} className="text-muted-foreground hover:text-foreground transition-colors text-left">Recursos</button>
              <button onClick={() => { scrollToSection("galeria"); setIsMenuOpen(false) }} className="text-muted-foreground hover:text-foreground transition-colors text-left">Galeria</button>
              <button onClick={() => { scrollToSection("recursos"); setIsMenuOpen(false) }} className="text-muted-foreground hover:text-foreground transition-colors text-left">Benefícios</button>
              <button onClick={() => { scrollToSection("precos"); setIsMenuOpen(false) }} className="text-muted-foreground hover:text-foreground transition-colors text-left">Preços</button>
              <button onClick={() => { scrollToSection("faq"); setIsMenuOpen(false) }} className="text-muted-foreground hover:text-foreground transition-colors text-left">FAQ</button>
              <div className="pt-4">
                <Button size="sm" className="bg-primary hover:bg-primary/90 w-full">Comprar Agora</Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

