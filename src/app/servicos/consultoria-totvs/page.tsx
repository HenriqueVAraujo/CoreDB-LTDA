import type { Metadata } from 'next'
import ConsultoriaTOTVSView from '@/views/servicos/consultoria-totvs'

export const metadata: Metadata = {
  title: 'Consultoria TOTVS Protheus, RM e Fluig | CoreDB',
  description:
    'Especialistas em consultoria TOTVS para Protheus, RM e Fluig. Eliminamos lentidão, gargalos e instabilidade no seu ERP com tuning de performance e SLA contratual. Atendemos todo o Brasil — base em Belo Horizonte, MG.',
  keywords: [
    'consultoria TOTVS',
    'consultoria Protheus',
    'consultoria RM TOTVS',
    'Fluig consultoria',
    'tuning TOTVS',
    'performance Protheus',
    'consultoria ERP Belo Horizonte',
    'TOTVS BH',
  ],
  alternates: { canonical: '/servicos/consultoria-totvs' },
  openGraph: {
    title: 'Consultoria TOTVS Protheus, RM e Fluig | CoreDB',
    description:
      'Eliminamos lentidão e instabilidade no seu ERP TOTVS. Tuning de performance, resolução de gargalos e atualização segura. Atendimento nacional.',
    url: '/servicos/consultoria-totvs',
  },
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Consultoria TOTVS — Protheus, RM e Fluig',
  description:
    'Consultoria especializada em TOTVS Protheus, RM e Fluig. Tuning de performance, resolução de gargalos, atualização segura e sustentação contínua.',
  provider: {
    '@type': 'Organization',
    name: 'CoreDB',
    url: 'https://www.coredb.com.br',
  },
  areaServed: { '@type': 'Country', name: 'Brasil' },
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
