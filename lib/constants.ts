import { Calendar, Users, BarChart3, Shield, Zap, Target } from "lucide-react"

export type GalleryImage = {
  src: string
  alt: string
  title: string
  description: string
}

export const GALLERY_IMAGES: GalleryImage[] = [
  {
    src: "/crm-sales-dashboard.png",
    alt: "Dashboard de Vendas do Converto",
    title: "Dashboard Completo",
    description: "Visualize todos os seus resultados em tempo real",
  },
  {
    src: "/listagem_clientes.png",
    alt: "Listagem de Clientes",
    title: "Listagem de Clientes",
    description: "Acesse de qualquer lugar, a qualquer momento",
  },
  
]

export type Feature = {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  highlight: string
}

export const FEATURES: Feature[] = [
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
    highlight: "Visão 360º",
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
]

export type PricingPlan = {
  name: string
  description: string
  price: string
  period: string
  roiNote?: string
  features: string[]
  ctaLabel: string
  featured?: boolean
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    name: "Plano Básico",
    description: "Ideal para pequenas empresas",
    price: "R$ 97",
    period: "/mês",
    roiNote: "ROI médio de 400% no primeiro mês",
    ctaLabel: "Começar Agora",
    features: [
      "Até 1.000 contatos no CRM",
      "Agendamento inteligente ilimitado",
      "Automações básicas de follow-up",
      "Relatórios essenciais em tempo real",
      "Integração WhatsApp + Email",
      "Suporte por email (24h)",
    ],
  },
  {
    name: "Plano Premium",
    description: "Para empresas que querem dominar",
    price: "R$ 197",
    period: "/mês",
    roiNote: "ROI médio de 800% no primeiro mês",
    ctaLabel: "Começar Agora",
    featured: true,
    features: [
      "Contatos ilimitados no CRM",
      "IA avançada para scoring de leads",
      "Automações ilimitadas + sequências personalizadas",
      "Analytics preditivo com dashboards avançados",
      "500+ integrações disponíveis",
      "API completa para customizações",
      "Suporte VIP 24/7 + gerente dedicado",
      "Treinamento personalizado + consultoria",
    ],
  },
]


// Contact configuration
export const CONTACT_INFO = {
  phoneDisplay: "(87) 99135-8619",
  phoneE164: "5587991358619",
  email: "converto-contato@gmail.com",
  whatsappUrl: "https://wa.me/5587991358619",
}
