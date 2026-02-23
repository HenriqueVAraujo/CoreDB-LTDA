import { GitBranch, ShieldCheck, BarChart3 } from "lucide-react";

export default function GuaranteeSection() {
  const guarantees = [
    {
      icon: GitBranch,
      title: "Modelo de Entrega Estruturado",
      description:
        "Ciclos técnicos organizados com planejamento formal, validação documentada e evolução controlada do ambiente.",
      features: [
        "Ciclos planejados",
        "Validação técnica formal",
        "Controle de mudanças",
        "Evolução incremental estruturada",
      ],
    },
    {
      icon: ShieldCheck,
      title: "SLA Contratual Formalizado",
      description:
        "Definição clara de níveis de criticidade, tempos de resposta garantidos e métricas objetivas de desempenho.",
      features: [
        "SLA crítico definido em contrato",
        "Indicadores mensuráveis",
        "Segurança jurídica",
        "Cláusulas de responsabilidade",
      ],
    },
    {
      icon: BarChart3,
      title: "Governança e Transparência",
      description:
        "Acompanhamento contínuo por indicadores operacionais e acesso integral ao histórico técnico da operação.",
      features: [
        "Indicadores operacionais",
        "Histórico completo de chamados",
        "Relatórios periódicos",
        "Visibilidade total da operação",
      ],
    },
  ];

  return (
    <section className="py-24 lg:py-32 bg-[var(--coredb-dark)] text-white">
      <div className="container mx-auto px-4 max-w-6xl">

        {/* Header */}
        <div className="mb-20 max-w-3xl">
          <span className="text-[var(--coredb-cyan)] uppercase tracking-widest text-xs font-semibold mb-6 inline-block">
            Compromissos Operacionais
          </span>

          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-8">
            Garantia Estruturada em Contrato
          </h2>

          <p className="text-lg md:text-xl text-white/70 leading-relaxed">
            Nossa atuação é formalizada por métricas claras, níveis de serviço
            definidos e governança contínua da operação.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {guarantees.map((guarantee, index) => {
            const Icon = guarantee.icon;

            return (
              <div
                key={index}
                className="flex flex-col h-full bg-white/5 rounded-xl p-8 border border-white/10 hover:border-[var(--coredb-cyan)]/40 transition-all duration-300"
              >
                {/* Icon */}
                <div className="mb-6">
                  <Icon className="w-7 h-7 text-[var(--coredb-cyan)]" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold mb-4">
                  {guarantee.title}
                </h3>

                <p className="text-white/70 text-sm leading-relaxed mb-6">
                  {guarantee.description}
                </p>

                <div className="space-y-3 text-sm text-white/70">
                  {guarantee.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--coredb-cyan)] mt-2" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Institutional Message */}
        <div className="mt-24 pt-16 border-t border-white/10">
          <div className="max-w-2xl">
            <p className="text-lg text-white/70 leading-relaxed">
              Mais do que execução técnica, entregamos{" "}
              <span className="font-semibold text-white">
                previsibilidade operacional e segurança contratual
              </span>{" "}
              para ambientes críticos.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}