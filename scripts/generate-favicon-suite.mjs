import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

function createIco(pngBuffers, sizes) {
  const count = pngBuffers.length;
  const headerSize = 6 + count * 16;
  let currentOffset = headerSize;

  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // Reserved
  header.writeUInt16LE(1, 2); // ICO type
  header.writeUInt16LE(count, 4); // Count of images

  const entries = [];
  for (let i = 0; i < count; i++) {
    const buf = pngBuffers[i];
    const size = sizes[i];
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size < 256 ? size : 0, 0); // Width
    entry.writeUInt8(size < 256 ? size : 0, 1); // Height
    entry.writeUInt8(0, 2); // Colors (0 = 256+)
    entry.writeUInt8(0, 3); // Reserved
    entry.writeUInt16LE(1, 4); // Color planes
    entry.writeUInt16LE(32, 6); // Bits per pixel
    entry.writeUInt32LE(buf.length, 8); // Image size in bytes
    entry.writeUInt32LE(currentOffset, 12); // Offset
    entries.push(entry);
    currentOffset += buf.length;
  }

  return Buffer.concat([header, ...entries, ...pngBuffers]);
}

async function generateFaviconSuite() {
  console.log('--- Generating Lopes e Lopes Favicon Suite ---');
  const artDir = 'C:/Users/Usuario/.gemini/antigravity/brain/83cf275a-25e9-4fb3-ba2d-d50e4d79df99';
  const cutoutBuf = fs.readFileSync(path.join(artDir, 'perfect-head-cutout.png'));
  const cutoutBase64 = cutoutBuf.toString('base64');

  // Master SVG (512x512) - Opção B (Borda Dupla Azul Lopes + Laranja Lopes com foco máximo no rosto)
  const masterSvg = Buffer.from(`
    <svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <clipPath id="circleClipSuite">
          <circle cx="256" cy="256" r="232" />
        </clipPath>
      </defs>
      <!-- Lopes Blue Outer Ring (#0f3b7a) -->
      <circle cx="256" cy="256" r="252" fill="#0f3b7a" />
      <!-- Lopes Orange Middle Accent Ring (#f97316) -->
      <circle cx="256" cy="256" r="242" fill="#f97316" />
      <!-- Crisp White Core -->
      <circle cx="256" cy="256" r="232" fill="#ffffff" />
      <!-- Mascot Head -->
      <g clip-path="url(#circleClipSuite)">
        <image href="data:image/png;base64,${cutoutBase64}" x="18" y="14" width="476" height="476" />
      </g>
    </svg>
  `);

  const master512 = await sharp(masterSvg).png().toBuffer();

  // 1. icon-512.png and src/app/icon.png
  await sharp(master512).toFile('public/icon-512.png');
  await sharp(master512).toFile('src/app/icon.png');
  console.log('✅ icon-512.png & src/app/icon.png generated');

  // 2. icon-192.png
  const icon192 = await sharp(master512).resize(192, 192).png().toBuffer();
  await sharp(icon192).toFile('public/icon-192.png');
  console.log('✅ icon-192.png generated');

  // 3. apple-touch-icon.png (180x180) & src/app/apple-icon.png
  const apple180 = await sharp(master512).resize(180, 180).png().toBuffer();
  await sharp(apple180).toFile('public/apple-touch-icon.png');
  await sharp(apple180).toFile('src/app/apple-icon.png');
  console.log('✅ apple-touch-icon.png & src/app/apple-icon.png generated');

  // 4. 48x48, 32x32, 16x16 with subtle unsharp mask for pixel-perfect sharpness
  const icon48 = await sharp(master512)
    .resize(48, 48, { kernel: 'lanczos3' })
    .sharpen({ sigma: 0.8, m1: 1.1, m2: 0.8 })
    .png()
    .toBuffer();

  const icon32 = await sharp(master512)
    .resize(32, 32, { kernel: 'lanczos3' })
    .sharpen({ sigma: 0.8, m1: 1.2, m2: 0.8 })
    .png()
    .toBuffer();
  await sharp(icon32).toFile('public/favicon-32x32.png');
  console.log('✅ favicon-32x32.png generated');

  const icon16 = await sharp(master512)
    .resize(16, 16, { kernel: 'lanczos3' })
    .sharpen({ sigma: 0.6, m1: 1.5, m2: 1.0 })
    .png()
    .toBuffer();
  await sharp(icon16).toFile('public/favicon-16x16.png');
  console.log('✅ favicon-16x16.png generated');

  // 5. favicon.ico (16, 32, 48)
  const icoBuffer = createIco([icon16, icon32, icon48], [16, 32, 48]);
  fs.writeFileSync('public/favicon.ico', icoBuffer);
  fs.writeFileSync('src/app/favicon.ico', icoBuffer);
  console.log('✅ public/favicon.ico & src/app/favicon.ico generated');

  console.log('=== All favicon files updated with 100% success! ===');
}

generateFaviconSuite();

