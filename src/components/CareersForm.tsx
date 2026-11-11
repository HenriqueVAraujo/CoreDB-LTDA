'use client'

import Link from 'next/link'
import { useRef, useState } from 'react'
import { Paperclip, Send, X } from 'lucide-react'
import { ROUTES } from '@/routes'
import { CV_ACCEPT_ATTR, CV_MAX_BYTES_LABEL, validateCvFile, validateFileMeta } from '@/lib/careers-upload'

const REQUIRED_ID = 'careers-required-fields'
const CV_HELP_ID = 'careers-cv-help'
const CV_ERROR_ID = 'careers-cv-error'

const AREAS = [
  { value: 'dba', label: 'DBA (SQL Server, Oracle, PostgreSQL, MySQL)' },
  { value: 'protheus', label: 'Protheus / ADVPL' },
  { value: 'rm', label: 'RM' },
  { value: 'fluig', label: 'Fluig' },
  { value: 'desenvolvimento', label: 'Desenvolvimento e integrações' },
  { value: 'infra', label: 'Infraestrutura e monitoramento' },
  { value: 'outra', label: 'Outra área' },
]

const EMPTY = { name: '', email: '', phone: '', area: '', profileUrl: '', message: '', website: '' }
const FIELD_CLASS =
  'w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[var(--coredb-cyan)] focus:ring-2 focus:ring-[var(--coredb-cyan)]/20 transition bg-white text-sm'
const LABEL_CLASS = 'block text-sm font-semibold text-[var(--coredb-dark)] mb-2'

export default function CareersForm() {
  const [form, setForm] = useState(EMPTY)
  const [consent, setConsent] = useState(false)
  const [busy, setBusy] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'dryrun' | 'stored' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [cv, setCv] = useState<File | null>(null)
  const [cvError, setCvError] = useState('')
  const [consentCv, setConsentCv] = useState(false)
  const cvInput = useRef<HTMLInputElement>(null)

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const clearCv = () => {
    setCv(null)
    setConsentCv(false)
    if (cvInput.current) cvInput.current.value = ''
  }

  // Validação do cliente = UX. O servidor repete tudo (nome, MIME, assinatura, tamanho).
  const onCvChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    setCvError('')
    if (!f) return clearCv()
    const meta = validateFileMeta(f)
    if (!meta.ok) {
      clearCv()
      setCvError(meta.message)
      return
    }
    const check = validateCvFile(f, new Uint8Array(await f.arrayBuffer()))
    if (!check.ok) {
      clearCv()
      setCvError(check.message)
      return
    }
    setCv(f)
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!consent || (cv && !consentCv)) {
      setErrorMsg(consent ? 'Para anexar o currículo, marque a autorização específica para guardá-lo.' : '')
      setStatus('error')
      return
    }
    setBusy(true)
    setStatus('idle')
    setErrorMsg('')
    try {
      let init: RequestInit
      if (cv) {
        const fd = new FormData()
        Object.entries(form).forEach(([k, v]) => fd.append(k, v))
        fd.append('consent', 'true')
        fd.append('consentCv', 'true')
        fd.append('cv', cv, cv.name)
        init = { method: 'POST', body: fd } // o navegador define o boundary do multipart
      } else {
        init = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...form, consent: true }),
        }
      }
      const res = await fetch('/api/trabalhe-conosco', init)
      const result = await res.json().catch(() => ({}))
      if (res.ok && result.success) {
        setStatus(result.cvStored ? 'stored' : result.dryRun ? 'dryrun' : 'success')
        setForm(EMPTY)
        setConsent(false)
        clearCv()
      } else {
        setErrorMsg(typeof result.error === 'string' ? result.error : '')
        setStatus('error')
      }
    } catch {
      setErrorMsg('')
      setStatus('error')
    } finally {
      setBusy(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm" aria-busy={busy}>
      <p id={REQUIRED_ID} className="sr-only">Campos identificados como obrigatórios devem ser preenchidos.</p>

      {/* Honeypot anti-automação: deve permanecer vazio para usuários reais. */}
      <div aria-hidden="true" className="sr-only">
        <label htmlFor="careers-website">Website</label>
        <input id="careers-website" type="text" name="website" value={form.website} onChange={onChange} tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="careers-name" className={LABEL_CLASS}>Nome completo<span className="sr-only"> (obrigatório)</span></label>
          <input id="careers-name" name="name" required aria-required="true" aria-describedby={REQUIRED_ID} maxLength={120} autoComplete="name" value={form.name} onChange={onChange} disabled={busy} className={FIELD_CLASS} />
        </div>
        <div>
          <label htmlFor="careers-email" className={LABEL_CLASS}>E-mail<span className="sr-only"> (obrigatório)</span></label>
          <input id="careers-email" name="email" type="email" required aria-required="true" aria-describedby={REQUIRED_ID} maxLength={254} autoComplete="email" value={form.email} onChange={onChange} disabled={busy} className={FIELD_CLASS} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="careers-phone" className={LABEL_CLASS}>Telefone / WhatsApp <span className="font-normal text-gray-400">(opcional)</span></label>
          <input id="careers-phone" name="phone" type="tel" maxLength={32} autoComplete="tel" value={form.phone} onChange={onChange} disabled={busy} className={FIELD_CLASS} />
        </div>
        <div>
          <label htmlFor="careers-area" className={LABEL_CLASS}>Área de interesse<span className="sr-only"> (obrigatório)</span></label>
          <select id="careers-area" name="area" required aria-required="true" aria-describedby={REQUIRED_ID} value={form.area} onChange={onChange} disabled={busy} className={FIELD_CLASS}>
            <option value="">Selecione uma opção</option>
            {AREAS.map((a) => (
              <option key={a.value} value={a.value}>{a.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="careers-profile" className={LABEL_CLASS}>LinkedIn ou portfólio <span className="font-normal text-gray-400">(opcional)</span></label>
        <input id="careers-profile" name="profileUrl" type="url" maxLength={300} placeholder="https://" value={form.profileUrl} onChange={onChange} disabled={busy} className={FIELD_CLASS} />
      </div>

      <div>
        <label htmlFor="careers-message" className={LABEL_CLASS}>Conte um pouco sobre sua experiência <span className="font-normal text-gray-400">(opcional)</span></label>
        <textarea id="careers-message" name="message" rows={5} maxLength={4000} value={form.message} onChange={onChange} disabled={busy} className={`${FIELD_CLASS} resize-none`} />
      </div>

      <div>
        <label htmlFor="careers-cv" className={LABEL_CLASS}>
          Currículo <span className="font-normal text-gray-400">(opcional — PDF, DOC ou DOCX, até {CV_MAX_BYTES_LABEL})</span>
        </label>
        <input
          ref={cvInput}
          id="careers-cv"
          name="cv"
          type="file"
          accept={CV_ACCEPT_ATTR}
          onChange={onCvChange}
          disabled={busy}
          aria-invalid={cvError ? true : undefined}
          aria-describedby={cvError ? `${CV_HELP_ID} ${CV_ERROR_ID}` : CV_HELP_ID}
          className={`${FIELD_CLASS} file:mr-4 file:rounded-lg file:border-0 file:bg-[var(--coredb-dark)] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white`}
        />
        <p id={CV_HELP_ID} className="mt-2 text-xs text-gray-500">
          O arquivo é verificado antes do envio. Não inclua documentos de terceiros nem dados sensíveis desnecessários.
        </p>
        {cv && (
          <p className="mt-2 flex items-center gap-2 text-sm text-gray-700">
            <Paperclip className="h-4 w-4" aria-hidden="true" />
            <span>{cv.name} ({Math.max(1, Math.round(cv.size / 1024))} KB)</span>
            <button type="button" onClick={clearCv} disabled={busy} className="inline-flex items-center gap-1 rounded text-[var(--coredb-dark)] underline underline-offset-2">
              <X className="h-3 w-3" aria-hidden="true" />Remover<span className="sr-only"> currículo</span>
            </button>
          </p>
        )}
        <div id={CV_ERROR_ID} role="alert" className={cvError ? 'mt-2 text-sm text-red-700' : 'sr-only'}>{cvError}</div>
      </div>

      {cv && (
        <div className="flex items-start gap-3">
          <input
            id="careers-consent-cv"
            type="checkbox"
            required
            aria-required="true"
            checked={consentCv}
            onChange={(e) => setConsentCv(e.target.checked)}
            disabled={busy}
            className="mt-1 h-4 w-4 shrink-0 accent-[var(--coredb-dark)]"
          />
          <label htmlFor="careers-consent-cv" className="text-sm leading-relaxed text-gray-600">
            Autorizo a CoreDB a armazenar o currículo anexado, que pode conter dados pessoais, apenas para avaliar minha
            candidatura, pelo tempo necessário ao processo seletivo, conforme a{' '}
            <Link href={ROUTES.PRIVACY} className="font-medium text-[var(--coredb-dark)] underline underline-offset-2">
              Política de Privacidade
            </Link>
            . Posso pedir a exclusão a qualquer momento.<span className="sr-only"> (obrigatório para enviar o currículo)</span>
          </label>
        </div>
      )}

      <div className="flex items-start gap-3">
        <input
          id="careers-consent"
          type="checkbox"
          required
          aria-required="true"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          disabled={busy}
          className="mt-1 h-4 w-4 shrink-0 accent-[var(--coredb-dark)]"
        />
        <label htmlFor="careers-consent" className="text-sm leading-relaxed text-gray-600">
          Li e concordo com o tratamento dos meus dados pessoais pela CoreDB para fins de recrutamento e seleção,
          conforme a{' '}
          <Link href={ROUTES.PRIVACY} className="font-medium text-[var(--coredb-dark)] underline underline-offset-2">
            Política de Privacidade
          </Link>{' '}
          (LGPD).<span className="sr-only"> (obrigatório)</span>
        </label>
      </div>

      <button
        type="submit"
        disabled={busy || !consent || (cv !== null && !consentCv)}
        className="flex w-full items-center justify-center gap-3 rounded-xl bg-[var(--coredb-dark)] py-4 font-semibold text-white transition-all hover:bg-[var(--coredb-cyan)] hover:text-[var(--coredb-dark)] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {busy ? 'Enviando...' : 'Enviar candidatura'}
        <Send className="h-5 w-5" aria-hidden="true" />
      </button>

      <p role="status" aria-live="polite" className="sr-only">{busy ? 'Enviando candidatura, aguarde.' : ''}</p>

      {status === 'stored' && (
        <div role="status" aria-live="polite" className="rounded-xl border border-green-200 bg-green-50 p-4 text-green-700">
          Candidatura e currículo recebidos (ambiente de teste). Obrigado pelo interesse na CoreDB.
        </div>
      )}
      {status === 'success' && (
        <div role="status" aria-live="polite" className="rounded-xl border border-green-200 bg-green-50 p-4 text-green-700">
          Candidatura recebida! Obrigado pelo interesse na CoreDB.
        </div>
      )}
      {status === 'dryrun' && (
        <div role="status" aria-live="polite" className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-amber-800">
          Modo de teste: o formulário e o arquivo foram validados, mas nada foi enviado nem armazenado.
        </div>
      )}
      {status === 'error' && (
        <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
          {errorMsg || 'Não foi possível enviar. Confirme os campos e o consentimento ou tente novamente em instantes.'}
        </div>
      )}
    </form>
  )
}
