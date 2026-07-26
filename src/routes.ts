// Centralização de rotas e helpers de navegação
export const ROUTES = {
  HOME: '/',
  SERVICE_TOTVS: '/servicos/consultoria-totvs',
  SERVICE_CUSTOM: '/servicos/desenvolvimento-customizacoes',
  SERVICE_DBA: '/servicos/dba',
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
  dba: createCtaConfig(
    'Agendar triagem técnica de bancos de dados — 20 minutos',
    'Olá! Gostaria de agendar uma triagem técnica para nosso ambiente de banco de dados.'
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
  [ROUTES.SERVICE_DBA]: CTA_CONFIGS.dba,
  [ROUTES.SERVICE_CUSTOM]: CTA_CONFIGS.development,
  [ROUTES.SERVICE_AMS]: CTA_CONFIGS.ams,
};

export const getCtaConfig = (pathname?: string | null): CtaConfig => {
  const normalizedPath =
    pathname && pathname !== '/' ? pathname.replace(/\/+$/, '') : pathname;

  return (normalizedPath && CTA_CONFIG_BY_ROUTE[normalizedPath]) || CTA_CONFIGS.institutional;
};
