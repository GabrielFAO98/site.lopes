import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  ShieldCheck, 
  Truck, 
  MapPin, 
  CheckCircle2, 
  HelpCircle, 
  Phone, 
  ArrowLeft,
  Lightbulb
} from 'lucide-react';
import { getProductBySlug, getRelatedProducts, getAllProducts } from '@/lib/db';
import { formatCurrency } from '@/lib/whatsapp';
import { STORE_CONFIG, GOOGLE_MAPS_URL } from '@/lib/store-config';
import { ProductCard } from '@/components/ProductCard';
import { ProductGallery } from '@/components/ProductGallery';
import { ProductShareButton } from '@/components/ProductShareButton';
import { ProductFaq } from '@/components/ProductFaq';
import { ProductActions } from './ProductActions';

// Permite gerar páginas para produtos novos criados no Supabase e atualiza dados a cada 60s
export const dynamicParams = true;
export const revalidate = 60;

interface ProductPageProps {
  params: {
    slug: string;
  };
}

/**
 * Geração de Parâmetros Estáticos para SSG
 */
export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((product) => ({
    slug: product.slug,
  }));
}

/**
 * Geração Dinâmica de Metadados e OpenGraph para SEO e Compartilhamento no WhatsApp
 */
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);
  if (!product) {
    return {
      title: 'Produto Não Encontrado',
    };
  }

  const priceText = product.price ? `por ${formatCurrency(product.price)}` : 'sob consulta';

  return {
    title: `${product.name} | Lopes e Lopes Franca - SP`,
    description: `Compre ${product.name} (${product.brand}) ${priceText} na Lopes e Lopes Materiais para Construção em Franca-SP. Pronta entrega e atendimento no WhatsApp!`,
    openGraph: {
      title: `${product.name} - Pronta Entrega em Franca`,
      description: `Código: ${product.sku} | ${product.brand} | ${product.description.slice(0, 140)}...`,
      images: product.images.length > 0 ? [{ url: product.images[0] }] : ['/images/logo.png'],
      url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/produto/${product.slug}`,
    },
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(product);

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.images,
    description: product.description,
    sku: product.sku,
    brand: {
      '@type': 'Brand',
      name: product.brand,
    },
    offers: {
      '@type': 'Offer',
      price: product.price ?? 0,
      priceCurrency: 'BRL',
      availability: product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'HardwareStore',
        name: STORE_CONFIG.name,
      },
    },
  };

  const faqJsonLd = (product.faq && product.faq.length > 0) ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: product.faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  } : null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      {/* Breadcrumb de Navegação */}
      <nav className="text-xs text-slate-500 flex items-center gap-1.5 flex-wrap">
        <Link href="/" className="hover:text-lopes-blue">Início</Link>
        <span>/</span>
        <Link href="/produtos" className="hover:text-lopes-blue">Catálogo</Link>
        <span>/</span>
        <Link href={`/produtos?depto=${product.departmentId}`} className="hover:text-lopes-blue">
          {product.departmentName}
        </Link>
        <span>/</span>
        <span className="text-slate-800 font-semibold truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Seção Principal do Produto */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Coluna da Galeria de Imagens e Vídeo */}
        <div className="lg:col-span-6 bg-white p-5 rounded-2xl border border-slate-200">
          <ProductGallery
            images={product.images}
            name={product.name}
          />
        </div>

        {/* Coluna de Informações e Ações de Compra */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold uppercase tracking-wider text-lopes-blue bg-lopes-blue-50 px-2.5 py-0.5 rounded">
                  Marca: {product.brand}
                </span>
                <span className="text-xs text-slate-400">•</span>
                <span className="text-xs text-slate-500 font-mono">
                  SKU / Código: <strong>{product.sku}</strong>
                </span>
              </div>

              {/* Botão de compartilhar discreto sem texto */}
              <ProductShareButton title={product.name} />
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 leading-snug">
              {product.name}
            </h1>

            <p className="text-sm text-slate-600 leading-relaxed pt-1">
              {product.description}
            </p>
          </div>

          {/* Componente Interativo de Preço, Variações, Ações WhatsApp e Cotação */}
          <ProductActions product={product} />

          {/* Box de Confiança Local (Franca - SP) */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-lopes-orange-500 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-slate-800">Retirada Imediata no Balcão</strong>
                <span className="text-slate-500">{STORE_CONFIG.address}, {STORE_CONFIG.neighborhood}</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Truck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-slate-800">Entrega Rápida em Franca</strong>
                <span className="text-slate-500">Consulte condições para seu bairro no WhatsApp</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Descrição Detalhada do Produto (SEO e Conteúdo Aprofundado) */}
      {product.detailedDescription && (
        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-wider text-lopes-blue uppercase">
              Descrição Detalhada do Produto
            </h2>
            <div className="w-14 sm:w-16 h-1 bg-lopes-orange rounded-full mt-2 mb-4" />
          </div>

          <div className="text-slate-700 leading-relaxed text-sm sm:text-base space-y-4 pt-1">
            {product.detailedDescription.split('\n\n').map((paragraph, idx) => (
              <p key={idx} className="text-slate-700 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </section>
      )}

      {/* Ficha Técnica, Dicas de Rendimento & Aplicações */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-8">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-wider text-lopes-blue uppercase">
            Especificações Técnicas
          </h2>
          <div className="w-14 sm:w-16 h-1 bg-lopes-orange rounded-full mt-2 mb-5" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
            {Object.entries(product.technicalSpecs).map(([key, value]) => (
              <div
                key={key}
                className="flex justify-between items-center py-2 px-3 bg-slate-50 rounded-lg text-xs"
              >
                <span className="font-semibold text-slate-600">{key}:</span>
                <span className="text-slate-900 font-medium text-right">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Dicas de Rendimento e Aplicação (dentro da área de especificações técnicas) */}
        {product.yieldInfo && (
          <div className="pt-6 border-t border-slate-100">
            <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-4 sm:p-5 flex items-start gap-3.5">
              <div className="p-2 bg-amber-100/90 rounded-lg text-amber-800 shrink-0 mt-0.5">
                <Lightbulb className="w-5 h-5 text-amber-700" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-amber-950 uppercase tracking-wide">
                  Dicas de Rendimento e Aplicação
                </h3>
                <p className="text-xs sm:text-sm text-amber-900/90 leading-relaxed">
                  {product.yieldInfo}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Onde Utilizar / Aplicações */}
        {product.applications && product.applications.length > 0 && (
          <div className="pt-6 border-t border-slate-100">
            <h3 className="text-lg sm:text-xl font-bold tracking-wider text-lopes-blue uppercase">
              Indicações e Aplicações Recomendadas
            </h3>
            <div className="w-14 sm:w-16 h-1 bg-lopes-orange rounded-full mt-2 mb-4" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {product.applications.map((app, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>{app}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Perguntas Frequentes (FAQ) */}
      {product.faq && product.faq.length > 0 && (
        <ProductFaq items={product.faq} productName={product.name} />
      )}

      {/* Produtos Relacionados / Compre Junto */}
      {relatedProducts.length > 0 && (
        <section className="space-y-4 pt-6">
          <div className="flex items-end justify-between">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold tracking-wider text-lopes-blue uppercase">
                Itens Relacionados
              </h3>
              <div className="w-14 sm:w-16 h-1 bg-lopes-orange rounded-full mt-2" />
            </div>
            <span className="text-xs text-slate-500 pb-1 hidden sm:inline">Materiais complementares</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {relatedProducts.map((relProduct) => (
              <ProductCard key={relProduct.id} product={relProduct} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
