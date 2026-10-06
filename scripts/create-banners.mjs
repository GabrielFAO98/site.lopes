import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const bannersDir = path.resolve(__dirname, '../public/images/banners');

const banners = [
  {
    name: 'banner-1',
    title: 'Da Fundação ao Acabamento',
    subtitle: 'Cimento, Areia, Brita, Aço e Blocos com Pronta Entrega',
    tag: 'CONSTRUÇÃO BÁSICA EM FRANCA E REGIÃO',
    cta: 'Conferir Materiais Básicos',
    bg1: '#002855',
    bg2: '#004b87',
    accent: '#f97316',
    iconEmoji: '🏗️',
    visualHint: 'Cimento Itaú • Areia Lavada • Pedra Brita • Aço CA-50'
  },
  {
    name: 'banner-2',
    title: 'Acabamentos e Ferramentas',
    subtitle: 'As Melhores Marcas: Votomassa, Vedacit, Tekbond, Cortag e Sil',
    tag: 'REFORMA E MANUTENÇÃO',
    cta: 'Ver Produtos de Reforma',
    bg1: '#0f172a',
    bg2: '#1e3a8a',
    accent: '#38bdf8',
    iconEmoji: '🛠️',
    visualHint: 'Argamassas • Impermeabilizantes • Selantes • Fios e Cabos'
  },
  {
    name: 'banner-3',
    title: 'Cotação Rápida no WhatsApp',
    subtitle: 'Envie sua lista de materiais e receba um orçamento sem burocracia',
    tag: 'ATENDIMENTO DIRETO NO BALCÃO',
    cta: 'Falar com Atendente no WhatsApp',
    bg1: '#064e3b',
    bg2: '#047857',
    accent: '#22c55e',
    iconEmoji: '💬',
    visualHint: 'Economize tempo na sua obra • Resposta rápida da equipe'
  }
];

function generateDesktopSvg(b) {
  return `
  <svg width="1600" height="480" viewBox="0 0 1600 480" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="grad-${b.name}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${b.bg1}" />
        <stop offset="100%" stop-color="${b.bg2}" />
      </linearGradient>
      <linearGradient id="glow" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${b.accent}" stop-opacity="0.3" />
        <stop offset="100%" stop-color="#ffffff" stop-opacity="0.05" />
      </linearGradient>
    </defs>

    <!-- Fundo -->
    <rect width="1600" height="480" fill="url(#grad-${b.name})" />

    <!-- Elementos Decorativos -->
    <circle cx="1400" cy="240" r="260" fill="url(#glow)" />
    <circle cx="150" cy="40" r="180" fill="white" fill-opacity="0.03" />
    <rect x="1100" y="60" width="380" height="360" rx="32" fill="white" fill-opacity="0.06" stroke="white" stroke-opacity="0.12" stroke-width="2" />

    <!-- Destaque Visual Direito -->
    <text x="1290" y="210" font-family="system-ui, -apple-system, sans-serif" font-size="90" text-anchor="middle">${b.iconEmoji}</text>
    <text x="1290" y="290" font-family="system-ui, -apple-system, sans-serif" font-size="20" font-weight="bold" fill="white" text-anchor="middle">Lopes &amp; Lopes</text>
    <text x="1290" y="325" font-family="system-ui, -apple-system, sans-serif" font-size="14" fill="#cbd5e1" text-anchor="middle">Franca - SP</text>

    <!-- Conteúdo Textual Esquerdo -->
    <g transform="translate(100, 80)">
      <!-- Tag / Badge -->
      <rect x="0" y="0" width="340" height="34" rx="17" fill="${b.accent}" fill-opacity="0.2" stroke="${b.accent}" stroke-width="1.5" />
      <text x="170" y="22" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="bold" fill="${b.accent}" text-anchor="middle" letter-spacing="1">${b.tag}</text>

      <!-- Título Principal -->
      <text x="0" y="85" font-family="system-ui, -apple-system, sans-serif" font-size="44" font-weight="900" fill="#ffffff" letter-spacing="-0.5">${b.title}</text>

      <!-- Subtítulo -->
      <text x="0" y="135" font-family="system-ui, -apple-system, sans-serif" font-size="22" font-weight="500" fill="#e2e8f0">${b.subtitle}</text>

      <!-- Destaque de Itens -->
      <text x="0" y="185" font-family="system-ui, -apple-system, sans-serif" font-size="16" fill="#94a3b8">✓ ${b.visualHint}</text>

      <!-- Botão CTA -->
      <g transform="translate(0, 220)">
        <rect width="280" height="52" rx="12" fill="${b.accent}" />
        <text x="140" y="32" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="bold" fill="#ffffff" text-anchor="middle">${b.cta} →</text>
      </g>
    </g>
  </svg>
  `;
}

function generateMobileSvg(b) {
  return `
  <svg width="800" height="800" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="grad-m-${b.name}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${b.bg1}" />
        <stop offset="100%" stop-color="${b.bg2}" />
      </linearGradient>
      <linearGradient id="glow-m" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${b.accent}" stop-opacity="0.25" />
        <stop offset="100%" stop-color="#ffffff" stop-opacity="0.05" />
      </linearGradient>
    </defs>

    <!-- Fundo -->
    <rect width="800" height="800" fill="url(#grad-m-${b.name})" />
    <circle cx="400" cy="220" r="200" fill="url(#glow-m)" />

    <!-- Ícone Central Destaque -->
    <circle cx="400" cy="200" r="90" fill="white" fill-opacity="0.08" stroke="white" stroke-opacity="0.15" stroke-width="2" />
    <text x="400" y="235" font-family="system-ui, -apple-system, sans-serif" font-size="95" text-anchor="middle">${b.iconEmoji}</text>

    <!-- Conteúdo Textual Centralizado -->
    <g transform="translate(50, 360)">
      <!-- Tag / Badge -->
      <rect x="150" y="0" width="400" height="38" rx="19" fill="${b.accent}" fill-opacity="0.25" stroke="${b.accent}" stroke-width="1.5" />
      <text x="350" y="24" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="bold" fill="${b.accent}" text-anchor="middle" letter-spacing="1">${b.tag}</text>

      <!-- Título Principal -->
      <text x="350" y="85" font-family="system-ui, -apple-system, sans-serif" font-size="38" font-weight="900" fill="#ffffff" text-anchor="middle">${b.title}</text>

      <!-- Subtítulo -->
      <text x="350" y="135" font-family="system-ui, -apple-system, sans-serif" font-size="19" font-weight="500" fill="#e2e8f0" text-anchor="middle">${b.subtitle}</text>

      <!-- Destaque de Itens -->
      <text x="350" y="185" font-family="system-ui, -apple-system, sans-serif" font-size="15" fill="#94a3b8" text-anchor="middle">✓ ${b.visualHint}</text>

      <!-- Botão CTA -->
      <g transform="translate(175, 230)">
        <rect width="350" height="58" rx="16" fill="${b.accent}" />
        <text x="175" y="36" font-family="system-ui, -apple-system, sans-serif" font-size="18" font-weight="bold" fill="#ffffff" text-anchor="middle">${b.cta} →</text>
      </g>
    </g>
  </svg>
  `;
}

async function renderBanners() {
  console.log('🎨 Renderizando 3 pares de banners (Desktop 1600x480 & Mobile 800x800)...');
  
  for (const b of banners) {
    // 1. Desktop
    const deskSvg = Buffer.from(generateDesktopSvg(b));
    const deskPath = path.join(bannersDir, `${b.name}-desktop.webp`);
    await sharp(deskSvg).webp({ quality: 90 }).toFile(deskPath);
    console.log(`✅ Desktop gerado: ${b.name}-desktop.webp`);

    // 2. Mobile
    const mobSvg = Buffer.from(generateMobileSvg(b));
    const mobPath = path.join(bannersDir, `${b.name}-mobile.webp`);
    await sharp(mobSvg).webp({ quality: 90 }).toFile(mobPath);
    console.log(`✅ Mobile gerado: ${b.name}-mobile.webp`);
  }

  console.log('🎉 Todos os 6 banners foram gerados com sucesso!');
}

renderBanners().catch(console.error);
