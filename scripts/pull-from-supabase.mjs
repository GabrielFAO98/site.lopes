import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function loadEnvLocal() {
  const envPath = path.resolve(__dirname, '../.env.local');
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf-8').split('\n');
    for (const line of lines) {
      const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
      if (match) {
        const key = match[1];
        let val = (match[2] || '').trim();
        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
          val = val.slice(1, -1);
        }
        if (!process.env[key]) {
          process.env[key] = val;
        }
      }
    }
  }
}
loadEnvLocal();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Erro: Configure NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY no arquivo .env.local!');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function pullProducts() {
  console.log('🔄 Buscando produtos cadastrados no Supabase...');

  const { data, error } = await supabase
    .from('produtos')
    .select('*')
    .order('id', { ascending: true });

  if (error) {
    console.error('❌ Erro ao buscar produtos:', error.message);
    process.exit(1);
  }

  if (!data || data.length === 0) {
    console.warn('⚠️ Nenhum produto encontrado no Supabase.');
    return;
  }

  const mapped = data.map((row) => ({
    id: row.id,
    sku: row.sku,
    name: row.name,
    slug: row.slug,
    description: row.description || '',
    price: row.price !== null && row.price !== undefined ? Number(row.price) : null,
    unit: row.unit || 'UN',
    departmentId: row.department_id,
    departmentName: row.department_name,
    category: row.category,
    brand: row.brand,
    inStock: Boolean(row.in_stock),
    stockBadge: row.stock_badge || null,
    featured: Boolean(row.featured),
    images: Array.isArray(row.images) ? row.images : [],
    technicalSpecs: row.technical_specs || {},
    applications: Array.isArray(row.applications) ? row.applications : [],
    warranty: row.warranty || '',
    relatedSkus: Array.isArray(row.related_skus) ? row.related_skus : [],
    variationType: row.variation_type || undefined,
    variations: Array.isArray(row.variations) ? row.variations : [],
    detailedDescription: row.detailed_description || undefined,
    yieldInfo: row.yield_info || undefined,
    faq: Array.isArray(row.faq) ? row.faq : undefined,
  }));

  const jsonPath = path.resolve(__dirname, '../data/products.json');
  fs.writeFileSync(jsonPath, JSON.stringify(mapped, null, 2), 'utf-8');

  console.log(`✅ Sucesso! ${mapped.length} produtos baixados do Supabase e salvos em data/products.json`);
}

pullProducts().catch(console.error);
