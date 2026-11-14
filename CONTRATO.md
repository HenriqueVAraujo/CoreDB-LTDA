# Trabalhe Conosco ??? contrato SITE-2

Base desta entrega: `6d986f2` (ref-main indicada na tarefa). Refer??ncia de reaproveitamento: `origin/ref-pr13`, `53425f6cfc13230bd460df6277db74e5740ae702`. N??o foram portados upload, inspe????o ou armazenamento de curr??culos, nem a p??gina da PR. Nenhuma mudan??a no contrato solicitado.

## Entrada

`POST /api/trabalhe-conosco`, `Content-Type: application/json`, sem upload.

| Campo | Regra |
| --- | --- |
| nome | Texto obrigat??rio, 1???120 |
| email | E-mail v??lido, at?? 254 |
| telefone | Opcional, at?? 32, somente d??gitos ASCII, `+()-` e espa??o |
| cidade | Texto obrigat??rio, 1???80 |
| estado | Uma das 27 UFs brasileiras, duas letras mai??sculas |
| areas | Array com 1???6 valores do enum abaixo |
| experiencia | `estagio`, `junior`, `pleno`, `senior`, `especialista` |
| modalidade | `remoto`, `hibrido`, `presencial`, `indiferente` |
| disponibilidade | `imediata`, `ate_30_dias`, `ate_60_dias`, `a_combinar` |
| perfilUrl | Opcional, at?? 300; vazio ou URL absoluta HTTP/HTTPS |
| resumo | Texto obrigat??rio, 1???1500 |
| consentimentoAnalise | Literal booleano `true` |
| consentimentoBanco | Booleano obrigat??rio; n??o inferido nem convertido; `true` somente se marcado pelo candidato |
| website | Honeypot obrigat??rio, exatamente string vazia |

??reas: `protheus_advpl_tlpp`, `totvs_rm`, `fluig`, `dba_sqlserver`, `dba_oracle`, `dba_postgresql`, `dba_mysql`, `suporte_ams_glpi`, `infraestrutura`, `cloud_sre`, `zabbix_grafana`, `desenvolvimento_apis`, `dados_bi`, `preventas_comercial`, `marketing_conteudo`, `outras`.

CR/LF, controles C0/C1 e separadores Unicode de linha s??o rejeitados antes de trim. Campos desconhecidos s??o rejeitados. N??o h?? campos para CPF, RG, nascimento, foto, estado civil ou dados sens??veis. Nenhum dado vai para CRM ou `/api/contact`.

## Respostas e entrega

- 200: `{ok:true, modo:'real'|'simulado', recebido:boolean, referencia:'TC-AAAAMMDD-XXXXXX', mensagem:string}`.
- 400: `{ok:false, erros:{campo:mensagem}}`; honeypot preenchido tamb??m ?? erro `website`, sem envio/registro.
- 429: `{ok:false, mensagem:string}`, com `Retry-After`.
- 503 sem configura????o em produ????o: `{ok:false, codigo:'sem_destino', mensagem:string}`.
- Falha SMTP: 503 `falha_entrega`; falha de registro de simula????o local: 503 `falha_registro`.
- Tipo diferente de JSON: 415; corpo acima de 16 KiB: 413; leitura acima de 15 segundos: 408. Erros de entrada usam `erros`.

Modo real somente com `SMTP_USER`, `SMTP_PASS`, `CAREERS_RECEIVER_EMAIL` e (`VERCEL_ENV=production` ou `CAREERS_FORCE_REAL=1`). Os demais casos s??o simulados, exceto produ????o sem configura????o, que falha fechado. Produ????o inclui `VERCEL_ENV=production` e, sem `VERCEL_ENV`, `NODE_ENV=production`.

No modo real, o Nodemailer usa as configura????es SMTP existentes (`SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`; padr??es smtp.gmail.com/465/true) e limites de conex??o/leitura. O assunto cont??m a refer??ncia, o corpo ?? exclusivamente texto e o reply-to ?? o e-mail validado do candidato. Somente aceita????o expl??cita do destinat??rio RH na lista `accepted` gera `recebido=true`. Aceita????o SMTP n??o prova leitura ou chegada ?? caixa final.

No modo simulado, `recebido=false`, sempre com a mensagem literal `SIMULADO: nada foi enviado ao RH`, mesmo quando existe recibo local. Refer??ncia usa data UTC e seis caracteres base36: in??cio aleat??rio por processo/dia e sequ??ncia local. N??o ?? token de autentica????o; n??o h?? garantia global de unicidade entre inst??ncias independentes. Teste cobre 10 mil refer??ncias distintas no mesmo processo/instante.

## Registro e limites serverless

Sem `VERCEL`, grava `.careers-data/candidaturas.jsonl`, uma linha com `referencia`, `timestamp` UTC e `campos` validados, incluindo ambos os consentimentos. Exclui honeypot, IP e segredos. A grava????o ?? aguardada e sincronizada com `fsync`; diret??rio/arquivo usam modos 0700/0600 onde suportados. `.careers-data/` ?? gitignored. Na Vercel nunca se grava no filesystem.

Se SMTP j?? aceitou e o recibo local falhar, mant??m sucesso baseado na aceita????o SMTP, evitando reenviar candidatura j?? aceita; o recibo local nesse cen??rio fica ausente. N??o existe fila dur??vel, retry autom??tico ou garantia de entrega exatamente uma vez.

Rate limit reaproveita o modelo por inst??ncia da PR #13, isolado desta API: cinco requisi????es por 60 segundos por origem, incluindo entradas inv??lidas. Mant??m no m??ximo 500 buckets; quando cheio, responde 429 em vez de remover limites ativos. IP n??o ?? persistido; chave em mem??ria usa HMAC-SHA256 com segredo ef??mero. Na Vercel depende dos headers de origem fornecidos pelo proxy confi??vel; em hospedagem pr??pria, o proxy deve sobrescrev??-los. Sem header, clientes compartilham o bucket `unknown`. Rein??cios e m??ltiplas inst??ncias reduzem a efic??cia; n??o ?? limite distribu??do.

## Valida????o e rollback

Testes sem rede usam `node --test tests/careers-api.contract.test.mjs`, TypeScript j?? declarado no projeto e transporte/registro falsos injetados. N??o subir servidor nem enviar e-mail para testar. Opera????es pesadas somente pelo sem??foro `pesado.py`, conforme tarefa; comandos e resultados em `RESUMO.md`.

Rollback desta entrega: mantenedor reverte exclusivamente os arquivos do backend/testes/documenta????o desta frente. N??o altera `/api/contact`, p??gina p??blica, SMTP global ou configura????o Vercel. Nenhum push, Preview ou deploy solicitado.
