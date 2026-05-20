import type { Metadata } from 'next'
import HomeView from '@/views/Home'

export const metadata: Metadata = {
  title: 'CoreDB | Consultoria TOTVS e DBA — Belo Horizonte, MG',
  description:
    'Consultoria especializada em ERP TOTVS (Protheus, RM e Fluig) e Banco de Dados SQL Server e Oracle. Missão crítica, performance e SLA contratual. Base em BH, atendimento nacional.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'CoreDB | Consultoria TOTVS e DBA — Belo Horizonte, MG',
    description:
      'Especialistas em ERP TOTVS e Banco de Dados em Belo Horizonte. Missão crítica, SLA contratual, atendimento nacional.',
    url: '/',
  },
}

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'ProfessionalService'],
  '@id': 'https://www.coredb.com.br/#local-business',
  name: 'CoreDB LTDA',
  description:
    'Consultoria especializada em ERP TOTVS (Protheus, RM e Fluig) e Administração de Banco de Dados SQL Server e Oracle. Base em Belo Horizonte, MG — atendimento em todo o Brasil.',
  url: 'https://www.coredb.com.br',
  telephone: '+55-31-99187-3435',
  email: 'comercial@coredb.com.br',
  image: 'https://www.coredb.com.br/opengraph-image',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Belo Horizonte',
    addressRegion: 'MG',
    addressCountry: 'BR',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: -19.9166813,
    longitude: -43.9344931,
  },
  areaServed: [
    { '@type': 'Country', name: 'Brasil' },
    { '@type': 'City', name: 'Belo Horizonte' },
  ],
  priceRange: '$$',
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '18:00',
    },
  ],
  serviceType: [
    'Consultoria TOTVS',
    'Administração de Banco de Dados',
    'Suporte AMS',
    'Desenvolvimento e Customizações ERP',
  ],
  sameAs: [],
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <HomeView />
    </>
  )
}
