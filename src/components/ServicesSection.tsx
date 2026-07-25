import { Settings, Code, Database, LifeBuoy, CheckCircle2, XCircle } from "lucide-react";
import Link from "next/link";
import { ROUTES } from "../routes";

export default function ServicesSection() {
  const services = [
    {
      icon: Settings,
      title: "Especialidades TOTVS",
      subtitle: "Protheus, RM e Fluig",
      description:
        "Atuação integrada em regra de negócio e infraestrutura técnica para implementação, atualização de release, sustentação e investigação de gargalos.",
      path: ROUTES.SERVICE_TOTVS,
    },
    {
      icon: Database,
      title: "DBA de Alta Performance",
      subtitle: "SQL Server e Oracle",
      description:
        "SQL Tuning, alta disponibilidade e Disaster Recovery para ambientes críticos, com medições de queries, índices e capacidade do banco de dados.",
      path: ROUTES.SERVICE_DBA,
    },
    {
      icon: LifeBuoy,
      title: "Suporte AMS e Governança",
      subtitle: "GLPI e SLA Contratual",
      description:
        "Sustentação estruturada com SLA definido em contrato, gestão de chamados via GLPI e relatórios de indicadores conforme o escopo.",
      path: ROUTES.SERVICE_AMS,
    },
    {
      icon: Code,
      title: "Desenvolvimento e Customizações",
      subtitle: "ADVPL, TLPP e Integrações",
      description:
        "Customizações, pontos de entrada e integrações via API desenvolvidas com critérios de manutenção, compatibilidade e impacto no banco de dados.",
      path: ROUTES.SERVICE_CUSTOM,
    },
  ];

  const comparativo = [
    {
      criterio: "Foco em Performance de Banco de Dados",
      mercado: "Atuação isolada pode limitar o diagnóstico",
      coredb: "Análise integrada conforme o escopo",
    },
    {
      criterio: "Especialista sênior no atendimento",
      mercado: "Encaminhamento entre diferentes camadas",
      coredb: "Responsáveis definidos conforme a cobertura",
    },
    {
      criterio: "Diagnóstico de causa raiz (ERP + BD)",
      mercado: "Análise separada por camada",
      coredb: "ERP e banco de dados analisados em conjunto",
    },
    {
      criterio: "Agilidade na tomada de decisão",
      mercado: "Fluxo sujeito a múltiplas etapas",
      coredb: "Fluxo técnico definido no contrato",
    },
  ];

  const tecnologias = [
    "TOTVS Protheus",
    "TOTVS RM",
    "Fluig",
    "SQL Server",
    "Oracle Database",
    "PostgreSQL",
    "Zabbix",
    "Grafana",
    "GLPI",
    "ADVPL / TLPP",
  ];

  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">

        {/* Header */}
        <div className="mb-20 max-w-3xl">
          <span className="text-[var(--coredb-dark)] uppercase tracking-widest text-xs font-semibold mb-6 inline-block">
            Nossos Serviços
          </span>

          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[var(--coredb-dark)] mb-8">
            Soluções de Alta Performance <br />
            <span className="text-[var(--coredb-dark)]">para o seu Ecossistema TOTVS</span>
          </h2>

          <p className="text-lg md:text-xl text-[#4B5563] leading-relaxed">
            Unimos a inteligência do ERP à potência do Banco de Dados para apoiar a continuidade operacional e reduzir riscos de indisponibilidade.
            Enquanto a maioria das consultorias foca na carcaça do sistema,{" "}
            <span className="font-semibold text-[var(--coredb-dark)]">nós cuidamos do motor.</span>
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="flex flex-col h-full bg-[var(--coredb-dark)] rounded-xl p-8 border border-white/10 hover:border-[var(--coredb-cyan)]/40 transition-all duration-300"
              >
                <div className="mb-6">
                  <Icon className="w-7 h-7 text-[var(--coredb-cyan)]" />
                </div>

                <div className="flex-grow">
                  <h3 className="text-lg font-semibold text-white mb-3">{service.title}</h3>
                  <p className="text-xs font-semibold text-[var(--coredb-cyan)] uppercase tracking-wider mb-4">
                    {service.subtitle}
                  </p>
                  <p className="text-[#D1D5DB] text-sm leading-relaxed">{service.description}</p>
                </div>

                <div className="mt-10">
                  <Link
                    href={service.path}
                    aria-label={`Ver detalhes sobre ${service.title}`}
                    className="text-[var(--coredb-cyan)] text-sm font-semibold hover:underline"
                  >
                    Ver detalhes →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Technology Strip */}
        <div className="mt-16 pt-12 border-t border-gray-100">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#4B5563] mb-6">
            Tecnologias que dominamos
          </p>
          <div className="flex flex-wrap gap-3">
            {tecnologias.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 bg-[#F9FAFB] border border-gray-200 rounded-lg text-sm font-medium text-[var(--coredb-dark)]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Comparison Table */}
        <div className="mt-24 pt-16 border-t border-gray-200">
          <div className="mb-12 max-w-2xl">
            <span className="text-[var(--coredb-dark)] uppercase tracking-widest text-xs font-semibold mb-4 inline-block">
              Diferenciação Competitiva
            </span>
            <h3 className="text-2xl md:text-3xl font-bold text-[var(--coredb-dark)] mb-4">
              O que nos separa das consultorias comuns
            </h3>
            <p className="text-[#4B5563] text-lg leading-relaxed">
              A maioria das consultorias TOTVS foca apenas no software. A CoreDB atua onde elas não chegam:{" "}
              <span className="font-semibold text-[var(--coredb-dark)]">
                a intersecção entre a regra de negócio do ERP e o tuning profundo do banco de dados.
              </span>
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-4 px-4 text-[#4B5563] font-semibold w-[34%]">Critério</th>
                  <th className="text-left py-4 px-4 text-[#4B5563] font-semibold w-[33%]">
                    Consultorias Comuns
                  </th>
                  <th className="text-left py-4 px-4 font-semibold w-[33%] text-[var(--coredb-dark)]">
                    CoreDB
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparativo.map((row, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-5 px-4 font-medium text-[var(--coredb-dark)]">{row.criterio}</td>
                    <td className="py-5 px-4">
                      <span className="flex items-start gap-2 text-gray-500">
                        <XCircle className="w-4 h-4 text-gray-300 shrink-0 mt-0.5" />
                        {row.mercado}
                      </span>
                    </td>
                    <td className="py-5 px-4">
                      <span className="flex items-start gap-2 text-[var(--coredb-dark)] font-medium">
                        <CheckCircle2 className="w-4 h-4 text-[var(--coredb-cyan)] shrink-0 mt-0.5" />
                        {row.coredb}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-12 p-6 bg-[#F9FAFB] rounded-xl border border-gray-200">
            <p className="text-[#4B5563] leading-relaxed">
              <span className="font-semibold text-[var(--coredb-dark)]">Análise integrada de ERP e banco de dados.</span>{" "}
              O diagnóstico considera as duas camadas, registra as evidências técnicas e define prioridades
              conforme o ambiente e o escopo contratado.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
