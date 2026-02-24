import { Shield, Clock, BarChart3, Users, ArrowRight, CheckCircle2, Headphones } from 'lucide-react';
import { Link } from 'wouter';

export default function SupportAMS() {
  const handleCTAClick = () => {
    const url =
      'https://wa.me/553191873435?text=' +
      encodeURIComponent(
        'Olá! Gostaria de entender como funciona o Suporte AMS da CoreDB com SLA garantido.'
      );
    window.open(url, '_blank');
  };

  const diferenciais = [
    {
      icon: Shield,
      title: 'Governança via GLPI',
      description: 'Gestão profissional de chamados com histórico auditável e transparência total em cada interação.'
    },
    {
      icon: Clock,
      title: 'SLA de Resposta Crítica',
      description: 'Tempos de resposta garantidos em contrato. Emergências tratadas com prioridade absoluta 24/7.'
    },
    {
      icon: Headphones,
      title: 'Sustentação Nível 2 e 3',
      description: 'Equipe sênior pronta para resolver problemas complexos que o suporte padrão não soluciona.'
    },
    {
      icon: BarChart3,
      title: 'Relatórios Mensais',
      description: 'Análise de indicadores, volume de chamados e sugestões proativas para redução de incidentes.'
    }
  ];

  const metodologia = [
    {
      step: '1',
      title: 'Onboarding e GLPI',
      description: 'Configuração do ambiente de governança e integração com os usuários chave da sua empresa.'
    },
    {
      step: '2',
      title: 'Estabilização Proativa',
      description: 'Monitoramento inicial para identificar e sanar os problemas recorrentes que geram chamados.'
    },
    {
      step: '3',
      title: 'Atendimento Consultivo',
      description: 'Suporte focado em resolver a causa raiz, evitando que o mesmo problema aconteça duas vezes.'
    },
    {
      step: '4',
      title: 'Evolução do ERP',
      description: 'Sugestões de melhorias baseadas nos dados de suporte para tornar seu sistema cada vez mais autônomo.'
    }
  ];

  return (
    <main className="min-h-screen bg-white">
      
      {/* Hero Section */}
      <section className="relative bg-[#0B1C2D] min-h-[80vh] flex items-center py-20">
        <div className="container mx-auto px-4 max-w-5xl text-white">
          <span className="text-[var(--coredb-cyan)] font-bold tracking-widest uppercase text-sm mb-4 inline-block">
            Sustentação Estratégica TOTVS
          </span>

          <h1 
            className="text-4xl md:text-7xl font-bold tracking-tighter leading-tight mb-6 text-left"
            style={{ fontFamily: 'Source Sans Pro', fontWeight: 700 }}
          >
            Suporte AMS: <br />
            <span className="text-[var(--coredb-cyan)]">Sua Operação Não Para.</span>
          </h1>

          <p className="text-lg md:text-xl text-white/70 mb-10 max-w-3xl leading-relaxed">
            Esqueça o suporte reativo e lento. A CoreDB entrega uma sustentação baseada em governança real, SLA rígido e especialistas que entendem o seu negócio.
          </p>

          {/* Trust Bar Customizada */}
          <div className="flex flex-wrap gap-8 mt-8 border-t border-white/10 pt-8">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-[var(--coredb-cyan)]" />
              <p className="text-sm font-medium text-white/60 uppercase tracking-wider">SLA Contratual</p>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-[var(--coredb-cyan)]" />
              <p className="text-sm font-medium text-white/60 uppercase tracking-wider">Governança GLPI</p>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-[var(--coredb-cyan)]" />
              <p className="text-sm font-medium text-white/60 uppercase tracking-wider">Expertise Nível 3</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 mt-12">
            <button
              onClick={handleCTAClick}
              className="font-bold rounded-lg px-10 py-5 text-lg shadow-lg transition-all duration-300 hover:scale-105"
              style={{ background: 'var(--coredb-cyan)', color: 'var(--coredb-dark)' }}
            >
              Contratar Sustentação AMS
            </button>
            <Link href="/" className="flex items-center justify-center text-white/50 hover:text-white transition-colors px-6">
              Voltar para a Home
            </Link>
          </div>
        </div>

        <div className="absolute inset-0 -z-10">
          <div className="bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-cyan-900/10 via-[#0B1C2D] to-[#0B1C2D] w-full h-full" />
        </div>
      </section>

      {/* Diferenciais Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-[var(--coredb-dark)] mb-6">
              Por que nosso AMS <br />
              <span className="text-[var(--coredb-cyan)]">é referência no mercado.</span>
            </h2>
            <p className="text-lg text-[#4B5563]">
              Transformamos chamados técnicos em inteligência de negócio. Nossa meta é reduzir o número de problemas, e não apenas respondê-los.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {diferenciais.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="group bg-[#F8FAFC] rounded-2xl p-8 border border-gray-100 hover:shadow-xl transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-[var(--coredb-cyan)]/10 flex items-center justify-center mb-6 group-hover:bg-[var(--coredb-cyan)] transition-colors">
                    <Icon className="w-6 h-6 text-[var(--coredb-cyan)] group-hover:text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-[var(--coredb-dark)] mb-3">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section className="py-20 md:py-32 bg-[#F9FAFB]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-[var(--coredb-dark)] mb-16">Metodologia de Atendimento</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {metodologia.map((item, index) => (
              <div key={index} className="relative p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 w-10 h-10 bg-[var(--coredb-cyan)] text-[var(--coredb-dark)] font-bold flex items-center justify-center rounded-full shadow-lg">
                  {item.step}
                </span>
                <h3 className="text-lg font-bold mt-4 mb-3">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-24 bg-[#0B1C2D] text-white text-center">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto p-12 rounded-3xl border border-white/5 bg-gradient-to-br from-[#0B1C2D] to-[#152a3d] shadow-2xl">
            <h2 className="text-3xl md:text-5xl font-bold mb-8">Sua consultoria atual cumpre o que promete?</h2>
            <p className="text-white/60 text-lg mb-10 max-w-2xl mx-auto">
              Mude para um suporte que entrega governança, previsibilidade e técnicos que realmente entendem seu ERP.
            </p>
            <button
              onClick={handleCTAClick}
              className="group flex items-center gap-3 mx-auto px-10 py-5 font-bold rounded-xl transition-all duration-300 hover:gap-5"
              style={{ background: 'var(--coredb-cyan)', color: 'var(--coredb-dark)' }}
            >
              Falar com Especialista em Sustentação
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}