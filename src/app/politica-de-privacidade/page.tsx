import type { Metadata } from 'next'
import PrivacyPolicyView from '@/views/politica-de-privacidade'

export const metadata: Metadata = {
  title: 'Política de Privacidade | CoreDB',
  description: 'Política de privacidade da CoreDB — como coletamos, usamos e protegemos seus dados pessoais.',
  alternates: { canonical: '/politica-de-privacidade' },
  robots: { index: false, follow: false },
}

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyView />
}
