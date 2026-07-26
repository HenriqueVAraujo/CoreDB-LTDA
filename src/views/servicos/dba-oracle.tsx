import TechnicalServicePage from '@/components/TechnicalServicePage'
import { CTA_CONFIGS } from '@/routes'

export default function OracleView() {
  return (
    <TechnicalServicePage
      editorialLabel="DBA ORACLE PARA AMBIENTES CRÍTICOS"
      title="DBA Oracle para performance, recuperação e alta disponibilidade"
      introduction="A CoreDB analisa sessões, eventos de espera, planos, armazenamento, memória e recuperação em Oracle para apoiar estabilidade, capacidade e continuidade conforme o desenho e o escopo do ambiente."
      signals={[
        { title: 'Sessões com espera prolongada', description: 'Acúmulo de sessões e eventos de espera precisa ser relacionado à carga, à aplicação e aos recursos disponíveis.' },
        { title: 'Planos com comportamento variável', description: 'Estatísticas, distribuição de dados e mudanças de volume podem alterar o custo e o tempo de operações relevantes.' },
        { title: 'Índices sem leitura de uso', description: 'Estruturas redundantes ou inadequadas podem afetar consultas, escrita, manutenção e armazenamento.' },
        { title: 'Tablespaces sob pressão', description: 'Crescimento, distribuição e capacidade precisam ser acompanhados antes que limites afetem a operação.' },
        { title: 'Memória incompatível com a carga', description: 'Comportamento de áreas de memória e perfil de trabalho pode indicar competição ou dimensionamento inadequado.' },
        { title: 'Recuperação e disponibilidade pouco testadas', description: 'Backups e arquitetura existentes precisam de procedimentos, evidências e critérios de recuperação documentados.' },
      ]}
      impacts={[
        { title: 'Tempo de resposta irregular', description: 'Eventos de espera e planos inadequados podem afetar transações, lotes e integrações de maneiras diferentes.' },
        { title: 'Crescimento sem previsibilidade', description: 'Tablespaces, memória e armazenamento sem acompanhamento elevam o risco de intervenções emergenciais.' },
        { title: 'Recuperação incerta', description: 'Ausência de testes e dependências documentadas dificulta decisões em incidentes e manutenções.' },
      ]}
      workstreams={[
        { title: 'Sessões e eventos de espera', description: 'Leitura do comportamento concorrente e dos principais grupos de espera no período avaliado.' },
        { title: 'Planos e estatísticas', description: 'Análise de planos, cardinalidade e estatísticas relacionadas às cargas priorizadas.' },
        { title: 'Índices', description: 'Avaliação de estruturas relevantes, custos de manutenção e aderência ao uso observado.' },
        { title: 'Tablespaces e memória', description: 'Acompanhamento de capacidade, crescimento e relação entre recursos e perfil de carga.' },
        { title: 'Backup e recuperação', description: 'Revisão de políticas, retenção, testes e procedimentos compatíveis com os objetivos acordados.' },
        { title: 'Alta disponibilidade e monitoramento', description: 'Avaliação da arquitetura existente, pontos de falha, alertas e procedimentos operacionais.' },
      ]}
      deliverables={[
        'Relatório de sessões, esperas, planos, capacidade e riscos dentro do recorte analisado.',
        'Plano priorizado de estabilização e aprofundamento técnico.',
        'Recomendações de capacidade, manutenção, recuperação e observabilidade.',
        'Critérios de validação para mudanças aprovadas.',
        'Registro de dependências, premissas e limites do ambiente avaliado.',
      ]}
      scopeNote="A profundidade depende das licenças, acessos, histórico, ferramentas e componentes incluídos. Mudanças em planos, estatísticas, índices, memória, tablespaces, backup ou alta disponibilidade exigem escopo, janela e critérios de retorno previamente acordados."
      hiringCriteria={[
        'Sessões e eventos de espera afetam cargas críticas sem explicação consolidada.',
        'Planos ou estatísticas apresentam comportamento incompatível com a operação.',
        'Tablespaces, memória ou armazenamento exigem planejamento de capacidade.',
        'Backup e recuperação precisam de revisão ou evidência de testes.',
        'A arquitetura de alta disponibilidade precisa ser avaliada frente aos objetivos atuais.',
      ]}
      faq={[
        { question: 'A análise considera eventos de espera?', answer: 'Sim, quando houver evidências e acesso no escopo. Os eventos são interpretados junto com carga, sessões, aplicação e recursos.' },
        { question: 'Tablespaces fazem parte do diagnóstico?', answer: 'Capacidade, crescimento e distribuição podem ser avaliados quando forem relevantes ao objetivo contratado.' },
        { question: 'A CoreDB altera planos ou índices automaticamente?', answer: 'Não. Qualquer mudança depende de evidência, aprovação, janela, validação e plano compatíveis com o risco.' },
        { question: 'Backup equivale a recuperação comprovada?', answer: 'Não. Recuperação exige testes, integridade, dependências e procedimentos documentados.' },
        { question: 'O serviço inclui todos os componentes Oracle?', answer: 'Não automaticamente. Instâncias, opções, ferramentas e arquitetura são delimitadas no escopo.' },
      ]}
      hub={{ href: '/servicos/dba', label: 'DBA multiplataforma', description: 'Voltar ao hub DBA e comparar SQL Server, Oracle, PostgreSQL e MySQL.' }}
      siblings={[
        { href: '/servicos/dba/sql-server', label: 'DBA SQL Server', description: 'Bloqueios, planos, TempDB, backup e disponibilidade.' },
        { href: '/servicos/dba/postgresql', label: 'DBA PostgreSQL', description: 'Performance, autovacuum, WAL, backup e replicação.' },
        { href: '/servicos/dba/mysql', label: 'DBA MySQL', description: 'InnoDB, performance, recuperação e replicação.' },
      ]}
      cta={CTA_CONFIGS.oracle}
      ctaText="Agendar triagem técnica de Oracle"
      ctaDescription="Estruture a avaliação técnica do seu ambiente Oracle."
    />
  )
}
