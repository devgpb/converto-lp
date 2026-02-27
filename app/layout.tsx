import type { Metadata, Viewport } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'
import ConsentBanner from '@/components/consent-banner'
import AnalyticsGate from '@/components/analytics-gate'
import WhatsappFloat from '@/components/whatsapp-float'

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://converto-gilt.vercel.app').replace(/\/$/, '')
const siteName = 'Converto'
const titleDefault = 'Converto | CRM para vendas no WhatsApp'
const descriptionDefault =
  'Organize leads, follow-ups e equipe de vendas no WhatsApp com o Converto. CRM simples, rápido de implantar e feito para pequenas e médias empresas.'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteName,
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
  authors: [{ name: siteName }],
  creator: siteName,
  publisher: siteName,
  category: 'CRM',
  referrer: 'origin-when-cross-origin',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: '/',
    siteName,
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
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
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
