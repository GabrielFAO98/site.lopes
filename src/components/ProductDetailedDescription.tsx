'use client';

import React, { useState } from 'react';
import { ChevronDown, FileText } from 'lucide-react';

interface ProductDetailedDescriptionProps {
  description: string;
}

export function ProductDetailedDescription({ description }: ProductDetailedDescriptionProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (!description) return null;

  return (
    <section className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        className="w-full p-5 sm:p-6 flex items-center justify-between gap-4 text-left hover:bg-slate-50/70 transition-colors group cursor-pointer"
      >
        <div className="flex items-center gap-3 sm:gap-3.5">
          <div className="p-2 sm:p-2.5 rounded-xl bg-blue-50 text-lopes-blue group-hover:bg-blue-100 transition-colors shrink-0">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base md:text-lg font-bold tracking-wider text-slate-900 group-hover:text-lopes-blue transition-colors uppercase">
              Descrição Detalhada do Produto
            </h2>
            <p className="text-xs text-slate-500 font-normal mt-0.5">
              {isOpen ? 'Clique para recolher o texto' : 'Toque para expandir ficha descritiva completa'}
            </p>
          </div>
        </div>

        <span
          className={`p-2 rounded-xl bg-slate-100 text-slate-600 group-hover:bg-blue-50 group-hover:text-lopes-blue shrink-0 transition-transform duration-200 ${
            isOpen ? 'rotate-180 bg-blue-50 text-lopes-blue' : ''
          }`}
        >
          <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
        </span>
      </button>

      {/* Conteúdo colapsável mantido no DOM para indexação completa pelo Google (SEO) */}
      <div
        className={`px-5 sm:px-8 pb-6 pt-3 border-t border-slate-100 text-slate-700 leading-relaxed text-sm sm:text-base space-y-4 ${
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

