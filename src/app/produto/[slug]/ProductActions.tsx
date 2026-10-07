'use client';

import React, { useState } from 'react';
import { Plus, Check, ClipboardList, Minus } from 'lucide-react';
import { WhatsAppIcon } from '@/components/WhatsAppIcon';
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
  const [quantity, setQuantity] = useState<number>(1);
  const [quantityInput, setQuantityInput] = useState<string>('1');

  const handleQuantityInputChange = (val: string) => {
    setQuantityInput(val);
    const parsed = parseFloat(val.replace(',', '.'));
    if (!isNaN(parsed) && parsed > 0) {
      setQuantity(parsed);
    }
  };

  const handleQuantityBlur = () => {
    const parsed = parseFloat(quantityInput.replace(',', '.'));
    if (isNaN(parsed) || parsed <= 0) {
      setQuantity(1);
      setQuantityInput('1');
    } else {
      setQuantity(parsed);
      setQuantityInput(String(parsed).replace('.', ','));
    }
  };

  const handleIncrement = () => {
    const next = Math.round((quantity + 1) * 100) / 100;
    setQuantity(next);
    setQuantityInput(String(next).replace('.', ','));
  };

  const handleDecrement = () => {
    const next = quantity <= 1 
      ? Math.max(0.1, Math.round((quantity - 0.25) * 100) / 100)
      : Math.round((quantity - 1) * 100) / 100;
    setQuantity(next);
    setQuantityInput(String(next).replace('.', ','));
  };

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
      <div className="bg-gradient-to-r from-slate-50 via-blue-50/20 to-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-2xs">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-lopes-blue-700 font-display">
            {activePrice !== null ? formatCurrency(activePrice) : 'Sob Consulta'}
          </span>
          <span className="text-sm font-semibold text-slate-500">/ {product.unit}</span>
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

      {/* Seletor de Quantidade */}
      <div className="flex items-center justify-between gap-3 bg-slate-50 p-3 sm:p-3.5 rounded-xl border border-slate-200">
        <div>
          <label className="block text-xs font-bold text-slate-800">
            Quantidade
          </label>
          <span className="text-[11px] text-slate-500 font-medium">
            Unidade: <strong className="text-slate-700">{product.unit}</strong>
          </span>
        </div>

        <div className="flex items-center border border-slate-300 rounded-lg overflow-hidden bg-white shadow-2xs">
          <button
            type="button"
            onClick={handleDecrement}
            className="w-9 sm:w-10 h-9 sm:h-10 flex items-center justify-center text-slate-600 hover:bg-slate-100 active:bg-slate-200 transition-colors shrink-0"
            title="Diminuir quantidade"
            aria-label="Diminuir quantidade"
          >
            <Minus className="w-4 h-4" />
          </button>
          <input
            type="text"
            inputMode="decimal"
            value={quantityInput}
            onChange={(e) => handleQuantityInputChange(e.target.value)}
            onBlur={handleQuantityBlur}
            className="w-12 sm:w-16 text-center text-sm font-bold text-slate-900 border-x border-slate-200 py-1.5 focus:outline-none focus:bg-slate-50"
            aria-label="Quantidade do produto"
          />
          <button
            type="button"
            onClick={handleIncrement}
            className="w-9 sm:w-10 h-9 sm:h-10 flex items-center justify-center text-slate-600 hover:bg-slate-100 active:bg-slate-200 transition-colors shrink-0"
            title="Aumentar quantidade"
            aria-label="Aumentar quantidade"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
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
          <WhatsAppIcon className="w-5 h-5 fill-white shrink-0" />
          <span>Comprar no WhatsApp</span>
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
