import React from 'react';
import { FileText, Gavel, ShieldAlert, Copyright, ChevronLeft, MessageSquare, ExternalLink } from 'lucide-react';
import { Link } from 'wouter';

export default function TermsOfUse() {
  return (
    <div className="bg-[#0B1C2D] min-h-screen text-white font-sans selection:bg-[#1DAEFF]/30">
      {/* Navegação */}
      <nav className="border-b border-white/5 py-6 bg-[#0B1C2D]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 text-white/60 hover:text-[#1DAEFF] transition-colors group">
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Voltar para Home
          </Link>
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/40">Transparência Jurídica</span>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="py-20 bg-gradient-to-b from-[#0B1C2D] to-[#0f273d]">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 !text-white" style={{ color: 'white' }}>
            Termos de Uso
          </h1>
          <p className="text-[#1DAEFF] font-medium mb-2 text-lg">Regras e Condições de Navegação</p>
          <p className="text-white/40 text-sm italic">Última atualização: 13 de Fevereiro de 2026</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          
          {/* Alerta de Independência - CRÍTICO PARA CONVERSÃO B2B */}
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-6 mb-12 flex flex-col md:flex-row gap-6 items-center">
            <div className="bg-amber-500/20 p-4 rounded-full">
              <ShieldAlert className="w-8 h-8 text-amber-500" />
            </div>
            <div>
              <h3 className="font-bold text-amber-500 mb-1">Aviso de Independência</h3>
              <p className="text-sm text-white/70 leading-relaxed">
                A CoreDB é uma consultoria <strong>independente</strong>. Não somos afiliados, representantes ou parceiros oficiais da TOTVS S.A. 
                As marcas Protheus, RM e Fluig são propriedade da sua detentora.
              </p>
            </div>
          </div>

          {/* Conteúdo dos Termos */}
          <article className="prose prose-invert prose-blue max-w-none space-y-12 text-white/80">
            
            <section className="bg-white/5 p-8 rounded-2xl border border-white/10">
              <h2 className="text-2xl font-bold !text-white mb-6 flex items-center gap-3" style={{ color: 'white' }}>
                <FileText className="text-[#1DAEFF]" /> 1. Aceitação dos Termos
              </h2>
              <p>
                Ao aceder ao site da CoreDB, o utilizador concorda em cumprir estes termos de serviço, todas as leis e regulamentos aplicáveis. 
                O conteúdo aqui disponibilizado tem finalidade informativa sobre os nossos serviços de consultoria técnica em Banco de Dados e sistemas ERP.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold !text-white mb-4" style={{ color: 'white' }}>2. Propriedade Intelectual</h2>
              <p>
                Todo o conteúdo deste site (textos, logótipos, design e scripts) é propriedade exclusiva da CoreDB. 
                A reprodução de qualquer material sem autorização prévia por escrito é estritamente proibida, conforme a Lei de Direitos Autorais brasileira.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold !text-white mb-4" style={{ color: 'white' }}>3. Limitação de Responsabilidade</h2>
              <p>
                As informações técnicas partilhadas (artigos e diagnósticos superficiais) são de caráter educativo. 
                A implementação de qualquer script ou alteração em banco de dados deve ser precedida de uma consultoria formal e contrato assinado. 
                A CoreDB não se responsabiliza por decisões tomadas de forma autónoma com base no conteúdo do site.
              </p>
            </section>

            <section className="border-l-4 border-[#1DAEFF] pl-6 py-2">
              <h2 className="text-2xl font-bold !text-white mb-4" style={{ color: 'white' }}>4. Uso Proibido</h2>
              <p>É vedado ao utilizador:</p>
              <ul className="list-disc pl-6 space-y-2 text-sm">
                <li>Tentar extrair código-fonte do site ou realizar engenharia reversa;</li>
                <li>Utilizar ferramentas automatizadas (bots/scrapers) para recolher dados;</li>
                <li>Simular identidade para obter diagnósticos comerciais de forma fraudulenta.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold !text-white mb-4" style={{ color: 'white' }}>5. Foro e Legislação</h2>
              <p>
                Estes termos são regidos pelas leis da República Federativa do Brasil. Fica eleito o foro da 
                <strong> Comarca de Belo Horizonte/MG</strong> para dirimir quaisquer questões legais.
              </p>
            </section>

          </article>

          {/* Rodapé Interno da Página */}
          <div className="mt-20 pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4 text-white/40 text-sm">
              <Copyright className="w-4 h-4" />
              <span>{new Date().getFullYear()} CoreDB Consultoria Técnica</span>
            </div>
            <div className="flex gap-8">
              <Link href="/politica-de-privacidade" className="text-sm text-[#1DAEFF] hover:underline flex items-center gap-2">
                Ver Política de Privacidade <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* CTA de Conversão */}
          <div className="mt-16 bg-gradient-to-r from-[#1DAEFF] to-[#0B1C2D] p-[1px] rounded-3xl">
            <div className="bg-[#0B1C2D] p-10 rounded-[23px] text-center">
              <h3 className="text-2xl font-bold mb-4 !text-white" style={{ color: 'white' }}>Precisa de uma análise formal?</h3>
              <p className="text-white/60 mb-8 max-w-xl mx-auto">
                Não arrisque a sua operação com informações genéricas. Agende um diagnóstico técnico oficial com os nossos especialistas.
              </p>
              <Link href="/#contact" className="inline-flex items-center gap-3 bg-white text-[#0B1C2D] px-8 py-4 rounded-full font-bold hover:bg-[#1DAEFF] hover:text-white transition-all transform hover:scale-105">
                <MessageSquare className="w-5 h-5" />
                Agendar Diagnóstico Gratuito
              </Link>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}