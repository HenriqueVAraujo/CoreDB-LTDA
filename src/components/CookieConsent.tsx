'use client'

import { useState, useEffect } from 'react'
import Script from 'next/script'
import Link from 'next/link'

const COOKIE_NAME = 'coredb_consent'
const GA_ID = 'G-YZSTRQKCQG'

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
  return match ? match[2] : null
}

function setCookie(name: string, value: string, days: number) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString()
  document.cookie = `${name}=${value}; expires=${expires}; path=/; SameSite=Lax`
}

export default function CookieConsent() {
  const [show, setShow] = useState(false)
  const [accepted, setAccepted] = useState(false)

  useEffect(() => {
    const consent = getCookie(COOKIE_NAME)
    if (!consent) {
      setShow(true)
    } else if (consent === 'accepted') {
      setAccepted(true)
    }
  }, [])

  const handleAccept = () => {
    setCookie(COOKIE_NAME, 'accepted', 365)
    setAccepted(true)
    setShow(false)
  }

  const handleReject = () => {
    setCookie(COOKIE_NAME, 'rejected', 365)
    setShow(false)
  }

  return (
    <>
      {accepted && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
          </Script>
        </>
      )}

      {show && (
        <div className="fixed bottom-0 left-0 right-0 z-[60] bg-[#0B1C2D] border-t border-white/10 shadow-2xl">
          <div className="container mx-auto max-w-6xl px-4 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white mb-1">
                Privacidade e Cookies
              </p>
              <p className="text-xs text-white/60 leading-relaxed">
                Utilizamos cookies analíticos (Google Analytics) para entender o uso do site, em conformidade com a{' '}
                <strong className="text-white/80">LGPD (Lei nº 13.709/2018)</strong>.
                Seus dados não são vendidos ou compartilhados com terceiros.{' '}
                <Link href="/politica-de-privacidade" className="text-[#1DAEFF] hover:underline">
                  Política de Privacidade
                </Link>
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={handleReject}
                className="px-5 py-2.5 text-sm font-medium text-white/60 border border-white/20 rounded-lg hover:border-white/40 hover:text-white transition-colors"
              >
                Recusar
              </button>
              <button
                onClick={handleAccept}
                className="px-5 py-2.5 text-sm font-bold bg-[#1DAEFF] text-[#0B1C2D] rounded-lg hover:opacity-90 transition-opacity"
              >
                Aceitar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
