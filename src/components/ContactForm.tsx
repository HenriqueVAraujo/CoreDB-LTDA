import { useState } from 'react';
import { Mail, Phone, Building2, MessageSquare, Send } from 'lucide-react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    need: 'performance',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        need: 'performance',
        message: ''
      });
      setTimeout(() => setSubmitStatus('idle'), 3000);
    } catch (error) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-20 md:py-32 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E0F7FF] border border-[#1DAEFF] mb-6">
              <span className="text-xs font-semibold text-[#0B5A7D] uppercase tracking-wider">
                Contato
              </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-[#0B1C2D] mb-6">
              Vamos Conversar Sobre Seu Ambiente?
            </h2>
            
            <p className="text-lg text-[#4B5563] leading-relaxed">
              Preencha o formulário e retornaremos com um diagnóstico gratuito para entender sua realidade e indicar o melhor caminho em TOTVS e Banco de Dados.
            </p>
          </div>

          {/* Form Container */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-[#0B1C2D] mb-2">
                    Nome completo
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-[#E5E7EB] focus:border-[#1DAEFF] focus:outline-none focus:ring-2 focus:ring-[#1DAEFF]/20 transition-all"
                    placeholder="Seu nome"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-[#0B1C2D] mb-2">
                    E-mail corporativo
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-[#E5E7EB] focus:border-[#1DAEFF] focus:outline-none focus:ring-2 focus:ring-[#1DAEFF]/20 transition-all"
                    placeholder="seu.email@empresa.com"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-[#0B1C2D] mb-2">
                    Telefone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-[#E5E7EB] focus:border-[#1DAEFF] focus:outline-none focus:ring-2 focus:ring-[#1DAEFF]/20 transition-all"
                    placeholder="(11) 99999-9999"
                  />
                </div>

                {/* Company */}
                <div>
                  <label htmlFor="company" className="block text-sm font-semibold text-[#0B1C2D] mb-2">
                    Empresa
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-[#E5E7EB] focus:border-[#1DAEFF] focus:outline-none focus:ring-2 focus:ring-[#1DAEFF]/20 transition-all"
                    placeholder="Nome da sua empresa"
                  />
                </div>

                {/* Need */}
                <div>
                  <label htmlFor="need" className="block text-sm font-semibold text-[#0B1C2D] mb-2">
                    Principal necessidade
                  </label>
                  <select
                    id="need"
                    name="need"
                    value={formData.need}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-[#E5E7EB] focus:border-[#1DAEFF] focus:outline-none focus:ring-2 focus:ring-[#1DAEFF]/20 transition-all bg-white"
                  >
                    <option value="performance">Problemas de performance ou lentidão</option>
                    <option value="protheus">Projetos em TOTVS Protheus</option>
                    <option value="rm">Projetos em TOTVS RM</option>
                    <option value="fluig">Projetos em Fluig / automação de processos</option>
                    <option value="dba">Otimização ou suporte de Banco de Dados</option>
                    <option value="allocation">Alocação de analista remoto</option>
                    <option value="other">Outro</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-[#0B1C2D] mb-2">
                    Conte-nos um pouco mais
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg border border-[#E5E7EB] focus:border-[#1DAEFF] focus:outline-none focus:ring-2 focus:ring-[#1DAEFF]/20 transition-all resize-none"
                    placeholder="Descreva o cenário atual, desafios e prazos desejados..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-[#0B1C2D] text-white font-bold rounded-lg hover:bg-[#1DAEFF] hover:text-[#0B1C2D] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Solicitar contato da CoreDB
                    </>
                  )}
                </button>

                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <div className="p-4 rounded-lg bg-[#E0F7FF] border border-[#1DAEFF] text-[#0B5A7D]">
                    Mensagem enviada com sucesso! Nossa equipe retornará em breve.
                  </div>
                )}
                {submitStatus === 'error' && (
                  <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-700">
                    Erro ao enviar mensagem. Por favor, tente novamente.
                  </div>
                )}
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              {/* Info Card 1 */}
              <div className="bg-[#F5F7FA] rounded-lg p-6 border border-[#E5E7EB]">
                <div className="flex items-center gap-3 mb-4">
                  <Mail className="w-6 h-6 text-[#1DAEFF]" />
                  <h3 className="font-bold text-[#0B1C2D]">E-mail</h3>
                </div>
                <p className="text-[#4B5563] text-sm">
                  comercial@coredb.com.br
                </p>
              </div>

              {/* Info Card 2 */}
              <div className="bg-[#F5F7FA] rounded-lg p-6 border border-[#E5E7EB]">
                <div className="flex items-center gap-3 mb-4">
                  <Phone className="w-6 h-6 text-[#1DAEFF]" />
                  <h3 className="font-bold text-[#0B1C2D]">WhatsApp</h3>
                </div>
                <p className="text-[#4B5563] text-sm">
                  <a href="https://wa.me/553191873435" target="_blank" rel="noopener noreferrer" className="hover:text-[#1DAEFF] transition-colors">(31) 99187-3435</a>
                </p>
              </div>

              {/* Info Card 3 */}
              <div className="bg-gradient-to-br from-[#0B1C2D] to-[#1DAEFF] rounded-lg p-6 text-white">
                <div className="flex items-center gap-3 mb-4">
                  <Building2 className="w-6 h-6" />
                  <h3 className="font-bold">Diagnóstico Gratuito</h3>
                </div>
                <p className="text-white/90 text-sm">
                  Sem custo. Sem compromisso. Apenas uma conversa honesta sobre sua realidade técnica.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
