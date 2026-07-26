import type { Metadata } from 'next'
import TermsOfUseView from '@/views/termos-de-uso'

export const metadata: Metadata = {
  title: 'Termos de Uso',
  description: 'Termos de uso do site CoreDB — condições gerais de acesso e utilização dos serviços.',
  alternates: { canonical: '/termos-de-uso' },
  robots: { index: false, follow: false },
  openGraph: {
    title: 'Termos de Uso | CoreDB',
    description: 'Termos de uso do site CoreDB — condições gerais de acesso e utilização dos serviços.',
    url: '/termos-de-uso',
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
    title: 'Termos de Uso | CoreDB',
    description: 'Termos de uso do site CoreDB — condições gerais de acesso e utilização dos serviços.',
    images: ['/social/social-share-logo-card-1200x630.png'],
  },
}

export default function TermsOfUsePage() {
  return <TermsOfUseView />
}
