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

const CONSENT_COOKIE_NAME = 'coredb_consent'
const CONSENT_UPDATED_EVENT = 'coredb:consent-updated'
const MAX_QUEUE_SIZE = 50
const FLUSH_RETRY_DELAYS_MS = [250, 500, 1000, 2000, 4000]

type QueuedEvent = { name: AnalyticsEvent; payload: Record<string, string> }

let eventQueue: QueuedEvent[] = []
let flushRetryTimer: ReturnType<typeof setTimeout> | null = null
let flushRetryAttempt = 0
let consentListenerAttached = false

function hasAcceptedConsent(): boolean {
  if (typeof document === 'undefined') return false
  const match = document.cookie.match(new RegExp('(^| )' + CONSENT_COOKIE_NAME + '=([^;]+)'))
  return match ? match[2] === 'accepted' : false
}

function isGtagReady(): boolean {
  return typeof window !== 'undefined' && typeof window.gtag === 'function'
}

function stopFlushRetries(): void {
  if (flushRetryTimer) {
    clearTimeout(flushRetryTimer)
    flushRetryTimer = null
  }
  flushRetryAttempt = 0
}

/** Envia e esvazia a fila atomicamente para nunca reenviar o mesmo evento em duas chamadas concorrentes. */
function flushQueue(): void {
  if (!hasAcceptedConsent() || !isGtagReady()) return

  const pending = eventQueue
  eventQueue = []
  for (const event of pending) {
    window.gtag!('event', event.name, event.payload)
  }
}

/** Tenta o flush em janelas curtas e limitadas; nunca faz polling indefinido. */
function scheduleFlushRetry(): void {
  if (flushRetryTimer) return

  const delay = FLUSH_RETRY_DELAYS_MS[flushRetryAttempt]
  if (delay === undefined) return

  flushRetryTimer = setTimeout(() => {
    flushRetryTimer = null
    flushRetryAttempt += 1

    if (!hasAcceptedConsent()) {
      eventQueue = []
      stopFlushRetries()
      return
    }

    if (isGtagReady()) {
      flushQueue()
      stopFlushRetries()
      return
    }

    if (eventQueue.length > 0) {
      scheduleFlushRetry()
    }
  }, delay)
}

/** Anexado somente após o primeiro evento pós-aceite; nunca antes do consentimento. */
function ensureConsentListener(): void {
  if (consentListenerAttached || typeof window === 'undefined') return
  consentListenerAttached = true

  window.addEventListener(CONSENT_UPDATED_EVENT, () => {
    if (!hasAcceptedConsent()) {
      eventQueue = []
      stopFlushRetries()
      return
    }

    flushQueue()
    if (eventQueue.length > 0) {
      scheduleFlushRetry()
    }
  })
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
 * Dispara um evento de analytics somente após consentimento aceito (lido
 * diretamente do cookie do CookieConsent). Nunca envia nenhum parâmetro fora
 * da lista fixa autorizada em AGENTS.md/CLAUDE.md.
 *
 * Se o GA4 ainda não tiver terminado de carregar (janela curta logo após o
 * aceite), o evento já sanitizado é enfileirado em memória e reenviado assim
 * que window.gtag estiver disponível, sem bloquear a ação do usuário. Nada é
 * armazenado antes do consentimento nem após a rejeição.
 */
export function trackEvent(name: AnalyticsEvent, params: AnalyticsParams = {}): void {
  if (typeof window === 'undefined') return
  if (!hasAcceptedConsent()) return

  ensureConsentListener()

  const payload = sanitize({
    device: getDevice(),
    ...getAttributionParams(),
    ...params,
  })

  if (isGtagReady()) {
    flushQueue()
    window.gtag!('event', name, payload)
    return
  }

  if (eventQueue.length < MAX_QUEUE_SIZE) {
    eventQueue.push({ name, payload })
  }
  scheduleFlushRetry()
}
