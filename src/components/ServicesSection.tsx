import { Settings, Code, Database, LifeBuoy } from "lucide-react";
import { Link } from "wouter";
import { ROUTES } from "../routes";

export default function ServicesSection() {
  const services = [
    {
      icon: Settings,
      title: "Especialidades TOTVS",
      subtitle: "Protheus, RM e Fluig",
      description:
        "Gestão estruturada do ecossistema TOTVS com foco em estabilidade, conformidade fiscal e continuidade operacional.",
      path: ROUTES.SERVICE_TOTVS,
    },
    {
      icon: Database,
      title: "Administração de Banco de Dados",
      subtitle: "SQL Server e Oracle",
      description:
        "Gestão preventiva de performance, alta disponibilidade, segurança e integridade de dados para ambientes críticos.",
      path: ROUTES.SERVICE_DBA,
    },
    {
      icon: LifeBuoy,
      title: "Suporte AMS e Governança",
      subtitle: "GLPI e SLA Contratual",
      description:
        "Central de serviços estruturada com controle de criticidade, indicadores de atendimento e SLA formalizado.",
      path: ROUTES.SERVICE_AMS,
    },
     {
      icon: Code,
      title: "Desenvolvimento e Customizações",
      subtitle: "ADVPL, TLPP e Integrações",
      description:
        "Implementação técnica controlada de customizações, pontos de entrada e integrações para evolução segura do ERP.",
      path: ROUTES.SERVICE_CUSTOM,
    },
  ];

  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">

        {/* Header */}
        <div className="mb-20 max-w-3xl">
          <span className="text-[var(--coredb-cyan)] uppercase tracking-widest text-xs font-semibold mb-6 inline-block">
            Estrutura Técnica
          </span>

          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[var(--coredb-dark)] mb-8">
            Pilares de Sustentação Operacional
          </h2>

          <p className="text-lg md:text-xl text-[#4B5563] leading-relaxed">
            Aplicamos nosso framework em quatro frentes técnicas integradas,
            garantindo governança contínua do ERP e da base de dados.
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
                {/* Icon */}
                <div className="mb-6">
                  <Icon className="w-7 h-7 text-[var(--coredb-cyan)]" />
                </div>

                {/* Content */}
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold text-white mb-3">
                    {service.title}
                  </h3>

                  <p className="text-xs font-semibold text-[var(--coredb-cyan)] uppercase tracking-wider mb-4">
                    {service.subtitle}
                  </p>

                  <p className="text-[#D1D5DB] text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* CTA */}
                <div className="mt-10">
                  <Link
                    href={service.path}
                    className="text-[var(--coredb-cyan)] text-sm font-semibold hover:underline"
                  >
                    Saiba mais →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Institutional Message */}
        <div className="mt-24 pt-16 border-t border-gray-200">
          <div className="max-w-2xl">
            <p className="text-lg text-[#4B5563] leading-relaxed">
              Cada frente de atuação é estruturada para gerar{" "}
              <span className="font-semibold text-[var(--coredb-dark)]">
                previsibilidade operacional
              </span>{" "}
              e redução de risco técnico no médio e longo prazo.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}