import type { Metadata } from 'next'
import CareersForm from '@/components/CareersForm'

const DESCRIPTION =
  'Trabalhe na CoreDB: engenharia e execução de tecnologia crítica para ambientes TOTVS e bancos de dados. Envie seu perfil para o nosso banco de talentos.'

export const metadata: Metadata = {
  title: 'Trabalhe Conosco',
  description: DESCRIPTION,
  alternates: { canonical: '/trabalhe-conosco' },
  openGraph: {
    title: 'Trabalhe Conosco | CoreDB',
    description: DESCRIPTION,
    url: '/trabalhe-conosco',
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
    title: 'Trabalhe Conosco | CoreDB',
    description: DESCRIPTION,
    images: ['/social/social-share-logo-card-1200x630.png'],
  },
}

const areas = [
  'DBA — SQL Server, Oracle, PostgreSQL e MySQL',
  'Protheus / ADVPL, RM e Fluig',
  'Desenvolvimento e integrações',
  'Infraestrutura e monitoramento (Zabbix / Grafana)',
]

export default function TrabalheConoscoPage() {
  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen bg-white pt-20 outline-none">
      <section className="bg-[var(--coredb-dark)] py-20 text-white md:py-24">
        <div className="container mx-auto max-w-4xl px-4">
          <span className="mb-6 inline-block text-xs font-semibold uppercase tracking-widest text-[var(--coredb-cyan)]">
            Carreiras
          </span>
          <h1 className="mb-6 text-4xl font-bold !text-white md:text-5xl">Trabalhe Conosco</h1>
          <p className="max-w-2xl text-lg leading-relaxed text-white/80">
            A CoreDB atua com engenharia e execução de tecnologia crítica em ambientes TOTVS e bancos de dados.
            Se você gosta de resolver problemas técnicos de verdade, envie seu perfil para o nosso banco de talentos.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto grid max-w-5xl grid-cols-1 gap-12 px-4 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <h2 className="mb-4 text-xl font-bold text-[var(--coredb-dark)]">Áreas de interesse</h2>
            <ul className="space-y-3 text-sm text-gray-600">
              {areas.map((area) => (
                <li key={area} className="flex items-start gap-2">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--coredb-cyan)]" />
                  <span>{area}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-gray-500">
              Não há vagas abertas garantidas: seu perfil fica no banco de talentos para futuras oportunidades.
            </p>
          </div>

          <div className="lg:col-span-2">
            <CareersForm />
          </div>
        </div>
      </section>
    </main>
  )
}
