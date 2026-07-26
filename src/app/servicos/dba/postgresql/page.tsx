import type { Metadata } from 'next'
import PostgreSqlView from '@/views/servicos/dba-postgresql'

const SITE_URL = 'https://www.coredb.com.br'
const PAGE_PATH = '/servicos/dba/postgresql'
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`
const title = 'DBA PostgreSQL para Ambientes Críticos | CoreDB'
const description =
  'DBA PostgreSQL para locks, planos, estatísticas, autovacuum, bloat, WAL, backup, replicação, performance e continuidade.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title,
    description,
    url: PAGE_URL,
    type: 'website',
    images: [{ url: '/social/open-graph-logo-card-1200x630.png', width: 1200, height: 630, alt: 'CoreDB — O núcleo da continuidade.' }],
  },
  twitter: { card: 'summary_large_image', title, description, images: ['/social/social-share-logo-card-1200x630.png'] },
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${PAGE_URL}#service`,
  name: 'DBA PostgreSQL para ambientes críticos',
  description,
  url: PAGE_URL,
  image: `${SITE_URL}/social/open-graph-logo-card-1200x630.png`,
  provider: { '@id': `${SITE_URL}/#organization` },
  areaServed: { '@type': 'Country', name: 'Brasil' },
  serviceType: 'Administração de bancos de dados PostgreSQL',
  inLanguage: 'pt-BR',
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Início', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'DBA multiplataforma', item: `${SITE_URL}/servicos/dba` },
    { '@type': 'ListItem', position: 3, name: 'PostgreSQL', item: PAGE_URL },
  ],
}

export default function PostgreSqlPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <PostgreSqlView />
    </>
  )
}
