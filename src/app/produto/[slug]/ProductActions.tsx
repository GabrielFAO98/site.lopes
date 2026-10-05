'use client';

import React, { useState } from 'react';
import { MessageCircle, Plus, Check, ClipboardList, Minus } from 'lucide-react';
import { Product } from '@/types';
import { getProductWhatsAppUrl, formatCurrency } from '@/lib/whatsapp';
import { useQuote } from '@/components/QuoteContext';

interface ProductActionsProps {
  product: Product;
}

export function ProductActions({ product }: ProductActionsProps) {
  const { addItem, items } = useQuote();
  const [quantity, setQuantity] = useState(1);

  const isInQuote = items.some((item) => item.product.id === product.id);
  const whatsappUrl = getProductWhatsAppUrl(product);

  const handleAddToQuote = () => {
    addItem(product, quantity);
  };

  return (
    <div className="space-y-4 pt-4 border-t border-slate-200">
      {/* Seletor de Quantidade para a Cotação */}
      <div className="flex items-center gap-4">
        <label className="text-xs font-semibold text-slate-700">
          Quantidade estimada:
        </label>
        <div className="flex items-center border border-slate-300 rounded-lg overflow-hidden bg-white">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="px-3 py-2 text-slate-600 hover:bg-slate-100 transition-colors"
            title="Diminuir"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="w-12 text-center text-sm font-bold text-slate-900">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            className="px-3 py-2 text-slate-600 hover:bg-slate-100 transition-colors"
            title="Aumentar"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        <span className="text-xs text-slate-500 font-medium">{product.unit}</span>
      </div>

      {/* Botões de Ação Principais */}
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        {/* CTA Primário WhatsApp */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-3.5 px-6 bg-lopes-whatsapp hover:bg-lopes-whatsapp-hover text-white font-bold text-sm sm:text-base rounded-xl flex items-center justify-center gap-2.5 shadow-md hover:shadow-lg transition-all duration-200"
        >
          <MessageCircle className="w-5 h-5 fill-white shrink-0" />
          <span>Comprar / Orçamento no WhatsApp</span>
        </a>

        {/* CTA Secundário: Adicionar à Lista de Orçamento */}
        <button
          onClick={handleAddToQuote}
          className={`py-3.5 px-5 font-bold text-sm rounded-xl flex items-center justify-center gap-2 border transition-all duration-200 ${
            isInQuote
              ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
              : 'bg-lopes-blue hover:bg-lopes-blue-700 text-white border-transparent shadow-sm'
          }`}
        >
          {isInQuote ? (
            <>
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Na Lista de Cotação</span>
            </>
          ) : (
            <>
              <ClipboardList className="w-4 h-4" />
              <span>+ Adicionar à Cotação</span>
            </>
          )}
        </button>
      </div>

      <p className="text-[11px] text-slate-500 text-center">
        ⚡ Clique no WhatsApp para falar com a equipe de vendas de Franca - SP ou monte sua lista com vários itens.
      </p>
    </div>
  );
}
