import { Shield, Zap, Database, Search, ArrowRight, Gauge, Briefcase, ChevronRight } from 'lucide-react';
import { Link } from 'wouter';
import Header from '../../components/Header';

export default function ConsultoriaTOTVS() {
  const handleCTAClick = () => {
    const url =
      'https://wa.me/553191873435?text=' +
      encodeURIComponent(
        'Olá! Vi a página de Consultoria de Elite TOTVS e gostaria de agilizar um diagnóstico do meu ambiente.'
      );
    window.open(url, '_blank');
  };

  const features = [
    {
      icon: Gauge,
      title: 'Tuning de Performance',
      description: 'Otimização profunda de camadas: desde o dicionário de dados até as querys de banco de dados mais complexas.'
    },
    {
      icon: Database,
      title: 'Expertise em DBAs',
      description: 'Diferente de consultorias comuns, unimos especialistas em ERP e DBAs SQL Server/Oracle para estabilidade total.'
    },
    {
      icon: Zap,
      title: 'Resolução de Gargalos',
      description: 'Identificação e eliminação de travamentos em rotinas críticas de faturamento, estoque e contabilidade.'
    },
    {
      icon: Shield,
      title: 'Atualização Segura',
      description: 'Migrações de versão, aplicação de patches e releases com metodologia que minimiza o downtime.'
    }
  ];

  const methodology = [
    {
      step: '1',
      title: 'Diagnóstico 360º',
      description: 'Análise técnica da infraestrutura, banco de dados e aderência dos processos ao padrão TOTVS.'
    },
    {
      step: '2',
      title: 'Plano de Estabilização',
      description: 'Execução de melhorias imediatas para eliminar erros e lentidões que travam a operação.'
    },
    {
      step: '3',
      title: 'Otimização de Processos',
      description: 'Revisão de customizações (ADVPL/TLPP/RM) para garantir máxima performance e integridade.'
    },
    {
      step: '4',
      title: 'Evolução Estratégica',
      description: 'Acompanhamento contínuo para garantir que o ERP acompanhe o crescimento do seu negócio.'
    }
  ];

  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-[#0B1C2D] min-h-[85vh] flex items-center py-24">
        <div className="container mx-auto px-4 max-w-5xl text-white">
          <span className="text-[var(--coredb-cyan)] font-bold tracking-widest uppercase text-sm mb-4 inline-block">
            Consultoria de Elite para Protheus, RM e Fluig
          </span>

          <h1 
            className="text-4xl md:text-7xl font-bold tracking-tighter leading-tight mb-6 text-left"
            style={{ fontFamily: 'Source Sans Pro', fontWeight: 700 }}
          >
            Seu TOTVS sem Gargalos, <br />
            <span className="text-[var(--coredb-cyan)]">Máxima Performance.</span>
          </h1>

          <p className="text-lg md:text-xl text-white/70 mb-10 max-w-3xl leading-relaxed">
            Eliminamos a lentidão e a instabilidade que travam sua empresa. Unimos engenharia de banco de dados com consultoria de processos para transformar seu ERP em uma ferramenta de alta produtividade.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 mt-8">
            <button
              onClick={handleCTAClick}
              className="font-bold rounded-lg px-10 py-5 text-lg shadow-lg transition-all duration-300 hover:scale-105"
              style={{ background: 'var(--coredb-cyan)', color: 'var(--coredb-dark)' }}
            >
              Solicitar Diagnóstico Técnico
            </button>
            
            <div className="flex items-center gap-6 px-4 border-l border-white/10">
              <div>
                <p className="text-2xl font-bold text-white">24h</p>
                <p className="text-xs text-white/40 uppercase tracking-widest">Retorno Técnico</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">+150</p>
                <p className="text-xs text-white/40 uppercase tracking-widest">Ambientes Otimizados</p>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute inset-0 -z-10">
          <div className="bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-600/10 via-[#0B1C2D] to-[#0B1C2D] w-full h-full" />
        </div>
      </section>

      {/* Diferenciais Section */}
      <section className="relative py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mb-20">
            <h2 
              className="text-4xl md:text-5xl font-bold text-[var(--coredb-dark)] mb-6"
              style={{ fontFamily: 'Source Sans Pro', fontWeight: 700 }}
            >
              Onde as consultorias comuns param, <br />
              <span className="text-[var(--coredb-cyan)]">nós começamos.</span>
            </h2>
            <p className="text-lg text-[#4B5563] leading-relaxed">
              Resolvemos problemas complexos de infraestrutura e performance que o suporte padrão da fábrica não consegue alcançar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="group bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                >
                  <div className="w-14 h-14 rounded-xl bg-[var(--coredb-cyan)]/10 flex items-center justify-center mb-6 group-hover:bg-[var(--coredb-cyan)] transition-all duration-500">
                    <Icon className="w-7 h-7 text-[var(--coredb-cyan)] group-hover:text-[var(--coredb-dark)] transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold text-[var(--coredb-dark)] mb-4 tracking-tight">
                    {feature.title}
                  </h3>
                  <p className="text-[#6B7280] leading-relaxed text-sm">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section className="relative py-20 md:py-32 bg-[#F9FAFB]">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl font-bold text-[var(--coredb-dark)] mb-6 italic">A Jornada para a Estabilidade</h2>
            <div className="h-1.5 w-24 bg-[var(--coredb-cyan)] mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {methodology.map((item, index) => (
              <div key={index} className="relative">
                <div className="text-8xl font-black text-[var(--coredb-cyan)]/10 absolute -top-8 -left-4 select-none">
                  {item.step}
                </div>
                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-[var(--coredb-dark)] mb-4">{item.title}</h3>
                  <p className="text-[#4B5563] text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-24 bg-[var(--coredb-dark)] text-white text-center">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-[#0B1C2D] to-[#152a3d] p-12 rounded-3xl border border-white/5 shadow-2xl">
            <h2 className="text-3xl md:text-5xl font-bold mb-8">Pare de perder tempo com lentidões inexplicáveis.</h2>
            <p className="text-white/60 text-lg mb-10 max-w-2xl mx-auto">
              Nossa equipe técnica está pronta para realizar um health check inicial do seu ambiente e propor soluções definitivas.
            </p>
            <button
              onClick={handleCTAClick}
              className="group flex items-center gap-3 mx-auto px-10 py-5 font-bold rounded-xl transition-all duration-300 hover:gap-5"
              style={{ background: 'var(--coredb-cyan)', color: 'var(--coredb-dark)' }}
            >
              Falar com Engenheiro de Consultoria
              <ArrowRight className="w-5 h-5 transition-transform" />
            </button>
          </div>
        </div>
      </section>
    </>
  );
}