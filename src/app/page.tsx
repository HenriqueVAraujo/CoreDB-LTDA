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
      'Especialistas em ERP TOTVS e Banco de Dados. Missão crítica, SLA contratual, atendimento nacional. Base em Belo Horizonte, MG.',
    url: '/',
  },
}

export default function HomePage() {
  return <HomeView />
}
