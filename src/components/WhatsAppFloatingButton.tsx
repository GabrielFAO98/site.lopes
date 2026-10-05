'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';
import { STORE_CONFIG } from '@/lib/store-config';

export function WhatsAppFloatingButton() {
  const message = 'Olá, equipe Lopes e Lopes! Gostaria de tirar uma dúvida sobre materiais para minha obra.';
  const url = `https://api.whatsapp.com/send?phone=${STORE_CONFIG.whatsapp}&text=${encodeURIComponent(message)}`;

  return (
    <aside aria-label="Atendimento via WhatsApp" className="fixed bottom-5 right-5 z-40 group">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Abrir conversa no WhatsApp com a Lopes e Lopes"
        className="flex items-center gap-2 bg-lopes-whatsapp hover:bg-lopes-whatsapp-hover text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform group-hover:scale-105"
      >
        <MessageCircle className="w-6 h-6 fill-white shrink-0 animate-bounce" />
        <span className="font-semibold text-sm hidden sm:inline-block pr-1">
          Orçamento WhatsApp
        </span>
      </a>
    </aside>
  );
}
