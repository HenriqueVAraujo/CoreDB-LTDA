import type { Metadata } from 'next'
import DBAView from '@/views/servicos/dba'

const SITE_URL = 'https://www.coredb.com.br'
const PAGE_PATH = '/servicos/dba'
const title = 'DBA SQL Server e Oracle em Belo Horizonte — Banco de Dados TOTVS'
const socialTitle = `${title} | CoreDB`
const description =
  'Administração de SQL Server e Oracle para ambientes TOTVS, com Health Check, SQL Tuning, continuidade e monitoramento automatizado. Atendimento humano conforme cobertura contratada.'

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
  name: 'Administração de Banco de Dados — DBA SQL Server e Oracle',
  description,
  url: `${SITE_URL}${PAGE_PATH}`,
  image: `${SITE_URL}/social/open-graph-logo-card-1200x630.png`,
  provider: { '@id': `${SITE_URL}/#organization` },
  areaServed: { '@type': 'Country', name: 'Brasil' },
  serviceType: 'Administração de Banco de Dados',
  inLanguage: 'pt-BR',
}

export default function DBAPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <DBAView />
    </>
  )
}
