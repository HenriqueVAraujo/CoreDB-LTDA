import type { Metadata } from 'next'
import SqlServerView from '@/views/servicos/dba-sql-server'

const SITE_URL = 'https://www.coredb.com.br'
const PAGE_PATH = '/servicos/dba/sql-server'
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`
const title = 'DBA SQL Server para Ambientes Críticos'
const socialTitle = `${title} | CoreDB`
const description =
  'DBA SQL Server para bloqueios, deadlocks, planos de execução, TempDB, memória, backup, alta disponibilidade e monitoramento técnico.'

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
  twitter: { card: 'summary_large_image', title: socialTitle, description, images: ['/social/social-share-logo-card-1200x630.png'] },
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${PAGE_URL}#service`,
  name: 'DBA SQL Server para ambientes críticos',
  description,
  url: PAGE_URL,
  image: `${SITE_URL}/social/open-graph-logo-card-1200x630.png`,
  provider: { '@id': `${SITE_URL}/#organization` },
  areaServed: { '@type': 'Country', name: 'Brasil' },
  serviceType: 'Administração de bancos de dados SQL Server',
  inLanguage: 'pt-BR',
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Início', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'DBA multiplataforma', item: `${SITE_URL}/servicos/dba` },
    { '@type': 'ListItem', position: 3, name: 'SQL Server', item: PAGE_URL },
  ],
}

export default function SqlServerPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <SqlServerView />
    </>
  )
}
