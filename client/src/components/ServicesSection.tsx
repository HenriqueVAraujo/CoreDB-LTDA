import { Zap, Code, Database } from 'lucide-react';
import { ROUTES } from '../routes';

export default function ServicesSection() {
  const services = [
    {
      icon: Zap,
      title: 'Consultoria Especializada TOTVS',
      description: 'Implementação, otimização e sustentação de ambientes TOTVS Protheus, RM e Fluig com foco em performance, segurança e aderência aos processos do negócio.',
      benefits: [
        'Redução de lentidões e travamentos',
        'Otimização de rotinas críticas',
        'Implementação de boas práticas',
        'Suporte técnico especializado'
      ]
    },
    {
      icon: Code,
      title: 'Desenvolvimento e Customizações',
      description: 'Desenvolvimento de customizações, integrações e automações que ampliam a capacidade do ERP sem comprometer estabilidade.',
      benefits: [
        'Soluções sob medida para seu negócio',
        'Código limpo e documentado',
        'Integração com sistemas externos',
        'Automação de processos manuais'
      ]
    },
    {
      icon: Database,
      title: 'Administração de Bancos de Dados (DBA)',
      description: 'Monitoramento, ajustes de performance, governança e rotinas de backup para bases seguras, disponíveis e preparadas para crescimento.',
      benefits: [
        'Monitoramento 24/7',
        'Otimização de queries e índices',
        'Planos de backup e recuperação',
        'Governança de dados'
      ]
    }
  ];

  return (
    <section className="relative py-20 md:py-32 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E0F7FF] border border-[#1DAEFF] mb-6">
            <span className="text-xs font-semibold text-[#0B5A7D] uppercase tracking-wider">
              Serviços
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-[#0B1C2D] mb-6">
            O Que Fazemos Pela Sua Operação
          </h2>
          
          <p className="text-lg text-[#4B5563] leading-relaxed">
            Colocamos o TOTVS RM e o Protheus na frente das iniciativas, conectando ERP e banco de dados em um fluxo único. Reduzimos complexidade, eliminamos gargalos e liberamos seu time para focar no que realmente importa.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="group bg-[#F5F7FA] rounded-lg overflow-hidden border border-[#E5E7EB] hover:border-[#1DAEFF] transition-all duration-300 hover:shadow-lg hover:translate-y-[-4px]"
              >
                {/* Header with Icon */}
                <div className="bg-gradient-to-r from-[#0B1C2D] to-[#1DAEFF] p-8 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <h3 className="text-xl font-bold text-[#0B1C2D] mb-4">
                    {service.title}
                  </h3>
                  
                  <p className="text-[#4B5563] mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Benefits */}
                  <div className="space-y-3">
                    <p className="text-sm font-semibold text-[#0B1C2D] uppercase tracking-wider">
                      Benefícios:
                    </p>
                    <ul className="space-y-2">
                      {service.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-[#4B5563]">
                          <span className="text-[#1DAEFF] font-bold mt-0.5">✓</span>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA */}
                  <a
                    href={
                      index === 0
                        ? ROUTES.SERVICE_TOTVS
                        : index === 1
                        ? ROUTES.SERVICE_CUSTOM
                        : ROUTES.SERVICE_DBA
                    }
                    className="w-full mt-8 py-3 px-4 rounded-lg border border-[#1DAEFF] text-[#1DAEFF] font-semibold hover:bg-[#E0F7FF] transition-colors text-center block"
                  >
                    Saiba mais
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Message */}
        <div className="mt-16 pt-16 border-t border-[#E5E7EB]">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-lg text-[#4B5563] leading-relaxed">
              Cada serviço é estruturado para entregar <span className="font-bold text-[#0B1C2D]">resultados mensuráveis</span> e impacto direto no seu negócio.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
