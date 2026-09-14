import type { Metadata } from 'next'
import HomeView from '@/views/Home'

const title = 'CoreDB | Engenharia TOTVS e Bancos de Dados — Belo Horizonte, MG'
const description =
  'Engenharia e execução de tecnologia crítica para Protheus, RM, Fluig, SQL Server, Oracle, PostgreSQL e MySQL, com foco em performance, segurança e disponibilidade.'

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
