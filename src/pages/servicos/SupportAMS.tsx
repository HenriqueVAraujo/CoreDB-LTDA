import { Shield, Clock, BarChart3, Users, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'wouter';

export default function SupportAMS() {
  const handleCTAClick = () => {
    const url =
      'https://wa.me/553191873435?text=' +
      encodeURIComponent(
        'Olá, gostaria de contratar o serviço de Suporte AMS com SLA garantido da CoreDB.'
      );
    window.open(url, '_blank');
  };

  const features = [
    {
      icon: Shield,
      title: 'Governança via GLPI',
      description: 'Plataforma robusta para gestão de chamados, histórico completo e indicadores em tempo real.'
    },
    {
      icon: Clock,
      title: 'SLA em Contrato',
      description: 'Tempos de resposta garantidos contratualmente. SLA de resposta crítica para emergências.'
    },
    {
      icon: BarChart3,
      title: 'Monitoramento 24/7',
      description: 'Supervisão contínua do ambiente, alertas proativos e prevenção de incidentes.'
    },
    {
      icon: Users,
      title: 'Equipe Especializada',
      description: 'Técnicos certificados TOTVS com profundo conhecimento em Protheus, RM e Fluig.'
    }
  ];

  const howItWorks = [
    {
      step: '1',
      title: 'Diagnóstico Inicial',
      description: 'Análise completa do seu ambiente atual e mapeamento de necessidades específicas.'
    },
    {
      step: '2',
      title: 'Contratação e Onboarding',
      description: 'Definição do SLA adequado, configuração do GLPI e integração com sua equipe.'
    },
    {
      step: '3',
      title: 'Suporte Preventivo',
      description: 'Monitoramento ativo, atualizações preventivas e otimização contínua do ambiente.'
    },
    {
      step: '4',
      title: 'Evolução Contínua',
      description: 'Relatórios mensais, sugestões de melhorias e planejamento de crescimento.'
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-[#0B1C2D] min-h-[75vh] flex items-center py-24">
        <div className="container mx-auto px-4 max-w-4xl text-white">

          {/* HEADLINE */}
          <h1 
            className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight mb-6 text-left"
            style={{ fontFamily: 'Source Sans Pro', fontWeight: 700 }}
          >
            Suporte AMS e Governança
          </h1>

          {/* SUBHEADLINE */}
          <p className="text-lg md:text-xl text-white/70 mb-8 max-w-2xl leading-relaxed">
            Central de serviços estruturada via plataforma GLPI. Atendimento com SLA de resposta crítica garantido em contrato e indicadores em tempo real para sua operação TOTVS.
          </p>

          {/* TRUST BAR */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <div className="flex items-center gap-4">
              <Shield className="w-6 h-6 text-[var(--coredb-cyan)]" />
              <p className="text-sm text-white/40">SLA Garantido em Contrato</p>
            </div>
            <div className="flex items-center gap-4">
              <Clock className="w-6 h-6 text-[var(--coredb-cyan)]" />
              <p className="text-sm text-white/40">Resposta Crítica 24/7</p>
            </div>
            <div className="flex items-center gap-4">
              <BarChart3 className="w-6 h-6 text-[var(--coredb-cyan)]" />
              <p className="text-sm text-white/40">Indicadores em Tempo Real</p>
            </div>
          </div>

          {/* BOTÕES */}
          <div className="flex flex-col sm:flex-row gap-4 mt-12">
            <button
              onClick={handleCTAClick}
              className="font-bold rounded-lg px-8 py-4 text-lg shadow-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(29,174,255,0.5)]"
              style={{ background: 'var(--coredb-cyan)', color: 'var(--coredb-dark)' }}
            >
              Contratar Suporte AMS
            </button>

            <Link
              href="/"
              className="font-semibold rounded-lg px-8 py-4 text-lg border-0 transition-all duration-300 hover:text-[var(--coredb-cyan)] hover:underline"
              style={{ background: 'transparent', color: 'text-white/60' }}
            >
              Voltar para Home
            </Link>
          </div>

        </div>
        <div className="absolute inset-0 -z-10">
          <div className="bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-[#0B1C2D] to-[#0B1C2D] w-full h-full" />
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 
              className="text-4xl md:text-5xl font-bold text-[var(--coredb-dark)] mb-6"
              style={{ fontFamily: 'Source Sans Pro', fontWeight: 700 }}
            >
              Por que nosso AMS é diferente
            </h2>
            <p className="text-lg text-[#4B5563] leading-relaxed">
              Transformamos suporte reativo em parceria estratégica, garantindo estabilidade e evolução contínua do seu ambiente TOTVS.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="group bg-[#F5F7FA] rounded-lg p-6 border border-[#E5E7EB] hover:border-[var(--coredb-cyan)] hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-lg bg-[var(--coredb-cyan)]/10 flex items-center justify-center mb-4 group-hover:bg-[var(--coredb-cyan)]/20 transition-colors">
                    <Icon className="w-6 h-6 text-[var(--coredb-cyan)] group-hover:text-white transition-colors" />
                  </div>
                  <h3 
                    className="text-lg font-bold text-[var(--coredb-dark)] mb-3"
                    style={{ fontFamily: 'Source Sans Pro', fontWeight: 700 }}
                  >
                    {feature.title}
                  </h3>
                  <p className="text-[#4B5563] leading-relaxed text-sm">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="relative py-20 md:py-32 bg-[#F5F7FA]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 
              className="text-4xl md:text-5xl font-bold text-[var(--coredb-dark)] mb-6"
              style={{ fontFamily: 'Source Sans Pro', fontWeight: 700 }}
            >
              Como funciona nosso AMS
            </h2>
            <p className="text-lg text-[#4B5563] leading-relaxed">
              Metodologia estruturada para garantir estabilidade, suporte preventivo e evolução contínua da sua operação.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((item, index) => (
              <div
                key={index}
                className="relative bg-white rounded-lg p-6 border border-[#E5E7EB] hover:border-[var(--coredb-cyan)] hover:shadow-lg transition-all duration-300"
              >
                {/* Step Number */}
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[var(--coredb-cyan)] flex items-center justify-center">
                  <span className="text-xs font-bold text-white">{item.step}</span>
                </div>

                <h3 
                  className="text-lg font-bold text-[var(--coredb-dark)] mb-3 pr-12"
                  style={{ fontFamily: 'Source Sans Pro', fontWeight: 700 }}
                >
                  {item.title}
                </h3>
                <p className="text-[#4B5563] leading-relaxed text-sm">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-16 pt-16 border-t border-[#E5E7EB]">
            <div className="max-w-2xl mx-auto text-center">
              <p className="text-lg text-[#4B5563] mb-8">
                Pronto para transformar seu suporte TOTVS em uma vantagem estratégica?
              </p>
              <button
                onClick={handleCTAClick}
                className="inline-flex items-center gap-2 px-8 py-4 font-bold rounded-lg shadow-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(29,174,255,0.5)]"
                style={{ background: 'var(--coredb-cyan)', color: 'var(--coredb-dark)' }}
              >
                Falar com Especialista AMS
                <ArrowRight className="w-5 h-5" />
              </button>
              <p className="text-sm text-[#4B5563] mt-4">
                Análise inicial sem compromisso
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
