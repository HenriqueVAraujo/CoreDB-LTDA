import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

type TechnologyCard = {
  href: string
  title: string
  description: string
}

type TechnologyCardsProps = {
  headingId: string
  eyebrow: string
  title: string
  description: string
  items: TechnologyCard[]
}

export default function TechnologyCards({
  headingId,
  eyebrow,
  title,
  description,
  items,
}: TechnologyCardsProps) {
  return (
    <section className="bg-[#F4F7FA] py-20 md:py-28" aria-labelledby={headingId}>
      <div className="container mx-auto max-w-6xl px-4">
        <div className="mb-12 max-w-3xl">
          <span className="text-sm font-bold uppercase tracking-[0.16em] text-[#087DB8]">{eyebrow}</span>
          <h2 id={headingId} className="mt-3 text-3xl font-bold text-[var(--coredb-dark)] md:text-5xl">
            {title}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-[#4B5563]">{description}</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group min-w-0 rounded-2xl border border-gray-200 bg-white p-6 transition hover:-translate-y-1 hover:border-[var(--coredb-cyan)] hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#087DB8]"
            >
              <h3 className="break-words text-xl font-bold text-[var(--coredb-dark)]">{item.title}</h3>
              <p className="mt-3 break-words leading-relaxed text-[#4B5563]">{item.description}</p>
              <span className="mt-5 inline-flex items-center gap-2 font-semibold text-[#087DB8]">
                Conhecer esta especialidade
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
