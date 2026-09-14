import { Search, Wrench, ShieldCheck, TrendingUp } from 'lucide-react';

export default function MethodologySection() {
  const steps = [
    {
      icon: Search,
      title: 'Diagnosticar',
      description: 'Mapeamos sintomas, sistemas, rotinas críticas, infraestrutura, integrações e evidências para entender o cenário real antes de intervir.'
    },
    {
      icon: Wrench,
      title: 'Corrigir',
      description: 'Tratamos causas técnicas priorizadas com mudanças controladas, critérios de homologação e documentação do que foi executado.'
    },
    {
      icon: ShieldCheck,
      title: 'Assumir',
      description: 'Estruturamos responsabilidades, monitoramento, governança e cobertura operacional conforme o escopo e o SLA contratados.'
    },
    {
      icon: TrendingUp,
      title: 'Evoluir',
      description: 'Acompanhamos indicadores, capacidade e novas necessidades para orientar melhorias contínuas e decisões de evolução do ambiente.'
    }
  ];

  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">

        <span className="text-[var(--coredb-dark)] uppercase tracking-widest text-xs font-semibold mb-6 inline-block">
          Jornada CoreDB
        </span>

        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[#0B1C2D] mb-8">
          Diagnosticar → Corrigir → Assumir → Evoluir
        </h2>

        <p className="text-lg md:text-xl text-[#4B5563] max-w-3xl leading-relaxed mb-16">
          A atuação conecta ERP, banco de dados e governança técnica em uma jornada única,
          com evidências, responsabilidades e critérios definidos para cada etapa.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={step.title}
                className="border border-[#E5E7EB] rounded-xl p-6"
              >
                <div className="mb-4 text-sm font-semibold text-[var(--coredb-dark)]">
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
