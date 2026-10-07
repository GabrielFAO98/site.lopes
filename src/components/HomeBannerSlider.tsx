'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  type BannerConfig,
  HOME_BANNERS,
  getBannerLink,
} from '@/lib/banners';
import { BannerSlideContent } from '@/components/banners/BannerTemplates';

interface HomeBannerSliderProps {
  banners?: BannerConfig[];
  autoPlayInterval?: number;
}

export function HomeBannerSlider({
  banners = HOME_BANNERS,
  autoPlayInterval = 5500,
}: HomeBannerSliderProps = {}) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const total = banners.length;

  useEffect(() => {
    if (currentSlide >= total) {
      setCurrentSlide(0);
    }
  }, [total, currentSlide]);

  // Auto-play
  useEffect(() => {
    if (isPaused || total <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % total);
    }, autoPlayInterval);
    return () => clearInterval(timer);
  }, [isPaused, total, autoPlayInterval]);

  if (total === 0) return null;

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentSlide((prev) => (prev - 1 + total) % total);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentSlide((prev) => (prev + 1) % total);
  };

  // Suporte a swipe no mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || total <= 1) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        // Swipe para esquerda -> próximo
        setCurrentSlide((prev) => (prev + 1) % total);
      } else {
        // Swipe para direita -> anterior
        setCurrentSlide((prev) => (prev - 1 + total) % total);
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
        {banners.map((banner, index) => {
          const isActive = index === currentSlide;
          const link = getBannerLink(banner);
          const isExternal =
            banner.tipo === 'whatsapp' ||
            link.startsWith('http://') ||
            link.startsWith('https://');

          const content = (
            <div className="relative w-full">
              {/* Versão Desktop (ampla, 1600x480) */}
              <div className="hidden md:block relative w-full aspect-[16/4.8] max-h-[460px]">
                <BannerSlideContent
                  banner={banner}
                  variant="desktop"
                  priority={index === 0}
                />
              </div>

              {/* Versão Mobile (ocupa a maior parte da tela inicial no celular) */}
              <div className="block md:hidden relative w-full aspect-[4/5] min-h-[440px] max-h-[580px]">
                <BannerSlideContent
                  banner={banner}
                  variant="mobile"
                  priority={index === 0}
                />
              </div>
            </div>
          );

          return (
            <div
              key={banner.id}
              className={`transition-opacity duration-700 ease-in-out ${
                isActive
                  ? 'opacity-100 z-10 relative'
                  : 'opacity-0 z-0 absolute inset-0 pointer-events-none'
              }`}
            >
              {isExternal ? (
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full h-full cursor-pointer"
                  title={banner.alt}
                >
                  {content}
                </a>
              ) : (
                <Link
                  href={link}
                  className="block w-full h-full cursor-pointer"
                  title={banner.alt}
                >
                  {content}
                </Link>
              )}
            </div>
          );
        })}
      </div>

      {/* Botões de Navegação Anterior/Próximo (desktop) */}
      {total > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/40 hover:bg-black/70 text-white items-center justify-center backdrop-blur-xs transition-all opacity-0 group-hover:opacity-100 shadow-md"
            aria-label="Banner anterior"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNext}
            className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/40 hover:bg-black/70 text-white items-center justify-center backdrop-blur-xs transition-all opacity-0 group-hover:opacity-100 shadow-md"
            aria-label="Próximo banner"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {/* Indicadores / Bolinhas no rodapé do banner */}
      {total > 1 && (
        <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
          {banners.map((_, idx) => (
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
      )}
    </section>
  );
}
