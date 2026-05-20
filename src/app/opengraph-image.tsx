import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'CoreDB — Consultoria TOTVS e DBA'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0B1C2D',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '80px',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            color: '#1DAEFF',
            fontSize: 18,
            fontWeight: 600,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            marginBottom: 32,
          }}
        >
          Consultoria TOTVS · DBA · Missão Crítica
        </div>
        <div
          style={{
            color: '#FFFFFF',
            fontSize: 64,
            fontWeight: 800,
            lineHeight: 1.1,
            marginBottom: 32,
            maxWidth: 900,
          }}
        >
          CoreDB
        </div>
        <div
          style={{
            color: 'rgba(255,255,255,0.65)',
            fontSize: 28,
            lineHeight: 1.5,
            maxWidth: 800,
            marginBottom: 48,
          }}
        >
          Sustentação estratégica para ambientes TOTVS com SLA contratual e governança via Zabbix, Grafana e GLPI.
        </div>
        <div
          style={{
            display: 'flex',
            gap: 24,
          }}
        >
          {['Protheus', 'RM', 'Fluig', 'SQL Server', 'Oracle'].map((tag) => (
            <div
              key={tag}
              style={{
                background: 'rgba(29,174,255,0.15)',
                border: '1px solid rgba(29,174,255,0.4)',
                color: '#1DAEFF',
                fontSize: 16,
                fontWeight: 600,
                padding: '8px 20px',
                borderRadius: 8,
              }}
            >
              {tag}
            </div>
          ))}
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: 48,
            right: 80,
            color: 'rgba(255,255,255,0.3)',
            fontSize: 18,
            fontWeight: 500,
          }}
        >
          www.coredb.com.br
        </div>
      </div>
    ),
    { ...size }
  )
}
