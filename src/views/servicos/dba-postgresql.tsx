import TechnicalServicePage from '@/components/TechnicalServicePage'
import { CTA_CONFIGS } from '@/routes'

export default function PostgreSqlView() {
  return (
    <TechnicalServicePage
      editorialLabel="DBA POSTGRESQL PARA AMBIENTES CRÍTICOS"
      title="DBA PostgreSQL para performance, replicação e continuidade"
      introduction="A CoreDB avalia locks, planos, estatísticas, manutenção, WAL, backup e replicação em PostgreSQL para apoiar performance e continuidade sem separar o banco do perfil real da aplicação."
      signals={[
        { title: 'Locks e filas de sessões', description: 'Transações prolongadas e concorrência podem ampliar espera, consumo e impacto em processos dependentes.' },
        { title: 'Planos inadequados à distribuição atual', description: 'Mudanças de volume, estatísticas e seletividade podem alterar a estratégia escolhida para consultas importantes.' },
        { title: 'Índices e estatísticas sem governança', description: 'Estruturas e manutenção desalinhadas ao uso podem afetar leitura, escrita e planejamento do otimizador.' },
        { title: 'Autovacuum insuficiente', description: 'Configuração e ritmo incompatíveis com a carga podem favorecer acúmulo de versões de linha e pressão operacional.' },
        { title: 'Bloat e crescimento', description: 'Crescimento físico precisa ser relacionado ao padrão de atualização, manutenção e capacidade disponível.' },
        { title: 'WAL, backup ou replicação sob pressão', description: 'Retenção, volume, atraso e procedimentos de recuperação precisam ser avaliados em conjunto.' },
      ]}
      impacts={[
        { title: 'Concorrência degradada', description: 'Locks e transações longas podem aumentar latência e limitar a capacidade percebida pela aplicação.' },
        { title: 'Crescimento e manutenção reativos', description: 'Autovacuum e bloat sem acompanhamento podem gerar intervenções urgentes e janelas mais complexas.' },
        { title: 'Replicação ou recuperação imprevisível', description: 'WAL, atraso, retenção e backup sem critérios claros dificultam resposta a incidentes.' },
      ]}
      workstreams={[
        { title: 'Locks e transações', description: 'Análise de concorrência, duração, sessões e padrões de acesso das cargas selecionadas.' },
        { title: 'Planos, estatísticas e índices', description: 'Leitura do comportamento do otimizador e das estruturas relevantes ao escopo.' },
        { title: 'Autovacuum', description: 'Avaliação da manutenção automática frente a volume, frequência de atualização e capacidade do ambiente.' },
        { title: 'Bloat e capacidade', description: 'Análise de crescimento, ocupação e prioridades de manutenção com base em evidências.' },
        { title: 'WAL, backup e recuperação', description: 'Revisão de retenção, políticas, testes e dependências necessárias à recuperação.' },
        { title: 'Replicação e monitoramento', description: 'Avaliação de atraso, saúde, alertas e procedimentos aplicáveis à arquitetura existente.' },
      ]}
      deliverables={[
        'Relatório técnico de concorrência, planos, manutenção, WAL e riscos observados.',
        'Plano priorizado para performance, capacidade e continuidade.',
        'Recomendações para autovacuum, índices, backup, replicação e monitoramento.',
        'Critérios de validação e acompanhamento das mudanças aprovadas.',
        'Registro de escopo, premissas e dependências técnicas.',
      ]}
      scopeNote="A avaliação depende de acessos, extensões, arquitetura, histórico e carga incluídos. Alterações em autovacuum, índices, parâmetros, WAL, backup ou replicação só são executadas dentro de escopo aprovado, com validação e plano compatíveis com a criticidade."
      hiringCriteria={[
        'Locks ou transações longas afetam o tempo de resposta da aplicação.',
        'Planos, estatísticas ou índices apresentam comportamento irregular.',
        'Autovacuum e bloat exigem diagnóstico baseado no perfil de atualização.',
        'WAL, backup ou replicação acumulam alertas ou incertezas operacionais.',
        'A capacidade precisa ser planejada antes de crescimento ou mudanças relevantes.',
      ]}
      faq={[
        { question: 'Autovacuum deve ser simplesmente aumentado?', answer: 'Não existe ajuste universal. Volume, frequência de atualização, recursos, tabelas e janelas precisam ser avaliados em conjunto.' },
        { question: 'Bloat sempre exige uma operação imediata?', answer: 'Não. O impacto, a causa, o crescimento e o custo da intervenção devem orientar a prioridade e a estratégia.' },
        { question: 'A análise cobre WAL e replicação?', answer: 'Pode cobrir retenção, volume, atraso, saúde e procedimentos quando esses componentes estiverem no escopo.' },
        { question: 'A CoreDB publica queries de diagnóstico?', answer: 'Não. Queries, comandos, dados e parâmetros de clientes não são publicados nesta página.' },
        { question: 'Backup elimina a necessidade de teste de recuperação?', answer: 'Não. Testes, dependências, integridade e procedimentos são necessários para avaliar a capacidade de recuperação.' },
      ]}
      hub={{ href: '/servicos/dba', label: 'DBA multiplataforma', description: 'Voltar ao hub DBA e comparar SQL Server, Oracle, PostgreSQL e MySQL.' }}
      siblings={[
        { href: '/servicos/dba/sql-server', label: 'DBA SQL Server', description: 'Bloqueios, planos, TempDB, backup e disponibilidade.' },
        { href: '/servicos/dba/oracle', label: 'DBA Oracle', description: 'Sessões, esperas, recuperação e alta disponibilidade.' },
        { href: '/servicos/dba/mysql', label: 'DBA MySQL', description: 'InnoDB, performance, recuperação e replicação.' },
      ]}
      cta={CTA_CONFIGS.postgresql}
      ctaText="Agendar triagem técnica de PostgreSQL"
      ctaDescription="Contextualize performance e continuidade no seu PostgreSQL."
    />
  )
}
