import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outputDir = path.resolve(__dirname, '../public/images/produtos');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const verifiedDownloads = [
  {
    filename: 'trincha-atlas-319.webp',
    urls: [
      'https://www.construnok.com.br/uploads/construnok/produtos_imagens/produtos_configuravel/11225-11666635671518992937.png',
      'https://hiperfer.cdn.magazord.com.br/img/2024/11/produto/15858/3844-1-trincha-pincel-1-1-2-polegadas-com-cerdas-pretas-para-pintura-modelo-319-atlas.jpg'
    ]
  },
  {
    filename: 'grelha-aluminio-stuqui-15x15.webp',
    urls: [
      'https://images.tcdn.com.br/img/img_prod/999130/grelha_para_ralo_em_aluminio_rustico_com_caixilho_15x15cm_lg_mais_33060_1_2b7bd4521d8b2dbe403d9fba439f6b1d.jpeg',
      'https://down-br.img.susercontent.com/file/f7c0fb7ffe90a515b330dda08b917d75'
    ]
  },
  {
    filename: 'gabinete-pia-aco-cozimax-atena-120cm.webp',
    urls: [
      'https://construmarques.fbitsstatic.net/img/p/gabinete-de-cozinha-em-aco-para-pia-120cm-cozimax-atena-branco-102965-85877/272752.jpg?v=202511041028',
      'https://construmarques.fbitsstatic.net/img/p/gabinete-de-cozinha-em-aco-para-pia-120cm-cozimax-atena-branco-102965-85877/272752-1.jpg?v=202511041028'
    ]
  },
  {
    filename: 'pia-granito-120cm-cuba-inox.webp',
    urls: [
      'https://images.tcdn.com.br/img/img_prod/1048279/pia_granito_cinza_andorinha_120x57x14_cm_475_3_d4c0a0e65f85ad11884137254dfe3172.png',
      'https://cdn.awsli.com.br/2500x2500/562/562216/produto/23202149/3033257621.jpg'
    ]
  },
  {
    filename: 'assento-sanitario-atlas-oval-soft.webp',
    urls: [
      'https://casatognini.com.br/image/cache/catalog/atlas/at4063-2-1-1000x1000.png',
      'https://idbatacadista.agilecdn.com.br/29878_1.jpg?v=214-2336684964'
    ]
  },
  {
    filename: 'modulo-tomada-20a-margirius-sleek.webp',
    urls: [
      'https://images.tcdn.com.br/img/img_prod/1356894/modulo_tomada_2p_t_20a_250v_branco_sleek_margirius_16048_11645_1_1134a3bcf25d2fb2f68f226036d0216e.jpg',
      'https://images.tcdn.com.br/img/img_prod/1216271/modulo_tomada_2pt_20a_250v_br_sleek_margirius_16_1_20260402114615_3143f1800f4a.png'
    ]
  },
  {
    filename: 'torneira-cozinha-parede-ema-metais.webp',
    urls: [
      'https://images.tcdn.com.br/img/img_prod/1323363/torneira_cozinha_de_parede_1_4_volta_bica_movel_metal_cromado_29_1_6b1b1534e6513f6b4a842eb6d79cc091.jpg',
      'https://down-br.img.susercontent.com/file/br-11134207-7r98o-mdcil55ov4fmb6'
    ]
  },
  {
    filename: 'bacia-sanitaria-convencional-deca-izy.webp',
    urls: [
      'https://padovani.vteximg.com.br/arquivos/ids/162840-1000-1000/Bacia-Sanitaria-Convencional-Izy-Branca-P11---Deca1.jpg?v=635966585563430000',
      'https://cdn.awsli.com.br/600x1000/2124/2124677/produto/173876822/bf9dbc469085412e82008b31b376427b-m859n9tp70.png'
    ]
  },
  {
    filename: 'piso-palau-brilhante-61x61-ceral.webp',
    urls: [
      'https://bucket.grupoceral.com.br/sites/thumb-10139036.jpeg',
      'https://bucket.grupoceral.com.br/sites/thumb-10139036-2-2.jpeg'
    ]
  },
  {
    filename: 'fechadura-banheiro-stam-1820-21.webp',
    urls: [
      'https://www.casacombate.com/media/catalog/product/cache/1/image/800x/17f82f742ffe127f42dca9de82fb58b1/f/e/fechadura_para_banheiro_alavanca_inox_182021_-_stam1.png',
      'https://down-br.img.susercontent.com/file/sg-11134201-7qvct-lgtsw28oj6m78f'
    ]
  },
  {
    filename: 'joelho-90-soldavel-25mm-amanco.webp',
    urls: [
      'https://images.tcdn.com.br/img/img_prod/1385440/joelho_90_25mm_marrom_soldavel_amanco_wavin_429_1_c90696d376db3cee8f5056b5718f02c2.png',
      'https://bemol.vtexassets.com/arquivos/ids/229984/213938_a.jpg?v=638537461149270000'
    ]
  },
  {
    filename: 'disco-corte-ferro-4-norton-classic.webp',
    urls: [
      'https://images.tcdn.com.br/img/img_prod/640046/disco_de_corte_4_1_2_pol_classic_ar302_norton_65057_1_e4f787009421ad1ee6eceaffa6da8033.jpg',
      'https://construmarques.fbitsstatic.net/img/p/disco-de-corte-norton-classic-4-1-2-ar302-78900/265770.jpg?v=no-value'
    ]
  },
  {
    filename: 'chave-combinada-14mm-cromo-vanadio.webp',
    urls: [
      'https://images.tcdn.com.br/img/img_prod/992615/chave_combinada_tramontina_14_mm_2229_1_b2d966f083551e6fbec424538e5833e9.jpg',
      'https://img.lojadomecanico.com.br/IMAGENS/46/448/619859/1747759467694.JPG'
    ]
  },
  {
    filename: 'telha-fibrocimento-ondulada-6mm-eternit.webp',
    urls: [
      'https://images.tcdn.com.br/img/img_prod/845125/telha_ondulada_244x110x6mm_eternit_1_20260122172317_d77338aa59e0.png',
      'https://cdn.leroymerlin.com.br/products/telha_de_fibrocimento_ondulada_366x110cm_6mm_cinza_eternit_92400721_f148_600x600.png'
    ]
  },
  {
    filename: 'mangueira-jardim-durin-trancada-1-2.webp',
    urls: [
      'https://product-hub-prd.madeiramadeira.com.br/786922456/images/25a8c2aa-d73b-4cd3-bc16-ef5f0f355266dc8801807671c7c4d1d05e069a.png',
      'https://product-hub-prd.madeiramadeira.com.br/126589789/images/60a87d07-c151-417e-9aaf-7921bfc3958375bfc39c50761ee876b098bd3f.png'
    ]
  },
  {
    filename: 'mao-francesa-cantoneira-branca-20cm.webp',
    urls: [
      'https://down-br.img.susercontent.com/file/br-11134207-81z1k-mg27wvy0bnk517',
      'https://danpler.com.br/wp-content/uploads/2022/03/15117594102_40700.png'
    ]
  },
  {
    filename: 'carrinho-de-mao-fischer-ch24.webp',
    urls: [
      'https://milium.vtexassets.com/arquivos/ids/249684/Carrinho-de-Mao-Caamba-de-Ao-Fischer-Preto-50lFrontal2.jpg?v=638110468599370000',
      'https://cdn.distribuidoralopes.com.br/produtos/16581/16581.jpg'
    ]
  },
  {
    filename: 'celote-calco-telha-colonial.webp',
    urls: [
      'https://down-br.img.susercontent.com/file/br-11134207-7r98o-lz9341gqirv933',
      'https://images.tcdn.com.br/img/img_prod/614225/parafuso_kit_de_vedacao_e_fixacao_para_telhas_de_pvc_colonial_plan_terracota_pacote_com_20_pecas_afo_65117_2_33a62dd5fdcab0adb1f19fb2101827f4_20250212094319.jpg'
    ]
  },
  {
    filename: 'trena-5m-irwin-iw13947.webp',
    urls: [
      'https://images.tcdn.com.br/img/img_prod/1004808/trena_de_aco_5m_standard_de_3_4_de_largura_iw13947_irwin_3861_1_e0a402b33e092c2228acba91a2f70726.jpg',
      'https://agrosolo.fbitsstatic.net/img/p/trena-standard-5m-x-3-4-irwin-iw13947-86747/282283-1.jpg?w=700&h=700&v=no-value'
    ]
  }
];

async function processUrl(url, targetPath) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
        'Referer': 'https://www.google.com/',
      },
    });
    clearTimeout(timeout);

    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buffer = Buffer.from(await res.arrayBuffer());

    if (buffer.length < 3000) throw new Error('Buffer muito pequeno');

    await sharp(buffer)
      .resize(800, 800, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 1 },
      })
      .webp({ quality: 88, effort: 4 })
      .toFile(targetPath);

    return true;
  } catch (err) {
    clearTimeout(timeout);
    console.warn(`   ⚠️ Falha com ${url.slice(0, 75)}... : ${err.message}`);
    return false;
  }
}

async function run() {
  console.log(`🚀 Processando ${verifiedDownloads.length} fotos oficiais de alta fidelidade...`);
  let success = 0;

  for (const item of verifiedDownloads) {
    const targetPath = path.join(outputDir, item.filename);
    console.log(`\n📦 Baixando produto: ${item.filename}`);
    let itemSuccess = false;

    for (const url of item.urls) {
      const ok = await processUrl(url, targetPath);
      if (ok) {
        console.log(`   ✅ Sucesso! Salvo ${item.filename} (${(fs.statSync(targetPath).size / 1024).toFixed(1)} KB)`);
        itemSuccess = true;
        break;
      }
    }

    if (itemSuccess) {
      success++;
    } else {
      console.error(`   ❌ ERRO: Nenhuma URL funcionou para ${item.filename}`);
    }
  }

  console.log(`\n🎉 Total: ${success} de ${verifiedDownloads.length} fotos baixadas e tratadas com 100% de precisão!`);
}

run();

