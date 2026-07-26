import TechnicalServicePage from '@/components/TechnicalServicePage'
import { CTA_CONFIGS } from '@/routes'

export default function RMView() {
  return (
    <TechnicalServicePage
      editorialLabel="DIAGNÓSTICO E SUSTENTAÇÃO TOTVS RM"
      title="Diagnóstico e sustentação TOTVS RM para ambientes em risco técnico"
      introduction="A CoreDB avalia sinais de risco no RM, suas integrações e o banco de dados para apoiar decisões de sustentação, atualização e evolução sem transformar mudanças técnicas, fiscais ou tributárias em promessas genéricas."
      signals={[
        {
          title: 'Incidentes recorrentes',
          description: 'Falhas repetidas, processamento irregular ou perda de previsibilidade indicam a necessidade de organizar evidências e dependências do ambiente RM.',
        },
        {
          title: 'Atualização com dependências pouco conhecidas',
          description: 'Customizações, integrações e componentes conectados precisam ser inventariados antes de mudanças relevantes no ambiente.',
        },
        {
          title: 'Banco de dados sob pressão',
          description: 'Concorrência, crescimento e consultas custosas podem afetar rotinas do RM e devem ser avaliados no contexto da aplicação.',
        },
        {
          title: 'Integrações instáveis',
          description: 'Erros intermitentes, reprocessamentos e baixa rastreabilidade podem comprometer fluxos entre o RM e outros sistemas.',
        },
        {
          title: 'Mudanças fiscais e tributárias',
          description: 'Adequações relacionadas a IBS/CBS e outras mudanças devem seguir documentação oficial aplicável, versão instalada, escopo funcional e calendário validado pelo cliente.',
        },
        {
          title: 'Avaliação de RM Liber',
          description: 'A aderência e as condições de uso precisam ser analisadas a partir do ambiente, da documentação oficial vigente e das necessidades da operação.',
        },
      ]}
      impacts={[
        {
          title: 'Risco operacional acumulado',
          description: 'Incidentes não correlacionados podem ampliar retrabalho, indisponibilidade percebida e dificuldade de priorização.',
        },
        {
          title: 'Atualizações com baixa previsibilidade',
          description: 'Dependências desconhecidas tornam homologação, comunicação e retorno mais complexos.',
        },
        {
          title: 'Adequações desconectadas do ambiente',
          description: 'Aplicar orientações gerais sem considerar versão, módulos, integrações e processos pode gerar decisões inadequadas.',
        },
      ]}
      workstreams={[
        {
          title: 'Diagnóstico técnico',
          description: 'Levantamento de sintomas, arquitetura, integrações, banco de dados e evidências disponíveis no escopo.',
        },
        {
          title: 'Sustentação',
          description: 'Organização de responsabilidades, prioridades e cobertura para apoiar a operação conforme o contrato.',
        },
        {
          title: 'Atualização e evolução',
          description: 'Avaliação de dependências, critérios de homologação e riscos para mudanças planejadas no ambiente.',
        },
        {
          title: 'RM Liber',
          description: 'Análise técnica e de aderência baseada na documentação oficial vigente e nas condições reais do cliente.',
        },
        {
          title: 'Mudanças fiscais e tributárias',
          description: 'Apoio técnico para mapear impactos no ambiente sem substituir validação fiscal, contábil ou jurídica.',
        },
        {
          title: 'Integrações e banco de dados',
          description: 'Correlação de fluxos, falhas, concorrência e capacidade nas camadas incluídas no trabalho.',
        },
      ]}
      deliverables={[
        'Relatório de diagnóstico com evidências e sinais de risco do ambiente RM.',
        'Mapa de dependências entre módulos, integrações e banco de dados incluídos.',
        'Plano priorizado de estabilização, atualização ou evolução.',
        'Critérios técnicos de homologação e acompanhamento aplicáveis ao escopo.',
        'Registro de premissas, limites, responsabilidades e lacunas de informação.',
      ]}
      scopeNote="A avaliação depende da versão instalada, dos módulos, das integrações, do banco de dados e dos acessos autorizados. Questões fiscais, contábeis e jurídicas exigem validação dos responsáveis do cliente e de fontes oficiais; a CoreDB atua no impacto técnico definido em escopo."
      offerNote="Condições especiais para novos contratos de diagnóstico e sustentação TOTVS RM, sujeitas à avaliação técnica, disponibilidade de agenda e definição do escopo."
      hiringCriteria={[
        'O ambiente apresenta incidentes recorrentes ou sinais de risco sem causa consolidada.',
        'Uma atualização precisa ser preparada com leitura de dependências e critérios técnicos.',
        'Integrações e banco de dados afetam a estabilidade percebida do RM.',
        'Mudanças fiscais ou tributárias exigem avaliação do impacto técnico no ambiente.',
        'A operação precisa estruturar sustentação, responsabilidades e prioridades.',
      ]}
      faq={[
        {
          question: 'O diagnóstico cobre todos os módulos do RM?',
          answer: 'A cobertura é definida pelo escopo. Módulos, integrações e processos são incluídos conforme criticidade, evidências disponíveis e acessos autorizados.',
        },
        {
          question: 'A CoreDB define cronogramas de IBS/CBS?',
          answer: 'Não. Cronogramas e obrigações devem ser confirmados em fontes oficiais e com os responsáveis fiscal, contábil e jurídico. A atuação da CoreDB se limita ao impacto técnico contratado.',
        },
        {
          question: 'A página confirma uma condição universal para RM Liber?',
          answer: 'Não. A aderência depende da documentação oficial vigente, da versão, dos módulos, das integrações e das necessidades específicas da operação.',
        },
        {
          question: 'Banco de dados e integrações entram na avaliação?',
          answer: 'Podem entrar quando forem relevantes ao sintoma e estiverem formalmente incluídos no escopo.',
        },
        {
          question: 'A triagem já representa um diagnóstico completo?',
          answer: 'Não. A triagem inicial organiza contexto e prioridades. Profundidade, acessos, entregáveis e responsabilidades são definidos antes do diagnóstico.',
        },
      ]}
      hub={{
        href: '/servicos/consultoria-totvs',
        label: 'Consultoria TOTVS',
        description: 'Voltar ao hub de Consultoria TOTVS e comparar as frentes Protheus, RM e Fluig.',
      }}
      siblings={[
        {
          href: '/servicos/protheus',
          label: 'Consultoria Protheus',
          description: 'Performance, sustentação e evolução de ambientes Protheus.',
        },
        {
          href: '/servicos/fluig',
          label: 'Consultoria Fluig',
          description: 'Workflows, integrações, formulários e governança de processos.',
        },
      ]}
      cta={CTA_CONFIGS.rm}
      ctaText="Agendar triagem técnica de risco do RM"
      ctaDescription="Contextualize os sinais de risco do seu ambiente TOTVS RM."
    />
  )
}
