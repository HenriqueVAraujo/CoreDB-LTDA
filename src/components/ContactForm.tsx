'use client'

import { useState } from "react";
import { Mail, Phone, Send, ShieldCheck, MessageCircle } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    environment: "",
    urgency: "",
    message: "",
  });

  const [leadType, setLeadType] = useState<"standard" | "strategic" | "critical">("standard");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "urgency") {
      if (value === "immediate") setLeadType("critical");
      else if (value === "short") setLeadType("strategic");
      else setLeadType("standard");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, leadType }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", phone: "", company: "", environment: "", urgency: "", message: "" });
        setTimeout(() => setSubmitStatus("idle"), 5000);
      } else {
        throw new Error(result.error || "Falha no envio");
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsApp = () => {
    const url =
      'https://wa.me/553191873435?text=' +
      encodeURIComponent(
        'Olá! Gostaria de falar diretamente com um especialista CoreDB para discutir meu ambiente TOTVS.'
      );
    window.open(url, '_blank');
  };

  return (
    <section id="contact" className="py-28 bg-[#F9FAFB]">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-20 max-w-3xl">
          <span className="text-[var(--coredb-cyan)] uppercase tracking-widest text-xs font-semibold mb-6 inline-block">
            Avaliação Técnica
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--coredb-dark)] mb-8">
            Inicie Sua Análise Estratégica de Ambiente
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Nossa equipe realizará uma avaliação preliminar do seu ambiente TOTVS e banco de dados
            para identificar riscos, gargalos e oportunidades de otimização.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 bg-white p-10 rounded-2xl border border-gray-200 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input label="Nome Completo" name="name" value={formData.name} onChange={handleChange} />
                <Input label="E-mail Corporativo" name="email" value={formData.email} onChange={handleChange} type="email" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input label="Telefone / WhatsApp" name="phone" value={formData.phone} onChange={handleChange} type="tel" />
                <Input label="Empresa" name="company" value={formData.company} onChange={handleChange} />
              </div>

              <Select
                label="Principal Dor do Ambiente"
                name="environment"
                value={formData.environment}
                onChange={handleChange}
                options={[
                  { value: "instability", label: "Instabilidade ou lentidão recorrente no ERP" },
                  { value: "monitoring", label: "Sem monitoramento estruturado (Zabbix / Grafana)" },
                  { value: "database", label: "Banco de dados sem DBA dedicado (SQL Server / Oracle)" },
                  { value: "support", label: "Suporte reativo — precisamos de SLA contratual" },
                  { value: "project", label: "Projeto crítico: customização, integração ou migração" },
                ]}
              />

              <Select
                label="Nível de Urgência"
                name="urgency"
                value={formData.urgency}
                onChange={handleChange}
                options={[
                  { value: "planning", label: "Planejamento estratégico (30+ dias)" },
                  { value: "short", label: "Necessidade no curto prazo (até 30 dias)" },
                  { value: "immediate", label: "Situação crítica — preciso de ação imediata" },
                ]}
              />

              <div>
                <label className="block text-sm font-semibold text-[var(--coredb-dark)] mb-2">
                  Contexto Adicional <span className="font-normal text-gray-400">(opcional)</span>
                </label>
                <textarea
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Descreva brevemente o cenário, volume de usuários, módulos em uso ou qualquer detalhe relevante..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[var(--coredb-cyan)] focus:ring-2 focus:ring-[var(--coredb-cyan)]/20 transition resize-none text-sm"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-5 bg-[var(--coredb-dark)] text-white font-semibold rounded-xl hover:bg-[var(--coredb-cyan)] hover:text-[var(--coredb-dark)] transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Processando..." : "Solicitar Análise Técnica"}
                <Send className="w-5 h-5" />
              </button>

              {submitStatus === "success" && (
                <div className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl">
                  Solicitação recebida! Nossa equipe técnica entrará em contato em breve.
                </div>
              )}

              {submitStatus === "error" && (
                <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl">
                  Erro ao enviar. Por favor, use o contato direto ao lado ou tente novamente.
                </div>
              )}
            </form>
          </div>

          {/* SIDE PANEL */}
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
              <h3 className="font-semibold text-[var(--coredb-dark)] mb-6 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[var(--coredb-cyan)]" />
                O Que Acontece a Seguir
              </h3>
              <ul className="space-y-4 text-sm text-gray-600">
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-[var(--coredb-cyan)]/10 text-[var(--coredb-cyan)] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">1</span>
                  <span>Análise do cenário informado por especialista técnico</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-[var(--coredb-cyan)]/10 text-[var(--coredb-cyan)] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">2</span>
                  <span>Identificação de riscos e gargalos prioritários</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-[var(--coredb-cyan)]/10 text-[var(--coredb-cyan)] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">3</span>
                  <span>Proposta estruturada com escopo e SLA definidos</span>
                </li>
              </ul>
            </div>

            <button
              onClick={handleWhatsApp}
              className="w-full flex items-center justify-center gap-3 py-5 px-6 rounded-2xl font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
              style={{ background: '#25D366' }}
            >
              <MessageCircle className="w-5 h-5" />
              Falar Diretamente no WhatsApp
            </button>

            <div className="bg-[#0B1C2D] rounded-2xl p-8 text-white">
              <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-white/60">Contato Direto</h3>
              <p className="text-sm mb-3 flex items-center gap-2">
                <Mail className="w-4 h-4 text-[var(--coredb-cyan)]" />
                comercial@coredb.com.br
              </p>
              <p className="text-sm flex items-center gap-2">
                <Phone className="w-4 h-4 text-[var(--coredb-cyan)]" />
                (31) 99187-3435
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Input({ label, name, value, onChange, type = "text" }: any) {
  return (
    <div>
      <label className="block text-sm font-semibold text-[var(--coredb-dark)] mb-2">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required
        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[var(--coredb-cyan)] focus:ring-2 focus:ring-[var(--coredb-cyan)]/20 transition"
      />
    </div>
  );
}

function Select({ label, name, value, onChange, options }: any) {
  return (
    <div>
      <label className="block text-sm font-semibold text-[var(--coredb-dark)] mb-2">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        required
        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[var(--coredb-cyan)] focus:ring-2 focus:ring-[var(--coredb-cyan)]/20 transition bg-white"
      >
        <option value="">Selecione uma opção</option>
        {options.map((opt: any) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
}
