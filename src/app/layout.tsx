import type { Metadata } from 'next'
import { Source_Sans_3, Roboto } from 'next/font/google'
import CookieConsent from '@/components/CookieConsent'
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
const ORGANIZATION_ID = `${SITE_URL}/#organization`
const isProduction = process.env.VERCEL_ENV === 'production'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'CoreDB | Consultoria TOTVS e DBA — Belo Horizonte, MG',
    template: '%s | CoreDB',
  },
  description:
    'Consultoria em ambientes TOTVS e bancos de dados, com diagnóstico técnico, governança e SLA definidos conforme o escopo contratado.',
  applicationName: 'CoreDB',
  authors: [{ name: 'CoreDB', url: SITE_URL }],
  creator: 'CoreDB',
  publisher: 'CoreDB',
  manifest: '/pwa/site.webmanifest',
  verification: {
    google: 'pNpEVbrZOj2I3Vujue7b_pEGsVL4lO_XpxaHWs0yw7Y',
  },
  robots: isProduction
    ? {
        index: true,
        follow: true,
        googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
      }
    : {
        index: false,
        follow: false,
        nocache: true,
        googleBot: { index: false, follow: false, noimageindex: true },
      },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: SITE_URL,
    siteName: 'CoreDB',
    title: 'CoreDB | Consultoria TOTVS e DBA — Belo Horizonte, MG',
    description:
      'Consultoria em ambientes TOTVS e bancos de dados, com diagnóstico técnico, governança e SLA definidos conforme o escopo contratado.',
    images: [
      {
        url: '/social/open-graph-logo-card-1200x630.png',
        width: 1200,
        height: 630,
        alt: 'CoreDB — O núcleo da continuidade.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CoreDB | Consultoria TOTVS e DBA',
    description:
      'Diagnóstico técnico e governança para ambientes TOTVS e bancos de dados.',
    images: ['/social/social-share-logo-card-1200x630.png'],
  },
}

const organizationSchema = {
  '@type': 'Organization',
  '@id': ORGANIZATION_ID,
  name: 'CoreDB LTDA',
  alternateName: 'CoreDB',
  description:
    'Empresa de engenharia e execução de tecnologia crítica, com atuação em Protheus, RM e Fluig e administração de bancos de dados SQL Server, Oracle, PostgreSQL e MySQL.',
  url: SITE_URL,
  logo: `${SITE_URL}/brand/header-logo-light.svg`,
  image: `${SITE_URL}/social/open-graph-logo-card-1200x630.png`,
  telephone: '+55-31-99187-3435',
  email: 'comercial@coredb.com.br',
  sameAs: ['https://www.linkedin.com/in/coredb-consultoria-83319236b/'],
}

const websiteSchema = {
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  name: 'CoreDB',
  url: SITE_URL,
  inLanguage: 'pt-BR',
  publisher: { '@id': ORGANIZATION_ID },
}

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [organizationSchema, websiteSchema],
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${sourceSans.variable} ${roboto.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body
        style={{
          fontFamily: "var(--font-roboto), 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        }}
      >
        {children}
        <CookieConsent />
      </body>
    </html>
  )
}
