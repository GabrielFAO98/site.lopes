import { Product, Department } from '@/types';
import { DEPARTMENTS } from './departments';
import productsData from '../../data/products.json';

const products: Product[] = productsData as unknown as Product[];

/**
 * Retorna todos os produtos ativos do catálogo
 */
export async function getAllProducts(): Promise<Product[]> {
  return products;
}

/**
 * Busca um produto pelo seu slug amigável
 */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  const product = products.find((p) => p.slug === slug);
  return product || null;
}

/**
 * Busca um produto pelo código SKU
 */
export async function getProductBySku(sku: string): Promise<Product | null> {
  const product = products.find((p) => p.sku === sku);
  return product || null;
}

/**
 * Retorna os produtos marcados como destaque para a Home
 */
export async function getFeaturedProducts(): Promise<Product[]> {
  return products.filter((p) => p.featured);
}

/**
 * Retorna os produtos pertencentes a um departamento específico
 */
export async function getProductsByDepartment(departmentId: string): Promise<Product[]> {
  return products.filter((p) => p.departmentId === departmentId);
}

/**
 * Retorna produtos relacionados / compre junto
 */
export async function getRelatedProducts(product: Product, limit: number = 4): Promise<Product[]> {
  if (product.relatedSkus && product.relatedSkus.length > 0) {
    const related = products.filter((p) => product.relatedSkus?.includes(p.sku));
    if (related.length > 0) return related.slice(0, limit);
  }
  // Fallback: produtos do mesmo departamento
  return products
    .filter((p) => p.departmentId === product.departmentId && p.id !== product.id)
    .slice(0, limit);
}

/**
 * Busca flexível com filtros múltiplos (texto, departamento, marca)
 */
export async function searchProducts(params: {
  query?: string;
  departmentId?: string;
  brand?: string;
  sortBy?: 'price-asc' | 'price-desc' | 'name-asc' | 'featured';
}): Promise<Product[]> {
  let filtered = [...products];

  if (params.departmentId && params.departmentId !== 'todos') {
    filtered = filtered.filter((p) => p.departmentId === params.departmentId);
  }

  if (params.brand && params.brand !== 'todas') {
    filtered = filtered.filter((p) => p.brand.toLowerCase() === params.brand?.toLowerCase());
  }

  if (params.query) {
    const q = params.query.toLowerCase().trim();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.applications.some((app) => app.toLowerCase().includes(q))
    );
  }

  if (params.sortBy) {
    switch (params.sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => (a.price ?? 999999) - (b.price ?? 999999));
        break;
      case 'price-desc':
        filtered.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
        break;
      case 'name-asc':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'featured':
      default:
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }
  }

  return filtered;
}

/**
 * Retorna a lista única de marcas presentes no catálogo
 */
export async function getAllBrands(): Promise<string[]> {
  const brands = new Set(products.map((p) => p.brand));
  return Array.from(brands).sort();
}

/**
 * Retorna os departamentos com contagem de produtos
 */
export async function getDepartmentsWithCount(): Promise<(Department & { count: number })[]> {
  return DEPARTMENTS.map((dept) => ({
    ...dept,
    count: products.filter((p) => p.departmentId === dept.id).length,
  }));
}
