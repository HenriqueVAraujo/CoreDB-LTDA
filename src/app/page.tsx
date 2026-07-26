import type { Metadata } from 'next'
import HomeView from '@/views/Home'

const title = 'CoreDB | Consultoria TOTVS e DBA — Belo Horizonte, MG'
const description =
  'Blindamos ambientes TOTVS e bancos de dados que não podem parar, com diagnóstico técnico, governança e SLA conforme o escopo contratado.'

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: '/' },
  openGraph: {
    title,
    description,
    url: '/',
    images: [
      {
        url: '/social/open-graph-logo-card-1200x630.png',
        width: 1200,
        height: 630,
        alt: 'CoreDB — O núcleo da continuidade.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/social/social-share-logo-card-1200x630.png'],
  },
}

export default function HomePage() {
  return <HomeView />
}
