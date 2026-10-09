import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

// -------------------------------------------------------------
// 1. ASTRA SOFT TPJ/AS TOILET SEATS (800x800 WebP)
// -------------------------------------------------------------
async function processSeatImages() {
  console.log('--- Processing Astra Soft Seats ---');
  // Denoise/smooth source white image to remove JPEG compression blocks
  const denoiseBuf = await sharp('scripts/assento-sanitario-astra-soft-branco.jpeg')
    .median(3)
    .toBuffer();

  const { data, info } = await sharp(denoiseBuf).raw().toBuffer({ resolveWithObject: true });

  const colors = [
    {
      name: 'branco',
      targetR: 255, targetG: 255, targetB: 255,
      isOriginal: true
    },
    {
      name: 'bege',
      targetR: 226, targetG: 218, targetB: 195,
      isOriginal: false
    },
    {
      name: 'cinza-claro',
      targetR: 180, targetG: 184, targetB: 188,
      isOriginal: false
    },
    {
      name: 'cinza-escuro',
      targetR: 100, targetG: 103, targetB: 107,
      isOriginal: false
    }
  ];

  for (const c of colors) {
    let outData;

    if (c.isOriginal) {
      // For white, use the high-res original
      const orig = await sharp('scripts/assento-sanitario-astra-soft-branco.jpeg')
        .resize(760, 760, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
        .extend({ top: 20, bottom: 20, left: 20, right: 20, background: { r: 255, g: 255, b: 255, alpha: 1 } })
        .webp({ quality: 92 })
        .toBuffer();

      fs.writeFileSync('public/images/produtos/assento-sanitario-astra-oval-soft.webp', orig);
      // Also update the old filename in case of cached references
      fs.writeFileSync('public/images/produtos/assento-sanitario-atlas-oval-soft.webp', orig);
      console.log('Saved assento-sanitario-astra-oval-soft.webp');
      continue;
    }

    outData = Buffer.from(data);

    for (let y = 0; y < info.height; y++) {
      for (let x = 0; x < info.width; x++) {
        const idx = (y * info.width + x) * info.channels;
        const r = data[idx];
        const g = data[idx + 1];
        const b = data[idx + 2];

        // Background is pure white
        if (r >= 252 && g >= 252 && b >= 252) continue;

        const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255.0;

        // Smooth physical shading curve
        const spec = Math.max(0, Math.pow(Math.max(0, lum - 0.80) / 0.20, 2.0));
        const diffuse = Math.min(1.0, lum / 0.90);

        const nr = c.targetR * diffuse * (1 - spec) + 255 * spec;
        const ng = c.targetG * diffuse * (1 - spec) + 255 * spec;
        const nb = c.targetB * diffuse * (1 - spec) + 255 * spec;

        outData[idx] = Math.round(Math.min(255, Math.max(0, nr)));
        outData[idx + 1] = Math.round(Math.min(255, Math.max(0, ng)));
        outData[idx + 2] = Math.round(Math.min(255, Math.max(0, nb)));
      }
    }

    const destBuf = await sharp(outData, { raw: info })
      .resize(760, 760, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
      .extend({ top: 20, bottom: 20, left: 20, right: 20, background: { r: 255, g: 255, b: 255, alpha: 1 } })
      .webp({ quality: 92 })
      .toBuffer();

    const newPath = `public/images/produtos/assento-sanitario-astra-oval-soft-${c.name}.webp`;
    fs.writeFileSync(newPath, destBuf);

    // Also support old file names
    const oldSlugName = c.name === 'cinza-claro' ? 'cinza' : c.name;
    const oldPath = `public/images/produtos/assento-sanitario-atlas-oval-soft-${oldSlugName}.webp`;
    fs.writeFileSync(oldPath, destBuf);

    console.log(`Saved ${newPath} and ${oldPath}`);
  }
}

// -------------------------------------------------------------
// 2. TEKBOND SPRAY CANS (Unified Angle & Lighting)
// -------------------------------------------------------------
async function processSprayImages() {
  console.log('--- Processing Tekbond Spray Cans ---');
  const masterPath = 'public/images/produtos/tinta-spray-uso-geral-tekbond-400ml.webp';
  const { data, info } = await sharp(masterPath).raw().toBuffer({ resolveWithObject: true });

  const scx = 475.5, scy = 570.0, srx = 21.5, sry = 35.0;

  const variations = [
    {
      name: 'branco',
      targetR: 245, targetG: 245, targetB: 248,
      isMatte: false,
      dest: 'public/images/produtos/tinta-spray-uso-geral-tekbond-branco.webp'
    },
    {
      name: 'preto-fosco',
      targetR: 24, targetG: 24, targetB: 24,
      isMatte: true,
      dest: 'public/images/produtos/tinta-spray-uso-geral-tekbond-preto-fosco.webp'
    },
    {
      name: 'aluminio',
      targetR: 185, targetG: 190, targetB: 198,
      isMatte: false,
      dest: 'public/images/produtos/tinta-spray-uso-geral-tekbond-aluminio.webp'
    },
    {
      name: 'amarelo',
      targetR: 245, targetG: 175, targetB: 10,
      isMatte: false,
      dest: 'public/images/produtos/tinta-spray-uso-geral-tekbond-amarelo.webp'
    },
    {
      name: 'vermelho',
      targetR: 220, targetG: 25, targetB: 30,
      isMatte: false,
      dest: 'public/images/produtos/tinta-spray-uso-geral-tekbond-vermelho.webp'
    },
    {
      name: 'grafite',
      targetR: 65, targetG: 70, targetB: 78,
      isMatte: false,
      dest: 'public/images/produtos/tinta-spray-uso-geral-tekbond-grafite.webp'
    },
    {
      name: 'verde-escuro',
      targetR: 20, targetG: 110, targetB: 45,
      isMatte: false,
      dest: 'public/images/produtos/tinta-spray-uso-geral-tekbond-verde-escuro.webp'
    }
  ];

  for (const v of variations) {
    const outData = Buffer.from(data);

    for (let y = 0; y < info.height; y++) {
      for (let x = 0; x < info.width; x++) {
        const idx = (y * info.width + x) * info.channels;
        const r = data[idx], g = data[idx+1], b = data[idx+2];
        if (r > 248 && g > 248 && b > 248) continue;
        const lum = 0.299 * r + 0.587 * g + 0.114 * b;

        // Cap region: y 68..226, x 296..502
        if (y >= 68 && y <= 226 && x >= 296 && x <= 502) {
          let nr, ng, nb;

          if (v.isMatte) {
            // Satin matte finish: cylinder curvature preserved with soft specular sheen
            const val = Math.round(18 + Math.pow(lum / 255, 0.9) * 55);
            nr = val;
            ng = val;
            nb = val;
          } else {
            // Glossy finish: glossy highlights
            const baseLevel = 48;
            if (lum <= baseLevel) {
              const shadowFactor = 0.35 + 0.65 * (lum / baseLevel);
              nr = v.targetR * shadowFactor;
              ng = v.targetG * shadowFactor;
              nb = v.targetB * shadowFactor;
            } else {
              const h = Math.min(1.0, Math.pow((lum - baseLevel) / (255 - baseLevel), 0.85));
              nr = (1 - h) * v.targetR + h * 255;
              ng = (1 - h) * v.targetG + h * 255;
              nb = (1 - h) * v.targetB + h * 255;
            }
          }

          outData[idx] = Math.round(Math.min(255, Math.max(0, nr)));
          outData[idx+1] = Math.round(Math.min(255, Math.max(0, ng)));
          outData[idx+2] = Math.round(Math.min(255, Math.max(0, nb)));
        }

        // Swatch oval: cx 475.5, cy 570.0, rx 21.5, ry 35.0
        const dx = (x - scx) / srx;
        const dy = (y - scy) / sry;
        const distSq = dx * dx + dy * dy;

        if (distSq <= 1.05 && y >= 534 && y <= 606 && x >= 452 && x <= 499) {
          const edgeAlpha = distSq > 0.90 ? (1.05 - distSq) / (1.05 - 0.90) : 1.0;
          let sr = v.targetR, sg = v.targetG, sb = v.targetB;

          if (v.name === 'branco' && distSq > 0.82) {
            sr = 190; sg = 190; sb = 190; // Subtle dark outline for white swatch on white body
          }

          outData[idx] = Math.round(sr * edgeAlpha + r * (1 - edgeAlpha));
          outData[idx+1] = Math.round(sg * edgeAlpha + g * (1 - edgeAlpha));
          outData[idx+2] = Math.round(sb * edgeAlpha + b * (1 - edgeAlpha));
        }
      }
    }

    await sharp(outData, { raw: info })
      .webp({ quality: 92 })
      .toFile(v.dest);
    console.log(`Saved ${v.dest}`);
  }
}

async function main() {
  await processSeatImages();
  await processSprayImages();
  console.log('=== All images processed successfully! ===');
}

main();

