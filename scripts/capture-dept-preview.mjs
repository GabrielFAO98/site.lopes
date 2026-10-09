import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const chromePaths = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
];

const executablePath = chromePaths.find((p) => fs.existsSync(p));

const brainDir = 'C:/Users/Usuario/.gemini/antigravity/brain/83cf275a-25e9-4fb3-ba2d-d50e4d79df99';

async function capture() {
  const browser = await puppeteer.launch({
    executablePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  
  // Desktop
  await page.setViewport({ width: 1440, height: 1200 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  
  // Scroll down to departments section
  await page.evaluate(() => {
    window.scrollBy(0, 550);
  });
  await new Promise(r => setTimeout(r, 600));

  await page.screenshot({
    path: path.join(brainDir, 'dept-cards-leroy-desktop.png'),
    fullPage: false
  });

  // Mobile
  await page.setViewport({ width: 390, height: 900 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  await page.evaluate(() => {
    window.scrollBy(0, 480);
  });
  await new Promise(r => setTimeout(r, 600));

  await page.screenshot({
    path: path.join(brainDir, 'dept-cards-leroy-mobile.png'),
    fullPage: false
  });

  await browser.close();
  console.log('Screenshots captured successfully!');
}

capture().catch(console.error);
