async function searchEletrosulBulbo() {
  const q = '1079280 lampada led bulbo foxlux';
  const tokenRes = await fetch('https://duckduckgo.com/?q=' + encodeURIComponent(q), {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
  });
  const html = await tokenRes.text();
  const vqdMatch = html.match(/vqd=([\"']?)([\d-]+)\1/) || html.match(/vqd=([\d-]+)/);
  if (!vqdMatch) return;
  const vqd = vqdMatch[2] || vqdMatch[1];
  const url = `https://duckduckgo.com/i.js?l=wt-wt&o=json&q=${encodeURIComponent(q)}&vqd=${vqd}`;
  const imgRes = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
  });
  const json = await imgRes.json();
  console.log('Results:', json.results?.length);
  json.results?.slice(0, 10).forEach(r => console.log(r.image, r.title));
}

searchEletrosulBulbo();
