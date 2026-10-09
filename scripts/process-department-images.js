const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const brainDir = 'C:/Users/Usuario/.gemini/antigravity/brain/83cf275a-25e9-4fb3-ba2d-d50e4d79df99';
const outDir = path.join(__dirname, '../public/images/departamentos');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const imagesMap = [
  { src: 'construcao_basica_1791551708117.jpg', dest: 'construcao-basica.webp' },
  { src: 'pisos_e_revestimentos_1791551729234.jpg', dest: 'pisos-e-revestimentos.webp' },
  { src: 'quimicos_e_adesivos_1791551751913.jpg', dest: 'quimicos-e-adesivos.webp' },
  { src: 'pintura_1791551778601.jpg', dest: 'pintura.webp' },
  { src: 'hidraulica_1791551840550.jpg', dest: 'hidraulica.webp' },
  { src: 'eletrica_1791551875645.jpg', dest: 'eletrica.webp' },
  { src: 'banheiro_e_cozinha_1791551941780.jpg', dest: 'banheiro-e-cozinha.webp' },
  { src: 'ferramentas_1791551984626.jpg', dest: 'ferramentas.webp' },
  { src: 'ferragens_1791552083610.jpg', dest: 'ferragens.webp' },
  { src: 'jardim_e_utilidades_1791552137851.jpg', dest: 'jardim-e-utilidades.webp' },
];

async function processImages() {
  for (const item of imagesMap) {
    const srcPath = path.join(brainDir, item.src);
    const destPath = path.join(outDir, item.dest);

    if (!fs.existsSync(srcPath)) {
      console.error(`Missing source: ${srcPath}`);
      continue;
    }

    console.log(`Processing ${item.src} -> ${item.dest}...`);
    await sharp(srcPath)
      .resize(800, 800, { fit: 'cover' })
      .webp({ quality: 85, effort: 4 })
      .toFile(destPath);
    console.log(`Saved: ${destPath}`);
  }
  console.log('All department images processed successfully!');
}

processImages().catch(err => {
  console.error(err);
  process.exit(1);
});
