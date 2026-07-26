import type { Metadata } from 'next'
import PrivacyPolicyView from '@/views/politica-de-privacidade'

export const metadata: Metadata = {
  title: 'Política de Privacidade',
  description: 'Política de privacidade da CoreDB — como coletamos, usamos e protegemos seus dados pessoais.',
  alternates: { canonical: '/politica-de-privacidade' },
  robots: { index: false, follow: false },
  openGraph: {
    title: 'Política de Privacidade | CoreDB',
    description: 'Política de privacidade da CoreDB — como coletamos, usamos e protegemos seus dados pessoais.',
    url: '/politica-de-privacidade',
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
    title: 'Política de Privacidade | CoreDB',
    description: 'Política de privacidade da CoreDB — como coletamos, usamos e protegemos seus dados pessoais.',
    images: ['/social/social-share-logo-card-1200x630.png'],
  },
}

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyView />
}
