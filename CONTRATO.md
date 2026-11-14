# Trabalhe Conosco — contrato SITE-2

Base desta entrega: `6d986f2` (ref-main indicada na tarefa). Referência de reaproveitamento: `origin/ref-pr13`, `53425f6cfc13230bd460df6277db74e5740ae702`. Não foram portados upload, inspeção ou armazenamento de currículos, nem a página da PR. Nenhuma mudança no contrato solicitado.

## Entrada

`POST /api/trabalhe-conosco`, `Content-Type: application/json`, sem upload.

| Campo | Regra |
| --- | --- |
| nome | Texto obrigatério, 1–120 |
| email | E-mail válido, até 254 |
| telefone | Opcional, até 32, somente dígitos ASCII, `+()-` e espaço |
| cidade | Texto obrigatério, 1–80 |
| estado | Uma das 27 UFs brasileiras, duas letras maiúsculas |
| areas | Array com 1–6 valores do enum abaixo |
| experiencia | `estagio`, `junior`, `pleno`, `senior`, `especialista` |
| modalidade | `remoto`, `hibrido`, `presencial`, `indiferente` |
| disponibilidade | `imediata`, `ate_30_dias`, `ate_60_dias`, `a_combinar` |
| perfilUrl | Opcional, até 300; vazio ou URL absoluta HTTP/HTTPS |
| resumo | Texto obrigatério, 1–1500 |
| consentimentoAnalise | Literal booleano `true` |
| consentimentoBanco | Booleano obrigatério; não inferido nem convertido; `true` somente se marcado pelo candidato |
| website | Honeypot obrigatério, exatamente string vazia |

áreas: `protheus_advpl_tlpp`, `totvs_rm`, `fluig`, `dba_sqlserver`, `dba_oracle`, `dba_postgresql`, `dba_mysql`, `suporte_ams_glpi`, `infraestrutura`, `cloud_sre`, `zabbix_grafana`, `desenvolvimento_apis`, `dados_bi`, `preventas_comercial`, `marketing_conteudo`, `outras`.

CR/LF, controles C0/C1 e separadores Unicode de linha são rejeitados antes de trim. Campos desconhecidos são rejeitados. Não há campos para CPF, RG, nascimento, foto, estado civil ou dados sensíveis. Nenhum dado vai para CRM ou `/api/contact`.

## Respostas e entrega

- 200: `{ok:true, modo:'real'|'simulado', recebido:boolean, referencia:'TC-AAAAMMDD-XXXXXX', mensagem:string}`.
- 400: `{ok:false, erros:{campo:mensagem}}`; honeypot preenchido também é erro `website`, sem envio/registro.
- 429: `{ok:false, mensagem:string}`, com `Retry-After`.
- 503 sem configuração em produção: `{ok:false, codigo:'sem_destino', mensagem:string}`.
- Falha SMTP: 503 `falha_entrega`; falha de registro de simulação local: 503 `falha_registro`.
- Tipo diferente de JSON: 415; corpo acima de 16 KiB: 413; leitura acima de 15 segundos: 408. Erros de entrada usam `erros`.

Modo real somente com `SMTP_USER`, `SMTP_PASS`, `CAREERS_RECEIVER_EMAIL` e (`VERCEL_ENV=production` ou `CAREERS_FORCE_REAL=1`). Os demais casos são simulados, exceto produção sem configuração, que falha fechado. Produção inclui `VERCEL_ENV=production` e, sem `VERCEL_ENV`, `NODE_ENV=production`.

No modo real, o Nodemailer usa as configurações SMTP existentes (`SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`; padrões smtp.gmail.com/465/true) e limites de conexão/leitura. O assunto contém a referência, o corpo ?? exclusivamente texto e o reply-to ?? o e-mail validado do candidato. Somente aceitação explícita do destinatério RH na lista `accepted` gera `recebido=true`. Aceitação SMTP não prova leitura ou chegada ?? caixa final.

No modo simulado, `recebido=false`, sempre com a mensagem literal `SIMULADO: nada foi enviado ao RH`, mesmo quando existe recibo local. Referência usa data UTC e seis caracteres base36: início aleatério por processo/dia e sequência local. Não ?? token de autenticação; não há garantia global de unicidade entre instâncias independentes. Teste cobre 10 mil referências distintas no mesmo processo/instante.

## Registro e limites serverless

Sem `VERCEL`, grava `.careers-data/candidaturas.jsonl`, uma linha com `referencia`, `timestamp` UTC e `campos` validados, incluindo ambos os consentimentos. Exclui honeypot, IP e segredos. A grava????o ?? aguardada e sincronizada com `fsync`; diretório/arquivo usam modos 0700/0600 onde suportados. `.careers-data/` ?? gitignored. Na Vercel nunca se grava no filesystem.

Se SMTP já aceitou e o recibo local falhar, mantém sucesso baseado na aceitação SMTP, evitando reenviar candidatura já aceita; o recibo local nesse cenário fica ausente. Não existe fila durável, retry automático ou garantia de entrega exatamente uma vez.

Rate limit reaproveita o modelo por instância da PR #13, isolado desta API: cinco requisições por 60 segundos por origem, incluindo entradas inválidas. Mantém no máximo 500 buckets; quando cheio, responde 429 em vez de remover limites ativos. IP não ?? persistido; chave em memória usa HMAC-SHA256 com segredo efêmero. Na Vercel depende dos headers de origem fornecidos pelo proxy confiável; em hospedagem própria, o proxy deve sobrescrevê-los. Sem header, clientes compartilham o bucket `unknown`. Reinícios e múltiplas instâncias reduzem a eficácia; não ?? limite distribu??do.

## Validação e rollback

Testes sem rede usam `node --test tests/careers-api.contract.test.mjs`, TypeScript já declarado no projeto e transporte/registro falsos injetados. Não subir servidor nem enviar e-mail para testar. Operações pesadas somente pelo semáforo `pesado.py`, conforme tarefa; comandos e resultados em `RESUMO.md`.

Rollback desta entrega: mantenedor reverte exclusivamente os arquivos do backend/testes/documentação desta frente. Não altera `/api/contact`, página pública, SMTP global ou configuração Vercel. Nenhum push, Preview ou deploy solicitado.
