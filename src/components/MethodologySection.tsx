import { Search, BarChart3, Wrench, Shield, Radar } from 'lucide-react';

export default function MethodologySection() {
  const steps = [
    {
      icon: Search,
      title: 'Diagnóstico Técnico Estruturado',
      description: 'Mapeamos sistemas, rotinas críticas, infraestrutura e riscos operacionais com visão completa do ambiente.'
    },
    {
      icon: BarChart3,
      title: 'Análise de Causa Raiz',
      description: 'Identificamos as causas reais de lentidão, falhas e vulnerabilidades. Não tratamos sintomas.'
    },
    {
      icon: Wrench,
      title: 'Plano de Ação Prioritário',
      description: 'Definimos intervenções estruturadas em ERP e banco de dados com foco em impacto real no negócio.'
    },
    {
      icon: Shield,
      title: 'Implementação Controlada',
      description: 'Executamos ajustes com governança, documentação e mitigação de riscos.'
    },
    {
      icon: Radar,
      title: 'Monitoramento Contínuo',
      description: 'Acompanhamento ativo de performance, indicadores e evolução do ambiente.'
    }
  ];

  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">

        <span className="text-[var(--coredb-cyan)] uppercase tracking-widest text-xs font-semibold mb-6 inline-block">
          Framework CoreDB
        </span>

        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[#0B1C2D] mb-8">
          Nossa Estrutura de Blindagem Operacional
        </h2>

        <p className="text-lg md:text-xl text-[#4B5563] max-w-3xl leading-relaxed mb-16">
          Atuamos de forma estruturada, conectando ERP, banco de dados e governança técnica.
          Cada etapa é documentada, mensurável e orientada à redução de risco.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="border border-[#E5E7EB] rounded-xl p-6"
              >
                <div className="mb-4 text-sm font-semibold text-[var(--coredb-cyan)]">
                  Etapa {index + 1}
                </div>

                <Icon className="w-6 h-6 text-[var(--coredb-cyan)] mb-4" />

                <h3 className="text-base font-semibold text-[#0B1C2D] mb-2">
                  {step.title}
                </h3>

                <p className="text-sm text-[#4B5563] leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}