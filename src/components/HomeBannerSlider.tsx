'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface BannerSlide {
  id: number;
  desktopImage: string;
  mobileImage: string;
  alt: string;
  link: string;
  isExternal?: boolean;
}

const BANNERS: BannerSlide[] = [
  {
    id: 1,
    desktopImage: '/images/banners/banner-1-desktop.webp',
    mobileImage: '/images/banners/banner-1-mobile.webp',
    alt: 'Da Fundação ao Acabamento - Cimento, Areia, Brita e Aço - Lopes e Lopes Franca',
    link: '/produtos?depto=construcao-basica',
  },
  {
    id: 2,
    desktopImage: '/images/banners/banner-2-desktop.webp',
    mobileImage: '/images/banners/banner-2-mobile.webp',
    alt: 'Acabamentos e Ferramentas - Votomassa, Vedacit, Tekbond, Cortag - Lopes e Lopes Franca',
    link: '/produtos',
  },
  {
    id: 3,
    desktopImage: '/images/banners/banner-3-desktop.webp',
    mobileImage: '/images/banners/banner-3-mobile.webp',
    alt: 'Cotação Rápida no WhatsApp - Lopes e Lopes Materiais para Construção',
    link: 'https://wa.me/5516999142727?text=Ol%C3%A1%2C%20gostaria%20de%20solicitar%20um%20or%C3%A7amento%20de%20materiais.',
    isExternal: true,
  },
];

export function HomeBannerSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  // Auto-play de 5.5 segundos
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % BANNERS.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [isPaused]);

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentSlide((prev) => (prev - 1 + BANNERS.length) % BANNERS.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentSlide((prev) => (prev + 1) % BANNERS.length);
  };

  // Suporte a swipe no mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        // Swipe para esquerda -> próximo
        setCurrentSlide((prev) => (prev + 1) % BANNERS.length);
      } else {
        // Swipe para direita -> anterior
        setCurrentSlide((prev) => (prev - 1 + BANNERS.length) % BANNERS.length);
      }
    }
    touchStartX.current = null;
  };

  return (
    <section
      className="relative w-full bg-slate-900 overflow-hidden select-none group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-label="Banners Promocionais"
    >
      <div className="relative w-full">
        {BANNERS.map((banner, index) => {
          const isActive = index === currentSlide;
          const content = (
            <div className="relative w-full">
              {/* Versão Desktop (ampla, 1600x480) */}
              <div className="hidden md:block relative w-full aspect-[16/4.8] max-h-[460px]">
                <Image
                  src={banner.desktopImage}
                  alt={banner.alt}
                  fill
                  priority={index === 0}
                  className="object-cover"
                  sizes="100vw"
                />
              </div>

              {/* Versão Mobile (quadrada/otimizada para celular, 800x800) */}
              <div className="block md:hidden relative w-full aspect-square">
                <Image
                  src={banner.mobileImage}
                  alt={banner.alt}
                  fill
                  priority={index === 0}
                  className="object-cover"
                  sizes="100vw"
                />
              </div>
            </div>
          );

          return (
            <div
              key={banner.id}
              className={`transition-opacity duration-700 ease-in-out ${
                isActive ? 'opacity-100 z-10 relative' : 'opacity-0 z-0 absolute inset-0 pointer-events-none'
              }`}
            >
              {banner.isExternal ? (
                <a
                  href={banner.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full h-full cursor-pointer"
                  title={banner.alt}
                >
                  {content}
                </a>
              ) : (
                <Link href={banner.link} className="block w-full h-full cursor-pointer" title={banner.alt}>
                  {content}
                </Link>
              )}
            </div>
          );
        })}
      </div>

      {/* Botões de Navegação Anterior/Próximo */}
      <button
        onClick={handlePrev}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-xs transition-all opacity-80 sm:opacity-0 sm:group-hover:opacity-100 shadow-md"
        aria-label="Banner anterior"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-xs transition-all opacity-80 sm:opacity-0 sm:group-hover:opacity-100 shadow-md"
        aria-label="Próximo banner"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Indicadores / Bolinhas no rodapé do banner */}
      <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {BANNERS.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`transition-all rounded-full ${
              currentSlide === idx
                ? 'w-6 sm:w-8 h-2 sm:h-2.5 bg-lopes-orange'
                : 'w-2 sm:w-2.5 h-2 sm:h-2.5 bg-white/60 hover:bg-white'
            }`}
            aria-label={`Ir para banner ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
