import type { Metadata } from 'next'
import ProtheusView from '@/views/servicos/protheus'

const SITE_URL = 'https://www.coredb.com.br'
const PAGE_PATH = '/servicos/protheus'
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`
const title = 'Consultoria Protheus: Performance e Sustentação'
const socialTitle = `${title} | CoreDB`
const description =
  'Consultoria Protheus para diagnóstico de performance, AppServer, DBAccess, banco de dados, atualizações, integrações e continuidade operacional.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: socialTitle,
    description,
    url: PAGE_URL,
    type: 'website',
    images: [{ url: '/social/open-graph-logo-card-1200x630.png', width: 1200, height: 630, alt: 'CoreDB — O núcleo da continuidade.' }],
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
  '@id': `${PAGE_URL}#service`,
  name: 'Consultoria Protheus para performance e sustentação',
  description,
  url: PAGE_URL,
  image: `${SITE_URL}/social/open-graph-logo-card-1200x630.png`,
  provider: { '@id': `${SITE_URL}/#organization` },
  areaServed: { '@type': 'Country', name: 'Brasil' },
  serviceType: 'Consultoria e sustentação TOTVS Protheus',
  inLanguage: 'pt-BR',
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Início', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Consultoria TOTVS', item: `${SITE_URL}/servicos/consultoria-totvs` },
    { '@type': 'ListItem', position: 3, name: 'Protheus', item: PAGE_URL },
  ],
}

export default function ProtheusPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <ProtheusView />
    </>
  )
}
