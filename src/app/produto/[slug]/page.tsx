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
  ArrowLeft 
} from 'lucide-react';
import { getProductBySlug, getRelatedProducts, getAllProducts } from '@/lib/db';
import { formatCurrency } from '@/lib/whatsapp';
import { STORE_CONFIG, GOOGLE_MAPS_URL } from '@/lib/store-config';
import { ProductCard } from '@/components/ProductCard';
import { ProductGallery } from '@/components/ProductGallery';
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

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />

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
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-lopes-blue bg-lopes-blue-50 px-2.5 py-0.5 rounded">
                Marca: {product.brand}
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs text-slate-500 font-mono">
                SKU / Código: <strong>{product.sku}</strong>
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
              {product.name}
            </h1>

            <p className="text-sm text-slate-600 leading-relaxed pt-1">
              {product.description}
            </p>
          </div>

          {/* Bloco de Preço */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-900">
                {product.price !== null ? formatCurrency(product.price) : 'Sob Consulta'}
              </span>
              <span className="text-sm font-medium text-slate-500">/ {product.unit}</span>
            </div>
          </div>

          {/* Componente Interativo de Ações WhatsApp e Cotação */}
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

      {/* Ficha Técnica & Aplicações */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-8">
        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-200">
            Especificações Técnicas
          </h2>
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

        {/* Onde Utilizar / Aplicações */}
        {product.applications && product.applications.length > 0 && (
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-3">
              Indicações e Aplicações Recomendadas
            </h3>
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

      {/* Produtos Relacionados / Compre Junto */}
      {relatedProducts.length > 0 && (
        <section className="space-y-4 pt-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-900">
              Geralmente Levado Junto
            </h3>
            <span className="text-xs text-slate-500">Materiais complementares</span>
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
