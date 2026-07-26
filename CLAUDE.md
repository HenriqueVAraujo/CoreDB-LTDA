# CoreDB — Instruções vigentes do projeto

## Governança

- `origin/main` é a fonte de verdade do estado atual da produção.
- O Codex não faz checkout, merge, rebase, push ou force push na `main` e não promove produção.
- Promoções são realizadas por mantenedor humano via Pull Request e deployment automático da integração Git.
- O Codex não usa Vercel CLI nem altera domínio, aliases, variáveis ou configurações da Vercel.
- HubSpot e Fase E permanecem fora do escopo.

## Branches autorizadas

- `sprint/go-live-2026-07-24`: documentação e manutenção controlada do site-base.
- `feature/seo-technical-pages-2026-07`: expansão técnica e SEO autorizada, criada a partir de `origin/main` atualizado.

Commits e pushes só podem ocorrer na branch explicitamente autorizada para a tarefa. A feature pode gerar Preview automático, mas não pode ser promovida pelo Codex.

## Stack

- **Framework**: Next.js 15 App Router;
- **React**: 19;
- **Linguagem**: TypeScript;
- **Estilo**: Tailwind CSS v4 via `@tailwindcss/postcss`;
- **Componentes UI**: Radix UI e shadcn/ui em `src/components/ui/`;
- **Animação**: Framer Motion;
- **Tipografia**: Manrope para títulos e comunicação institucional; Inter para textos, interfaces e conteúdo;
- **Deploy**: Vercel por integração Git.

Source Sans e Roboto não fazem parte da tipografia vigente.

## Estrutura principal

```text
src/
  app/          # App Router, metadata, sitemap, robots e API
  components/   # componentes compartilhados
  views/        # views das páginas
  contexts/
  hooks/
  lib/
```

## Identidade visual

- Marca CoreDB e ativos oficiais v1.0.1;
- Navy: `#0B1C2D` / `var(--coredb-dark)`;
- Cyan: `#1DAEFF` / `var(--coredb-cyan)`;
- White;
- sem submarca, visual gamer ou cyberpunk;
- preservar logo, Header, Footer, botões, cards e linguagem institucional.

## Portfólio vigente

### TOTVS

- Protheus;
- RM;
- Fluig.

Datasul não faz parte do portfólio vigente.

### DBA multiplataforma

- SQL Server;
- Oracle;
- PostgreSQL;
- MySQL.

### Outras frentes

- ADVPL e TLPP;
- APIs e integrações;
- AMS;
- governança operacional.

## Posicionamento e CTAs

- A homepage apresenta institucionalmente toda a CoreDB.
- As páginas de serviço possuem identidade editorial própria.
- A homepage e os componentes institucionais usam CTA genérico da CoreDB.
- Consultoria TOTVS usa CTA geral do ambiente TOTVS.
- DBA, Desenvolvimento e AMS usam CTAs contextuais.
- Somente `/servicos/rm` pode usar oferta, CTA ou mensagem comercial específicos de “risco do RM”.
- RM continua normalmente no portfólio “Protheus, RM e Fluig”.

## Expansão técnica e SEO autorizada

Exclusivamente em `feature/seo-technical-pages-2026-07`:

- `/servicos/protheus`;
- `/servicos/rm`;
- `/servicos/fluig`;
- `/servicos/dba/sql-server`;
- `/servicos/dba/oracle`;
- `/servicos/dba/postgresql`;
- `/servicos/dba/mysql`.

Também são permitidas alterações aditivas em:

- `/servicos/consultoria-totvs`;
- `/servicos/dba`;
- `src/routes.ts`;
- `src/app/sitemap.ts`;
- componentes compartilhados estritamente necessários.

Esse escopo permite metadata, canonical, Open Graph, Twitter metadata, JSON-LD `Service`, `BreadcrumbList`, links internos, sitemap e CTAs contextuais. Não autoriza mudança da homepage, menu principal, formulário, API, cookies ou identidade visual.

## SEO — regras operacionais

- Cada rota deve possuir `title`, `description` e canonical próprios.
- O conteúdo de metadata e dados estruturados deve corresponder ao conteúdo visível.
- Cada página deve ter exatamente um H1 e hierarquia de headings coerente.
- Páginas de serviço usam JSON-LD `Service`; `BreadcrumbList` pode ser usado quando coerente.
- Não duplicar `Organization` nas páginas.
- Atualizar `src/app/sitemap.ts` ao criar as rotas autorizadas.
- Preview deve preservar noindex e sitemap vazio conforme a regra ambiental vigente.
- Nenhuma URL `vercel.app` pode ser versionada.

## Conteúdo protegido

Pode-se explicar sintomas, causas gerais, riscos, impactos, entregáveis possíveis, limites de escopo, boas práticas públicas e critérios para contratação.

Não publicar:

- scripts, queries ou comandos operacionais completos;
- credenciais, segredos, dados ou topologias de clientes;
- método proprietário ou artefatos internos;
- métricas não comprovadas ou claims absolutos;
- preços, descontos ou placeholders inventados;
- cases sem autorização, incluindo G+D;
- a métrica de -67%;
- garantias de risco zero ou resultado garantido.

## Convenções

- Componentes com hooks ou APIs do navegador usam `'use client'` na primeira linha.
- Links internos usam `next/link`.
- Imagens usam `next/image` com dimensões explícitas quando possível.
- Cores usam as variáveis institucionais existentes.
- O roteamento é feito pelo Next.js App Router.
- Não instalar dependências sem autorização expressa.

## Validação e promoção

1. Implementar e validar na branch autorizada.
2. Executar check, build, diff check e smoke proporcionais ao escopo.
3. Permitir que a integração Git gere o Preview.
4. Submeter o Preview a QA humano.
5. O mantenedor humano cria/revisa a Pull Request e executa o merge.
6. A Vercel realiza o deployment automático.
7. O mantenedor é responsável pelo rollback.
