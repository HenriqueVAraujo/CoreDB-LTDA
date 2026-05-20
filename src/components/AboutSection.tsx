'use client'

import { CheckCircle2 } from "lucide-react";

export default function AboutSection() {
  const areas = [
    {
      title: "TOTVS Protheus e RM",
      description:
        "Parametrização avançada, integrações seguras e sustentação estruturada dos módulos críticos com foco em estabilidade, governança e performance contínua.",
    },
    {
      title: "Administração de Banco de Dados (DBA)",
      description:
        "Monitoramento proativo, SQL Tuning, alta disponibilidade e políticas formais de backup para SQL Server e Oracle em ambientes de missão crítica.",
    },
    {
      title: "Fluig e Automação de Processos",
      description:
        "Desenvolvimento de fluxos, portais e integrações que eliminam trabalho manual, conectam sistemas e reduzem dependências operacionais.",
    },
    {
      title: "Customizações e Integrações ERP",
      description:
        "Desenvolvimento em ADVPL, TLPP e PO-UI para Protheus. Integrações via API REST com CRMs, e-commerce e plataformas financeiras com segurança e rastreabilidade.",
    },
  ];

  const differentials = [
    {
      title: "Stack de Monitoramento Enterprise",
      description:
        "Operamos com Zabbix para alertas proativos de infraestrutura, Grafana para dashboards de SLA e GLPI para gestão formal de chamados — a mesma stack de grandes operações, acessível para o seu negócio.",
    },
    {
      title: "Visão Integrada: ERP + Banco de Dados",
      description:
        "Atuamos simultaneamente na aplicação e na camada de dados, eliminando o conflito entre times e garantindo responsabilidade técnica ponta a ponta.",
    },
    {
      title: "Contratos Mensais com SLA Definido",
      description:
        "Modelo de sustentação contínua — não suporte avulso. Escopo claro, SLA contratual e evolução planejada do ambiente a cada ciclo.",
    },
  ];

  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">

        <div className="mb-20 max-w-3xl">
          <span className="text-[var(--coredb-cyan)] uppercase tracking-widest text-xs font-semibold mb-6 inline-block">
            Sobre a CoreDB
          </span>

          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[var(--coredb-dark)] mb-8">
            Consultoria Especializada em Ambientes TOTVS Críticos
          </h2>

          <p className="text-lg md:text-xl text-[#4B5563] leading-relaxed">
            A CoreDB é uma consultoria independente focada em sustentação, governança e performance
            de ambientes TOTVS e bancos de dados. Operamos com infraestrutura de monitoramento
            enterprise — Zabbix, Grafana e GLPI — para garantir estabilidade contínua e controle
            técnico rigoroso nas operações que não podem parar.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-24">
          {areas.map((area, index) => (
            <div
              key={index}
              className="flex items-start gap-4 border border-gray-200 rounded-xl p-8"
            >
              <CheckCircle2 className="w-5 h-5 text-[var(--coredb-cyan)] mt-1 shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-[var(--coredb-dark)] mb-3">{area.title}</h3>
                <p className="text-[#4B5563] leading-relaxed">{area.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-200 pt-20">
          <h3 className="text-2xl md:text-3xl font-semibold text-[var(--coredb-dark)] mb-16">
            Como Atuamos
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {differentials.map((diff, index) => (
              <div key={index}>
                <div className="text-[var(--coredb-cyan)] font-bold mb-4 text-lg">
                  0{index + 1}
                </div>
                <h4 className="text-lg font-semibold text-[var(--coredb-dark)] mb-3">{diff.title}</h4>
                <p className="text-[#4B5563] leading-relaxed">{diff.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-24 pt-16 border-t border-gray-200">
          <p className="text-lg text-[#4B5563] max-w-2xl leading-relaxed">
            Base em Belo Horizonte, MG — atendimento para empresas em todo o Brasil.
            Contratos de sustentação mensal com escopo técnico e SLA formalizados desde o primeiro dia.
          </p>
        </div>

      </div>
    </section>
  );
}
