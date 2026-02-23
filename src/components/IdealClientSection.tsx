import { CheckCircle2, XCircle } from "lucide-react";

export default function IdealClientSection() {
  const idealTraits = [
    "Operações dependentes de ERP TOTVS em ambientes críticos",
    "Empresas que enfrentam desafios recorrentes de performance e estabilidade",
    "Organizações que exigem governança técnica e previsibilidade operacional",
    "Ambientes que demandam conhecimento profundo de ERP e banco de dados",
    "Gestores que valorizam transparência, SLA e indicadores mensuráveis",
  ];

  const notIdealTraits = [
    "Demandas pontuais exclusivamente reativas",
    "Projetos sem necessidade de estrutura técnica contínua",
    "Ambientes que não exigem especialização avançada em ERP e banco de dados",
  ];

  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">

        {/* Header */}
        <div className="mb-20 max-w-3xl">
          <span className="text-[var(--coredb-cyan)] uppercase tracking-widest text-xs font-semibold mb-6 inline-block">
            Perfil de Operações Atendidas
          </span>

          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[var(--coredb-dark)] mb-8">
            Trabalhamos com Ambientes que Não Podem Parar
          </h2>

          <p className="text-lg md:text-xl text-[#4B5563] leading-relaxed">
            Nossa estrutura é direcionada a empresas que dependem de estabilidade,
            governança técnica e continuidade operacional.
          </p>
        </div>

        {/* Two Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Ideal Profile */}
          <div>
            <h3 className="text-xl font-semibold text-[var(--coredb-dark)] mb-8 flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-[var(--coredb-cyan)]" />
              Operações onde geramos maior impacto
            </h3>

            <div className="space-y-6">
              {idealTraits.map((trait, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-[var(--coredb-cyan)] mt-2" />
                  <p className="text-[#4B5563] leading-relaxed">
                    {trait}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Not Focus */}
          <div>
            <h3 className="text-xl font-semibold text-[var(--coredb-dark)] mb-8 flex items-center gap-3">
              <XCircle className="w-5 h-5 text-gray-400" />
              Não é nosso foco principal
            </h3>

            <div className="space-y-6">
              {notIdealTraits.map((trait, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-gray-300 mt-2" />
                  <p className="text-gray-500 leading-relaxed">
                    {trait}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-24 pt-16 border-t border-gray-200">
          <div className="max-w-2xl">
            <p className="text-lg text-[#4B5563] mb-8 leading-relaxed">
              Se sua operação exige estabilidade e governança técnica contínua,
              podemos estruturar um diagnóstico detalhado do seu ambiente.
            </p>

            <a
              href="https://wa.me/553191873435?text=Olá, gostaria de agendar um diagnóstico técnico."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-[var(--coredb-cyan)] text-white px-8 py-4 rounded-md font-semibold hover:opacity-90 transition"
            >
              Solicitar Diagnóstico Técnico
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}