import type { Metadata } from 'next'
import DBAView from '@/views/servicos/dba'

export const metadata: Metadata = {
  title: 'DBA SQL Server e Oracle — Gestão de Banco de Dados | CoreDB',
  description:
    'Administração profissional de SQL Server e Oracle. Health Check, SQL Tuning, Disaster Recovery e monitoramento 24/7 para ambientes críticos. Consultoria DBA com base em BH, atendimento nacional.',
  keywords: [
    'DBA SQL Server',
    'DBA Oracle',
    'administração banco de dados',
    'DBA TOTVS',
    'health check banco de dados',
    'SQL tuning',
    'disaster recovery',
    'DBA Belo Horizonte',
    'banco de dados BH',
  ],
  alternates: { canonical: '/servicos/dba' },
  openGraph: {
    title: 'DBA SQL Server e Oracle — Gestão de Banco de Dados | CoreDB',
    description:
      'Gestão especializada de SQL Server e Oracle. Health Check, tuning, Disaster Recovery e monitoramento 24/7. Atendimento nacional.',
    url: '/servicos/dba',
  },
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Administração de Banco de Dados — DBA SQL Server e Oracle',
  description:
    'Gestão profissional de bancos de dados SQL Server e Oracle. Health Check, SQL Tuning avançado, Disaster Recovery, segurança e monitoramento 24/7.',
  provider: {
    '@type': 'Organization',
    name: 'CoreDB',
    url: 'https://www.coredb.com.br',
  },
  areaServed: { '@type': 'Country', name: 'Brasil' },
  serviceType: 'Administração de Banco de Dados',
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
