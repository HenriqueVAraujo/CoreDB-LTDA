import Link from 'next/link'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import type { CtaConfig } from '@/routes'

export type TechnicalDetail = {
  title: string
  description: string
}

export type TechnicalFaq = {
  question: string
  answer: string
}

export type TechnicalLink = {
  href: string
  label: string
  description: string
}

type TechnicalServicePageProps = {
  editorialLabel: string
  title: string
  introduction: string
  signals: TechnicalDetail[]
  impacts: TechnicalDetail[]
  workstreams: TechnicalDetail[]
  deliverables: string[]
  scopeNote: string
  hiringCriteria: string[]
  faq: TechnicalFaq[]
  hub: TechnicalLink
  siblings: TechnicalLink[]
  cta: CtaConfig
  ctaText: string
  ctaDescription: string
  offerNote?: string
}

function DetailGrid({ items }: { items: TechnicalDetail[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <article
          key={item.title}
          className="min-w-0 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
        >
          <h3 className="mb-3 break-words text-xl font-bold text-[var(--coredb-dark)]">
            {item.title}
          </h3>
          <p className="break-words leading-relaxed text-[#4B5563]">{item.description}</p>
        </article>
      ))}
    </div>
  )
}

export default function TechnicalServicePage({
  editorialLabel,
  title,
  introduction,
  signals,
  impacts,
  workstreams,
  deliverables,
  scopeNote,
  hiringCriteria,
  faq,
  hub,
  siblings,
  cta,
  ctaText,
  ctaDescription,
  offerNote,
}: TechnicalServicePageProps) {
  return (
    <main className="min-h-screen overflow-x-hidden bg-white">
      <section className="bg-[var(--coredb-dark)] pb-20 pt-32 text-white md:pb-28 md:pt-40">
        <div className="container mx-auto max-w-5xl px-4">
          <nav aria-label="Breadcrumb" className="mb-8 text-sm text-white/70">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link
                  href="/"
                  className="rounded-sm underline-offset-4 hover:text-white hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--coredb-cyan)]"
                >
                  Início
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link
                  href={hub.href}
                  className="rounded-sm underline-offset-4 hover:text-white hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--coredb-cyan)]"
                >
                  {hub.label}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-white">
                {editorialLabel}
              </li>
            </ol>
          </nav>

          <span className="mb-4 inline-block text-sm font-bold uppercase tracking-[0.18em] text-[var(--coredb-cyan)]">
            {editorialLabel}
          </span>
          <h1 className="max-w-4xl break-words text-4xl font-bold leading-tight tracking-tight md:text-6xl">
            {title}
          </h1>
          <p className="mt-6 max-w-3xl break-words text-lg leading-relaxed text-white/75 md:text-xl">
            {introduction}
          </p>
          <a
            href={cta.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={cta.label}
            className="mt-10 inline-flex w-full items-center justify-center gap-3 rounded-xl bg-[var(--coredb-cyan)] px-6 py-5 text-center text-base font-bold text-[var(--coredb-dark)] transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:w-auto sm:px-10 sm:text-lg"
          >
            {ctaText}
            <ArrowRight className="h-5 w-5 shrink-0" aria-hidden="true" />
          </a>
        </div>
      </section>

      <section className="py-20 md:py-28" aria-labelledby="signals-heading">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="mb-12 max-w-3xl">
            <span className="text-sm font-bold uppercase tracking-[0.16em] text-[#087DB8]">
              Diagnóstico técnico
            </span>
            <h2 id="signals-heading" className="mt-3 text-3xl font-bold text-[var(--coredb-dark)] md:text-5xl">
              Sinais de risco e sintomas que merecem investigação
            </h2>
          </div>
          <DetailGrid items={signals} />
        </div>
      </section>

      <section className="bg-[#F4F7FA] py-20 md:py-28" aria-labelledby="impacts-heading">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="mb-12 max-w-3xl">
            <span className="text-sm font-bold uppercase tracking-[0.16em] text-[#087DB8]">
              Continuidade operacional
            </span>
            <h2 id="impacts-heading" className="mt-3 text-3xl font-bold text-[var(--coredb-dark)] md:text-5xl">
              Impactos que precisam ser tratados com prioridade e contexto
            </h2>
          </div>
          <DetailGrid items={impacts} />
        </div>
      </section>

      <section className="py-20 md:py-28" aria-labelledby="workstreams-heading">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="mb-12 max-w-3xl">
            <span className="text-sm font-bold uppercase tracking-[0.16em] text-[#087DB8]">
              Atuação CoreDB
            </span>
            <h2 id="workstreams-heading" className="mt-3 text-3xl font-bold text-[var(--coredb-dark)] md:text-5xl">
              Frentes de atuação adaptadas ao ambiente
            </h2>
          </div>
          <DetailGrid items={workstreams} />
        </div>
      </section>

      <section className="bg-[var(--coredb-dark)] py-20 text-white md:py-28" aria-labelledby="deliverables-heading">
        <div className="container mx-auto grid max-w-6xl gap-12 px-4 lg:grid-cols-2">
          <div>
            <span className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--coredb-cyan)]">
              Entregáveis possíveis
            </span>
            <h2 id="deliverables-heading" className="mt-3 text-3xl font-bold md:text-5xl">
              Evidências e prioridades para apoiar decisões técnicas
            </h2>
            <ul className="mt-8 space-y-4">
              {deliverables.map((item) => (
                <li key={item} className="flex min-w-0 items-start gap-3 text-white/80">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[var(--coredb-cyan)]" aria-hidden="true" />
                  <span className="break-words">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <aside className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8" aria-labelledby="scope-heading">
            <h2 id="scope-heading" className="text-2xl font-bold">
              Limites e dependências do escopo
            </h2>
            <p className="mt-4 break-words leading-relaxed text-white/75">{scopeNote}</p>
            {offerNote ? (
              <p className="mt-6 rounded-xl border border-[var(--coredb-cyan)]/40 bg-[var(--coredb-cyan)]/10 p-5 leading-relaxed text-white">
                {offerNote}
              </p>
            ) : null}
          </aside>
        </div>
      </section>

      <section className="py-20 md:py-28" aria-labelledby="hiring-heading">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <span className="text-sm font-bold uppercase tracking-[0.16em] text-[#087DB8]">
                Momento de contratar
              </span>
              <h2 id="hiring-heading" className="mt-3 text-3xl font-bold text-[var(--coredb-dark)] md:text-5xl">
                Quando uma avaliação especializada faz sentido
              </h2>
            </div>
            <ul className="grid gap-4">
              {hiringCriteria.map((item) => (
                <li key={item} className="flex min-w-0 items-start gap-3 rounded-xl border border-gray-100 p-5 text-[#374151]">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#087DB8]" aria-hidden="true" />
                  <span className="break-words">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-[#F4F7FA] py-20 md:py-28" aria-labelledby="faq-heading">
        <div className="container mx-auto max-w-4xl px-4">
          <span className="text-sm font-bold uppercase tracking-[0.16em] text-[#087DB8]">FAQ técnico</span>
          <h2 id="faq-heading" className="mt-3 text-3xl font-bold text-[var(--coredb-dark)] md:text-5xl">
            Perguntas frequentes
          </h2>
          <div className="mt-10 space-y-4">
            {faq.map((item) => (
              <details key={item.question} className="group rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
                <summary className="cursor-pointer rounded-sm text-lg font-bold text-[var(--coredb-dark)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#087DB8]">
                  {item.question}
                </summary>
                <p className="mt-4 break-words leading-relaxed text-[#4B5563]">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20" aria-labelledby="related-heading">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="rounded-2xl border border-gray-100 p-6 sm:p-8">
            <h2 id="related-heading" className="text-2xl font-bold text-[var(--coredb-dark)]">
              Continue explorando o portfólio técnico
            </h2>
            <Link
              href={hub.href}
              className="mt-4 inline-flex rounded-sm font-semibold text-[#087DB8] underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#087DB8]"
            >
              {hub.description}
            </Link>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {siblings.map((sibling) => (
                <Link
                  key={sibling.href}
                  href={sibling.href}
                  className="group rounded-xl border border-gray-200 p-5 transition hover:border-[var(--coredb-cyan)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#087DB8]"
                >
                  <span className="block font-bold text-[var(--coredb-dark)]">{sibling.label}</span>
                  <span className="mt-2 block text-sm leading-relaxed text-[#4B5563]">{sibling.description}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--coredb-dark)] py-20 text-center text-white" aria-labelledby="cta-heading">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 id="cta-heading" className="text-3xl font-bold md:text-5xl">
            {ctaDescription}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-white/70">
            A triagem inicial organiza contexto, prioridades e próximos passos conforme o ambiente apresentado.
          </p>
          <a
            href={cta.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={cta.label}
            className="mt-8 inline-flex w-full items-center justify-center gap-3 rounded-xl bg-[var(--coredb-cyan)] px-6 py-5 text-center text-base font-bold text-[var(--coredb-dark)] transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:w-auto sm:px-10 sm:text-lg"
          >
            {ctaText}
            <ArrowRight className="h-5 w-5 shrink-0" aria-hidden="true" />
          </a>
        </div>
      </section>
    </main>
  )
}
