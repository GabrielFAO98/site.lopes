'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, QuoteItem, ProductVariation } from '@/types';

export function getQuoteItemKey(item: { product: { id: string }; selectedVariation?: { sku: string } }): string {
  return item.selectedVariation ? `${item.product.id}-${item.selectedVariation.sku}` : item.product.id;
}

interface QuoteContextType {
  items: QuoteItem[];
  addItem: (product: Product, quantity?: number, selectedVariation?: ProductVariation) => void;
  removeItem: (itemKey: string) => void;
  updateQuantity: (itemKey: string, quantity: number) => void;
  clearQuote: () => void;
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  totalCount: number;
}

const QuoteContext = createContext<QuoteContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'lopes_quote_items_v1';

export function QuoteProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<QuoteItem[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Carrega do localStorage ao montar o componente
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Erro ao carregar lista de orçamento do localStorage', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Salva no localStorage sempre que houver alteração
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Erro ao salvar no localStorage', e);
    }
  }, [items, isLoaded]);

  const addItem = (product: Product, quantity: number = 1, selectedVariation?: ProductVariation) => {
    const targetKey = selectedVariation ? `${product.id}-${selectedVariation.sku}` : product.id;
    setItems((prev) => {
      const existing = prev.find((item) => getQuoteItemKey(item) === targetKey);
      if (existing) {
        return prev.map((item) =>
          getQuoteItemKey(item) === targetKey
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity, selectedVariation }];
    });
    setIsDrawerOpen(true);
  };

  const removeItem = (itemKey: string) => {
    setItems((prev) => prev.filter((item) => getQuoteItemKey(item) !== itemKey));
  };

  const updateQuantity = (itemKey: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(itemKey);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        getQuoteItemKey(item) === itemKey ? { ...item, quantity } : item
      )
    );
  };

  const clearQuote = () => {
    setItems([]);
  };

  const totalCount = items.length;

  return (
    <QuoteContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearQuote,
        isDrawerOpen,
        openDrawer: () => setIsDrawerOpen(true),
        closeDrawer: () => setIsDrawerOpen(false),
        totalCount,
      }}
    >
      {children}
    </QuoteContext.Provider>
  );
}

export function useQuote() {
  const context = useContext(QuoteContext);
  if (!context) {
    throw new Error('useQuote deve ser utilizado dentro de um QuoteProvider');
  }
  return context;
}
