import { CheckCircle2 } from "lucide-react";

export default function AboutSection() {
  const areas = [
    {
      title: "TOTVS RM",
      description:
        "Implantação, tuning e sustentação estruturada dos módulos RM com foco em estabilidade e governança operacional.",
    },
    {
      title: "TOTVS Protheus",
      description:
        "Parametrização avançada, integrações seguras e otimização contínua para ambientes críticos.",
    },
    {
      title: "Administração de Banco de Dados (DBA)",
      description:
        "Monitoramento, performance, alta disponibilidade e políticas formais de backup para SQL Server e Oracle.",
    },
    {
      title: "Fluig e Automação de Processos",
      description:
        "Desenvolvimento de fluxos, portais e integrações que conectam processos e reduzem dependências manuais.",
    },
  ];

  const differentials = [
    {
      title: "Atuação Direta e Técnica",
      description:
        "Relacionamento direto com especialista responsável, garantindo agilidade e profundidade técnica.",
    },
    {
      title: "Visão Integrada de ERP e Banco",
      description:
        "Atuação simultânea na aplicação e na base de dados, eliminando conflitos entre camadas técnicas.",
    },
    {
      title: "Modelo Flexível de Contratação",
      description:
        "Estrutura adaptável à criticidade da operação, com definição clara de SLA e escopo técnico.",
    },
  ];

  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">

        {/* Header */}
        <div className="mb-20 max-w-3xl">
          <span className="text-[var(--coredb-cyan)] uppercase tracking-widest text-xs font-semibold mb-6 inline-block">
            Sobre a CoreDB
          </span>

          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[var(--coredb-dark)] mb-8">
            Consultoria Especializada em Ambientes TOTVS Críticos
          </h2>

          <p className="text-lg md:text-xl text-[#4B5563] leading-relaxed">
            A CoreDB é uma consultoria independente focada em sustentação,
            governança e performance de ambientes TOTVS e bancos de dados.
            Atuamos em operações que exigem estabilidade contínua e controle técnico rigoroso.
          </p>
        </div>

        {/* Areas of Expertise */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-24">
          {areas.map((area, index) => (
            <div
              key={index}
              className="flex items-start gap-4 border border-gray-200 rounded-xl p-8"
            >
              <CheckCircle2 className="w-5 h-5 text-[var(--coredb-cyan)] mt-1" />

              <div>
                <h3 className="text-lg font-semibold text-[var(--coredb-dark)] mb-3">
                  {area.title}
                </h3>
                <p className="text-[#4B5563] leading-relaxed">
                  {area.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Differentials */}
        <div className="border-t border-gray-200 pt-20">
          <h3 className="text-2xl md:text-3xl font-semibold text-[var(--coredb-dark)] mb-16">
            Estrutura de Atuação
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {differentials.map((diff, index) => (
              <div key={index}>
                <div className="text-[var(--coredb-cyan)] font-bold mb-4">
                  0{index + 1}
                </div>

                <h4 className="text-lg font-semibold text-[var(--coredb-dark)] mb-3">
                  {diff.title}
                </h4>

                <p className="text-[#4B5563] leading-relaxed">
                  {diff.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Message */}
        <div className="mt-24 pt-16 border-t border-gray-200">
          <p className="text-lg text-[#4B5563] max-w-2xl leading-relaxed">
            Atuamos de forma integrada no ERP e na camada de dados,
            garantindo visão técnica ponta a ponta e eliminando riscos
            causados por fragmentação de responsabilidade.
          </p>
        </div>

      </div>
    </section>
  );
}