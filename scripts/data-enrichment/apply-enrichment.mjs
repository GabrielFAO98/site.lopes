import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';

import { construcaoBasicaData } from './01-construcao-basica.mjs';
import { quimicosEFixacaoData } from './02-quimicos-e-fixacao.mjs';
import { hidraulicaEEletricaData } from './03-hidraulica-e-eletrica.mjs';
import { tintasEFerramentasData } from './04-tintas-e-ferramentas.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const enrichmentMap = {
  ...construcaoBasicaData,
  ...quimicosEFixacaoData,
  ...hidraulicaEEletricaData,
  ...tintasEFerramentasData,
};

console.log(`📦 Carregados ${Object.keys(enrichmentMap).length} itens no mapa de enriquecimento.`);

const jsonPath = path.resolve(__dirname, '../../data/products.json');
const products = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

let updatedCount = 0;
for (const p of products) {
  const enrich = enrichmentMap[p.sku];
  if (enrich) {
    p.detailedDescription = enrich.detailedDescription;
    p.faq = enrich.faq;
    updatedCount++;
    console.log(`✨ Enriquecido SKU ${p.sku}: ${p.name} (FAQ: ${p.faq.length} perguntas)`);
  } else if (p.sku === '100502') {
    console.log(`✅ SKU 100502: ${p.name} (já enriquecido anteriormente)`);
  } else {
    console.warn(`⚠️ SKU não encontrado nos módulos: ${p.sku} - ${p.name}`);
  }
}

fs.writeFileSync(jsonPath, JSON.stringify(products, null, 2), 'utf8');
console.log(`\n💾 data/products.json atualizado com sucesso! (${updatedCount} novos itens enriquecidos)`);

// -------------------------------------------------------------
// Sincronização direta com o Supabase
// -------------------------------------------------------------
function loadEnvLocal() {
  const envPath = path.resolve(__dirname, '../../.env.local');
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
  console.error('❌ Erro: Configure NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY no .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function syncAndVerify() {
  console.log(`\n🚀 Enviando todos os ${products.length} produtos para o Supabase...`);

  let successCount = 0;
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
      console.error(`❌ Erro no SKU ${p.sku} (${p.name}):`, error.message);
    } else {
      successCount++;
    }
  }

  console.log(`\n✅ ${successCount} de ${products.length} produtos sincronizados com sucesso no Supabase!`);

  // Verificação no Supabase
  console.log('\n🔍 Verificando banco de dados no Supabase...');
  const { data, error } = await supabase
    .from('produtos')
    .select('sku, name, detailed_description, faq');

  if (error) {
    console.error('❌ Erro ao consultar Supabase para verificação:', error.message);
    return;
  }

  const withDesc = data.filter((d) => d.detailed_description && d.detailed_description.trim().length > 0);
  const withFaq = data.filter((d) => Array.isArray(d.faq) && d.faq.length > 0);

  console.log(`📊 Total de produtos no Supabase: ${data.length}`);
  console.log(`📝 Produtos com Descrição Detalhada preenchida: ${withDesc.length} / ${data.length}`);
  console.log(`❓ Produtos com FAQ preenchido: ${withFaq.length} / ${data.length}`);

  if (withDesc.length === data.length && withFaq.length === data.length) {
    console.log('\n🎉 SUCESSO TOTAL! 100% dos produtos no Supabase possuem Descrição Detalhada e FAQ!');
  } else {
    const missing = data.filter((d) => !d.detailed_description || !d.faq || d.faq.length === 0);
    console.warn('⚠️ Produtos com campos pendentes:', missing.map((m) => `${m.sku} - ${m.name}`));
  }
}

syncAndVerify().catch(console.error);

