import type { Metadata } from 'next'
import { Source_Sans_3, Roboto } from 'next/font/google'
import './globals.css'

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-source-sans',
  display: 'swap',
})

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-roboto',
  display: 'swap',
})

const SITE_URL = 'https://www.coredb.com.br'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'CoreDB | Consultoria TOTVS e DBA — Belo Horizonte, MG',
    template: '%s | CoreDB',
  },
  description:
    'Consultoria especializada em ERP TOTVS (Protheus, RM, Fluig) e Administração de Banco de Dados. Atendemos empresas em todo o Brasil com foco em missão crítica, performance e SLA contratual.',
  keywords: [
    'consultoria TOTVS',
    'TOTVS Belo Horizonte',
    'consultoria ERP BH',
    'DBA SQL Server',
    'DBA Oracle',
    'banco de dados TOTVS',
    'suporte Protheus',
    'suporte RM',
    'Fluig',
    'AMS TOTVS',
    'customizações TOTVS',
    'CoreDB',
  ],
  authors: [{ name: 'CoreDB', url: SITE_URL }],
  creator: 'CoreDB',
  publisher: 'CoreDB',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: SITE_URL,
    siteName: 'CoreDB',
    title: 'CoreDB | Consultoria TOTVS e DBA — Belo Horizonte, MG',
    description:
      'Consultoria especializada em ERP TOTVS e Banco de Dados. Missão crítica, performance e SLA contratual. Atendemos todo o Brasil.',
    images: [
      {
        url: '/images/og-default.png',
        width: 1200,
        height: 630,
        alt: 'CoreDB — Consultoria TOTVS e DBA',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CoreDB | Consultoria TOTVS e DBA',
    description:
      'Especialistas em ERP TOTVS e Banco de Dados. Missão crítica, SLA contratual, atendimento nacional.',
    images: ['/images/og-default.png'],
  },
  alternates: {
    canonical: '/',
  },
}

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'CoreDB',
  description:
    'Consultoria especializada em ERP TOTVS (Protheus, RM e Fluig) e Administração de Banco de Dados SQL Server e Oracle. Foco em missão crítica, performance e SLA contratual.',
  url: SITE_URL,
  telephone: '+55-31-99187-3435',
  email: 'comercial@coredb.com.br',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Belo Horizonte',
    addressRegion: 'MG',
    addressCountry: 'BR',
  },
  areaServed: {
    '@type': 'Country',
    name: 'Brasil',
  },
  serviceType: [
    'Consultoria TOTVS',
    'Administração de Banco de Dados',
    'Suporte AMS',
    'Desenvolvimento e Customizações ERP',
  ],
  priceRange: '$$',
  sameAs: [],
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${sourceSans.variable} ${roboto.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body
        style={{
          fontFamily: "var(--font-roboto), 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        }}
      >
        {children}
      </body>
    </html>
  )
}
