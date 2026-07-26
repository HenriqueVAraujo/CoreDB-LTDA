import type { Metadata } from 'next'
import SupportAMSView from '@/views/servicos/SupportAMS'

const SITE_URL = 'https://www.coredb.com.br'
const PAGE_PATH = '/servicos/suporte-ams'
const title = 'Suporte AMS TOTVS com SLA Contratual — Belo Horizonte e Brasil'
const socialTitle = `${title} | CoreDB`
const description =
  'Sustentação AMS para ambientes TOTVS, com governança de chamados, SLA e cobertura definidos em contrato. Atendimento remoto conforme escopo.'

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
  name: 'Suporte AMS TOTVS — Sustentação com SLA Contratual',
  description,
  url: `${SITE_URL}${PAGE_PATH}`,
  image: `${SITE_URL}/social/open-graph-logo-card-1200x630.png`,
  provider: { '@id': `${SITE_URL}/#organization` },
  areaServed: { '@type': 'Country', name: 'Brasil' },
  serviceType: 'Suporte AMS TOTVS',
  inLanguage: 'pt-BR',
}

export default function SupportAMSPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <SupportAMSView />
    </>
  )
}
