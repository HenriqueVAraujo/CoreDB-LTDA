import type { Metadata } from 'next'
import TermsOfUseView from '@/views/termos-de-uso'

export const metadata: Metadata = {
  title: 'Termos de Uso | CoreDB',
  description: 'Termos de uso do site CoreDB — condições gerais de acesso e utilização dos serviços.',
  alternates: { canonical: '/termos-de-uso' },
  robots: { index: false, follow: false },
}

export default function TermsOfUsePage() {
  return <TermsOfUseView />
}
