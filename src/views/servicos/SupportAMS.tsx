'use client'

import { Shield, Clock, BarChart3, ArrowRight, CheckCircle2, Headphones } from 'lucide-react';

const TRIAGE_LABEL = 'Agendar uma triagem técnica de risco do RM — 20 minutos.'
const TRIAGE_URL =
  'https://wa.me/553191873435?text=' +
  encodeURIComponent('Olá! Gostaria de agendar uma triagem técnica de risco do RM — 20 minutos.')

export default function SupportAMS() {
  const diferenciais = [
    {
      icon: Shield,
      title: 'Governança via GLPI',
      description: 'Gestão profissional de chamados com histórico auditável e visibilidade dos chamados no GLPI.'
    },
    {
      icon: Clock,
      title: 'SLA de Resposta Crítica',
      description: 'Tempos definidos por criticidade no SLA. Cobertura e horários conforme contrato.'
    },
    {
      icon: Headphones,
      title: 'Encaminhamento Técnico',
      description: 'Tratamento e escalada dos chamados conforme criticidade, responsabilidades e cobertura contratada.'
    },
    {
      icon: BarChart3,
      title: 'Relatórios Mensais',
      description: 'Análise de indicadores e volume de chamados conforme a governança definida no serviço.'
    }
  ];

  const metodologia = [
    {
      step: '1',
      title: 'Onboarding e GLPI',
      description: 'Configuração do ambiente de governança e integração com os usuários chave da sua empresa.'
    },
    {
      step: '2',
      title: 'Análise de Recorrências',
      description: 'Levantamento inicial para identificar padrões e priorizar causas recorrentes dos chamados.'
    },
    {
      step: '3',
      title: 'Atendimento Consultivo',
      description: 'Tratamento dos chamados e investigação de causa conforme evidências e escopo contratado.'
    },
    {
      step: '4',
      title: 'Evolução do ERP',
      description: 'Recomendações de melhoria baseadas nos indicadores e no histórico do atendimento.'
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
            Suporte AMS TOTVS em BH e Todo o Brasil: <br className="hidden md:block" />
            <span className="text-[var(--coredb-cyan)]">governança e SLA contratual.</span>
          </h1>

          <p className="text-lg md:text-xl text-white/70 mb-10 max-w-3xl leading-relaxed">
            Blindamos ambientes TOTVS e bancos de dados que não podem parar. A sustentação AMS segue governança, cobertura e tempos definidos no contrato.
          </p>

          {/* Trust Bar Customizada */}
          <div className="flex flex-wrap gap-8 mt-8 border-t border-white/10 pt-8">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-[var(--coredb-cyan)]" />
              <p className="text-sm font-medium text-white/60 uppercase tracking-wider">SLA Contratual</p>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-[var(--coredb-cyan)]" />
              <p className="text-sm font-medium text-white/60 uppercase tracking-wider">Governança GLPI</p>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-[var(--coredb-cyan)]" />
              <p className="text-sm font-medium text-white/60 uppercase tracking-wider">Cobertura Contratada</p>
            </div>
          </div>

          {/* Botões - Única Ação (WhatsApp) */}
          <div className="mt-12">
            <a
              href={TRIAGE_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={TRIAGE_LABEL}
              className="inline-flex w-full sm:w-auto items-center justify-center text-center whitespace-normal font-bold rounded-lg px-6 sm:px-10 py-5 text-base sm:text-lg shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
              style={{ background: 'var(--coredb-cyan)', color: 'var(--coredb-dark)' }}
            >
              Agendar triagem técnica
            </a>
          </div>
        </div>

        <div className="absolute inset-0 -z-10">
          <div className="bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-cyan-900/10 via-[#0B1C2D] to-[#0B1C2D] w-full h-full" />
        </div>
      </section>

      {/* Diferenciais Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mb-12 md:mb-16">
            <h2 
              className="text-4xl md:text-5xl font-bold text-[var(--coredb-dark)] mb-6"
              style={{ fontWeight: 700 }}
            >
              Sustentação AMS com <br />
              <span className="text-[var(--coredb-dark)]">governança definida em contrato.</span>
            </h2>
            <p className="text-lg text-[#4B5563] leading-relaxed">
              O histórico e os indicadores dos chamados apoiam a priorização técnica e a melhoria do ambiente.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {diferenciais.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="group bg-[#F8FAFC] rounded-2xl p-8 border border-gray-100 hover:shadow-xl transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-[var(--coredb-cyan)]/10 flex items-center justify-center mb-6 group-hover:bg-[var(--coredb-cyan)] transition-colors">
                    <Icon className="w-6 h-6 text-[var(--coredb-cyan)] group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold text-[var(--coredb-dark)] mb-3 tracking-tight">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Metodologia Section */}
      <section className="py-20 md:py-32 bg-[#F9FAFB]">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl font-bold text-[var(--coredb-dark)] mb-6">Metodologia de Atendimento</h2>
            <div className="h-1.5 w-24 bg-[var(--coredb-cyan)] mx-auto rounded-full" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {metodologia.map((item, index) => (
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

      {/* CTA Final */}
      <section className="py-24 bg-[#0B1C2D] text-white text-center">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto p-6 sm:p-12 rounded-3xl border border-white/5 bg-gradient-to-br from-[#0B1C2D] to-[#152a3d] shadow-2xl">
            <h2 className="text-3xl md:text-5xl font-bold mb-8">Avalie o risco do RM antes de definir a sustentação.</h2>
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
