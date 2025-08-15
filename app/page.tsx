"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import {
  CheckCircle,
  Calendar,
  Users,
  BarChart3,
  Shield,
  Zap,
  Star,
  ArrowRight,
  Menu,
  X,
  Target,
  Mail,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import Image from "next/image"

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [documentHeight, setDocumentHeight] = useState(0)
  const [currentSlide, setCurrentSlide] = useState(0)

  const galleryImages = [
    {
      src: "/crm-sales-dashboard.png",
      alt: "Dashboard de Vendas do Convertor",
      title: "Dashboard Completo",
      description: "Visualize todos os seus resultados em tempo real",
    },
    {
      src: "/mobile-crm-app.png",
      alt: "App Mobile do Convertor",
      title: "App Mobile",
      description: "Acesse de qualquer lugar, a qualquer momento",
    },
    {
      src: "/tablet-crm-calendario-reunioes.png",
      alt: "Calendário de Reuniões no Tablet",
      title: "Calendário Inteligente",
      description: "Organize sua agenda e nunca perca uma reunião",
    },
  ]

  useEffect(() => {
    setIsVisible(true)

    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const updateDocumentHeight = () => {
      setDocumentHeight(document.documentElement.scrollHeight - window.innerHeight)
    }

    updateDocumentHeight()
    window.addEventListener("resize", updateDocumentHeight)

    return () => window.removeEventListener("resize", updateDocumentHeight)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % galleryImages.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
  }

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000)
    return () => clearInterval(interval)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setIsMenuOpen(false)
    }
  }

  return (
    <div className="min-h-screen bg-background relative">
      <div className="fixed top-20 right-4 md:right-6 lg:right-8 z-30 pointer-events-none">
        <div
          className="transition-transform duration-100 ease-out"
          style={{
            transform: `translateY(${documentHeight > 0 ? (scrollY / documentHeight) * (window.innerHeight - 160) : 0}px) rotate(${scrollY * 0.5}deg)`,
          }}
        >
          <div className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 drop-shadow-lg">
            <svg viewBox="0 0 24 24" className="w-full h-full">
              <path
                d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.22,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.22,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.68 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z"
                fill="#22c55e"
                stroke="#ffffff"
                strokeWidth="0.5"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <Image src="/logo-c.svg" alt="Convertor Logo" width={40} height={40} className="rounded-lg" />
              <span className="text-xl font-bold text-foreground">Conversor</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => scrollToSection("recursos")}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Recursos
              </button>
              <button
                onClick={() => scrollToSection("galeria")}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Galeria
              </button>
              <button
                onClick={() => scrollToSection("beneficios")}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Benefícios
              </button>
              <button
                onClick={() => scrollToSection("precos")}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Preços
              </button>
              <button
                onClick={() => scrollToSection("faq")}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                FAQ
              </button>
              <Button size="sm" className="bg-primary hover:bg-primary/90">
                Comprar Agora
              </Button>
            </nav>

            {/* Mobile Menu Button */}
            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t animate-fade-in">
              <nav className="flex flex-col space-y-4">
                <button
                  onClick={() => scrollToSection("recursos")}
                  className="text-muted-foreground hover:text-foreground transition-colors text-left"
                >
                  Recursos
                </button>
                <button
                  onClick={() => scrollToSection("galeria")}
                  className="text-muted-foreground hover:text-foreground transition-colors text-left"
                >
                  Galeria
                </button>
                <button
                  onClick={() => scrollToSection("beneficios")}
                  className="text-muted-foreground hover:text-foreground transition-colors text-left"
                >
                  Benefícios
                </button>
                <button
                  onClick={() => scrollToSection("precos")}
                  className="text-muted-foreground hover:text-foreground transition-colors text-left"
                >
                  Preços
                </button>
                <button
                  onClick={() => scrollToSection("faq")}
                  className="text-muted-foreground hover:text-foreground transition-colors text-left"
                >
                  FAQ
                </button>
                <div className="pt-4">
                  <Button size="sm" className="bg-primary hover:bg-primary/90 w-full">
                    Comprar Agora
                  </Button>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-background to-muted/20 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Badge
              variant="secondary"
              className={`mb-6 transition-all duration-1000 ${isVisible ? "animate-bounce" : "opacity-0"} bg-primary/10 text-primary border-primary/20`}
            >
              📢 Novo: Integração com WhatsApp disponível
            </Badge>

            <h1
              className={`text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 transition-all duration-1000 delay-200 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
            >
              Organize Sua Equipe de Vendas e
              <span className="text-primary block mt-2 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Controle Cada Resultado
              </span>
            </h1>

            <p
              className={`text-xl text-muted-foreground mb-8 max-w-3xl mx-auto transition-all duration-1000 delay-400 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
            >
              A ferramenta poderosa que vai finalmente organizar sua equipe de vendas e te manter de olho nos resultados
              sem perder nenhum contato. Aumente suas vendas em até <strong className="text-primary">300%</strong> com
              controle total do seu pipeline.
            </p>

            <div
              className={`flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 transition-all duration-1000 delay-600 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
            >
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-lg px-10 py-6 shadow-2xl hover:shadow-primary/25 transition-all duration-300 hover:scale-105"
                onClick={() => scrollToSection("precos")}
              >
                Comprar Agora
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>

            <div
              className={`grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto transition-all duration-1000 delay-800 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
            >
              <div className="flex items-center justify-center p-4 bg-muted/30 rounded-lg">
                <CheckCircle className="h-5 w-5 text-primary mr-2" />
                <div className="text-sm text-muted-foreground">Sem cartão de crédito</div>
              </div>
              <div className="flex items-center justify-center p-4 bg-muted/30 rounded-lg">
                <CheckCircle className="h-5 w-5 text-primary mr-2" />
                <div className="text-sm text-muted-foreground">Suporte 24/7</div>
              </div>
              <div className="flex items-center justify-center p-4 bg-muted/30 rounded-lg">
                <CheckCircle className="h-5 w-5 text-primary mr-2" />
                <div className="text-sm text-muted-foreground">Implementação rápida</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="galeria" className="py-20 bg-muted/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">Veja o Conversor em Ação</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Interface intuitiva que sua equipe vai amar usar. Disponível em desktop, tablet e mobile.
            </p>
          </div>

          <div className="max-w-6xl mx-auto relative">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-gradient-to-br from-primary/5 to-primary/10">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {galleryImages.map((image, index) => (
                  <div key={index} className="w-full flex-shrink-0 relative">
                    <div className="aspect-video relative bg-gradient-to-br from-muted/20 to-muted/40 flex items-center justify-center">
                      <Image
                        src={image.src || "/placeholder.svg"}
                        alt={image.alt}
                        fill
                        className="object-contain p-8"
                        priority={index === 0}
                      />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8">
                      <h3 className="text-2xl font-bold text-white mb-2">{image.title}</h3>
                      <p className="text-white/90 text-lg">{image.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Botões de navegação */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-primary rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-primary rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110"
              >
                <ChevronRight className="h-6 w-6" />
              </button>

              {/* Indicadores */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                {galleryImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide ? "bg-primary scale-125" : "bg-white/50 hover:bg-white/80"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Thumbnails para desktop */}
            <div className="hidden md:flex justify-center mt-8 space-x-4">
              {galleryImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`relative overflow-hidden rounded-lg transition-all duration-300 ${
                    index === currentSlide
                      ? "ring-4 ring-primary scale-105"
                      : "hover:scale-105 opacity-70 hover:opacity-100"
                  }`}
                >
                  <div className="w-24 h-16 bg-muted/20 flex items-center justify-center">
                    <Image
                      src={image.src || "/placeholder.svg"}
                      alt={image.alt}
                      width={96}
                      height={64}
                      className="object-contain"
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="recursos" className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
              Organize, Controle e Nunca Mais Perca Uma Venda
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Tudo que você precisa para manter sua equipe organizada e seus resultados sob controle. Tecnologia que
              trabalha 24/7 para você não perder nenhuma oportunidade.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Calendar,
                title: "Organização Total da Agenda",
                description:
                  "Mantenha toda sua equipe sincronizada com agendas inteligentes que evitam conflitos e otimizam cada horário para máxima produtividade",
                highlight: "Zero conflitos",
              },
              {
                icon: Users,
                title: "Controle Completo da Equipe",
                description:
                  "Acompanhe cada vendedor, monitore performance em tempo real e identifique exatamente onde estão as oportunidades de melhoria",
                highlight: "Visão 360°",
              },
              {
                icon: BarChart3,
                title: "Resultados Sempre à Vista",
                description:
                  "Dashboards que mostram exatamente como está sua operação: vendas, conversões, pipeline e performance individual de cada vendedor",
                highlight: "Controle total",
              },
              {
                icon: Target,
                title: "Nenhum Contato Perdido",
                description:
                  "Sistema inteligente que garante follow-up automático, lembretes precisos e acompanhamento de cada lead até o fechamento",
                highlight: "Zero perda",
              },
              {
                icon: Shield,
                title: "Dados Sempre Seguros",
                description:
                  "Toda informação da sua equipe protegida com segurança avançada, backup automático e acesso controlado por perfis",
                highlight: "100% seguro",
              },
              {
                icon: Zap,
                title: "Integração com Tudo",
                description:
                  "Conecte todas as ferramentas que sua equipe já usa: WhatsApp, email, calendários e mais de 500 integrações disponíveis",
                highlight: "500+ apps",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="hover:shadow-xl transition-all duration-500 hover:scale-105 animate-fade-in-up"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">"{feature.description}"</p>
                  <div className="border-t pt-4">
                    <p className="font-semibold text-primary">{feature.highlight}</p>
                    <p className="font-semibold mt-2">{feature.title}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="precos" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">Organize Sua Equipe Hoje Mesmo</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Escolha o plano ideal e tenha controle total dos seus resultados
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Plano Básico */}
            <Card className="relative animate-fade-in-up hover:shadow-2xl transition-all duration-500 hover:scale-105">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl mb-2">Plano Básico</CardTitle>
                <CardDescription className="text-lg">Ideal para pequenas empresas</CardDescription>
                <div className="mt-6">
                  <span className="text-5xl font-bold text-primary">R$ 97</span>
                  <span className="text-muted-foreground text-lg">/mês</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">ROI médio de 400% no primeiro mês</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                  <span>Até 1.000 contatos no CRM</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                  <span>Agendamento inteligente ilimitado</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                  <span>Automações básicas de follow-up</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                  <span>Relatórios essenciais em tempo real</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                  <span>Integração WhatsApp + Email</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                  <span>Suporte por email (24h)</span>
                </div>
                <Button
                  className="w-full mt-8 bg-transparent hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                  variant="outline"
                >
                  Começar Agora
                </Button>
              </CardContent>
            </Card>

            {/* Plano Premium */}
            <Card className="relative border-primary border-2 animate-fade-in-up animation-delay-200 hover:shadow-2xl transition-all duration-500 hover:scale-105">
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground px-6 py-1">
                🔥 Mais Vendido
              </Badge>
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl mb-2">Plano Premium</CardTitle>
                <CardDescription className="text-lg">Para empresas que querem dominar</CardDescription>
                <div className="mt-6">
                  <span className="text-5xl font-bold text-primary">R$ 197</span>
                  <span className="text-muted-foreground text-lg">/mês</span>
                </div>
                <p className="text-sm text-primary font-semibold mt-2">ROI médio de 800% no primeiro mês</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                  <span>
                    <strong>Contatos ilimitados</strong> no CRM
                  </span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                  <span>
                    <strong>IA avançada</strong> para scoring de leads
                  </span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                  <span>
                    <strong>Automações ilimitadas</strong> + sequências personalizadas
                  </span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                  <span>
                    <strong>Analytics preditivo</strong> com dashboards avançados
                  </span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                  <span>
                    <strong>500+ integrações</strong> disponíveis
                  </span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                  <span>
                    <strong>API completa</strong> para customizações
                  </span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                  <span>
                    <strong>Suporte VIP 24/7</strong> + gerente dedicado
                  </span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                  <span>
                    <strong>Treinamento personalizado</strong> + consultoria
                  </span>
                </div>
                <Button className="w-full mt-8 bg-primary hover:bg-primary/90 text-lg py-6 shadow-lg hover:shadow-primary/25 transition-all duration-300">
                  Começar Agora
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-6 text-lg">
              💳 <strong>Pagamento seguro</strong> • 🔒 <strong>Dados protegidos</strong> • 📞{" "}
              <strong>Suporte especializado</strong>
            </p>
            <Button variant="link" className="text-primary text-lg hover:underline">
              Precisa de um plano enterprise? Fale com nossos especialistas →
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">Perguntas Frequentes</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Tire todas as suas dúvidas sobre o Conversor
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem
                value="item-1"
                className="border rounded-lg px-6 hover:shadow-lg transition-all duration-300"
              >
                <AccordionTrigger className="text-left text-lg font-semibold">
                  Como o Conversor organiza minha equipe de vendas?
                </AccordionTrigger>
                <AccordionContent className="text-base leading-relaxed">
                  O Conversor centraliza toda operação de vendas: cada vendedor tem sua agenda otimizada, leads
                  distribuídos automaticamente, follow-ups programados e metas acompanhadas em tempo real. Você tem
                  visão completa de quem está fazendo o quê, quando e com quais resultados.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-2"
                className="border rounded-lg px-6 hover:shadow-lg transition-all duration-300"
              >
                <AccordionTrigger className="text-left text-lg font-semibold">
                  Como posso acompanhar os resultados da minha equipe?
                </AccordionTrigger>
                <AccordionContent className="text-base leading-relaxed">
                  Dashboards em tempo real mostram performance individual e coletiva: vendas por vendedor, taxa de
                  conversão, ticket médio, pipeline de cada um e metas vs resultados. Relatórios automáticos diários,
                  semanais e mensais para você sempre saber como está sua operação.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-3"
                className="border rounded-lg px-6 hover:shadow-lg transition-all duration-300"
              >
                <AccordionTrigger className="text-left text-lg font-semibold">
                  Como garantir que não vou perder nenhum contato?
                </AccordionTrigger>
                <AccordionContent className="text-base leading-relaxed">
                  Sistema inteligente de follow-up automático: lembretes personalizados, sequências de acompanhamento,
                  alertas quando leads ficam parados e redistribuição automática se necessário. Cada contato tem
                  histórico completo e próximos passos sempre definidos.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-4"
                className="border rounded-lg px-6 hover:shadow-lg transition-all duration-300"
              >
                <AccordionTrigger className="text-left text-lg font-semibold">
                  Minha equipe vai conseguir se organizar facilmente?
                </AccordionTrigger>
                <AccordionContent className="text-base leading-relaxed">
                  Interface intuitiva que qualquer vendedor aprende em minutos. Treinamento completo incluído, suporte
                  dedicado e implementação guiada. Em 24h sua equipe estará operando de forma organizada e produtiva.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-5"
                className="border rounded-lg px-6 hover:shadow-lg transition-all duration-300"
              >
                <AccordionTrigger className="text-left text-lg font-semibold">
                  Que tipo de suporte minha equipe terá?
                </AccordionTrigger>
                <AccordionContent className="text-base leading-relaxed">
                  Plano Básico: Suporte por email + treinamentos online. Plano Premium: Suporte VIP 24/7 + gerente
                  dedicado + treinamentos personalizados para sua equipe + consultoria mensal para otimizar resultados.
                  Acompanhamos sua equipe até o sucesso total.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-6"
                className="border rounded-lg px-6 hover:shadow-lg transition-all duration-300"
              >
                <AccordionTrigger className="text-left text-lg font-semibold">
                  Vocês garantem que vou ter mais controle dos resultados?
                </AccordionTrigger>
                <AccordionContent className="text-base leading-relaxed">
                  Sim! Garantimos que em 60 dias você terá controle total da sua operação: saberá exatamente quantas
                  vendas cada vendedor fez, onde estão as oportunidades e como melhorar. Se não conseguir organizar sua
                  equipe e ter visão clara dos resultados, devolvemos 100% do investimento.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-7"
                className="border rounded-lg px-6 hover:shadow-lg transition-all duration-300"
              >
                <AccordionTrigger className="text-left text-lg font-semibold">
                  Como funciona a organização automática da equipe?
                </AccordionTrigger>
                <AccordionContent className="text-base leading-relaxed">
                  O sistema distribui leads automaticamente baseado em perfil e disponibilidade, programa follow-ups
                  inteligentes, otimiza agendas para evitar conflitos, envia lembretes personalizados e gera relatórios
                  automáticos. É como ter um gerente de vendas digital organizando tudo 24/7.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/abstract-tech-pattern.png')] opacity-10"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">Pare de Perder Vendas por Desorganização</h2>
          <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
            Mais de 10.000 empresas já organizaram suas equipes e têm controle total dos resultados. Seja a próxima a
            dominar sua operação de vendas.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
            <Button
              size="lg"
              variant="secondary"
              className="text-lg px-12 py-6 shadow-2xl hover:shadow-white/25 transition-all duration-300 hover:scale-105"
              onClick={() => scrollToSection("precos")}
            >
              Começar Agora - R$ 97/mês
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-12 py-6 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent transition-all duration-300"
            >
              Falar com Especialista
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto text-sm opacity-90">
            <div>✅ Implementação em 24h</div>
            <div>✅ Suporte especializado</div>
            <div>✅ Garantia de resultados</div>
          </div>
        </div>
      </section>

      {/* Footer */}
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
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Sobre
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Cases de Sucesso
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Carreiras
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Contato
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Suporte</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Central de Ajuda
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Treinamentos
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Status do Sistema
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Política de Privacidade
                  </a>
                </li>
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
    </div>
  )
}
