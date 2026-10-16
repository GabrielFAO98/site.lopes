'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowUpDown, ArrowDownNarrowWide, ArrowUpNarrowWide, Sparkles } from 'lucide-react';

interface ProductSortBarProps {
  currentSort: string;
  totalProducts: number;
}

export function ProductSortBar({ currentSort, totalProducts }: ProductSortBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSortChange = (newSort: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (newSort === 'featured') {
      params.delete('ordem');
    } else {
      params.set('ordem', newSort);
    }
    const qs = params.toString();
    router.push(qs ? `/produtos?${qs}` : '/produtos');
  };

  return (
    <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      {/* Contagem e Status */}
      <div className="flex items-center gap-2">
        <span className="text-xs sm:text-sm font-semibold text-slate-700">
          Mostrando <strong className="text-lopes-blue font-bold">{totalProducts}</strong> {totalProducts === 1 ? 'produto' : 'produtos'}
        </span>
      </div>

      {/* Controles de Ordenação */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Atalhos Rápidos de Preço (Desktop e Mobile) */}
        <div className="hidden md:flex items-center gap-1.5 border-r border-slate-200 pr-2.5">
          <button
            type="button"
            onClick={() => handleSortChange(currentSort === 'price-asc' ? 'featured' : 'price-asc')}
            className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              currentSort === 'price-asc'
                ? 'bg-lopes-blue text-white shadow-2xs'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
            title="Ordenar do menor para o maior preço"
          >
            <ArrowDownNarrowWide className="w-3.5 h-3.5" />
            <span>Menor Preço</span>
          </button>

          <button
            type="button"
            onClick={() => handleSortChange(currentSort === 'price-desc' ? 'featured' : 'price-desc')}
            className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              currentSort === 'price-desc'
                ? 'bg-lopes-blue text-white shadow-2xs'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
            title="Ordenar do maior para o menor preço"
          >
            <ArrowUpNarrowWide className="w-3.5 h-3.5" />
            <span>Maior Preço</span>
          </button>
        </div>

        {/* Dropdown Principal de Ordenação */}
        <div className="relative flex items-center gap-2 w-full sm:w-auto">
          <label htmlFor="sort-select" className="text-xs text-slate-500 font-medium shrink-0 flex items-center gap-1">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <span>Ordenar:</span>
          </label>
          <select
            id="sort-select"
            value={currentSort}
            onChange={(e) => handleSortChange(e.target.value)}
            className="w-full sm:w-auto text-xs font-semibold bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-lopes-blue/40 focus:border-lopes-blue transition-all cursor-pointer"
          >
            <option value="featured">Destaques da Loja</option>
            <option value="price-asc">Menor Preço (R$)</option>
            <option value="price-desc">Maior Preço (R$)</option>
            <option value="name-asc">Nome (A a Z)</option>
          </select>
        </div>
      </div>
    </div>
  );
}

