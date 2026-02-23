import { useState } from "react";
import { Mail, Phone, Send, ShieldCheck } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    companySize: "",
    environment: "",
    urgency: "",
    message: "",
  });

  const [leadType, setLeadType] = useState<"standard" | "strategic" | "critical">("standard");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Classificação automática do lead para envio à API
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
      // Chamada real para a API na Vercel
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          leadType // Enviando a classificação junto
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitStatus("success");
        // Limpa o formulário após o sucesso
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          companySize: "",
          environment: "",
          urgency: "",
          message: "",
        });
        // Volta o botão ao estado normal após 5 segundos
        setTimeout(() => setSubmitStatus("idle"), 5000);
      } else {
        throw new Error(result.error || "Falha no envio");
      }
    } catch (error) {
      console.error("Erro ao enviar formulário:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
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
                <Input label="Telefone" name="phone" value={formData.phone} onChange={handleChange} />
                <Input label="Empresa" name="company" value={formData.company} onChange={handleChange} />
              </div>

              <Select
                label="Porte da Empresa"
                name="companySize"
                value={formData.companySize}
                onChange={handleChange}
                options={[
                  { value: "small", label: "Até 100 colaboradores" },
                  { value: "medium", label: "100 a 500 colaboradores" },
                  { value: "large", label: "Acima de 500 colaboradores" },
                ]}
              />

              <Select
                label="Cenário Atual do Ambiente"
                name="environment"
                value={formData.environment}
                onChange={handleChange}
                options={[
                  { value: "instability", label: "Instabilidade ou lentidão recorrente" },
                  { value: "monitoring", label: "Falta de monitoramento estruturado" },
                  { value: "project", label: "Projeto crítico em andamento" },
                  { value: "database", label: "Revisão completa de banco de dados" },
                  { value: "support", label: "Sustentação especializada contínua" },
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
                  { value: "immediate", label: "Situação crítica / ação imediata" },
                ]}
              />

              <div>
                <label className="block text-sm font-semibold text-[var(--coredb-dark)] mb-2">
                  Descreva Brevemente o Cenário
                </label>
                <textarea
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[var(--coredb-cyan)] focus:ring-2 focus:ring-[var(--coredb-cyan)]/20 transition resize-none"
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

              {/* Mensagens de Feedback */}
              {submitStatus === "success" && (
                <div className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl animate-in fade-in">
                  Solicitação recebida com sucesso! Nossa equipe técnica retornará em breve.
                </div>
              )}

              {submitStatus === "error" && (
                <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl animate-in fade-in">
                  Erro ao enviar solicitação. Por favor, tente novamente ou use o contato direto ao lado.
                </div>
              )}
            </form>
          </div>

          {/* SIDE PANEL */}
          <div className="space-y-8">
            <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
              <h3 className="font-semibold text-[var(--coredb-dark)] mb-6 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[var(--coredb-cyan)]" />
                Processo de Avaliação
              </h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li>• Análise preliminar do cenário informado</li>
                <li>• Identificação de riscos técnicos</li>
                <li>• Recomendação estruturada de próximos passos</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-[#0B1C2D] to-[#1DAEFF] rounded-2xl p-8 text-white">
              <h3 className="font-semibold mb-4">Contato Direto</h3>
              <p className="text-sm mb-3 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                comercial@coredb.com.br
              </p>
              <p className="text-sm flex items-center gap-2">
                <Phone className="w-4 h-4" />
                (31) 99187-3435
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* COMPONENTES AUXILIARES */

function Input({ label, name, value, onChange, type = "text" }: any) {
  return (
    <div>
      <label className="block text-sm font-semibold text-[var(--coredb-dark)] mb-2">
        {label}
      </label>
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
      <label className="block text-sm font-semibold text-[var(--coredb-dark)] mb-2">
        {label}
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        required
        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[var(--coredb-cyan)] focus:ring-2 focus:ring-[var(--coredb-cyan)]/20 transition bg-white"
      >
        <option value="">Selecione uma opção</option>
        {options.map((opt: any) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}