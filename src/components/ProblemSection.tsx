import { AlertCircle, TrendingDown, Zap, Lock } from 'lucide-react';

export default function ProblemSection() {
  const problems = [
    {
      icon: TrendingDown,
      title: 'Lentidão Operacional',
      description:
        'Processamentos que deveriam levar minutos tomam horas, impactando faturamento, fechamento contábil e tomada de decisão.'
    },
    {
      icon: AlertCircle,
      title: 'Falhas Recorrentes',
      description:
        'Erros em rotinas críticas, travamentos e timeouts geram retrabalho, insegurança operacional e dependência reativa de suporte.'
    },
    {
      icon: Lock,
      title: 'Riscos no Banco de Dados',
      description:
        'Backups inadequados, ausência de monitoramento contínuo e falta de plano de recuperação colocam a continuidade do negócio em risco.'
    },
    {
      icon: Zap,
      title: 'Impacto Financeiro Direto',
      description:
        'Cada minuto de indisponibilidade representa prejuízo financeiro, risco contratual e perda de confiança interna e externa.'
    }
  ];

  return (
    <section className="py-24 lg:py-32 bg-[#F9FAFB]">
      <div className="container mx-auto px-4 max-w-5xl">

        {/* Overline */}
        <span className="text-[var(--coredb-cyan)] uppercase tracking-widest text-xs font-semibold mb-6 inline-block">
          Risco Operacional
        </span>

        {/* Headline */}
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[#0B1C2D] mb-8">
          Seu ERP sustenta o negócio. <br className="hidden md:block" />
          Mas ele está verdadeiramente blindado?
        </h2>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-[#4B5563] max-w-3xl leading-relaxed mb-16">
          Empresas que dependem de ambientes TOTVS para faturar, operar e fechar o mês
          convivem com riscos invisíveis que raramente são tratados de forma estruturada.
          O problema não é o ERP. É a ausência de governança técnica contínua.
        </p>

        {/* Grid de Problemas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {problems.map((problem, index) => {
            const Icon = problem.icon;
            return (
              <div
                key={index}
                className="bg-white border border-[#E5E7EB] rounded-xl p-8 transition-all duration-300 hover:border-[var(--coredb-cyan)]/40"
              >
                <div className="flex items-start gap-5">
                  <Icon className="w-7 h-7 text-[var(--coredb-cyan)] shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-[#0B1C2D] mb-3">
                      {problem.title}
                    </h3>
                    <p className="text-[#4B5563] leading-relaxed">
                      {problem.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bloco de Conclusão Estratégica */}
        <div className="mt-20 pt-12 border-t border-[#E5E7EB]">
          <div className="max-w-3xl">
            <p className="text-2xl font-semibold text-[#0B1C2D] leading-relaxed">
              Ter um ERP não é suficiente.
            </p>
            <p className="text-lg text-[#4B5563] mt-4 leading-relaxed">
              Ele precisa operar com previsibilidade, disponibilidade e responsabilidade técnica formal.
              Sem estrutura contínua, o risco permanece — apenas invisível.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}