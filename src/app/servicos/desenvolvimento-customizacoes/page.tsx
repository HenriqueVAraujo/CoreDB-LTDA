import type { Metadata } from 'next'
import DesenvolvimentoView from '@/views/servicos/desenvolvimento-customizacoes'

export const metadata: Metadata = {
  title: 'Customizações TOTVS e Integrações ERP | CoreDB',
  description:
    'Desenvolvimento de customizações TOTVS em ADVPL, TLPP e PO-UI. Integrações via API, automação de processos e evolução de legados. Código de alta performance para Protheus e RM. Atendimento nacional.',
  keywords: [
    'customizações TOTVS',
    'desenvolvimento ADVPL',
    'TLPP TOTVS',
    'PO-UI Protheus',
    'integrações ERP',
    'integração TOTVS API',
    'automação processos TOTVS',
    'customizações Protheus BH',
  ],
  alternates: { canonical: '/servicos/desenvolvimento-customizacoes' },
  openGraph: {
    title: 'Customizações TOTVS e Integrações ERP | CoreDB',
    description:
      'Desenvolvimento em ADVPL, TLPP e PO-UI. Integrações via API e automação de processos. Código escalável para Protheus e RM. Atendimento nacional.',
    url: '/servicos/desenvolvimento-customizacoes',
  },
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Desenvolvimento e Customizações TOTVS',
  description:
    'Desenvolvimento de soluções personalizadas para TOTVS em ADVPL, TLPP e PO-UI. Integrações API, automação de processos e evolução de customizações legadas.',
  provider: {
    '@type': 'Organization',
    name: 'CoreDB',
    url: 'https://www.coredb.com.br',
  },
  areaServed: { '@type': 'Country', name: 'Brasil' },
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
