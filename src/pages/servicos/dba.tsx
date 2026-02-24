import { ShieldAlert, Database, Activity, ArrowRight, Lock, Server } from 'lucide-react';

export default function DBA() {
  const handleCTAClick = () => {
    const url =
      'https://wa.me/553191873435?text=' +
      encodeURIComponent(
        'Olá! Preciso de um Health Check especializado no meu Banco de Dados. Meu ambiente está apresentando instabilidades.'
      );
    window.open(url, '_blank');
  };

  const features = [
    {
      icon: Activity,
      title: 'SQL Tuning Avançado',
      description: 'Identificação de querys ofensoras e otimização de índices para reduzir drasticamente o tempo de resposta.'
    },
    {
      icon: Lock,
      title: 'Segurança e Blindagem',
      description: 'Proteção contra ataques, controle de privilégios e auditoria completa para conformidade com a LGPD.'
    },
    {
      icon: ShieldAlert,
      title: 'Disaster Recovery',
      description: 'Estratégias reais de backup e alta disponibilidade para garantir que sua operação volte em minutos após uma falha.'
    },
    {
      icon: Server,
      title: 'Monitoramento 24/7',
      description: 'Nossa equipe detecta o problema antes do seu usuário, agindo de forma proativa na saúde do servidor.'
    }
  ];

  const methodology = [
    {
      step: '1',
      title: 'Health Check Inicial',
      description: 'Raio-X completo do servidor e da instância do banco de dados para identificar gargalos imediatos.'
    },
    {
      step: '2',
      title: 'Plano de Contingência',
      description: 'Estruturação de políticas de backup e redundância para garantir risco zero de perda de dados.'
    },
    {
      step: '3',
      title: 'Otimização Contínua',
      description: 'Ajustes finos de memória, disco e CPU para extrair o máximo do seu hardware atual.'
    },
    {
      step: '4',
      title: 'Governança de Dados',
      description: 'Relatórios de saúde, planejamento de capacidade e consultoria para expansão do ambiente.'
    }
  ];

  return (
    <main className="min-h-screen bg-white">
      
      {/* Hero Section */}
      <section className="relative bg-[#0B1C2D] min-h-[80vh] flex items-center py-20">
        <div className="container mx-auto px-4 max-w-5xl text-white">
          <span className="text-[var(--coredb-cyan)] font-bold tracking-widest uppercase text-sm mb-4 inline-block">
            Gestão Especializada de Bancos de Dados
          </span>

          <h1 
            className="text-4xl md:text-7xl font-bold tracking-tighter leading-tight mb-6 text-left"
            style={{ fontFamily: 'Source Sans Pro', fontWeight: 700 }}
          >
            Seus Dados Blindados, <br />
            <span className="text-[var(--coredb-cyan)]">Performance Sem Limites.</span>
          </h1>

          <p className="text-lg md:text-xl text-white/70 mb-10 max-w-3xl leading-relaxed">
            O banco de dados é o coração da sua empresa. Não deixe a performance do seu TOTVS ou sistema legado sofrer por falta de manutenção especializada. Entregamos estabilidade e segurança de nível enterprise.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 mt-8">
            <button
              onClick={handleCTAClick}
              className="font-bold rounded-lg px-10 py-5 text-lg shadow-lg transition-all duration-300 hover:scale-105"
              style={{ background: 'var(--coredb-cyan)', color: 'var(--coredb-dark)' }}
            >
              Agendar Diagnóstico DBA
            </button>
            
            <div className="flex items-center gap-6 px-4 border-l border-white/10">
              <div className="text-center">
                <p className="text-2xl font-bold text-white">99.9%</p>
                <p className="text-xs text-white/40 uppercase tracking-widest">Uptime Alvo</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-white">Zero</p>
                <p className="text-xs text-white/40 uppercase tracking-widest">Perda de Dados</p>
              </div>
            </div>
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
            <h2 
              className="text-4xl md:text-5xl font-bold text-[var(--coredb-dark)] mb-6"
              style={{ fontFamily: 'Source Sans Pro', fontWeight: 700 }}
            >
              Gestão de Banco de Dados <br />
              <span className="text-[var(--coredb-cyan)]">Não é um gasto, é proteção.</span>
            </h2>
            <p className="text-lg text-[#4B5563] leading-relaxed">
              Enquanto as consultorias de software focam na aplicação, nós focamos na fundação. Garantimos que sua base suporte o crescimento da sua empresa sem lentidões.
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
      <section className="py-20 md:py-32 bg-[#F9FAFB]">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl font-bold text-[var(--coredb-dark)] mb-6">Metodologia de Segurança de Dados</h2>
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
      <section className="py-24 bg-[#0B1C2D] text-white text-center">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto p-12 rounded-3xl border border-white/5 bg-gradient-to-br from-[#0B1C2D] to-[#152a3d] shadow-2xl">
            <h2 className="text-3xl md:text-5xl font-bold mb-8">Sua base de dados está segura agora?</h2>
            <p className="text-white/60 text-lg mb-10 max-w-2xl mx-auto">
              Não espere um incidente acontecer para agir. Solicite um Health Check técnico e descubra como está a saúde do seu maior ativo.
            </p>
            <button
              onClick={handleCTAClick}
              className="group flex items-center gap-3 mx-auto px-10 py-5 font-bold rounded-xl transition-all duration-300 hover:gap-5"
              style={{ background: 'var(--coredb-cyan)', color: 'var(--coredb-dark)' }}
            >
              Falar com um Especialista DBA
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}