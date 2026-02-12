import React from 'react';

interface ServicePageProps {
  serviceKey: string;
  title: string;
  subtitle: string;
  overview: string;
  problems: string[];
  methodology: string[];
  benefits: string[];
  idealClients: string[];
  whatsappMessage: string;
}

const WHATSAPP_URL = 'https://wa.me/553191873435';

export default function ServicePage({
  title,
  subtitle,
  overview,
  problems,
  methodology,
  benefits,
  idealClients,
  whatsappMessage,
}: ServicePageProps) {
  const handleWhatsApp = () => {
    const url = `${WHATSAPP_URL}?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(url, '_blank');
  };

  return (
    <main className="min-h-screen bg-white pt-20">
      {/* HERO */}
      <section className="bg-[#0B1C2D] py-20 md:py-32 text-white text-center px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight"style={{color: 'rgba(255,255,255,1)'}}>{title}</h1>
          <h2 className="text-lg md:text-2xl font-light mb-8 max-w-2xl mx-auto" style={{color: 'rgba(255,255,255,0.85)'}}>{subtitle}</h2>
          <button
            onClick={handleWhatsApp}
            className="inline-block px-8 py-4 bg-[#1DAEFF] text-[#0B1C2D] font-bold rounded-lg shadow-lg hover:bg-[#0B5A7D] hover:text-white transition-all text-base md:text-lg"
          >
            Agendar diagnóstico técnico
          </button>
        </div>
      </section>

      {/* VISÃO GERAL */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-[#0B1C2D] mb-4">Visão Geral</h3>
          <p className="text-lg text-[#374151] leading-relaxed font-medium">{overview}</p>
        </div>
      </section>

      {/* PROBLEMAS */}
      <section className="py-12 md:py-20 bg-[#F5F7FA]">
        <div className="max-w-4xl mx-auto px-4">
          <h3 className="text-2xl font-bold text-[#0B1C2D] mb-6 text-center">Problemas que Resolvemos</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {problems.map((problem, i) => (
              <li key={i} className="bg-white rounded-lg p-6 border border-[#E5E7EB] text-[#374151] text-base font-medium shadow-sm">
                {problem}
              </li>
            ))}
          </ul>
        </div>
      </section>
        {/* METODOLOGIA */}
      {/* METODOLOGIA */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h3 className="text-2xl font-bold text-[#0B1C2D] mb-6 text-center">Como Atuamos</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {methodology.map((step, i) => (
              <div key={i} className="bg-[#E0F7FF] rounded-lg p-6 border border-[#1DAEFF] text-[#0B1C2D] font-semibold shadow-sm">
                <span className="text-[#374151] font-medium">{step}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFÍCIOS */}
      <section className="py-12 md:py-20 bg-[#F5F7FA]">
        <div className="max-w-4xl mx-auto px-4">
          <h3 className="text-2xl font-bold text-[#0B1C2D] mb-6 text-center">Benefícios Gerados</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map((benefit, i) => (
              <li key={i} className="bg-white rounded-lg p-6 border border-[#E5E7EB] text-[#374151] text-base font-medium shadow-sm">
                {benefit}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* PERFIL DE CLIENTE IDEAL */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold text-[#0B1C2D] mb-6">Perfil de Cliente Ideal</h3>
          <ul className="space-y-3">
            {idealClients.map((client, i) => (
              <li key={i} className="text-[#374151] text-base bg-[#E0F7FF] rounded-lg px-6 py-3 inline-block font-medium">
                {client}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-16 md:py-24 bg-[#0B1C2D] text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">Pronto para transformar seu ambiente?</h3>
          <p className="text-lg mb-8 text-white/80">Fale com especialistas que entendem de missão crítica e entregam resultado real.</p>
          <button
            onClick={handleWhatsApp}
            className="inline-block px-8 py-4 bg-[#1DAEFF] text-[#0B1C2D] font-bold rounded-lg shadow-lg hover:bg-white hover:text-[#0B1C2D] transition-all text-base md:text-lg"
          >
            Agendar diagnóstico técnico
          </button>
        </div>
      </section>

    </main>
  );
}
