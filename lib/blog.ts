import fs from 'node:fs/promises'
import path from 'node:path'
import { cache } from 'react'

const BLOG_DIRECTORY = path.join(process.cwd(), 'content', 'blog')
const WORDS_PER_MINUTE = 220

export type BlogSection = {
  title: string
  paragraphs: string[]
  bullets?: string[]
  highlight?: string
}

export type BlogFaq = {
  question: string
  answer: string
}

export type BlogCta = {
  title: string
  description: string
  primaryLabel: string
  primaryHref: string
  secondaryLabel?: string
  secondaryHref?: string
}

export type BlogPost = {
  slug: string
  title: string
  seoTitle?: string
  description: string
  excerpt: string
  publishedAt: string
  updatedAt?: string
  author: string
  category: string
  targetKeyword: string
  keywords: string[]
  intro: string
  sections: BlogSection[]
  faq: BlogFaq[]
  cta: BlogCta
  coverImage: string
  coverImageAlt: string
  readingTimeMinutes: number
}

const isNonEmptyString = (value: unknown): value is string => typeof value === 'string' && value.trim().length > 0

const assertRecord = (value: unknown, slug: string): Record<string, unknown> => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw new Error(`Post "${slug}" precisa ser um objeto JSON válido.`)
  }

  return value as Record<string, unknown>
}

const assertStringField = (source: Record<string, unknown>, field: string, slug: string): string => {
  const value = source[field]
  if (!isNonEmptyString(value)) {
    throw new Error(`Post "${slug}" está sem o campo obrigatório "${field}".`)
  }

  return value.trim()
}

const assertStringArrayField = (source: Record<string, unknown>, field: string, slug: string): string[] => {
  const value = source[field]
  if (!Array.isArray(value) || value.length === 0) {
    throw new Error(`Post "${slug}" precisa do campo "${field}" com pelo menos 1 item.`)
  }

  const cleaned = value
    .filter((item): item is string => isNonEmptyString(item))
    .map((item) => item.trim())

  if (cleaned.length === 0) {
    throw new Error(`Post "${slug}" precisa do campo "${field}" com textos válidos.`)
  }

  return cleaned
}

const normalizeSection = (value: unknown, slug: string, index: number): BlogSection => {
  const source = assertRecord(value, slug)
  const title = assertStringField(source, 'title', slug)
  const paragraphs = assertStringArrayField(source, 'paragraphs', slug)

  const bullets = Array.isArray(source.bullets)
    ? source.bullets.filter((item): item is string => isNonEmptyString(item)).map((item) => item.trim())
    : undefined

  const highlight = isNonEmptyString(source.highlight) ? source.highlight.trim() : undefined

  if (paragraphs.length === 0) {
    throw new Error(`Post "${slug}", seção ${index + 1}: adicione ao menos 1 parágrafo.`)
  }

  return {
    title,
    paragraphs,
    bullets: bullets && bullets.length > 0 ? bullets : undefined,
    highlight,
  }
}

const normalizeFaq = (value: unknown, slug: string): BlogFaq => {
  const source = assertRecord(value, slug)
  return {
    question: assertStringField(source, 'question', slug),
    answer: assertStringField(source, 'answer', slug),
  }
}

const normalizeCta = (value: unknown, slug: string): BlogCta => {
  if (!value) {
    return {
      title: 'Quer organizar seu processo sem planilha?',
      description:
        'O Converto centraliza contatos, histórico e follow-up no WhatsApp para você não perder oportunidades no meio do caminho.',
      primaryLabel: 'Testar Converto por 7 dias',
      primaryHref: '/cadastro',
      secondaryLabel: 'Conhecer a plataforma',
      secondaryHref: '/',
    }
  }

  const source = assertRecord(value, slug)

  return {
    title: assertStringField(source, 'title', slug),
    description: assertStringField(source, 'description', slug),
    primaryLabel: assertStringField(source, 'primaryLabel', slug),
    primaryHref: assertStringField(source, 'primaryHref', slug),
    secondaryLabel: isNonEmptyString(source.secondaryLabel) ? source.secondaryLabel.trim() : undefined,
    secondaryHref: isNonEmptyString(source.secondaryHref) ? source.secondaryHref.trim() : undefined,
  }
}

const countWords = (value: string) => value.trim().split(/\s+/).filter(Boolean).length

const estimateReadingTime = (post: Omit<BlogPost, 'slug' | 'readingTimeMinutes'>) => {
  const words = [
    post.title,
    post.description,
    post.excerpt,
    post.intro,
    ...post.sections.flatMap((section) => [section.title, ...section.paragraphs, ...(section.bullets ?? []), section.highlight ?? '']),
    ...post.faq.flatMap((item) => [item.question, item.answer]),
    post.cta.title,
    post.cta.description,
  ]
    .join(' ')
    .trim()

  const totalWords = countWords(words)
  return Math.max(2, Math.ceil(totalWords / WORDS_PER_MINUTE))
}

const normalizeBlogPost = (slug: string, rawPost: unknown): BlogPost => {
  const source = assertRecord(rawPost, slug)
  const title = assertStringField(source, 'title', slug)
  const seoTitle = isNonEmptyString(source.seoTitle) ? source.seoTitle.trim() : undefined
  const description = assertStringField(source, 'description', slug)
  const excerpt = isNonEmptyString(source.excerpt) ? source.excerpt.trim() : description
  const intro = assertStringField(source, 'intro', slug)
  const category = assertStringField(source, 'category', slug)
  const targetKeyword = assertStringField(source, 'targetKeyword', slug)
  const keywords = Array.from(new Set([...assertStringArrayField(source, 'keywords', slug), targetKeyword]))

  const publishedAt = assertStringField(source, 'publishedAt', slug)
  const updatedAt = isNonEmptyString(source.updatedAt) ? source.updatedAt.trim() : undefined

  if (Number.isNaN(Date.parse(publishedAt))) {
    throw new Error(`Post "${slug}" tem "publishedAt" inválido: use formato ISO (ex.: 2026-02-27).`)
  }

  if (updatedAt && Number.isNaN(Date.parse(updatedAt))) {
    throw new Error(`Post "${slug}" tem "updatedAt" inválido: use formato ISO (ex.: 2026-02-27).`)
  }

  const sectionsSource = source.sections
  if (!Array.isArray(sectionsSource) || sectionsSource.length === 0) {
    throw new Error(`Post "${slug}" precisa de pelo menos 1 seção em "sections".`)
  }

  const faqSource = Array.isArray(source.faq) ? source.faq : []

  const normalizedWithoutRuntimeFields: Omit<BlogPost, 'slug' | 'readingTimeMinutes'> = {
    title,
    seoTitle,
    description,
    excerpt,
    publishedAt,
    updatedAt,
    author: isNonEmptyString(source.author) ? source.author.trim() : 'Time Converto',
    category,
    targetKeyword,
    keywords,
    intro,
    sections: sectionsSource.map((section, index) => normalizeSection(section, slug, index)),
    faq: faqSource.map((item) => normalizeFaq(item, slug)),
    cta: normalizeCta(source.cta, slug),
    coverImage: isNonEmptyString(source.coverImage) ? source.coverImage.trim() : '/crm-sales-dashboard.png',
    coverImageAlt: isNonEmptyString(source.coverImageAlt)
      ? source.coverImageAlt.trim()
      : `Imagem de capa do artigo: ${title}`,
  }

  return {
    slug,
    ...normalizedWithoutRuntimeFields,
    readingTimeMinutes: estimateReadingTime(normalizedWithoutRuntimeFields),
  }
}

const loadBlogPosts = cache(async (): Promise<BlogPost[]> => {
  let files: string[] = []

  try {
    files = await fs.readdir(BLOG_DIRECTORY)
  } catch (error) {
    const isMissingDirectory =
      error instanceof Error && 'code' in error && typeof error.code === 'string' && error.code === 'ENOENT'

    if (isMissingDirectory) {
      return []
    }

    throw error
  }

  const jsonFiles = files.filter((file) => file.endsWith('.json') && !file.startsWith('_'))

  const posts = await Promise.all(
    jsonFiles.map(async (fileName) => {
      const slug = fileName.replace(/\.json$/i, '')
      const filePath = path.join(BLOG_DIRECTORY, fileName)
      const rawContent = await fs.readFile(filePath, 'utf8')

      let parsed: unknown
      try {
        parsed = JSON.parse(rawContent)
      } catch (error) {
        throw new Error(`Falha ao parsear o post "${fileName}": ${(error as Error).message}`)
      }

      return normalizeBlogPost(slug, parsed)
    }),
  )

  return posts.sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt))
})

export const getAllBlogPosts = async (): Promise<BlogPost[]> => loadBlogPosts()

export const getAllBlogSlugs = async (): Promise<string[]> => {
  const posts = await loadBlogPosts()
  return posts.map((post) => post.slug)
}

export const getBlogPostBySlug = async (slug: string): Promise<BlogPost | undefined> => {
  const posts = await loadBlogPosts()
  return posts.find((post) => post.slug === slug)
}

export const toBlogDate = (dateInput: string): Date => new Date(`${dateInput}T12:00:00Z`)

export const formatBlogDate = (dateInput: string): string =>
  new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'long',
    timeZone: 'UTC',
  }).format(toBlogDate(dateInput))
