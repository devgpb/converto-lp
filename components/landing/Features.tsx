"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"
import { FEATURES } from "@/lib/constants"

export default function Features() {
  const features = FEATURES

  return (
    <section id="recursos" className="py-5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">Organize, Controle e Nunca Mais Perca Uma Venda</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Tudo que você precisa para manter sua equipe organizada e seus resultados sob controle. Tecnologia que
            trabalha 24/7 para você não perder nenhuma oportunidade.
          </p>
        </div>

        {/* <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-xl transition-all duration-500 hover:scale-105 animate-fade-in-up" style={{ animationDelay: `${index * 200}ms` }}>
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
        </div> */}
      </div>
    </section>
  )
}
