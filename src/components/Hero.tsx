export default function Hero() {
  const handleCTAClick = () => {
    const url =
      'https://wa.me/553191873435?text=' +
      encodeURIComponent(
        'Olá, preciso de um diagnóstico técnico para meu ambiente TOTVS (Protheus/RM/Fluig). Estamos enfrentando problemas de performance ou instabilidade no banco de dados.'
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
    <section className="relative bg-[#0B1C2D] min-h-[65vh] flex items-center py-12 md:py-24">
      <div
        className="container mx-auto px-4 flex flex-col items-center md:items-start max-w-4xl animate-hero-fadein"
        style={{ color: '#fff', zIndex: 1 }}
      >
        {/* HEADLINE PRINCIPAL */}
        <h1
          className="text-center md:text-left text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight mb-6"
          style={{ textShadow: '0 2px 8px rgba(11,28,45,0.12)' }}
        >
          ERP lento? Banco travando?<br className="hidden md:block" />
          <span style={{ color: '#1DAEFF' }}>
            Restauramos a performance do seu ambiente TOTVS.
          </span>
        </h1>

        {/* SUBHEADLINE */}
        <h2
          className="text-center md:text-left text-lg md:text-2xl font-light mb-6 max-w-3xl"
          style={{ color: 'rgba(255,255,255,0.85)' }}
        >
          Especialistas em diagnóstico profundo, tuning de banco de dados e
          estabilidade operacional para Protheus, RM, Fluig, SQL Server e Oracle.
        </h2>

        {/* FRASE DE IMPACTO */}
        <div className="flex flex-col md:flex-row md:items-center gap-4 w-full mb-6">
          <span
            className="block text-base md:text-lg font-medium border-l-4 pl-4 py-1"
            style={{ color: 'rgba(255,255,255,0.75)', borderColor: '#1DAEFF' }}
          >
            Performance. Estabilidade. Segurança. Continuidade operacional.
          </span>
        </div>

        {/* PROVA TÉCNICA RÁPIDA */}
        <div
          className="text-sm md:text-base mb-8 text-center md:text-left"
          style={{ color: 'rgba(255,255,255,0.65)' }}
        >
          +100 ambientes analisados • Redução média de 30% em tempo de processamento •
          Diagnóstico técnico em até 48h
        </div>

        {/* BOTÕES */}
        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <button
            onClick={handleCTAClick}
            className="w-full sm:w-auto font-bold rounded-lg px-8 py-4 text-base md:text-lg shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#1DAEFF] focus:ring-offset-2"
            style={{ background: '#1DAEFF', color: '#0B1C2D' }}
          >
            Solicitar diagnóstico do meu ERP
          </button>

          <button
            type="button"
            onClick={handleMethodologyClick}
            className="w-full sm:w-auto font-semibold rounded-lg px-8 py-4 text-base md:text-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#1DAEFF] focus:ring-offset-2 border"
            style={{
              background: 'transparent',
              borderColor: '#1DAEFF',
              color: '#1DAEFF'
            }}
            onMouseOver={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = '#1DAEFF';
              (e.currentTarget as HTMLButtonElement).style.color = '#0B1C2D';
            }}
            onMouseOut={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
              (e.currentTarget as HTMLButtonElement).style.color = '#1DAEFF';
            }}
          >
            Entender a metodologia
          </button>
        </div>
      </div>
    </section>
  );
}
