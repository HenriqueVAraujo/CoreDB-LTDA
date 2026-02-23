export default function Hero() {
  const handleCTAClick = () => {
    const url =
      'https://wa.me/553191873435?text=' +
      encodeURIComponent(
        'Olá, gostaria de conversar sobre sustentação estratégica e continuidade operacional para meu ambiente TOTVS.'
      );
    window.open(url, '_blank');
  };

  const handleMethodologyClick = () => {
    const methodologySection = document.getElementById('methodology');
    if (methodologySection) {
      methodologySection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative bg-[#0B1C2D] min-h-[75vh] flex items-center py-24">
      <div className="container mx-auto px-4 max-w-4xl text-white">

        {/* HEADLINE */}
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
          Continuidade operacional para ambientes TOTVS e tecnologia crítica.
        </h1>

        {/* SUBHEADLINE */}
        <p className="text-lg md:text-xl text-white/80 mb-8 max-w-3xl">
          Sustentação estratégica, governança técnica e acompanhamento contínuo
          para Protheus, RM, Datasul, Fluig, bancos de dados e gestão estruturada com GLPI.
          Atuamos como parceiros de longo prazo, garantindo estabilidade,
          previsibilidade e evolução constante da sua operação.
        </p>

        {/* PROVA */}
        <div className="text-sm text-white/60 mb-10">
          Ambientes críticos exigem especialistas • Sustentação com responsabilidade técnica • Compromisso contínuo com sua operação
        </div>

        {/* BOTÕES */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleCTAClick}
            className="font-bold rounded-lg px-8 py-4 text-lg shadow-lg transition-all duration-300 hover:scale-[1.02]"
            style={{ background: '#1DAEFF', color: '#0B1C2D' }}
          >
            Falar com especialista
          </button>

          <button
            onClick={handleMethodologyClick}
            className="font-semibold rounded-lg px-8 py-4 text-lg border transition-all duration-300 hover:scale-[1.02]"
            style={{
              background: 'transparent',
              borderColor: '#1DAEFF',
              color: '#1DAEFF'
            }}
          >
            Conhecer nossa abordagem
          </button>
        </div>

      </div>
    </section>
  );
}