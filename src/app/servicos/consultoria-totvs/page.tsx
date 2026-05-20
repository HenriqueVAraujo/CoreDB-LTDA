import type { Metadata } from 'next'
import ConsultoriaTOTVSView from '@/views/servicos/consultoria-totvs'

export const metadata: Metadata = {
  title: 'Consultoria TOTVS em Belo Horizonte — Protheus, RM e Fluig | CoreDB',
  description:
    'Consultoria TOTVS em Belo Horizonte (BH) para Protheus, RM e Fluig. Eliminamos lentidão, gargalos e instabilidade no seu ERP com tuning de performance e SLA contratual. Atendimento nacional e remoto.',
  keywords: [
    'consultoria TOTVS Belo Horizonte',
    'consultoria TOTVS BH',
    'consultoria Protheus Belo Horizonte',
    'consultoria RM TOTVS BH',
    'Fluig consultoria BH',
    'tuning TOTVS',
    'performance Protheus',
    'consultoria ERP Belo Horizonte',
    'TOTVS BH',
  ],
  alternates: { canonical: '/servicos/consultoria-totvs' },
  openGraph: {
    title: 'Consultoria TOTVS em Belo Horizonte — Protheus, RM e Fluig | CoreDB',
    description:
      'Consultoria TOTVS em BH para Protheus, RM e Fluig. Tuning de performance, resolução de gargalos e SLA contratual. Atendimento nacional e remoto.',
    url: '/servicos/consultoria-totvs',
  },
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Consultoria TOTVS — Protheus, RM e Fluig',
  description:
    'Consultoria especializada em TOTVS Protheus, RM e Fluig com base em Belo Horizonte, MG. Tuning de performance, resolução de gargalos, atualização segura e sustentação contínua. Atendimento nacional e remoto.',
  provider: {
    '@type': 'LocalBusiness',
    name: 'CoreDB LTDA',
    url: 'https://www.coredb.com.br',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Belo Horizonte',
      addressRegion: 'MG',
      addressCountry: 'BR',
    },
  },
  areaServed: [
    { '@type': 'Country', name: 'Brasil' },
    { '@type': 'City', name: 'Belo Horizonte' },
  ],
  serviceType: 'Consultoria ERP TOTVS',
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
