# CoreDB — Governança operacional pós-RC9

## Fonte de verdade e estado atual

- O site-base RC9 foi homologado e promovido para produção por Pull Request e merge humano.
- `origin/main` é a fonte de verdade para o estado atual da produção e deve ser consultada dinamicamente com `git fetch origin` e `git rev-parse origin/main`.
- Hashes históricos não devem ser tratados como estado vigente.
- Referência operacional em 26/07/2026: `origin/main` em `a64848a96649f0f35e6854f7d06cfc4f9823a5bd`.
- A `main` continua protegida contra ações diretas do Codex.

## Proteção da main e da produção

O Codex não pode:

- fazer checkout da `main`;
- fazer merge, rebase, squash ou push na `main`;
- usar force push em qualquer branch;
- promover ou publicar produção;
- usar Vercel CLI;
- alterar domínio, DNS, aliases, variáveis ou configurações da Vercel;
- contornar checks ou proteções de branch.

Toda promoção deve ser feita por mantenedor humano por meio de Pull Request. A integração Git pode gerar Preview das branches autorizadas, mas o Codex não pode promover esse Preview.

## Branches encerradas e históricas (pós-go-live)

As branches abaixo foram formalmente encerradas:

- `sprint/go-live-2026-07-24`;
- `feature/seo-technical-pages-2026-07`;
- `feature/analytics-conversion-2026-07`;
- `fix/analytics-production-only-2026-07`.

- Todo o conteúdo dessas branches está integrado em `origin/main`.
- As Pull Requests e os commits correspondentes permanecem como histórico do repositório; não devem ser reabertos, revertidos ou reescritos.
- Nenhuma dessas branches é mais uma branch de trabalho autorizada: não fazer commit, push, checkout de trabalho ativo nem solicitar novo Preview a partir delas.
- Toda nova frente deve nascer atualizada a partir de `origin/main` (via `git fetch origin` e criação a partir de `origin/main`), nunca a partir de uma branch encerrada.
- A próxima frente prevista é `feature/security-hardening-2026-08`, ainda a ser criada a partir de `origin/main` atualizado quando autorizada.
- Nenhuma alteração direta na `main` é permitida, inclusive para fins de encerramento ou limpeza dessas branches.
- A Fase E permanece bloqueada.

As seções "Escopo técnico e SEO", "Escopo de analytics" e as regras específicas de cada branch encerrada, abaixo, são mantidas apenas como registro histórico do que foi implementado e já integrado em `origin/main`.

## Branches autorizadas

### Hardening de segurança

Branch: `feature/security-hardening-2026-08`.

A branch deve ser criada a partir de `origin/main` atualizado. Nela, o Codex pode:

- executar `git fetch` e ler `origin/main`;
- criar a branch a partir de `origin/main`;
- implementar rate limiting no endpoint `/api/contact`;
- implementar Content-Security-Policy exclusivamente em modo `Report-Only` nesta primeira etapa;
- fazer commits e push exclusivamente nesta branch;
- permitir que a integração Git gere o Preview da branch.

Isso não autoriza merge ou push na `main`, produção, ativação de CSP em modo bloqueante sem período de observação documentado, nem qualquer teste de carga, rajada ou ataque contra qualquer ambiente.

## Escopo técnico e SEO (histórico — `feature/seo-technical-pages-2026-07`, branch encerrada)

Registro histórico do escopo executado nessa branch, já integrado em `origin/main`. Estas rotas foram autorizadas e implementadas:

- `/servicos/protheus`;
- `/servicos/rm`;
- `/servicos/fluig`;
- `/servicos/dba/sql-server`;
- `/servicos/dba/oracle`;
- `/servicos/dba/postgresql`;
- `/servicos/dba/mysql`.

São permitidos nesse escopo:

- metadata, canonical, Open Graph e Twitter metadata;
- JSON-LD `Service` e `BreadcrumbList`;
- links internos, CTAs contextuais e sitemap;
- componentes compartilhados estritamente necessários;
- alterações aditivas nos hubs `/servicos/consultoria-totvs` e `/servicos/dba`;
- alterações aditivas em `src/routes.ts` e `src/app/sitemap.ts`.

Continuam fora do escopo:

- case G+D e qualquer case sem autorização;
- páginas de cidades, conteúdo em massa ou páginas duplicadas;
- homepage, menu principal ou redesign;
- formulário, API ou cookies;
- automação comercial, HubSpot e Fase E.

## Escopo de analytics (histórico — `feature/analytics-conversion-2026-07` e `fix/analytics-production-only-2026-07`, branches encerradas)

Registro histórico do escopo executado nessas branches, já integrado em `origin/main` (a segunda restringiu a coleta de analytics ao ambiente de produção). Eventos implementados (nomes fixos; qualquer alteração exige nova frente autorizada a partir de `origin/main`):

- `cta_click`;
- `whatsapp_click`;
- `form_start`;
- `form_submit_success`;
- `form_submit_error`;
- `phone_click`;
- `email_click`;
- `faq_open`;
- `service_navigation`;
- `outbound_click`.

Parâmetros permitidos: `page_path`, `service`, `cta_location`, `source`, `medium`, `campaign`, `content`, `device`.

Proibido em qualquer evento: nome, e-mail, telefone, empresa, mensagem, conteúdo do formulário ou qualquer identificador pessoal.

Regras:

- nenhum evento pode disparar antes do consentimento, quando o consentimento for exigido;
- nenhuma dependência nova sem justificativa e aprovação expressa;
- nenhuma alteração na API `/api/contact` ou no SMTP nesta frente;
- nenhuma mudança de texto comercial, CTA existente ou identidade visual nesta primeira implementação.

## Escopo de hardening de segurança autorizado

Exclusivamente em `feature/security-hardening-2026-08`.

- Rate limiting do endpoint de contato: não bloquear uso legítimo, não armazenar dado pessoal, retornar `429` de forma controlada, documentar limites e o comportamento em ambiente serverless, preservar honeypot e validações já existentes.
- CSP: iniciar obrigatoriamente em `Content-Security-Policy-Report-Only`, mapear os recursos atuais (GA4, Vercel, fontes, assets) antes de qualquer restrição, não ativar modo bloqueante sem período de observação, documentar rollback.
- Testes autorizados somente por GET/HEAD; uma requisição por cenário quando houver autorização específica; nunca rajada, teste de carga ou ataque.
- Preservar integralmente o formulário e o SMTP existentes.

## Conversão (somente especificação)

As seguintes melhorias permanecem como especificação técnica nesta rodada, sem autorização de implementação automática: CTA intermediário, bloco "o que acontece depois da triagem", CTA fixo mobile, formulário específico por serviço, e qualquer alteração visual ou redesign. Implementação exige baseline de uso real ou aprovação explícita adicional de Henrique, em uma autorização de governança futura e separada desta.

## Marca, portfólio e tipografia vigentes

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

### Tipografia

- Manrope para títulos e comunicação institucional;
- Inter para textos, interfaces e conteúdo.

Source Sans e Roboto não fazem parte da tipografia vigente.

### Identidade

- marca CoreDB e ativos oficiais v1.0.1;
- Navy, Cyan e White;
- sem submarca, visual gamer ou cyberpunk;
- não alterar logo, símbolo, cores, tipografia, posicionamento ou assinatura sem autorização expressa.

## Posicionamento, CTAs e RM

- A homepage e os componentes institucionais usam CTA genérico da CoreDB.
- Consultoria TOTVS usa CTA geral de ambiente TOTVS.
- DBA, Desenvolvimento e AMS usam CTAs contextuais.
- “risco do RM” não pode ser direcionamento global.
- Somente `/servicos/rm` pode usar CTA ou mensagem comercial específicos de risco do RM.
- RM permanece normalmente no portfólio “Protheus, RM e Fluig”.

## Conteúdo técnico e confidencialidade

É permitido publicar, com linguagem tecnicamente sustentada:

- sintomas, problemas e causas gerais;
- riscos e impactos operacionais;
- entregáveis possíveis e limites de escopo;
- boas práticas públicas;
- critérios para contratação.

É proibido publicar:

- scripts, queries ou comandos operacionais completos;
- credenciais, segredos ou dados de clientes;
- método proprietário ou artefatos internos;
- métricas não comprovadas ou claims absolutos;
- cases sem autorização, inclusive G+D;
- preço ou desconto inventado;
- placeholders visíveis;
- a métrica de -67%;
- garantias de risco zero, resultado ou continuidade absoluta.

Monitoramento técnico 24/7 só pode ser descrito como monitoramento por ferramentas, sem sugerir plantão humano não contratado.

## Forma obrigatória de trabalho

1. Auditar e apresentar o preflight antes de editar.
2. Parar quando documento, código ou ativo oficial divergirem.
3. Fazer alterações pequenas, rastreáveis e apenas no escopo autorizado.
4. Não instalar dependências sem autorização expressa.
5. Executar as validações proporcionais ao risco, incluindo check e build quando houver código.
6. Não criar commit ou fazer push sem autorização expressa.
7. Preservar formulário, API, cookies e ativos oficiais quando estiverem fora do escopo.
8. Não executar ações no HubSpot ou na Fase E.

## Processo de promoção

1. O Codex implementa e valida na feature autorizada.
2. A integração Git gera o Preview.
3. O QA humano homologa o Preview.
4. O Codex não abre merge nem promove produção.
5. Um mantenedor humano cria e revisa a Pull Request.
6. Um mantenedor humano executa o merge.
7. A Vercel executa o deployment automático configurado.
8. A equipe realiza o smoke test de produção.
9. O rollback fica sob responsabilidade do mantenedor.

## Fase E

A Fase E permanece bloqueada até Henrique escrever literalmente: **pode executar a Fase E**. Nenhuma outra formulação (por exemplo "pode seguir", "está autorizado", "vai em frente") vale como autorização para a Fase E.
