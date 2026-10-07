import { Product } from '@/types';

/**
 * Normaliza um texto removendo acentos, caracteres especiais e convertendo para minúsculas.
 */
export function normalizeText(text: string): string {
  if (!text) return '';
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Aplica regras simples e eficientes de lematização em português (singularização de plurais).
 */
export function stemWord(word: string): string {
  if (word.length <= 3) return word;
  if (word.endsWith('oes')) return word.slice(0, -3) + 'ao';
  if (word.endsWith('res')) return word.slice(0, -2);
  if (word.endsWith('ais')) return word.slice(0, -3) + 'al';
  if (word.endsWith('eis')) return word.slice(0, -3) + 'el';
  if (word.endsWith('is')) return word.slice(0, -2) + 'il';
  if (word.endsWith('ns')) return word.slice(0, -2) + 'm';
  if (word.endsWith('s') && /[aeiou]/.test(word.charAt(word.length - 2))) {
    return word.slice(0, -1);
  }
  return word;
}

/**
 * Calcula a distância de Levenshtein entre duas palavras (para tolerância a erros de digitação).
 */
export function levenshteinDistance(a: string, b: string): number {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;

  const matrix: number[][] = [];
  for (let i = 0; i <= b.length; i++) matrix[i] = [i];
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j;

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substituição
          matrix[i][j - 1] + 1,     // inserção
          matrix[i - 1][j] + 1      // deleção
        );
      }
    }
  }

  return matrix[b.length][a.length];
}

/**
 * Dicionário abrangente de sinônimos e termos correlatos para Materiais de Construção em Franca/SP.
 */
export const CONSTRUCTION_SYNONYMS: Record<string, string[]> = {
  // Fixação, Espumas e Químicos
  espuma: ['expansiva', 'poliuretano', 'selante', 'fixacao', 'vedacao', 'limpeza', 'rejunte'],
  expansiva: ['espuma', 'poliuretano', 'tekbond', 'fixacao', 'vedacao'],
  poliuretano: ['espuma', 'expansiva', 'pu', 'pu40', 'selante', 'adesivo'],
  cola: ['adesivo', 'selante', 'fixa tudo', 'silicone', 'tekbond', 'cibraflex', 'amazonas', 'massa plastica'],
  adesivo: ['cola', 'selante', 'fixa tudo', 'silicone', 'tekbond', 'massa plastica'],
  silicone: ['selante', 'adesivo', 'cola', 'vedacao', 'acetico', 'incolor', 'tekbond'],
  selante: ['silicone', 'adesivo', 'cola', 'vedacao', 'pu', 'pu40', 'fixa tudo'],
  fixa: ['adesivo', 'selante', 'cola', 'tekbond', 'amazonas', 'fixacao'],
  prego: ['fixacao', 'gerdau', 'morlan', 'marcenaria', 'aco'],
  pregos: ['prego', 'fixacao', 'gerdau'],
  parafuso: ['fixacao', 'bucha', 'broca', 'ancoragem'],
  parafusos: ['parafuso', 'fixacao', 'bucha'],
  bucha: ['fixacao', 'parafuso', 'parede'],
  buchas: ['bucha', 'fixacao', 'parafuso'],
  lubrificante: ['desengripante', 'oleo', 'wd40', 'tekbond', 'vonder'],
  desengripante: ['lubrificante', 'oleo', 'spray', 'tekbond', 'vonder'],

  // Hidráulica e Encanamento
  cano: ['tubo', 'pvc', 'amanco', 'tigre', 'hidraulica', 'conexao', 'esgoto', 'agua'],
  canos: ['tubo', 'pvc', 'amanco', 'tigre', 'hidraulica', 'conexao'],
  tubo: ['cano', 'pvc', 'amanco', 'tigre', 'hidraulica', 'esgoto', 'sifao'],
  tubos: ['cano', 'pvc', 'amanco', 'tigre', 'hidraulica', 'esgoto'],
  joelho: ['cotovelo', 'curva', 'conexao', 'pvc', 'amanco', 'tigre'],
  cotovelo: ['joelho', 'curva', 'conexao', 'pvc', 'amanco', 'tigre'],
  sifao: ['ralo', 'esgoto', 'pia', 'blukit', 'sanfonado', 'universal', 'valvula'],
  ralo: ['sifao', 'grelha', 'valvula', 'esgoto', 'blukit'],
  torneira: ['registro', 'misturador', 'deca', 'docol', 'blukit', 'metalmix', 'engate'],
  registro: ['torneira', 'valvula', 'esfera', 'gaveta', 'pressao'],
  engate: ['rabicho', 'flexivel', 'amanco', 'blukit', 'ligacao'],
  rabicho: ['engate', 'flexivel', 'amanco', 'blukit'],
  valvula: ['ralo', 'descarga', 'retencao', 'esfera', 'blukit'],

  // Elétrica e Iluminação
  fio: ['cabo', 'condutor', 'eletrica', 'sil', 'energia', 'flexivel', 'fios'],
  fios: ['cabo', 'condutor', 'eletrica', 'sil', 'energia', 'flexivel'],
  cabo: ['fio', 'condutor', 'eletrica', 'sil', 'energia', 'flexivel'],
  cabos: ['fio', 'condutor', 'eletrica', 'sil', 'energia', 'flexivel'],
  chuveiro: ['ducha', 'lorenzetti', 'eletrica', 'resistencia', 'banho', 'temperaturas'],
  chuveiros: ['chuveiro', 'ducha', 'lorenzetti'],
  ducha: ['chuveiro', 'lorenzetti', 'eletrica', 'resistencia', 'banho'],
  duchas: ['ducha', 'chuveiro', 'lorenzetti'],
  resistencia: ['chuveiro', 'ducha', 'lorenzetti', 'maxi'],
  disjuntor: ['energia', 'eletrica', 'quadro', 'monopolar', 'bipolar', 'steck', 'din'],
  disjuntores: ['disjuntor', 'energia', 'eletrica'],
  lampada: ['led', 'iluminacao', 'painel', 'spot', 'plafon', 'foxlux', 'luz'],
  lampadas: ['lampada', 'led', 'iluminacao'],
  led: ['lampada', 'iluminacao', 'painel', 'spot', 'foxlux', 'luz'],
  tomada: ['interruptor', 'espelho', 'placa', 'modulo', 'conjunto'],
  interruptor: ['tomada', 'espelho', 'placa', 'modulo'],

  // Pintura e Acabamento
  tinta: ['spray', 'esmalte', 'acrilica', 'latex', 'verniz', 'pintura', 'selador', 'tekbond'],
  tintas: ['tinta', 'spray', 'esmalte', 'pintura'],
  spray: ['tinta', 'tekbond', 'desengripante', 'lubrificante', 'uso geral'],
  esmalte: ['tinta', 'spray', 'pintura', 'brilhante', 'sintetico'],
  verniz: ['tinta', 'madeira', 'acabamento', 'selador'],
  corante: ['xadrez', 'pigmento', 'tinta', 'tonalizador'],
  xadrez: ['corante', 'pigmento', 'tinta', 'po xadrez'],
  pincel: ['trincha', 'rolo', 'pintura', 'atlas'],
  trincha: ['pincel', 'rolo', 'pintura', 'atlas'],
  rolo: ['pincel', 'trincha', 'pintura', 'atlas', 'la'],
  lixa: ['lixamento', 'massa', 'ferro', 'parede', 'madeira'],
  espatula: ['desempenadeira', 'atlas', 'cortag', 'massa'],
  desempenadeira: ['espatula', 'cortag', 'rejunte', 'massa', 'dentada', 'aco'],

  // Construção Básica e Estrutural
  cimento: ['concreto', 'argamassa', 'csn', 'votoran', 'itau', 'cp2', 'todas as obras'],
  cimentos: ['cimento', 'concreto', 'votoran', 'csn'],
  argamassa: ['massa', 'cimento', 'ac1', 'ac2', 'ac3', 'votomassa', 'quartzolit', 'rejunte'],
  massa: ['argamassa', 'massa corrida', 'massa acrilica', 'rejunte', 'votomassa', 'massa plastica'],
  rejunte: ['rejuntamento', 'limpeza de rejunte', 'cortag', 'tafort', 'acabamento', 'espuma'],
  cal: ['hidratada', 'itau', 'alvenaria', 'reboco'],
  areia: ['pedra', 'brita', 'agregado', 'cimento', 'porto ibiraci'],
  pedra: ['areia', 'brita', 'pedrisco', 'agregado'],
  brita: ['pedra', 'areia', 'agregado', 'concreto'],
  tijolo: ['bloco', 'ceramica', 'alvenaria', 'vargem grande', 'baiano', 'macico'],
  tijolos: ['tijolo', 'bloco', 'ceramica', 'alvenaria'],
  bloco: ['tijolo', 'concreto', 'ceramica', 'espuma', 'vedacao'],
  blocos: ['bloco', 'tijolo'],
  ferro: ['aco', 'vergalhao', 'gerdau', 'estribo', 'armacao', 'trelica', 'arame'],
  aco: ['ferro', 'vergalhao', 'gerdau', 'estribo', 'armacao'],
  arame: ['recozido', 'torcido', 'gerdau', 'armacao', 'morlan'],
  trelica: ['aco', 'ferro', 'gerdau', 'laje'],
  impermeabilizante: ['vedacit', 'manta', 'neutrol', 'impermeabilizacao', 'infiltracao', 'bianco'],
  vedacit: ['impermeabilizante', 'aditivo', 'concreto', 'argamassa', 'bianco'],
  neutrol: ['vedacit', 'impermeabilizante', 'asfalto', 'asfaltico'],
  bianco: ['vedacit', 'adesivo', 'chapisco', 'resina'],

  // Pisos e Ferramentas
  nivelador: ['cortag', 'espacador', 'cunha', 'piso', 'porcelanato', 'revestimento'],
  espacador: ['nivelador', 'cortag', 'cunha', 'piso', 'cruzeta'],
  cunha: ['nivelador', 'cortag', 'espacador', 'piso'],
  trena: ['medicao', 'fita metrica', 'irwin', 'metro'],
  aplicador: ['silicone', 'pistola', 'esqueleto', 'nove54', 'idea'],
  pistola: ['aplicador', 'silicone', 'cola'],
};

/**
 * Avalia o grau de similaridade (0 a 1) entre uma palavra buscada e uma lista de palavras-alvo.
 */
function matchWordAgainstTargets(queryWord: string, targets: string[]): number {
  if (!queryWord || targets.length === 0) return 0;
  const qStem = stemWord(queryWord);
  let best = 0;

  for (const target of targets) {
    if (!target) continue;

    // 1. Igualdade exata
    if (target === queryWord) return 1.0;

    // 2. Mesma raiz gramatical (singular/plural)
    const tStem = stemWord(target);
    if (tStem === qStem) return 0.95;

    // 3. Prefixo (ex: "expan" encontra "expansiva")
    if (target.startsWith(queryWord) && queryWord.length >= 3) {
      best = Math.max(best, 0.88);
    }

    // 4. Tolerância a erros de digitação (Levenshtein)
    const maxDist = queryWord.length <= 4 ? 1 : queryWord.length <= 7 ? 1 : 2;
    const dist = levenshteinDistance(queryWord, target);
    if (dist <= maxDist) {
      const maxLen = Math.max(queryWord.length, target.length);
      const similarity = 1 - dist / maxLen;
      best = Math.max(best, 0.82 * similarity);
    }
  }

  return best;
}

/**
 * Pontua um produto em relação aos termos da busca com inteligência semântica e tolerância a erros.
 */
function scoreProduct(
  product: Product,
  queryTokens: string[],
  normalizedFullQuery: string
): { score: number; matchedTokenCount: number } {
  const normName = normalizeText(product.name);
  const normSku = normalizeText(product.sku);
  const normBrand = normalizeText(product.brand);
  const normCat = normalizeText(product.category);
  const normDept = normalizeText(product.departmentName || '');
  const normApps = (product.applications || []).map(normalizeText).join(' ');
  const normDesc = normalizeText(product.description || '');

  // 1. SKU exato: prioridade máxima
  if (normSku === normalizedFullQuery) {
    return { score: 1000, matchedTokenCount: queryTokens.length };
  }

  // 2. Frase completa contida exatamente no nome: prioridade de destaque
  if (normName.includes(normalizedFullQuery)) {
    return { score: 600, matchedTokenCount: queryTokens.length };
  }

  const nameWords = normName.split(' ').filter(Boolean);
  const brandWords = normBrand.split(' ').filter(Boolean);
  const catWords = normCat.split(' ').filter(Boolean);
  const allCoreWords = [...nameWords, ...brandWords, ...catWords];

  let totalScore = 0;
  let matchedTokens = 0;

  for (const qWord of queryTokens) {
    let wordMatched = false;

    // 1. Avalia no nome do produto (peso 100)
    const nameScore = matchWordAgainstTargets(qWord, nameWords);
    if (nameScore > 0.5) {
      totalScore += nameScore * 100;
      matchedTokens++;
      wordMatched = true;
      continue;
    }

    // 2. Avalia na marca ou categoria (peso 60)
    const brandCatScore = matchWordAgainstTargets(qWord, allCoreWords);
    if (brandCatScore > 0.5) {
      totalScore += brandCatScore * 60;
      matchedTokens++;
      wordMatched = true;
      continue;
    }

    // 3. Avalia sinônimos e termos correlatos da construção (peso 50 a 35)
    const syns = CONSTRUCTION_SYNONYMS[qWord] || CONSTRUCTION_SYNONYMS[stemWord(qWord)] || [];
    for (const syn of syns) {
      if (normName.includes(syn)) {
        totalScore += 50;
        matchedTokens++;
        wordMatched = true;
        break;
      } else if (normCat.includes(syn) || normDept.includes(syn) || normApps.includes(syn)) {
        totalScore += 35;
        matchedTokens++;
        wordMatched = true;
        break;
      }
    }
    if (wordMatched) continue;

    // 4. Avalia nas aplicações e descrição técnica (peso 25)
    if (normApps.includes(qWord) || normDesc.includes(qWord)) {
      totalScore += 25;
      matchedTokens++;
    }
  }

  return { score: totalScore, matchedTokenCount: matchedTokens };
}

/**
 * Mecanismo de Busca Inteligente:
 * - Tolerância a erros ortográficos (ex: "expnsiva" -> "expansiva", "cimentu" -> "cimento")
 * - Sinônimos e termos correlatos de materiais de construção (ex: "cano" -> "tubo", "fio" -> "cabo")
 * - Correspondência fonética e plural/singular ("canos", "tubos", "conexoes")
 * - Ranqueamento por relevância ponderada
 */
export function searchProductsSmart(products: Product[], query: string): Product[] {
  const normQuery = normalizeText(query);
  const qTokens = normQuery.split(' ').filter(Boolean);

  if (!qTokens.length) {
    return products;
  }

  const scoredList: { product: Product; score: number; allMatched: boolean }[] = [];

  for (const product of products) {
    const { score, matchedTokenCount } = scoreProduct(product, qTokens, normQuery);
    const matchRatio = matchedTokenCount / qTokens.length;

    // Critérios de corte inteligente para evitar resultados irrelevantes:
    if (qTokens.length > 1) {
      // Se a consulta possui múltiplos termos (ex: "espuma expnsiva"):
      // Produtos que bateram todos os termos recebem prioridade estrita (allMatched = true)
      if (matchRatio >= 0.9) {
        scoredList.push({ product, score: score * 2, allMatched: true });
      } else if (matchRatio >= 0.5 && score >= 70) {
        scoredList.push({ product, score: score * 0.6, allMatched: false });
      }
    } else {
      // Consulta de termo único (ex: "cimentu" ou "cano"):
      if (score >= 35) {
        scoredList.push({ product, score, allMatched: true });
      }
    }
  }

  // Se houver produtos que satisfazem todos os termos pesquisados, prioriza-os estritamente
  const hasAllMatched = scoredList.some((item) => item.allMatched);
  const eligible = hasAllMatched ? scoredList.filter((item) => item.allMatched) : scoredList;

  // Ordena por pontuação de relevância decrescente
  eligible.sort((a, b) => b.score - a.score);

  return eligible.map((item) => item.product);
}
