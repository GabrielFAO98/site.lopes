import fs from 'fs';

async function getImages(q) {
  try {
    const tokenRes = await fetch('https://duckduckgo.com/?q=' + encodeURIComponent(q), {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
    });
    const html = await tokenRes.text();
    const vqdMatch = html.match(/vqd=([\"']?)([\d-]+)\1/) || html.match(/vqd=([\d-]+)/);
    if (!vqdMatch) {
      console.log('No vqd found for', q);
      return [];
    }
    const vqd = vqdMatch[2] || vqdMatch[1];
    const url = `https://duckduckgo.com/i.js?l=wt-wt&o=json&q=${encodeURIComponent(q)}&vqd=${vqd}`;
    const imgRes = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
    });
    const json = await imgRes.json();
    console.log(`\n=== Resultados para "${q}" (${json.results?.length || 0}) ===`);
    json.results?.slice(0, 5).forEach((r, i) => console.log(`${i+1}. ${r.image}\n   Title: ${r.title}`));
    return json.results || [];
  } catch (e) {
    console.error('Erro:', e.message);
    return [];
  }
}

async function main() {
  await getImages('lampada led alta potencia foxlux');
  await getImages('lampada led tubular foxlux t8');
}

main();

