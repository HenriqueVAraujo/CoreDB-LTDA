import type { MetadataRoute } from 'next'

const SITE_URL = 'https://www.coredb.com.br'

export default function sitemap(): MetadataRoute.Sitemap {
  if (process.env.VERCEL_ENV !== 'production') {
    return []
  }

  return [
    {
      url: SITE_URL,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/servicos/consultoria-totvs`,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/servicos/protheus`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/servicos/rm`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/servicos/fluig`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/servicos/dba`,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/servicos/dba/sql-server`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/servicos/dba/oracle`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/servicos/dba/postgresql`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/servicos/dba/mysql`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/servicos/suporte-ams`,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/servicos/desenvolvimento-customizacoes`,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
  ]
}
