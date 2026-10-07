import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseUrl = 'https://site-lopes-eight.vercel.app';
const products = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/products.json'), 'utf-8'));

const departments = [
  'construcao-basica',
  'pisos-e-revestimentos',
  'quimicos-e-adesivos',
  'pintura',
  'hidraulica',
  'eletrica',
  'banheiro-e-cozinha',
  'ferramentas',
  'ferragens',
  'jardim-e-utilidades'
];

let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

// Páginas institucionais
xml += `  <url>\n    <loc>${baseUrl}</loc>\n    <changefreq>daily</changefreq>\n    <priority>1.0</priority>\n  </url>\n`;
xml += `  <url>\n    <loc>${baseUrl}/produtos</loc>\n    <changefreq>daily</changefreq>\n    <priority>0.9</priority>\n  </url>\n`;

// Departamentos
for (const dep of departments) {
  xml += `  <url>\n    <loc>${baseUrl}/produtos?depto=${dep}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.9</priority>\n  </url>\n`;
}

// Produtos
for (const p of products) {
  xml += `  <url>\n    <loc>${baseUrl}/produto/${p.slug}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
}

xml += `</urlset>\n`;

fs.writeFileSync(path.resolve(__dirname, '../public/sitemap.xml'), xml, 'utf-8');
console.log(`✅ Sitemap regenerado com sucesso para ${products.length} produtos e ${departments.length + 2} páginas institucionais.`);
