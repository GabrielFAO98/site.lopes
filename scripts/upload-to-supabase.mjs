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

async function syncProducts() {
  const jsonPath = path.resolve(__dirname, '../data/products.json');
  const products = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

  console.log(`🚀 Iniciando upload de ${products.length} produtos para o Supabase...`);

  for (const p of products) {
    const row = {
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
    };

    const { error } = await supabase
      .from('produtos')
      .upsert(row, { onConflict: 'sku' });

    if (error) {
      console.error(`❌ Erro ao enviar produto ${p.sku} (${p.name}):`, error.message);
    } else {
      console.log(`✅ [SKU ${p.sku}] ${p.name} sincronizado com sucesso!`);
    }
  }

  console.log('\n🎉 Todos os produtos foram sincronizados no Supabase!');
}

syncProducts().catch(console.error);
