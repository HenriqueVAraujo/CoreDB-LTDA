import { Code2, Zap, Share2, Layers, ArrowRight, Cpu, Globe, Rocket } from 'lucide-react';

export default function DesenvolvimentoCustomizacoes() {
  const handleCTAClick = () => {
    const url =
      'https://wa.me/553191873435?text=' +
      encodeURIComponent(
        'Olá! Preciso de uma solução customizada para meu ERP TOTVS. Gostaria de falar com um arquiteto de software.'
      );
    window.open(url, '_blank');
  };

  const diferenciais = [
    {
      icon: Share2,
      title: 'Integrações Inteligentes',
      description: 'Conectamos seu TOTVS a qualquer plataforma (CRMs, E-commerce, Bancos) via API Rest com total segurança.'
    },
    {
      icon: Cpu,
      title: 'Automação de Processos',
      description: 'Eliminamos o trabalho braçal e as planilhas paralelas, criando rotinas automáticas dentro do Protheus, RM ou Fluig.'
    },
    {
      icon: Code2,
      title: 'Código de Alta Performance',
      description: 'Desenvolvimento em ADVPL, TLPP, PO-UI ou Metadados seguindo padrões que não pesam no seu banco de dados.'
    },
    {
      icon: Layers,
      title: 'Evolução de Legados',
      description: 'Modernizamos customizações antigas e instáveis, garantindo que elas sobrevivam às atualizações de release.'
    }
  ];

  const metodologia = [
    {
      step: '1',
      title: 'Imersão Técnica',
      description: 'Entendemos o gargalo do negócio para desenhar a arquitetura técnica mais eficiente e menos custosa.'
    },
    {
      step: '2',
      title: 'Desenvolvimento e Boas Práticas',
      description: 'Desenvolvimento focado em escalabilidade, com código limpo, documentado e fácil de manter.'
    },
    {
      step: '3',
      title: 'Homologação Rígida',
      description: 'Testes de estresse e integridade para garantir que a nova funcionalidade não gere impactos colaterais.'
    },
    {
      step: '4',
      title: 'Acompanhamento de Go-Live',
      description: 'Acompanhamento em tempo real durante a virada de chave, garantindo o sucesso imediato da solução.'
    }
  ];

  return (
    <main className="min-h-screen bg-white">
      
      {/* Seção Hero */}
      <section className="relative bg-[#0B1C2D] min-h-[80vh] flex items-center py-20">
        <div className="container mx-auto px-4 max-w-5xl text-white">
          <span className="text-[var(--coredb-cyan)] font-bold tracking-widest uppercase text-sm mb-4 inline-block">
            Engenharia de Software para o Ecossistema TOTVS
          </span>

          <h1 
            className="text-4xl md:text-7xl font-bold tracking-tighter leading-tight mb-6 text-left"
            style={{ fontFamily: 'Source Sans Pro', fontWeight: 700 }}
          >
            Sistemas Sob Medida, <br />
            <span className="text-[var(--coredb-cyan)]">Resultados Reais.</span>
          </h1>

          <p className="text-lg md:text-xl text-white/70 mb-10 max-w-3xl leading-relaxed">
            Seu ERP deve se adaptar ao seu negócio, e não o contrário. Desenvolvemos soluções personalizadas que eliminam processos manuais e conectam sua operação ao futuro digital.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 mt-8">
            <button
              onClick={handleCTAClick}
              className="font-bold rounded-lg px-10 py-5 text-lg shadow-lg transition-all duration-300 hover:scale-105"
              style={{ background: 'var(--coredb-cyan)', color: 'var(--coredb-dark)' }}
            >
              Iniciar Projeto Customizado
            </button>
            
            <div className="flex items-center gap-6 px-4 border-l border-white/10">
              <div className="text-center">
                <p className="text-2xl font-bold text-white">Código</p>
                <p className="text-xs text-white/40 uppercase tracking-widest">Limpo e Seguro</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-white">Alta</p>
                <p className="text-xs text-white/40 uppercase tracking-widest">Integração</p>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute inset-0 -z-10">
          <div className="bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-500/10 via-[#0B1C2D] to-[#0B1C2D] w-full h-full" />
        </div>
      </section>

      {/* Seção de Diferenciais */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mb-20">
            <h2 
              className="text-4xl md:text-5xl font-bold text-[var(--coredb-dark)] mb-6"
              style={{ fontFamily: 'Source Sans Pro', fontWeight: 700 }}
            >
              Tecnologia que <br />
              <span className="text-[var(--coredb-cyan)]">potencializa o seu ERP.</span>
            </h2>
            <p className="text-lg text-[#4B5563] leading-relaxed">
              Não fazemos apenas "programação". Entregamos arquitetura de software pensada para não onerar seu banco de dados e facilitar futuras atualizações de versão.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {diferenciais.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="group bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                >
                  <div className="w-14 h-14 rounded-xl bg-[var(--coredb-cyan)]/10 flex items-center justify-center mb-6 group-hover:bg-[var(--coredb-cyan)] transition-all duration-500">
                    <Icon className="w-7 h-7 text-[var(--coredb-cyan)] group-hover:text-[var(--coredb-dark)] transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold text-[var(--coredb-dark)] mb-4 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-[#6B7280] leading-relaxed text-sm">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Seção de Metodologia */}
      <section className="py-20 md:py-32 bg-[#F9FAFB]">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl font-bold text-[var(--coredb-dark)] mb-6">Ciclo de Desenvolvimento Ágil</h2>
            <div className="h-1.5 w-24 bg-[var(--coredb-cyan)] mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {metodologia.map((item, index) => (
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

      {/* Rodapé CTA */}
      <section className="py-24 bg-[#0B1C2D] text-white text-center">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto p-12 rounded-3xl border border-white/5 bg-gradient-to-br from-[#0B1C2D] to-[#152a3d] shadow-2xl">
            <h2 className="text-3xl md:text-5xl font-bold mb-8">Tem um desafio de integração ou automação?</h2>
            <p className="text-white/60 text-lg mb-10 max-w-2xl mx-auto">
              Nossa equipe de arquitetos está pronta para transformar sua necessidade em um sistema estável, escalável e produtivo.
            </p>
            <button
              onClick={handleCTAClick}
              className="group flex items-center gap-3 mx-auto px-10 py-5 font-bold rounded-xl transition-all duration-300 hover:gap-5"
              style={{ background: 'var(--coredb-cyan)', color: 'var(--coredb-dark)' }}
            >
              Falar com Arquiteto de Software
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}