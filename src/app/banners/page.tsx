import React from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Smartphone,
  Monitor,
  CheckCircle,
  Code2,
  Zap,
  ArrowRight,
  FileImage,
  Layers,
  Palette,
} from 'lucide-react';
import { HomeBannerSlider } from '@/components/HomeBannerSlider';
import { BannerSlideContent } from '@/components/banners/BannerTemplates';
import { BANNERS_EXEMPLO, type BannerConfig } from '@/lib/banners';

export const metadata = {
  title: 'Catálogo de Modelos de Banner | Lopes e Lopes Franca',
  description: 'Visualização e aprovação dos novos modelos de banner gerados por código para a Lopes e Lopes.',
  robots: {
    index: false,
    follow: false,
  },
};

const MODEL_INFO: Record<
  string,
  {
    nome: string;
    categoria: string;
    descricao: string;
    vantagens: string[];
    snippet: string;
  }
> = {
  'exemplo-cimento': {
    nome: 'Produto Único em Destaque (Tema Azul)',
    categoria: 'Modelo: Produto',
    descricao: 'Ideal para produtos campeões de venda, ofertas da semana ou itens com preço competitivo.',
    vantagens: [
      'Preço em destaque gigante com legenda configurável',
      'Foto do produto nítida em recorte limpo',
      'Destaque de palavra em laranja com asteriscos (*50kg*)',
    ],
    snippet: `{
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
}`,
  },
  'exemplo-assentamento': {
    nome: 'Linha / Combo de Produtos (Tema Laranja)',
    categoria: 'Modelo: Produto Multi-Item',
    descricao: 'Perfeito para vender soluções completas: até 3 produtos juntos na mesma tela (ex: argamassa + cimento + aditivo).',
    vantagens: [
      'Exibe até 3 produtos em cartões brancos flutuantes no desktop',
      'No celular foca no produto principal para manter legibilidade total',
      'Paleta vibrante em laranja e azul da Lopes e Lopes',
    ],
    snippet: `{
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
}`,
  },
  'exemplo-tradicao': {
    nome: 'Institucional com Foto da Loja',
    categoria: 'Modelo: Institucional',
    descricao: 'Transmite autoridade, confiança e tempo de mercado usando a fachada real ou frota de caminhões da loja.',
    vantagens: [
      'Foto real de fundo com degradê azul profissional',
      'Até 3 diferenciais com ícones de verificação',
      'Sem textos borrados — renderização de fonte vetorial',
    ],
    snippet: `{
  tipo: 'institucional',
  id: 'institucional-35anos',
  tag: 'Tradição em Franca',
  titulo: '35 anos construindo *junto com você*',
  topicos: [
    'Entrega com frota própria',
    'Mais de 2 mil itens',
    'Atendimento de quem entende',
  ],
  cta: 'Conheça a loja',
  link: '/produtos',
  fundo: '/images/fachada-lopes.webp',
}`,
  },
  'exemplo-whatsapp': {
    nome: 'Orçamento Rápido pelo WhatsApp',
    categoria: 'Modelo: WhatsApp / Conversão',
    descricao: 'Focado em capturar clientes que preferem mandar a lista direto para o time de televendas pelo WhatsApp.',
    vantagens: [
      'Simulação de balão de conversa do WhatsApp realista',
      'Gera link direto para o WhatsApp já com texto pré-digitado',
      'Botão de ação destacado com ícone oficial do WhatsApp',
    ],
    snippet: `{
  tipo: 'whatsapp',
  id: 'banner-whatsapp',
  tag: 'Orçamento rápido',
  titulo: 'Mande sua lista no *WhatsApp*',
  subtitulo: 'A gente monta o orçamento e entrega na sua obra.',
  cta: 'Chamar no WhatsApp',
  mensagem: 'Olá, equipe Lopes e Lopes! Gostaria de enviar minha lista de materiais para orçamento.',
}`,
  },
  'exemplo-vedacit': {
    nome: 'Linha Especializada (Tema Escuro)',
    categoria: 'Modelo: Produto (Tema Escuro)',
    descricao: 'Visual sofisticado em tons grafite/ardósia, excelente para linhas técnicas de ferramentas ou químicos para construção.',
    vantagens: [
      'Contraste elegante com detalhes em laranja e texto brilhante',
      'Ideal para campanhas sazonais ou categorias premium',
      'Mesma facilidade de configuração dos outros modelos',
    ],
    snippet: `{
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
}`,
  },
};

export default function BannersPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-20">
      {/* Topo / Hero */}
      <header className="bg-lopes-blue-900 text-white border-b border-lopes-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lopes-orange text-white text-xs font-bold uppercase tracking-wider mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                Novo Sistema de Banners
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                Modelos de Banner por Código
              </h1>
              <p className="mt-2 text-blue-200 text-sm sm:text-base max-w-2xl">
                Crie banners promocionais profissionais em segundos direto pelo código — sem abrir o Canva,
                sem textos embaçados e com adaptação automática perfeita para celular e computador.
              </p>
            </div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm font-semibold transition-colors border border-white/20"
            >
              Voltar para a Home
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* Comparativo: Por que é melhor que o Canva */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center gap-2.5 text-red-600 font-bold mb-3">
              <span className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center text-sm">✕</span>
              Como era antes (Canva / PNG)
            </div>
            <ul className="space-y-2 text-sm text-slate-600">
              <li className="flex items-start gap-2">
                <span className="text-slate-400">•</span>
                <span>Demorado: precisa abrir o Canva, posicionar texto, alinhar e exportar 2 imagens (desktop e mobile).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-slate-400">•</span>
                <span>Qualidade: texto vira imagem rasterizada, ficando embaçado ou ilegível em telas de alta densidade.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-slate-400">•</span>
                <span>Zero SEO: Google não consegue ler os produtos e preços contidos na imagem.</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border-2 border-emerald-500/40 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-emerald-500 text-white text-[10px] font-black uppercase px-3 py-0.5 rounded-bl">
              Solução Nova
            </div>
            <div className="flex items-center gap-2.5 text-emerald-700 font-bold mb-3">
              <span className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-sm">✓</span>
              Novo Sistema (Modelos em Código)
            </div>
            <ul className="space-y-2 text-sm text-slate-700">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Instantâneo:</strong> basta digitar título, preço e link. Leva menos de 1 minuto para colocar uma oferta no ar.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Tipografia vetorial:</strong> textos sempre cristalinos, com container queries que escalam com precisão.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Compatível:</strong> ainda suporta artes do Canva quando você preferir uma imagem pronta!</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Demonstração do Carrossel ao Vivo */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-wider text-lopes-blue uppercase">
              Carrossel Interativo com os Modelos
            </h2>
            <div className="w-14 sm:w-16 h-1 bg-lopes-orange rounded-full mt-2" />
          </div>
          <span className="text-xs text-slate-500 hidden sm:inline">
            Troca a cada 5.5s ou use as setas / arraste
          </span>
        </div>

        <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-300">
          <HomeBannerSlider banners={BANNERS_EXEMPLO} />
        </div>
      </section>

      {/* Detalhamento dos Modelos */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="border-b border-slate-200 pb-4 mb-8">
          <h2 className="text-xl sm:text-2xl font-bold tracking-wider text-lopes-blue uppercase">
            Catálogo de Modelos Prontos
          </h2>
          <div className="w-14 sm:w-16 h-1 bg-lopes-orange rounded-full mt-2 mb-3" />
          <p className="text-slate-600 text-sm sm:text-base">
            Veja como cada modelo se comporta em tela de computador e tela de smartphone, com seu respectivo exemplo de configuração.
          </p>
        </div>

        <div className="space-y-16">
          {BANNERS_EXEMPLO.map((banner, index) => {
            const info = MODEL_INFO[banner.id];
            if (!info) return null;

            return (
              <article
                key={banner.id}
                className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200"
              >
                {/* Cabeçalho do Card */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4 mb-6">
                  <div>
                    <span className="text-xs font-extrabold uppercase tracking-wider text-lopes-orange bg-lopes-orange/10 px-2.5 py-1 rounded-md">
                      {info.categoria}
                    </span>
                    <h3 className="text-lg sm:text-2xl font-bold text-slate-900 mt-2">
                      {index + 1}. {info.nome}
                    </h3>
                  </div>
                  <span className="text-xs font-mono bg-slate-100 text-slate-600 px-3 py-1 rounded">
                    id: {banner.id}
                  </span>
                </div>

                <p className="text-slate-600 text-sm sm:text-base mb-6">
                  {info.descricao}
                </p>

                {/* Previews: Desktop e Mobile */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mb-8">
                  {/* Preview Desktop (8 colunas) */}
                  <div className="lg:col-span-8 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase">
                      <Monitor className="w-4 h-4 text-lopes-blue-700" />
                      Visualização no Computador (Desktop)
                    </div>
                    <div className="rounded-xl overflow-hidden shadow-md border border-slate-200 bg-slate-900">
                      <div className="relative w-full aspect-[16/4.8]">
                        <BannerSlideContent banner={banner} variant="desktop" />
                      </div>
                    </div>
                  </div>

                  {/* Preview Mobile (4 colunas com moldura de celular) */}
                  <div className="lg:col-span-4 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase">
                      <Smartphone className="w-4 h-4 text-emerald-600" />
                      Visualização no Celular (Mobile)
                    </div>
                    <div className="max-w-[340px] mx-auto bg-slate-900 p-2.5 rounded-[2rem] shadow-xl border-4 border-slate-800">
                      <div className="rounded-[1.4rem] overflow-hidden bg-slate-900">
                        <div className="relative w-full aspect-[4/5]">
                          <BannerSlideContent banner={banner} variant="mobile" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Destaques e Código */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
                      <Palette className="w-3.5 h-3.5" />
                      Destaques do Modelo
                    </h4>
                    <ul className="space-y-2 text-sm text-slate-600">
                      {info.vantagens.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
                      <Code2 className="w-3.5 h-3.5" />
                      Código de Configuração
                    </h4>
                    <pre className="bg-slate-900 text-slate-100 p-4 rounded-xl text-xs font-mono overflow-x-auto max-h-56 leading-relaxed">
                      <code>{info.snippet}</code>
                    </pre>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Modelo 5: Banners de Imagem (Canva / PNG) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <article className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4 mb-4">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-purple-600 bg-purple-50 px-2.5 py-1 rounded-md">
                Modelo: Imagem Pronta
              </span>
              <h3 className="text-xl sm:text-2xl font-bold tracking-wider text-lopes-blue uppercase mt-2">
                6. Banners Feitos no Canva / Photoshop (tipo: 'imagem')
              </h3>
              <div className="w-14 sm:w-16 h-1 bg-lopes-orange rounded-full mt-2 mb-3" />
            </div>
            <FileImage className="w-6 h-6 text-purple-600" />
          </div>

          <p className="text-slate-600 text-sm sm:text-base mb-6">
            Você não perde a flexibilidade de usar artes prontas. Sempre que tiver uma campanha especial com arte feita por designer ou no Canva, basta cadastrá-la com <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono font-bold text-purple-700">tipo: &apos;imagem&apos;</code>.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Medidas recomendadas para imagens
              </h4>
              <ul className="text-xs text-slate-600 space-y-1.5">
                <li>• <strong>Desktop:</strong> 1600 × 480 px (proporção 16:4.8) em WebP ou PNG</li>
                <li>• <strong>Mobile:</strong> 800 × 260 px (proporção 16:5.2) em WebP ou PNG</li>
                <li>• Salvar na pasta <code className="bg-white px-1 py-0.5 rounded font-mono">public/images/banners/</code></li>
              </ul>
            </div>

            <pre className="bg-slate-900 text-slate-100 p-4 rounded-xl text-xs font-mono overflow-x-auto leading-relaxed">
              <code>{`{
  tipo: 'imagem',
  id: 'campanha-canva',
  desktop: '/images/banners/meu-banner-desktop.webp',
  mobile: '/images/banners/meu-banner-mobile.webp',
  alt: 'Descrição do banner para acessibilidade',
  link: '/produtos',
}`}</code>
            </pre>
          </div>
        </article>
      </section>

      {/* Guia de Como Usar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="bg-gradient-to-br from-lopes-blue-900 to-lopes-blue-800 text-white rounded-2xl p-8 sm:p-10 shadow-lg">
          <div className="max-w-3xl">
            <h2 className="text-xl sm:text-2xl font-bold tracking-wider text-white uppercase">
              Como colocar um banner novo no ar?
            </h2>
            <div className="w-14 sm:w-16 h-1 bg-lopes-orange rounded-full mt-2 mb-3" />
            <p className="mt-2 text-blue-100 text-sm sm:text-base">
              Todo o controle dos banners da Home fica centralizado em um único arquivo:
            </p>

            <ol className="mt-6 space-y-4 text-sm sm:text-base text-blue-100">
              <li className="flex items-start gap-3">
                <span className="w-7 h-7 rounded-full bg-lopes-orange text-white flex items-center justify-center font-bold text-sm shrink-0">
                  1
                </span>
                <div>
                  <strong className="text-white">Abra o arquivo:</strong>{' '}
                  <code className="bg-white/10 px-2 py-0.5 rounded text-white text-xs font-mono">
                    src/lib/banners.ts
                  </code>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-7 h-7 rounded-full bg-lopes-orange text-white flex items-center justify-center font-bold text-sm shrink-0">
                  2
                </span>
                <div>
                  <strong className="text-white">Adicione ou substitua na lista <code className="bg-white/10 px-1 py-0.5 rounded font-mono text-xs">HOME_BANNERS</code>:</strong>{' '}
                  copie qualquer um dos blocos acima, troque o título, o preço e a foto.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-7 h-7 rounded-full bg-lopes-orange text-white flex items-center justify-center font-bold text-sm shrink-0">
                  3
                </span>
                <div>
                  <strong className="text-white">Pronto!</strong> Não precisa mexer em CSS, nem redimensionar fotos, nem recortar medidas no Canva. O site cuida da responsividade e diagramação sozinho.
                </div>
              </li>
            </ol>
          </div>
        </div>
      </section>
    </div>
  );
}

