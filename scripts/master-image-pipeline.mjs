import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';
import { downloads } from './download-sources.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const produtosDir = path.resolve(__dirname, '../public/images/produtos');
const productsJsonPath = path.resolve(__dirname, '../data/products.json');

if (!fs.existsSync(produtosDir)) {
  fs.mkdirSync(produtosDir, { recursive: true });
}

// Função para buscar buffer com timeout e fallback
async function fetchImageBuffer(urls) {
  for (const url of urls) {
    try {
      console.log(`   Tentando baixar: ${url.slice(0, 80)}...`);
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 12000);
      const res = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8'
        },
        signal: controller.signal
      });
      clearTimeout(timeout);

      if (!res.ok) {
        console.warn(`   ⚠️ Status ${res.status} em ${url}`);
        continue;
      }
      const arrayBuffer = await res.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      if (buffer.length > 1000) {
        return buffer;
      }
    } catch (err) {
      console.warn(`   ⚠️ Falha ao baixar ${url}: ${err.message}`);
    }
  }
  return null;
}

// Função para enquadrar perfeitamente a imagem em quadrado 800x800 com respiro
async function processAndSaveImage(inputBuffer, targetPath) {
  try {
    // Redimensiona o produto para caber dentro de 720x720 mantendo proporção,
    // com fundo branco sólido (#ffffff), e estende 40px em cada borda totalizando 800x800.
    const processedBuffer = await sharp(inputBuffer)
      .flatten({ background: { r: 255, g: 255, b: 255 } })
      .resize(720, 720, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 1 }
      })
      .extend({
        top: 40,
        bottom: 40,
        left: 40,
        right: 40,
        background: { r: 255, g: 255, b: 255, alpha: 1 }
      })
      .webp({ quality: 85 })
      .toBuffer();

    fs.writeFileSync(targetPath, processedBuffer);
    return true;
  } catch (err) {
    console.error(`❌ Erro no sharp para ${targetPath}:`, err.message);
    return false;
  }
}

async function runPipeline() {
  console.log('🚀 Iniciando Master Pipeline de Imagens...');
  const products = JSON.parse(fs.readFileSync(productsJsonPath, 'utf-8'));
  const newProductImageMap = {}; // sku -> array de novas urls

  // ==========================================
  // ETAPA 1: Baixar e processar os 13 produtos que tinham placeholder
  // ==========================================
  console.log('\n--- ETAPA 1: Baixando imagens oficiais para os 13 produtos ---');
  for (const item of downloads) {
    console.log(`\n📦 Processando SKU ${item.sku}...`);
    const finalImageUrls = [];

    for (let i = 0; i < item.images.length; i++) {
      const imgConfig = item.images[i];
      const targetPath = path.join(produtosDir, imgConfig.filename);
      console.log(` -> Imagem [${i + 1}/${item.images.length}]: ${imgConfig.filename}`);

      const buffer = await fetchImageBuffer(imgConfig.urls);
      if (buffer) {
        const ok = await processAndSaveImage(buffer, targetPath);
        if (ok) {
          finalImageUrls.push(`/images/produtos/${imgConfig.filename}`);
          console.log(`    ✅ Sucesso! Salvo em ${imgConfig.filename}`);
        } else {
          console.error(`    ❌ Falha ao processar com sharp: ${imgConfig.filename}`);
        }
      } else {
        console.error(`    ❌ Nenhum dos links respondeu para ${imgConfig.filename}`);
      }
    }

    if (finalImageUrls.length > 0) {
      newProductImageMap[item.sku] = finalImageUrls;
    }
  }

  // ==========================================
  // ETAPA 2: Processar todas as imagens já existentes (converter para webp 800x800 + SEO)
  // ==========================================
  console.log('\n--- ETAPA 2: Padronizando imagens locais existentes para .webp 800x800 e SEO ---');
  for (const product of products) {
    // Se já foi processado na Etapa 1, pula
    if (newProductImageMap[product.sku]) continue;

    const finalImageUrls = [];
    for (let i = 0; i < product.images.length; i++) {
      const oldUrl = product.images[i];
      // Ignora placeholders remanescentes se houver
      if (oldUrl.includes('http')) continue;

      const oldFilename = path.basename(oldUrl);
      const oldFilePath = path.join(produtosDir, oldFilename);

      if (!fs.existsSync(oldFilePath)) {
        console.warn(`⚠️ Arquivo não encontrado: ${oldFilePath}`);
        continue;
      }

      // Nome SEO padronizado
      const suffix = i === 0 ? '' : `-${i + 1}`;
      const newFilename = `${product.slug}${suffix}.webp`;
      const newFilePath = path.join(produtosDir, newFilename);

      console.log(`🔄 Convertendo: ${oldFilename} -> ${newFilename}`);
      const inputBuffer = fs.readFileSync(oldFilePath);
      const ok = await processAndSaveImage(inputBuffer, newFilePath);

      if (ok) {
        finalImageUrls.push(`/images/produtos/${newFilename}`);
      } else {
        console.error(`❌ Falha ao converter ${oldFilename}`);
      }
    }

    if (finalImageUrls.length > 0) {
      newProductImageMap[product.sku] = finalImageUrls;
    }
  }

  // ==========================================
  // ETAPA 3: Atualizar data/products.json
  // ==========================================
  console.log('\n--- ETAPA 3: Atualizando data/products.json ---');
  let updatedCount = 0;
  for (const product of products) {
    if (newProductImageMap[product.sku] && newProductImageMap[product.sku].length > 0) {
      product.images = newProductImageMap[product.sku];
      updatedCount++;
    }
  }

  fs.writeFileSync(productsJsonPath, JSON.stringify(products, null, 2), 'utf-8');
  console.log(`✅ ${updatedCount}/${products.length} produtos atualizados em data/products.json!`);

  // ==========================================
  // ETAPA 4: Limpeza de arquivos antigos (opcional e segura)
  // ==========================================
  console.log('\n--- ETAPA 4: Verificando imagens em uso ---');
  const allUsedImages = new Set();
  products.forEach(p => p.images.forEach(img => allUsedImages.add(path.basename(img))));

  const allFilesInDir = fs.readdirSync(produtosDir);
  let removedCount = 0;
  for (const file of allFilesInDir) {
    if (!allUsedImages.has(file)) {
      // Remove arquivos antigos que não são mais referenciados
      const filePath = path.join(produtosDir, file);
      try {
        fs.unlinkSync(filePath);
        removedCount++;
      } catch (e) {
        console.warn(`Não foi possível remover ${file}: ${e.message}`);
      }
    }
  }
  console.log(`🧹 Limpeza concluída: ${removedCount} imagens legadas removidas. ${allUsedImages.size} imagens ativas mantidas.`);
  console.log('\n🎉 Pipeline finalizado com sucesso!');
}

runPipeline().catch(console.error);
