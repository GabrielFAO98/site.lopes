/**
 * Configuração dos banners do carrossel da Home.
 *
 * Existem dois tipos de banner:
 *  1. 'imagem'  -> arte pronta (ex.: feita no Canva), desktop 1600x480.
 *  2. Modelos em código ('produto', 'institucional', 'whatsapp') -> o site monta o
 *     banner sozinho a partir dos textos e imagens abaixo, já adaptado para celular.
 *
 * Dica: no título, coloque uma palavra entre *asteriscos* para destacá-la em laranja.
 *   Ex.: 'Cimento Itaú *50kg*'
 */

import { STORE_CONFIG } from '@/lib/store-config';

export type TemaBanner = 'azul' | 'laranja' | 'escuro';

interface BannerBase {
  id: string;
  /** Texto alternativo / descrição (acessibilidade e SEO) */
  alt: string;
}

export interface BannerImagem extends BannerBase {
  tipo: 'imagem';
  desktop: string;
  mobile?: string;
  link: string;
}

export interface BannerProduto extends BannerBase {
  tipo: 'produto';
  tag?: string;
  titulo: string;
  subtitulo?: string;
  /** Ex.: 'R$ 34,90' */
  preco?: string;
  /** Ex.: 'a partir de' ou 'o saco' */
  precoLegenda?: string;
  cta: string;
  link: string;
  /** De 1 a 3 fotos de produto (fundo branco) */
  imagens: string[];
  tema?: TemaBanner;
}

export interface BannerInstitucional extends BannerBase {
  tipo: 'institucional';
  tag?: string;
  titulo: string;
  subtitulo?: string;
  /** Até 3 tópicos curtos */
  topicos?: string[];
  cta: string;
  link: string;
  /** Foto de fundo (ex.: fachada da loja) */
  fundo: string;
}

export interface BannerWhatsApp extends BannerBase {
  tipo: 'whatsapp';
  tag?: string;
  titulo: string;
  subtitulo?: string;
  cta: string;
  /** Mensagem que já vem escrita quando o cliente abre o WhatsApp */
  mensagem: string;
}

export type BannerConfig = BannerImagem | BannerProduto | BannerInstitucional | BannerWhatsApp;

/** Link final do banner (banners de WhatsApp montam o link com o número da loja). */
export function getBannerLink(banner: BannerConfig): string {
  if (banner.tipo === 'whatsapp') {
    return `https://wa.me/${STORE_CONFIG.whatsapp}?text=${encodeURIComponent(banner.mensagem)}`;
  }
  return banner.link;
}

/* -------------------------------------------------------------------------- */
/* Banners atualmente exibidos na Home                                        */
/* -------------------------------------------------------------------------- */

export const HOME_BANNERS: BannerConfig[] = [
  {
    tipo: 'institucional',
    id: 'institucional-tradicao',
    tag: 'Tradição em Franca',
    titulo: '35 anos construindo *junto com você*',
    topicos: ['Entrega com frota própria', 'Mais de 2 mil itens', 'Atendimento de quem entende'],
    cta: 'Conheça a loja',
    link: '/produtos',
    fundo: '/images/fachada-lopes.webp',
    alt: 'Lopes e Lopes Materiais para Construção - 35 anos de tradição em Franca',
  },
  {
    tipo: 'produto',
    id: 'oferta-cimento',
    tema: 'azul',
    tag: 'Pronta entrega',
    titulo: 'Cimento Itaú *50kg*',
    subtitulo: 'Para todas as obras. Entregamos em Franca e região.',
    preco: 'R$ 34,90',
    precoLegenda: 'o saco',
    cta: 'Ver produto',
    link: '/produto/cimento-itau-todas-as-obras-50kg-votoran',
    imagens: ['/images/produtos/cimento-itau-todas-as-obras-50kg-votoran.webp'],
    alt: 'Cimento Itaú Todas as Obras 50kg por R$ 34,90 - Lopes e Lopes Franca',
  },
  {
    tipo: 'produto',
    id: 'combo-assentamento',
    tema: 'laranja',
    tag: 'Assentamento',
    titulo: 'Tudo para *assentar* seu piso',
    subtitulo: 'Argamassa, chapisco e cimento das melhores marcas.',
    cta: 'Ver materiais',
    link: '/produtos?depto=construcao-basica',
    imagens: [
      '/images/produtos/argamassa-aciii-alta-performance-cinza-20kg-votomassa-2.webp',
      '/images/produtos/resina-adesiva-chapisco-bianco-vedacit.webp',
      '/images/produtos/cimento-itau-todas-as-obras-50kg-votoran.webp',
    ],
    alt: 'Argamassa Votomassa, Bianco Vedacit e Cimento Itaú - Lopes e Lopes Franca',
  },
  {
    tipo: 'whatsapp',
    id: 'orcamento-whatsapp',
    tag: 'Orçamento rápido',
    titulo: 'Mande sua lista no *WhatsApp*',
    subtitulo: 'A gente monta o orçamento e entrega na sua obra.',
    cta: 'Chamar no WhatsApp',
    mensagem: 'Olá, equipe Lopes e Lopes! Gostaria de enviar minha lista de materiais para orçamento.',
    alt: 'Mande sua lista de materiais no WhatsApp da Lopes e Lopes',
  },
  {
    tipo: 'produto',
    id: 'linha-vedacit',
    tema: 'escuro',
    tag: 'Impermeabilização',
    titulo: 'Linha completa *Vedacit*',
    subtitulo: 'Proteja sua obra contra umidade e infiltrações com quem entende.',
    preco: 'A partir de R$ 42,90',
    cta: 'Ver produtos',
    link: '/produtos?depto=construcao-basica',
    imagens: ['/images/produtos/resina-adesiva-chapisco-bianco-vedacit.webp'],
    alt: 'Resina Adesiva Bianco Vedacit - Lopes e Lopes Franca',
  },
];

/* -------------------------------------------------------------------------- */
/* Exemplos dos modelos em código (página /banners para aprovação)            */
/* -------------------------------------------------------------------------- */

export const BANNERS_EXEMPLO: BannerConfig[] = [
  {
    tipo: 'institucional',
    id: 'exemplo-tradicao',
    tag: 'Tradição em Franca',
    titulo: '35 anos construindo *junto com você*',
    topicos: ['Entrega com frota própria', 'Mais de 2 mil itens', 'Atendimento de quem entende'],
    cta: 'Conheça a loja',
    link: '/produtos',
    fundo: '/images/fachada-lopes.webp',
    alt: 'Lopes e Lopes Materiais para Construção - 35 anos de tradição em Franca',
  },
  {
    tipo: 'produto',
    id: 'exemplo-cimento',
    tema: 'azul',
    tag: 'Pronta entrega',
    titulo: 'Cimento Itaú *50kg*',
    subtitulo: 'Para todas as obras. Entregamos em Franca e região.',
    preco: 'R$ 34,90',
    precoLegenda: 'o saco',
    cta: 'Ver produto',
    link: '/produto/cimento-itau-todas-as-obras-50kg-votoran',
    imagens: ['/images/produtos/cimento-itau-todas-as-obras-50kg-votoran.webp'],
    alt: 'Cimento Itaú Todas as Obras 50kg por R$ 34,90 - Lopes e Lopes Franca',
  },
  {
    tipo: 'produto',
    id: 'exemplo-assentamento',
    tema: 'laranja',
    tag: 'Assentamento',
    titulo: 'Tudo para *assentar* seu piso',
    subtitulo: 'Argamassa, chapisco e cimento das melhores marcas.',
    cta: 'Ver materiais',
    link: '/produtos?depto=construcao-basica',
    imagens: [
      '/images/produtos/argamassa-aciii-alta-performance-cinza-20kg-votomassa-2.webp',
      '/images/produtos/resina-adesiva-chapisco-bianco-vedacit.webp',
      '/images/produtos/cimento-itau-todas-as-obras-50kg-votoran.webp',
    ],
    alt: 'Argamassa Votomassa, Bianco Vedacit e Cimento Itaú - Lopes e Lopes Franca',
  },
  {
    tipo: 'whatsapp',
    id: 'exemplo-whatsapp',
    tag: 'Orçamento rápido',
    titulo: 'Mande sua lista no *WhatsApp*',
    subtitulo: 'A gente monta o orçamento e entrega na sua obra.',
    cta: 'Chamar no WhatsApp',
    mensagem: 'Olá, equipe Lopes e Lopes! Gostaria de enviar minha lista de materiais para orçamento.',
    alt: 'Mande sua lista de materiais no WhatsApp da Lopes e Lopes',
  },
  {
    tipo: 'produto',
    id: 'exemplo-vedacit',
    tema: 'escuro',
    tag: 'Impermeabilização',
    titulo: 'Linha completa *Vedacit*',
    subtitulo: 'Proteja sua obra contra umidade e infiltrações com quem entende.',
    preco: 'A partir de R$ 42,90',
    cta: 'Ver produtos',
    link: '/produtos?depto=construcao-basica',
    imagens: ['/images/produtos/resina-adesiva-chapisco-bianco-vedacit.webp'],
    alt: 'Resina Adesiva Bianco Vedacit - Lopes e Lopes Franca',
  },
];
