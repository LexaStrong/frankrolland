import { db } from '@/lib/data';

export default function sitemap() {
  const baseUrl = 'https://frankrolland.com';

  const properties = db.properties.map((p) => ({
    url: `${baseUrl}/properties/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const funds = db.funds.map((f) => ({
    url: `${baseUrl}/invest/${f.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const agents = db.agents.map((a) => ({
    url: `${baseUrl}/brokerage/${a.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const projects = db.projects.map((p) => ({
    url: `${baseUrl}/build/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const staticRoutes = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${baseUrl}/properties`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/invest`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/brokerage`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/build`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
  ];

  return [...staticRoutes, ...properties, ...funds, ...agents, ...projects];
}
