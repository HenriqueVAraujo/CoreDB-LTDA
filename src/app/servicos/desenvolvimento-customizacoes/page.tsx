import type { Metadata } from 'next'
import DesenvolvimentoView from '@/views/servicos/desenvolvimento-customizacoes'

export const metadata: Metadata = {
  title: 'Customizações TOTVS ADVPL e TLPP em Belo Horizonte — Integrações ERP | CoreDB',
  description:
    'Desenvolvimento de customizações TOTVS em ADVPL, TLPP e PO-UI com base em Belo Horizonte (BH). Integrações via API, automação de processos e evolução de legados para Protheus e RM. Atendimento remoto nacional.',
  keywords: [
    'customizações TOTVS Belo Horizonte',
    'desenvolvimento ADVPL BH',
    'TLPP TOTVS',
    'customizações Protheus BH',
    'integrações ERP Belo Horizonte',
    'integração TOTVS API',
    'automação processos TOTVS',
    'PO-UI Protheus',
  ],
  alternates: { canonical: '/servicos/desenvolvimento-customizacoes' },
  openGraph: {
    title: 'Customizações TOTVS ADVPL e TLPP em BH — Integrações ERP | CoreDB',
    description:
      'Customizações TOTVS em ADVPL, TLPP e PO-UI. Integrações via API e automação de processos para Protheus e RM. Base em BH, atendimento nacional.',
    url: '/servicos/desenvolvimento-customizacoes',
  },
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Desenvolvimento e Customizações TOTVS',
  description:
    'Desenvolvimento de customizações TOTVS em ADVPL, TLPP e PO-UI com base em Belo Horizonte, MG. Integrações via API, automação de processos e evolução de customizações legadas. Atendimento remoto nacional.',
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
  serviceType: 'Desenvolvimento e Customizações ERP',
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
