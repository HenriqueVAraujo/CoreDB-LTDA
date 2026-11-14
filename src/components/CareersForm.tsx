"use client";

import { useRef, useState, type FormEvent } from "react";

export const CAREERS_AREAS = [
  ["protheus_advpl_tlpp", "Protheus/ADVPL/TLPP"],
  ["totvs_rm", "TOTVS RM"], ["fluig", "Fluig"],
  ["dba_sqlserver", "DBA SQL Server"], ["dba_oracle", "Oracle"],
  ["dba_postgresql", "PostgreSQL"], ["dba_mysql", "MySQL"],
  ["suporte_ams_glpi", "Suporte AMS/GLPI"], ["infraestrutura", "Infraestrutura"],
  ["cloud_sre", "Cloud/SRE"], ["zabbix_grafana", "Zabbix/Grafana"],
  ["desenvolvimento_apis", "Desenvolvimento e APIs"], ["dados_bi", "Dados/BI"],
  ["preventas_comercial", "Pré-vendas/Comercial"],
  ["marketing_conteudo", "Marketing/Conteúdo"], ["outras", "Outras"],
] as const;

const OPTIONS = {
  experiencia: [["estagio", "Estágio"], ["junior", "Júnior"], ["pleno", "Pleno"], ["senior", "Sênior"], ["especialista", "Especialista"]],
  modalidade: [["remoto", "Remoto"], ["hibrido", "Híbrido"], ["presencial", "Presencial"], ["indiferente", "Indiferente"]],
  disponibilidade: [["imediata", "Imediata"], ["ate_30_dias", "Até 30 dias"], ["ate_60_dias", "Até 60 dias"], ["a_combinar", "A combinar"]],
} as const;
const UFS = "AC AL AP AM BA CE DF ES GO MA MT MS MG PA PB PR PE PI RJ RN RS RO RR SC SP SE TO".split(" ");
export type CareersPayload = {
  nome: string; email: string; telefone: string; cidade: string; estado: string;
  areas: string[]; experiencia: string; modalidade: string; disponibilidade: string;
  perfilUrl: string; resumo: string; consentimentoAnalise: boolean;
  consentimentoBanco: boolean; website: string;
};
type Errors = Partial<Record<keyof CareersPayload, string>>;
const CONTROLS = /[\u0000-\u001f\u007f-\u009f]/;

export function validateCareers(data: CareersPayload): Errors {
  const errors: Errors = {};
  const limits = { nome: 120, email: 254, telefone: 32, cidade: 80, estado: 2, perfilUrl: 300, resumo: 1500, website: 0 } as const;
  for (const key of Object.keys(limits) as (keyof typeof limits)[]) {
    if (CONTROLS.test(data[key])) errors[key] = "Não use quebras de linha ou caracteres de controle.";
    else if (data[key].length > limits[key]) errors[key] = `Use no máximo ${limits[key]} caracteres.`;
  }
  for (const key of ["nome", "email", "cidade", "estado", "resumo"] as const) {
    if (!data[key].trim()) errors[key] = "Preencha este campo.";
  }
  if (!errors.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = "Informe um e-mail válido.";
  if (!errors.telefone && !/^[\d+() -]*$/.test(data.telefone)) errors.telefone = "Use apenas dígitos, +, parênteses, hífen e espaço.";
  if (!errors.estado && !UFS.includes(data.estado)) errors.estado = "Selecione uma UF válida.";
  if (data.areas.length < 1 || data.areas.length > 6 || new Set(data.areas).size !== data.areas.length || data.areas.some(area => !CAREERS_AREAS.some(([value]) => value === area))) errors.areas = "Selecione de 1 a 6 áreas de interesse.";
  for (const key of ["experiencia", "modalidade", "disponibilidade"] as const) {
    if (!OPTIONS[key].some(([value]) => value === data[key])) errors[key] = "Selecione uma opção válida.";
  }
  if (data.perfilUrl && !errors.perfilUrl) {
    try {
      const url = new URL(data.perfilUrl);
      if (!["http:", "https:"].includes(url.protocol)) throw new Error();
    } catch { errors.perfilUrl = "Informe um link completo com http:// ou https://."; }
  }
  if (data.consentimentoAnalise !== true) errors.consentimentoAnalise = "Autorize a análise para enviar seu perfil.";
  return errors;
}

type Outcome = { kind: "simulado" | "recebido" | "erro"; message: string; referencia?: string };
export function careersOutcome(status: number, result: Record<string, unknown>): Outcome {
  if (status === 429) return { kind: "erro", message: "Limite de tentativas atingido. Aguarde antes de tentar novamente. O recebimento não foi confirmado." };
  if (status === 503) return { kind: "erro", message: "O canal de candidaturas está indisponível. Tente novamente mais tarde. O recebimento não foi confirmado." };
  if (status === 200 && result.ok === true && result.modo === "simulado") return { kind: "simulado", message: "SIMULADO — nada foi enviado ao RH" };
  if (status === 200 && result.ok === true && result.modo === "real" && result.recebido === true && typeof result.referencia === "string" && /^TC-\d{8}-[A-Z0-9]{6}$/.test(result.referencia)) return { kind: "recebido", message: "Candidatura recebida. Guarde sua referência:", referencia: result.referencia };
  return { kind: "erro", message: "Não foi possível confirmar o recebimento. Confira os campos ou tente novamente mais tarde." };
}

export function careersMailto(data: CareersPayload): string {
  const areaLabels = data.areas.map(area => CAREERS_AREAS.find(([value]) => value === area)?.[1] ?? area);
  const body = [
    `Nome: ${data.nome}`, `E-mail: ${data.email}`, `Telefone: ${data.telefone}`,
    `Cidade/UF: ${data.cidade}/${data.estado}`, `Áreas de interesse: ${areaLabels.join(", ")}`,
    ...(["experiencia", "modalidade", "disponibilidade"] as const).map(key => `${key}: ${OPTIONS[key].find(([value]) => value === data[key])?.[1] ?? data[key]}`),
    `Link profissional: ${data.perfilUrl}`, `Resumo: ${data.resumo}`,
    `Autorizo análise: ${data.consentimentoAnalise ? "Sim" : "Não"}`,
    `Autorizo permanência no banco: ${data.consentimentoBanco ? "Sim" : "Não"}`,
  ].join("\r\n");
  return `mailto:vagas@coredb.com.br?subject=${encodeURIComponent("Banco de Talentos — " + data.nome)}&body=${encodeURIComponent(body)}`;
}

const FIELD = "min-h-12 w-full min-w-0 rounded-lg border border-gray-500 bg-white px-3 py-3 text-base text-[var(--coredb-dark)]";
const LABEL = "mb-2 block text-sm font-semibold text-[var(--coredb-dark)]";

export default function CareersForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const inFlight = useRef(false);
  const [errors, setErrors] = useState<Errors>({});
  const [busy, setBusy] = useState(false);
  const [outcome, setOutcome] = useState<Outcome | null>(null);
  const [submitted, setSubmitted] = useState<CareersPayload | null>(null);
  const [selected, setSelected] = useState<string[]>([]);

  function showErrors(next: Errors) {
    setErrors(next);
    requestAnimationFrame(() => {
      formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]:not(:disabled)')?.focus();
    });
  }
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inFlight.current) return;
    const fd = new FormData(event.currentTarget);
    const text = (key: string) => String(fd.get(key) ?? "");
    const data: CareersPayload = {
      nome: text("nome"), email: text("email"), telefone: text("telefone"),
      cidade: text("cidade"), estado: text("estado"), areas: fd.getAll("areas").map(String),
      experiencia: text("experiencia"), modalidade: text("modalidade"), disponibilidade: text("disponibilidade"),
      perfilUrl: text("perfilUrl"), resumo: text("resumo"), website: text("website"),
      consentimentoAnalise: fd.get("consentimentoAnalise") === "on",
      consentimentoBanco: fd.get("consentimentoBanco") === "on",
    };
    setOutcome(null);
    const next = validateCareers(data);
    if (Object.keys(next).length) { showErrors(next); return; }
    setErrors({});
    inFlight.current = true;
    setBusy(true);
    setSubmitted(data);
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);
    try {
      const response = await fetch("/api/trabalhe-conosco", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data), signal: controller.signal,
      });
      const parsed: unknown = await response.json().catch(() => null);
      const result = parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed as Record<string, unknown> : {};
      if (response.status === 400 && result.ok === false && result.erros && typeof result.erros === "object") {
        const serverErrors: Errors = {};
        for (const key of Object.keys(data) as (keyof CareersPayload)[]) {
          const message = (result.erros as Record<string, unknown>)[key];
          if (typeof message === "string") serverErrors[key] = message;
        }
        showErrors(serverErrors);
      }
      setOutcome(careersOutcome(response.status, result));
    } catch {
      setOutcome({ kind: "erro", message: "Falha de conexão ou tempo de espera excedido. O recebimento não foi confirmado. Tente novamente." });
    } finally {
      clearTimeout(timeout);
      inFlight.current = false;
      setBusy(false);
    }
  }

  function error(key: keyof CareersPayload) {
    return <p id={`careers-${key}-error`} aria-live="polite" className="mt-1 text-sm font-medium text-red-800">{errors[key] ?? ""}</p>;
  }
  function attrs(key: keyof CareersPayload) {
    return { id: `careers-${key}`, name: key, "aria-invalid": !!errors[key], "aria-describedby": `careers-${key}-error` };
  }
  function input(key: "nome" | "email" | "telefone" | "cidade" | "perfilUrl", label: string, max: number, optional = false, type = "text", autoComplete?: string) {
    return <div className="min-w-0"><label htmlFor={`careers-${key}`} className={LABEL}>{label} ({optional ? "opcional" : "obrigatório"})</label><input {...attrs(key)} type={type} maxLength={max} required={!optional} autoComplete={autoComplete} className={FIELD} />{error(key)}</div>;
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate aria-busy={busy} className="min-w-0 space-y-6 rounded-2xl border border-gray-300 bg-[var(--coredb-gray-light)] p-5 md:p-8">
      <p className="text-sm text-gray-700">Preencha os campos obrigatórios. Não há upload de currículo; você pode informar um link profissional.</p>
      <div className="sr-only" aria-hidden="true"><label htmlFor="careers-website">Website</label><input {...attrs("website")} tabIndex={-1} autoComplete="off" />{error("website")}</div>
      <fieldset disabled={busy} className="min-w-0 space-y-6">
        <legend className="sr-only">Dados da candidatura</legend>
        <div className="grid min-w-0 gap-5 md:grid-cols-2">
          {input("nome", "Nome", 120, false, "text", "name")}
          {input("email", "E-mail", 254, false, "email", "email")}
          {input("telefone", "Telefone", 32, true, "tel", "tel")}
          {input("cidade", "Cidade", 80, false, "text", "address-level2")}
          <div><label htmlFor="careers-estado" className={LABEL}>Estado / UF (obrigatório)</label><select {...attrs("estado")} required autoComplete="address-level1" className={FIELD} defaultValue=""><option value="">Selecione</option>{UFS.map(uf => <option key={uf}>{uf}</option>)}</select>{error("estado")}</div>
        </div>
        <fieldset className="min-w-0" aria-describedby="careers-areas-help careers-areas-error">
          <legend className={LABEL}>Áreas de interesse (obrigatório)</legend>
          <p id="careers-areas-help" className="mb-3 text-sm text-gray-700">Estas são áreas de interesse, NÃO são vagas abertas. Selecione de 1 a 6.</p>
          <div className="grid gap-2 md:grid-cols-2">
            {CAREERS_AREAS.map(([value, label]) => (
              <label key={value} htmlFor={`careers-area-${value}`} className="flex min-h-12 cursor-pointer items-center gap-3 rounded-lg border border-gray-500 bg-white px-3 py-2 text-sm text-[var(--coredb-dark)]">
                <input
                  id={`careers-area-${value}`}
                  name="areas"
                  type="checkbox"
                  value={value}
                  checked={selected.includes(value)}
                  disabled={!selected.includes(value) && selected.length >= 6}
                  onChange={event => {
                    const checked = event.target.checked;
                    setSelected(current => checked ? [...current, value] : current.filter(item => item !== value));
                  }}
                  aria-invalid={!!errors.areas}
                  aria-describedby="careers-areas-help careers-areas-error"
                  className="h-5 w-5 shrink-0 accent-[var(--coredb-dark)]"
                />
                {label}
              </label>
            ))}
          </div>
          <p className="mt-2 text-sm text-gray-700" aria-live="polite">{selected.length} de 6 selecionadas. Para trocar uma área, desmarque uma seleção.</p>
          {error("areas")}
        </fieldset>
        <div className="grid gap-5 md:grid-cols-2">
          {([ ["experiencia", "Nível de experiência"], ["modalidade", "Modalidade de interesse"], ["disponibilidade", "Disponibilidade"] ] as const).map(([key, label]) => <div key={key}><label htmlFor={`careers-${key}`} className={LABEL}>{label} (obrigatório)</label><select {...attrs(key)} required className={FIELD} defaultValue=""><option value="">Selecione</option>{OPTIONS[key].map(([value, text]) => <option key={value} value={value}>{text}</option>)}</select>{error(key)}</div>)}
        </div>
        {input("perfilUrl", "LinkedIn ou portfólio", 300, true, "url")}
        <div><label htmlFor="careers-resumo" className={LABEL}>Resumo da experiência (obrigatório)</label><p id="careers-resumo-help" className="mb-2 text-sm text-gray-700">Até 1.500 caracteres, em um único parágrafo, sem quebras de linha. Não inclua dados sensíveis ou informações confidenciais de clientes.</p><textarea {...attrs("resumo")} aria-describedby="careers-resumo-help careers-resumo-error" required maxLength={1500} rows={5} className={`${FIELD} resize-y`} />{error("resumo")}</div>
        <div>
          <label htmlFor="careers-consentimentoAnalise" className="flex min-h-12 cursor-pointer items-start gap-3 py-3 text-sm text-gray-800"><input {...attrs("consentimentoAnalise")} type="checkbox" required className="mt-1 h-5 w-5 shrink-0 accent-[var(--coredb-dark)]" /><span>Autorizo o tratamento dos meus dados para análise desta candidatura (obrigatório).</span></label>
          {error("consentimentoAnalise")}
          <label htmlFor="careers-consentimentoBanco" className="flex min-h-12 cursor-pointer items-start gap-3 py-3 text-sm text-gray-800"><input {...attrs("consentimentoBanco")} type="checkbox" className="mt-1 h-5 w-5 shrink-0 accent-[var(--coredb-dark)]" /><span>Autorizo também a permanência dos meus dados no banco de talentos para futuras oportunidades (opcional).</span></label>
          {error("consentimentoBanco")}
          <p className="text-sm text-gray-700">Consulte como seus dados são tratados na <a href="/politica-de-privacidade" className="inline-flex min-h-11 items-center font-semibold text-[var(--coredb-dark)] underline underline-offset-4">Política de Privacidade</a>. Você pode solicitar atualização ou exclusão pelo e-mail vagas@coredb.com.br.</p>
        </div>
        <button type="submit" className="min-h-12 w-full rounded-lg bg-[var(--coredb-dark)] px-5 py-3 font-semibold text-white hover:bg-[var(--coredb-cyan)] hover:text-[var(--coredb-dark)] disabled:opacity-70">{busy ? "Enviando candidatura…" : "Enviar candidatura"}</button>
      </fieldset>
      <div role="status" aria-live="polite" aria-atomic="true">
        {busy && <p>Enviando candidatura, aguarde.</p>}
        {outcome && <div className={`break-words rounded-lg border-2 p-4 ${outcome.kind === "simulado" ? "border-amber-700 bg-amber-50 text-amber-950" : outcome.kind === "erro" ? "border-red-800 bg-red-50 text-red-900" : "border-[var(--coredb-dark)] bg-white text-[var(--coredb-dark)]"}`}><p className="font-semibold">{outcome.message}</p>{outcome.referencia && <p>{outcome.referencia}</p>}{outcome.kind === "simulado" && submitted && <><p className="mt-2 text-sm">Para enviar ao RH, abra seu aplicativo de e-mail, revise os dados e conclua o envio por lá.</p><a href={careersMailto(submitted)} className="mt-3 inline-flex min-h-12 items-center font-semibold underline underline-offset-4">Enviar por e-mail</a></>}</div>}
      </div>
    </form>
  );
}
