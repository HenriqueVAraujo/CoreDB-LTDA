import type { Metadata } from 'next'
import ConsultoriaTOTVSView from '@/views/servicos/consultoria-totvs'

const SITE_URL = 'https://www.coredb.com.br'
const PAGE_PATH = '/servicos/consultoria-totvs'
const title = 'Consultoria TOTVS em Belo Horizonte — Protheus, RM e Fluig'
const socialTitle = `${title} | CoreDB`
const description =
  'Consultoria para ambientes TOTVS Protheus, RM e Fluig, com diagnóstico técnico, análise de performance e atuação conforme escopo contratado. Atendimento remoto nacional.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: PAGE_PATH },
  openGraph: {
    title: socialTitle,
    description,
    url: PAGE_PATH,
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
    title: socialTitle,
    description,
    images: ['/social/social-share-logo-card-1200x630.png'],
  },
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${SITE_URL}${PAGE_PATH}#service`,
  name: 'Consultoria TOTVS — Protheus, RM e Fluig',
  description,
  url: `${SITE_URL}${PAGE_PATH}`,
  image: `${SITE_URL}/social/open-graph-logo-card-1200x630.png`,
  provider: { '@id': `${SITE_URL}/#organization` },
  areaServed: { '@type': 'Country', name: 'Brasil' },
  serviceType: 'Consultoria ERP TOTVS',
  inLanguage: 'pt-BR',
}

export default function ConsultoriaTOTVSPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <ConsultoriaTOTVSView />
    </>
  )
}
