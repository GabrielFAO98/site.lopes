import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outputDir = path.resolve(__dirname, '../site-antigo-screenshots');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const chromePaths = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
];

const executablePath = chromePaths.find((p) => fs.existsSync(p));

if (!executablePath) {
  console.error('Nenhum executável de navegador encontrado.');
  process.exit(1);
}

console.log(`Usando navegador: ${executablePath}`);

const pages = [
  {
    name: '01-home.png',
    title: 'Home',
    url: 'https://lopeselopesmc.com.br/',
  },
  {
    name: '02-quem-somos.png',
    title: 'Quem Somos',
    url: 'https://lopeselopesmc.com.br/quem-somos',
  },
  {
    name: '03-politica-de-privacidade.png',
    title: 'Política de Privacidade',
    url: 'https://lopeselopesmc.com.br/politica-de-privacidade',
  },
  {
    name: '04-central-de-atendimento.png',
    title: 'Entre em Contato / Central de Atendimento',
    url: 'https://lopeselopesmc.com.br/central-de-atendimento',
  },
  {
    name: '05-material-basico.png',
    title: 'Material Básico',
    url: 'https://lopeselopesmc.com.br/material-basico',
  },
  {
    name: '06-produto-vedacit-aditivo.png',
    title: 'Produto - Vedacit Aditivo Impermeabilizante',
    url: 'https://lopeselopesmc.com.br/vedacit-3-6l-aditivo-impermeabilizante',
  },
];

async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 400;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          window.scrollTo(0, 0);
          setTimeout(resolve, 800);
        }
      }, 150);
    });
  });
}

async function run() {
  const browser = await puppeteer.launch({
    executablePath,
    headless: true,
    defaultViewport: {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1.5,
    },
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--ignore-certificate-errors',
    ],
  });

  for (const item of pages) {
    const page = await browser.newPage();
    const savePath = path.join(outputDir, item.name);
    console.log(`\n📸 Capturando: ${item.title} (${item.url})...`);

    try {
      await page.goto(item.url, {
        waitUntil: 'networkidle2',
        timeout: 45000,
      });

      // Aguarda um momento e rola a página para garantir carregamento de imagens lazy
      await autoScroll(page);
      await new Promise((r) => setTimeout(r, 1000));

      await page.screenshot({
        path: savePath,
        fullPage: true,
      });

      const stats = fs.statSync(savePath);
      console.log(`✅ Salvo: ${item.name} (${(stats.size / 1024).toFixed(1)} KB)`);
    } catch (err) {
      console.error(`❌ Erro ao capturar ${item.url}:`, err.message);
      try {
        // Tenta captura rápida mesmo se der timeout de networkidle
        await page.screenshot({
          path: savePath,
          fullPage: true,
        });
        console.log(`⚠️ Salvo com fallback: ${item.name}`);
      } catch (fallbackErr) {
        console.error(`Falha total em ${item.name}:`, fallbackErr.message);
      }
    } finally {
      await page.close();
    }
  }

  await browser.close();
  console.log(`\n🎉 Todas as screenshots foram salvas com sucesso em:\n${outputDir}`);
}

run().catch(console.error);

