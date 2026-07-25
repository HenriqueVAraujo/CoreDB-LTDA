'use client'

import { Shield, Zap, Database, ArrowRight, Gauge } from 'lucide-react';

const TRIAGE_LABEL = 'Agendar uma triagem técnica de risco do RM — 20 minutos.'
const TRIAGE_URL =
  'https://wa.me/553191873435?text=' +
  encodeURIComponent('Olá! Gostaria de agendar uma triagem técnica de risco do RM — 20 minutos.')

export default function ConsultoriaTOTVS() {
  const features = [
    {
      icon: Gauge,
      title: 'Tuning de Performance',
      description: 'Análise de camadas, do dicionário de dados às consultas de banco, com ajustes orientados por métricas.'
    },
    {
      icon: Database,
      title: 'Atuação Integrada',
      description: 'Análise conjunta de ERP e bancos SQL Server ou Oracle, com resultados avaliados por indicadores do ambiente.'
    },
    {
      icon: Zap,
      title: 'Resolução de Gargalos',
      description: 'Identificação e tratamento de gargalos em rotinas críticas de faturamento, estoque e contabilidade.'
    },
    {
      icon: Shield,
      title: 'Atualização Planejada',
      description: 'Migrações de versão, aplicação de patches e releases com planejamento, homologação e critérios técnicos definidos.'
    }
  ];

  const methodology = [
    {
      step: '1',
      title: 'Diagnóstico Técnico',
      description: 'Análise técnica da infraestrutura, banco de dados e aderência dos processos ao padrão TOTVS.'
    },
    {
      step: '2',
      title: 'Plano de Estabilização',
      description: 'Priorização de melhorias conforme os achados, o impacto operacional e o escopo aprovado.'
    },
    {
      step: '3',
      title: 'Otimização de Processos',
      description: 'Revisão de customizações (ADVPL/TLPP/RM) para avaliar performance e integridade com critérios técnicos documentados.'
    },
    {
      step: '4',
      title: 'Evolução Estratégica',
      description: 'Acompanhamento conforme o contrato para apoiar a evolução planejada do ERP.'
    }
  ];

  return (
    <main className="min-h-screen bg-white">
      
      {/* Hero Section */}
      <section className="relative bg-[#0B1C2D] min-h-[80vh] flex items-center py-20">
        <div className="container mx-auto px-4 max-w-5xl text-white">
          <span className="text-[var(--coredb-cyan)] font-bold tracking-widest uppercase text-sm mb-4 inline-block">
            Diagnóstico Executivo de Risco TOTVS RM
          </span>

          <h1
            className="text-4xl md:text-7xl font-bold tracking-tighter leading-tight mb-6 text-left"
            style={{ fontWeight: 700 }}
          >
            Consultoria TOTVS em Belo Horizonte — <br className="hidden md:block" />
            <span className="text-[var(--coredb-cyan)]"> Protheus, RM e Fluig.</span>
          </h1>

          <p className="text-lg md:text-xl text-white/70 mb-10 max-w-3xl leading-relaxed">
            Blindamos ambientes TOTVS e bancos de dados que não podem parar. A atuação combina diagnóstico técnico de ERP e banco de dados, conforme o escopo contratado.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 mt-8">
            <a
              href={TRIAGE_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={TRIAGE_LABEL}
              className="inline-flex w-full sm:w-auto items-center justify-center text-center whitespace-normal font-bold rounded-lg px-6 sm:px-10 py-5 text-base sm:text-lg shadow-lg transition-all duration-300 hover:scale-105"
              style={{ background: 'var(--coredb-cyan)', color: 'var(--coredb-dark)' }}
            >
              Agendar triagem técnica
            </a>
            
          </div>
        </div>

        <div className="absolute inset-0 -z-10">
          <div className="bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-600/10 via-[#0B1C2D] to-[#0B1C2D] w-full h-full" />
        </div>
      </section>

      {/* Diferenciais Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mb-20">
            <h2 
              className="text-4xl md:text-5xl font-bold text-[var(--coredb-dark)] mb-6"
              style={{ fontWeight: 700 }}
            >
              Atuação integrada em <br />
              <span className="text-[var(--coredb-dark)]">ERP e banco de dados.</span>
            </h2>
            <p className="text-lg text-[#4B5563] leading-relaxed">
              A análise correlaciona infraestrutura, banco de dados, ERP e processos para orientar prioridades técnicas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="group bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                >
                  <div className="w-14 h-14 rounded-xl bg-[var(--coredb-cyan)]/10 flex items-center justify-center mb-6 group-hover:bg-[var(--coredb-cyan)] transition-all duration-500">
                    <Icon className="w-7 h-7 text-[var(--coredb-cyan)] group-hover:text-[var(--coredb-dark)] transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold text-[var(--coredb-dark)] mb-4 tracking-tight">
                    {feature.title}
                  </h3>
                  <p className="text-[#6B7280] leading-relaxed text-sm">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section className="py-20 md:py-32 bg-[#F9FAFB]">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl font-bold text-[var(--coredb-dark)] mb-6">Etapas da atuação técnica</h2>
            <div className="h-1.5 w-24 bg-[var(--coredb-cyan)] mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {methodology.map((item, index) => (
              <div key={index} className="relative">
                <div className="text-8xl font-black text-[var(--coredb-cyan)]/10 absolute -top-8 -left-4 select-none">
                  {item.step}
                </div>
                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-[var(--coredb-dark)] mb-4">{item.title}</h3>
                  <p className="text-[#4B5563] text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-24 bg-[#0B1C2D] text-white text-center">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto p-6 sm:p-12 rounded-3xl border border-white/5 bg-gradient-to-br from-[#0B1C2D] to-[#152a3d] shadow-2xl">
            <h2 className="text-3xl md:text-5xl font-bold mb-8">Comece pelo diagnóstico técnico do ambiente.</h2>
            <p className="text-white/60 text-lg mb-10 max-w-2xl mx-auto">
              Diagnóstico Executivo de Risco TOTVS RM. A triagem técnica inicial leva 20 minutos.
            </p>
            <a
              href={TRIAGE_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={TRIAGE_LABEL}
              className="group flex w-full sm:w-auto items-center justify-center gap-3 mx-auto px-6 sm:px-10 py-5 text-center whitespace-normal font-bold rounded-xl transition-all duration-300 hover:gap-5"
              style={{ background: 'var(--coredb-cyan)', color: 'var(--coredb-dark)' }}
            >
              Agendar triagem técnica
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
