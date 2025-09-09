import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'
import ConsentBanner from '@/components/consent-banner'
import AnalyticsGate from '@/components/analytics-gate'
import WhatsappFloat from '@/components/whatsapp-float'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://converto-gilt.vercel.app'
const titleDefault = 'Converto — CRM simples integrado ao WhatsApp'
const descriptionDefault =
  'Converto é um CRM integrado ao WhatsApp, com extensão de navegador em sidebar para registrar dados de contatos, marcar eventos e sincronizar informações de vendas de forma simples.'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: 'Converto',
  title: {
    default: titleDefault,
    template: '%s · Converto',
  },
  description: descriptionDefault,
  keywords: [
    'Converto',
    'CRM',
    'WhatsApp',
    'extensão WhatsApp',
    'gestão de vendas',
    'sidebar WhatsApp',
    'pipeline',
    'follow-up',
    'sincronia de dados',
    'cadastro de clientes',
  ],
  authors: [{ name: 'Converto' }],
  creator: 'Converto',
  publisher: 'Converto',
  category: 'CRM',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: '/',
    siteName: 'Converto',
    title: titleDefault,
    description: descriptionDefault,
    images: [
      {
        url: '/crm-sales-dashboard.png',
        width: 1200,
        height: 630,
        alt: 'Converto — CRM integrado ao WhatsApp',
      },
    ],
    locale: 'pt_BR',
  },
  twitter: {
    card: 'summary_large_image',
    title: titleDefault,
    description: descriptionDefault,
    images: ['/crm-sales-dashboard.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  generator: 'Next.js 15',
}

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0b0b0c' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>
        <AnalyticsGate />
        <ConsentBanner />
        {children}
        <WhatsappFloat />
      </body>
    </html>
  )
}
