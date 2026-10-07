'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { ProductFaqItem } from '@/types';

interface ProductFaqProps {
  items: ProductFaqItem[];
  productName?: string;
}

export function ProductFaq({ items, productName }: ProductFaqProps) {
  const [openIndices, setOpenIndices] = useState<number[]>([0]); // Primeiro aberto por padrão para convite visual

  if (!items || items.length === 0) return null;

  const toggleItem = (idx: number) => {
    setOpenIndices((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  return (
    <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-lopes-blue" />
          <h3 className="text-xl sm:text-2xl font-bold tracking-wider text-lopes-blue uppercase">
            Perguntas Frequentes
          </h3>
        </div>
        <div className="w-14 sm:w-16 h-1 bg-lopes-orange rounded-full mt-2" />
        {productName && (
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Tire suas dúvidas técnicas e práticas sobre {productName}
          </p>
        )}
      </div>

      <div className="divide-y divide-slate-100">
        {items.map((item, idx) => {
          const isOpen = openIndices.includes(idx);
          return (
            <div key={idx} className="py-4 first:pt-0 last:pb-0">
              <button
                type="button"
                onClick={() => toggleItem(idx)}
                aria-expanded={isOpen}
                className="w-full flex items-center justify-between gap-4 text-left group"
              >
                <span className="text-sm sm:text-base font-semibold text-slate-800 group-hover:text-lopes-blue transition-colors">
                  {item.question}
                </span>
                <span
                  className={`p-1.5 rounded-lg bg-slate-100 text-slate-500 group-hover:bg-blue-50 group-hover:text-lopes-blue shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 bg-blue-50 text-lopes-blue' : ''
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </span>
              </button>

              {isOpen && (
                <div className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed pr-8 animate-in fade-in slide-in-from-top-1 duration-200">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
