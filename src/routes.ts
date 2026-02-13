// Centralização de rotas e helpers de navegação
export const ROUTES = {
  HOME: '/',
  SERVICES: '/servicos',
  SERVICE_TOTVS: '/servicos/consultoria-totvs',
  SERVICE_CUSTOM: '/servicos/desenvolvimento-customizacoes',
  SERVICE_DBA: '/servicos/dba',
  CONTACT: '/contato',
  PRIVACY: '/politica-de-privacidade',
  TERMS: '/termos-de-uso',
};

export const getWhatsAppLink = (message: string) =>
  `https://wa.me/553191873435?text=${encodeURIComponent(message)}`;
