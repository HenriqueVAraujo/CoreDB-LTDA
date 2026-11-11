'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Send } from 'lucide-react'
import { ROUTES } from '@/routes'

const REQUIRED_ID = 'careers-required-fields'

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
  const [status, setStatus] = useState<'idle' | 'success' | 'dryrun' | 'error'>('idle')

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!consent) {
      setStatus('error')
      return
    }
    setBusy(true)
    setStatus('idle')
    try {
      const res = await fetch('/api/trabalhe-conosco', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, consent: true }),
      })
      const result = await res.json()
      if (res.ok && result.success) {
        setStatus(result.dryRun ? 'dryrun' : 'success')
        setForm(EMPTY)
        setConsent(false)
      } else {
        throw new Error(result.error || 'Falha no envio')
      }
    } catch {
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
        disabled={busy || !consent}
        className="flex w-full items-center justify-center gap-3 rounded-xl bg-[var(--coredb-dark)] py-4 font-semibold text-white transition-all hover:bg-[var(--coredb-cyan)] hover:text-[var(--coredb-dark)] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {busy ? 'Enviando...' : 'Enviar candidatura'}
        <Send className="h-5 w-5" aria-hidden="true" />
      </button>

      {status === 'success' && (
        <div role="status" aria-live="polite" className="rounded-xl border border-green-200 bg-green-50 p-4 text-green-700">
          Candidatura recebida! Obrigado pelo interesse na CoreDB.
        </div>
      )}
      {status === 'dryrun' && (
        <div role="status" aria-live="polite" className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-amber-800">
          Modo de teste: o formulário foi validado, mas nada foi enviado nem armazenado.
        </div>
      )}
      {status === 'error' && (
        <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
          Não foi possível enviar. Confirme os campos e o consentimento ou tente novamente em instantes.
        </div>
      )}
    </form>
  )
}
