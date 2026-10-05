import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const jsonPath = path.resolve(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
const baseUrl = 'https://site-lopes-eight.vercel.app';

const urls = [
  { loc: baseUrl, priority: '1.0', changefreq: 'daily' },
  { loc: `${baseUrl}/produtos`, priority: '0.9', changefreq: 'daily' }
];

const depts = [
  'construcao-basica',
  'hidraulica',
  'eletrica',
  'tintas-e-acessorios',
  'ferramentas',
  'ferragens-e-fixacao',
  'acabamentos'
];

depts.forEach(d => {
  urls.push({ loc: `${baseUrl}/produtos?depto=${d}`, priority: '0.9', changefreq: 'weekly' });
});

products.forEach(p => {
  urls.push({ loc: `${baseUrl}/produto/${p.slug}`, priority: '0.8', changefreq: 'weekly' });
});

const xmlLines = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...urls.map(u => `  <url>
    <loc>${u.loc}</loc>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`),
  '</urlset>'
];

const outputPath = path.resolve(__dirname, '../public/sitemap.xml');
fs.writeFileSync(outputPath, xmlLines.join('\n'));
console.log(`✅ sitemap.xml gerado com sucesso com ${urls.length} rotas em public/sitemap.xml`);
