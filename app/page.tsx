"use client"

import FloatingIndicator from "@/components/landing/FloatingIndicator"
import Header from "@/components/landing/Header"
import Hero from "@/components/landing/Hero"
import Gallery from "@/components/landing/Gallery"
import ConvertoFeatures from "@/components/converto-features"
import Features from "@/components/landing/Features"
import Planos from "@/components/landing/Planos"
import FAQ from "@/components/landing/FAQ"
import FinalCTA from "@/components/landing/FinalCTA"
import Footer from "@/components/landing/Footer"
import Script from "next/script"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background relative">
      <Script id="ld-json-org" type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Converto',
            url: process.env.NEXT_PUBLIC_SITE_URL || 'https://converto-gilt.vercel.app',
            logo: (process.env.NEXT_PUBLIC_SITE_URL || 'https://converto-gilt.vercel.app') + '/logo.png',
            sameAs: [],
          }),
        }}
      />
      <Script id="ld-json-software" type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'Converto',
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Web',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'BRL' },
            description:
              'Sistema de gestão comercial simples para pequenas empresas que vendem pelo WhatsApp. Organiza negociações, follow-ups e histórico direto no WhatsApp, sem implantação complexa.',
            url: process.env.NEXT_PUBLIC_SITE_URL || 'https://converto-gilt.vercel.app',
          }),
        }}
      />
      <FloatingIndicator />
      <Header />
      <Hero />
      <ConvertoFeatures />
      <Gallery />
      <Features />
      <Planos />
      <FAQ />
      <FinalCTA />
      <Footer />
    </div>
  )
}
