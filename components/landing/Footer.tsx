import Image from "next/image"
import { Mail } from "lucide-react"
import { FaWhatsapp } from "react-icons/fa"
import { Button } from "@/components/ui/button"
import { CONTACT_INFO } from "@/lib/constants"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative z-10 bg-muted/30 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="mb-4 flex items-center space-x-3">
              <Image src="/logo-c.svg" alt="Converto Logo" width={32} height={32} className="rounded-lg" />
              <span className="text-lg font-bold">Converto</span>
            </div>
            <p className="mb-4 text-muted-foreground">A plataforma que transforma leads em vendas garantidas.</p>
            <div className="flex space-x-4">
              <Button variant="outline" size="sm" className="bg-transparent" asChild>
                <a
                  href={CONTACT_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Falar no WhatsApp"
                  className="flex items-center"
                >
                  <FaWhatsapp className="mr-2 text-[#25D366]" size={16} />
                  {CONTACT_INFO.phoneDisplay}
                </a>
              </Button>
            </div>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">Produto</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="/blog" className="transition-colors hover:text-foreground">Blog</a></li>
              <li><a href="#recursos" className="transition-colors hover:text-foreground">Recursos</a></li>
              <li><a href="#beneficios" className="transition-colors hover:text-foreground">Beneficios</a></li>
              <li><a href="#faq" className="transition-colors hover:text-foreground">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">Suporte & Legal</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <a
                  href="https://www.youtube.com/@ConvertoCRM"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-foreground"
                >
                  Treinamentos em video
                </a>
              </li>
              <li><a href="#faq" className="transition-colors hover:text-foreground">Suporte e contato</a></li>
              <li><a href="/politica-de-privacidade" className="transition-colors hover:text-foreground">Politica de Privacidade</a></li>
              <li><a href="/termos-de-uso" className="transition-colors hover:text-foreground">Termos de Uso</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between border-t pt-8 text-muted-foreground md:flex-row">
          <p>&copy; {currentYear} Converto. Todos os direitos reservados.</p>
          <div className="mt-4 flex items-center space-x-4 md:mt-0">
            <Mail className="h-4 w-4" />
            <span>{CONTACT_INFO.email}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
