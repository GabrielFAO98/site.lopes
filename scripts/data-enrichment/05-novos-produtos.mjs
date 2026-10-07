export const novosProdutosData = [
  // 1. Tinta Latex Renove 3.6L
  {
    id: 'tinta-latex-acrilica-renove-3-6l',
    sku: '30101',
    name: 'Tinta Látex Acrílica Fosca Renove 3,6L',
    slug: 'tinta-latex-acrilica-renove-3-6l',
    description: 'Tinta látex acrílica para pintura interna com acabamento fosco aveludado, baixo odor e excelente poder de cobertura.',
    price: 49.90,
    unit: 'Galão 3.6L',
    departmentId: 'pintura',
    departmentName: 'Pintura e Acessórios',
    category: 'Tintas e Sprays',
    brand: 'Renove',
    inStock: true,
    stockBadge: 'Pronta Entrega',
    featured: true,
    images: ['/images/produtos/tinta-latex-renove-3-6l.webp'],
    technicalSpecs: {
      'Volume': '3,6 Litros',
      'Acabamento': 'Fosco',
      'Ambiente': 'Interno',
      'Rendimento': 'Até 60 m² por demão (rende até 20 m² acabados com 2 a 3 demãos)',
      'Diluição': 'Água potável (10% a 20% para primeira e demais demãos)',
      'Secagem ao toque': '1 hora',
      'Entre demãos': '4 horas',
      'Secagem final': '12 horas',
      'Composição': 'Resina à base de dispersão aquosa de copolímero acrílico-estirenado, pigmentos isentos de metais pesados e aditivos.'
    },
    applications: [
      'Paredes internas de alvenaria, reboco, concreto e gesso',
      'Superfícies emassadas com massa corrida PVA ou massa acrílica',
      'Repintura sobre tintas látex e acrílicas foscas já existentes'
    ],
    warranty: '2 anos (conforme fabricante e condições de armazenagem na embalagem original fechada)',
    relatedSkus: ['30102', '30104', '20201'],
    variationType: 'Cor',
    variations: [
      { name: 'Branco Neve', sku: '30101-BR', hex: '#FFFFFF', inStock: true },
      { name: 'Gelo', sku: '30101-GE', hex: '#E2E6E9', inStock: true }
    ],
    detailedDescription: `A Tinta Látex Acrílica Renove 3,6L foi desenvolvida especialmente para proporcionar renovação estética e proteção de paredes internas com máxima economia e praticidade. Sua fórmula à base de água conta com resinas acrílicas que garantem boa aderência sobre o substrato, facilidade de espalhamento e acabamento fosco suave que disfarça pequenas imperfeições da parede.\n\nCom baixo odor e secagem rápida, permite que os ambientes sejam liberados para uso em poucas horas após o término da pintura. Apresenta ótimo rendimento, cobrindo até 60 m² por demão sobre superfícies adequadamente seladas e preparadas. Disponível nas cores Branco Neve e Gelo, as duas tonalidades mais procuradas para compor ambientes modernos e luminosos.\n\nPara a aplicação, recomenda-se a limpeza prévia da parede, eliminando poeira, gordura ou mofo. Em paredes novas de reboco, é fundamental respeitar o prazo de cura de 28 dias e aplicar fundo preparador ou selador acrílico antes da tinta para equalizar a absorção e assegurar a cobertura uniforme. Aplique com rolo de lã de pelo baixo, trincha ou pistola airless.`,
    faq: [
      {
        question: 'Quantas demãos de tinta látex Renove são necessárias para uma boa cobertura?',
        answer: 'Normalmente de 2 a 3 demãos com intervalo de 4 horas entre elas são suficientes para alcançar cobertura homogênea e cor uniforme.'
      },
      {
        question: 'Essa tinta pode ser aplicada diretamente sobre gesso ou drywall?',
        answer: 'Sim, desde que a superfície receba previamente uma demão de fundo preparador para gesso/drywall, o que evita que o pó solto comprometa a aderência da tinta.'
      },
      {
        question: 'Qual a diluição recomendada para o galão de 3,6 litros?',
        answer: 'A diluição indicada é de 10% a 20% de água limpa sobre o volume da tinta (aproximadamente 360ml a 720ml de água por galão), misturando bem até completa homogeneização.'
      },
      {
        question: 'A tinta tem cheiro forte durante a aplicação?',
        answer: 'Não. Por ser uma tinta acrílica à base de água com baixo índice de compostos orgânicos voláteis (VOC), o odor é suave e desaparece poucas horas após a secagem.'
      }
    ]
  },

  // 2. Fita Crepe Larga Verde Automotiva ADTEX
  {
    id: 'fita-crepe-automotiva-verde-48mm-adtex',
    sku: '30102',
    name: 'Fita Crepe Automotiva Verde 48mm x 40m ADTEX',
    slug: 'fita-crepe-automotiva-verde-48mm-adtex',
    description: 'Fita crepe profissional verde de alta performance, resistente a solventes e raios UV, com remoção limpa sem resíduos em até 72 horas.',
    price: 18.50,
    unit: 'Rolo 48mm x 40m',
    departmentId: 'pintura',
    departmentName: 'Pintura e Acessórios',
    category: 'Fitas e Acessórios de Pintura',
    brand: 'ADTEX',
    inStock: true,
    stockBadge: 'Pronta Entrega',
    featured: false,
    images: ['/images/produtos/fita-crepe-automotiva-verde-adtex.webp'],
    technicalSpecs: {
      'Largura': '48 mm',
      'Comprimento': '40 metros',
      'Cor': 'Verde de alta visibilidade',
      'Dorso': 'Papel crepe saturado com barreira impermeável',
      'Adesivo': 'Borracha natural com resinas sintéticas',
      'Resistência térmica': 'Suporta até 100°C por 1 hora (estufas de pintura)',
      'Resistência UV': 'Até 72 horas sob incidência solar sem degradar',
      'Remoção': 'Remoção limpa sem transferência de cola'
    },
    applications: [
      'Mascaramento automotivo em funilaria, pintura e polimento técnico',
      'Isolamento e proteção de rodapés, esquadrias de alumínio, vidros e batentes na pintura imobiliária',
      'Curvas e contornos que exigem recorte de precisão com tintas sintéticas e à base de água'
    ],
    warranty: '1 ano pelo fabricante',
    relatedSkus: ['30101', '30103', '30104'],
    detailedDescription: `A Fita Crepe Automotiva Verde ADTEX 48mm x 40m é uma fita técnica de padrão profissional projetada para resistir aos processos mais exigentes de mascaramento e isolamento de pintura. Fabricada com dorso de papel crepe saturado e adesivo de borracha de alta coesão, ela oferece excelente conformabilidade para contornos curvos e linhas de corte extremamente nítidas sem sangramento de tinta sob a borda.\n\nSua formulação especial confere alta resistência à ação de solventes, thinners, vernizes e primers, além de resistir a temperaturas de estufa de até 100°C. Possui ainda tratamento contra radiação ultravioleta, permitindo que fique aplicada em ambientes externos por até 3 dias (72 horas) com remoção suave e 100% limpa, sem deixar resíduos pegajosos de cola na lataria, no vidro ou no piso.\n\nNa pintura predial e reforma residencial, a fita crepe verde larga é a escolha preferida de pintores experientes para proteger esquadrias de alumínio preto, rodapés de madeira e pisos cerâmicos contra respingos de tinta e manchas de verniz.`,
    faq: [
      {
        question: 'A fita crepe verde automotiva deixa cola se ficar exposta ao sol?',
        answer: 'Diferente das fitas crepe comuns de papel que ressecam e soltam cola em poucas horas de sol, a fita automotiva verde possui aditivos anti-UV e permite remoção limpa sem resíduos em até 72 horas de exposição externa.'
      },
      {
        question: 'Pode ser usada com tintas à base de solvente e vernizes?',
        answer: 'Sim. O papel crepe é saturado e impermeabilizado com resinas especiais que impedem a penetração de thinners, esmaltes sintéticos e vernizes.'
      },
      {
        question: 'Qual a vantagem da largura de 48mm?',
        answer: 'A largura extra de 48mm cria uma barreira protetora ampla, agilizando o isolamento de batentes, rodapés e frisos de veículos sem necessidade de colar várias fitas sobrepostas.'
      }
    ]
  },

  // 3. Pá de Bico Tramontina
  {
    id: 'pa-de-bico-com-cabo-tramontina-77459',
    sku: '30201',
    name: 'Pá de Bico com Cabo de Madeira 71cm Tramontina N° 3',
    slug: 'pa-de-bico-com-cabo-tramontina-77459',
    description: 'Pá de bico n° 3 em aço carbono especial temperado com cabo de madeira renovável 71cm e empunhadura ergonômica Y.',
    price: 54.90,
    unit: 'UN',
    departmentId: 'ferramentas',
    departmentName: 'Ferramentas e Equipamentos',
    category: 'Ferramentas Manuais de Obra',
    brand: 'Tramontina',
    inStock: true,
    stockBadge: 'Pronta Entrega',
    featured: true,
    images: ['/images/produtos/pa-de-bico-tramontina.webp'],
    technicalSpecs: {
      'Tamanho': 'Número 3',
      'Material da lâmina': 'Aço carbono especial temperado cortado a laser',
      'Acabamento': 'Pintura eletrostática a pó preta anticorrosiva',
      'Comprimento do cabo': '71 cm',
      'Material do cabo': 'Madeira nobre de origem renovável envernizada',
      'Empunhadura': 'Ergonômica plástica em formato Y (tipo muleta)',
      'Peso aproximado': '1,45 kg',
      'Referência Tramontina': '77459/434'
    },
    applications: [
      'Cavação, carregamento e transbordo de terra, areia, brita, saibro e entulhos de construção',
      'Mistura manual de cimento, argamassa e concreto no canteiro de obras',
      'Trabalhos agrícolas, terraplenagem e jardinagem pesada'
    ],
    warranty: '1 ano de garantia contra defeitos de fabricação (Tramontina)',
    relatedSkus: ['30204', '397', '400', '100103'],
    detailedDescription: `A Pá de Bico com Cabo de Madeira 71cm Tramontina N° 3 (Ref. 77459/434) é a ferramenta essencial e tradicional indispensável em todo canteiro de obras. Fabricada em aço carbono especial com tratamento térmico por têmpera em todo o corpo da lâmina, oferece resistência mecânica superior contra envergamentos e desgastes mesmo sob uso contínuo em materiais pesados e abrasivos como pedras e terra compactada.\n\nA lâmina conta com pintura eletrostática a pó que cria uma camada protetora contra ferrugem e umidade. Seu desenho com bico pontiagudo e centro côncavo facilita a penetração no solo e o corte de raízes leves, permitindo erguer grandes volumes de areia, brita ou concreto com estabilidade.\n\nO cabo de 71 cm é confeccionado em madeira de lei de reflorestamento, lixado e envernizado para um manuseio agradável sem farpas. A empunhadura plástica ergonômica em formato de "Y" reduz o esforço nos punhos e na coluna, proporcionando excelente controle de carga e segurança durante o trabalho repetitivo.`,
    faq: [
      {
        question: 'Qual a diferença entre a pá de bico e a pá quadrada?',
        answer: 'A pá de bico possui extremidade pontiaguda projetada para penetrar e cortar materiais duros (terra compactada, montes de brita e saibro). A pá quadrada é mais indicada para raspar pisos e recolher materiais soltos em superfícies planas.'
      },
      {
        question: 'O cabo pode ser substituído caso quebre com o tempo?',
        answer: 'Sim. A fixação da lâmina ao cabo é padrão e permite a substituição por cabos de reposição avulsos de 71cm ou 120cm compatíveis com a linha de ferramentas agrícolas Tramontina.'
      },
      {
        question: 'Qual a vantagem da empunhadura em Y?',
        answer: 'A empunhadura em formato Y oferece firmeza e alavanca no manuseio, evitando que a pá gire na mão ao carregar materiais pesados e reduzindo a fadiga nas costas e braços.'
      }
    ]
  },

  // 4. Thinner Maza (900ml e 5L)
  {
    id: 'thinner-solvente-multiuso-maza',
    sku: '30103',
    name: 'Thinner Solvente Multiuso para Limpeza e Diluição Maza',
    slug: 'thinner-solvente-multiuso-maza',
    description: 'Solvente industrial e automotivo de alta pureza para diluição de tintas sintéticas, esmaltes, primers e limpeza profunda de ferramentas de pintura.',
    price: 19.90,
    unit: 'Frasco / Galão',
    departmentId: 'pintura',
    departmentName: 'Pintura e Acessórios',
    category: 'Solventes e Diluentes',
    brand: 'Maza',
    inStock: true,
    stockBadge: 'Pronta Entrega',
    featured: false,
    images: ['/images/produtos/thinner-solvente-maza.webp'],
    technicalSpecs: {
      'Tipo': 'Thinner desengraxante e solvente aromático balanceado',
      'Embalagens disponíveis': '900ml e 5 Litros',
      'Densidade': '0,840 a 0,870 g/cm³',
      'Inflamabilidade': 'Produto inflamável (ponto de fulgor < 23°C)',
      'Validade': '24 meses a partir da data de fabricação em embalagem lacrada'
    },
    applications: [
      'Diluição de esmaltes sintéticos, vernizes e primers automotivos/industriais',
      'Limpeza de pistolas de pintura, bicos airless, trinchas, rolos e espátulas',
      'Desengraxe e remoção de óleos, graxas e resíduos de cola em chapas de ferro e alumínio'
    ],
    warranty: '2 anos pelo fabricante (Maza)',
    relatedSkus: ['30104', '30105', '20101'],
    variationType: 'Embalagem',
    variations: [
      { name: 'Frasco 900ml', sku: '30103-900', price: 19.90, inStock: true },
      { name: 'Galão 5L', sku: '30103-5L', price: 79.90, inStock: true }
    ],
    detailedDescription: `O Thinner Multiuso Maza é um solvente formulado com uma composição balanceada de hidrocarbonetos e solventes oxigenados de alta pureza. Desenvolvido para atuar com máxima eficácia tanto na diluição correta de tintas e vernizes quanto na limpeza profunda e desengraxe de ferramentas e equipamentos mecânicos.\n\nSua taxa controlada de evaporação permite uma secagem homogênea da película de tinta, garantindo excelente alastramento, alto brilho e evitando o aparecimento de bolhas ou branqueamento na pintura. É amplamente utilizado em oficinas de serralheria, marcenarias e canteiros de obra para a diluição de esmaltes sintéticos e fundos zarcão.\n\nPara a limpeza de ferramentas, remove rapidamente resíduos secos de tintas em pincéis, trinchas e bicos de pistola, preservando a vida útil dos equipamentos. Deve ser manuseado sempre em ambientes bem ventilados, utilizando luvas de proteção química e máscara contra vapores orgânicos.`,
    faq: [
      {
        question: 'Qual a diferença entre thinner e aguarrás?',
        answer: 'O thinner possui poder solvente muito mais forte e evaporação rápida, sendo indicado para tintas à base de nitrocelulose, poliuretano, primers e limpeza profunda. A aguarrás é um solvente mineral mais suave, ideal para diluir esmaltes e vernizes sintéticos imobiliários sem acelerar a secagem.'
      },
      {
        question: 'O thinner Maza serve para limpar cola e gordura de superfícies?',
        answer: 'Sim, o thinner é um poderoso desengraxante e removedor de resíduos de cola de fitas, adesivos e graxas em metais, vidros e cerâmicas.'
      },
      {
        question: 'Posso usar thinner para diluir tinta látex ou acrílica de parede?',
        answer: 'Não! Tintas látex e acrílicas para paredes de alvenaria são à base de água. O contato com thinner destrói a resina da tinta aquosa e inviabiliza o produto.'
      }
    ]
  },

  // 5. Trincha Atlas 395 (Todos os tamanhos)
  {
    id: 'trincha-media-cerdas-gris-atlas-395',
    sku: '30104',
    name: 'Trincha Média Cerdas Gris Selecionadas Atlas Linha 395',
    slug: 'trincha-media-cerdas-gris-atlas-395',
    description: 'Trincha profissional com cerdas gris naturais selecionadas e cabo anatômico vermelho, ideal para tintas látex, acrílicas e recortes de precisão.',
    price: 8.90,
    unit: 'UN',
    departmentId: 'pintura',
    departmentName: 'Pintura e Acessórios',
    category: 'Pincéis e Trinchas',
    brand: 'Atlas',
    inStock: true,
    stockBadge: 'Pronta Entrega',
    featured: false,
    images: ['/images/produtos/trincha-atlas-395.webp'],
    technicalSpecs: {
      'Linha': '395 Média',
      'Tipo de Cerdas': 'Naturais gris selecionadas de alta retenção',
      'Cabo': 'Polipropileno anatômico vermelho resistente a solventes',
      'Virola': 'Aço estanhado cravado resistente à corrosão',
      'Indicação principal': 'Tintas látex PVA, tintas acrílicas à base de água e impermeabilizantes'
    },
    applications: [
      'Pintura de paredes, tetos, rodapés, guarnições e recortes entre teto e parede',
      'Aplicação de seladores, fundos preparadores e resinas à base d\'água',
      'Trabalhos em cantos de difícil acesso para rolos de pintura'
    ],
    warranty: 'Garantia legal de 90 dias contra defeitos de fabricação (Atlas)',
    relatedSkus: ['30101', '30102', '30105'],
    variationType: 'Largura',
    variations: [
      { name: '1/2"', sku: '30104-05', inStock: true },
      { name: '3/4"', sku: '30104-07', inStock: true },
      { name: '1"', sku: '30104-10', inStock: true },
      { name: '1.1/2"', sku: '30104-15', inStock: true },
      { name: '2"', sku: '30104-20', inStock: true },
      { name: '2.1/2"', sku: '30104-25', inStock: true },
      { name: '3"', sku: '30104-30', inStock: true },
      { name: '4"', sku: '30104-40', inStock: true }
    ],
    detailedDescription: `A Trincha Atlas Linha 395 é um dos modelos mais consagrados e confiáveis do mercado brasileiro de pintura profissional. Desenvolvida com cerdas gris selecionadas de origem natural, proporciona excelente retenção e distribuição uniforme da tinta, permitindo passadas contínuas com cobertura perfeita e sem marcas bruscas de cerdas na parede.\n\nSeu cabo vermelho ergonômico em polipropileno de alta densidade oferece pegada confortável e firme, reduzindo a fadiga nas mãos durante longas jornadas de trabalho em recortes de cantos, portas e rodapés. A virola em aço estanhado mantém as cerdas firmemente presas, evitando o desprendimento de fios durante a aplicação.\n\nDisponível em toda a gama de tamanhos (de 1/2" para detalhes minuciosos até 4" para áreas amplas), a trincha 395 é a parceira ideal para a aplicação de tintas látex, acrílicas, fundos preparadores e impermeabilizantes à base de água. Para higienização, basta lavar com água corrente e sabão neutro logo após o uso.`,
    faq: [
      {
        question: 'Para quais tipos de tinta a trincha 395 é mais recomendada?',
        answer: 'A linha 395 com cerdas gris é especialmente indicada para tintas à base de água (látex PVA e tintas acrílicas), proporcionando excelente alastramento e recortes precisos.'
      },
      {
        question: 'Qual tamanho devo escolher para recortes de cantos e rodapés?',
        answer: 'Os tamanhos mais utilizados por pintores profissionais para recortes de teto e rodapé são 1.1/2" e 2", pois equilibram capacidade de carga de tinta com facilidade de controle da linha de corte.'
      },
      {
        question: 'Como limpar e conservar a trincha para durar várias obras?',
        answer: 'Após a pintura com tinta à base de água, lave imediatamente com água morna e sabão neutro até retirar todo o resíduo próximo à virola. Penteie as cerdas e deixe secar na sombra em posição horizontal ou pendurada.'
      }
    ]
  },

  // 6. Trincha Atlas 319 (Todos os tamanhos)
  {
    id: 'trincha-cerdas-pretas-esmalte-atlas-319',
    sku: '30105',
    name: 'Trincha Cerdas Pretas para Esmalte e Verniz Atlas Linha 319',
    slug: 'trincha-cerdas-pretas-esmalte-atlas-319',
    description: 'Trincha profissional com cerdas pretas naturais, virola metálica e cabo amarelo, desenvolvida para acabamento fino com esmaltes sintéticos, vernizes e tintas a óleo.',
    price: 9.50,
    unit: 'UN',
    departmentId: 'pintura',
    departmentName: 'Pintura e Acessórios',
    category: 'Pincéis e Trinchas',
    brand: 'Atlas',
    inStock: true,
    stockBadge: 'Pronta Entrega',
    featured: false,
    images: ['/images/produtos/trincha-atlas-319.webp'],
    technicalSpecs: {
      'Linha': '319 Média Esmalte',
      'Tipo de Cerdas': 'Cerdas pretas naturais selecionadas e tratadas',
      'Cabo': 'Polipropileno anatômico amarelo de alta resistência',
      'Virola': 'Aço niquelado anticorrosivo',
      'Indicação principal': 'Esmaltes sintéticos, vernizes marítimos e poliuretano, tintas a óleo e stain protetor'
    },
    applications: [
      'Pintura de portas, janelas, portões de ferro, grades e estruturas metálicas',
      'Envernizamento de móveis, forros de madeira, decks e pergolados',
      'Aplicação de fundos anticorrosivos (zarcão) e primers epóxi'
    ],
    warranty: 'Garantia legal de 90 dias contra defeitos de fabricação (Atlas)',
    relatedSkus: ['30103', '30102', '30104'],
    variationType: 'Largura',
    variations: [
      { name: '1/2"', sku: '30105-05', inStock: true },
      { name: '3/4"', sku: '30105-07', inStock: true },
      { name: '1"', sku: '30105-10', inStock: true },
      { name: '1.1/2"', sku: '30105-15', inStock: true },
      { name: '2"', sku: '30105-20', inStock: true },
      { name: '2.1/2"', sku: '30105-25', inStock: true },
      { name: '3"', sku: '30105-30', inStock: true },
      { name: '4"', sku: '30105-40', inStock: true }
    ],
    detailedDescription: `A Trincha Atlas Linha 319 é a ferramenta de referência para quem busca acabamento espelhado e fino com esmaltes sintéticos, vernizes e stains. Suas cerdas pretas 100% naturais possuem flexibilidade e densidade ideais para espalhar resinas sintéticas viscosas sem deixar marcas de pinceladas ou riscos no filme de tinta.\n\nConstruída com cabo ergonômico amarelo em material plástico virgem imune ao ataque químico de solventes, oferece segurança e firmeza no traço. A fixação reforçada das cerdas na virola evita a perda de fios indesejados que poderiam danificar a superfície lisa de uma porta de madeira ou esquadria de ferro recém-envernizada.\n\nDisponível em tamanhos que vão de 1/2" (para recortes minuciosos em venezianas e ferragens) até 4" (para grandes painéis de madeira e decks), a trincha 319 entrega alto rendimento e vida útil prolongada quando limpa corretamente com aguarrás ou thinner logo após o uso.`,
    faq: [
      {
        question: 'Por que usar a trincha de cerdas pretas (319) ao invés da cerda gris (395)?',
        answer: 'As cerdas pretas da linha 319 possuem consistência mais encorpada e macia nas pontas, o que proporciona um espalhamento perfeito de tintas com solvente (esmaltes e vernizes), eliminando as marcas de estrias no acabamento final.'
      },
      {
        question: 'Como limpar a trincha após usar com verniz ou esmalte sintético?',
        answer: 'Mergulhe e agite a trincha em um recipiente com solvente adequado (aguarrás ou thinner) para dissolver os resíduos de tinta. Em seguida, lave com água e detergente neutro, retire o excesso de líquido e guarde as cerdas alinhadas.'
      },
      {
        question: 'A trincha 319 solta pelos na pintura?',
        answer: 'Não. Os modelos profissionais da Pincéis Atlas passam por rigoroso processo de cravamento e fixação das cerdas na virola metálica com adesivo epóxi interno, garantindo estabilidade absoluta.'
      }
    ]
  },

  // 7. Grelha de Alumínio Stuqui
  {
    id: 'grelha-aluminio-com-caixilho-stuqui-15x15',
    sku: '30301',
    name: 'Grelha de Alumínio Fundido com Caixilho Stuqui 15x15cm',
    slug: 'grelha-aluminio-com-caixilho-stuqui-15x15',
    description: 'Grelha quadrada para ralo em alumínio fundido polido 15x15cm com caixilho de embutir, alta resistência mecânica e tela anti-insetos.',
    price: 32.90,
    unit: 'UN',
    departmentId: 'hidraulica',
    departmentName: 'Tubos e Conexões',
    category: 'Sifões, Ralos e Grelhas',
    brand: 'Stuqui',
    inStock: true,
    stockBadge: 'Pronta Entrega',
    featured: false,
    images: ['/images/produtos/grelha-aluminio-stuqui-15x15.webp'],
    technicalSpecs: {
      'Dimensões': '15 cm x 15 cm',
      'Material': 'Alumínio fundido maciço polido',
      'Itens inclusos': 'Grelha removível + Caixilho (aro porta-grelha)',
      'Resistência': 'Imune à corrosão e ferrugem, suporta passagens de pedestres e peso moderado',
      'Acabamento': 'Polido brilhante'
    },
    applications: [
      'Drenagem de água pluvial e lavagem em quintais, corredores, garagens residenciais e varandas',
      'Bordas de piscinas, áreas gourmet e lavanderias externas',
      'Caixas de ralo sifonadas e canaletas de captação de água'
    ],
    warranty: '5 anos contra corrosão natural (Stuqui)',
    relatedSkus: ['30302', '100204', '30601'],
    detailedDescription: `A Grelha de Alumínio Fundido com Caixilho 15x15cm Stuqui é uma solução definitiva e durável para a drenagem de águas pluviais e lavagens em áreas residenciais e comerciais. Produzida em liga nobre de alumínio fundido maciço, não enferruja, não descasca e suporta a exposição severa ao sol, chuva e produtos de limpeza pesada utilizados em quintais e garagens.\n\nO conjunto é composto pelo caixilho (aro de embutir) e pela grelha removível com encaixe preciso. O caixilho é assentado diretamente na massa de cimento nivelado ao piso cerâmico ou pedras, facilitando o rejuntamento e garantindo que a grelha fique perfeitamente alinhada, evitando degraus perigosos para pedestres.\n\nSeu desenho com fendas paralelas dimensionadas garante excelente vazão de água para escoamento rápido de enxurradas, ao mesmo tempo em que retém folhas, pedriscos e detritos que poderiam entupir a rede de esgoto pluvial. A tampa é facilmente removível para manutenção e desobstrução da caixa do ralo.`,
    faq: [
      {
        question: 'Essa grelha de alumínio enferruja com água da chuva ou maresia?',
        answer: 'Não. O alumínio fundido é naturalmente imune à oxidação ferrosa, garantindo que o produto nunca enferruje mesmo em áreas externas ou úmidas.'
      },
      {
        question: 'Suporta a passagem de carros na garagem?',
        answer: 'O modelo 15x15cm de alumínio fundido com caixilho suporta tráfego de pedestres e passagem leve de veículos em garagens residenciais, desde que o caixilho tenha sido totalmente preenchido e calçado com concreto no assentamento.'
      },
      {
        question: 'O caixilho já vem incluso na embalagem?',
        answer: 'Sim, o produto é fornecido como conjunto completo (grelha + caixilho/aro de embutir).'
      }
    ]
  },

  // 8. Gabinete Pia Aço Cozimax Atena
  {
    id: 'gabinete-pia-aco-cozimax-atena-120cm-branco',
    sku: '30401',
    name: 'Gabinete de Cozinha em Aço Atena 120cm Cozimax Branco',
    slug: 'gabinete-pia-aco-cozimax-atena-120cm-branco',
    description: 'Gabinete de cozinha em aço eletrogalvanizado 120cm Atena Cozimax com 2 portas, 3 gavetas em polipropileno virgem e 5 anos de garantia.',
    price: 499.00,
    unit: 'UN',
    departmentId: 'banheiro-e-cozinha',
    departmentName: 'Banheiro e Cozinha',
    category: 'Gabinetes e Móveis de Cozinha',
    brand: 'Cozimax',
    inStock: true,
    stockBadge: 'Pronta Entrega',
    featured: true,
    images: ['/images/produtos/gabinete-pia-aco-cozimax-atena-120cm.webp'],
    technicalSpecs: {
      'Largura': '117 cm (padrão para pias de 120 cm)',
      'Altura': '85 cm (com pés reguláveis)',
      'Profundidade': '49 cm',
      'Material': 'Aço eletrogalvanizado anticorrosivo (tecnologia DiferentAço)',
      'Pintura': 'Eletrostática a pó de alta resistência',
      'Portas': '2 portas com puxadores em poliestireno',
      'Gavetas': '3 gavetas em polipropileno virgem lavável (com divisor de talheres na primeira gaveta)',
      'Pés': '4 pés com regulagem de altura para nivelamento fino',
      'Cor': 'Branco acetinado',
      'Montagem': 'Fornecido montado de fábrica (apenas rosquear os pés e puxadores)'
    },
    applications: [
      'Cozinhas residenciais, áreas gourmet, copas comerciais e edículas',
      'Base para suporte de pias de granito, mármore sintético ou inox de 1,20m'
    ],
    warranty: '5 anos de garantia de fábrica Cozimax contra corrosão no aço',
    relatedSkus: ['30402', '100702', '100204'],
    detailedDescription: `O Gabinete de Cozinha em Aço Atena 120cm Cozimax Branco é sinônimo de resistência, higiene e durabilidade no coração da casa. Produzido com a exclusiva tecnologia DiferentAço da Cozimax, o móvel é construído em aço eletrogalvanizado que recebe tratamento contra ferrugem e pintura eletrostática a pó com secagem em estufa a alta temperatura, resultando em uma garantia de fábrica imbatível de 5 anos.\n\nProjetado para receber perfeitamente tampos e pias de 120 cm (em granito, inox ou mármore sintético), conta com 2 portas amplas com espaço interno generoso para panelas e mantimentos, além de 3 gavetas injetadas em polipropileno 100% virgem — material higiênico, inodoro, que não resseca e pode ser lavado diretamente com água. A primeira gaveta já inclui divisor organizador de talheres integrado.\n\nSeus pés em material plástico possuem sapatas com regulagem independente de altura, permitindo nivelamento perfeito mesmo em pisos com declives para ralos, além de afastar o móvel do chão para facilitar a limpeza da cozinha com rodo e água sem risco de molhar a estrutura.`,
    faq: [
      {
        question: 'O gabinete Cozimax Atena vem montado?',
        answer: 'Sim! O gabinete sai montado de fábrica. Ao receber, você só precisa rosquear os pés com regulagem de altura e fixar os puxadores.'
      },
      {
        question: 'O aço do gabinete enferruja se molhar o chão da cozinha?',
        answer: 'Não. O móvel é feito em aço eletrogalvanizado com tratamento protetor e possui pés plásticos altos que evitam qualquer contato direto do aço com a água da lavagem do piso.'
      },
      {
        question: 'Qual o tamanho de pia compatível com este gabinete?',
        answer: 'Ele é projetado exatamente para as pias padronizadas de 1,20 metro de comprimento (120 cm x 55 a 60 cm), sejam em granito natural, inox ou mármore sintético.'
      },
      {
        question: 'A primeira gaveta vem com organizador de talheres?',
        answer: 'Sim, a primeira gaveta superior acompanha divisória plástica integrada para organização prática de talheres.'
      }
    ]
  },

  // 9. Pia Granito Cozimax
  {
    id: 'pia-granito-120cm-cuba-inox-cozimax',
    sku: '30402',
    name: 'Pia de Granito Natural 120cm com Cuba em Inox Cinza Andorinha',
    slug: 'pia-granito-120cm-cuba-inox-cozimax',
    description: 'Bancada pia em pedra de granito natural 1,20m com cuba central em aço inox colada e travada, frontão traseiro e acabamento polido.',
    price: 349.00,
    unit: 'UN',
    departmentId: 'banheiro-e-cozinha',
    departmentName: 'Banheiro e Cozinha',
    category: 'Pias e Bancadas',
    brand: 'Cozimax',
    inStock: true,
    stockBadge: 'Pronta Entrega',
    featured: true,
    images: ['/images/produtos/pia-granito-120cm-cuba-inox.webp'],
    technicalSpecs: {
      'Comprimento': '120 cm',
      'Profundidade': '56 cm',
      'Material do tampo': 'Granito natural polido impermeabilizado',
      'Tonalidade': 'Cinza Andorinha tradicional',
      'Cuba': 'Aço Inox 430 de alta resistência com escoamento central',
      'Dimensões da cuba': 'Aproximadamente 46 x 30 x 14 cm',
      'Furação': 'Furação padrão para válvula americana 3.1/2"',
      'Frontão': 'Frontão traseiro elevado para proteção de parede contra infiltrações',
      'Peso aproximado': '38 kg'
    },
    applications: [
      'Pia de cozinha residencial para sobrepor em gabinetes de 120cm ou alvenaria',
      'Lavagem de louças, alimentos e preparo de refeições em cozinhas e áreas de churrasco'
    ],
    warranty: '1 ano de garantia contra defeitos de colagem e fabricação',
    relatedSkus: ['30401', '100702', '100204', '30404'],
    detailedDescription: `A Pia de Granito Natural 120cm Cinza Andorinha com Cuba Inox é o padrão de excelência, elegância e robustez para compor a bancada da sua cozinha. Cortada a partir de rocha natural de granito selecionada e polida em processo industrial, oferece altíssima resistência a riscos, impacto, calor de panelas quentes e manchas de uso culinário diário.\n\nAcompanha cuba profunda em aço inoxidável fixada por processo duplo com adesivo poliuretano estrutural e travas de fixação mecânica inferior, impedindo descolamentos mesmo sob o peso de panelas pesadas e cubas cheias de água. A furação da cuba é projetada para receber válvula americana de 3.1/2", permitindo o uso de cestas de retenção de restos de comida.\n\nPossui canaletas e caimento suave em direção à cuba para que a água escorra naturalmente sem empoçar sobre a pedra. O frontão traseiro integrado protege a parede de respingos e previne a umidade na alvenaria atrás do móvel, combinando perfeitamente com gabinetes de 1,20m de aço ou madeira.`,
    faq: [
      {
        question: 'O granito mancha com óleo ou café?',
        answer: 'A pia recebe polimento de alto brilho e resinagem industrial que reduzem drasticamente a porosidade. No entanto, por se tratar de rocha natural, recomenda-se limpar gorduras, café e líquidos escuros logo após o contato para manter o brilho original por décadas.'
      },
      {
        question: 'A cuba de inox vem colada com firmeza?',
        answer: 'Sim, a cuba possui colagem estrutural com adesivo de poliuretano industrial de alta resistência e travas de ancoragem por baixo da pedra, suportando peso sem ceder.'
      },
      {
        question: 'Qual válvula de pia devo comprar para instalar nesta bancada?',
        answer: 'A furação é padrão para Válvula Americana de 3.1/2" em inox (como a disponível em nosso catálogo SKU 100702).'
      }
    ]
  },

  // 10. Assento Sanitário Atlas Oval Soft
  {
    id: 'assento-sanitario-oval-soft-close-atlas',
    sku: '30403',
    name: 'Assento Sanitário Oval Soft Close Fechamento Suave Atlas AT4063-2',
    slug: 'assento-sanitario-oval-soft-close-atlas',
    description: 'Assento sanitário oval universal com fechamento suave Soft Close, acabamento brilhante antibacteriano e fixação regulável para bacias ovais.',
    price: 79.90,
    unit: 'UN',
    departmentId: 'banheiro-e-cozinha',
    departmentName: 'Banheiro e Cozinha',
    category: 'Louças Sanitárias e Assentos',
    brand: 'Atlas',
    inStock: true,
    stockBadge: 'Pronta Entrega',
    featured: false,
    images: ['/images/produtos/assento-sanitario-atlas-oval-soft.webp'],
    technicalSpecs: {
      'Formato': 'Oval Universal (compatível com louças Deca Izy/Raveena, Celite Eco/Acesso, Incepa, Icasa e similares)',
      'Tecnologia': 'Soft Close (amortecimento hidráulico de fechamento suave do assento e da tampa)',
      'Material': 'Polipropileno virgem injetado de alto brilho',
      'Cor': 'Branco',
      'Dimensões': '42,5 cm (comprimento) x 37,5 cm (largura)',
      'Fixação': 'Parafusos em nylon de alta resistência com regulagem de distância entre furos (14 a 16,5 cm)',
      'Higiene': 'Superfície lisa com proteção antibacteriana, fácil remoção para lavagem',
      'Referência': 'AT4063-2'
    },
    applications: [
      'Bacias sanitárias convencionais e caixas acopladas de formato oval (universal)',
      'Banheiros residenciais, suítes, lavabos e sanitários comerciais'
    ],
    warranty: '1 ano contra defeitos de fabricação (Atlas)',
    relatedSkus: ['30405', '100510'],
    detailedDescription: `O Assento Sanitário Oval Soft Close Atlas (Ref. AT4063-2) proporciona o máximo de conforto, elegância e silêncio para o seu banheiro. Equipado com o renomado mecanismo de amortecimento Soft Close nos eixos da tampa e do anel do assento, ele garante um fechamento suave e progressivo com apenas um leve toque, eliminando batidas estrondosas contra a louça, protegendo a cerâmica do vaso e prevenindo acidentes com os dedos de crianças e idosos.\n\nInjetado em polipropileno de engenharia virgem de alto impacto, possui acabamento esmaltado branco de alto brilho com proteção antibacteriana que impede o acúmulo de microrganismos e facilita a higienização diária com pano úmido e sabão neutro. Não amarela com o passar dos anos e mantém a tonalidade da bacia sanitária.\n\nConta com ferragens de fixação reguláveis de montagem simplificada, compatíveis com os principais vasos sanitários ovais do mercado brasileiro, incluindo a bacia Deca Izy, Deca Ravena, Celite Eco, Icasa Sabará e similares.`,
    faq: [
      {
        question: 'O que significa o sistema Soft Close?',
        answer: 'É o sistema de fechamento suave e silencioso. Ao soltar a tampa ou o assento, pistões internos amortecem a descida, fazendo com que ele feche lentamente sem bater na louça.'
      },
      {
        question: 'Este assento é compatível com a bacia Deca Izy?',
        answer: 'Sim! Ele tem formato oval universal e regulagem de furação perfeitamente compatível com a bacia Deca Izy e demais modelos convencionais ovais.'
      },
      {
        question: 'Como limpar o assento para evitar riscos e manter o brilho?',
        answer: 'Utilize apenas esponja macia ou pano com água e sabão neutro. Nunca utilize esponjas de aço, saponáceos ou solventes como cloro e álcool puro, que podem agredir o acabamento polido.'
      }
    ]
  },

  // 11. Módulo 20A MarGirius
  {
    id: 'modulo-tomada-20a-sleek-margirius-branco',
    sku: '30501',
    name: 'Módulo de Tomada 20A 250V 2P+T Sleek MarGirius Branco',
    slug: 'modulo-tomada-20a-sleek-margirius-branco',
    description: 'Módulo de tomada elétrica 20A 250V padrão brasileiro NBR 14136, linha modular Sleek MarGirius em termoplástico anti-chama e anti-UV.',
    price: 9.90,
    unit: 'UN',
    departmentId: 'eletrica',
    departmentName: 'Elétrica e Iluminação',
    category: 'Tomadas, Interruptores e Módulos',
    brand: 'MarGirius',
    inStock: true,
    stockBadge: 'Pronta Entrega',
    featured: false,
    images: ['/images/produtos/modulo-tomada-20a-margirius-sleek.webp'],
    technicalSpecs: {
      'Corrente nominal': '20 Amperes (pinos grossos de 4,8mm)',
      'Tensão máxima': '250V~',
      'Configuração': '2P+T (Fase + Neutro + Terra)',
      'Padrão': 'Brasileiro (NBR 14136)',
      'Linha': 'Sleek Modular',
      'Material': 'Termoplástico de engenharia autoextinguível com aditivo anti-UV',
      'Contatos': 'Liga de cobre fosforoso com mola de alta condutividade e retenção de plugue',
      'Cor': 'Branco acetinado',
      'Código do fabricante': '16048'
    },
    applications: [
      'Alimentação elétrica de aparelhos de maior potência: micro-ondas, fornos elétricos, fritadeiras airfryer, secadores de cabelo, máquinas de lavar e lava-louças',
      'Instalações elétricas residenciais e comerciais em caixas 4x2 ou 4x4 da linha MarGirius Sleek'
    ],
    warranty: '5 anos contra defeitos de fabricação (MarGirius)',
    relatedSkus: ['100301', '100302'],
    detailedDescription: `O Módulo de Tomada 20A 250V 2P+T da Linha Sleek MarGirius (Ref. 16048) é a escolha ideal para instalações elétricas modernas que exigem segurança absoluta, alto desempenho e estética refinada. Com orifícios dimensionados para plugues de 4,8 mm (padrão 20A), é a tomada obrigatória para ligar eletrodomésticos de média e alta potência como fornos elétricos, fornos micro-ondas, fritadeiras sem óleo (airfryer), ferros de passar e lavadoras de roupas.\n\nProduzido em termoplástico de alta tecnologia com proteção anti-chama e aditivação contra raios ultravioleta, o módulo não propaga fogo e resiste ao envelhecimento natural, mantendo sua tonalidade branca sem amarelar ao longo dos anos. Seus bornes internos contam com contatos de cobre fosforoso de alta pressão, garantindo conexão perfeita que evita aquecimento indesejado e faiscamento.\n\nO encaixe modular na placa Sleek é prático e rápido, com fixação por clique seguro. Atende rigorosamente a todas as exigências das normas ABNT NBR 14136 e portarias do Inmetro.`,
    faq: [
      {
        question: 'Posso ligar um aparelho de 10A nessa tomada de 20A?',
        answer: 'Sim! Os plugues padrão de 10A (com pinos de 4,0mm) entram e funcionam perfeitamente na tomada de 20A. O oposto não é permitido por norma (plugue grosso de 20A não entra em tomada de 10A).'
      },
      {
        question: 'Qual a bitola de fio recomendada para alimentar uma tomada de 20A?',
        answer: 'A norma NBR 5410 recomenda condutores de no mínimo 2,5 mm² para circuitos de tomadas de 20A, podendo ser de 4,0 mm² dependendo da distância e potência total do circuito.'
      },
      {
        question: 'Este módulo serve em placas de outras marcas?',
        answer: 'Não. Os módulos da linha Sleek são desenvolvidos especificamente para os suportes e espelhos modulares da linha Sleek da MarGirius.'
      }
    ]
  },

  // 12. Torneira Pia Cozinha Parede Ema Metais
  {
    id: 'torneira-pia-cozinha-parede-bica-movel-ema-metais',
    sku: '30404',
    name: 'Torneira de Parede para Pia de Cozinha Bica Móvel Ema Metais Cromada',
    slug: 'torneira-pia-cozinha-parede-bica-movel-ema-metais',
    description: 'Torneira de parede para pia de cozinha com bica móvel giratória 360°, acabamento em metal cromado de alto brilho e arejador econômico.',
    price: 49.90,
    unit: 'UN',
    departmentId: 'banheiro-e-cozinha',
    departmentName: 'Banheiro e Cozinha',
    category: 'Torneiras e Metais',
    brand: 'Ema Metais',
    inStock: true,
    stockBadge: 'Pronta Entrega',
    featured: false,
    images: ['/images/produtos/torneira-cozinha-parede-ema-metais.webp'],
    technicalSpecs: {
      'Instalação': 'Parede',
      'Bitola de conexão': '1/2" com bucha adaptadora para 3/4"',
      'Material': 'Liga de cobre (latão) e componentes em ABS de alta resistência com banho triplo de cromo',
      'Mecanismo': 'Vedação com mecanismo 1/4 de volta cerâmico de alta durabilidade',
      'Bica': 'Móvel giratória em 360 graus',
      'Arejador': 'Arejador embutido para fluxo laminar sem respingos e economia de até 40% de água',
      'Pressão de funcionamento': '2 a 40 m.c.a. (metros de coluna d\'água)'
    },
    applications: [
      'Pias de cozinha com ponto de água na parede, bancadas com frontão e áreas de churrasqueira',
      'Cubas simples ou duplas que necessitam de direcionamento de jato de água em 360°'
    ],
    warranty: '1 ano contra defeitos de fabricação (Ema Metais)',
    relatedSkus: ['30402', '100702', '100204'],
    detailedDescription: `A Torneira de Parede para Pia de Cozinha Ema Metais é a união perfeita de funcionalidade prática, economia de água e acabamento cromado durável. Projetada para ser instalada diretamente no ponto de água da parede sobre pias e bancadas, ela proporciona ampla altura e liberdade de movimentos para a lavagem de panelas grandes, travessas e alimentos volumosos.\n\nSua bica móvel conta com rotação livre de 360 graus com vedação dupla por anéis de borracha nitrílica, permitindo alternar facilmente o jato entre cubas de pias duplas sem vazamentos no corpo. O mecanismo com pastilha cerâmica de 1/4 de volta permite abrir e fechar a água com extrema suavidade, mesmo com as mãos molhadas ou engorduradas, além de evitar o desgaste por atrito que provoca o clássico pinga-pinga de torneiras convencionais.\n\nPossui arejador na ponta da bica que injeta ar no jato d'água, produzindo uma ducha suave e volumosa que não espirra água para fora da cuba e economiza até 40% no consumo de água da residência.`,
    faq: [
      {
        question: 'Essa torneira serve em cano de 1/2 polegada ou 3/4?',
        answer: 'Ela acompanha rosca de 1/2" e bucha adaptadora de redução/aumento para 3/4", sendo compatível com qualquer encanamento de parede padrão.'
      },
      {
        question: 'O mecanismo é de 1/4 de volta ou de rosca comum?',
        answer: 'É com mecanismo de 1/4 de volta cerâmico, muito mais prático e durável, abrindo a vazão total com apenas um quarto de giro na manopla.'
      },
      {
        question: 'O acabamento cromado oxida com o tempo?',
        answer: 'O metal recebe tripla camada de cromo para proteção anticorrosiva. Para mantê-la como nova, basta limpar semanalmente com flanela úmida e sabão neutro, sem usar esponja de aço ou saponáceos.'
      }
    ]
  },

  // 13. Bacia Sanitária Deca Izy
  {
    id: 'bacia-sanitaria-convencional-deca-izy-branca',
    sku: '30405',
    name: 'Bacia Sanitária Convencional Deca Linha Izy Branca P.11.17',
    slug: 'bacia-sanitaria-convencional-deca-izy-branca',
    description: 'Vaso sanitário convencional em cerâmica vitrificada Deca linha Izy modelo P.11, com tecnologia de descarga ecológica Duo e 10 anos de garantia.',
    price: 189.90,
    unit: 'UN',
    departmentId: 'banheiro-e-cozinha',
    departmentName: 'Banheiro e Cozinha',
    category: 'Louças Sanitárias e Assentos',
    brand: 'Deca',
    inStock: true,
    stockBadge: 'Pronta Entrega',
    featured: true,
    images: ['/images/produtos/bacia-sanitaria-convencional-deca-izy.webp'],
    technicalSpecs: {
      'Modelo': 'P.11.17 Convencional',
      'Linha': 'Izy',
      'Material': 'Argila, feldspato, caulim e esmalte vitrificado de alta densidade',
      'Cor': 'Branco Brilhante',
      'Altura': '38 cm',
      'Largura': '37,5 cm',
      'Profundidade': '47,5 cm',
      'Peso líquido': '13,4 kg',
      'Saída de esgoto': 'Vertical padrão de 100 mm para o piso',
      'Consumo de descarga': 'Preparada para descarga econômica de 6 litros ou duplo acionamento 3/6 litros'
    },
    applications: [
      'Banheiros residenciais, suítes, lavabos e estabelecimentos comerciais com válvula de descarga de parede ou caixa de descarga acoplada externa',
      'Substituição de vasos sanitários antigos por modelos padronizados de alta eficiência hídrica'
    ],
    warranty: '10 anos de garantia Deca para louças sanitárias',
    relatedSkus: ['30403', '100510'],
    detailedDescription: `A Bacia Sanitária Convencional Deca Linha Izy (P.11.17) é a louça sanitária mais vendida e respeitada do Brasil, símbolo de eficiência, design clássico e durabilidade comprovada. Projetada pela Deca para oferecer o melhor custo-benefício do mercado, ela se adapta perfeitamente a banheiros de todos os estilos, desde reformas práticas até residências de alto padrão.\n\nFabricada em cerâmica vitrificada com processo rigoroso de queima e esmaltação uniforme, sua superfície ultra lisa e não porosa evita o acúmulo de sujeira e bactérias, facilitando a limpeza diária e mantendo o branco impecável por décadas. Seu sifão interno é 100% esmaltado, o que garante vazão total dos dejetos em uma única descarga sem risco de entupimentos e com baixo ruído.\n\nDesenvolvida para operar em conjunto com válvulas de parede modernas (Duo 3/6L) ou caixas plásticas de embutir, proporciona economia de até 60% no consumo de água da residência. Compatível com assentos sanitários ovais universais.`,
    faq: [
      {
        question: 'Este modelo Izy é para caixa acoplada ou para válvula de parede?',
        answer: 'Este é o modelo convencional (P.11.17), projetado para instalação com válvula de descarga embutida na parede (Hydra/Docol) ou tubulação de descarga externa.'
      },
      {
        question: 'O vaso acompanha assento e parafusos de fixação?',
        answer: 'Não. A louça é fornecida individualmente. O assento sanitário e os parafusos prisioneiros de fixação no piso são adquiridos separadamente.'
      },
      {
        question: 'Qual assento sanitário é compatível com esta bacia?',
        answer: 'Qualquer assento oval universal é compatível, com destaque para o Assento Atlas Oval Soft Close (SKU 30403).'
      },
      {
        question: 'Qual a garantia oferecida pela Deca?',
        answer: 'A Deca oferece 10 anos de garantia integral contra defeitos de fabricação em todas as suas louças sanitárias.'
      }
    ]
  },

  // 14. Piso Palau Brilhante 61x61 Ceral
  {
    id: 'piso-palau-brilhante-61x61-ceral',
    sku: '30601',
    name: 'Piso Cerâmico Palau Brilhante 61x61cm HD Ceral (2,65m²/cx)',
    slug: 'piso-palau-brilhante-61x61-ceral',
    description: 'Revestimento cerâmico esmaltado brilhante 61x61cm com impressão digital HD, 4 faces marmorizadas e rendimento de 2,65m² por caixa.',
    price: 36.90,
    unit: 'M²',
    departmentId: 'pisos-e-revestimentos',
    departmentName: 'Pisos e Revestimentos',
    category: 'Pisos Cerâmicos e Porcelanatos',
    brand: 'Ceral',
    inStock: true,
    stockBadge: 'Pronta Entrega',
    featured: true,
    images: ['/images/produtos/piso-palau-brilhante-61x61-ceral.webp'],
    technicalSpecs: {
      'Formato': '61 cm x 61 cm',
      'Acabamento': 'Brilhante esmaltado de alta reflexão',
      'Borda': 'Bold (arredondada suave)',
      'Impressão': 'Tecnologia Digital Full HD com 4 faces diferentes',
      'Variação de tonalidade': 'V3 (Variação moderada de veios)',
      'Indicação de uso': 'LC (Ambientes residenciais internos sem acesso direto para a rua: salas, quartos, banheiros)',
      'Metragem por caixa': '2,65 m²',
      'Peças por caixa': '7 peças',
      'Junta mínima recomendada': '5 mm'
    },
    applications: [
      'Pisos e paredes internas residenciais: salas de estar, quartos, corredores e banheiros',
      'Reformas imobiliárias que buscam a sofisticação visual do mármore com excelente custo-benefício'
    ],
    warranty: '5 anos pelo fabricante (Grupo Ceral)',
    relatedSkus: ['100105', '20301', '100605'],
    detailedDescription: `O Piso Cerâmico Palau Brilhante 61x61cm HD do Grupo Ceral traduz a nobreza e a elegância dos mármores clássicos em uma cerâmica esmaltada de alta qualidade. Com esmalte brilhante de alto índice de reflexão luminosa, ele amplia visualmente os ambientes e confere sofisticação imediata a salas, quartos e corredores residenciais.\n\nProduzido com impressão digital Full HD de última geração, possui 4 faces com desenhos distintos (variação V3), garantindo um assentamento natural onde as peças não se repetem de maneira óbvia, reproduzindo com fidelidade os veios e texturas dos minerais nobres. Seu formato quadrado moderno de 61x61 cm reduz a quantidade de linhas de rejunte no chão.\n\nClassificado na categoria LC, é indicado para áreas residenciais cobertas sem acesso direto para a rua. Para o assentamento correto, recomenda-se o uso de argamassa colante AC-II interna e espaçadores niveladores Cortag para assegurar alinhamento impecável e planicidade perfeita.`,
    faq: [
      {
        question: 'Quantos metros quadrados vêm em uma caixa deste piso?',
        answer: 'Cada caixa fechada contém 7 peças que cobrem exatamente 2,65 m² de área.'
      },
      {
        question: 'O piso Palau pode ser instalado em áreas externas ou garagens?',
        answer: 'Não. Por ter acabamento esmaltado brilhante e classificação LC, ele é indicado exclusivamente para ambientes residenciais internos (salas, quartos, corredores e banheiros), pois áreas externas molhadas podem se tornar escorregadias.'
      },
      {
        question: 'Qual argamassa é recomendada para assentar o piso 61x61 Ceral?',
        answer: 'Recomendamos a argamassa AC-II interna/externa ou AC-I interna com desempenadeira denteada de 8mm para dupla colagem.'
      }
    ]
  },

  // 15. Fechadura STAM 1820/21 Banheiro
  {
    id: 'fechadura-banheiro-wc-stam-1820-21-inox',
    sku: '30701',
    name: 'Fechadura de Embutir para Banheiro WC 40mm Stam 1820/21 Inox',
    slug: 'fechadura-banheiro-wc-stam-1820-21-inox',
    description: 'Fechadura para porta de banheiro WC com broca de 40mm, maçaneta alavanca, tranqueta interna com destravamento externo de emergência e acabamento em inox.',
    price: 49.90,
    unit: 'Conjunto',
    departmentId: 'ferragens',
    departmentName: 'Ferragens e Segurança',
    category: 'Fechaduras e Travas',
    brand: 'Stam',
    inStock: true,
    stockBadge: 'Pronta Entrega',
    featured: false,
    images: ['/images/produtos/fechadura-banheiro-stam-1820-21.webp'],
    technicalSpecs: {
      'Linha': 'Residencial 1820/21 WC',
      'Distância de broca': '40 mm',
      'Espessura de porta indicada': '30 mm a 40 mm',
      'Material': 'Aço ABNT 1010/1020, zamac 5, aço inoxidável e latão',
      'Acabamento': 'Espelho e maçaneta em aço inox escovado / polido',
      'Maçaneta': 'Tipo alavanca ergonômica',
      'Trinco': 'Trinco reversível (funciona em portas com abertura para direita ou esquerda)',
      'Norma técnica': 'ABNT NBR 14913'
    },
    applications: [
      'Portas de madeira ou metal para banheiros residenciais, lavabos e sanitários comerciais',
      'Instalação nova ou reposição de fechaduras antigas com broca de 40mm'
    ],
    warranty: '1 ano de garantia de fábrica (Stam)',
    relatedSkus: ['30702', '1453'],
    detailedDescription: `A Fechadura para Banheiro WC Stam 1820/21 Inox é uma das opções mais confiáveis e populares do Brasil para portas internas de sanitários e lavabos. Desenvolvida em conformidade rigorosa com a norma técnica ABNT NBR 14913, oferece funcionamento suave, trancamento seguro e alta durabilidade contra a umidade típica do ambiente de banho.\n\nSua máquina possui distância de broca de 40 mm e trinco bipartido reversível, permitindo instalação imediata tanto em portas que abrem para a direita quanto para a esquerda sem necessidade de desmontar o maquinário. Acompanha espelhos em aço inoxidável e maçaneta anatômica tipo alavanca em zamac com acabamento resistente a marcas de dedos e oxidação.\n\nO sistema de travamento para banheiro conta com tranqueta giratória interna para trancar com comodidade e chave de emergência externa (fenda/chave reserva) que possibilita o destravamento rápido pelo lado de fora em caso de necessidade ou socorro a crianças e idosos trancados.`,
    faq: [
      {
        question: 'Esta fechadura serve para portas que abrem para o lado direito e esquerdo?',
        answer: 'Sim! O trinco da fechadura Stam 1820/21 é reversível. Basta empurrá-lo e girá-lo para inverter o sentido de fechamento conforme a sua porta.'
      },
      {
        question: 'O que acontece se alguém passar mal trancado no banheiro?',
        answer: 'A fechadura acompanha chave de segurança para abertura externa de emergência, permitindo destravar a porta facilmente pelo lado de fora.'
      },
      {
        question: 'Qual a espessura da porta necessária?',
        answer: 'Ela é indicada para portas de madeira ou perfil metálico com espessura padrão entre 30 mm e 40 mm.'
      }
    ]
  },

  // 16. Joelho 3/4 Soldável Amanco
  {
    id: 'joelho-90-soldavel-25mm-amanco',
    sku: '30302',
    name: 'Joelho 90° Soldável 25mm (3/4") PVC Água Fria Amanco Wavin',
    slug: 'joelho-90-soldavel-25mm-amanco',
    description: 'Cotovelo 90 graus soldável em PVC marrom de 25mm para sistemas prediais de água fria, imune à corrosão e com garantia de estanqueidade.',
    price: 1.80,
    unit: 'UN',
    departmentId: 'hidraulica',
    departmentName: 'Tubos e Conexões',
    category: 'Conexões e Tubos Soldáveis',
    brand: 'Amanco Wavin',
    inStock: true,
    stockBadge: 'Pronta Entrega',
    featured: false,
    images: ['/images/produtos/joelho-90-soldavel-25mm-amanco.webp'],
    technicalSpecs: {
      'Bitola': '25 mm (equivalente nominal a 3/4 de polegada)',
      'Ângulo': '90 graus',
      'Material': 'PVC rígido (Policloreto de Vinila)',
      'Cor': 'Marrom',
      'Pressão nominal de serviço': '7,5 kgf/cm² (750 kPa ou 75 m.c.a.) a 20°C',
      'Temperatura máxima de trabalho': '45°C (água fria)',
      'Tipo de junta': 'Soldável a frio com adesivo plástico para PVC',
      'Norma técnica': 'ABNT NBR 5648 e NBR 5626'
    },
    applications: [
      'Mudança de direção em 90° de tubulações de água fria em paredes e pisos de banheiros, cozinhas e lavanderias',
      'Instalações hidráulicas prediais, residenciais, comerciais e industriais'
    ],
    warranty: '50 anos de vida útil estimada conforme normas técnicas do fabricante',
    relatedSkus: ['100203', '100204', '30301'],
    detailedDescription: `O Joelho 90° Soldável 25mm (3/4") Amanco Wavin é um componente fundamental para a execução de redes hidráulicas prediais seguras e livres de vazamentos. Fabricado em PVC rígido de alta resistência e espessura controlada, é projetado para desviar o fluxo da tubulação em ângulo reto de 90 graus em sistemas de condução de água fria potável.\n\nPossui paredes internas lisas com baixíssimo coeficiente de atrito, o que minimiza a perda de carga na pressão da água e impede o acúmulo de incrustações minerais ou limo com o passar dos anos. Por ser imune à corrosão galvânica e eletroquímica, não oxida e garante água pura e cristalina durante toda a sua vida útil.\n\nA instalação é realizada pelo processo de soldagem a frio: basta lixar levemente as superfícies de contato, aplicar solução limpadora preparadora e colar com adesivo plástico para PVC, criando uma fusão molecular perfeita e estanque entre o tubo e a conexão.`,
    faq: [
      {
        question: 'O joelho de 25mm é o mesmo que 3/4 de polegada?',
        answer: 'Sim! Na norma métrica brasileira de PVC rígido para água fria, a bitola de 25 mm corresponde exatamente à tradicional medida de 3/4 de polegada.'
      },
      {
        question: 'Posso usar este joelho em água quente de aquecedor solar ou a gás?',
        answer: 'Não. O PVC marrom é projetado exclusivamente para água fria (temperatura máxima de 45°C). Para água quente, devem ser utilizadas conexões de CPVC ou PPR.'
      },
      {
        question: 'Qual o tempo de cura antes de liberar a pressão de água na tubulação?',
        answer: 'Recomenda-se aguardar no mínimo 1 hora para pressão leve e 12 horas antes de submeter a rede à pressão total de teste de estanqueidade.'
      }
    ]
  },

  // 17. Disco de Cortar Ferro 4 Pol Norton
  {
    id: 'disco-de-corte-ferro-inox-4-1-2-norton-classic',
    sku: '30202',
    name: 'Disco de Corte Fino para Ferro e Inox 4.1/2" (115x1,0mm) Norton Classic',
    slug: 'disco-de-corte-ferro-inox-4-1-2-norton-classic',
    description: 'Disco abrasivo de corte fino 4.1/2" (115mm x 1,0mm x 22,23mm) Norton Classic com reforço de 2 telas de fibra de vidro para cortes rápidos e sem rebarba em aço carbono e inox.',
    price: 6.90,
    unit: 'UN',
    departmentId: 'ferramentas',
    departmentName: 'Ferramentas e Equipamentos',
    category: 'Discos Abrasivos e Corte',
    brand: 'Norton',
    inStock: true,
    stockBadge: 'Pronta Entrega',
    featured: false,
    images: ['/images/produtos/disco-corte-ferro-4-norton-classic.webp'],
    technicalSpecs: {
      'Diâmetro externo': '115 mm (4.1/2 polegadas)',
      'Espessura': '1,0 mm (fino)',
      'Furo central': '22,23 mm (7/8 polegadas)',
      'Grão abrasivo': 'Óxido de alumínio especial com liga resinóide',
      'Reforço': '2 telas de fibra de vidro de alta segurança',
      'Rotação máxima': '13.300 RPM (80 m/s)',
      'Aplicação': 'Aço carbono, ferro fundido, aço inox e tubos metálicos',
      'Linha': 'Classic AR302 / AR312'
    },
    applications: [
      'Corte de vergalhões de ferro CA-50, perfis metálicos, cantoneiras, chapas e tubos industriais',
      'Cortes precisos em serralherias, oficinas metalúrgicas, montagens industriais e funilaria',
      'Corte de barras roscadas, parafusos e arames de amarração de armadura'
    ],
    warranty: 'Garantia legal contra defeitos de fabricação (Norton Abrasivos)',
    relatedSkus: ['86', '92', '30203'],
    detailedDescription: `O Disco de Corte Fino 4.1/2" Norton Linha Classic é referência nacional em rendimento, velocidade e segurança operacional para cortes em metais ferrosos e aço inoxidável. Desenvolvido com grãos de óxido de alumínio de alta performance e resinas nobres, ele realiza cortes frios e extremamente rápidos sem queimar o metal ou alterar a têmpera do aço trabalhado.\n\nSua espessura fina de apenas 1,0 mm reduz drasticamente a remoção de material e a geração de fagulhas, exigindo menos potência da esmerilhadeira angular e proporcionando cortes limpos, retos e praticamente livres de rebarbas, o que poupa tempo valioso de acabamento e lixamento posterior.\n\nConstruído com duas telas de fibra de vidro de alta resistência que garantem total integridade estrutural contra estilhaçamento, atendendo às normas de segurança ABNT e internacionais para rotações de até 13.300 RPM.`,
    faq: [
      {
        question: 'Este disco serve para qualquer esmerilhadeira de 4.1/2 polegadas?',
        answer: 'Sim, possui furo padrão de 22,23 mm (7/8") compatível com todas as esmerilhadeiras angulares do mercado brasileiro de marcas como Bosch, Makita, DeWalt, Vonder e outras.'
      },
      {
        question: 'Posso usar o disco de corte para desbastar solda ou lixar peças?',
        answer: 'Nunca! Discos finos de corte (1,0mm) são projetados exclusivamente para esforço radial de corte a 90 graus. O desbaste lateral pode romper a tela e estilhaçar o disco.'
      },
      {
        question: 'Ele corta aço inoxidável sem contaminar a peça?',
        answer: 'Sim, a formulação do disco Norton Classic é livre de contaminantes de ferro, cloro e enxofre em níveis nocivos, prevenindo pontos de ferrugem no inox.'
      }
    ]
  },

  // 18. Chave Combinada 14
  {
    id: 'chave-combinada-14mm-cromo-vanadio',
    sku: '30203',
    name: 'Chave Combinada 14mm em Aço Cromo Vanádio Tramontina PRO / Vonder',
    slug: 'chave-combinada-14mm-cromo-vanadio',
    description: 'Chave combinada de 14mm forjada em aço cromo vanádio com acabamento cromado fosco, um lado boca fixa e um lado estrela com inclinação de 15°.',
    price: 19.90,
    unit: 'UN',
    departmentId: 'ferramentas',
    departmentName: 'Ferramentas e Equipamentos',
    category: 'Ferramentas Mecânicas',
    brand: 'Tramontina PRO',
    inStock: true,
    stockBadge: 'Pronta Entrega',
    featured: false,
    images: ['/images/produtos/chave-combinada-14mm-cromo-vanadio.webp'],
    technicalSpecs: {
      'Medida': '14 mm',
      'Material': 'Aço Cromo Vanádio (Cr-V) forjado e temperado',
      'Acabamento': 'Cromado e niquelado anticorrosivo',
      'Perfil': 'Boca fixa + Estrela (Unit Drive) com perfil estriado',
      'Inclinação da cabeça': '15 graus em relação ao corpo',
      'Norma técnica': 'DIN 3113 / ISO 7738'
    },
    applications: [
      'Aperto e desaperto de parafusos e porcas sextavadas de 14mm',
      'Manutenção mecânica automotiva, montagem de estruturas metálicas e andaimes na obra',
      'Fixação de máquinas, bombas de água, betoneiras e equipamentos de construção civil'
    ],
    warranty: 'Garantia vitalícia contra defeitos de fabricação (linhas industriais)',
    relatedSkus: ['30202', '30205', '100606'],
    detailedDescription: `A Chave Combinada 14mm em Aço Cromo Vanádio é uma ferramenta profissional indispensável para mecânicos, instaladores e mestres de obra. Forjada a quente em aço especial com liga de cromo e vanádio e submetida a tratamento térmico integral, ela suporta torques extremos sem deformar as bocas nem abrir folgas.\n\nPossui design inteligente que reúne duas ferramentas em uma única peça: de um lado, a boca fixa tradicional para aproximações rápidas e encaixes em locais de espaço restrito; do outro lado, a cabeça estrela estriada que abraça os seis vértices da porca de maneira uniforme, distribuindo a força e prevenindo o arredondamento das cabeças dos parafusos.\n\nA inclinação de 15 graus da cabeça em relação à haste proporciona folga perfeita para os dedos e junta da mão durante o giro, garantindo segurança contra impactos contra a superfície de trabalho. Acabamento cromado acetinado que facilita a limpeza e impede o avanço da ferrugem.`,
    faq: [
      {
        question: 'Por que o aço cromo vanádio é melhor do que o aço carbono comum?',
        answer: 'O cromo vanádio (Cr-V) confere maior tenacidade mecânica e resistência à torção, evitando que a chave quebre ou espanhe a boca sob alto esforço.'
      },
      {
        question: 'Posso usar extensores ou canos para aumentar o torque da chave?',
        answer: 'Não é recomendado utilizar tubos como prolongador, pois isso multiplica a alavanca além do limite projetado pela norma DIN, podendo danificar a ferramenta ou o fixador.'
      },
      {
        question: 'O lado estrela serve em parafusos com cabeça sextavada?',
        answer: 'Sim, o perfil estriado de 12 pontas do lado estrela encaixa com máxima precisão em parafusos e porcas sextavadas com passo de 30°.'
      }
    ]
  },

  // 19. Telha Eternit 6mm
  {
    id: 'telha-fibrocimento-ondulada-6mm-244x110m-eternit',
    sku: '30801',
    name: 'Telha de Fibrocimento Ondulada 6mm 2,44 x 1,10m Eternit CRFS',
    slug: 'telha-fibrocimento-ondulada-6mm-244x110m-eternit',
    description: 'Telha ondulada de fibrocimento 6mm com tecnologia CRFS 100% sem amianto, largura de 1,10m e 2,44m de comprimento para coberturas residenciais e industriais.',
    price: 68.90,
    unit: 'UN',
    departmentId: 'construcao-basica',
    departmentName: 'Construção Básica',
    category: 'Telhas e Coberturas',
    brand: 'Eternit',
    inStock: true,
    stockBadge: 'Pronta Entrega',
    featured: true,
    images: ['/images/produtos/telha-fibrocimento-ondulada-6mm-eternit.webp'],
    technicalSpecs: {
      'Comprimento': '2,44 metros',
      'Largura total': '1,10 metros',
      'Largura útil': '1,05 metros',
      'Espessura': '6 mm',
      'Passo da onda': '177 mm',
      'Altura da onda': '51 mm',
      'Tecnologia': 'CRFS (Cimento Reforçado com Fios Sintéticos) 100% livre de amianto',
      'Vão livre máximo': '1,69 metros entre apoios',
      'Inclinação mínima': '5° (9%) - Recomendado: 15° (27%)',
      'Norma técnica': 'ABNT NBR 15210-1 e NBR 15210-2'
    },
    applications: [
      'Coberturas de residências, garagens, galpões industriais, comércios e edículas',
      'Fechamentos laterais de galpões e estruturas pré-moldadas'
    ],
    warranty: '5 anos de garantia contra defeitos de fabricação (Eternit)',
    relatedSkus: ['30802', '100108', '86'],
    detailedDescription: `A Telha de Fibrocimento Ondulada 6mm Eternit no tamanho 2,44 x 1,10m é o padrão absoluto de cobertura para obras que buscam máxima economia estrutural, resistência e velocidade de montagem. Fabricada com a consagrada tecnologia CRFS (Cimento Reforçado com Fios Sintéticos de Polipropileno), ela é 100% isenta de amianto, ecológica e segura para instaladores e moradores.\n\nSua espessura robusta de 6 mm confere alta rigidez mecânica contra fortes rajadas de vento, impactos e granizo leve, além de excelente estabilidade térmica que mantém a temperatura interna mais amena. Permite vãos livres entre apoios de até 1,69 m, reduzindo significativamente o volume de madeira ou ferragem necessária para o madeiramento do telhado.\n\nA fixação deve ser realizada na 2ª e 5ª crista das ondas com parafusos ou ganchos com arruelas de vedação adequadas. Nas sobreposições de quatro peças, deve-se realizar o corte de cantos (canto cortado) conforme o manual da ABNT NBR 7196 para evitar frestas e garantir estanqueidade total contra goteiras.`,
    faq: [
      {
        question: 'Essa telha é sem amianto?',
        answer: 'Sim! As telhas Eternit utilizam a tecnologia CRFS (fios sintéticos de polipropileno de alta tecnologia), sendo 100% livres de amianto e totalmente seguras.'
      },
      {
        question: 'Qual a distância máxima recomendada entre as terças de apoio?',
        answer: 'Para a telha ondulada de 6mm com 2,44m de comprimento, a distância máxima de vão livre entre apoios é de 1,69 metro.'
      },
      {
        question: 'Posso andar diretamente sobre a telha durante a montagem?',
        answer: 'Nunca ande diretamente sobre as telhas. Para movimentação no telhado, utilize sempre tábuas apoiadas sobre pelo menos três ondas e sobre as terças de apoio.'
      },
      {
        question: 'Qual a inclinação mínima do telhado para não ter goteiras?',
        answer: 'A inclinação mínima aceitável pela norma é de 5° (9%), sendo 15° (27%) a inclinação técnica ideal recomendada para rápida drenagem pluvial.'
      }
    ]
  },

  // 20. Mangueira de Jardim Durin 1/2 2.0mm
  {
    id: 'mangueira-jardim-trancada-1-2-durin-2mm',
    sku: '30901',
    name: 'Mangueira de Jardim Trançada Siliconada 1/2" Parede 2,0mm Durin',
    slug: 'mangueira-jardim-trancada-1-2-durin-2mm',
    description: 'Mangueira trançada reforçada em PVC virgem siliconado com malha interna de poliéster, parede grossa de 2,0mm e bitola de 1/2 polegada.',
    price: 49.90,
    unit: 'Rolo 20 Metros',
    departmentId: 'jardim-e-utilidades',
    departmentName: 'Jardim e Área Externa',
    category: 'Mangueiras e Irrigação',
    brand: 'Durin',
    inStock: true,
    stockBadge: 'Pronta Entrega',
    featured: false,
    images: ['/images/produtos/mangueira-jardim-durin-trancada-1-2.webp'],
    technicalSpecs: {
      'Bitola interna': '1/2 polegada (12,7 mm)',
      'Espessura da parede': '2,0 mm reforçada',
      'Comprimento do rolo': '20 metros',
      'Estrutura': '3 camadas (camada interna de PVC virgem, intermediária com malha de poliéster trançado e externa em PVC cristal verde siliconado)',
      'Pressão de trabalho': 'Suporta até 10 kgf/cm² (142 psi)',
      'Anti-dobra': 'Elevada flexibilidade que não torce nem bloqueia o fluxo de água'
    },
    applications: [
      'Irrigação de jardins, canteiros, gramados e hortas domésticas',
      'Lavagem de calçadas, quintais, garagens e veículos',
      'Uso em canteiros de obras para molhagem de lajes de concreto e cura de reboco'
    ],
    warranty: '1 ano de garantia contra rachaduras de fabricação (Durin)',
    relatedSkus: ['30302', '100606'],
    detailedDescription: `A Mangueira de Jardim Trançada Siliconada 1/2" com parede grossa de 2,0 mm Durin foi desenvolvida para solucionar de forma definitiva o problema clássico de mangueiras comuns que dobram, torcem e interrompem o fluxo de água. Fabricada com tecnologia de três camadas concêntricas, ela combina resistência mecânica, flexibilidade superior e longa vida útil.\n\nSua camada intermediária é composta por uma trama de 26 fios de poliéster trançado de alta tenacidade, que suporta picos de pressão de até 10 kgf/cm² sem estufar ou romper, mesmo quando a torneira é aberta com esguicho fechado na ponta. A camada externa siliconada recebe aditivos que protegem contra o ressecamento causado pela radiação solar e atrito com calçadas ásperas.\n\nProduzida com matéria-prima 100% virgem, não solta gosto ou cheiro na água, é maleável para enrolar no carretel e desenrola suavemente pelo quintal sem criar nós que estressam o usuário.`,
    faq: [
      {
        question: 'Essa mangueira dobra ou torce durante o uso?',
        answer: 'Sua estrutura de 3 camadas com parede de 2,0mm e malha de poliéster trançada garante excelente efeito anti-dobra, mantendo a água fluindo mesmo em curvas acentuadas.'
      },
      {
        question: 'Ela aguenta pressão de água direto da rede da rua?',
        answer: 'Sim, suporta pressão de trabalho de até 10 kgf/cm², suportando com folga a pressão de hidrômetros residenciais e bombas de pressurização moderadas.'
      },
      {
        question: 'Pode ficar exposta ao sol no quintal?',
        answer: 'Sim, o PVC cristal siliconado possui aditivos contra raios UV. No entanto, para maximizar sua durabilidade por muitos anos, recomenda-se esvaziá-la após o uso e guardá-la à sombra.'
      }
    ]
  },

  // 21. Cantoneira Esquerda Mão Francesa Branca 20cm
  {
    id: 'suporte-mao-francesa-cantoneira-branca-20cm',
    sku: '30702',
    name: 'Suporte Mão Francesa Cantoneira Reforçada Branca 20cm',
    slug: 'suporte-mao-francesa-cantoneira-branca-20cm',
    description: 'Suporte cantoneira mão francesa reforçada em aço carbono 20cm com pintura epóxi branca, suporte de alta carga para prateleiras e bancadas.',
    price: 7.50,
    unit: 'UN',
    departmentId: 'ferragens',
    departmentName: 'Ferragens e Segurança',
    category: 'Suportes e Mãos Francesas',
    brand: 'Standers',
    inStock: true,
    stockBadge: 'Pronta Entrega',
    featured: false,
    images: ['/images/produtos/mao-francesa-cantoneira-branca-20cm.webp'],
    technicalSpecs: {
      'Comprimento do braço': '20 cm (ideal para prateleiras de 20 a 25 cm de profundidade)',
      'Material': 'Chapa de aço carbono laminado com reforço diagonal estampado',
      'Acabamento': 'Pintura eletrostática epóxi em pó branca anticorrosiva',
      'Capacidade de carga': 'Até 25 kg por suporte (50 kg o par distribuídos uniformemente)',
      'Furação': 'Furos escareados para encaixe embutido de parafusos'
    },
    applications: [
      'Sustentação de prateleiras de madeira, MDF, vidro ou aço em quartos, despensas, cozinhas e lavanderias',
      'Apoio de bancadas leves de trabalho, estantes de livros e organização de garagens'
    ],
    warranty: '1 ano contra defeitos de fabricação',
    relatedSkus: ['30701', '1453'],
    detailedDescription: `O Suporte Mão Francesa Reforçada Branca 20cm é o elemento indispensável para a fixação estável e resistente de prateleiras em paredes de alvenaria ou madeira. Estampada em chapa espessa de aço carbono laminado com barra diagonal soldada de reforço estrutural, ela impede qualquer flexão ou empenamento do braço mesmo sob cargas contínuas pesadas.\n\nRecebe acabamento com pintura eletrostática a pó na cor branca, proporcionando acabamento liso e discreto que harmoniza com qualquer ambiente residencial ou comercial, além de proteger o metal contra a oxidação. Possui furos pré-moldados e escareados que permitem que a cabeça do parafuso fique rente à superfície do suporte, garantindo apoio plano para a prateleira.\n\nSuporta até 25 kg de carga por suporte (50 kg o par) quando fixada com buchas adequadas (tamanho 8 ou 10) em alvenaria sólida. O espaçamento ideal recomendado entre suportes consecutivos é de aproximadamente 50 a 60 cm.`,
    faq: [
      {
        question: 'Qual tamanho de prateleira combina com essa mão francesa de 20cm?',
        answer: 'Ela é perfeita para prateleiras com profundidade entre 20 cm e 25 cm de largura.'
      },
      {
        question: 'Quanto peso o par de suportes aguenta?',
        answer: 'Quando fixadas corretamente em parede de tijolo maciço ou bloco com buchas 8mm, suportam até 50 kg uniformemente distribuídos sobre a prateleira.'
      },
      {
        question: 'Os parafusos e buchas acompanham o produto?',
        answer: 'O suporte é vendido por unidade avulsa. Parafusos e buchas devem ser adquiridos conforme o tipo de parede (alvenaria sólida, bloco oco ou drywall).'
      }
    ]
  },

  // 22. Carriola Fischer CH24
  {
    id: 'carrinho-de-mao-carriola-fischer-chapa-24-50l',
    sku: '30204',
    name: 'Carrinho de Mão Carriola Caçamba Chapa 24 Reforçada 50L Fischer',
    slug: 'carrinho-de-mao-carriola-fischer-chapa-24-50l',
    description: 'Carrinho de mão para construção civil com caçamba estampada em aço chapa 24 (50 litros), chassi tubular reforçado e roda com pneu e câmara.',
    price: 199.00,
    unit: 'UN',
    departmentId: 'ferramentas',
    departmentName: 'Ferramentas e Equipamentos',
    category: 'Carrinhos de Carga e Transporte',
    brand: 'Fischer',
    inStock: true,
    stockBadge: 'Pronta Entrega',
    featured: true,
    images: ['/images/produtos/carrinho-de-mao-fischer-ch24.webp'],
    technicalSpecs: {
      'Capacidade volumétrica': '50 Litros (líquidos) / até 70 Litros (materiais secos a granel)',
      'Espessura da caçamba': 'Chapa de aço carbono 24 (0,60 mm)',
      'Chassi': 'Estrutura tubular em aço carbono de alta resistência com apoio frontal de báscula',
      'Pintura': 'Eletrostática a pó protetora contra corrosão',
      'Roda': 'Roda metálica completa com pneu 3.25-8 e câmara de ar de alta absorção de impacto',
      'Empunhadura': 'Manoplas plásticas antiderrapantes',
      'Capacidade de peso': 'Até 100 kg de carga'
    },
    applications: [
      'Transporte de concreto fresco, massa de assentamento, areia, brita, entulho e cimento no canteiro de obras',
      'Serviços de terraplenagem, jardinagem, reformas e limpeza de lotes'
    ],
    warranty: '6 meses contra defeitos de fabricação (Fischer)',
    relatedSkus: ['30201', '397', '400', '100103'],
    detailedDescription: `O Carrinho de Mão Fischer Chapa 24 (50 Litros) é a ferramenta de transporte mais clássica, ágil e resistente para o dia a dia da construção civil e reformas residenciais. Projetado para suportar o rigor diário do canteiro de obras, possui caçamba estampada em chapa de aço especial com bordas vincadas que conferem extrema rigidez estrutural, evitando que as laterais amassem ao descarregar concreto ou entulho.\n\nSeu chassi tubular de aço é desenhado com centro de gravidade rebaixado e braços longos, o que alivia consideravelmente a carga que o mestre de obra ergue com as mãos, transferindo o peso para o eixo da roda e permitindo manobras precisas mesmo em passarelas estreitas de tábuas de obra. Conta com ponta dianteira com batente de báscula para virar o carrinho suavemente sem esforço.\n\nAcompanha conjunto de rodagem com pneu e câmara de ar, garantindo rolagem suave e excelente amortecimento sobre terrenos acidentados, pedregulhos e valas, reduzindo impactos nas costas do operador.`,
    faq: [
      {
        question: 'Qual a capacidade de carga em quilos desta carriola?',
        answer: 'Ela é projetada para transportar com total segurança cargas de até 100 kg no canteiro de obras.'
      },
      {
        question: 'O pneu é com câmara de ar ou maciço?',
        answer: 'Este modelo acompanha roda completa com pneu e câmara de ar (3.25-8), proporcionando rodagem muito mais macia e fácil de empurrar sobre solos irregulares e terra solta.'
      },
      {
        question: 'A caçamba enferruja se transportar concreto molhado?',
        answer: 'A caçamba recebe pintura eletrostática a pó que previne a corrosão. No entanto, é fundamental lavar a caçamba com água corrente ao final da jornada para remover resíduos secos de cimento.'
      }
    ]
  },

  // 23. Celote Colonial
  {
    id: 'calco-celote-vedacao-telha-colonial',
    sku: '30802',
    name: 'Calço Plástico Celote para Telha Colonial e Cumeeira com Vedação',
    slug: 'calco-celote-vedacao-telha-colonial',
    description: 'Kit de calços plásticos de apoio e vedação (celotes) para fixação de telhas coloniais de PVC e cumeeiras, impedindo esmagamento e infiltrações.',
    price: 19.90,
    unit: 'Pacote com 20 Peças',
    departmentId: 'construcao-basica',
    departmentName: 'Construção Básica',
    category: 'Telhas e Coberturas',
    brand: 'Afort',
    inStock: true,
    stockBadge: 'Pronta Entrega',
    featured: false,
    images: ['/images/produtos/celote-calco-telha-colonial.webp'],
    technicalSpecs: {
      'Quantidade por pacote': '20 calços (celotes) de apoio',
      'Material': 'Polipropileno virgem com aditivos anti-UV e antioxidantes',
      'Cor': 'Terracota / Cerâmica (harmoniza com a cor da telha colonial)',
      'Compatibilidade': 'Telhas coloniais de PVC, cumeeiras articuladas e coberturas plásticas',
      'Função': 'Suporte interno na crista da onda para evitar amassamento e garantir aperto estanque do parafuso'
    },
    applications: [
      'Fixação de telhas coloniais de PVC e cumeeiras em estruturas de madeira ou metalon',
      'Vedação de pontos de parafuso contra goteiras em telhados residenciais'
    ],
    warranty: '5 anos pelo fabricante (Afort)',
    relatedSkus: ['30801', '100108'],
    detailedDescription: `O Calço Plástico Celote para Telha Colonial é um acessório de engenharia obrigatório para a correta instalação de telhados com telhas modelo colonial (PVC ou plástico termoformado) e suas respectivas cumeeiras. Injetado em polímero técnico virgem com aditivos especiais contra a radiação solar ultravioleta, ele mantém sua flexibilidade e resistência estrutural por décadas sem ressecar ou quebrar sob intempéries.\n\nSua geometria reproduz com exatidão a curvatura interna da crista da onda da telha colonial, servindo como calço amortecedor interno posicionado entre a telha e a viga/terça do madeiramento. Quando o parafuso autobrocante é apertado, o celote impede que a onda da telha seja esmagada ou trincada pela força do aperto, garantindo a integridade estética da cobertura.\n\nAlém de preservar o desenho perfeito das ondas do telhado, ele assegura a pressão ideal sobre a arruela de vedação superior, blindando o ponto de fixação contra a penetração de água da chuva e eliminando goteiras indesejadas no forro da casa.`,
    faq: [
      {
        question: 'Para que serve o celote na telha colonial?',
        answer: 'O celote fica posicionado por baixo da crista da onda da telha colonial. Ele serve como calço para que a telha não seja deformada ou rachada quando o parafuso de fixação for apertado.'
      },
      {
        question: 'Quantos calços são necessários por telha?',
        answer: 'Geralmente recomenda-se de 4 a 6 pontos de fixação com calço por telha colonial (conforme o comprimento e espaçamento das terças), além dos pontos nas cumeeiras.'
      },
      {
        question: 'O material resseca com o calor do sol no telhado?',
        answer: 'Não. Os calços Afort contam com estabilizantes térmicos e proteção anti-UV que evitam o ressecamento precoce sob o sol intenso.'
      }
    ]
  },

  // 24. Trena 5m Irwin
  {
    id: 'trena-metrica-profissional-5m-irwin-iw13947',
    sku: '30205',
    name: 'Trena Métrica Profissional 5 Metros com Trava IW13947 Irwin',
    slug: 'trena-metrica-profissional-5m-irwin-iw13947',
    description: 'Trena profissional de 5m (16 pés) com fita de aço revestida em nylon, caixa em ABS antichoque, botão de freio rápido e presilha para cinto.',
    price: 24.90,
    unit: 'UN',
    departmentId: 'ferramentas',
    departmentName: 'Ferramentas e Equipamentos',
    category: 'Instrumentos de Medição',
    brand: 'Irwin',
    inStock: true,
    stockBadge: 'Pronta Entrega',
    featured: false,
    images: ['/images/produtos/trena-5m-irwin-iw13947.webp'],
    technicalSpecs: {
      'Comprimento da fita': '5 metros (16 pés)',
      'Largura da fita': '19 mm (3/4 de polegada)',
      'Material da fita': 'Aço carbono temperado com revestimento protetor de polímero de nylon',
      'Graduação': 'Milímetros, centímetros e polegadas com impressão contínua de alta visibilidade',
      'Corpo': 'Plástico ABS de alto impacto com design ergonômico',
      'Mecanismos': 'Trava deslizante frontal + Freio rápido de fita',
      'Gancho': 'Ponta com gancho zero absoluto rebitado com rebites duplos',
      'Acessórios': 'Presilha de aço para cinto e alça de mão',
      'Código de referência': 'IW13947'
    },
    applications: [
      'Medições de alta precisão em canteiros de obra, reformas, alvenaria e carpintaria',
      'Marcenaria, montagem de móveis, instalação de pisos cerâmicos e gesso',
      'Uso diário em conferência de medidas de portas, janelas e cômodos'
    ],
    warranty: '1 ano de garantia contra defeitos de fabricação (Irwin Tools)',
    relatedSkus: ['100604', '30201', '30601'],
    detailedDescription: `A Trena Métrica Profissional 5 Metros Irwin IW13947 combina durabilidade industrial, leitura rápida e ergonomia precisa em uma das ferramentas de medição mais confiáveis do mercado mundial. Projetada para resistir a quedas acidentais e poeira intensa de canteiro de obras, possui caixa compacta moldada em ABS de alto impacto que se acomoda com conforto na palma da mão.\n\nSua fita de aço de 19 mm de largura conta com tratamento especial de cobertura com polímero de nylon sobre a graduação numérica, garantindo até 2 vezes mais resistência ao atrito e à abrasão do que fitas com verniz convencional, impedindo que os números se apaguem com o atrito da areia e poeira. A largura generosa de 19mm confere excelente alcance vertical e horizontal sem que a fita dobre no ar.\n\nPossui gancho na ponta com tecnologia de "zero absoluto" que se ajusta automaticamente para compensar a espessura da chapa metálica em medições internas e externas. O botão superior com trava dupla permite travar a fita na medida desejada com um simples toque do polegar. Acompanha presilha metálica para fixação no cinto de trabalho.`,
    faq: [
      {
        question: 'O gancho na ponta da trena fica levemente solto de propósito?',
        answer: 'Sim! Isso é uma característica técnica obrigatória chamada "Zero Absoluto". A folga corresponde exatamente à espessura da ponta de metal, garantindo precisão milimétrica tanto quando você puxa a fita enganchada em uma borda quanto quando você empurra a fita contra uma parede.'
      },
      {
        question: 'Os números da fita apagam com o uso na poeira da obra?',
        answer: 'Não. A fita Irwin IW13947 possui película protetora de nylon sobre a pintura milimetrada, garantindo resistência superior contra atrito de areia e sujeira.'
      },
      {
        question: 'Qual o alcance da fita sem dobrar no ar?',
        answer: 'Por ter fita larga de 19mm (3/4"), ela permite esticar aproximadamente 1,80m a 2 metros no ar sem dobrar, facilitando medições individuais sem ajudante.'
      }
    ]
  }
];

