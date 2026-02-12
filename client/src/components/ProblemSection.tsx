import { AlertCircle, TrendingDown, Zap, Lock } from 'lucide-react';

export default function ProblemSection() {
  const problems = [
    {
      icon: TrendingDown,
      title: 'Lentidão Operacional',
      description: 'Processamentos que deveriam levar minutos tomam horas, impactando faturamento e tomada de decisão.'
    },
    {
      icon: AlertCircle,
      title: 'Falhas Recorrentes',
      description: 'Travamentos, timeouts e erros em rotinas críticas causam retrabalho e perda de produtividade.'
    },
    {
      icon: Lock,
      title: 'Riscos em Banco de Dados',
      description: 'Falta de monitoramento, backups inadequados e ausência de planos de recuperação comprometem continuidade.'
    },
    {
      icon: Zap,
      title: 'Impacto no Negócio',
      description: 'Cada minuto de indisponibilidade representa prejuízo financeiro, perda de confiança e risco de conformidade.'
    }
  ];

  return (
    <section className="relative py-20 md:py-32 bg-[#F5F7FA]">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#1DAEFF] opacity-5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#E5E7EB] mb-6">
            <span className="text-xs font-semibold text-[#0B5A7D] uppercase tracking-wider">
              Desafios do Mercado
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-[#0B1C2D] mb-6">
            O Desafio das Operações Críticas
          </h2>
          
          <p className="text-lg text-[#4B5563] leading-relaxed">
            Quando o ERP falha, o negócio para. Empresas que dependem de TOTVS para operações críticas enfrentam desafios recorrentes que impactam diretamente o resultado.
          </p>
        </div>

        {/* Problems Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {problems.map((problem, index) => {
            const Icon = problem.icon;
            return (
              <div
                key={index}
                className="group bg-white rounded-lg p-8 border border-[#E5E7EB] hover:border-[#1DAEFF] hover:shadow-lg transition-all duration-300 hover:translate-y-[-4px]"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-[#E0F7FF] group-hover:bg-[#1DAEFF] transition-colors">
                      <Icon className="w-6 h-6 text-[#0B5A7D] group-hover:text-white transition-colors" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-[#0B1C2D] mb-2">
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

        {/* Key Message */}
        <div className="mt-16 pt-16 border-t border-[#E5E7EB]">
          <div className="max-w-3xl mx-auto bg-gradient-to-r from-[#0B1C2D] to-[#1DAEFF] rounded-lg p-8 text-white text-center">
            <p className="text-xl font-semibold">
              Não é suficiente ter um ERP. É preciso ter um ERP que roda com <span className="text-[#E0F7FF]">velocidade, segurança e disponibilidade máximas</span>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
