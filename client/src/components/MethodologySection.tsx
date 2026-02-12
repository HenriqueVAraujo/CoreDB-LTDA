import { Search, BarChart3, Wrench, Shield, Radar } from 'lucide-react';

export default function MethodologySection() {
  const steps = [
    {
      icon: Search,
      title: 'Diagnóstico Profundo',
      description: 'Entendemos o cenário real da sua operação: sistemas, rotinas críticas, infraestrutura, chamados recorrentes e impactos no negócio.'
    },
    {
      icon: BarChart3,
      title: 'Análise de Causa Raiz',
      description: 'Identificamos as causas reais de lentidão, falhas e riscos. Não tratamos sintomas. Vamos ao cerne do problema.'
    },
    {
      icon: Wrench,
      title: 'Otimização Estrutural',
      description: 'Implementamos soluções estruturadas em ERP e banco de dados, reduzindo lentidões e eliminando retrabalho.'
    },
    {
      icon: Shield,
      title: 'Redução de Riscos',
      description: 'Estabelecemos governança, rotinas de backup, planos de recuperação e monitoramento contínuo para conformidade.'
    },
    {
      icon: Radar,
      title: 'Monitoramento e Evolução',
      description: 'Acompanhamos performance em tempo real, alertas e indicadores. Revisamos e ajustamos conforme o negócio cresce.'
    }
  ];

  return (
    <section className="relative py-20 md:py-32 bg-[#F5F7FA]">
      {/* Background Accent */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-[#1DAEFF] rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#E5E7EB] mb-6">
            <span className="text-xs font-semibold text-[#0B5A7D] uppercase tracking-wider">
              Metodologia
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-[#0B1C2D] mb-6">
            Como Entregamos Estabilidade e Resultado
          </h2>
          
          <p className="text-lg text-[#4B5563] leading-relaxed">
            Nossa atuação começa com um diagnóstico transparente e evolui para um plano estruturado de ação. Trabalhamos sempre conectando ERP, banco de dados e pessoas.
          </p>
        </div>

        {/* Steps Grid - 5 steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-16">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="group relative bg-white rounded-lg p-6 border border-[#E5E7EB] hover:border-[#1DAEFF] hover:shadow-lg transition-all duration-300 hover:translate-y-[-4px]"
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                {/* Step Number */}
                <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-[#E0F7FF] flex items-center justify-center">
                  <span className="text-xs font-bold text-[#1DAEFF]">{index + 1}</span>
                </div>

                {/* Icon */}
                <div className="mb-4">
                  <div className="w-12 h-12 rounded-lg bg-[#E0F7FF] flex items-center justify-center group-hover:bg-[#1DAEFF] transition-colors">
                    <Icon className="w-6 h-6 text-[#0B5A7D] group-hover:text-white transition-colors" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-base font-bold text-[#0B1C2D] mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-[#4B5563] leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-16 pt-16 border-t border-[#E5E7EB]">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-lg text-[#4B5563] mb-8">
              Pronto para estruturar seu ambiente TOTVS e garantir performance máxima?
            </p>
            <a
              href="https://wa.me/553191873435?text=Ol%C3%A1%2C%20quero%20estruturar%20meu%20ambiente%20TOTVS%20com%20a%20CoreDB."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center justify-center gap-2"
            >
              Quero estruturar meu ambiente TOTVS
            </a>
            <p className="text-sm text-[#4B5563] mt-4">
              Diagnóstico inicial sem custo
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
