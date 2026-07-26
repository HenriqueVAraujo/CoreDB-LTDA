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

## Branches autorizadas

### Site-base e manutenção do Go-Live

Branch: `sprint/go-live-2026-07-24`.

Uso autorizado:

- correções controladas;
- documentação;
- manutenção do candidato e do site-base;
- commits e push apenas quando expressamente autorizados;
- Preview automático pela integração Git, sem promoção pelo Codex.

### Expansão técnica e SEO

Branch: `feature/seo-technical-pages-2026-07`.

A branch deve ser criada a partir de `origin/main` atualizado. Nela, o Codex pode:

- executar `git fetch` e ler `origin/main`;
- criar a feature branch a partir de `origin/main`;
- criar e validar as páginas técnicas autorizadas;
- fazer commits e push exclusivamente na feature branch;
- permitir que a integração Git gere o Preview da feature branch.

Isso não autoriza merge ou push na `main`, produção ou alterações na configuração da Vercel.

## Escopo técnico e SEO autorizado

Exclusivamente em `feature/seo-technical-pages-2026-07`, estão autorizadas estas rotas:

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
