'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ClipboardList, 
  MapPin, 
  ArrowRight 
} from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { useQuote, getQuoteItemKey } from './QuoteContext';
import { formatCurrency, getQuoteListWhatsAppUrl } from '@/lib/whatsapp';
import { STORE_CONFIG } from '@/lib/store-config';

export function QuoteDrawer() {
  const { 
    items, 
    isDrawerOpen, 
    closeDrawer, 
    updateQuantity, 
    removeItem, 
    clearQuote, 
    totalCount 
  } = useQuote();

  const [bairro, setBairro] = useState('');

  if (!isDrawerOpen) return null;

  const totalEstimado = items.reduce((acc, item) => {
    const unitPrice = (item.selectedVariation && item.selectedVariation.price !== undefined && item.selectedVariation.price !== null)
      ? item.selectedVariation.price
      : item.product.price;
    if (unitPrice) {
      return acc + unitPrice * item.quantity;
    }
    return acc;
  }, 0);

  const whatsappUrl = getQuoteListWhatsAppUrl(items, bairro);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={closeDrawer}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header do Drawer */}
          <div className="px-5 py-4 bg-lopes-blue text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ClipboardList className="w-5 h-5 text-lopes-orange-400" />
              <div>
                <h3 className="font-bold text-base">Lista de Cotação de Obra</h3>
                <p className="text-xs text-slate-200">
                  {totalCount} {totalCount === 1 ? 'material selecionado' : 'materiais selecionados'}
                </p>
              </div>
            </div>
            <button
              onClick={closeDrawer}
              className="p-1 rounded-lg text-slate-200 hover:text-white hover:bg-lopes-blue-700 transition-colors"
              aria-label="Fechar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Corpo da Lista */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-500">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                  <ClipboardList className="w-8 h-8 text-slate-400" />
                </div>
                <h4 className="font-semibold text-slate-800 text-base mb-1">
                  Sua lista está vazia
                </h4>
                <p className="text-xs text-slate-500 mb-6 max-w-xs">
                  Navegue pela nossa vitrine e clique em <strong>+ Cotação</strong> nos materiais que precisa para sua obra.
                </p>
                <button
                  onClick={closeDrawer}
                  className="px-4 py-2 bg-lopes-blue text-white text-xs font-semibold rounded-lg hover:bg-lopes-blue-700 transition-colors"
                >
                  Explorar Catálogo
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 text-xs text-slate-500">
                  <span>Itens adicionados:</span>
                  <button
                    onClick={clearQuote}
                    className="text-red-500 hover:text-red-700 hover:underline flex items-center gap-1"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Limpar tudo</span>
                  </button>
                </div>

                {items.map((item) => {
                  const itemKey = getQuoteItemKey(item);
                  const unitPrice = (item.selectedVariation && item.selectedVariation.price !== undefined && item.selectedVariation.price !== null)
                    ? item.selectedVariation.price
                    : item.product.price;
                  const effectiveSku = item.selectedVariation ? item.selectedVariation.sku : item.product.sku;

                  return (
                    <div
                      key={itemKey}
                      className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex gap-3 items-center"
                    >
                      {/* Imagem miniatura */}
                      <div className="relative w-14 h-14 bg-white rounded border border-slate-200 shrink-0 overflow-hidden">
                        {item.selectedVariation?.image || item.product.images?.[0] ? (
                          <Image
                            src={item.selectedVariation?.image || item.product.images[0]}
                            alt={item.product.name}
                            fill
                            className="object-contain p-1"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-sm">
                            🧱
                          </div>
                        )}
                      </div>

                      {/* Detalhes do Item */}
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-slate-900 truncate">
                          {item.product.name}
                        </p>
                        {item.selectedVariation && (
                          <span className="inline-block my-0.5 text-[11px] font-semibold text-lopes-blue bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200">
                            {item.product.variationType ? `${item.product.variationType}: ` : ''}{item.selectedVariation.name}
                          </span>
                        )}
                        <p className="text-[11px] text-slate-500">
                          SKU: {effectiveSku} • {item.product.brand}
                        </p>
                        <p className="text-xs font-bold text-lopes-blue mt-0.5">
                          {unitPrice ? formatCurrency(unitPrice) : 'Sob Consulta'}
                          <span className="text-[10px] text-slate-400 font-normal"> / {item.product.unit}</span>
                        </p>
                      </div>

                      {/* Controles de Quantidade */}
                      <div className="flex items-center gap-1.5 shrink-0 bg-white border border-slate-200 rounded-md p-1">
                        <button
                          onClick={() => updateQuantity(itemKey, item.quantity - 1)}
                          className="p-0.5 text-slate-600 hover:text-slate-900"
                          title="Diminuir quantidade"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-xs font-bold w-5 text-center text-slate-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(itemKey, item.quantity + 1)}
                          className="p-0.5 text-slate-600 hover:text-slate-900"
                          title="Aumentar quantidade"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Excluir Item */}
                      <button
                        onClick={() => removeItem(itemKey)}
                        className="p-1 text-slate-400 hover:text-red-500 transition-colors"
                        title="Remover item"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })}
              </>
            )}
          </div>

          {/* Rodapé do Drawer com Envio WhatsApp */}
          {items.length > 0 && (
            <div className="p-4 bg-slate-50 border-t border-slate-200 space-y-3">
              {/* Campo de Bairro para Entrega */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-lopes-orange-500" />
                  <span>Bairro de entrega em Franca - SP (opcional):</span>
                </label>
                <input
                  type="text"
                  value={bairro}
                  onChange={(e) => setBairro(e.target.value)}
                  placeholder="Ex: Jd. Paulistano, Aeroporto, Estação..."
                  className="w-full px-3 py-2 text-xs rounded-md border border-slate-300 focus:outline-none focus:ring-1 focus:ring-lopes-blue"
                />
              </div>

              {/* Subtotal Estimado */}
              <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline">
                <span className="text-xs font-semibold text-slate-600">Total Estimado:</span>
                <span className="text-base font-bold text-slate-900">
                  {totalEstimado > 0 ? formatCurrency(totalEstimado) : 'Sob Consulta'}
                </span>
              </div>
              <p className="text-[10px] text-slate-400 leading-tight">
                * Os valores finais, descontos para grandes quantidades e taxa de entrega serão confirmados diretamente pelo vendedor.
              </p>

              {/* Botão de Envio para o WhatsApp */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 bg-lopes-whatsapp hover:bg-lopes-whatsapp-hover text-white font-bold text-sm rounded-lg flex items-center justify-center gap-2 shadow-md transition-all duration-200"
              >
                <WhatsAppIcon className="w-5 h-5 fill-white" />
                <span>Enviar Orçamento no WhatsApp</span>
              </a>

              <p className="text-center text-[11px] text-slate-500">
                Atendimento direto com a equipe da {STORE_CONFIG.shortName}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
