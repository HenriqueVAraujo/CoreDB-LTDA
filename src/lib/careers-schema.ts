import { z } from 'zod'

// Check before trimming: CR/LF must never disappear during normalization.
const text = (max: number, min = 0) => z.string()
  .max(max, 'Texto acima do limite permitido.').regex(/^[^\u0000-\u001f\u007f-\u009f\u2028\u2029\u200b-\u200f\u202a-\u202e\u2060-\u2064\u2066-\u2069\ufeff]*$/, 'Caracteres de controle, invisíveis ou de direção de texto não permitidos.')
  .transform(value => value.trim()).pipe(z.string().min(min, 'Campo obrigatório.'))

export const careerAreas = [
  'protheus_advpl_tlpp', 'totvs_rm', 'fluig', 'dba_sqlserver', 'dba_oracle',
  'dba_postgresql', 'dba_mysql', 'suporte_ams_glpi', 'infraestrutura', 'cloud_sre',
  'zabbix_grafana', 'desenvolvimento_apis', 'dados_bi', 'preventas_comercial',
  'marketing_conteudo', 'outras',
] as const

export const careersSchema = z.object({
  nome: text(120, 1),
  email: text(254, 1).pipe(z.email({ message: 'Informe um e-mail válido.' })),
  telefone: text(32).pipe(z.string().regex(/^[0-9+()\- ]*$/, 'Telefone com caracteres inválidos.')).optional(),
  cidade: text(80, 1),
  estado: z.enum(['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
    'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO',
    'RR', 'SC', 'SP', 'SE', 'TO'], { message: 'Selecione um estado válido.' }),
  areas: z.array(z.enum(careerAreas, { message: 'Área de interesse inválida.' }), { message: 'Selecione de 1 a 6 áreas.' }).min(1, 'Selecione de 1 a 6 áreas.').max(6, 'Selecione de 1 a 6 áreas.'),
  experiencia: z.enum(['estagio', 'junior', 'pleno', 'senior', 'especialista'], { message: 'Selecione uma opção válida.' }),
  modalidade: z.enum(['remoto', 'hibrido', 'presencial', 'indiferente'], { message: 'Selecione uma opção válida.' }),
  disponibilidade: z.enum(['imediata', 'ate_30_dias', 'ate_60_dias', 'a_combinar'], { message: 'Selecione uma opção válida.' }),
  perfilUrl: text(300).refine(value => {
    if (value === '') return true
    try { return ['http:', 'https:'].includes(new URL(value).protocol) } catch { return false }
  }, 'Informe uma URL HTTP ou HTTPS.').optional(),
  resumo: text(1500, 1),
  consentimentoAnalise: z.literal(true, { message: 'O consentimento para análise é obrigatório.' }),
  consentimentoBanco: z.boolean({ message: 'Valor inválido.' }),
  website: z.string().max(0, 'Não foi possível processar a solicitação.'),
}).strict()

export type CareersData = Omit<z.infer<typeof careersSchema>, 'website'>
