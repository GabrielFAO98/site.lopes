import fs from 'fs';
import { PDFParse } from 'pdf-parse';

async function extractAllProducts() {
  const pdfPath = 'C:/Users/Usuario/Downloads/Produtos cadastrados.pdf';
  console.log(`📖 Lendo arquivo PDF: ${pdfPath}...`);
  const buffer = fs.readFileSync(pdfPath);
  
  const startTime = Date.now();
  const parser = new PDFParse(new Uint8Array(buffer));
  const res = await parser.getText();
  
  let fullText = '';
  if (Array.isArray(res)) {
    fullText = res.join('\n');
  } else if (typeof res === 'object') {
    fullText = Object.values(res).filter(v => typeof v === 'string').join('\n');
  } else {
    fullText = String(res);
  }

  const lines = fullText.split('\n');
  console.log(`⏱️ Texto extraído em ${((Date.now() - startTime) / 1000).toFixed(2)}s. Total de linhas brutas: ${lines.length}`);

  const products = [];
  const errors = [];
  const ignored = [];

  const parseBrNum = (str) => {
    if (!str) return null;
    const clean = str.replace(/\./g, '').replace(',', '.');
    const num = parseFloat(clean);
    return isNaN(num) ? null : num;
  };

  const validUnits = ['UN', 'MT', 'KG', 'SC', 'LT', 'PCT', 'CUN', 'M', 'MTS', 'TPUN'];

  for (let idx = 0; idx < lines.length; idx++) {
    const rawLine = lines[idx].trim();
    if (!rawLine) continue;

    // Linhas de cabeçalho / rodapé conhecidas
    if (
      rawLine.includes('Produtos Cadastrados') ||
      rawLine.includes('Codigo esta entre') ||
      rawLine.includes('Codigo Descricao Un') ||
      rawLine.includes('Orgsystem Software') ||
      rawLine.includes('Total de Produtos:') ||
      rawLine.match(/^-- \d+ of \d+ --$/)
    ) {
      ignored.push(rawLine);
      continue;
    }

    const tabs = rawLine.split('\t');
    if (tabs.length < 2) {
      ignored.push(rawLine);
      continue;
    }

    let code = '';
    let descricao = '';
    let unit = 'UN';
    let precoCusto = null;
    let precoVenda = null;
    let precoMinimo = null;
    let precoMaximo = null;
    let sku = '';
    let ncm = '';

    if (tabs.length >= 3) {
      // Caso 3 partes ou mais: [codigo descricao] \t [unidade precos...] \t [sku ncm]
      const part0 = tabs[0].trim();
      const part1 = tabs[1].trim();
      const part2 = tabs.slice(2).join(' ').trim();

      const matchCode = part0.match(/^([\d.,]+)\s+(.*)$/);
      if (matchCode) {
        code = matchCode[1].replace(',', '.');
        descricao = matchCode[2].trim();
      } else {
        errors.push({ line: rawLine, reason: 'Código inicial não encontrado em 3 partes' });
        continue;
      }

      // Tenta com espaço antes da unidade ou grudado
      let priceMatch = part1.match(/^([A-Z]{1,4}|MT|KG|SC|LT|PCT|CUN|M|MTS)\s+([-\d.,]+)\s+([-\d.,]+)\s+([-\d.,]+)\s+([-\d.,]+)$/i);
      if (!priceMatch) {
        priceMatch = part1.match(/^(.*?)(UN|KG|MT|LT|SC|PCT|CUN)\s+([-\d.,]+)\s+([-\d.,]+)\s+([-\d.,]+)\s+([-\d.,]+)$/i);
        if (priceMatch) {
          if (priceMatch[1].trim()) {
            descricao += ' ' + priceMatch[1].trim();
          }
          priceMatch = [, priceMatch[2], priceMatch[3], priceMatch[4], priceMatch[5], priceMatch[6]];
        }
      }

      if (priceMatch) {
        unit = priceMatch[1].toUpperCase().trim();
        precoCusto = parseBrNum(priceMatch[2]);
        precoVenda = parseBrNum(priceMatch[3]);
        precoMinimo = parseBrNum(priceMatch[4]);
        precoMaximo = parseBrNum(priceMatch[5]);
      } else {
        errors.push({ line: rawLine, reason: 'Preços não casaram em 3 partes' });
        continue;
      }

      const rParts = part2.split(/\s+/);
      sku = rParts[0] || '';
      ncm = rParts.slice(1).join(' ') || '';

    } else if (tabs.length === 2) {
      // Caso padrão 2 partes: [codigo descricao un precos...] \t [sku ncm]
      const left = tabs[0].trim();
      const right = tabs[1].trim();

      const rParts = right.split(/\s+/);
      sku = rParts[0] || '';
      ncm = rParts.slice(1).join(' ') || '';

      const matchCode = left.match(/^([\d.,]+)\s+(.*)$/);
      if (matchCode) {
        code = matchCode[1].replace(',', '.');
      } else {
        errors.push({ line: rawLine, reason: 'Código inicial não encontrado em 2 partes' });
        continue;
      }

      const rest = matchCode[2].trim();

      // 1. Tenta padrão com espaço: [desc] [un] [p1] [p2] [p3] [p4]
      let priceMatch = rest.match(/^(.*?)\s+([A-Z]{1,4}|MT|KG|SC|LT|PCT|CUN|M|MTS)\s+([-\d.,]+)\s+([-\d.,]+)\s+([-\d.,]+)\s+([-\d.,]+)$/i);
      
      // 2. Se não casar, tenta padrão grudado (ex: LOTUSUN ou REDONDAUN)
      if (!priceMatch) {
        priceMatch = rest.match(/^(.*?)(UN|KG|MT|LT|SC|PCT|CUN)\s+([-\d.,]+)\s+([-\d.,]+)\s+([-\d.,]+)\s+([-\d.,]+)$/i);
      }

      if (priceMatch) {
        descricao = priceMatch[1].trim();
        unit = priceMatch[2].toUpperCase().trim();
        precoCusto = parseBrNum(priceMatch[3]);
        precoVenda = parseBrNum(priceMatch[4]);
        precoMinimo = parseBrNum(priceMatch[5]);
        precoMaximo = parseBrNum(priceMatch[6]);
      } else {
        errors.push({ line: rawLine, reason: 'Preços não casaram em 2 partes' });
        continue;
      }
    }

    products.push({
      codigo_estruturado: code,
      sku: sku,
      descricao: descricao,
      unidade: unit,
      ncm: ncm,
      preco_custo: precoCusto,
      preco_venda: precoVenda,
      preco_minimo: precoMinimo,
      preco_maximo: precoMaximo
    });
  }

  console.log(`\n📊 RESULTADO FINAL DA EXTRAÇÃO:`);
  console.log(` - Produtos extraídos com sucesso: ${products.length} de 4325 (${((products.length / 4325) * 100).toFixed(1)}%)`);
  console.log(` - Linhas ignoradas (cabeçalhos/rodapés): ${ignored.length}`);
  console.log(` - Linhas com erro de parse: ${errors.length}`);

  if (errors.length > 0) {
    console.log(`\n⚠️ Erros restantes (${errors.length}):`);
    errors.forEach((e, i) => console.log(` [${i+1}] ${e.reason} -> ${e.line}`));
  }

  // Salvar no disco
  const outPath = 'data/produtos_orgsystem.json';
  fs.writeFileSync(outPath, JSON.stringify(products, null, 2), 'utf-8');
  console.log(`\n💾 Salvo em: ${outPath} (${(fs.statSync(outPath).size / 1024).toFixed(1)} KB)`);

  const csvLines = [
    'codigo_estruturado;sku;descricao;unidade;ncm;preco_custo;preco_venda;preco_minimo;preco_maximo'
  ];
  for (const p of products) {
    csvLines.push(
      `"${p.codigo_estruturado}";"${p.sku}";"${p.descricao.replace(/"/g, '""')}";"${p.unidade}";"${p.ncm}";${p.preco_custo};${p.preco_venda};${p.preco_minimo};${p.preco_maximo}`
    );
  }
  const csvPath = 'data/produtos_orgsystem.csv';
  fs.writeFileSync(csvPath, csvLines.join('\n'), 'utf-8');
  console.log(`💾 Salvo em: ${csvPath} (${(fs.statSync(csvPath).size / 1024).toFixed(1)} KB)`);
}

extractAllProducts().catch(console.error);

