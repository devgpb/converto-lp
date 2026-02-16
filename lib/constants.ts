import { Calendar, Users, BarChart3, Shield, Zap, Target } from "lucide-react"

export type GalleryImage = {
  src: string
  alt: string
  title: string
  description: string
  icon?: React.ComponentType<{ className?: string }>
}

export const GALLERY_IMAGES: GalleryImage[] = [
  {
    src: "/ext_whatss.png",
    alt: "Extensão para WhatsApp em tempo real",
    title: "WhatsApp conectado ao Converto",
    description:
      "Você continua atendendo no WhatsApp Web, mas agora cada conversa tem etapa, dono e histórico sem abrir outro sistema.",
    icon: Zap,
  },
  {
    src: "/import.png",
    alt: "Importe todos os seus clientes",
    title: "Traga sua base em minutos",
    description:
      "Importe contatos do WhatsApp, Excel ou Google Contacts com poucos cliques e comece a vender no mesmo dia.",
    icon: Users,
  },
  {
    src: "/ligacoes.png",
    alt: "Faça lista de clientes para contato com um clique",
    title: "Listas inteligentes de contato",
    description: "Monte filas de retorno e follow-up com um clique. Os vendedores sabem exatamente a próxima ligação.",
    icon: Target,
  },
  {
    src: "/crm-sales-dashboard.png",
    alt: "Dashboard de Vendas do Converto",
    title: "Dashboard que fecha vendas",
    description: "Quantos clientes em cada etapa, por vendedor e por origem. Visão simples para cobrar retorno e prever receita.",
    icon: BarChart3,
  },
  {
    src: "/listagem_clientes.png",
    alt: "Listagem de Clientes",
    title: "Clientes prontos para comprar",
    description: "Histórico, valor combinado e próximos passos ficam guardados no contato. Mesmo se trocar de vendedor, nada se perde.",
    icon: Users,
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
    title: "Agenda com follow-up certo",
    description: "Lembretes prontos no WhatsApp para retornar no dia certo. Sem cliente esquecido.",
    highlight: "Retorno pontual",
  },
  {
    icon: Users,
    title: "Controle simples da equipe",
    description: "Veja quem está cuidando de cada conversa e cobre retorno com base em dados, não em memória.",
    highlight: "Responsáveis claros",
  },
  {
    icon: BarChart3,
    title: "Indicadores sem planilha",
    description: "Visão rápida de quantos clientes por etapa e por vendedor. Previsibilidade mesmo com time pequeno.",
    highlight: "Carteira visível",
  },
  {
    icon: Target,
    title: "Zero clientes perdidos",
    description: "Alertas automáticos mostram quem precisa de contato hoje. O time não esquece mais ninguém.",
    highlight: "Follow-up certo",
  },
  {
    icon: Shield,
    title: "Histórico guardado",
    description: "Notas e valores ficam salvos por cliente, protegidos mesmo que o celular ou vendedor mude.",
    highlight: "Nada se perde",
  },
  {
    icon: Zap,
    title: "Rápido de colocar de pé",
    description: "Funciona direto no WhatsApp. Instalação em minutos e mensalidade acessível para empresas locais.",
    highlight: "Comece hoje",
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
    name: "Operação Essencial",
    description: "Para 1 a 2 pessoas vendendo no WhatsApp",
    price: "R$ 79",
    period: "/mês",
    roiNote: "Controle básico sem complexidade",
    ctaLabel: "Começar em minutos",
    features: [
      "Kanban de negociações no WhatsApp",
      "Lembretes de follow-up diários",
      "Histórico por cliente",
      "Dashboard simples da carteira",
      "Suporte por chat",
    ],
  },
  {
    name: "Equipe Enxuta",
    description: "Para 3 a 5 vendedores",
    price: "R$ 129",
    period: "/mês",
    roiNote: "Controle por vendedor e etapas personalizadas",
    ctaLabel: "Organizar meu time",
    featured: true,
    features: [
      "Tudo do plano Essencial",
      "Etapas e motivos de perda configuráveis",
      "Responsáveis por carteira e cobranças automáticas",
      "Alertas por vendedor e por etapa",
      "Suporte prioritário",
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

// Corporate access
export const CORPORATE_ACCESS_URL = "https://convertocorp.vercel.app"
