import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { formatBlogDate, getAllBlogSlugs, getBlogPostBySlug } from '@/lib/blog'

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://converto-gilt.vercel.app').replace(/\/$/, '')

type BlogPostPageProps = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)

  if (!post) {
    return {
      title: 'Artigo não encontrado',
      robots: {
        index: false,
        follow: false,
      },
    }
  }

  const pageTitle = post.seoTitle ?? post.title

  return {
    title: pageTitle,
    description: post.description,
    keywords: post.keywords,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      type: 'article',
      url: `/blog/${post.slug}`,
      title: pageTitle,
      description: post.description,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      tags: post.keywords,
      authors: [post.author],
      section: post.category,
      images: [
        {
          url: post.coverImage,
          width: 1200,
          height: 630,
          alt: post.coverImageAlt,
        },
      ],
      locale: 'pt_BR',
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: post.description,
      images: [post.coverImage],
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const articleUrl = `${siteUrl}/blog/${post.slug}`

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    mainEntityOfPage: articleUrl,
    headline: post.title,
    description: post.description,
    inLanguage: 'pt-BR',
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    keywords: post.keywords.join(', '),
    articleSection: post.category,
    image: [`${siteUrl}${post.coverImage}`],
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Converto',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.png`,
      },
    },
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: `${siteUrl}/blog`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: articleUrl,
      },
    ],
  }

  const faqJsonLd =
    post.faq.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: post.faq.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: item.answer,
            },
          })),
        }
      : null

  return (
    <main className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      {faqJsonLd ? <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} /> : null}

      <article className="mx-auto max-w-3xl px-4 pb-16 pt-10 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap items-center gap-3 text-sm">
          <Link href="/blog" className="font-medium text-primary hover:text-primary/80">
            ← Voltar para o blog
          </Link>
          <span className="text-muted-foreground">|</span>
          <Link href="/" className="text-muted-foreground hover:text-foreground">
            Página principal do Converto
          </Link>
        </div>

        <header className="border-b border-border/70 pb-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">{post.category}</p>
          <h1 className="mt-3 text-3xl font-bold leading-tight text-foreground sm:text-4xl">{post.title}</h1>
          <p className="mt-5 text-lg text-muted-foreground">{post.description}</p>

          <div className="mt-6 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <span>{post.author}</span>
            <span aria-hidden>•</span>
            <time dateTime={post.publishedAt}>{formatBlogDate(post.publishedAt)}</time>
            {post.updatedAt ? (
              <>
                <span aria-hidden>•</span>
                <span>Atualizado em {formatBlogDate(post.updatedAt)}</span>
              </>
            ) : null}
            <span aria-hidden>•</span>
            <span>{post.readingTimeMinutes} min de leitura</span>
          </div>
        </header>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-foreground">A dor real por trás do caos no WhatsApp</h2>
          <p className="mt-4 leading-7 text-foreground/90">{post.intro}</p>
        </section>

        {post.sections.map((section) => (
          <section key={section.title} className="mt-10">
            <h2 className="text-2xl font-semibold text-foreground">{section.title}</h2>

            <div className="mt-4 space-y-4 text-foreground/90">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className="leading-7">
                  {paragraph}
                </p>
              ))}
            </div>

            {section.bullets && section.bullets.length > 0 ? (
              <ul className="mt-5 list-disc space-y-2 pl-6 text-foreground/90">
                {section.bullets.map((bullet) => (
                  <li key={bullet} className="leading-7">
                    {bullet}
                  </li>
                ))}
              </ul>
            ) : null}

            {section.highlight ? (
              <p className="mt-5 rounded-lg border border-primary/25 bg-primary/5 p-4 text-sm font-medium text-foreground">
                {section.highlight}
              </p>
            ) : null}
          </section>
        ))}

        {post.faq.length > 0 ? (
          <section className="mt-12 border-t border-border/70 pt-10">
            <h2 className="text-2xl font-semibold text-foreground">Perguntas frequentes</h2>
            <div className="mt-6 space-y-6">
              {post.faq.map((item) => (
                <div key={item.question}>
                  <h3 className="text-lg font-semibold text-foreground">{item.question}</h3>
                  <p className="mt-2 leading-7 text-foreground/90">{item.answer}</p>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        <section className="mt-12 rounded-xl border border-primary/30 bg-gradient-to-br from-primary/10 via-background to-background p-6 sm:p-8">
          <h2 className="text-2xl font-semibold text-foreground">{post.cta.title}</h2>
          <p className="mt-3 leading-7 text-foreground/90">{post.cta.description}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={post.cta.primaryHref}
              className="inline-flex items-center rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
            >
              {post.cta.primaryLabel}
            </Link>

            {post.cta.secondaryHref && post.cta.secondaryLabel ? (
              <Link
                href={post.cta.secondaryHref}
                className="inline-flex items-center rounded-md border border-border bg-background px-5 py-2.5 text-sm font-semibold text-foreground transition hover:bg-muted"
              >
                {post.cta.secondaryLabel}
              </Link>
            ) : null}
          </div>
        </section>
      </article>
    </main>
  )
}
