import TechnicalServicePage from '@/components/TechnicalServicePage'
import { CTA_CONFIGS } from '@/routes'

export default function MySqlView() {
  return (
    <TechnicalServicePage
      editorialLabel="DBA MYSQL PARA AMBIENTES CRÍTICOS"
      title="DBA MySQL para performance, disponibilidade e recuperação"
      introduction="A CoreDB avalia InnoDB, concorrência, consultas, planos, memória, backup e replicação em MySQL para apoiar decisões de performance e continuidade baseadas no comportamento real do ambiente."
      signals={[
        { title: 'Locks e transações prolongadas', description: 'Concorrência em InnoDB pode ampliar filas e afetar operações quando transações e padrões de acesso não estão claros.' },
        { title: 'Consultas lentas', description: 'Tempo de resposta elevado precisa ser relacionado a planos, volume, índices, concorrência e recursos.' },
        { title: 'Planos e índices inadequados', description: 'Estratégias de acesso incompatíveis com a distribuição atual podem aumentar leituras e consumo.' },
        { title: 'Buffer pool sob pressão', description: 'Memória e perfil de acesso precisam ser analisados em conjunto antes de qualquer mudança de configuração.' },
        { title: 'Backup sem recuperação testada', description: 'Arquivos gerados não substituem verificação de integridade, restore, dependências e procedimentos.' },
        { title: 'Replicação com atraso ou instabilidade', description: 'Lag, erros e volume precisam ser correlacionados à topologia e à carga do ambiente.' },
      ]}
      impacts={[
        { title: 'Latência para a aplicação', description: 'Consultas lentas e locks podem afetar fluxos síncronos, lotes e integrações.' },
        { title: 'Memória e armazenamento pressionados', description: 'Perfil de acesso, crescimento e manutenção podem reduzir a previsibilidade de capacidade.' },
        { title: 'Disponibilidade e recuperação incertas', description: 'Backups e replicação sem testes e procedimentos claros dificultam resposta a falhas.' },
      ]}
      workstreams={[
        { title: 'InnoDB e concorrência', description: 'Avaliação de transações, locks, esperas e comportamento das cargas selecionadas.' },
        { title: 'Consultas e planos', description: 'Análise de sintomas, estratégias de acesso e variações relevantes de desempenho.' },
        { title: 'Índices', description: 'Leitura de aderência, custo de manutenção e relação com os padrões de consulta.' },
        { title: 'Buffer pool e recursos', description: 'Análise da relação entre memória, perfil de acesso, armazenamento e carga.' },
        { title: 'Backup e recuperação', description: 'Revisão de políticas, retenção, integridade, testes e dependências operacionais.' },
        { title: 'Replicação e monitoramento', description: 'Avaliação de atraso, erros, alertas e procedimentos da topologia existente.' },
      ]}
      deliverables={[
        'Relatório técnico de InnoDB, concorrência, planos, recursos e riscos observados.',
        'Plano priorizado para performance, capacidade e recuperação.',
        'Recomendações para índices, memória, backup, replicação e observabilidade.',
        'Critérios de validação e acompanhamento das ações aprovadas.',
        'Registro de escopo, premissas, dependências e responsabilidades.',
      ]}
      scopeNote="A profundidade depende da versão, topologia, mecanismos, acessos, histórico e carga incluídos. Mudanças em índices, memória, configuração, backup ou replicação exigem escopo aprovado, janela, validação e plano de retorno compatíveis com o ambiente."
      hiringCriteria={[
        'Locks ou transações longas afetam rotinas da aplicação.',
        'Consultas lentas apresentam causa ou comportamento variável.',
        'Planos, índices ou buffer pool precisam ser avaliados frente à carga atual.',
        'Backups precisam de revisão ou teste de recuperação.',
        'Replicação e monitoramento mostram atraso, erros ou baixa rastreabilidade.',
      ]}
      faq={[
        { question: 'A análise é limitada ao InnoDB?', answer: 'O mecanismo e os componentes incluídos são definidos no escopo. InnoDB é uma frente frequente, mas não deve ser presumido como único contexto possível.' },
        { question: 'Aumentar o buffer pool resolve consultas lentas?', answer: 'Não necessariamente. Memória, planos, índices, volume, concorrência e armazenamento precisam ser correlacionados antes de uma decisão.' },
        { question: 'A análise inclui replicação?', answer: 'Pode incluir topologia, atraso, erros, saúde e procedimentos quando a replicação estiver no escopo.' },
        { question: 'A CoreDB publica comandos ou queries?', answer: 'Não. Comandos, queries, credenciais, parâmetros e dados de clientes permanecem protegidos.' },
        { question: 'O backup garante recuperação?', answer: 'Não. Recuperação depende de integridade, testes, dependências e procedimentos compatíveis com os objetivos acordados.' },
      ]}
      hub={{ href: '/servicos/dba', label: 'DBA multiplataforma', description: 'Voltar ao hub DBA e comparar SQL Server, Oracle, PostgreSQL e MySQL.' }}
      siblings={[
        { href: '/servicos/dba/sql-server', label: 'DBA SQL Server', description: 'Bloqueios, planos, TempDB, backup e disponibilidade.' },
        { href: '/servicos/dba/oracle', label: 'DBA Oracle', description: 'Sessões, esperas, recuperação e alta disponibilidade.' },
        { href: '/servicos/dba/postgresql', label: 'DBA PostgreSQL', description: 'Performance, autovacuum, WAL, backup e replicação.' },
      ]}
      cta={CTA_CONFIGS.mysql}
      ctaText="Agendar triagem técnica de MySQL"
      ctaDescription="Avalie performance, recuperação e replicação no seu MySQL."
    />
  )
}
