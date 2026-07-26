import type { Metadata } from 'next'
import DesenvolvimentoView from '@/views/servicos/desenvolvimento-customizacoes'

const SITE_URL = 'https://www.coredb.com.br'
const PAGE_PATH = '/servicos/desenvolvimento-customizacoes'
const title = 'Customizações TOTVS ADVPL e TLPP em Belo Horizonte — Integrações ERP'
const socialTitle = `${title} | CoreDB`
const description =
  'Customizações TOTVS em ADVPL, TLPP e PO-UI, integrações via API e automação de processos para Protheus e RM, conforme escopo definido.'

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
  name: 'Desenvolvimento e Customizações TOTVS',
  description,
  url: `${SITE_URL}${PAGE_PATH}`,
  image: `${SITE_URL}/social/open-graph-logo-card-1200x630.png`,
  provider: { '@id': `${SITE_URL}/#organization` },
  areaServed: { '@type': 'Country', name: 'Brasil' },
  serviceType: 'Desenvolvimento e Customizações ERP',
  inLanguage: 'pt-BR',
}

export default function DesenvolvimentoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <DesenvolvimentoView />
    </>
  )
}
