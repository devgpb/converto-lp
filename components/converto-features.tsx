"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MessageSquare, Users, Calendar, BarChart3, CheckCircle, Zap, Chrome, Database, Bell } from "lucide-react"

export default function ConvertoFeatures() {
  const [activeFeature, setActiveFeature] = useState(0)

  const features = [
    {
      icon: <Chrome className="w-8 h-8" />,
      title: "Extensão Inteligente",
      subtitle: "Sidebar no WhatsApp",
      description:
        "Transforme seu WhatsApp em uma central de vendas com nossa extensão que adiciona uma sidebar inteligente para cada contato.",
      benefits: ["Instalação em 1 clique", "Interface nativa", "Sincronização automática"],
      color: "from-emerald-500 to-teal-500",
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: "Dados Organizados",
      subtitle: "Anotações Inteligentes",
      description: "Guarde informações importantes de cada cliente com sistema de permissões e organização automática.",
      benefits: ["Histórico completo", "Busca avançada", "Backup automático"],
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Eventos & Lembretes",
      subtitle: "Nunca Perca um Follow-up",
      description: "Marque eventos importantes que aparecem diretamente no menu do WhatsApp para cada contato.",
      benefits: ["Lembretes automáticos", "Agenda integrada", "Notificações smart"],
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Relatórios Corporativos",
      subtitle: "Visão 360° do Negócio",
      description: "Sistema completo de relatórios, filtragem e acompanhamento em tempo real de cada cliente.",
      benefits: ["Dashboards em tempo real", "Métricas de conversão"],
      color: "from-orange-500 to-red-500",
    },
  ]

  return (
    <section className="w-full py-20 px-4 bg-gradient-to-br from-background via-muted/30 to-background relative overflow-hidden">
      {/* Background Elements */}
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
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <Badge className="mb-4 bg-primary text-primary-foreground border-primary/20 hover:bg-primary/90">
            <Zap className="w-4 h-4 mr-2" />
            CRM + WhatsApp = Vendas Turbinadas
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text text-balance">
            Quais são as vantagens do Converto?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            A única solução que integra perfeitamente seu WhatsApp com um CRM poderoso, sem complicação e com resultados
            imediatos.
          </p>
        </div>

        {/* Features Grid */}
        <div className="w-full">
          {/* Feature Cards */}
          <div className="flex flex-col md:flex-row md:flex-wrap gap-4 w-full justify-center">
            {features.map((feature, index) => (
              <Card
                key={index}
                className={`cursor-pointer transition-all duration-300 hover-lift w-full md:flex-1 ${
                  activeFeature === index ? "ring-2 ring-primary shadow-lg border-primary" : "hover:bg-muted/50"
                }`}
                onClick={() => setActiveFeature(index)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${feature.color} text-white feature-icon`}>
                      {feature.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-semibold text-foreground">{feature.title}</h3>
                        <Badge variant="secondary" className="text-xs">
                          {feature.subtitle}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground mb-4 text-pretty">{feature.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {feature.benefits.map((benefit, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            {benefit}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
         
        </div>

       
      </div>
    </section>
  )
}
