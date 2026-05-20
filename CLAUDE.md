# CoreDB — Instruções do Projeto

## Stack
- **Framework**: Next.js 15 App Router (migrado de Vite + React em maio/2025)
- **React**: 19
- **Linguagem**: TypeScript
- **Estilo**: Tailwind CSS v4 via `@tailwindcss/postcss`
- **Componentes UI**: Radix UI + shadcn/ui (em `src/components/ui/`)
- **Animação**: Framer Motion
- **Fontes**: `next/font/google` — Source Sans 3 (headings) e Roboto (body)
- **Deploy**: Vercel

## Estrutura de pastas
```
src/
  app/                  ← Next.js App Router (rotas, metadata, API)
    layout.tsx          ← Root layout: fontes, metadata global, Schema LocalBusiness
    page.tsx            ← Home (/)
    sitemap.ts          ← /sitemap.xml (gerado automaticamente)
    robots.ts           ← /robots.txt (gerado automaticamente)
    not-found.tsx       ← Página 404
    servicos/
      consultoria-totvs/page.tsx
      dba/page.tsx
      suporte-ams/page.tsx
      desenvolvimento-customizacoes/page.tsx
    politica-de-privacidade/page.tsx
    termos-de-uso/page.tsx
    api/contact/route.ts ← API de contato: Zoho SMTP via nodemailer
  components/           ← Componentes compartilhados ('use client' onde necessário)
  views/                ← Views de página (importadas pelos arquivos app/*/page.tsx)
    Home.tsx
    servicos/
    politica-de-privacidade.tsx
    termos-de-uso.tsx
  contexts/             ← ThemeContext
  hooks/                ← useMobile, useComposition
  lib/                  ← utils (cn)
```

## Identidade visual
- **Azul escuro (dark)**: `#0B1C2D` → `var(--coredb-dark)`
- **Cyan (accent)**: `#1DAEFF` → `var(--coredb-cyan)`
- CSS variables definidas em `src/app/globals.css`

## Negócio
- **Empresa**: CoreDB LTDA
- **Segmento**: Consultoria TOTVS e Administração de Banco de Dados
- **Localização**: Belo Horizonte, MG — atendimento nacional e internacional
- **Contato**: comercial@coredb.com.br | (31) 99187-3435
- **WhatsApp**: `https://wa.me/553191873435`

## Serviços
1. Consultoria TOTVS (Protheus, RM, Fluig) → `/servicos/consultoria-totvs`
2. DBA SQL Server e Oracle → `/servicos/dba`
3. Suporte AMS com SLA → `/servicos/suporte-ams`
4. Desenvolvimento e Customizações (ADVPL, TLPP) → `/servicos/desenvolvimento-customizacoes`

## SEO — Regras obrigatórias
- Todo `app/*/page.tsx` deve exportar `metadata` com `title`, `description` e `canonical`
- Keywords sempre incluem o serviço + "TOTVS" + referência ao Brasil
- H1 de cada página deve conter o nome do serviço e tecnologias envolvidas
- Schema.org: `ProfessionalService` no layout raiz + `Service` em cada página de serviço
- Sitemap: atualizar `src/app/sitemap.ts` ao criar novas rotas
- `robots.ts` bloqueia apenas `/api/`

## Variáveis de ambiente (Vercel)
- `SMTP_USER` — usuário Zoho SMTP
- `SMTP_PASS` — senha Zoho SMTP
- `RECEIVER_EMAIL` — e-mail que recebe os leads

## Comandos
```bash
pnpm dev      # desenvolvimento local (porta 3000)
pnpm build    # build de produção
pnpm check    # TypeScript sem emitir
pnpm format   # Prettier
```

## Convenções
- Componentes que usam hooks ou browser APIs devem ter `'use client'` na primeira linha
- Imagens em `public/images/` — usar `next/image` com `width` e `height` sempre que possível
- Links internos: usar `next/link` (não `<a>`)
- Variáveis de cor: usar `var(--coredb-cyan)` e `var(--coredb-dark)` em vez de hex literal
- Não usar wouter — roteamento é feito pelo Next.js App Router
