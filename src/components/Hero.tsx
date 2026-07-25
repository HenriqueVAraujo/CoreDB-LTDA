'use client'

import { Activity, FileText, BarChart2 } from 'lucide-react'

export default function Hero() {
  const handleCTAClick = () => {
    const url =
      'https://wa.me/553191873435?text=' +
      encodeURIComponent(
        'Olá! Gostaria de agendar uma triagem técnica de risco do RM — 20 minutos.'
      )
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const handleServicesClick = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative bg-[#0B1C2D] min-h-[85vh] flex items-center py-24 lg:py-32 overflow-hidden">

      {/* ─── Layout duas colunas ─── */}
      <div className="container mx-auto px-4 max-w-5xl relative z-10 w-full">
        <div className="max-w-3xl">

          {/* ── Copy + CTAs + trust bar ── */}
          <div className="text-white">

            <span className="inline-block text-[var(--coredb-cyan)] font-semibold tracking-widest uppercase text-xs mb-6 border-l-2 border-[var(--coredb-cyan)] pl-3">
              CONTINUIDADE PARA AMBIENTES TOTVS E BANCOS DE DADOS CRÍTICOS
            </span>

            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.1] mb-8">
              Blindamos ambientes TOTVS e bancos de dados{' '}
              <br className="hidden md:block" />
              <span className="text-[var(--coredb-cyan)]">que não podem parar.</span>
            </h1>

            <p className="text-lg md:text-xl text-white/80 mb-5 max-w-xl leading-relaxed">
              A CoreDB atua na sustentação, evolução e proteção de ambientes TOTVS e bancos de dados
              críticos, combinando diagnóstico técnico, governança, monitoramento automatizado e
              atuação especializada conforme o escopo de cada operação.
            </p>

            <ul
              aria-label="Principais especialidades"
              className="text-sm md:text-base text-white/70 mb-12 max-w-xl leading-relaxed space-y-1"
            >
              <li>
                <strong className="font-semibold text-white/80">TOTVS:</strong>{' '}
                Protheus · RM · Fluig
              </li>
              <li>
                <strong className="font-semibold text-white/80">Bancos de dados:</strong>{' '}
                SQL Server · Oracle · PostgreSQL · MySQL
              </li>
            </ul>

            <div className="flex flex-col sm:flex-row gap-4 mb-16">
              <button
                type="button"
                onClick={handleCTAClick}
                aria-label="Agendar uma triagem técnica de risco do RM — 20 minutos."
                className="w-full sm:w-auto font-bold tracking-wide rounded-lg px-6 sm:px-10 py-5 text-lg text-center whitespace-normal transition-all duration-300 bg-[var(--coredb-cyan)] text-[#0B1C2D] hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(29,174,255,0.5)]"
              >
                Agendar triagem técnica
                <span className="block text-[11px] uppercase tracking-wider opacity-70 font-medium mt-1">
                  20 minutos • avaliação inicial
                </span>
              </button>

              <button
                type="button"
                onClick={handleServicesClick}
                className="w-full sm:w-auto font-semibold rounded-lg px-6 sm:px-10 py-5 text-lg transition-all duration-300 border border-white/20 hover:bg-white/5 text-white"
              >
                Conhecer nossos serviços
              </button>
            </div>

            {/* Trust bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-10 border-t border-white/10">

              <div className="flex items-start gap-3">
                <Activity className="w-7 h-7 text-[var(--coredb-cyan)] shrink-0 mt-0.5" />
                <div>
                  <p
                    className="font-semibold text-sm leading-[1.2] mb-1"
                    style={{ fontFamily: 'var(--font-manrope), Arial, sans-serif' }}
                  >
                    Monitoramento automatizado pelo Zabbix
                  </p>
                  <p className="text-xs text-white/60">
                    24/7, com alertas configurados por criticidade.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <FileText className="w-7 h-7 text-[var(--coredb-cyan)] shrink-0 mt-0.5" />
                <div>
                  <p
                    className="font-semibold text-sm leading-[1.2] mb-1"
                    style={{ fontFamily: 'var(--font-manrope), Arial, sans-serif' }}
                  >
                    SLA Contratual Mensurável
                  </p>
                  <p className="text-xs text-white/60">
                    Tempos de resposta definidos no SLA contratual aplicável.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <BarChart2 className="w-7 h-7 text-[var(--coredb-cyan)] shrink-0 mt-0.5" />
                <div>
                  <p
                    className="font-semibold text-sm leading-[1.2] mb-1"
                    style={{ fontFamily: 'var(--font-manrope), Arial, sans-serif' }}
                  >
                    Governança GLPI + Grafana
                  </p>
                  <p className="text-xs text-white/60">
                    Dashboards de indicadores em tempo real.
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Gradiente de fundo sutil (substitui a div de bg anterior) */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute right-0 top-0 w-2/3 h-full bg-[radial-gradient(ellipse_at_top_right,_rgba(29,174,255,0.07),_transparent_60%)]" />
      </div>

    </section>
  )
}
