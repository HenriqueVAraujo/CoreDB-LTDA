import TechnicalServicePage from '@/components/TechnicalServicePage'
import { CTA_CONFIGS } from '@/routes'

export default function ProtheusView() {
  return (
    <TechnicalServicePage
      editorialLabel="ENGENHARIA E SUSTENTAÇÃO PROTHEUS"
      title="Consultoria Protheus para performance, sustentação e continuidade operacional"
      introduction="A CoreDB avalia as camadas do ambiente Protheus para relacionar sintomas de aplicação, serviços, integrações e banco de dados, orientando a estabilização e a evolução conforme o escopo contratado."
      signals={[
        {
          title: 'Lentidão em rotinas críticas',
          description: 'Tempos de resposta irregulares em faturamento, estoque, financeiro ou outras rotinas podem exigir correlação entre aplicação, serviços e banco de dados.',
        },
        {
          title: 'Bloqueios e concorrência',
          description: 'Processamentos simultâneos, filas e disputas por recursos podem afetar janelas operacionais e precisam ser avaliados com evidências do ambiente.',
        },
        {
          title: 'AppServer e DBAccess instáveis',
          description: 'Reinícios, consumo irregular de recursos ou falhas de comunicação entre camadas indicam a necessidade de uma análise integrada.',
        },
        {
          title: 'Ambientes multiempresa complexos',
          description: 'Volume, cadastros compartilhados e particularidades operacionais podem ampliar o impacto de configurações e customizações.',
        },
        {
          title: 'Atualizações sem preparação suficiente',
          description: 'Builds, releases e mudanças de ambiente precisam de inventário, critérios de homologação e plano de retorno compatíveis com o escopo.',
        },
        {
          title: 'Integrações com baixa rastreabilidade',
          description: 'Falhas intermitentes e dependências externas sem observabilidade dificultam a identificação da origem de incidentes.',
        },
      ]}
      impacts={[
        {
          title: 'Atraso em processos essenciais',
          description: 'Gargalos em rotinas transacionais podem comprometer prazos internos e a previsibilidade da operação.',
        },
        {
          title: 'Mudanças com risco ampliado',
          description: 'Atualizações sem leitura de dependências elevam a chance de incompatibilidades e retrabalho na homologação.',
        },
        {
          title: 'Diagnóstico fragmentado',
          description: 'Tratar aplicação e banco separadamente pode ocultar relações importantes entre consumo, concorrência e comportamento funcional.',
        },
      ]}
      workstreams={[
        {
          title: 'Diagnóstico de camadas',
          description: 'Leitura correlacionada de AppServer, DBAccess, banco de dados, infraestrutura e rotinas selecionadas.',
        },
        {
          title: 'Performance e concorrência',
          description: 'Análise de sintomas, janelas críticas e evidências para priorizar gargalos e bloqueios observados.',
        },
        {
          title: 'Preparação para atualização',
          description: 'Inventário técnico, dependências, critérios de homologação e riscos aplicáveis a builds e releases planejados.',
        },
        {
          title: 'Observabilidade',
          description: 'Definição de indicadores e pontos de acompanhamento para tornar incidentes e tendências mais rastreáveis.',
        },
        {
          title: 'Integrações',
          description: 'Avaliação de fluxos, dependências, tratamento de falhas e impactos entre o Protheus e sistemas conectados.',
        },
        {
          title: 'Sustentação e evolução',
          description: 'Apoio técnico contínuo ou pontual conforme criticidade, responsabilidades e cobertura formalmente contratadas.',
        },
      ]}
      deliverables={[
        'Relatório técnico com evidências, riscos observados e contexto das camadas avaliadas.',
        'Plano priorizado de estabilização, atualização ou evolução conforme os achados.',
        'Mapa de dependências relevantes entre aplicação, serviços, banco de dados e integrações.',
        'Recomendações de observabilidade e critérios para acompanhar resultados.',
        'Registro dos limites, premissas e responsabilidades definidos para o trabalho.',
      ]}
      scopeNote="A profundidade da análise depende dos acessos autorizados, das evidências disponíveis e das camadas incluídas. Mudanças em AppServer, DBAccess, banco, builds, releases ou integrações só são realizadas quando previstas no escopo e precedidas pelos controles acordados."
      hiringCriteria={[
        'Rotinas críticas apresentam lentidão ou comportamento intermitente sem causa consolidada.',
        'A operação precisa preparar uma atualização com melhor visibilidade de riscos e dependências.',
        'Incidentes atravessam aplicação, serviços, banco de dados e integrações.',
        'O ambiente multiempresa cresceu e precisa de uma leitura técnica estruturada.',
        'A equipe necessita de diagnóstico, plano de ação ou sustentação especializada conforme responsabilidades definidas.',
      ]}
      faq={[
        {
          question: 'A análise considera AppServer, DBAccess e banco de dados?',
          answer: 'Sim, quando essas camadas estiverem no escopo e houver acesso autorizado. O objetivo é correlacionar evidências, sem presumir que um único componente explica todos os sintomas.',
        },
        {
          question: 'A CoreDB pode apoiar builds e releases do Protheus?',
          answer: 'Pode apoiar o planejamento técnico, a avaliação de dependências e os critérios de homologação. A execução e a responsabilidade por cada etapa são definidas no escopo.',
        },
        {
          question: 'Uma rotina como MATA410 pode fazer parte da análise?',
          answer: 'Pode ser usada como exemplo conhecido de rotina crítica quando estiver relacionada ao sintoma apresentado. A avaliação depende das evidências do ambiente e não envolve publicação de parâmetros, queries ou dados internos.',
        },
        {
          question: 'O trabalho inclui integrações?',
          answer: 'Integrações podem ser avaliadas quanto a dependências, rastreabilidade e tratamento de falhas quando fizerem parte do escopo contratado.',
        },
        {
          question: 'O diagnóstico garante a eliminação de incidentes?',
          answer: 'Não. O diagnóstico organiza evidências, riscos e prioridades. Resultados dependem das condições do ambiente, das ações aprovadas e das responsabilidades assumidas por cada parte.',
        },
      ]}
      hub={{
        href: '/servicos/consultoria-totvs',
        label: 'Consultoria TOTVS',
        description: 'Voltar ao hub de Consultoria TOTVS e comparar as frentes Protheus, RM e Fluig.',
      }}
      siblings={[
        {
          href: '/servicos/rm',
          label: 'Consultoria TOTVS RM',
          description: 'Diagnóstico, sustentação e evolução técnica para ambientes RM.',
        },
        {
          href: '/servicos/fluig',
          label: 'Consultoria Fluig',
          description: 'Workflows, integrações, formulários e governança de processos.',
        },
      ]}
      cta={CTA_CONFIGS.protheus}
      ctaText="Agendar triagem técnica do Protheus"
      ctaDescription="Organize a avaliação técnica do seu ambiente Protheus."
    />
  )
}
