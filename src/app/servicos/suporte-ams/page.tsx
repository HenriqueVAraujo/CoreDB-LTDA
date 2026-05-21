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

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'O que é AMS em TI?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'AMS (Application Management Services) é um modelo de sustentação contínua do ERP com SLA contratual, gestão formal de chamados e relatórios de indicadores. Diferente do suporte reativo, o AMS tem governança formal e atendimento preventivo.',
      },
    },
    {
      '@type': 'Question',
      name: 'Qual o SLA de atendimento crítico da CoreDB?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Definimos SLA contratual por nível de criticidade. Incidentes críticos têm primeira resposta em até 1 hora. Todos os tempos são auditáveis via GLPI.',
      },
    },
    {
      '@type': 'Question',
      name: 'Preciso estar em Belo Horizonte para contratar o suporte AMS?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Não. Atendemos empresas em todo o Brasil de forma remota. O monitoramento, os chamados e os relatórios são todos gerenciados digitalmente.',
      },
    },
    {
      '@type': 'Question',
      name: 'Como funciona a gestão de chamados no suporte AMS?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Todos os chamados são registrados e gerenciados via GLPI com classificação por urgência e impacto. Cada chamado tem histórico completo, prazo e responsável definido em contrato.',
      },
    },
  ],
}

export default function SupportAMSPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <SupportAMSView />
    </>
  )
}
