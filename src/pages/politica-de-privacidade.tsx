import React from 'react';
import { ShieldCheck, Lock, EyeOff, Scale, ChevronLeft, Mail } from 'lucide-react';
import { Link } from 'wouter';

export default function PrivacyPolicy() {
  return (
    <div className="bg-[#0B1C2D] min-h-screen text-white font-sans selection:bg-[#1DAEFF]/30">
      {/* Header de Navegação Rápida */}
      <nav className="border-b border-white/5 py-6 bg-[#0B1C2D]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 text-white/60 hover:text-[#1DAEFF] transition-colors group">
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Voltar para Home
          </Link>
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/40">Segurança & Conformidade</span>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="py-20 bg-gradient-to-b from-[#0B1C2D] to-[#0f273d]">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 !text-white" style={{ color: 'white' }}>
            Política de Privacidade
          </h1>
          <p className="text-[#1DAEFF] font-medium mb-2">CoreDB Consultoria Técnica</p>
          <p className="text-white/40 text-sm">Última atualização: 13 de Fevereiro de 2026</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          
          {/* Box de Resumo para Humanos - GATILHO DE CONVERSÃO */}
          <div className="bg-gradient-to-br from-[#1DAEFF]/10 to-transparent border border-[#1DAEFF]/30 rounded-2xl p-8 mb-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <ShieldCheck className="w-24 h-24 text-[#1DAEFF]" />
            </div>
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 !text-white" style={{ color: 'white' }}>
              <ShieldCheck className="text-[#1DAEFF]" /> Resumo para Humanos
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h4 className="font-bold text-[#1DAEFF] mb-2">Confidencialidade</h4>
                <p className="text-sm text-white/70">Seus dados são tratados com sigilo bancário e protegidos por criptografia.</p>
              </div>
              <div>
                <h4 className="font-bold text-[#1DAEFF] mb-2">Uso Ético</h4>
                <p className="text-sm text-white/70">Coletamos apenas o necessário para diagnósticos técnicos e comerciais.</p>
              </div>
              <div>
                <h4 className="font-bold text-[#1DAEFF] mb-2">Continuidade</h4>
                <p className="text-sm text-white/70">Garantimos RTO de 24h e RPO de 4h para seus dados críticos em nossos cuidados.</p>
              </div>
            </div>
          </div>

          {/* Conteúdo Jurídico Estruturado */}
          <article className="prose prose-invert prose-blue max-w-none space-y-12 text-white/80 leading-relaxed">
            
            <section>
              <h2 className="text-2xl font-bold !text-white mb-4" style={{ color: 'white' }}>1. Identificação e Independência</h2>
              <p>A CoreDB é uma consultoria <strong>independente</strong>. Não somos afiliados à TOTVS®. Lidamos com dados críticos B2B com foco em performance e segurança.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold !text-white mb-4" style={{ color: 'white' }}>2. Coleta de Dados</h2>
              <p>Coletamos nome, e-mail corporativo, empresa e telefone exclusivamente através de nossos formulários para:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Diagnósticos de Banco de Dados e ERP Protheus/RM;</li>
                <li>Envio de propostas comerciais personalizadas;</li>
                <li>Comunicação técnica sobre projetos em andamento.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold !text-white mb-4" style={{ color: 'white' }}>3. Seus Direitos (LGPD)</h2>
              <p>Conforme o Art. 18 da LGPD, você pode solicitar a qualquer momento o acesso, correção ou exclusão de seus dados através do e-mail <strong>contato@coredb.com.br</strong>.</p>
            </section>

          </article>

          {/* CTA Final - CONVERSÃO */}
          <div className="mt-20 p-10 bg-white/5 rounded-3xl border border-white/10 text-center">
            <h3 className="text-2xl font-bold mb-4 !text-white" style={{ color: 'white' }}>Dúvidas sobre sua segurança?</h3>
            <p className="text-white/60 mb-8">Nosso DPO e time técnico estão à disposição para explicar nossos processos de proteção.</p>
            <a href="mailto:contato@coredb.com.br" className="inline-flex items-center gap-3 bg-[#1DAEFF] hover:bg-[#1DAEFF]/80 text-white px-8 py-4 rounded-full font-bold transition-all">
              <Mail className="w-5 h-5" />
              Falar com o Encarregado de Dados
            </a>
          </div>

        </div>
      </main>
    </div>
  );
}