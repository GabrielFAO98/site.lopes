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
    filename: 'lampada-led-alta-potencia-foxlux.webp',
    urls: [
      'https://cdn.awsli.com.br/2500x2500/718/718365/produto/400664930/5a072edbec6c88447fbbfaee7adb3410-s8pvsrtx9r.jpg',
      'https://down-br.img.susercontent.com/file/sg-11134201-824hj-mfmlurhm04cq0a',
      'https://lojawebcontinental.vtexassets.com/arquivos/ids/70996328/MKP005591002266-1.jpg?v=639086639020970000',
      'https://http2.mlstatic.com/D_NQ_NP_905990-MLB83884140145_042025-O-lampada-led-alta-potencia-foxlux-50w-4000lm-bivolt-6500k.webp'
    ]
  },
  {
    filename: 'lampada-led-alta-potencia-foxlux-2.webp',
    urls: [
      'https://cdn.awsli.com.br/2500x2500/718/718365/produto/400664928/886d18fa467f08c7bc2d0635799eade1-u5xaqkpua8.jpg',
      'https://lojawebcontinental.vtexassets.com/arquivos/ids/70996328/MKP005591002266-1.jpg?v=639086639020970000'
    ]
  },
  {
    filename: 'lampada-led-tubular-t8-foxlux.webp',
    urls: [
      'https://casacardao.agilecdn.com.br/24358.jpg?v=349-725302596',
      'https://images.tcdn.com.br/img/img_prod/1079280/lampada_led_tubular_t8_9w_60cm_6_500k_foxlux_15229_1_c140bc92aea468425ac726d138effccd.jpg',
      'https://img.irroba.com.br/filters:format(webp):fill(fff):quality(80)/comeaeua/catalog/6630.jpg'
    ]
  },
  {
    filename: 'lampada-led-tubular-t8-foxlux-2.webp',
    urls: [
      'https://img.irroba.com.br/fit-in/564x564/filters:format(webp):fill(fff):quality(80)/rrparafu/catalog/api/rrparafu_citelsof/685c2f3b29e50.jpg',
      'https://images.tcdn.com.br/img/img_prod/1079280/lampada_led_tubular_t8_9w_60cm_6_500k_foxlux_15229_1_c140bc92aea468425ac726d138effccd.jpg'
    ]
  }
];

async function processUrl(url, targetPath) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12000);

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
  console.log(`🚀 Iniciando download e tratamento com sharp de ${downloads.length} imagens...`);
  let successCount = 0;

  for (const item of downloads) {
    const targetPath = path.join(outputDir, item.filename);
    console.log(`\n📦 Processando: ${item.filename}`);
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

  console.log(`\n🎉 Finalizado: ${successCount} de ${downloads.length} imagens tratadas com sucesso!`);
}

run();

