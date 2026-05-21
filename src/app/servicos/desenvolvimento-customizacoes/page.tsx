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

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'O que é ADVPL?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'ADVPL (Advanced Protheus Language) é a linguagem de programação proprietária da TOTVS usada para customizar o Protheus. É a principal linguagem para desenvolvimento de pontos de entrada, relatórios e integrações no ERP.',
      },
    },
    {
      '@type': 'Question',
      name: 'A CoreDB faz integração entre TOTVS e sistemas externos?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sim. Desenvolvemos integrações via API REST entre TOTVS Protheus e RM e sistemas externos como CRMs, plataformas de e-commerce, ERPs legados e portais de fornecedores.',
      },
    },
    {
      '@type': 'Question',
      name: 'Customizações antigas e legadas podem ser modernizadas?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sim. Auditamos customizações existentes, identificamos problemas de performance que oneram o banco de dados e realizamos a modernização para TLPP e PO-UI quando aplicável.',
      },
    },
    {
      '@type': 'Question',
      name: 'O desenvolvimento leva em conta a performance do banco de dados?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Obrigatoriamente. Todo código desenvolvido pela CoreDB é revisado com foco em impacto no banco de dados. Queries ineficientes dentro de customizações são a segunda maior causa de lentidão em ambientes TOTVS.',
      },
    },
  ],
}

export default function DesenvolvimentoPage() {
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
      <DesenvolvimentoView />
    </>
  )
}
