'use client';

import React, { useState } from 'react';
import { Share2, Check } from 'lucide-react';

interface ProductShareButtonProps {
  title?: string;
  className?: string;
}

export function ProductShareButton({ title, className = '' }: ProductShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    const shareData = {
      title: title || 'Lopes e Lopes Materiais para Construção',
      text: title ? `Confira ${title} na Lopes e Lopes!` : undefined,
      url,
    };

    if (typeof navigator !== 'undefined' && navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
        return;
      } catch (err: unknown) {
        // Se o usuário cancelou o compartilhamento nativo, não faz nada
        if ((err as Error)?.name === 'AbortError') return;
      }
    }

    // Fallback: copiar para área de transferência
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Falha silenciosa
    }
  };

  return (
    <div className="relative inline-flex items-center">
      <button
        type="button"
        onClick={handleShare}
        aria-label="Compartilhar produto"
        title="Compartilhar link do produto"
        className={`p-2 rounded-xl text-slate-500 hover:text-lopes-blue hover:bg-slate-100 border border-slate-200 transition-all duration-200 active:scale-95 flex items-center justify-center ${className}`}
      >
        {copied ? (
          <Check className="w-4 h-4 text-emerald-600 animate-in zoom-in-50" />
        ) : (
          <Share2 className="w-4 h-4" />
        )}
      </button>

      {/* Tooltip discreto de confirmação */}
      {copied && (
        <div className="absolute right-0 sm:right-auto sm:left-1/2 -top-8 -translate-x-0 sm:-translate-x-1/2 bg-slate-900 text-white text-[11px] font-medium py-1 px-2.5 rounded-lg shadow-lg whitespace-nowrap z-30 pointer-events-none animate-in fade-in slide-in-from-bottom-1">
          Link copiado!
          <div className="absolute left-1/2 -bottom-1 -translate-x-1/2 border-4 border-transparent border-t-slate-900" />
        </div>
      )}
    </div>
  );
}
