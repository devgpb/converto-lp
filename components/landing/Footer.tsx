"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Mail } from "lucide-react"

export default function Footer() {
  return (
    <footer className="py-12 bg-muted/30 relative z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <Image src="/logo-c.svg" alt="Convertor Logo" width={32} height={32} className="rounded-lg" />
              <span className="text-lg font-bold">Conversor</span>
            </div>
            <p className="text-muted-foreground mb-4">A plataforma que transforma leads em vendas garantidas.</p>
            <div className="flex space-x-4">
              <Button variant="outline" size="sm" className="flex items-center bg-transparent">
                <Image src="/whatsapp-icon.png" alt="WhatsApp" width={16} height={16} className="mr-2" />
                (11) 9999-9999
              </Button>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Empresa</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Sobre</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Cases de Sucesso</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Carreiras</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Contato</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Suporte</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Central de Ajuda</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Treinamentos</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Status do Sistema</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Política de Privacidade</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-muted-foreground">
          <p>&copy; 2025 Conversor. Todos os direitos reservados.</p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <Mail className="h-4 w-4" />
            <span>contato@conversor.com.br</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

