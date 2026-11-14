import { z } from 'zod'

// Check before trimming: CR/LF must never disappear during normalization.
const text = (max: number, min = 0) => z.string()
  .max(max).regex(/^[^\u0000-\u001f\u007f-\u009f\u2028\u2029]*$/, 'Caracteres de controle n??o permitidos.')
  .transform(value => value.trim()).pipe(z.string().min(min))

export const careerAreas = [
  'protheus_advpl_tlpp', 'totvs_rm', 'fluig', 'dba_sqlserver', 'dba_oracle',
  'dba_postgresql', 'dba_mysql', 'suporte_ams_glpi', 'infraestrutura', 'cloud_sre',
  'zabbix_grafana', 'desenvolvimento_apis', 'dados_bi', 'preventas_comercial',
  'marketing_conteudo', 'outras',
] as const

export const careersSchema = z.object({
  nome: text(120, 1),
  email: text(254, 1).pipe(z.email()),
  telefone: text(32).pipe(z.string().regex(/^[0-9+()\- ]*$/)).optional(),
  cidade: text(80, 1),
  estado: z.enum(['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
    'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO',
    'RR', 'SC', 'SP', 'SE', 'TO']),
  areas: z.array(z.enum(careerAreas)).min(1).max(6),
  experiencia: z.enum(['estagio', 'junior', 'pleno', 'senior', 'especialista']),
  modalidade: z.enum(['remoto', 'hibrido', 'presencial', 'indiferente']),
  disponibilidade: z.enum(['imediata', 'ate_30_dias', 'ate_60_dias', 'a_combinar']),
  perfilUrl: text(300).refine(value => {
    if (value === '') return true
    try { return ['http:', 'https:'].includes(new URL(value).protocol) } catch { return false }
  }, 'Informe uma URL HTTP ou HTTPS.').optional(),
  resumo: text(1500, 1),
  consentimentoAnalise: z.literal(true),
  consentimentoBanco: z.boolean(),
  website: z.string().max(0, 'Deixe este campo vazio.'),
}).strict()

export type CareersData = Omit<z.infer<typeof careersSchema>, 'website'>
