'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductGalleryProps {
  images: string[];
  name: string;
}

export function ProductGallery({ images, name }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const validImages = images && images.length > 0 ? images : ['/images/logo.png'];
  const hasMultipleImages = validImages.length > 1;

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : validImages.length - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev < validImages.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="space-y-3 sm:space-y-4">
      {/* 1. Palco Principal da Foto em Destaque */}
      <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-slate-50 border border-slate-200 shadow-xs flex items-center justify-center">
        <div className="relative w-full h-full">
          <Image
            src={validImages[activeIndex] || validImages[0]}
            alt={`${name} - foto ${activeIndex + 1}`}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-contain p-2"
            priority
          />
        </div>

        {/* Setas de Navegação (se houver mais de uma foto) */}
        {hasMultipleImages && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-slate-800 p-2 rounded-full shadow-md border border-slate-200 transition-all z-10"
              aria-label="Foto anterior"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-slate-800 p-2 rounded-full shadow-md border border-slate-200 transition-all z-10"
              aria-label="Próxima foto"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}
      </div>

      {/* 2. Barra de Miniaturas das Fotos */}
      {hasMultipleImages && (
        <div className="flex items-center gap-2.5 overflow-x-auto pb-1">
          {validImages.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden shrink-0 border-2 transition-all bg-white cursor-pointer ${
                activeIndex === idx
                  ? 'border-lopes-blue ring-2 ring-lopes-blue/20 scale-102 shadow-xs'
                  : 'border-slate-200 hover:border-slate-300 opacity-70 hover:opacity-100'
              }`}
              title={`Ver foto ${idx + 1}`}
            >
              <Image
                src={img}
                alt={`${name} miniatura ${idx + 1}`}
                fill
                className="object-contain p-1"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
