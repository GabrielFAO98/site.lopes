import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outputDir = path.resolve(__dirname, '../public/images/produtos');

const downloads = [
  {
    sku: '20401',
    images: [
      {
        filename: 'chuveiro-eletrico-maxi-ducha-3-temperaturas-lorenzetti.webp',
        urls: [
          'https://www.lorenzetti.com.br/images/default-source/produtos-png/chuveiros-eletricos/maxi-ducha-ultra.png',
          'https://images.tcdn.com.br/img/img_prod/1076270/chuveiro_lorenzetti_220v_5500w_3_temperaturas_maxi_branco_167633569_1_cdb2508853a24e5bc3459b3f9e15b671.png'
        ]
      }
    ]
  },
  {
    sku: '20101',
    images: [
      {
        filename: 'tinta-spray-uso-geral-tekbond-400ml.webp',
        urls: [
          'https://images.tcdn.com.br/img/img_prod/1326454/tinta_spray_preto_brilhante_uso_geral_350ml_tekbond_2597_1_fea581cbba2b7cca6380bc207aed36bd.jpg',
          'https://static.felap.com.br/public/felap/imagens/produtos/tinta-spray-amarelo-uso-geral-350ml-250g-tekbond-649ddb237f5f0.jpg'
        ]
      },
      {
        filename: 'tinta-spray-uso-geral-tekbond-cores.webp',
        urls: [
          'https://images.tcdn.com.br/img/img_prod/1391601/tinta_spray_uso_geral_350_ml_tekbond_15297_2_b90472d8f22319f7f22fbff836939c0f.jpg',
          'https://images.tcdn.com.br/img/img_prod/1391601/tinta_spray_uso_geral_350_ml_tekbond_15297_3_af26ac5ba5ecb337b6d0c5fdda3241ee.jpg'
        ]
      }
    ]
  },
  {
    sku: '20201',
    images: [
      {
        filename: 'corante-liquido-xadrez-50ml.webp',
        urls: [
          'https://images.tcdn.com.br/img/img_prod/1206181/corante_liquido_xadrez_laranja_50ml_3441_1_9c7606846e66ff64b9673ac27d1d14f9.png',
          'https://amoedo.vtexassets.com/arquivos/ids/160427/Corante-Liquido-Xadrez-50ml-Amarelo-Sherwin-Williams.jpg?v=638207254398500000'
        ]
      },
      {
        filename: 'corante-liquido-xadrez-50ml-cores.webp',
        urls: [
          'https://down-br.img.susercontent.com/file/sg-11134201-824j4-meg1z7kswwefff'
        ]
      }
    ]
  },
  {
    sku: '20301',
    images: [
      {
        filename: 'espacador-nivelador-de-piso-cortag-50-pecas.webp',
        urls: [
          'https://cdn.awsli.com.br/2500x2500/2565/2565475/produto/340725217/1201051_embalagem_1-pb66mchxmb.jpg',
          'https://img.irroba.com.br/filters:fill(fff):quality(80)/colomart/catalog/espacador-nivelador-mm-cortag-50-pecas.jpg'
        ]
      },
      {
        filename: 'espacador-nivelador-de-piso-cortag-detalhe.webp',
        urls: [
          'https://img.irroba.com.br/filters:fill(fff):quality(80)/colomart/catalog/espacador-nivelador-mm-cortag-50-pecas.jpg'
        ]
      }
    ]
  },
  {
    sku: '100301',
    images: [
      {
        filename: 'cabo-flexivel-2-5mm-750v-100m-sil-azul.webp',
        urls: [
          'https://down-br.img.susercontent.com/file/br-11134207-7r98o-m7b9g7hillje6e',
          'https://eletroenergia.com.br/wp-content/uploads/2024/05/Cabo-Flex-750V-2.5mm-Sil-Azul-610x600.jpg'
        ]
      },
      {
        filename: 'cabo-flexivel-2-5mm-750v-100m-sil-azul-detalhe.webp',
        urls: [
          'https://eletroenergia.com.br/wp-content/uploads/2024/05/Cabo-Flex-750V-2.5mm-Sil-Azul-610x600.jpg'
        ]
      }
    ]
  },
  {
    sku: '1453',
    images: [
      {
        filename: 'prego-com-cabeca-gerdau-17x21-1kg.webp',
        urls: [
          'https://down-br.img.susercontent.com/file/sg-11134201-824hg-mf8e9e3fg6ix58',
          'https://anhangueraferramentas.fbitsstatic.net/img/p/prego-de-aco-polido-com-cabeca-17x21-1kg-24627-gerdau-125483/314924-3.jpg?w=620&h=620&v=no-value'
        ]
      },
      {
        filename: 'prego-com-cabeca-gerdau-17x21-1kg-detalhe.webp',
        urls: [
          'https://anhangueraferramentas.fbitsstatic.net/img/p/prego-de-aco-polido-com-cabeca-17x21-1kg-24627-gerdau-125483/314924-3.jpg?w=620&h=620&v=no-value',
          'https://down-br.img.susercontent.com/file/sg-11134201-7rbkg-m5egg9cczej26e'
        ]
      }
    ]
  },
  {
    sku: '86',
    images: [
      {
        filename: 'barra-de-ferro-ca50-5-16-12m-gerdau.webp',
        urls: [
          'https://images.tcdn.com.br/img/img_prod/770809/vergalhao_barra_de_ferro_ca_50_5_16_8_0mm_12_metros_31375_1_3dded26328a010302c2c9d0a3a538532_20211119132113.jpg',
          'https://images.tcdn.com.br/img/img_prod/1028926/ferro_5_16_ca50_b_12mt_arcelormittal_10681_1_48bd3aab513c99b70567d736881670ea.png'
        ]
      }
    ]
  },
  {
    sku: '92',
    images: [
      {
        filename: 'trelica-nervurada-de-aco-tr08-gerdau.webp',
        urls: [
          'https://babamateriais.vtexassets.com/arquivos/ids/335970-800-auto?v=638334829107870000&width=800&height=auto&aspect=true',
          'https://www.cinimetais.com.br/imagens/informacoes/trelica-nervurada-02.webp'
        ]
      }
    ]
  },
  {
    sku: '1534',
    images: [
      {
        filename: 'tijolo-baiano-ceramico-8-furos-9x19x19-vargem-grande.webp',
        urls: [
          'https://marketup-cdn.s3.amazonaws.com/files/490923/products/c61b04a7-cce3-45bf-ae8f-e0b63e097f95.jpeg',
          'http://www.ceramicalideral.com.br/wp-content/uploads/2017/05/9-19-19-600x600.jpg'
        ]
      }
    ]
  },
  {
    sku: '2152',
    images: [
      {
        filename: 'tijolinho-macico-maquinado-9x19x4-5.webp',
        urls: [
          'https://joli.vtexassets.com/arquivos/ids/658862-800-800?v=638459392468700000&width=800&height=800&aspect=true'
        ]
      }
    ]
  },
  {
    sku: '397',
    images: [
      {
        filename: 'areia-media-lavada-a-granel-metro-cubico.webp',
        urls: [
          'https://images.tcdn.com.br/img/img_prod/1184849/areia_media_lavada_5m3_371_1_2efe04d1e75a1f7a9cb187914b36b686.jpg',
          'https://depositomantovani.com.br/wp-content/uploads/2021/05/Preco-areia-lavada.jpg'
        ]
      }
    ]
  },
  {
    sku: '398',
    images: [
      {
        filename: 'areia-fina-lavada-ibiraci-a-granel-metro-cubico.webp',
        urls: [
          'https://images.tcdn.com.br/img/img_prod/1184849/areia_fina_lavada_1_2_m3_375_1_a1cbeecc138a32843153a9ccaf824046.jpg'
        ]
      }
    ]
  },
  {
    sku: '400',
    images: [
      {
        filename: 'pedra-brita-01-a-granel-metro-cubico.webp',
        urls: [
          'https://mineracaocosta.com.br/img/brita1.webp',
          'http://www.engenharia-construcao.cotanet.com.br/img/site/produtos/pedra-britada.jpg'
        ]
      }
    ]
  }
];

export { downloads };
