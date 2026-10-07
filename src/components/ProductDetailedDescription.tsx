'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface ProductDetailedDescriptionProps {
  description: string;
}

export function ProductDetailedDescription({ description }: ProductDetailedDescriptionProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (!description) return null;

  return (
    <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between gap-4 text-left group cursor-pointer"
      >
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-wider text-lopes-blue uppercase">
            Descrição Detalhada
          </h2>
          <div className="w-14 sm:w-16 h-1 bg-lopes-orange rounded-full mt-2" />
        </div>

        <span
          className={`p-2 rounded-lg bg-slate-100 text-slate-500 group-hover:bg-blue-50 group-hover:text-lopes-blue shrink-0 transition-transform duration-200 ${
            isOpen ? 'rotate-180 bg-blue-50 text-lopes-blue' : ''
          }`}
        >
          <ChevronDown className="w-5 h-5" />
        </span>
      </button>

      {/* Conteúdo oculto por padrão, mas renderizado no HTML SSR para indexação no Google */}
      <div
        className={`pt-6 text-slate-700 leading-relaxed text-sm sm:text-base space-y-4 ${
          isOpen ? 'block animate-in fade-in slide-in-from-top-1 duration-200' : 'hidden'
        }`}
      >
        {description.split('\n\n').map((paragraph, idx) => (
          <p key={idx} className="text-slate-700 leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}
