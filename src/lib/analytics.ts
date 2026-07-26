'use client'

const ALLOWED_EVENTS = [
  'cta_click',
  'whatsapp_click',
  'form_start',
  'form_submit_success',
  'form_submit_error',
  'phone_click',
  'email_click',
  'faq_open',
  'service_navigation',
  'outbound_click',
] as const

export type AnalyticsEvent = (typeof ALLOWED_EVENTS)[number]

const ALLOWED_PARAM_KEYS = [
  'page_path',
  'service',
  'cta_location',
  'source',
  'medium',
  'campaign',
  'content',
  'device',
] as const

type AllowedParamKey = (typeof ALLOWED_PARAM_KEYS)[number]
type AnalyticsParams = Partial<Record<AllowedParamKey, string>>

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

function getDevice(): string {
  if (typeof window === 'undefined') return 'unknown'
  return window.innerWidth < 768 ? 'mobile' : 'desktop'
}

function getAttributionParams(): AnalyticsParams {
  if (typeof window === 'undefined') return {}

  const query = new URLSearchParams(window.location.search)
  const attribution: AnalyticsParams = {}

  const source = query.get('utm_source')
  const medium = query.get('utm_medium')
  const campaign = query.get('utm_campaign')
  const content = query.get('utm_content')

  if (source) attribution.source = source
  if (medium) attribution.medium = medium
  if (campaign) attribution.campaign = campaign
  if (content) attribution.content = content

  return attribution
}

function sanitize(params: AnalyticsParams): Record<string, string> {
  const clean: Record<string, string> = {}

  for (const key of ALLOWED_PARAM_KEYS) {
    const value = params[key]
    if (typeof value === 'string' && value.length > 0) {
      clean[key] = value
    }
  }

  return clean
}

const SERVICE_BY_PATH: Record<string, string> = {
  '/': 'institutional',
  '/servicos/consultoria-totvs': 'consultoria-totvs',
  '/servicos/protheus': 'protheus',
  '/servicos/rm': 'rm',
  '/servicos/fluig': 'fluig',
  '/servicos/dba': 'dba',
  '/servicos/dba/sql-server': 'dba-sql-server',
  '/servicos/dba/oracle': 'dba-oracle',
  '/servicos/dba/postgresql': 'dba-postgresql',
  '/servicos/dba/mysql': 'dba-mysql',
  '/servicos/desenvolvimento-customizacoes': 'desenvolvimento-customizacoes',
  '/servicos/suporte-ams': 'suporte-ams',
}

/** Deriva o slug de `service` a partir da rota atual, para uso em cta_click/service_navigation. */
export function getServiceFromPath(pathname?: string | null): string {
  if (!pathname) return 'institutional'
  const normalized = pathname !== '/' ? pathname.replace(/\/+$/, '') : pathname
  return SERVICE_BY_PATH[normalized] ?? 'institutional'
}

/**
 * Dispara um evento de analytics somente quando o GA4 já foi montado pelo
 * CookieConsent (isto é, somente após consentimento aceito). Nunca envia
 * nenhum parâmetro fora da lista fixa autorizada em AGENTS.md/CLAUDE.md.
 */
export function trackEvent(name: AnalyticsEvent, params: AnalyticsParams = {}): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') {
    return
  }

  const payload = sanitize({
    device: getDevice(),
    ...getAttributionParams(),
    ...params,
  })

  window.gtag('event', name, payload)
}
