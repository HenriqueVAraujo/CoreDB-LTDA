import TechnicalServicePage from '@/components/TechnicalServicePage'
import { CTA_CONFIGS } from '@/routes'

export default function SqlServerView() {
  return (
    <TechnicalServicePage
      editorialLabel="DBA SQL SERVER PARA AMBIENTES CRÍTICOS"
      title="DBA SQL Server para performance, segurança e continuidade"
      introduction="A CoreDB avalia concorrência, planos de execução, recursos, recuperação e disponibilidade em SQL Server para transformar sintomas isolados em prioridades técnicas compatíveis com o ambiente."
      signals={[
        { title: 'Bloqueios prolongados', description: 'Sessões concorrentes podem ampliar filas e afetar rotinas transacionais quando a causa e a cadeia de bloqueio não estão claras.' },
        { title: 'Deadlocks recorrentes', description: 'Conflitos cíclicos exigem leitura dos padrões de acesso, transações envolvidas e contexto da aplicação.' },
        { title: 'Planos de execução instáveis', description: 'Mudanças de cardinalidade, distribuição de dados ou parâmetros podem alterar o comportamento de consultas críticas.' },
        { title: 'Estatísticas e índices sem governança', description: 'Manutenção desalinhada ao uso real pode elevar custo de leitura, escrita e armazenamento.' },
        { title: 'Pressão em TempDB e memória', description: 'Contenção, crescimento e distribuição inadequada de recursos podem aparecer como lentidão generalizada.' },
        { title: 'Recuperação pouco testada', description: 'Backups existentes não substituem validação periódica de restore, dependências e objetivos definidos para o ambiente.' },
      ]}
      impacts={[
        { title: 'Filas transacionais', description: 'Bloqueios e planos inadequados podem ampliar o tempo de processos e a imprevisibilidade operacional.' },
        { title: 'Uso ineficiente de recursos', description: 'Memória, CPU, armazenamento e TempDB podem ser pressionados por cargas ou configurações incompatíveis com o perfil atual.' },
        { title: 'Risco de recuperação', description: 'Políticas sem testes e critérios documentados dificultam decisões durante incidentes.' },
      ]}
      workstreams={[
        { title: 'Concorrência e deadlocks', description: 'Análise de padrões de bloqueio, sessões e transações para orientar prioridades de correção.' },
        { title: 'Planos e estatísticas', description: 'Avaliação de comportamento do otimizador, distribuição de dados e variações observadas nas cargas selecionadas.' },
        { title: 'Índices e manutenção', description: 'Leitura de uso, custo e manutenção dos índices relevantes ao escopo.' },
        { title: 'TempDB e memória', description: 'Análise de consumo, contenção e relação entre recursos e perfil de trabalho da instância.' },
        { title: 'Backup e restore', description: 'Revisão de políticas, retenção, testes de recuperação e dependências operacionais.' },
        { title: 'Alta disponibilidade e monitoramento', description: 'Avaliação da arquitetura existente, alertas e procedimentos compatíveis com a criticidade contratada.' },
      ]}
      deliverables={[
        'Relatório técnico com evidências de concorrência, planos, recursos e riscos observados.',
        'Plano priorizado de ajustes e investigações adicionais.',
        'Recomendações para manutenção, backup, restore e observabilidade.',
        'Critérios de validação para acompanhar as mudanças aprovadas.',
        'Registro de escopo, premissas, dependências e responsabilidades.',
      ]}
      scopeNote="A análise depende de acessos autorizados, histórico, carga representativa e evidências disponíveis. Ajustes em instância, consultas, índices, TempDB, memória, backup ou alta disponibilidade só são executados quando previstos no escopo e acompanhados de critérios de validação."
      hiringCriteria={[
        'Bloqueios ou deadlocks afetam rotinas críticas com frequência.',
        'Consultas apresentam variação relevante de tempo ou consumo.',
        'TempDB, memória ou armazenamento mostram pressão sem causa consolidada.',
        'Políticas de backup e restore precisam ser revisadas ou testadas.',
        'A arquitetura de disponibilidade e monitoramento precisa acompanhar a criticidade atual.',
      ]}
      faq={[
        { question: 'A análise inclui consultas e planos de execução?', answer: 'Sim, quando as cargas e evidências estiverem no escopo. O conteúdo público não expõe queries, parâmetros ou dados do cliente.' },
        { question: 'Deadlock e bloqueio são tratados da mesma forma?', answer: 'Não. Embora ambos envolvam concorrência, a investigação considera causas, ciclos, duração, padrão transacional e impacto próprios.' },
        { question: 'Backup existente significa que o restore está validado?', answer: 'Não. A capacidade de recuperação depende de testes, integridade, retenção, dependências e objetivos documentados.' },
        { question: 'Alta disponibilidade está incluída automaticamente?', answer: 'Não. Arquitetura, componentes e procedimentos de disponibilidade entram apenas quando definidos no escopo.' },
        { question: 'A triagem substitui um health check?', answer: 'Não. A triagem organiza contexto e prioridade; profundidade, acessos e entregáveis do health check são definidos posteriormente.' },
      ]}
      hub={{ href: '/servicos/dba', label: 'DBA multiplataforma', description: 'Voltar ao hub DBA e comparar SQL Server, Oracle, PostgreSQL e MySQL.' }}
      siblings={[
        { href: '/servicos/dba/oracle', label: 'DBA Oracle', description: 'Performance, recuperação e alta disponibilidade para ambientes Oracle.' },
        { href: '/servicos/dba/postgresql', label: 'DBA PostgreSQL', description: 'Performance, autovacuum, WAL, backup e replicação.' },
        { href: '/servicos/dba/mysql', label: 'DBA MySQL', description: 'InnoDB, performance, recuperação e replicação.' },
      ]}
      cta={CTA_CONFIGS.sqlServer}
      ctaText="Agendar triagem técnica de SQL Server"
      ctaDescription="Priorize os riscos técnicos do seu ambiente SQL Server."
    />
  )
}
