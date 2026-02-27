"use client"

import Image from "next/image"
import { CONTACT_INFO } from "@/lib/constants"
import { Button } from "@/components/ui/button"
import { Mail } from "lucide-react"
import { FaWhatsapp } from "react-icons/fa"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-12 bg-muted/30 relative z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <Image src="/logo-c.svg" alt="Converto Logo" width={32} height={32} className="rounded-lg" />
              <span className="text-lg font-bold">Converto</span>
            </div>
            <p className="text-muted-foreground mb-4">A plataforma que transforma leads em vendas garantidas.</p>
            <div className="flex space-x-4">
              <Button variant="outline" size="sm" className="bg-transparent" asChild>
                <a
                  href={CONTACT_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Falar no WhatsApp"
                  className="flex items-center"
                >
                  <FaWhatsapp className="text-[#25D366] mr-2" size={16} />
                  {CONTACT_INFO.phoneDisplay}
                </a>
              </Button>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Produto</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="/blog" className="hover:text-foreground transition-colors">Blog</a></li>
              <li><a href="#recursos" className="hover:text-foreground transition-colors">Recursos</a></li>
              <li><a href="#beneficios" className="hover:text-foreground transition-colors">Benefícios</a></li>
              <li><a href="#faq" className="hover:text-foreground transition-colors">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Suporte & Legal</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <a
                  href="https://www.youtube.com/@ConvertoCRM"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  Treinamentos em vídeo
                </a>
              </li>
              <li><a href="#faq" className="hover:text-foreground transition-colors">Suporte e contato</a></li>
              <li><a href="/politica-de-privacidade" className="hover:text-foreground transition-colors">Política de Privacidade</a></li>
              <li><a href="/termos-de-uso" className="hover:text-foreground transition-colors">Termos de Uso</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-muted-foreground">
          <p>&copy; {currentYear} Converto. Todos os direitos reservados.</p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <Mail className="h-4 w-4" />
            <span>{CONTACT_INFO.email}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
