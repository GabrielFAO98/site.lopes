'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MessageCircle, Plus, Check } from 'lucide-react';
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

  return (
    <div className="bg-white rounded-xl border border-slate-200 hover:border-lopes-blue-300 hover:shadow-md transition-all duration-200 flex flex-col overflow-hidden group">
      {/* Imagem do Produto com Badges */}
      <div className="relative aspect-square w-full bg-slate-50 overflow-hidden border-b border-slate-100">
        <Link href={`/produto/${product.slug}`} className="block w-full h-full">
          {product.images && product.images[0] ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center">
              <span className="text-3xl mb-2">🧱</span>
              <span className="text-xs text-slate-400 font-medium">Lopes e Lopes</span>
            </div>
          )}
        </Link>

        <div className="absolute top-2 right-2">
          <span className="bg-white/90 backdrop-blur-sm text-slate-700 text-[11px] font-medium px-2 py-0.5 rounded border border-slate-200 shadow-xs">
            SKU: {product.sku}
          </span>
        </div>
      </div>

      {/* Conteúdo do Card */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Marca & Departamento */}
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
            <span className="font-semibold text-lopes-blue uppercase tracking-wider">
              {product.brand}
            </span>
            <span className="text-slate-400 truncate max-w-[120px]">
              {product.departmentName}
            </span>
          </div>

          {/* Nome do Produto */}
          <Link href={`/produto/${product.slug}`}>
            <h3 className="font-semibold text-slate-900 text-sm sm:text-base line-clamp-2 hover:text-lopes-blue transition-colors leading-snug mb-2">
              {product.name}
            </h3>
          </Link>
        </div>

        {/* Preço e Botões de Conversão */}
        <div className="pt-2 border-t border-slate-100 mt-2">
          <div className="mb-3">
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-bold text-slate-900">
                {product.price !== null ? formatCurrency(product.price) : 'Sob Consulta'}
              </span>
              <span className="text-xs text-slate-500 font-medium">/ {product.unit}</span>
            </div>
          </div>

          {/* Botões de Ação */}
          <div className="grid grid-cols-2 gap-2">
            {/* CTA WhatsApp Direto */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 bg-lopes-whatsapp hover:bg-lopes-whatsapp-hover text-white text-xs font-semibold py-2 px-2.5 rounded-lg transition-colors shadow-xs"
              title="Pedir orçamento direto no WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-white shrink-0" />
              <span>Orçamento</span>
            </a>

            {/* Adicionar à Lista de Cotação */}
            <button
              onClick={() => addItem(product, 1)}
              className={`flex items-center justify-center gap-1.5 text-xs font-semibold py-2 px-2 rounded-lg transition-colors border ${
                isInQuote
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-300'
              }`}
              title="Adicionar à Lista de Orçamento Multi-itens"
            >
              {isInQuote ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Adicionado</span>
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5 text-slate-600" />
                  <span>+ Cotação</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
