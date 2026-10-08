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

async function syncCatalog() {
  const jsonPath = path.resolve(__dirname, '../data/products.json');
  const products = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

  console.log(`🚀 Sincronizando catálogo completo de ${products.length} produtos com o Supabase...`);

  // Como vários SKUs mudaram (de IDs/SKUs temporários para os SKUs reais do ERP),
  // fazemos a limpeza da tabela e reinserção dos 68 itens atualizados para evitar conflito de chaves únicas.
  console.log('🧹 Limpando produtos antigos do Supabase para atualizar SKUs com segurança...');
  const { error: delError } = await supabase.from('produtos').delete().neq('id', 'dummy-never-matches');
  if (delError) {
    console.warn('Aviso na limpeza:', delError.message);
  }

  const rows = products.map(p => ({
    id: p.id,
    sku: p.sku,
    name: p.name,
    slug: p.slug,
    description: p.description,
    price: p.price,
    unit: p.unit,
    department_id: p.departmentId,
    department_name: p.departmentName,
    category: p.category,
    brand: p.brand,
    in_stock: p.inStock,
    stock_badge: p.stockBadge,
    featured: p.featured,
    images: p.images,
    technical_specs: p.technicalSpecs,
    applications: p.applications,
    warranty: p.warranty,
    related_skus: p.relatedSkus || [],
    variation_type: p.variationType || null,
    variations: p.variations || [],
    detailed_description: p.detailedDescription || null,
    yield_info: p.yieldInfo || null,
    faq: p.faq || [],
    updated_at: new Date().toISOString(),
  }));

  // Inserir em lotes
  const batchSize = 25;
  for (let i = 0; i < rows.length; i += batchSize) {
    const batch = rows.slice(i, i + batchSize);
    const { error: insError } = await supabase.from('produtos').insert(batch);
    if (insError) {
      console.error(`❌ Erro no lote ${i + 1}-${i + batch.length}:`, insError.message);
    } else {
      console.log(`✅ Lote ${i + 1}-${Math.min(i + batchSize, rows.length)} inserido com sucesso!`);
    }
  }

  // Verificar contagem final
  const { count, error: countError } = await supabase
    .from('produtos')
    .select('*', { count: 'exact', head: true });

  if (countError) {
    console.error('Erro ao verificar contagem:', countError.message);
  } else {
    console.log(`\n🎉 Catálogo 100% sincronizado no Supabase! Total de itens: ${count}`);
  }
}

syncCatalog().catch(console.error);

