// Centralização de rotas e helpers de navegação
export const ROUTES = {
  HOME: '/',
  SERVICE_TOTVS: '/servicos/consultoria-totvs',
  SERVICE_PROTHEUS: '/servicos/protheus',
  SERVICE_RM: '/servicos/rm',
  SERVICE_FLUIG: '/servicos/fluig',
  SERVICE_CUSTOM: '/servicos/desenvolvimento-customizacoes',
  SERVICE_DBA: '/servicos/dba',
  SERVICE_SQL_SERVER: '/servicos/dba/sql-server',
  SERVICE_ORACLE: '/servicos/dba/oracle',
  SERVICE_POSTGRESQL: '/servicos/dba/postgresql',
  SERVICE_MYSQL: '/servicos/dba/mysql',
  SERVICE_AMS: '/servicos/suporte-ams',
  PRIVACY: '/politica-de-privacidade',
  TERMS: '/termos-de-uso',
};

export const getWhatsAppLink = (message: string) =>
  `https://wa.me/553191873435?text=${encodeURIComponent(message)}`;

export type CtaConfig = {
  label: string;
  message: string;
  url: string;
};

const createCtaConfig = (label: string, message: string): CtaConfig => ({
  label,
  message,
  url: getWhatsAppLink(message),
});

export const CTA_CONFIGS = {
  institutional: createCtaConfig(
    'Agendar triagem técnica com a CoreDB — 20 minutos',
    'Olá! Gostaria de agendar uma triagem técnica e entender como a CoreDB pode apoiar nosso ambiente.'
  ),
  totvs: createCtaConfig(
    'Agendar triagem técnica do ambiente TOTVS — 20 minutos',
    'Olá! Gostaria de agendar uma triagem técnica para nosso ambiente TOTVS.'
  ),
  protheus: createCtaConfig(
    'Agendar triagem técnica do Protheus — 20 minutos',
    'Olá! Gostaria de agendar uma triagem técnica para nosso ambiente Protheus.'
  ),
  rm: createCtaConfig(
    'Agendar triagem técnica de risco do RM — 20 minutos',
    'Olá! Gostaria de agendar uma triagem técnica de risco para nosso ambiente TOTVS RM.'
  ),
  fluig: createCtaConfig(
    'Agendar triagem técnica do Fluig — 20 minutos',
    'Olá! Gostaria de agendar uma triagem técnica para nosso ambiente Fluig.'
  ),
  dba: createCtaConfig(
    'Agendar triagem técnica de bancos de dados — 20 minutos',
    'Olá! Gostaria de agendar uma triagem técnica para nosso ambiente de banco de dados.'
  ),
  sqlServer: createCtaConfig(
    'Agendar triagem técnica de SQL Server — 20 minutos',
    'Olá! Gostaria de agendar uma triagem técnica para nosso ambiente SQL Server.'
  ),
  oracle: createCtaConfig(
    'Agendar triagem técnica de Oracle — 20 minutos',
    'Olá! Gostaria de agendar uma triagem técnica para nosso ambiente Oracle.'
  ),
  postgresql: createCtaConfig(
    'Agendar triagem técnica de PostgreSQL — 20 minutos',
    'Olá! Gostaria de agendar uma triagem técnica para nosso ambiente PostgreSQL.'
  ),
  mysql: createCtaConfig(
    'Agendar triagem técnica de MySQL — 20 minutos',
    'Olá! Gostaria de agendar uma triagem técnica para nosso ambiente MySQL.'
  ),
  development: createCtaConfig(
    'Agendar triagem de desenvolvimento e integrações — 20 minutos',
    'Olá! Gostaria de conversar sobre uma customização, API ou integração para nosso ambiente.'
  ),
  ams: createCtaConfig(
    'Agendar triagem de suporte AMS — 20 minutos',
    'Olá! Gostaria de agendar uma triagem sobre suporte AMS e governança operacional.'
  ),
} as const;

const CTA_CONFIG_BY_ROUTE: Record<string, CtaConfig> = {
  [ROUTES.SERVICE_TOTVS]: CTA_CONFIGS.totvs,
  [ROUTES.SERVICE_PROTHEUS]: CTA_CONFIGS.protheus,
  [ROUTES.SERVICE_RM]: CTA_CONFIGS.rm,
  [ROUTES.SERVICE_FLUIG]: CTA_CONFIGS.fluig,
  [ROUTES.SERVICE_DBA]: CTA_CONFIGS.dba,
  [ROUTES.SERVICE_SQL_SERVER]: CTA_CONFIGS.sqlServer,
  [ROUTES.SERVICE_ORACLE]: CTA_CONFIGS.oracle,
  [ROUTES.SERVICE_POSTGRESQL]: CTA_CONFIGS.postgresql,
  [ROUTES.SERVICE_MYSQL]: CTA_CONFIGS.mysql,
  [ROUTES.SERVICE_CUSTOM]: CTA_CONFIGS.development,
  [ROUTES.SERVICE_AMS]: CTA_CONFIGS.ams,
};

export const getCtaConfig = (pathname?: string | null): CtaConfig => {
  const normalizedPath =
    pathname && pathname !== '/' ? pathname.replace(/\/+$/, '') : pathname;

  return (normalizedPath && CTA_CONFIG_BY_ROUTE[normalizedPath]) || CTA_CONFIGS.institutional;
};
