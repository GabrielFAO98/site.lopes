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
      </div>

      {/* 2. Barra de Miniaturas (Thumbnails) */}
      {hasMultipleMedia && (
        <div className="flex items-center gap-3 overflow-x-auto pb-2">
          {validImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveMedia(idx)}
              className={`relative w-20 h-20 rounded-xl overflow-hidden shrink-0 border-2 transition-all bg-white ${
                activeMedia === idx
                  ? 'border-lopes-blue ring-2 ring-lopes-blue/20 scale-102'
                  : 'border-slate-200 hover:border-slate-300 opacity-80 hover:opacity-100'
              }`}
            >
              <Image
                src={img}
                alt={`${name} miniatura ${idx + 1}`}
                fill
                className="object-contain p-1"
              />
            </button>
          ))}

          {/* Botão de Miniatura para o Vídeo */}
          {videoUrl && (
            <button
              onClick={() => setActiveMedia('video')}
              className={`relative w-20 h-20 rounded-xl overflow-hidden shrink-0 border-2 transition-all flex flex-col items-center justify-center bg-slate-900 text-white ${
                activeMedia === 'video'
                  ? 'border-red-500 ring-2 ring-red-400/20 scale-102'
                  : 'border-slate-700 opacity-90 hover:opacity-100'
              }`}
              title="Assistir ao vídeo do produto"
            >
              <div className="w-7 h-7 rounded-full bg-red-600 flex items-center justify-center mb-1 shadow-sm">
                <Play className="w-3.5 h-3.5 fill-white text-white ml-0.5" />
              </div>
              <span className="text-[10px] font-bold tracking-tight">Vídeo</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
