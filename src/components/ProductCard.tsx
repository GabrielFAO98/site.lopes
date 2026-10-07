'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Plus, Check } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { Product } from '@/types';
import { formatCurrency, getProductWhatsAppUrl } from '@/lib/whatsapp';
import { useQuote } from './QuoteContext';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem, items } = useQuote();
  const isInQuote = items.some((item) => item.product.id === product.id);

  const whatsappUrl = getProductWhatsAppUrl(product);
  const hasVariations = Boolean(product.variations && product.variations.length > 0);

  return (
    <div className="bg-white rounded-xl border border-slate-200 hover:border-lopes-blue-300 hover:shadow-md transition-all duration-200 flex flex-col h-full overflow-hidden group">
      {/* Imagem do Produto */}
      <div className="relative aspect-square w-full bg-slate-50 overflow-hidden border-b border-slate-100 shrink-0">
        <Link href={`/produto/${product.slug}`} className="block w-full h-full">
          {product.images && product.images[0] ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center">
              <span className="text-3xl mb-2">🧱</span>
              <span className="text-xs text-slate-400 font-medium">Lopes e Lopes</span>
            </div>
          )}
        </Link>
      </div>

      {/* Conteúdo do Card */}
      <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between">
        {/* Topo do Card: Marca, Nome e Slot de Variações */}
        <div>
          {/* Marca - Altura fixa */}
          <div className="h-4 sm:h-4.5 mb-1 flex items-center">
            <span className="font-semibold text-lopes-blue text-[11px] sm:text-xs uppercase tracking-wider truncate block">
              {product.brand}
            </span>
          </div>

          {/* Nome do Produto - Altura padronizada para 2 linhas */}
          <Link href={`/produto/${product.slug}`} className="block">
            <h3 className="font-semibold text-slate-900 text-xs sm:text-sm line-clamp-2 hover:text-lopes-blue transition-colors leading-snug h-9 sm:h-10 flex items-start">
              {product.name}
            </h3>
          </Link>

          {/* Indicador de Variações - Altura fixa reservada para manter alinhamento em todos os cards */}
          <div className="h-6 flex items-center my-1">
            {hasVariations ? (
              product.variations!.some((v) => Boolean(v.hex)) ? (
                <div className="flex items-center gap-1.5">
                  <div className="flex items-center -space-x-1">
                    {product.variations!.slice(0, 4).map((v) => (
                      <span
                        key={v.sku}
                        className="w-3.5 h-3.5 rounded-full border border-white shadow-2xs inline-block"
                        style={{ backgroundColor: v.hex || '#cbd5e1' }}
                        title={v.name}
                      />
                    ))}
                  </div>
                  <span className="text-[10px] text-slate-500 font-medium">
                    {product.variations!.length} cores
                  </span>
                </div>
              ) : (
                <span className="inline-block text-[10px] font-semibold text-lopes-blue bg-blue-50 px-1.5 py-0.5 rounded border border-blue-100 truncate max-w-full leading-none">
                  {product.variations!.length} opções ({product.variationType || 'modelos'})
                </span>
              )
            ) : null}
          </div>
        </div>

        {/* Preço e Botões de Conversão - Ancorados no rodapé */}
        <div className="pt-2 border-t border-slate-100 mt-auto">
          {/* Preço e Unidade - Altura confortável sem corte de texto */}
          <div className="min-h-[44px] sm:min-h-[46px] flex flex-col justify-center mb-2 sm:mb-2.5">
            <span className="text-base sm:text-lg font-extrabold text-lopes-blue-700 tracking-tight leading-tight">
              {product.price !== null ? formatCurrency(product.price) : 'Sob Consulta'}
            </span>
            <span className="text-[11px] sm:text-xs text-slate-500 font-medium truncate leading-normal">
              / {product.unit}
            </span>
          </div>

          {/* Botões de Ação */}
          <div className="grid grid-cols-1 min-[420px]:grid-cols-2 gap-1.5 sm:gap-2">
            {/* CTA WhatsApp Direto */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1 sm:gap-1.5 bg-lopes-whatsapp hover:bg-lopes-whatsapp-hover text-white text-[11px] sm:text-xs font-semibold h-8 sm:h-8.5 px-1.5 sm:px-2 rounded-lg transition-colors shadow-xs"
              title="Comprar direto no WhatsApp"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 fill-white shrink-0" />
              <span>Comprar</span>
            </a>

            {/* Adicionar à Lista de Cotação ou Ver Opções */}
            {hasVariations ? (
              <Link
                href={`/produto/${product.slug}`}
                className="flex items-center justify-center gap-1 sm:gap-1.5 text-[11px] sm:text-xs font-semibold h-8 sm:h-8.5 px-1 sm:px-2 rounded-lg transition-colors border bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-300"
                title="Ver opções disponíveis"
              >
                <span>Ver Opções</span>
              </Link>
            ) : (
              <button
                onClick={() => addItem(product, 1)}
                className={`flex items-center justify-center gap-1 sm:gap-1.5 text-[11px] sm:text-xs font-semibold h-8 sm:h-8.5 px-1 sm:px-2 rounded-lg transition-colors border ${
                  isInQuote
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-300'
                }`}
                title="Adicionar à Lista de Orçamento Multi-itens"
              >
                {isInQuote ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Adicionado</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                    <span>Cotação</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
