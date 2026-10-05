import { MetadataRoute } from 'next';
import { getAllProducts } from '@/lib/db';
import { DEPARTMENTS } from '@/lib/departments';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const products = await getAllProducts();

  const productUrls = products.map((product) => ({
    url: `${baseUrl}/produto/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const departmentUrls = DEPARTMENTS.map((dept) => ({
    url: `${baseUrl}/produtos?depto=${dept.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/produtos`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    ...departmentUrls,
    ...productUrls,
  ];
}
