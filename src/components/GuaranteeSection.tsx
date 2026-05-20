'use client'

import { Activity, FileText, BarChart3 } from "lucide-react";

export default function GuaranteeSection() {
  const guarantees = [
    {
      icon: Activity,
      label: "Zabbix",
      title: "Monitoramento Proativo 24/7",
      description:
        "Infraestrutura de monitoramento enterprise via Zabbix configurada para seus servidores TOTVS e banco de dados. Alertas chegam antes do seu usuário perceber qualquer instabilidade.",
      features: [
        "Alertas de CPU, memória e disco em tempo real",
        "Monitoramento de processos críticos do ERP",
        "Histórico de incidentes e tendências de capacidade",
        "Escalada automática por nível de criticidade",
      ],
    },
    {
      icon: FileText,
      label: "GLPI",
      title: "Gestão Formal de Chamados",
      description:
        "Governança via GLPI com rastreabilidade completa de cada atendimento. Nada fica em e-mail ou WhatsApp — cada chamado tem histórico, prazo e responsável definido em contrato.",
      features: [
        "SLA crítico definido e auditável em contrato",
        "Histórico completo de interações e resoluções",
        "Classificação por urgência e impacto operacional",
        "Relatórios mensais de volume e tendências",
      ],
    },
    {
      icon: BarChart3,
      label: "Grafana",
      title: "Dashboards de SLA em Tempo Real",
      description:
        "Visibilidade total da operação via dashboards Grafana. Métricas de desempenho do banco, tempo de resposta do ERP e indicadores de SLA — disponíveis para você a qualquer momento.",
      features: [
        "KPIs operacionais do ambiente TOTVS",
        "Performance de banco de dados em tempo real",
        "Indicadores de cumprimento de SLA mensal",
        "Base para planejamento de capacidade e crescimento",
      ],
    },
  ];

  return (
    <section className="py-24 lg:py-32 bg-[var(--coredb-dark)] text-white">
      <div className="container mx-auto px-4 max-w-6xl">

        <div className="mb-20 max-w-3xl">
          <span className="text-[var(--coredb-cyan)] uppercase tracking-widest text-xs font-semibold mb-6 inline-block">
            Infraestrutura de Sustentação
          </span>

          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-8">
            Não vendemos suporte. <br />
            <span className="text-[var(--coredb-cyan)]">Entregamos blindagem operacional.</span>
          </h2>

          <p className="text-lg md:text-xl text-white/70 leading-relaxed">
            Enquanto a maioria apaga incêndios, a CoreDB opera com stack de monitoramento enterprise
            para antecipar e prevenir qualquer instabilidade no seu ambiente TOTVS.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {guarantees.map((guarantee, index) => {
            const Icon = guarantee.icon;
            return (
              <div
                key={index}
                className="flex flex-col h-full bg-white/5 rounded-xl p-8 border border-white/10 hover:border-[var(--coredb-cyan)]/40 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-[var(--coredb-cyan)]/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-[var(--coredb-cyan)]" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[var(--coredb-cyan)]">
                    {guarantee.label}
                  </span>
                </div>

                <h3 className="text-lg font-semibold mb-4">{guarantee.title}</h3>

                <p className="text-white/70 text-sm leading-relaxed mb-6">
                  {guarantee.description}
                </p>

                <div className="space-y-3 text-sm text-white/60 mt-auto">
                  {guarantee.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--coredb-cyan)] mt-2 shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-24 pt-16 border-t border-white/10">
          <div className="max-w-2xl">
            <p className="text-lg text-white/70 leading-relaxed">
              Zabbix, GLPI e Grafana não são diferenciais — são{" "}
              <span className="font-semibold text-white">
                requisitos mínimos para uma sustentação séria.
              </span>{" "}
              Seu ERP merece mais do que um técnico de plantão.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
