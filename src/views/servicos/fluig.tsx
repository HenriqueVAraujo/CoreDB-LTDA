import TechnicalServicePage from '@/components/TechnicalServicePage'
import { CTA_CONFIGS } from '@/routes'

export default function FluigView() {
  return (
    <TechnicalServicePage
      editorialLabel="WORKFLOWS, INTEGRAÇÕES E GOVERNANÇA FLUIG"
      title="Consultoria Fluig para workflows, integrações e governança de processos"
      introduction="A CoreDB atua na análise e evolução de processos Fluig, relacionando workflows, formulários, datasets e integrações para melhorar rastreabilidade, performance e sustentação conforme o escopo de cada operação."
      signals={[
        {
          title: 'Workflows travados',
          description: 'Atividades que não avançam, retornos inesperados ou filas crescentes pedem análise do desenho, das regras e das dependências do processo.',
        },
        {
          title: 'Formulários inconsistentes',
          description: 'Validações, estados e dados divergentes podem afetar a experiência dos usuários e a integridade do fluxo.',
        },
        {
          title: 'Datasets com baixa previsibilidade',
          description: 'Consultas lentas, indisponibilidade de fontes ou contratos pouco claros podem comprometer processos dependentes.',
        },
        {
          title: 'Integrações intermitentes',
          description: 'Falhas sem rastreabilidade e reprocessamentos manuais dificultam a identificação da origem do incidente.',
        },
        {
          title: 'Performance degradada',
          description: 'Tempos de resposta irregulares podem envolver processo, customizações, integrações, infraestrutura ou volume.',
        },
        {
          title: 'Governança insuficiente',
          description: 'Ausência de inventário, responsáveis e critérios de mudança amplia o risco de versões paralelas e dependências desconhecidas.',
        },
      ]}
      impacts={[
        {
          title: 'Processos interrompidos',
          description: 'Fluxos travados atrasam aprovações, solicitações e atividades que dependem do andamento no Fluig.',
        },
        {
          title: 'Baixa rastreabilidade',
          description: 'Sem evidências organizadas, a equipe perde tempo reproduzindo falhas e identificando responsáveis.',
        },
        {
          title: 'Mudanças com efeito em cadeia',
          description: 'Alterações em formulários, datasets ou integrações podem afetar vários processos quando dependências não estão mapeadas.',
        },
      ]}
      workstreams={[
        {
          title: 'Diagnóstico de workflows',
          description: 'Leitura de etapas, regras, filas, pontos de decisão e sintomas observados nos processos priorizados.',
        },
        {
          title: 'Formulários',
          description: 'Avaliação de comportamento, validações e relação com o ciclo de vida do processo.',
        },
        {
          title: 'Datasets',
          description: 'Análise de dependências, disponibilidade, tempo de resposta e uso pelos componentes incluídos.',
        },
        {
          title: 'Integrações',
          description: 'Mapeamento de fluxos, contratos, tratamento de falhas e rastreabilidade entre sistemas.',
        },
        {
          title: 'Performance e sustentação',
          description: 'Priorização de gargalos e organização da cobertura técnica conforme criticidade e contrato.',
        },
        {
          title: 'Governança de mudanças',
          description: 'Inventário, responsabilidades, critérios de homologação e documentação dos processos selecionados.',
        },
      ]}
      deliverables={[
        'Mapa dos workflows, integrações e dependências incluídos na avaliação.',
        'Relatório de sintomas, evidências e impactos operacionais observados.',
        'Backlog técnico priorizado para estabilização ou evolução.',
        'Recomendações de rastreabilidade, homologação e governança de mudanças.',
        'Registro de escopo, premissas e responsabilidades entre as equipes.',
      ]}
      scopeNote="A avaliação é limitada aos workflows, formulários, datasets, integrações e ambientes formalmente incluídos. Dados reais de clientes, código proprietário e desenhos internos não são publicados; acessos e evidências são tratados conforme as permissões acordadas."
      hiringCriteria={[
        'Workflows críticos travam ou retornam resultados inconsistentes.',
        'Formulários e datasets acumulam dependências pouco documentadas.',
        'Integrações apresentam falhas intermitentes ou reprocessamento manual frequente.',
        'A operação precisa melhorar rastreabilidade e governança de mudanças.',
        'Performance e sustentação precisam ser avaliadas de forma estruturada.',
      ]}
      faq={[
        {
          question: 'A consultoria pode avaliar workflows já existentes?',
          answer: 'Sim. A análise pode cobrir desenho, etapas, regras, filas e dependências dos processos priorizados, conforme acessos e escopo.',
        },
        {
          question: 'Datasets e integrações fazem parte do diagnóstico?',
          answer: 'Podem fazer parte quando influenciam o processo analisado. A cobertura e as fontes envolvidas são definidas antes do trabalho.',
        },
        {
          question: 'A CoreDB publica código ou datasets reais?',
          answer: 'Não. Código, dados de clientes e desenhos proprietários permanecem protegidos. A página descreve apenas práticas e entregáveis gerais.',
        },
        {
          question: 'É possível atuar apenas na governança?',
          answer: 'Sim, desde que o objetivo, os processos, os responsáveis e os entregáveis de governança sejam definidos em escopo.',
        },
        {
          question: 'A sustentação garante que nenhum processo volte a falhar?',
          answer: 'Não. A atuação organiza prevenção, resposta e evolução conforme cobertura contratada, sem oferecer garantia absoluta de resultado.',
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
          href: '/servicos/rm',
          label: 'Consultoria TOTVS RM',
          description: 'Diagnóstico, sustentação e evolução técnica para ambientes RM.',
        },
      ]}
      cta={CTA_CONFIGS.fluig}
      ctaText="Agendar triagem técnica do Fluig"
      ctaDescription="Estruture a avaliação dos processos críticos no Fluig."
    />
  )
}
