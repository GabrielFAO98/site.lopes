import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outputDir = path.resolve(__dirname, '../public/images/produtos');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const downloads = [
  {
    filename: 'adesivo-plastico-pvc-amanco-bisnaga-17g.webp',
    urls: [
      'https://images.tcdn.com.br/img/img_prod/1188455/adesivo_plastico_amanco_bisnaga_17g_embalagem_individual_cod_90059_98003_34821_1_98f9783a8057c978a1b2f5724c87d58a.jpg',
      'https://casatognini.com.br/image/cache/catalog/amanco/98003-1000x1000.jpg',
      'https://images.tcdn.com.br/img/img_prod/1048279/adesivo_plastico_amanco_17g_1_b32e011d61993202e86dbfa66e0a4f52.png'
    ]
  },
  {
    filename: 'adesivo-plastico-pvc-amanco-bisnaga-75g.webp',
    urls: [
      'https://lojadicasa.fbitsstatic.net/img/p/adesivo-plast.bisnaga-amanco-75g-98004-70681/257190.jpg?w=1200&h=1200&v=no-change&qs=ignore',
      'https://cdn.awsli.com.br/600x700/1552/1552815/produto/89372037/79fc5b4810.jpg',
      'https://d2l6qh3bt135o5.cloudfront.net/Custom/Content/Products/50/48/50482_adesivo-plastico-bisnaga-75g-98004-amanco-pr-13145-98004_m1_638024023644550966.webp'
    ]
  },
  {
    filename: 'adesivo-plastico-pvc-amanco-frasco-175g.webp',
    urls: [
      'https://cdn.leroymerlin.com.br/products/amanco_adesivo_plastico_para_tubos_e_conexoes_de_pvc175g_1570355860_9e02_600x600.jpg',
      'https://d2l6qh3bt135o5.cloudfront.net/Custom/Content/Products/50/48/50484_cola-adesivo-plastico-frasco-175g-com-pincel-90061-amanco_m3_639104605273197175.webp',
      'https://images.tcdn.com.br/img/img_prod/1048279/adesivo_plastico_amanco_175g_1_76cbe37a93a406e107f9c211ff18d451.png'
    ]
  },
  {
    filename: 'adesivo-plastico-pvc-amanco-frasco-850g.webp',
    urls: [
      'https://images.tcdn.com.br/img/img_prod/1478508/adesivo_frasco_pincel_amanco_850g_2705_1_90571a36f6458ea757806b20ca541b1a.jpg',
      'https://images.tcdn.com.br/img/img_prod/770809/cola_adesivo_pvc_pincel_850g_amanco_35377_1_1cc56a781ebaef1bf40e1262fcfbcd64.jpg',
      'https://www.cassol.com.br/media/catalog/product/cache/ae23a9b10c9c149bebc298aa7ed9024c/2/0/2074313_1.jpg'
    ]
  },
  {
    filename: 'adesivo-cpvc-amanco-flowguard-175g.webp',
    urls: [
      'https://lojaobramax.vtexassets.com/arquivos/ids/51954891-800-800?v=639269930733600000&width=800&height=800&aspect=true',
      'https://casamimosa1.vtexassets.com/arquivos/ids/216741-800-800?v=638629794179970000&width=800&height=800&aspect=true',
      'https://abcdaconstrucao.fbitsstatic.net/img/p/adesivo-plastico-cpvc-175g-com-pincel-amanco-88695/275201-1.jpg?w=530&h=530&v=202610050659'
    ]
  },
  {
    filename: 'graxa-azul-unilit-blue-500g-ingrax.webp',
    urls: [
      'https://ferramentasgerais.vteximg.com.br/arquivos/ids/1033812/Graxa-unilit-blue-NLGI-2---500-g-INGRAX---16325---INGRAX.jpg?v=638929579673170000',
      'https://hiperfer.cdn.magazord.com.br/img/2024/06/produto/14786/15663-graxa-unilit-blue-500g-multiuso-ingrax.jpg?ims=800x800',
      'https://cdn.awsli.com.br/2696/2696181/produto/24947686984c161b4ff.jpg'
    ]
  },
  {
    filename: 'graxa-chassis-ca2-500g-vonder.webp',
    urls: [
      'https://www.vonder.com.br/estatico/vonder/produto/5125000500.jpg',
      'https://lojadomecanico.vteximg.com.br/arquivos/ids/890835-1000-1000/image-83864a781bcf4402a11b6be4cff68aa1.jpg',
      'https://m.media-amazon.com/images/I/61M0hO1WvNL._AC_SL1000_.jpg'
    ]
  },
  {
    filename: 'ducha-eletrica-top-jet-eletronica-lorenzetti.webp',
    urls: [
      'https://www.lorenzetti.com.br/images/default-source/produtos-png/chuveiros-eletricos/top-jet-eletronica.png',
      'https://eletrotrafo.vteximg.com.br/arquivos/ids/179679/top-jet-eletronica-00100212-00100213.png',
      'https://eletroluz.cdn.magazord.com.br/img/2025/06/produto/332/53132-unico-img0.jpg?ims=fit-in/800x800/filters:fill(white)'
    ]
  },
  {
    filename: 'ducha-eletrica-top-jet-multitemperaturas-lorenzetti.webp',
    urls: [
      'https://www.lorenzetti.com.br/images/default-source/produtos-png/chuveiros-eletricos/top-jet-multi.png',
      'https://eletrotrafo.vteximg.com.br/arquivos/ids/179680/top-jet-multi-00100210-00100211.png'
    ]
  },
  {
    filename: 'ducha-eletrica-futura-lorenzetti.webp',
    urls: [
      'https://www.lorenzetti.com.br/images/default-source/produtos-png/chuveiros-eletricos/ducha-futura-multitemperatura.png',
      'https://www.lorenzetti.com.br/images/default-source/produtos-png/chuveiros-eletricos/ducha-futura-eletronica.png'
    ]
  },
  {
    filename: 'ducha-eletrica-advanced-lorenzetti.webp',
    urls: [
      'https://www.lorenzetti.com.br/images/default-source/produtos-png/chuveiros-eletricos/advanced-multi.png',
      'https://www.lorenzetti.com.br/images/default-source/produtos-png/chuveiros-eletricos/advanced-eletronica---com-haste.png'
    ]
  }
];

async function processUrl(url, targetPath) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
        'Referer': 'https://www.google.com/'
      }
    });
    clearTimeout(timeout);

    if (!res.ok) {
      console.warn(`   ⚠️ HTTP ${res.status} para ${url.slice(0, 75)}...`);
      return false;
    }

    const arrayBuffer = await res.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    if (buffer.length < 2000) {
      console.warn(`   ⚠️ Imagem muito pequena (${buffer.length} bytes), pulando...`);
      return false;
    }

    await sharp(buffer)
      .resize(800, 800, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 1 },
      })
      .webp({ quality: 90, effort: 4 })
      .toFile(targetPath);

    return true;
  } catch (err) {
    clearTimeout(timeout);
    console.warn(`   ⚠️ Falha com ${url.slice(0, 75)}... : ${err.message}`);
    return false;
  }
}

async function run() {
  console.log(`🚀 Iniciando download e tratamento de ${downloads.length} imagens oficiais...`);
  let successCount = 0;

  for (const item of downloads) {
    const targetPath = path.join(outputDir, item.filename);
    console.log(`\n📦 Baixando: ${item.filename}`);
    let itemSuccess = false;

    for (const url of item.urls) {
      const ok = await processUrl(url, targetPath);
      if (ok) {
        const stats = fs.statSync(targetPath);
        console.log(`   ✅ Sucesso! Salvo ${item.filename} (${(stats.size / 1024).toFixed(1)} KB)`);
        itemSuccess = true;
        break;
      }
    }

    if (itemSuccess) {
      successCount++;
    } else {
      console.error(`   ❌ ERRO: Nenhuma URL funcionou para ${item.filename}`);
    }
  }

  console.log(`\n🎉 Finalizado: ${successCount} de ${downloads.length} imagens tratadas e salvas com sucesso!`);
}

run();

