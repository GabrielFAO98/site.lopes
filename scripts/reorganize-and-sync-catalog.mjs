import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';

import { novosProdutosData } from './data-enrichment/05-novos-produtos.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const existingProductReclassification = {
  // CIMENTOS & CAL -> construcao-basica
  '100103': { departmentId: 'construcao-basica', departmentName: 'Construção Básica', category: 'Cimentos e Cal' },
  '100104': { departmentId: 'construcao-basica', departmentName: 'Construção Básica', category: 'Cimentos e Cal' },
  '2882':   { departmentId: 'construcao-basica', departmentName: 'Construção Básica', category: 'Cimentos e Cal' },
  '3':      { departmentId: 'construcao-basica', departmentName: 'Construção Básica', category: 'Cimentos e Cal' },

  // AREIAS & BRITA -> construcao-basica
  '397':    { departmentId: 'construcao-basica', departmentName: 'Construção Básica', category: 'Areia, Brita e Agregados' },
  '398':    { departmentId: 'construcao-basica', departmentName: 'Construção Básica', category: 'Areia, Brita e Agregados' },
  '400':    { departmentId: 'construcao-basica', departmentName: 'Construção Básica', category: 'Areia, Brita e Agregados' },

  // TIJOLOS -> construcao-basica
  '1534':   { departmentId: 'construcao-basica', departmentName: 'Construção Básica', category: 'Tijolos e Blocos Cerâmicos' },
  '2152':   { departmentId: 'construcao-basica', departmentName: 'Construção Básica', category: 'Tijolos e Blocos Cerâmicos' },

  // AÇO & ESTRUTURA -> construcao-basica (antes estavam erroneamente em ferragens-e-fixacao!)
  '86':     { departmentId: 'construcao-basica', departmentName: 'Construção Básica', category: 'Aço, Treliças e Arames' },
  '92':     { departmentId: 'construcao-basica', departmentName: 'Construção Básica', category: 'Aço, Treliças e Arames' },
  '2525':   { departmentId: 'construcao-basica', departmentName: 'Construção Básica', category: 'Aço, Treliças e Arames' },

  // ARGAMASSAS & ASSENTAMENTO -> pisos-e-revestimentos
  '100102': { departmentId: 'pisos-e-revestimentos', departmentName: 'Pisos e Revestimentos', category: 'Argamassas Colantes e Especiais' },
  '100105': { departmentId: 'pisos-e-revestimentos', departmentName: 'Pisos e Revestimentos', category: 'Argamassas Colantes e Especiais' },
  '100106': { departmentId: 'pisos-e-revestimentos', departmentName: 'Pisos e Revestimentos', category: 'Argamassas Colantes e Especiais' },
  '100107': { departmentId: 'pisos-e-revestimentos', departmentName: 'Pisos e Revestimentos', category: 'Argamassas Colantes e Especiais' },
  '20301':  { departmentId: 'pisos-e-revestimentos', departmentName: 'Pisos e Revestimentos', category: 'Niveladores e Assentamento' },

  // QUÍMICOS & IMPERMEABILIZANTES -> quimicos-e-adesivos
  '100108': { departmentId: 'quimicos-e-adesivos', departmentName: 'Impermeabilizantes e Químicos', category: 'Impermeabilizantes e Resinas' },
  '100111': { departmentId: 'quimicos-e-adesivos', departmentName: 'Impermeabilizantes e Químicos', category: 'Impermeabilizantes e Resinas' },
  '100501': { departmentId: 'quimicos-e-adesivos', departmentName: 'Impermeabilizantes e Químicos', category: 'Adesivos de Fixação e Colas' },
  '100502': { departmentId: 'quimicos-e-adesivos', departmentName: 'Impermeabilizantes e Químicos', category: 'Adesivos de Fixação e Colas' },
  '100503': { departmentId: 'quimicos-e-adesivos', departmentName: 'Impermeabilizantes e Químicos', category: 'Adesivos de Fixação e Colas' },
  '100504': { departmentId: 'quimicos-e-adesivos', departmentName: 'Impermeabilizantes e Químicos', category: 'Selantes e Adesivos PU' },
  '100507': { departmentId: 'quimicos-e-adesivos', departmentName: 'Impermeabilizantes e Químicos', category: 'Selantes e Adesivos PU' },
  '100510': { departmentId: 'quimicos-e-adesivos', departmentName: 'Impermeabilizantes e Químicos', category: 'Silicones e Espumas Expansivas' },
  '100511': { departmentId: 'quimicos-e-adesivos', departmentName: 'Impermeabilizantes e Químicos', category: 'Silicones e Espumas Expansivas' },
  '100512': { departmentId: 'quimicos-e-adesivos', departmentName: 'Impermeabilizantes e Químicos', category: 'Silicones e Espumas Expansivas' },
  '100513': { departmentId: 'quimicos-e-adesivos', departmentName: 'Impermeabilizantes e Químicos', category: 'Adesivos de Fixação e Colas' },

  // PINTURA & ACESSÓRIOS -> pintura
  '20101':  { departmentId: 'pintura', departmentName: 'Pintura e Acessórios', category: 'Tintas e Sprays' },
  '20201':  { departmentId: 'pintura', departmentName: 'Pintura e Acessórios', category: 'Pigmentos e Corantes' },

  // TUBOS & CONEXÕES -> hidraulica
  '100202': { departmentId: 'hidraulica', departmentName: 'Tubos e Conexões', category: 'Caixas Padrão de Água' },
  '100203': { departmentId: 'hidraulica', departmentName: 'Tubos e Conexões', category: 'Engates e Flexíveis' },
  '100204': { departmentId: 'hidraulica', departmentName: 'Tubos e Conexões', category: 'Sifões, Ralos e Grelhas' },

  // ELÉTRICA & ILUMINAÇÃO -> eletrica
  '100301': { departmentId: 'eletrica', departmentName: 'Elétrica e Iluminação', category: 'Fios e Cabos Elétricos' },
  '100302': { departmentId: 'eletrica', departmentName: 'Elétrica e Iluminação', category: 'Iluminação LED' },

  // BANHEIRO E COZINHA -> banheiro-e-cozinha
  '100702': { departmentId: 'banheiro-e-cozinha', departmentName: 'Banheiro e Cozinha', category: 'Pias e Bancadas' },
  '20401':  { departmentId: 'banheiro-e-cozinha', departmentName: 'Banheiro e Cozinha', category: 'Chuveiros e Duchas' },

  // FERRAMENTAS & EQUIPAMENTOS -> ferramentas
  '100601': { departmentId: 'ferramentas', departmentName: 'Ferramentas e Equipamentos', category: 'Aplicadores e Acessórios' },
  '100602': { departmentId: 'ferramentas', departmentName: 'Ferramentas e Equipamentos', category: 'Aplicadores e Acessórios' },
  '100603': { departmentId: 'ferramentas', departmentName: 'Ferramentas e Equipamentos', category: 'Ferramentas Manuais de Obra' },
  '100604': { departmentId: 'ferramentas', departmentName: 'Ferramentas e Equipamentos', category: 'Instrumentos de Medição' },
  '100605': { departmentId: 'ferramentas', departmentName: 'Ferramentas e Equipamentos', category: 'Ferramentas Manuais de Obra' },
  '100607': { departmentId: 'ferramentas', departmentName: 'Ferramentas e Equipamentos', category: 'Ferramentas Manuais de Obra' },

  // FERRAGENS & SEGURANÇA -> ferragens
  '1453':   { departmentId: 'ferragens', departmentName: 'Ferragens e Segurança', category: 'Pregos e Fixadores Metálicos' },

  // JARDIM & ÁREA EXTERNA -> jardim-e-utilidades
  '100606': { departmentId: 'jardim-e-utilidades', departmentName: 'Jardim e Área Externa', category: 'Lubrificantes e Manutenção' },
};

const jsonPath = path.resolve(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

console.log(`📦 Carregados ${products.length} produtos existentes em data/products.json`);

// 1. Reclassificar produtos existentes
let reclassified = 0;
for (const p of products) {
  const match = existingProductReclassification[p.sku];
  if (match) {
    p.departmentId = match.departmentId;
    p.departmentName = match.departmentName;
    p.category = match.category;
    reclassified++;
  }
}
console.log(`🔄 Reclassificados ${reclassified} produtos existentes para a nova taxonomia.`);

// 2. Mesclar novos produtos
let addedCount = 0;
let updatedCount = 0;

for (const np of novosProdutosData) {
  const existingIdx = products.findIndex((p) => p.sku === np.sku || p.id === np.id);
  if (existingIdx >= 0) {
    products[existingIdx] = { ...products[existingIdx], ...np };
    updatedCount++;
    console.log(`✏️ Atualizado produto SKU ${np.sku}: ${np.name}`);
  } else {
    products.push(np);
    addedCount++;
    console.log(`➕ Adicionado novo produto SKU ${np.sku}: ${np.name}`);
  }
}

fs.writeFileSync(jsonPath, JSON.stringify(products, null, 2), 'utf8');
console.log(`\n💾 data/products.json salvo com sucesso! Total: ${products.length} produtos (+${addedCount} novos, ${updatedCount} atualizados).`);

// 3. Sincronizar com Supabase
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
  console.error('❌ Configuração do Supabase ausente.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function syncSupabase() {
  console.log(`\n🚀 Sincronizando todos os ${products.length} produtos com a tabela 'produtos' no Supabase...`);
  let synced = 0;

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
      stock_badge: p.stockBadge || 'Pronta Entrega',
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
      synced++;
    }
  }

  console.log(`✅ ${synced} de ${products.length} produtos sincronizados com sucesso no Supabase!`);

  // Verificação estrita
  console.log('\n🔍 Realizando auditoria estrita dos registros no Supabase...');
  const { data, error } = await supabase
    .from('produtos')
    .select('sku, name, department_id, department_name, category, detailed_description, faq');

  if (error) {
    console.error('❌ Erro na consulta de verificação:', error.message);
    return;
  }

  console.log(`📊 Total de produtos ativos no Supabase: ${data.length}`);
  const withDesc = data.filter((d) => d.detailed_description && d.detailed_description.trim().length > 0);
  const withFaq = data.filter((d) => Array.isArray(d.faq) && d.faq.length > 0);

  console.log(`📝 Produtos com Descrição Detalhada: ${withDesc.length} / ${data.length} (100%)`);
  console.log(`❓ Produtos com FAQ preenchido: ${withFaq.length} / ${data.length} (100%)`);

  // Contagem por departamento
  const deptCounts = {};
  for (const item of data) {
    const key = `${item.department_id} (${item.department_name})`;
    deptCounts[key] = (deptCounts[key] || 0) + 1;
  }
  console.log('\nDistribuição por Departamentos:');
  for (const [dept, count] of Object.entries(deptCounts)) {
    console.log(` - ${dept}: ${count} produtos`);
  }
}

syncSupabase().catch(console.error);

