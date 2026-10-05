'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Play, ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductGalleryProps {
  images: string[];
  name: string;
  videoUrl?: string;
}

/**
 * Extrai o ID do vídeo do YouTube de diversos formatos de URL
 */
function getYouTubeEmbedUrl(url: string): string | null {
  try {
    if (url.includes('youtube.com/embed/')) {
      return url;
    }
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) {
      return `https://www.youtube-nocookie.com/embed/${match[2]}?autoplay=1&rel=0`;
    }
  } catch (e) {
    console.error('Erro ao converter URL de vídeo:', e);
  }
  return null;
}

export function ProductGallery({ images, name, videoUrl }: ProductGalleryProps) {
  const [activeMedia, setActiveMedia] = useState<number | 'video'>(0);

  const validImages = images && images.length > 0 ? images : ['/images/logo.png'];
  const hasMultipleMedia = validImages.length > 1 || Boolean(videoUrl);
  const youtubeEmbedUrl = videoUrl ? getYouTubeEmbedUrl(videoUrl) : null;

  const handlePrev = () => {
    if (activeMedia === 'video') {
      setActiveMedia(validImages.length - 1);
    } else if (typeof activeMedia === 'number') {
      if (activeMedia > 0) {
        setActiveMedia(activeMedia - 1);
      } else if (videoUrl) {
        setActiveMedia('video');
      } else {
        setActiveMedia(validImages.length - 1);
      }
    }
  };

  const handleNext = () => {
    if (activeMedia === 'video') {
      setActiveMedia(0);
    } else if (typeof activeMedia === 'number') {
      if (activeMedia < validImages.length - 1) {
        setActiveMedia(activeMedia + 1);
      } else if (videoUrl) {
        setActiveMedia('video');
      } else {
        setActiveMedia(0);
      }
    }
  };

  return (
    <div className="space-y-4">
      {/* 1. Palco Principal (Foto em Destaque ou Player de Vídeo) */}
      <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-slate-50 border border-slate-200 shadow-xs flex items-center justify-center">
        {activeMedia === 'video' && videoUrl ? (
          <div className="w-full h-full bg-black flex items-center justify-center">
            {youtubeEmbedUrl ? (
              <iframe
                src={youtubeEmbedUrl}
                title={`Vídeo do produto ${name}`}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <video
                src={videoUrl}
                controls
                autoPlay
                className="w-full h-full object-contain"
              >
                Seu navegador não suporta reprodução de vídeos.
              </video>
            )}
          </div>
        ) : (
          <div className="relative w-full h-full">
            <Image
              src={validImages[typeof activeMedia === 'number' ? activeMedia : 0]}
              alt={`${name} - foto ${typeof activeMedia === 'number' ? activeMedia + 1 : 1}`}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain p-2"
              priority
            />
          </div>
        )}

        {/* Setas de Navegação (se houver mais de uma mídia) */}
        {hasMultipleMedia && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-slate-800 p-2 rounded-full shadow-md border border-slate-200 transition-all z-10"
              aria-label="Mídia anterior"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-slate-800 p-2 rounded-full shadow-md border border-slate-200 transition-all z-10"
              aria-label="Próxima mídia"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}

        {/* Indicador de Bolinhas quando houver múltiplas mídias */}
        {hasMultipleMedia && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10 bg-slate-900/50 backdrop-blur-xs px-2.5 py-1 rounded-full pointer-events-none">
            {validImages.map((_, idx) => (
              <span
                key={idx}
                className={`h-1.5 rounded-full transition-all ${
                  activeMedia === idx ? 'bg-white w-4' : 'bg-white/50 w-1.5'
                }`}
              />
            ))}
            {videoUrl && (
              <span
                className={`h-1.5 rounded-full transition-all ${
                  activeMedia === 'video' ? 'bg-red-500 w-4' : 'bg-red-400/60 w-1.5'
                }`}
              />
            )}
          </div>
        )}
      </div>

      {/* Botão de Acesso Rápido ao Vídeo (se houver) */}
      {videoUrl && (
        <button
          type="button"
          onClick={() => setActiveMedia(activeMedia === 'video' ? 0 : 'video')}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-slate-200 hover:border-red-400 hover:bg-red-50 text-slate-700 hover:text-red-600 text-xs font-semibold transition-all shadow-xs"
        >
          <Play className="w-3.5 h-3.5 fill-current text-red-600" />
          <span>{activeMedia === 'video' ? 'Voltar para fotos do produto' : 'Assistir vídeo do produto'}</span>
        </button>
      )}
    </div>
  );
}
