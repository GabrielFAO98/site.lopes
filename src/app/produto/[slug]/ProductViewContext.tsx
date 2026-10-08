'use client';

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { Product, ProductVariation } from '@/types';

interface ProductViewContextType {
  product: Product;
  selectedVariation: ProductVariation | undefined;
  setSelectedVariation: (variation: ProductVariation | undefined) => void;
  activeImage: string;
  setActiveImage: (image: string) => void;
  galleryImages: string[];
}

const ProductViewContext = createContext<ProductViewContextType | undefined>(undefined);

export function ProductViewProvider({
  product,
  children,
}: {
  product: Product;
  children: React.ReactNode;
}) {
  const [selectedVariation, setSelectedVariation] = useState<ProductVariation | undefined>(
    product.variations && product.variations.length > 0 ? product.variations[0] : undefined
  );

  const baseImages = useMemo(() => {
    return product.images && product.images.length > 0 ? product.images : ['/images/logo.png'];
  }, [product.images]);

  // Imagem ativa inicial: prioriza imagem da variação selecionada (se houver) ou primeira da galeria
  const initialImage = selectedVariation?.image || baseImages[0];
  const [activeImage, setActiveImage] = useState<string>(initialImage);

  // Sincroniza a imagem ativa sempre que a variação selecionada mudar:
  // Se a variação tiver imagem própria, muda diretamente para ela.
  // Se não tiver imagem própria, volta suavemente para a imagem padrão principal do produto.
  useEffect(() => {
    if (selectedVariation?.image) {
      setActiveImage(selectedVariation.image);
    } else if (baseImages.length > 0) {
      setActiveImage(baseImages[0]);
    }
  }, [selectedVariation, baseImages]);

  // Lista dinâmica de imagens da galeria:
  // Se a variação selecionada tiver uma imagem que ainda não está na galeria base,
  // nós a adicionamos na primeira posição da lista para aparecer nas miniaturas!
  const galleryImages = useMemo(() => {
    const list = [...baseImages];
    if (selectedVariation?.image) {
      const idx = list.indexOf(selectedVariation.image);
      if (idx === -1) {
        return [selectedVariation.image, ...list];
      }
    }
    return list;
  }, [baseImages, selectedVariation]);

  return (
    <ProductViewContext.Provider
      value={{
        product,
        selectedVariation,
        setSelectedVariation,
        activeImage,
        setActiveImage,
        galleryImages,
      }}
    >
      {children}
    </ProductViewContext.Provider>
  );
}

export function useProductView() {
  return useContext(ProductViewContext);
}

