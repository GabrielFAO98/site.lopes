import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const jsonPath = path.resolve(__dirname, '../data/products.json');

const products = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

const newProducts = [
  {
    id: "prod-3486",
    sku: "3486",
    name: "Adesivo Plástico para Tubos e Conexões de PVC Amanco Wavin",
    slug: "adesivo-plastico-pvc-amanco-wavin",
    description: "Adesivo plástico para soldagem a frio de tubos e conexões de PVC rígido para água fria. Fórmula isenta de toluol com secagem rápida e alta resistência à pressão.",
    price: 4,
    unit: "UN",
    departmentId: "hidraulica",
    departmentName: "Tubos e Conexões",
    category: "Adesivos e Lubrificantes para Tubos",
    brand: "Amanco Wavin",
    inStock: true,
    stockBadge: "Pronta Entrega",
    featured: false,
    images: [
      "/images/produtos/adesivo-plastico-pvc-amanco-bisnaga-17g.webp",
      "/images/produtos/adesivo-plastico-pvc-amanco-bisnaga-75g.webp",
      "/images/produtos/adesivo-plastico-pvc-amanco-frasco-175g.webp",
      "/images/produtos/adesivo-plastico-pvc-amanco-frasco-850g.webp"
    ],
    technicalSpecs: {
      "Base Química": "Solventes orgânicos e resina virgem de PVC",
      "Isento de Toluol": "Sim (maior segurança e menor toxicidade ao instalador)",
      "Norma Técnica": "ABNT NBR 5648 e NBR 14264",
      "Tempo para Teste de Pressão": "12 horas para diâmetros até 60mm / 24 horas para grandes diâmetros",
      "Liberação Inicial de Água": "Aguardar no mínimo 6 horas sob baixa pressão",
      "Diâmetros Indicados": "20mm a 110mm em sistemas prediais de água fria",
      "Inflamabilidade": "Líquido e vapores inflamáveis (manter ao abrigo do calor)"
    },
    applications: [
      "Soldagem química a frio de tubulações e conexões de PVC marrom soldável para água fria",
      "Instalações hidráulicas prediais, residenciais, comerciais e industriais",
      "Embalagens em bisnaga ideais para reparos rápidos; frascos com pincel recomendados para obras completas"
    ],
    warranty: "Garantia do fabricante Amanco Wavin conforme prazo de validade na embalagem",
    relatedSkus: ["100025", "1619", "2802", "100334"],
    variationType: "Embalagem",
    variations: [
      {
        name: "Bisnaga 17g",
        sku: "3486",
        price: 4,
        inStock: true,
        image: "/images/produtos/adesivo-plastico-pvc-amanco-bisnaga-17g.webp"
      },
      {
        name: "Bisnaga 75g",
        sku: "100004",
        price: 9,
        inStock: true,
        image: "/images/produtos/adesivo-plastico-pvc-amanco-bisnaga-75g.webp"
      },
      {
        name: "Frasco 175g com Pincel",
        sku: "100003",
        price: 24,
        inStock: true,
        image: "/images/produtos/adesivo-plastico-pvc-amanco-frasco-175g.webp"
      },
      {
        name: "Frasco 850g com Pincel",
        sku: "764",
        price: 77,
        inStock: true,
        image: "/images/produtos/adesivo-plastico-pvc-amanco-frasco-850g.webp"
      }
    ],
    detailedDescription: "O Adesivo Plástico para PVC Amanco Wavin é a solução profissional definitiva para a união por soldagem a frio de tubos e conexões de PVC rígido em redes prediais de água fria. Formulado à base de resina de PVC de alta pureza e solventes orgânicos selecionados, ele promove uma fusão química homogênea entre as superfícies em contato, garantindo estanqueidade absoluta e durabilidade de até 50 anos para o sistema hidráulico.\n\nUm grande diferencial técnico do adesivo Amanco Wavin é ser 100% isento de toluol, proporcionando maior segurança à saúde dos instaladores e encanadores durante o uso diário em ambientes fechados. Não altera a potabilidade da água potável e não deixa gosto nem odor residual após a cura completa.\n\nDisponível em 4 formatos que atendem desde pequenos reparos domésticos (bisnagas práticas de 17g e 75g) até grandes empreendimentos da construção civil (frascos de 175g e 850g equipados com pincel dosador acoplado à tampa para aplicação rápida e uniforme).",
    faq: [
      {
        question: "Como fazer a colagem correta do tubo de PVC?",
        answer: "Lixe a ponta do tubo e a bolsa da conexão com lixa d'água 100. Limpe com a solução limpadora para tirar todo o pó e oleosidade. Aplique uma camada fina e uniforme de adesivo na bolsa e no tubo, encaixe imediatamente com um quarto de volta e segure por 30 segundos. Limpe o excesso de adesivo."
      },
      {
        question: "Quanto tempo devo esperar para ligar a água após colar?",
        answer: "Aguarde no mínimo 6 horas para liberar água sob baixa pressão. Para realizar o teste de estanqueidade e pressão plena da rede, respeite rigorosamente o intervalo de 12 horas (para bitolas até 60mm) ou 24 horas (para grandes diâmetros)."
      },
      {
        question: "O adesivo Amanco serve para colar cano de água quente?",
        answer: "Não. Para tubulações de água quente em CPVC ou PPR deve ser utilizado adesivo específico, como o Adesivo Super CPVC FlowGuard Amanco Wavin."
      },
      {
        question: "Qual a diferença entre a bisnaga e o frasco?",
        answer: "As bisnagas (17g e 75g) possuem bico aplicador, ideais para reparos rápidos e pequenos diâmetros. Os frascos (175g e 850g) trazem pincel aplicador embutido na tampa, facilitando a distribuição homogênea em conexões de grande porte e em obras de ritmo acelerado."
      }
    ]
  },
  {
    id: "prod-100334",
    sku: "100334",
    name: "Adesivo Plástico para Tubos e Conexões de CPVC Super CPVC FlowGuard Amanco Wavin 175g",
    slug: "adesivo-cpvc-amanco-flowguard-175g",
    description: "Adesivo especial de alta performance para soldagem de tubos e conexões de CPVC para água quente e fria. Cor verde para fácil inspeção, isento de toluol e com pincel aplicador.",
    price: 40,
    unit: "UN",
    departmentId: "hidraulica",
    departmentName: "Tubos e Conexões",
    category: "Adesivos e Lubrificantes para Tubos",
    brand: "Amanco Wavin",
    inStock: true,
    stockBadge: "Pronta Entrega",
    featured: false,
    images: [
      "/images/produtos/adesivo-cpvc-amanco-flowguard-175g.webp"
    ],
    technicalSpecs: {
      "Base Química": "Solventes orgânicos selecionados e resina virgem de CPVC FlowGuard",
      "Cor": "Verde translúcido (facilita inspeção visual da cobertura de adesivo)",
      "Isento de Toluol": "Sim (manuseio mais seguro)",
      "Embalagem": "Frasco de 175g com pincel aplicador acoplado à tampa",
      "Temperatura de Trabalho": "Suporta condução contínua de água até 82°C (com picos de 95°C)",
      "Norma Técnica": "ABNT NBR 15884",
      "Compatibilidade": "Exclusivo para tubos e conexões da linha Super CPVC FlowGuard Amanco Wavin"
    },
    applications: [
      "Soldagem química de tubos e conexões da linha CPVC para condução de água quente e fria sob pressão",
      "Instalações hidráulicas em banheiros, cozinhas, lavanderias e saídas de aquecedores solares, a gás ou elétricos",
      "Uso em residências, edifícios, hospitais, hotéis e instalações comerciais que exigem água quente segura"
    ],
    warranty: "Garantia do fabricante Amanco Wavin conforme prazo de validade na embalagem",
    relatedSkus: ["100025", "3486", "1619", "2802"],
    detailedDescription: "O Adesivo Plástico Super CPVC FlowGuard Amanco Wavin 175g foi desenvolvido com rigor tecnológico para a união confiável e estanque de tubulações e conexões de CPVC destinadas à condução de água quente e fria sob pressão contínua.\n\nSua formulação diferenciada na cor verde atua como um recurso essencial de controle de qualidade na obra: o profissional visualiza com clareza se toda a bolsa da conexão e a ponta do tubo receberam a quantidade exata de adesivo, evitando pontos secos e futuros vazamentos. O frasco conta com pincel integrado à tampa para uma dosagem precisa sem respingos.\n\nIsento de toluol e em conformidade com as normas ABNT NBR 15884, o composto CPVC FlowGuard suporta condução permanente de água quente a 82°C com picos esporádicos de até 95°C, mantendo sua integridade mecânica ao longo de décadas sem sofrer corrosão nem alterar as propriedades de potabilidade da água.",
    faq: [
      {
        question: "Posso usar o adesivo de PVC comum para colar cano de água quente CPVC?",
        answer: "Nunca! O adesivo para PVC comum não suporta as temperaturas elevadas e dilatações térmicas do CPVC. O uso de adesivo inadequado causará rompimento da junta e vazamentos sérios. Use sempre o adesivo Super CPVC específico."
      },
      {
        question: "Por que o adesivo de CPVC é verde?",
        answer: "A tonalidade verde permite ao encanador e ao mestre de obras certificar visualmente que o produto foi aplicado em 100% da superfície de contato do tubo e da conexão, garantindo controle de qualidade na instalação."
      },
      {
        question: "Qual o modo correto de aplicação nas conexões de água quente?",
        answer: "Corte o tubo no esquadro, retire as rebarbas, limpe bem as superfícies com limpador CPVC. Com o pincel do frasco, aplique uma camada fina uniforme no tubo e na conexão, encaixe dando 1/4 de volta e mantenha pressionado por 30 segundos. Limpe o excesso externo."
      },
      {
        question: "Quanto tempo esperar antes de liberar a água quente no sistema?",
        answer: "Recomenda-se aguardar no mínimo 24 horas de cura antes de submeter a tubulação ao teste de pressão hidrostática e à circulação de água em temperatura elevada."
      }
    ]
  },
  {
    id: "prod-1425",
    sku: "1425",
    name: "Graxa Azul à Base de Sabão de Lítio Unilit Blue II 500g Ingrax",
    slug: "graxa-azul-unilit-blue-500g-ingrax",
    description: "Graxa azul multifuncional NLGI 2 à base de sabão de lítio de alto rendimento. Excelente resistência à água, oxidação e calor, ideal para rolamentos, chassis, mancais e engrenagens.",
    price: 34,
    unit: "UN",
    departmentId: "jardim-e-utilidades",
    departmentName: "Jardim e Área Externa",
    category: "Lubrificantes e Graxas",
    brand: "Ingrax",
    inStock: true,
    stockBadge: "Pronta Entrega",
    featured: false,
    images: [
      "/images/produtos/graxa-azul-unilit-blue-500g-ingrax.webp"
    ],
    technicalSpecs: {
      "Espessante": "Sabão de Lítio de alto desempenho",
      "Consistência": "Grau NLGI 2",
      "Cor": "Azul com textura lisa e homogênea",
      "Ponto de Gota": "190°C a 195°C",
      "Faixa de Temperatura de Trabalho": "-20°C a +150°C",
      "Normas Atendidas": "DIN 51825 (K2P-20) e ASTM D-4950 (LA/GB)",
      "Embalagem": "Pote plástico de 500g com tampa de vedação",
      "Propriedades": "Anticorrosiva, antioxidante e com excelente estabilidade mecânica sob rotação"
    },
    applications: [
      "Rolamentos de rodas automotivos, cubos, mancais e juntas universais estriadas",
      "Máquinas agrícolas, tratores, colheitadeiras, eixos cardans e pivôs",
      "Equipamentos da construção civil: betoneiras, guinchos de coluna, vibradores e compactadores",
      "Mancais industriais e motores elétricos submetidos a cargas médias e altas temperaturas"
    ],
    warranty: "Garantia do fabricante Ingrax conforme especificações técnicas do lote",
    relatedSkus: ["2182", "3411", "3347", "100472"],
    detailedDescription: "A Graxa Azul Unilit Blue II 500g da Ingrax é uma das graxas lubrificantes mais renomadas do Brasil para uso profissional e automotivo pesado. Formulada à base de sabão de lítio e óleos minerais altamente refinados, ela oferece proteção de primeira linha contra atrito, desgaste prematuro, oxidação e corrosão de componentes mecânicos móveis.\n\nSua clássica tonalidade azul facilita a identificação visual durante o engraxamento e manutenção preventiva. Com grau NLGI 2 e elevado ponto de gota (acima de 190°C), mantém suas características de consistência sem escorrer ou amolecer mesmo sob altas temperaturas de frenagem e esforço contínuo em rolamentos de rodas e mancais industriais.\n\nPossui excelente repelência à água (resistência à lavagem por chuvas e umidade), mantendo o filme lubrificante aderido às esferas e roletes por longos períodos de operação, o que estende os intervalos entre relubrificações e reduz custos de manutenção.",
    faq: [
      {
        question: "Por que a graxa Unilit Blue é azul?",
        answer: "A cor azul serve para identificação técnica e controle visual durante a aplicação, garantindo que o mecânico ou operador confirme que todas as partes móveis foram devidamente lubrificadas."
      },
      {
        question: "Essa graxa serve para rolamentos de roda de veículos?",
        answer: "Sim, é amplamente recomendada para cubos de roda e rolamentos automotivos devido ao seu ponto de gota superior a 190°C e estabilidade sob rotação."
      },
      {
        question: "Posso usar em betoneiras e máquinas de obra?",
        answer: "Com certeza! É excelente para engrenagens de betoneiras, mancais de eixos e ferramentas elétricas pesadas, protegendo contra umidade e poeira da obra."
      },
      {
        question: "Qual a diferença entre a graxa azul de lítio e a graxa de cálcio?",
        answer: "A graxa azul à base de lítio suporta temperaturas muito mais altas (até 150°C contínuos com ponto de gota em 190°C) e rotações elevadas como rolamentos. A graxa de cálcio (chassis) é mais focada em ambientes frios e baixas rotações com altíssima resistência à água."
      }
    ]
  },
  {
    id: "prod-3411",
    sku: "3411",
    name: "Graxa para Chassis CA-2 NLGI 2 500g Vonder",
    slug: "graxa-chassis-ca2-500g-vonder",
    description: "Graxa à base de cálcio altamente hidrorepelente e adesiva. Especialmente desenvolvida para lubrificação de chassis, pinos, mancais, guinchos e equipamentos sob ação de umidade.",
    price: 30,
    unit: "UN",
    departmentId: "jardim-e-utilidades",
    departmentName: "Jardim e Área Externa",
    category: "Lubrificantes e Graxas",
    brand: "Vonder",
    inStock: true,
    stockBadge: "Pronta Entrega",
    featured: false,
    images: [
      "/images/produtos/graxa-chassis-ca2-500g-vonder.webp"
    ],
    technicalSpecs: {
      "Código do Fabricante": "51.25.000.500",
      "Espessante": "Sabão de Cálcio Anidro (hidrorepelente)",
      "Consistência": "Grau NLGI 2",
      "Cor": "Castanha escura / Âmbar",
      "Ponto de Gota": "Aproximadamente 90°C",
      "Composição": "Óleos minerais de alta viscosidade e aditivos anticorrosivos",
      "Destaque": "Altíssima adesividade a superfícies metálicas e resistência extrema à água",
      "Embalagem": "Pote plástico com 500g"
    },
    applications: [
      "Articulações de chassis automotivos, veículos de carga, ônibus e utilitários",
      "Pinos de suspensão, feixes de mola, terminais de direção e cabos de aço",
      "Mancais planos, pinos graxeiros de tratores, esteiras, implementos agrícolas e carretas",
      "Equipamentos da construção civil e oficinas que trabalham sob chuva, poeira e intempéries"
    ],
    warranty: "3 meses de garantia legal Vonder",
    relatedSkus: ["2182", "1425", "3347", "100472"],
    detailedDescription: "A Graxa para Chassis CA-2 500g da Vonder (código 51.25.000.500) é a escolha profissional ideal para lubrificação e proteção de componentes expostos diretamente à ação constante de água, umidade, terra e poeira.\n\nFormulada com sabão de cálcio anidro e óleos de alta viscosidade, destaca-se por sua extraordinária adesividade: a graxa 'gruda' nas peças metálicas e não é lavada facilmente mesmo sob chuva forte ou esguichos diretos. Isso garante proteção contínua contra corrosão, ferrugem e desgaste prematuro de pinos, buchas e articulações de chassis.\n\nCom consistência padrão NLGI 2, é de fácil manuseio com espátula ou abastecimento em bombas manuais de engraxar (engraxadeiras), sendo indispensável em oficinas mecânicas, fazendas, frotas de transporte e canteiros de obras.",
    faq: [
      {
        question: "Para quais tipos de peças a graxa CA-2 de chassis é recomendada?",
        answer: "É indicada para articulações de chassis, pinos de mola, terminais, guinchos, cabos e partes móveis que operam sob temperaturas moderadas e necessitam de extrema resistência à água."
      },
      {
        question: "Posso aplicar em rolamentos de rodas?",
        answer: "Não é recomendada para rolamentos de alta rotação ou cubos de roda que sofrem altas temperaturas de frenagem. Para rolamentos, use a graxa de lítio de alta temperatura, como a Graxa Azul Unilit Blue."
      },
      {
        question: "Essa graxa sai com água da chuva?",
        answer: "Não! O sabão de cálcio confere característica hidrorepelente com altíssima adesão às peças, repelindo a água e protegendo contra ferrugem por longos períodos."
      },
      {
        question: "Como aplicar nos pinos graxeiros?",
        answer: "O pote de 500g pode ser abastecido diretamente em engraxadeiras manuais ou aplicado com espátula em engrenagens abertas e pontos de engraxamento manual."
      }
    ]
  },
  {
    id: "prod-100829",
    sku: "100829",
    name: "Ducha Elétrica Eletrônica Top Jet Lorenzetti com Haste Seletora",
    slug: "ducha-eletrica-top-jet-eletronica-lorenzetti",
    description: "Ducha com controle eletrônico gradual de temperatura e grande espalhador. Permite ajustar o banho milimetricamente pelo alcance da mão com haste de comando de 30cm.",
    price: 250,
    unit: "UN",
    departmentId: "banheiro-e-cozinha",
    departmentName: "Banheiro e Cozinha",
    category: "Chuveiros e Duchas",
    brand: "Lorenzetti",
    inStock: true,
    stockBadge: "Pronta Entrega",
    featured: true,
    images: [
      "/images/produtos/ducha-eletrica-top-jet-eletronica-lorenzetti.webp"
    ],
    technicalSpecs: {
      "Tipo de Comando": "Eletrônico gradual (ajuste linear da temperatura sem desligar o chuveiro)",
      "Potência 127V": "5500W (Requer fiação mínima de 10 mm² e disjuntor de 50A)",
      "Potência 220V": "7500W (Requer fiação mínima de 6 mm² e disjuntor de 40A)",
      "Haste de Controle": "Haste prolongadora de 30 cm para fácil alcance das mãos",
      "Espalhador": "Grande espalhador circular para ampla cobertura de água",
      "Pressão de Funcionamento": "10 a 400 kPa (1 a 40 m.c.a.)",
      "Grau de Proteção": "IP 24",
      "Compatibilidade": "Compatível com aquecimento solar e Dispositivo DR (Diferencial Residual)",
      "Resistência Refil": "Refil tipo cartucho de troca rápida código 3056-E (127V) e 3056-F (220V)"
    },
    applications: [
      "Banheiros residenciais para máximo conforto térmico e economia de energia no verão",
      "Instalação direta na parede com conexão padrão 1/2\"",
      "Apropriado para residências térreas ou apartamentos com média/alta pressão"
    ],
    warranty: "1 ano de garantia Lorenzetti",
    relatedSkus: ["100597", "1577", "1619", "2802"],
    variationType: "Voltagem",
    variations: [
      {
        sku: "100829",
        name: "127V (5500W)",
        voltage: "127V",
        power: "5500W",
        price: 250,
        inStock: true
      },
      {
        sku: "100830",
        name: "220V (7500W)",
        voltage: "220V",
        power: "7500W",
        price: 250,
        inStock: true
      }
    ],
    detailedDescription: "A Ducha Top Jet Eletrônica da Lorenzetti redefine a experiência do banho diário, combinando um espalhador de grandes dimensões com a máxima precisão do comando eletrônico de temperatura. Diferente dos chuveiros convencionais com posições fixas, o sistema eletrônico funciona de forma contínua — como o botão de volume de um rádio —, permitindo encontrar o ponto exato de conforto térmico mesmo nos dias mais amenos de meia-estação.\n\nConta com haste prolongadora de 30 cm que fica ao alcance das mãos, permitindo regular a temperatura suavemente com a água correndo, sem riscos e com total comodidade. Esse controle milimétrico gera economia significativa de energia elétrica e água no verão, pois utiliza apenas a potência necessária para aquecer o banho.\n\nSeu sistema de resistência tipo refil em cartucho possibilita troca rápida e prática sem necessidade de desmontar todo o aparelho da parede. É compatível com sistemas de aquecimento solar e circuitos protegidos por disjuntor diferencial residual (DR).",
    faq: [
      {
        question: "Qual a diferença entre a Top Jet Eletrônica e a Top Jet Multitemperaturas?",
        answer: "A versão Eletrônica possui ajuste gradual e contínuo da temperatura (você regula no milímetro através da haste mesmo com o chuveiro ligado). A versão Multitemperaturas possui 4 temperaturas pré-fixadas (Desligado, Morno, Quente e Super Quente) e a mudança deve ser feita de preferência com o registro fechado."
      },
      {
        question: "Qual fiação e disjuntor devo usar?",
        answer: "Para 127V (5500W): disjuntor exclusivo de 50A e fiação de 10 mm². Para 220V (7500W): disjuntor exclusivo de 40A e fiação de 6 mm² (para distâncias até 30 metros)."
      },
      {
        question: "Como evitar a queima da resistência na primeira instalação?",
        answer: "Com o disjuntor desligado, abra o registro de água e deixe a ducha correr água fria por cerca de 1 minuto para encher completamente a câmara e expulsar o ar. Somente depois ligue a energia elétrica."
      },
      {
        question: "Ele vem com a haste para mudar a temperatura?",
        answer: "Sim! Acompanha a haste prolongadora de 30cm, mangueira de chuveirinho com suporte de parede e redutor de pressão para locais de alta pressão de água."
      }
    ]
  },
  {
    id: "prod-100761",
    sku: "100761",
    name: "Ducha Elétrica Multitemperaturas Top Jet 4 Temperaturas Lorenzetti",
    slug: "ducha-eletrica-top-jet-multitemperaturas-lorenzetti",
    description: "Ducha Top Jet com 4 opções de temperatura pré-definidas e espalhador de grandes dimensões. Acompanha haste de 30cm para troca prática de temperatura e jato amplo e relaxante.",
    price: 200,
    unit: "UN",
    departmentId: "banheiro-e-cozinha",
    departmentName: "Banheiro e Cozinha",
    category: "Chuveiros e Duchas",
    brand: "Lorenzetti",
    inStock: true,
    stockBadge: "Pronta Entrega",
    featured: true,
    images: [
      "/images/produtos/ducha-eletrica-top-jet-multitemperaturas-lorenzetti.webp"
    ],
    technicalSpecs: {
      "Opções de Temperatura": "4 temperaturas (Desligado, Morno, Quente, Super Quente)",
      "Potência 127V": "5500W (Fiação mínima de 10 mm² / Disjuntor de 50A)",
      "Potência 220V": "7500W (Fiação mínima de 6 mm² / Disjuntor de 40A)",
      "Haste de Controle": "Acompanha haste de 30 cm para mudança ao alcance das mãos",
      "Espalhador": "Maxi espalhador circular de grande vazão",
      "Pressão de Funcionamento": "10 a 400 kPa (1 a 40 m.c.a.)",
      "Grau de Proteção": "IP 24",
      "Compatibilidade": "Compatível com aquecedores solares e sistemas DR",
      "Resistência de Reposição": "Refil código 3055-Q (127V) e 3055-O (220V)"
    },
    applications: [
      "Banheiros residenciais que buscam banho relaxante com grande espalhador e excelente custo-benefício",
      "Instalação direta na parede em conexão hidráulica padrão 1/2\""
    ],
    warranty: "1 ano de garantia Lorenzetti",
    relatedSkus: ["100597", "1577", "1619", "2802"],
    variationType: "Voltagem",
    variations: [
      {
        sku: "100761",
        name: "127V (5500W)",
        voltage: "127V",
        power: "5500W",
        price: 200,
        inStock: true
      },
      {
        sku: "100762",
        name: "220V (7500W)",
        voltage: "220V",
        power: "7500W",
        price: 200,
        inStock: true
      }
    ],
    detailedDescription: "A Ducha Top Jet Multitemperaturas da Lorenzetti reúne o conforto de um grande espalhador com a praticidade das 4 opções de aquecimento clássicas (Desligado, Morno, Quente e Super Quente), permitindo a escolha ideal para cada estação do ano e proporcionando economia nos meses quentes.\n\nAcompanha haste prolongadora de 30 cm para que a seleção das temperaturas fique na altura das mãos, garantindo comodidade a toda a família. Seu design elegante sem parafusos aparentes valoriza o visual do banheiro.\n\nEquipada com resistência em formato refil de encaixe rápido e seguro, dispensa ferramentas complicadas na hora da manutenção. Aparelho 100% compatível com sistemas de aquecimento solar e dispositivos DR.",
    faq: [
      {
        question: "Como mudar as 4 temperaturas com segurança?",
        answer: "Recomenda-se girar o seletor (ou a haste) preferencialmente com o registro de água fechado, o que evita faiscamento e preserva a vida útil dos contatos elétricos internos."
      },
      {
        question: "Qual disjuntor devo instalar no quadro para este modelo?",
        answer: "Para 127V (5500W) utilize disjuntor unipolar de 50A e fios de 10 mm². Para 220V (7500W) utilize disjuntor bipolar de 40A e fios de 6 mm²."
      },
      {
        question: "O chuveiro precisa de cano para ser instalado?",
        answer: "Sim, a Top Jet é uma ducha de parede com rosca padrão de 1/2\" que se conecta ao cano prolongador para chuveiro ou diretamente na rosca de saída com distanciador."
      },
      {
        question: "É compatível com aquecimento solar?",
        answer: "Sim! Pode ser utilizado como apoio em residências com aquecimento solar, utilizando a posição desligada nos dias quentes e as posições de aquecimento nos dias frios."
      }
    ]
  },
  {
    id: "prod-2862",
    sku: "2862",
    name: "Ducha Elétrica Futura 4 Temperaturas Lorenzetti sem Cano",
    slug: "ducha-eletrica-futura-lorenzetti",
    description: "Design moderno e quadrado que harmoniza com banheiros contemporâneos. Instalação embutida direto na parede dispensando cano prolongador, com 4 opções de temperatura.",
    price: 200,
    unit: "UN",
    departmentId: "banheiro-e-cozinha",
    departmentName: "Banheiro e Cozinha",
    category: "Chuveiros e Duchas",
    brand: "Lorenzetti",
    inStock: true,
    stockBadge: "Pronta Entrega",
    featured: true,
    images: [
      "/images/produtos/ducha-eletrica-futura-lorenzetti.webp"
    ],
    technicalSpecs: {
      "Design": "Formato quadrado monobloco, dispensando cano prolongador",
      "Temperaturas": "4 opções de regulagem (Desligado, Morno, Quente, Super Quente)",
      "Potência 127V": "5500W (Fios de 10 mm² / Disjuntor de 50A)",
      "Potência 220V": "7500W (Fios de 6 mm² / Disjuntor de 40A)",
      "Pressão de Funcionamento": "10 a 400 kPa (1 a 40 m.c.a.)",
      "Grau de Proteção": "IP 24",
      "Instalação": "Direta na luva roscável de parede 1/2\"",
      "Compatibilidade": "Compatível com aquecedores solares e sistemas protegidos por DR"
    },
    applications: [
      "Banheiros modernos e suítes com estética contemporânea e metais quadrados",
      "Instalação embutida diretamente na conexão da parede sem fiação visível e sem braço de chuveiro"
    ],
    warranty: "1 ano de garantia Lorenzetti",
    relatedSkus: ["100597", "1577", "1619", "2802"],
    variationType: "Voltagem",
    variations: [
      {
        sku: "2862",
        name: "127V (5500W)",
        voltage: "127V",
        power: "5500W",
        price: 200,
        inStock: true
      },
      {
        sku: "3548",
        name: "220V (7500W)",
        voltage: "220V",
        power: "7500W",
        price: 200,
        inStock: true
      }
    ],
    detailedDescription: "A Ducha Futura Multitemperaturas da Lorenzetti apresenta um conceito inovador de design para banheiros modernos: com linhas retas e formato quadrado vanguardista, ela é fixada diretamente na conexão hidráulica da parede, dispensando completamente o uso de canos ou braços prolongadores adicionais.\n\nO resultado estético é um visual clean, integrado e sofisticado, similar a duchas de alto padrão. Oferece 4 opções de temperatura de fácil acionamento no corpo do aparelho, garantindo banho quente, confortável e com ampla área de espalhador quadrado para cobrir os ombros de ponta a ponta.\n\nSua estrutura esconde a fiação elétrica de forma harmoniosa. Conta com resistência de troca rápida tipo refil, é compatível com aquecimento solar e atende residências com disjuntor DR.",
    faq: [
      {
        question: "A Ducha Futura precisa de cano ou braço para instalar?",
        answer: "Não! O grande diferencial da linha Futura é a instalação direta e rente à parede na conexão hidráulica de 1/2\", sem necessidade de comprar cano separado."
      },
      {
        question: "Qual o cuidado na instalação para a ducha não queimar?",
        answer: "Instale o produto e, antes de ligar a chave do disjuntor elétrico, abra o registro de água e deixe escorrer água fria por cerca de 1 minuto para encher totalmente o reservatório da ducha."
      },
      {
        question: "Quais as especificações elétricas para 127V e 220V?",
        answer: "Na versão 127V (5500W): disjuntor de 50A e cabos de 10 mm². Na versão 220V (7500W): disjuntor de 40A e cabos de 6 mm²."
      },
      {
        question: "Acompanha chuveirinho manual?",
        answer: "Sim, acompanha mangueira flexível, ducha manual (chuveirinho) com suporte de fixação para parede e redutor de pressão."
      }
    ]
  },
  {
    id: "prod-2186",
    sku: "2186",
    name: "Ducha Elétrica Advanced Lorenzetti com Grande Espalhador",
    slug: "ducha-eletrica-advanced-lorenzetti",
    description: "A consagrada Ducha Advanced alia design moderno sem fiação aparente com um grande espalhador articulável. Banho revigorante com amplo fluxo de água e resistência tipo refil.",
    price: 250,
    unit: "UN",
    departmentId: "banheiro-e-cozinha",
    departmentName: "Banheiro e Cozinha",
    category: "Chuveiros e Duchas",
    brand: "Lorenzetti",
    inStock: true,
    stockBadge: "Pronta Entrega",
    featured: true,
    images: [
      "/images/produtos/ducha-eletrica-advanced-lorenzetti.webp"
    ],
    technicalSpecs: {
      "Design": "Cano embutido incorporado ao corpo, sem fios aparentes",
      "Espalhador": "Grande espalhador circular para cobertura completa de ombro a ombro",
      "Potência 127V": "5500W (Fiação mínima de 10 mm² / Disjuntor de 50A)",
      "Potência 220V": "7500W (Fiação mínima de 6 mm² / Disjuntor de 40A)",
      "Pressão de Funcionamento": "10 a 400 kPa (1 a 40 m.c.a.)",
      "Grau de Proteção": "IP 24",
      "Resistência de Reposição": "Refil exclusivo tipo cartucho de troca rápida",
      "Compatibilidade": "Compatível com aquecimento solar e dispositivos DR"
    },
    applications: [
      "Banheiros residenciais para quem busca banho volumoso com visual elegante e sem fiação aparente",
      "Instalação direta na parede com rosca padrão de 1/2\""
    ],
    warranty: "1 ano de garantia Lorenzetti",
    relatedSkus: ["100597", "1577", "1619", "2802"],
    variationType: "Voltagem",
    variations: [
      {
        sku: "2186",
        name: "127V (5500W)",
        voltage: "127V",
        power: "5500W",
        price: 250,
        inStock: true
      },
      {
        sku: "475",
        name: "220V (7500W)",
        voltage: "220V",
        power: "7500W",
        price: 250,
        inStock: true
      }
    ],
    detailedDescription: "A Ducha Advanced da Lorenzetti é referência nacional em tecnologia e design para banheiros modernos. Seu cano incorporado forma uma peça única e contínua que oculta totalmente a fiação elétrica até a parede, proporcionando acabamento impecável e livre de canaletas ou fios expostos.\n\nEquipada com um dos maiores espalhadores da categoria, distribui jatos d'água fartos, envolventes e relaxantes, cobrindo o corpo com suavidade e temperatura agradável em todas as épocas do ano.\n\nSua resistência tipo refil é acondicionada em um prático cartucho que pode ser substituído em segundos sem complicação. É totalmente compatível com sistemas de aquecimento solar e protegida contra choques elétricos quando ligada ao sistema de aterramento com disjuntor DR.",
    faq: [
      {
        question: "A fiação elétrica fica aparecendo na Ducha Advanced?",
        answer: "Não! O corpo da Ducha Advanced possui cano embutido que esconde e protege todos os condutores elétricos até a saída da parede, deixando o ambiente muito mais limpo e elegante."
      },
      {
        question: "A troca de resistência é simples?",
        answer: "Muito simples. Ela utiliza resistência refil tipo cartucho: basta desencaixar a tampa inferior do aparelho e trocar o cartucho com facilidade, sem ferramentas especiais."
      },
      {
        question: "Qual fiação e disjuntor são recomendados?",
        answer: "Para 127V (5500W): disjuntor exclusivo de 50A e fio de 10 mm². Para 220V (7500W): disjuntor de 40A e fio de 6 mm²."
      },
      {
        question: "Posso instalar em casa com caixa d'água baixa?",
        answer: "Sim, a ducha funciona a partir de 1 m.c.a. (metro de coluna d'água). Acompanha redutor de pressão para ser mantido apenas em locais de alta pressão."
      }
    ]
  }
];

// Adicionar produtos à lista
console.log(`Carregados ${products.length} produtos existentes.`);
for (const np of newProducts) {
  const existingIdx = products.findIndex(p => p.id === np.id || p.sku === np.sku);
  if (existingIdx >= 0) {
    console.log(`⚠️ Substituindo produto existente: ${np.id} (${np.name})`);
    products[existingIdx] = np;
  } else {
    console.log(`➕ Adicionando novo produto: ${np.id} (${np.name})`);
    products.push(np);
  }
}

fs.writeFileSync(jsonPath, JSON.stringify(products, null, 2), 'utf-8');
console.log(`🎉 Total de produtos atualizado para: ${products.length}`);

