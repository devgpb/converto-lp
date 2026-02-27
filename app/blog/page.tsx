import type { Metadata } from 'next'
import Link from 'next/link'
import { formatBlogDate, getAllBlogPosts } from '@/lib/blog'

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://converto-gilt.vercel.app').replace(/\/$/, '')
const pageTitle = 'Blog Converto: Vendas no WhatsApp com processo e previsibilidade'
const pageDescription =
  'Guias práticos para organizar vendas no WhatsApp, evitar perda de clientes e aumentar conversão com método simples.'

export const metadata: Metadata = {
  title: 'Blog de vendas no WhatsApp',
  description: pageDescription,
  keywords: [
    'blog de vendas no whatsapp',
    'como organizar vendas no whatsapp',
    'follow-up no whatsapp',
    'crm para whatsapp',
    'converto blog',
  ],
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    type: 'website',
    url: '/blog',
    title: pageTitle,
    description: pageDescription,
    images: [
      {
        url: '/crm-sales-dashboard.png',
        width: 1200,
        height: 630,
        alt: 'Blog Converto sobre vendas no WhatsApp',
      },
    ],
    locale: 'pt_BR',
  },
  twitter: {
    card: 'summary_large_image',
    title: pageTitle,
    description: pageDescription,
    images: ['/crm-sales-dashboard.png'],
  },
}

export default async function BlogIndexPage() {
  const posts = await getAllBlogPosts()

  const blogJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Blog Converto',
    url: `${siteUrl}/blog`,
    inLanguage: 'pt-BR',
    description: pageDescription,
    publisher: {
      '@type': 'Organization',
      name: 'Converto',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.png`,
      },
    },
  }

  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: posts.map((post, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `${siteUrl}/blog/${post.slug}`,
      name: post.title,
    })),
  }

  return (
    <main className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />

      <section className="border-b border-border/70 bg-gradient-to-b from-muted/40 via-background to-background">
        <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">Blog Converto</p>
          <h1 className="mt-3 max-w-3xl text-3xl font-bold text-foreground sm:text-4xl">
            Conteúdo prático para vender mais no WhatsApp sem depender da memória do time
          </h1>
          <p className="mt-5 max-w-3xl text-lg text-muted-foreground">{pageDescription}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            {/* <Link
              href="/cadastro"
              className="inline-flex items-center rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
            >
              Testar Converto por 7 dias
            </Link> */}
            <Link
              href="/"
              className="inline-flex items-center rounded-md border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition hover:bg-muted"
            >
              Voltar para a LP
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        {posts.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border p-8 text-center">
            <p className="text-lg font-semibold">Nenhum artigo publicado ainda.</p>
            <p className="mt-2 text-muted-foreground">Adicione um arquivo `.json` em `content/blog` para publicar o primeiro post.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {posts.map((post) => (
              <article key={post.slug} className="rounded-xl border border-border/70 bg-card p-6 shadow-sm transition hover:border-primary/40">
                <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                  <span className="font-medium text-primary">{post.category}</span>
                  <span aria-hidden>•</span>
                  <time dateTime={post.publishedAt}>{formatBlogDate(post.publishedAt)}</time>
                  <span aria-hidden>•</span>
                  <span>{post.readingTimeMinutes} min de leitura</span>
                </div>

                <h2 className="mt-3 text-2xl font-semibold leading-tight text-foreground">
                  <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                    {post.title}
                  </Link>
                </h2>

                <p className="mt-3 text-muted-foreground">{post.excerpt}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {post.keywords.slice(0, 4).map((keyword) => (
                    <span key={keyword} className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                      {keyword}
                    </span>
                  ))}
                </div>

                <Link href={`/blog/${post.slug}`} className="mt-5 inline-flex items-center text-sm font-semibold text-primary hover:text-primary/80">
                  Ler artigo completo
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}
