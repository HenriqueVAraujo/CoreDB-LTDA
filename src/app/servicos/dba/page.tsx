import type { Metadata } from 'next'
import DBAView from '@/views/servicos/dba'

export const metadata: Metadata = {
  title: 'DBA SQL Server e Oracle em Belo Horizonte — Banco de Dados TOTVS | CoreDB',
  description:
    'DBA SQL Server e Oracle em Belo Horizonte (BH) para ambientes TOTVS críticos. Health Check, SQL Tuning, Disaster Recovery e monitoramento 24/7. Atendimento remoto em todo o Brasil.',
  keywords: [
    'DBA SQL Server Belo Horizonte',
    'DBA Oracle BH',
    'DBA banco de dados TOTVS',
    'administração banco de dados BH',
    'DBA TOTVS remoto',
    'health check banco de dados',
    'SQL tuning',
    'disaster recovery',
    'DBA Belo Horizonte',
    'banco de dados BH',
  ],
  alternates: { canonical: '/servicos/dba' },
  openGraph: {
    title: 'DBA SQL Server e Oracle em Belo Horizonte — Banco de Dados TOTVS | CoreDB',
    description:
      'DBA especializado em SQL Server e Oracle para TOTVS em BH. Health Check, SQL Tuning, Disaster Recovery e monitoramento 24/7. Atendimento nacional.',
    url: '/servicos/dba',
  },
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Administração de Banco de Dados — DBA SQL Server e Oracle',
  description:
    'Gestão profissional de SQL Server e Oracle com base em Belo Horizonte, MG. Health Check, SQL Tuning avançado, Disaster Recovery, segurança e monitoramento 24/7. Atendimento remoto nacional.',
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
  serviceType: 'Administração de Banco de Dados',
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'O que é SQL Tuning e por que é importante para o TOTVS?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'SQL Tuning é o processo de otimização de queries e estrutura do banco de dados para reduzir tempo de resposta. Consultas mal escritas ou sem índices adequados são a principal causa de lentidão no Protheus e RM.',
      },
    },
    {
      '@type': 'Question',
      name: 'A CoreDB oferece plano de Disaster Recovery?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sim. Implementamos planos formais de Disaster Recovery com RTO e RPO definidos, backup automatizado e testes periódicos de restauração para garantir a continuidade do negócio.',
      },
    },
    {
      '@type': 'Question',
      name: 'Com quais bancos de dados a CoreDB trabalha?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Trabalhamos com SQL Server, Oracle e PostgreSQL, com foco em ambientes TOTVS Protheus e RM de missão crítica.',
      },
    },
    {
      '@type': 'Question',
      name: 'O monitoramento do banco de dados é feito 24 horas por dia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sim. Utilizamos Zabbix para monitoramento contínuo 24/7 com alertas automáticos e escalada por nível de criticidade, antes que o usuário perceba qualquer instabilidade.',
      },
    },
  ],
}

export default function DBAPage() {
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
      <DBAView />
    </>
  )
}
