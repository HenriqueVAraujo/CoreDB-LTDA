import { CheckCircle2 } from 'lucide-react';

export default function AboutSection() {
  const services = [
    {
      title: 'TOTVS RM',
      description: 'Implantação, tuning e sustentação contínua dos módulos RM, garantindo fluidez do ERP.'
    },
    {
      title: 'TOTVS Protheus',
      description: 'Parametrização, integrações e segurança para um Protheus enxuto e estável.'
    },
    {
      title: 'Administração de Bancos de Dados (DBA)',
      description: 'Monitoramento, performance, governança e rotinas de backup com foco em alta disponibilidade.'
    },
    {
      title: 'Fluig & Automação de Processos',
      description: 'Construção de fluxos, portais e automações que conectam pessoas, dados e documentos.'
    }
  ];

  const differentials = [
    {
      title: 'Atendimento Direto',
      description: 'Você fala com quem resolve, sem burocracia ou camadas desnecessárias.'
    },
    {
      title: 'Visão Completa',
      description: 'Entendemos tanto do ERP quanto da base que sustenta tudo, garantindo performance e estabilidade reais.'
    },
    {
      title: 'Flexibilidade',
      description: 'Adaptamos forma de atuação, carga horária e modelo comercial à realidade da sua empresa.'
    }
  ];

  return (
    <section className="relative py-20 md:py-32 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E0F7FF] border border-[#1DAEFF] mb-6">
            <span className="text-xs font-semibold text-[#0B5A7D] uppercase tracking-wider">
              Sobre a CoreDB
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-[#0B1C2D] mb-6">
            Especialistas em Ambientes Críticos
          </h2>
          
          <p className="text-lg text-[#4B5563] leading-relaxed">
            Não somos suporte. Somos especialistas em ambientes críticos. A CoreDB é uma consultoria independente especializada em TOTVS e Bancos de Dados para operações que não podem parar.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-[#F5F7FA] rounded-lg p-6 border border-[#E5E7EB] hover:border-[#1DAEFF] hover:bg-white transition-all duration-300"
            >
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-[#1DAEFF] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold text-[#0B1C2D] mb-2">
                    {service.title}
                  </h3>
                  <p className="text-[#4B5563]">
                    {service.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-[#E5E7EB] my-16" />

        {/* Differentials */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-[#0B1C2D] mb-12 text-center">
            Por que escolher a CoreDB?
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {differentials.map((diff, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-[#E0F7FF] flex items-center justify-center">
                  <span className="text-lg font-bold text-[#1DAEFF]">{index + 1}</span>
                </div>
                <h4 className="text-lg font-bold text-[#0B1C2D] mb-3">
                  {diff.title}
                </h4>
                <p className="text-[#4B5563] leading-relaxed">
                  {diff.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Key Message */}
        <div className="mt-20 pt-16 border-t border-[#E5E7EB]">
          <p className="text-center text-lg text-[#4B5563] max-w-2xl mx-auto leading-relaxed">
            Cuidamos do ERP e do banco de dados ao mesmo tempo, evitando "jogo de empurra" entre times diferentes e garantindo uma <span className="font-bold text-[#0B1C2D]">visão de ponta a ponta</span> da sua operação.
          </p>
        </div>
      </div>
    </section>
  );
}
