'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Product } from '@/types';
import { ProductCard } from './ProductCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductCarouselProps {
  products: Product[];
  title: string;
  viewAllHref?: string;
}

export function ProductCarousel({
  products,
  title,
}: ProductCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [products]);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    // Rola aproximadamente 80% da largura visível
    const scrollAmount = container.clientWidth * 0.75;

    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  if (!products || products.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 relative">
      {/* Cabeçalho Limpo da Seção */}
      <div className="flex items-end justify-between mb-4 sm:mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-wider text-lopes-blue uppercase">
            {title}
          </h2>
          <div className="w-14 sm:w-16 h-1 bg-lopes-orange rounded-full mt-2" />
        </div>

        {/* Botões Superiores de Navegação */}
        <div className="hidden sm:flex items-center gap-1.5">
          <button
            onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className={`w-8 h-8 rounded-full border border-slate-200 bg-white flex items-center justify-center transition-all ${
                canScrollLeft
                  ? 'hover:bg-slate-50 text-slate-800 shadow-xs cursor-pointer'
                  : 'text-slate-300 opacity-50 cursor-not-allowed'
              }`}
              aria-label="Rolar para a esquerda"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className={`w-8 h-8 rounded-full border border-slate-200 bg-white flex items-center justify-center transition-all ${
                canScrollRight
                  ? 'hover:bg-slate-50 text-slate-800 shadow-xs cursor-pointer'
                  : 'text-slate-300 opacity-50 cursor-not-allowed'
              }`}
              aria-label="Rolar para a direita"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      {/* Container Relativo para o Trilho e as Setas Flutuantes */}
      <div className="relative group">
        {/* Seta Flutuante Esquerda (Desktop) */}
        {canScrollLeft && (
          <button
            onClick={() => scroll('left')}
            className="hidden md:flex absolute -left-5 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white hover:bg-slate-50 text-slate-800 items-center justify-center shadow-lg border border-slate-200 transition-all hover:scale-105 cursor-pointer"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-6 h-6 text-slate-700" />
          </button>
        )}

        {/* Seta Flutuante Direita (Desktop) */}
        {canScrollRight && (
          <button
            onClick={() => scroll('right')}
            className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white hover:bg-slate-50 text-slate-800 items-center justify-center shadow-lg border border-slate-200 transition-all hover:scale-105 cursor-pointer"
            aria-label="Próximo"
          >
            <ChevronRight className="w-6 h-6 text-slate-700" />
          </button>
        )}

        {/* Trilho Deslizante com Efeito "Peek" (Prévia da Próxima Imagem no Canto) */}
        <div
          ref={scrollContainerRef}
          onScroll={checkScroll}
          className="flex items-stretch gap-3 sm:gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 pt-1 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-none"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="w-[calc(43vw-6px)] min-[480px]:w-[200px] sm:w-[calc(30%-10px)] md:w-[calc(28%-12px)] lg:w-[calc(22.8%-14px)] shrink-0 snap-start flex flex-col self-stretch"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
