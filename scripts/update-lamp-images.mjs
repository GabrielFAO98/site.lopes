import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outputDir = path.resolve(__dirname, '../public/images/produtos');

const tasks = [
  {
    name: 'Lâmpada Bulbo',
    filename: 'lampada-led-bulbo-foxlux-9w-bivolt-6500k.webp',
    url: 'https://images.tcdn.com.br/img/img_prod/1079280/lampada_led_bulbo_12v_10w_6_500k_foxlux_3325_2_36cd54b20d8c3042e48e126d53176f04.jpg'
  },
  {
    name: 'Lâmpada Alta Potência',
    filename: 'lampada-led-alta-potencia-foxlux.webp',
    url: 'https://m.media-amazon.com/images/I/51qXNemhMsL.jpg'
  }
];

async function downloadAndProcess(task) {
  const targetPath = path.join(outputDir, task.filename);
  console.log(`\n⏳ Baixando ${task.name} de ${task.url}...`);
  
  const res = await fetch(task.url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8'
    }
  });

  if (!res.ok) {
    throw new Error(`Falha no download (HTTP ${res.status}): ${task.url}`);
  }

  const arrayBuffer = await res.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  console.log(`   Tamanho original baixado: ${(buffer.length / 1024).toFixed(1)} KB`);

  await sharp(buffer)
    .resize(800, 800, {
      fit: 'contain',
      background: { r: 255, g: 255, b: 255, alpha: 1 }
    })
    .webp({ quality: 90, effort: 4 })
    .toFile(targetPath);

  const stats = fs.statSync(targetPath);
  console.log(`✅ Sucesso! Salvo ${task.filename} (${(stats.size / 1024).toFixed(1)} KB)`);
}

async function run() {
  for (const task of tasks) {
    try {
      await downloadAndProcess(task);
    } catch (e) {
      console.error(`❌ Erro em ${task.name}:`, e.message);
    }
  }
}

run();
