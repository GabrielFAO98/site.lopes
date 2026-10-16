import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const productsPath = path.resolve(__dirname, '../data/products.json');

const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

// 1. Atualizar prod-2978 (Bulbo 9W, 12W, 15W)
const bulboIndex = products.findIndex(p => p.id === 'prod-2978' || p.sku === '2978');
const bulboProduct = {
  id: 'prod-2978',
  sku: '2978',
  name: 'Lâmpada LED Bulbo Bivolt Foxlux Luz Fria 6500K E27',
  slug: 'lampada-led-bulbo-foxlux-9w-bivolt-6500k',
  description: 'Lâmpada LED Bulbo Foxlux com soquete padrão E27 e tecnologia Bivolt Automático (100V a 240V). Alta eficiência luminosa, economia de até 85% de energia e vida útil de 25.000 horas para iluminação residencial e comercial.',
  price: 6.0,
  unit: 'UN',
  departmentId: 'eletrica',
  departmentName: 'Elétrica e Iluminação',
  category: 'Iluminação LED',
  brand: 'Foxlux',
  inStock: true,
  stockBadge: 'Pronta Entrega',
  featured: true,
  images: [
    '/images/produtos/lampada-led-bulbo-foxlux-9w-bivolt-6500k.webp'
  ],
  variationType: 'Potência',
  variations: [
    { name: '9W (810 lm)', sku: '2978', price: 6.0, unit: 'UN' },
    { name: '12W (1050 lm)', sku: '2979', price: 8.0, unit: 'UN' },
    { name: '15W (1350 lm)', sku: '2980', price: 9.0, unit: 'UN' }
  ],
  technicalSpecs: {
    'Base / Soquete': 'E27 (rosca comum residencial)',
    'Tensão': 'Bivolt Automático (100V a 240V)',
    'Frequência': '50/60 Hz',
    'Temperatura de Cor': '6500K (Luz Fria / Branca)',
    'Vida Útil': '25.000 horas (L70)',
    'Índice de Reprodução de Cor (IRC)': '> 80',
    'Fator de Potência': '> 0,7',
    'Ângulo de Abertura': '200°',
    'Certificação': 'Selo Procel / Inmetro',
    'Código ERP': '2978 / 2979 / 2980'
  },
  applications: [
    'Iluminação residencial em salas, dormitórios, cozinhas, lavanderias e banheiros',
    'Escritórios comerciais, consultórios, recepções e corredores',
    'Plafons, arandelas, pendentes e luminárias de mesa ou embutir com soquete E27'
  ],
  warranty: '1 ano de garantia Foxlux',
  relatedSkus: ['289', '1215', '100597', '20401'],
  detailedDescription: 'A Lâmpada LED Bulbo Bivolt Foxlux com Luz Fria (6500K) combina altíssima eficiência luminosa, durabilidade excepcional e até 85% de economia de energia na iluminação de residências e comércios.\n\nCom fluxo luminoso que varia de 810 a 1350 lúmens conforme a potência escolhida (9W, 12W ou 15W), ela substitui com folga as antigas lâmpadas incandescentes de 60W a 100W e lâmpadas fluorescentes compactas, proporcionando claridade nítida e uniforme sem emitir calor excessivo no ambiente.\n\nA tonalidade branca fria de 6500K estimula o foco, a atenção e a sensação de limpeza, sendo indispensável para cozinhas, lavanderias, banheiros, garagens e escritórios. Desenvolvida em polímero e alumínio de alta resistência mecânica, conta com difusor leitoso que ameniza o ofuscamento visual.\n\nPossui tecnologia Bivolt Automático (100V a 240V) que absorve pequenas oscilações de voltagem da rede e base padrão rosqueável E27. Vida útil estimada em 25.000 horas de uso contínuo, livre de mercúrio e sem emissão de raios ultravioleta.',
  faq: [
    {
      question: 'Qual a equivalência de cada potência em relação às lâmpadas antigas?',
      answer: 'O modelo de 9W substitui lâmpadas incandescentes de 60W; o de 12W equivale a 75W; e o de 15W equivale a uma lâmpada antiga de 90W a 100W, economizando até 85% na conta de luz.'
    },
    {
      question: 'Serve em redes elétricas de 110V (127V) e 220V?',
      answer: 'Sim, todas as lâmpadas bulbo Foxlux são Bivolt Automáticas (100V a 240V), funcionando perfeitamente em qualquer residência ou comércio sem risco de queima.'
    },
    {
      question: 'Qual a indicação da luz fria 6500K?',
      answer: 'A luz fria 6500K emite luz branca pura, indicada para cozinhas, lavanderias, banheiros, oficinas e locais de trabalho ou estudo que demandam máxima visibilidade e foco.'
    },
    {
      question: 'O bocal é o tamanho comum?',
      answer: 'Sim! Possui soquete rosqueável padrão E27, o mais utilizado no Brasil em plafons, arandelas, pendentes e luminárias de teto.'
    }
  ]
};

if (bulboIndex >= 0) {
  products[bulboIndex] = bulboProduct;
} else {
  products.push(bulboProduct);
}

// 2. Criar ou atualizar prod-289 (Alta Potência 20W, 30W, 40W, 50W, 75W, 100W)
const altaIndex = products.findIndex(p => p.id === 'prod-289' || p.sku === '289' || p.slug === 'lampada-led-alta-potencia-foxlux');
const altaProduct = {
  id: 'prod-289',
  sku: '289',
  name: 'Lâmpada LED Alta Potência T-Bulbo Bivolt Foxlux Luz Fria 6500K',
  slug: 'lampada-led-alta-potencia-foxlux',
  description: 'Lâmpada LED T-Bulbo de alta intensidade luminosa Foxlux para grandes espaços, áreas com pé-direito alto, galpões e comércios. Bivolt automático, dissipador térmico de alto rendimento e longa vida útil.',
  price: 12.5,
  unit: 'UN',
  departmentId: 'eletrica',
  departmentName: 'Elétrica e Iluminação',
  category: 'Iluminação LED',
  brand: 'Foxlux',
  inStock: true,
  stockBadge: 'Pronta Entrega',
  featured: true,
  images: [
    '/images/produtos/lampada-led-alta-potencia-foxlux.webp',
    '/images/produtos/lampada-led-alta-potencia-foxlux-2.webp'
  ],
  variationType: 'Potência',
  variations: [
    { name: '20W (1600 lm - Base E27)', sku: '289', price: 12.5, unit: 'UN' },
    { name: '30W (2400 lm - Base E27)', sku: '622', price: 25.0, unit: 'UN' },
    { name: '40W (3200 lm - Base E27)', sku: '617', price: 28.5, unit: 'UN' },
    { name: '50W (4000 lm - Base E27)', sku: '1063', price: 30.0, unit: 'UN' },
    { name: '75W (6000 lm - Base E27 / E40)', sku: '100847', price: 65.0, unit: 'UN' },
    { name: '100W (8000 lm - Base E27 / E40)', sku: '100791', price: 75.0, unit: 'UN' }
  ],
  technicalSpecs: {
    'Base / Soquete': 'E27 (com compatibilidade E40 nos modelos de 75W e 100W)',
    'Tensão': 'Bivolt Automático (100V a 240V)',
    'Frequência': '50/60 Hz',
    'Temperatura de Cor': '6500K (Luz Branca Fria)',
    'Vida Útil': '25.000 horas',
    'Índice de Reprodução de Cor (IRC)': '> 80',
    'Ângulo de Abertura': '200° (alta amplitude de facho)',
    'Corpo e Dissipador': 'Polímero térmico injetado com dissipador interno de alumínio',
    'Certificação': 'Conforme portaria Inmetro para lâmpadas LED',
    'Código ERP': '000289 / 000622 / 000617 / 001063 / 100847 / 100791'
  },
  applications: [
    'Galpões industriais, depósitos, estoques e centros logísticos',
    'Supermercados, oficinas mecânicas, centros automotivos e serralherias',
    'Condomínios, garagens cobertas, quadras e áreas com pé-direito alto (3 a 6 metros)',
    'Áreas externas cobertas protegidas contra intempéries diretas'
  ],
  warranty: '1 ano de garantia Foxlux',
  relatedSkus: ['2978', '1215', '100597'],
  detailedDescription: 'A Lâmpada LED Alta Potência T-Bulbo Foxlux foi projetada para atender projetos elétricos e ambientes que demandam alto fluxo luminoso e grande cobertura de área, onde lâmpadas residenciais comuns não atingem o nível exigido de lúmens.\n\nSeu design cilíndrico T-Bulbo com difusor em policarbonato leitoso entrega ângulo de abertura de 200°, distribuindo a claridade sem deixar zonas de sombra e com mínimo ofuscamento. Fabricada com dissipador de alumínio estruturado, ela dissipa o calor gerado pelos chips SMD eficientemente, garantindo vida útil nominal de 25.000 horas sem degradação precoce da luminosidade.\n\nFunciona em Bivolt Automático (100V a 240V) e conta com soquete padrão rosqueável E27 nas potências de 20W, 30W, 40W e 50W, e compatibilidade com soquetes E27 e industriais E40 nas opções de 75W e 100W. Substitui com grande economia de energia lâmpadas a vapor metálico, vapor de sódio, lâmpadas mistas e fluorescentes industriais.',
  faq: [
    {
      question: 'Para quais locais a lâmpada LED de Alta Potência é indicada?',
      answer: 'É recomendada para galpões, garagens, oficinas mecânicas, comércios, academias, depósitos e locais com pé-direito alto (acima de 3 metros), onde lâmpadas bulbo comuns não conseguem iluminar adequadamente o piso de trabalho.'
    },
    {
      question: 'Qual é o tipo de bocal (soquete)?',
      answer: 'As potências de 20W a 50W utilizam o bocal padrão E27 (o mesmo de residências). As potências mais altas de 75W e 100W são compatíveis com bocal E27 e luminárias industriais com bocal E40.'
    },
    {
      question: 'Ela necessita de reator ou ignitor?',
      answer: 'Não. Todas as lâmpadas de LED de alta potência Foxlux possuem reator/driver eletrônico interno bivolt (100V a 240V) integrado na base. A instalação é feita rosqueando diretamente no soquete.'
    },
    {
      question: 'O produto esquenta muito durante o funcionamento?',
      answer: 'Ela aquece consideravelmente menos do que antigas lâmpadas de vapor ou incandescentes potentes. Seu dissipador térmico em alumínio dissipa o calor para trás, mantendo o ambiente e os produtos estocados protegidos.'
    }
  ]
};

if (altaIndex >= 0) {
  products[altaIndex] = altaProduct;
} else {
  products.push(altaProduct);
}

// 3. Criar ou atualizar prod-1215 (Tubular T8 9W e 18W)
const tubIndex = products.findIndex(p => p.id === 'prod-1215' || p.sku === '1215' || p.slug === 'lampada-led-tubular-t8-foxlux');
const tubProduct = {
  id: 'prod-1215',
  sku: '1215',
  name: 'Lâmpada LED Tubular T8 Bivolt 6500K Foxlux Base G13',
  slug: 'lampada-led-tubular-t8-foxlux',
  description: 'Lâmpada LED Tubular T8 Foxlux com base G13 e tecnologia Bivolt Automático (100V a 240V). Substitui diretamente lâmpadas fluorescentes convencionais de 20W e 40W sem necessidade de reator.',
  price: 13.0,
  unit: 'UN',
  departmentId: 'eletrica',
  departmentName: 'Elétrica e Iluminação',
  category: 'Iluminação LED',
  brand: 'Foxlux',
  inStock: true,
  stockBadge: 'Pronta Entrega',
  featured: true,
  images: [
    '/images/produtos/lampada-led-tubular-t8-foxlux.webp',
    '/images/produtos/lampada-led-tubular-t8-foxlux-2.webp'
  ],
  variationType: 'Potência / Medida',
  variations: [
    { name: '9W - 60cm (900 lm)', sku: '1215', price: 13.0, unit: 'UN' },
    { name: '18W - 120cm (1850 lm)', sku: '2981', price: 15.0, unit: 'UN' }
  ],
  technicalSpecs: {
    'Base / Soquete': 'G13 (bi-pino tradicional)',
    'Formato': 'Tubular T8 (diâmetro 26 mm)',
    'Comprimento': '60 cm (versão 9W) / 120 cm (versão 18W)',
    'Tensão': 'Bivolt Automático (100V a 240V)',
    'Frequência': '50/60 Hz',
    'Temperatura de Cor': '6500K (Branco Frio / Luz do Dia)',
    'Vida Útil': '25.000 horas',
    'Índice de Reprodução de Cor (IRC)': '> 80',
    'Tipo de Ligação': 'Ligação direta na rede (dispensa reator eletromagnético ou eletrônico)',
    'Certificação': 'Selo Inmetro / Procel',
    'Código ERP': '001215 / 002981'
  },
  applications: [
    'Luminárias de sobrepor, calhas e embutidos de teto comerciais e residenciais',
    'Cozinhas, lavanderias, garagens, dispensas e corredores',
    'Escritórios, consultórios médicos, clínicas, farmácias e supermercados',
    'Estacionamentos cobertos, indústrias leves e áreas de atendimento'
  ],
  warranty: '1 ano de garantia Foxlux',
  detailedDescription: 'A Lâmpada LED Tubular T8 Foxlux é a escolha padrão para modernizar luminárias de teto residenciais e comerciais, eliminando de vez reatores defeituosos, piscamentos e zumbidos desagradáveis.\n\nDesenvolvida para substituir diretamente lâmpadas fluorescentes tubulares tradicionais de 16W/20W (modelo de 60cm com 9W LED) e 32W/40W (modelo de 120cm com 18W LED), proporciona economia de até 60% de energia elétrica ao eliminar o consumo passivo dos antigos reatores.\n\nPossui acendimento instantâneo com 100% de luminosidade imediata. Seu tubo de vidro com tratamento leitoso assegura distribuição de luz contínua, homogênea e sem pontos de LED visíveis. Funciona em sistema Bivolt Automático (100V a 240V) com soquete universal G13.',
  faq: [
    {
      question: 'Preciso remover o reator antigo da calha?',
      answer: 'Sim. A lâmpada LED tubular Foxlux funciona conectada diretamente à rede elétrica (110V ou 220V) e não utiliza reator elétrico. O reator antigo deve ser desligado e retirado da calha.'
    },
    {
      question: 'Serve no mesmo encaixe da lâmpada fluorescente comum?',
      answer: 'Sim! Possui a mesma base G13 (dois pinos de cada lado) e o mesmo diâmetro padrão T8, encaixando com perfeição nas calhas existentes de 60 cm e 120 cm.'
    },
    {
      question: 'Qual a vantagem da tecnologia LED em relação às tubulares antigas?',
      answer: 'Além de economizar até 60% de energia e não esquentar o ambiente, a lâmpada LED não pisca ao acender, não faz zumbido elétrico, dura mais de 25.000 horas e não contém mercúrio tóxico em sua composição.'
    },
    {
      question: 'Funciona tanto em 127V quanto em 220V?',
      answer: 'Sim, é Bivolt Automática (100V a 240V), funcionando perfeitamente em qualquer tensão sem necessidade de chaveamento manual.'
    }
  ],
  relatedSkus: ['2978', '289', '100597']
};

if (tubIndex >= 0) {
  products[tubIndex] = tubProduct;
} else {
  products.push(tubProduct);
}

fs.writeFileSync(productsPath, JSON.stringify(products, null, 2), 'utf8');
console.log(`✅ Catálogo atualizado com sucesso! Total de produtos no catálogo: ${products.length}`);
console.log(`   - prod-2978: Lâmpada LED Bulbo Foxlux (9W, 12W, 15W)`);
console.log(`   - prod-289: Lâmpada LED Alta Potência Foxlux (20W, 30W, 40W, 50W, 75W, 100W)`);
console.log(`   - prod-1215: Lâmpada LED Tubular T8 Foxlux (9W 60cm, 18W 120cm)`);

