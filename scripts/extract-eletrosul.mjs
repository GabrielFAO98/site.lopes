async function fetchEletrosul() {
  const url = 'https://www.eletrosul.com.br/iluminacao/lampada-led-bulbo-12v-10w-6-500k-foxlux';
  const res = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
  });
  const html = await res.text();
  const imgs = [...html.matchAll(/https:\/\/[^"']+\.(?:jpg|jpeg|png|webp)/gi)].map(m => m[0]);
  console.log('Status:', res.status);
  const unique = [...new Set(imgs)].filter(i => i.includes('produto') || i.includes('img_prod') || i.includes('foxlux') || i.includes('tcdn'));
  console.log('Total de imagens filtradas:', unique.length);
  unique.forEach(i => console.log(i));
}

fetchEletrosul();
