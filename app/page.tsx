"use client"

import FloatingIndicator from "@/components/landing/FloatingIndicator"
import Header from "@/components/landing/Header"
import Hero from "@/components/landing/Hero"
import Gallery from "@/components/landing/Gallery"
import Features from "@/components/landing/Features"
import Planos from "@/components/landing/Planos"
import FAQ from "@/components/landing/FAQ"
import FinalCTA from "@/components/landing/FinalCTA"
import Footer from "@/components/landing/Footer"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background relative">
      <FloatingIndicator />
      <Header />
      <Hero />
      <Gallery />
      <Features />
      <Planos />
      <FAQ />
      <FinalCTA />
      <Footer />
    </div>
  )
}
