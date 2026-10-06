'use client';

import React, { useRef } from 'react';
import { Product } from '@/types';
import { ProductCard } from './ProductCard';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

interface ProductCarouselProps {
  products: Product[];
  title?: string;
  subtitle?: string;
}

export function ProductCarousel({
  products,
  title = 'Novidades',
  subtitle = 'Lançamentos e novos itens adicionados ao catálogo',
}: ProductCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const scrollAmount = container.clientWidth * 0.85;

    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  if (!products || products.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4">
      {/* Cabeçalho da Seção com Botões de Navegação */}
      <div className="flex items-end justify-between mb-6">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-lopes-orange mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Recém-Chegados</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              {subtitle}
            </p>
          )}
        </div>

        {/* Botões do Carrossel */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => scroll('left')}
            className="w-9 h-9 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 flex items-center justify-center shadow-xs transition-colors"
            aria-label="Rolar para a esquerda"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="w-9 h-9 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 flex items-center justify-center shadow-xs transition-colors"
            aria-label="Rolar para a direita"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Trilho Deslizante (Carrossel com 2 produtos por tela no mobile) */}
      <div
        ref={scrollContainerRef}
        className="flex gap-3 sm:gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 pt-1 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-none"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="w-[calc(50%-6px)] sm:w-[calc(33.333%-16px)] lg:w-[calc(25%-18px)] shrink-0 snap-start flex flex-col"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {/* Link para catálogo completo */}
      <div className="text-center mt-4 sm:mt-6">
        <Link
          href="/produtos"
          className="text-xs sm:text-sm font-semibold text-lopes-blue hover:text-lopes-blue-700 hover:underline"
        >
          Ver todos os {products.length > 8 ? products.length : 'produtos'} do catálogo →
        </Link>
      </div>
    </section>
  );
}
