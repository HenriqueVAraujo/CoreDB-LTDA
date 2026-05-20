'use client'

import Image from 'next/image'
import { Activity, FileText, BarChart2 } from 'lucide-react'

// 8×5 px WebP sólido em #0B1C2D — placeholder de baixíssimo custo durante preload
const BLUR_PLACEHOLDER =
  'data:image/webp;base64,UklGRioAAABXRUJQVlA4IB4AAABwAQCdASoIAAUABUB8JYwCdAFAAAD+77r9tk3iAAA='

export default function Hero() {
  const handleCTAClick = () => {
    const url =
      'https://wa.me/553191873435?text=' +
      encodeURIComponent(
        'Olá, gostaria de solicitar um diagnóstico técnico do meu ambiente TOTVS e banco de dados para avaliar riscos operacionais.'
      )
    window.open(url, '_blank')
  }

  const handleMethodologyClick = () => {
    document.getElementById('methodology')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative bg-[#0B1C2D] min-h-[85vh] flex items-center py-24 lg:py-32 overflow-hidden">

      {/* ─── Layout duas colunas ─── */}
      <div className="container mx-auto px-4 max-w-6xl relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-12 xl:gap-20 items-center">

          {/* ── Coluna esquerda: copy + CTAs + trust bar ── */}
          <div className="text-white">

            <span className="inline-block text-[var(--coredb-cyan)] font-semibold tracking-widest uppercase text-xs mb-6 border-l-2 border-[var(--coredb-cyan)] pl-3">
              Blindagem Transacional para TOTVS
            </span>

            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.1] mb-8">
              Blindamos ambientes TOTVS <br className="hidden md:block" />
              que{' '}
              <span className="text-[var(--coredb-cyan)]">não podem parar.</span>
            </h1>

            <p className="text-lg md:text-xl text-white/80 mb-12 max-w-xl leading-relaxed">
              Quando o ERP para, o negócio para. A CoreDB atua antes disso acontecer — com
              monitoramento ativo via <strong>Zabbix</strong>, dashboards de performance em{' '}
              <strong>Grafana</strong> e SLA formalizado em contrato. Seu{' '}
              <strong>Protheus, RM ou Fluig</strong> com previsibilidade real.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-16">
              <button
                onClick={handleCTAClick}
                className="font-bold tracking-wide rounded-lg px-10 py-5 text-lg transition-all duration-300 bg-[var(--coredb-cyan)] text-[#0B1C2D] hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(29,174,255,0.5)]"
              >
                Solicitar Diagnóstico Técnico
                <span className="block text-[11px] uppercase tracking-wider opacity-70 font-medium mt-1">
                  Avaliação inicial estruturada
                </span>
              </button>

              <button
                onClick={handleMethodologyClick}
                className="font-semibold rounded-lg px-10 py-5 text-lg transition-all duration-300 border border-white/20 hover:bg-white/5 text-white"
              >
                Entender Nossa Metodologia
              </button>
            </div>

            {/* Trust bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-10 border-t border-white/10">

              <div className="flex items-start gap-3">
                <Activity className="w-7 h-7 text-[var(--coredb-cyan)] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-sm mb-1">Monitoramento Zabbix 24/7</h4>
                  <p className="text-xs text-white/60">
                    Alertas proativos antes do usuário perceber.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <FileText className="w-7 h-7 text-[var(--coredb-cyan)] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-sm mb-1">SLA Contratual Mensurável</h4>
                  <p className="text-xs text-white/60">
                    Chamados gerenciados via GLPI com tempos garantidos.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <BarChart2 className="w-7 h-7 text-[var(--coredb-cyan)] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-sm mb-1">Governança GLPI + Grafana</h4>
                  <p className="text-xs text-white/60">
                    Dashboards de indicadores em tempo real.
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* ── Coluna direita: cubo 3D animado ── */}
          {/*
           * priority={true} → adiciona <link rel="preload" fetchpriority="high"> no <head>.
           * Imagem hero é o LCP — usar loading="lazy" aqui quebraria Core Web Vitals.
           * sizes reflete a largura real do container (420 px fixo em lg+, 100vw em mobile).
           */}
          <div className="hidden lg:block relative w-[420px] h-[420px] shrink-0">
            <Image
              src="/images/hero-lg.webp"
              alt="Cubo de blindagem transacional com anéis orbitais de monitoramento — CoreDB"
              fill
              priority
              sizes="420px"
              quality={90}
              className="object-contain animate-hero3d drop-shadow-[0_0_48px_rgba(29,174,255,0.25)]"
              placeholder="blur"
              blurDataURL={BLUR_PLACEHOLDER}
            />
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
