import type { Metadata } from 'next'
import SupportAMSView from '@/views/servicos/SupportAMS'

export const metadata: Metadata = {
  title: 'Suporte AMS TOTVS com SLA Contratual — Belo Horizonte e Brasil | CoreDB',
  description:
    'Suporte AMS TOTVS em Belo Horizonte (BH) com governança via GLPI, SLA contratual e especialistas nível 2 e 3. Sustentação estratégica para Protheus, RM e Fluig. Atendimento remoto nacional.',
  keywords: [
    'suporte AMS TOTVS Belo Horizonte',
    'AMS TOTVS BH',
    'sustentação TOTVS SLA',
    'AMS Protheus Belo Horizonte',
    'GLPI TOTVS',
    'suporte ERP BH',
    'sustentação ERP Brasil',
    'AMS TOTVS remoto',
  ],
  alternates: { canonical: '/servicos/suporte-ams' },
  openGraph: {
    title: 'Suporte AMS TOTVS com SLA Contratual — BH e Brasil | CoreDB',
    description:
      'Suporte AMS TOTVS em BH: governança via GLPI, SLA contratual e especialistas nível 2 e 3. Atendimento remoto em todo o Brasil.',
    url: '/servicos/suporte-ams',
  },
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Suporte AMS TOTVS — Sustentação com SLA Contratual',
  description:
    'Sustentação AMS para TOTVS com base em Belo Horizonte, MG. Governança via GLPI, SLA de resposta crítica, atendimento nível 2 e 3 e relatórios mensais de indicadores. Atendimento remoto nacional.',
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
