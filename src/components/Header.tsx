'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { 
  Phone, 
  MapPin, 
  Clock, 
  Search, 
  ClipboardList, 
  Menu, 
  X,
  ChevronDown,
  Instagram
} from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { STORE_CONFIG, GOOGLE_MAPS_URL } from '@/lib/store-config';
import { DEPARTMENTS } from '@/lib/departments';
import { useQuote } from './QuoteContext';

export function Header() {
  const router = useRouter();
  const { totalCount, openDrawer } = useQuote();
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/produtos?q=${encodeURIComponent(searchQuery.trim())}`);
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="w-full bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
      {/* Barra Superior de Contato e Localização */}
      <div className="bg-lopes-blue-900 text-slate-200 text-xs py-2 px-4 hidden md:block border-b border-lopes-blue-800">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-lopes-orange-400" />
              <span>Tel: <strong className="text-white">{STORE_CONFIG.phone}</strong></span>
            </span>
            <span className="flex items-center gap-1.5">
              <WhatsAppIcon className="w-3.5 h-3.5 text-lopes-whatsapp" />
              <span>WhatsApp: <strong className="text-white">{STORE_CONFIG.whatsappDisplay}</strong></span>
            </span>
            <a 
              href={GOOGLE_MAPS_URL} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 text-lopes-orange-400" />
              <span>{STORE_CONFIG.address}, {STORE_CONFIG.neighborhood} - {STORE_CONFIG.city}/SP</span>
            </a>
          </div>
          <div className="flex items-center gap-4 text-slate-300">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>Seg a Sex: 7h às 18h | Sáb: 7h às 12h</span>
            </div>
            <a 
              href={STORE_CONFIG.instagram} 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1 text-slate-300"
              title="Siga a Lopes e Lopes no Instagram"
              aria-label="Instagram da Lopes e Lopes"
            >
              <Instagram className="w-3.5 h-3.5 text-rose-400" />
            </a>
          </div>
        </div>
      </div>

      {/* Barra Principal (Logo, Busca, Ações) */}
      <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4 flex items-center justify-between gap-4">
        {/* Logotipo */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <div className="relative w-36 sm:w-44 h-12 sm:h-14">
            <Image
              src="/images/logo.png"
              alt="Lopes e Lopes Materiais para Construção Franca"
              fill
              className="object-contain object-left"
              priority
            />
          </div>
        </Link>

        {/* Barra de Busca Desktop */}
        <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl mx-4">
          <div className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar materiais (ex: tubo tigre, cimento, tinta coral, fiação)..."
              className="w-full pl-4 pr-11 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-lopes-blue focus:border-transparent text-sm text-slate-900 placeholder-slate-400"
            />
            <button
              type="submit"
              className="absolute right-1 top-1 bottom-1 px-3 bg-lopes-orange text-white rounded-md hover:bg-lopes-orange-600 transition-colors flex items-center justify-center"
              title="Buscar produtos"
            >
              <Search className="w-4 h-4" />
            </button>
          </div>
        </form>

        {/* Botões de Ação Direta */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Botão Instagram (Apenas ícone) */}
          <a
            href={STORE_CONFIG.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-9 sm:w-10 h-9 sm:h-10 rounded-lg text-slate-600 hover:text-[#E4405F] hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-all shrink-0 shadow-2xs"
            title="Instagram da Lopes e Lopes (@lopeselopes_mc)"
            aria-label="Instagram da Lopes e Lopes"
          >
            <Instagram className="w-4 sm:w-5 h-4 sm:h-5" />
          </a>

          {/* Botão WhatsApp Direto */}
          <a
            href={`https://api.whatsapp.com/send?phone=${STORE_CONFIG.whatsapp}&text=${encodeURIComponent(
              'Olá, equipe Lopes e Lopes! Gostaria de falar com um atendente.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2.5 bg-lopes-whatsapp text-white text-sm font-semibold rounded-lg hover:bg-lopes-whatsapp-hover transition-colors shadow-sm"
          >
            <WhatsAppIcon className="w-4 h-4 fill-white" />
            <span>Falar no WhatsApp</span>
          </a>

          {/* Botão da Lista de Cotação de Obra */}
          <button
            onClick={openDrawer}
            className="relative flex items-center gap-2 px-3.5 py-2.5 bg-lopes-blue text-white text-sm font-semibold rounded-lg hover:bg-lopes-blue-700 transition-colors shadow-sm"
            title="Abrir Lista de Orçamento"
          >
            <ClipboardList className="w-4 h-4" />
            <span className="hidden sm:inline">Lista de Orçamento</span>
            {totalCount > 0 && (
              <span className="bg-lopes-orange text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {totalCount}
              </span>
            )}
          </button>

          {/* Botão Menu Mobile */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
            aria-label="Abrir menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Barra de Busca no Mobile */}
      <div className="md:hidden px-4 pb-3">
        <form onSubmit={handleSearch} className="relative w-full">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar materiais de construção..."
            className="w-full pl-3.5 pr-10 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-lopes-blue text-sm"
          />
          <button
            type="submit"
            className="absolute right-1 top-1 bottom-1 px-3 bg-lopes-orange text-white rounded-md flex items-center justify-center"
          >
            <Search className="w-4 h-4" />
          </button>
        </form>
      </div>

      {/* Navegação por Departamentos (Desktop) */}
      <nav className="hidden md:block bg-lopes-blue text-white border-t border-lopes-blue-700">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between text-sm">
          <div className="flex items-center space-x-1 overflow-x-auto py-1">
            <Link
              href="/produtos"
              className="px-3 py-2 font-semibold hover:bg-lopes-blue-700 rounded-md transition-colors shrink-0"
            >
              Todos os Produtos
            </Link>
            {DEPARTMENTS.map((dept) => (
              <Link
                key={dept.id}
                href={`/produtos?depto=${dept.id}`}
                className="px-3 py-2 hover:bg-lopes-blue-700 rounded-md transition-colors text-slate-100 hover:text-white shrink-0"
              >
                {dept.name}
              </Link>
            ))}
          </div>
          <div className="text-xs text-lopes-orange-200 shrink-0 font-medium pl-2">
            📍 Entregas em Franca e Região
          </div>
        </div>
      </nav>

      {/* Menu Mobile Expansível */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-50 border-t border-slate-200 px-4 py-4 space-y-4">
          <div className="font-semibold text-slate-800 text-sm mb-2">Departamentos:</div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <Link
              href="/produtos"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 bg-white rounded border border-slate-200 text-lopes-blue font-medium"
            >
              📦 Todos os Produtos
            </Link>
            {DEPARTMENTS.map((dept) => (
              <Link
                key={dept.id}
                href={`/produtos?depto=${dept.id}`}
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 bg-white rounded border border-slate-200 text-slate-700 hover:text-lopes-blue font-medium"
              >
                {dept.name}
              </Link>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-200 text-xs text-slate-600 space-y-1">
            <p><strong>Loja:</strong> {STORE_CONFIG.address}, {STORE_CONFIG.neighborhood} - Franca/SP</p>
            <p><strong>Telefone:</strong> {STORE_CONFIG.phone}</p>
            <p><strong>WhatsApp:</strong> {STORE_CONFIG.whatsappDisplay}</p>
          </div>
        </div>
      )}
    </header>
  );
}
