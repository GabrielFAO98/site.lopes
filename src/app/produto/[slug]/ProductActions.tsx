'use client';

import React, { useState } from 'react';
import { MessageCircle, Plus, Check, ClipboardList, Minus } from 'lucide-react';
import { Product, ProductVariation } from '@/types';
import { getProductWhatsAppUrl, formatCurrency } from '@/lib/whatsapp';
import { useQuote, getQuoteItemKey } from '@/components/QuoteContext';

interface ProductActionsProps {
  product: Product;
}

export function ProductActions({ product }: ProductActionsProps) {
  const { addItem, items } = useQuote();
  const [selectedVariation, setSelectedVariation] = useState<ProductVariation | undefined>(
    product.variations && product.variations.length > 0 ? product.variations[0] : undefined
  );
  const [quantity, setQuantity] = useState(1);

  const hasVariations = Boolean(product.variations && product.variations.length > 0);
  const isColorVariation = Boolean(
    hasVariations && product.variations?.some((v) => Boolean(v.hex))
  );

  const activePrice = (selectedVariation && selectedVariation.price !== undefined && selectedVariation.price !== null)
    ? selectedVariation.price
    : product.price;

  const activeSku = selectedVariation ? selectedVariation.sku : product.sku;

  const itemKey = selectedVariation ? `${product.id}-${selectedVariation.sku}` : product.id;
  const isInQuote = items.some((item) => getQuoteItemKey(item) === itemKey);
  const whatsappUrl = getProductWhatsAppUrl(product, undefined, selectedVariation);

  const handleAddToQuote = () => {
    addItem(product, quantity, selectedVariation);
  };

  return (
    <div className="space-y-5">
      {/* Bloco de Preço Dinâmico (atualiza conforme a variação) */}
      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-black text-slate-900">
            {activePrice !== null ? formatCurrency(activePrice) : 'Sob Consulta'}
          </span>
          <span className="text-sm font-medium text-slate-500">/ {product.unit}</span>
        </div>
      </div>

      {/* Seletor de Variações / Atributos */}
      {hasVariations && product.variations && (
        <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-800">
              {product.variationType || 'Opção'}:{' '}
              <span className="text-lopes-blue font-semibold">{selectedVariation?.name}</span>
            </span>
            <span className="text-[11px] font-mono text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
              SKU: <strong className="text-slate-900">{activeSku}</strong>
            </span>
          </div>

          {/* Modo 1: Cores com círculos e códigos HEX */}
          {isColorVariation ? (
            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              {product.variations.map((variation) => {
                const isSelected = selectedVariation?.sku === variation.sku;
                const isWhiteOrLight =
                  variation.hex?.toLowerCase() === '#ffffff' ||
                  variation.hex?.toLowerCase() === '#fff' ||
                  variation.hex?.toLowerCase() === '#f8fafc';

                return (
                  <button
                    key={variation.sku}
                    type="button"
                    onClick={() => setSelectedVariation(variation)}
                    className={`group relative flex items-center justify-center w-9 h-9 rounded-full transition-all cursor-pointer ${
                      isSelected
                        ? 'ring-2 ring-lopes-blue ring-offset-2 scale-110 shadow-sm'
                        : 'hover:scale-105 opacity-90 hover:opacity-100'
                    } ${isWhiteOrLight ? 'border border-slate-300' : ''}`}
                    style={{ backgroundColor: variation.hex || '#cbd5e1' }}
                    title={`${variation.name} (SKU: ${variation.sku})`}
                    aria-label={variation.name}
                  >
                    {isSelected && (
                      <Check
                        className={`w-4 h-4 stroke-[3] ${
                          isWhiteOrLight ? 'text-slate-900' : 'text-white drop-shadow-sm'
                        }`}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          ) : (
            /* Modo 2: Pílulas de texto (milímetros, voltagem 127/220V, medidas, modelos) */
            <div className="flex flex-wrap gap-2 pt-1">
              {product.variations.map((variation) => {
                const isSelected = selectedVariation?.sku === variation.sku;
                return (
                  <button
                    key={variation.sku}
                    type="button"
                    onClick={() => setSelectedVariation(variation)}
                    className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-lopes-blue text-white border-lopes-blue shadow-xs'
                        : 'bg-white text-slate-700 border-slate-300 hover:border-slate-400 hover:bg-slate-50'
                    }`}
                  >
                    {variation.name}
                    {variation.price !== undefined &&
                      variation.price !== null &&
                      variation.price !== product.price && (
                        <span
                          className={`ml-1 text-[11px] ${
                            isSelected ? 'text-blue-100' : 'text-slate-400'
                          }`}
                        >
                          ({formatCurrency(variation.price)})
                        </span>
                      )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}

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
        Clique no WhatsApp para falar com a equipe de vendas de Franca - SP ou monte sua lista com vários itens.
      </p>
    </div>
  );
}
