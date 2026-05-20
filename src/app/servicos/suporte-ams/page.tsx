import type { Metadata } from 'next'
import SupportAMSView from '@/views/servicos/SupportAMS'

export const metadata: Metadata = {
  title: 'Suporte AMS TOTVS com SLA Contratual | CoreDB',
  description:
    'Sustentação estratégica AMS para TOTVS com governança via GLPI, SLA contratual e atendimento nível 2 e 3. Ideal para empresas que precisam de estabilidade e previsibilidade operacional. Atendimento nacional.',
  keywords: [
    'suporte AMS TOTVS',
    'AMS Protheus',
    'sustentação TOTVS',
    'suporte TOTVS SLA',
    'GLPI TOTVS',
    'suporte ERP BH',
    'sustentação ERP Brasil',
  ],
  alternates: { canonical: '/servicos/suporte-ams' },
  openGraph: {
    title: 'Suporte AMS TOTVS com SLA Contratual | CoreDB',
    description:
      'Sustentação estratégica para TOTVS com governança real, SLA rígido e especialistas nível 2 e 3. Atendimento nacional.',
    url: '/servicos/suporte-ams',
  },
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Suporte AMS TOTVS — Sustentação com SLA Contratual',
  description:
    'Central de serviços estruturada para TOTVS com governança via GLPI, SLA de resposta crítica e atendimento nível 2 e 3. Relatórios mensais de indicadores.',
  provider: {
    '@type': 'Organization',
    name: 'CoreDB',
    url: 'https://www.coredb.com.br',
  },
  areaServed: { '@type': 'Country', name: 'Brasil' },
  serviceType: 'Suporte AMS TOTVS',
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
