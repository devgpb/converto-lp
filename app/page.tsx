import type { Metadata } from "next"
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
import { CONTACT_INFO, PRICING_PLANS } from "@/lib/constants"

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://converto-gilt.vercel.app").replace(/\/$/, "")

const faqItems = [
  {
    question: "O Converto substitui o WhatsApp?",
    answer:
      "Não. Ele funciona junto com o WhatsApp Web, adicionando etapas, histórico e alertas de follow-up nas conversas que você já tem.",
  },
  {
    question: "Quanto tempo leva para começar?",
    answer:
      "Menos de 30 minutos. Instale a extensão, escolha as etapas do funil e já comece a mover conversas. Não precisa de treinamento técnico.",
  },
  {
    question: "E se minha equipe não usar?",
    answer:
      "O processo fica no próprio canal que eles já usam. Funil visual, alertas e listas deixam claro quem deve falar com quem, então a adoção acontece no primeiro dia.",
  },
  {
    question: "Preciso parar a operação para configurar?",
    answer:
      "Não. Você continua atendendo normalmente enquanto conecta o Converto. As conversas ativas já aparecem no funil.",
  },
  {
    question: "Como ficam os dados dos clientes?",
    answer:
      "Histórico, valores e anotações ficam salvos por cliente, com backup e acesso controlado. Se um vendedor sair, o gestor continua com todo o contexto.",
  },
  {
    question: "Como funciona o trial?",
    answer: "7 dias completos para testar com o time. A cobrança só começa depois da confirmação de continuação.",
  },
]

const parseBrlPrice = (price: string) => {
  const numeric = Number(price.replace(/[^\d,]/g, "").replace(".", "").replace(",", "."))
  return Number.isFinite(numeric) ? numeric : 0
}

export const metadata: Metadata = {
  title: "CRM para vendas no WhatsApp",
  description:
    "Controle suas vendas no WhatsApp com funil visual, follow-up automático e histórico por cliente. Teste grátis por 7 dias.",
  keywords: [
    "crm para whatsapp",
    "crm whatsapp",
    "follow-up whatsapp",
    "gestao de vendas whatsapp",
    "funil de vendas whatsapp",
    "organizar vendas no whatsapp",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    title: "Converto | CRM para vendas no WhatsApp",
    description:
      "Funil visual, follow-up automático e histórico por cliente no próprio WhatsApp. Comece com 7 dias grátis.",
    images: [
      {
        url: "/crm-sales-dashboard.png",
        width: 1200,
        height: 630,
        alt: "Dashboard do Converto com funil de vendas no WhatsApp",
      },
    ],
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Converto | CRM para vendas no WhatsApp",
    description:
      "Organize leads e follow-ups no WhatsApp com um CRM simples. Teste grátis por 7 dias.",
    images: ["/crm-sales-dashboard.png"],
  },
}

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Converto",
  url: siteUrl,
  logo: `${siteUrl}/logo.png`,
  sameAs: ["https://www.youtube.com/@ConvertoCRM"],
  email: CONTACT_INFO.email,
  telephone: `+${CONTACT_INFO.phoneE164}`,
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer support",
      telephone: `+${CONTACT_INFO.phoneE164}`,
      email: CONTACT_INFO.email,
      areaServed: "BR",
      availableLanguage: ["pt-BR"],
    },
  ],
}

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Converto",
  url: siteUrl,
  inLanguage: "pt-BR",
}

const softwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Converto",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description:
    "CRM para vendas no WhatsApp com funil visual, follow-ups automáticos e histórico centralizado por cliente.",
  url: siteUrl,
  offers: PRICING_PLANS.map((plan) => ({
    "@type": "Offer",
    name: plan.name,
    price: parseBrlPrice(plan.price),
    priceCurrency: "BRL",
    availability: "https://schema.org/InStock",
    url: `${siteUrl}/cadastro`,
  })),
}

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <FloatingIndicator />
      <Header />
      <main>
        <Hero />
        <ConvertoFeatures />
        <Gallery />
        <Features />
        <Planos />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  )
}
