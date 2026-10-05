import React from 'react';
import Link from 'next/link';
import { 
  Building2, 
  Droplets, 
  Zap, 
  Paintbrush, 
  Hammer, 
  Wrench, 
  Sparkles, 
  Truck, 
  ShieldCheck, 
  MessageCircle, 
  Clock, 
  MapPin, 
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { getFeaturedProducts, getDepartmentsWithCount } from '@/lib/db';
import { ProductCard } from '@/components/ProductCard';
import { STORE_CONFIG, GOOGLE_MAPS_URL } from '@/lib/store-config';

// Mapeamento dinâmico de ícones para os departamentos
const iconMap: Record<string, React.ReactNode> = {
  Building2: <Building2 className="w-6 h-6" />,
  Droplets: <Droplets className="w-6 h-6" />,
  Zap: <Zap className="w-6 h-6" />,
  Paintbrush: <Paintbrush className="w-6 h-6" />,
  Hammer: <Hammer className="w-6 h-6" />,
  Wrench: <Wrench className="w-6 h-6" />,
  Sparkles: <Sparkles className="w-6 h-6" />,
};

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts();
  const departments = await getDepartmentsWithCount();

  return (
    <div className="space-y-12 pb-16">
      {/* 1. Hero Banner Principal */}
      <section className="relative bg-gradient-to-br from-lopes-blue-900 via-lopes-blue-800 to-lopes-blue-700 text-white overflow-hidden py-12 md:py-20 px-4">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-6">
            <div className="inline-flex items-center gap-2 bg-lopes-orange/20 border border-lopes-orange/40 text-lopes-orange-200 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold">
              <span className="w-2 h-2 rounded-full bg-lopes-orange animate-ping" />
              <span>Pronta Entrega em Franca - SP & Região</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
              Tudo para sua Obra do <span className="text-lopes-orange-400">Básico</span> ao <span className="text-sky-300">Acabamento</span>
            </h1>

            <p className="text-slate-200 text-base sm:text-lg max-w-2xl leading-relaxed">
              Catálogo completo de materiais de construção, hidráulica, elétrica, tintas e ferramentas. Envie sua lista e feche negócio direto com nossos especialistas pelo WhatsApp!
            </p>

            {/* CTAs do Hero */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/produtos"
                className="px-6 py-3.5 bg-lopes-orange hover:bg-lopes-orange-600 text-white font-bold text-sm sm:text-base rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2"
              >
                <span>Ver Todos os Materiais</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href={`https://api.whatsapp.com/send?phone=${STORE_CONFIG.whatsapp}&text=${encodeURIComponent(
                  'Olá, equipe Lopes e Lopes! Gostaria de cotar materiais para minha obra.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 bg-lopes-whatsapp hover:bg-lopes-whatsapp-hover text-white font-bold text-sm sm:text-base rounded-xl transition-all duration-200 shadow-lg flex items-center gap-2"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
                <span>Pedir Orçamento no WhatsApp</span>
              </a>
            </div>

            {/* Pilares de Confiança */}
            <div className="pt-6 border-t border-lopes-blue-700/60 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-200">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-lopes-orange-400 shrink-0" />
                <span>Entrega rápida na sua obra em Franca</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-sky-300 shrink-0" />
                <span>As melhores marcas do mercado</span>
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Condição especial para profissionais</span>
              </div>
            </div>
          </div>

          {/* Card Resumo do Balcão Físico */}
          <div className="lg:col-span-4 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 text-slate-100 space-y-4">
            <h3 className="font-bold text-lg text-white border-b border-white/20 pb-2 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-lopes-orange-400" />
              <span>Loja Física em Franca</span>
            </h3>
            <p className="text-sm text-slate-200">
              Venha retirar no balcão ou receba no canteiro de obras:
            </p>
            <p className="text-xs bg-black/20 p-3 rounded-lg leading-relaxed font-mono">
              {STORE_CONFIG.address} <br />
              {STORE_CONFIG.neighborhood} — Franca - SP <br />
              CEP: {STORE_CONFIG.cep}
            </p>
            <div className="text-xs space-y-1">
              <p><strong>Telefone:</strong> {STORE_CONFIG.phone}</p>
              <p><strong>WhatsApp:</strong> {STORE_CONFIG.whatsappDisplay}</p>
            </div>
            <a
              href={GOOGLE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center block py-2.5 bg-white text-lopes-blue font-bold text-xs rounded-lg hover:bg-slate-100 transition-colors shadow-sm"
            >
              Abrir Localização no GPS
            </a>
          </div>
        </div>
      </section>

      {/* 2. Seção de Departamentos */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex items-end justify-between mb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-lopes-orange">Navegue por Categoria</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Departamentos da Loja
            </h2>
          </div>
          <Link
            href="/produtos"
            className="text-sm font-semibold text-lopes-blue hover:text-lopes-blue-700 flex items-center gap-1"
          >
            <span>Ver todos</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3 sm:gap-4">
          {departments.map((dept) => (
            <Link
              key={dept.id}
              href={`/produtos?depto=${dept.id}`}
              className="bg-white p-4 rounded-xl border border-slate-200 hover:border-lopes-blue hover:shadow-md transition-all group flex flex-col items-center text-center justify-between"
            >
              <div className="w-12 h-12 rounded-xl bg-lopes-blue-50 text-lopes-blue group-hover:bg-lopes-blue group-hover:text-white transition-colors flex items-center justify-center mb-3">
                {iconMap[dept.iconName] || <Building2 className="w-6 h-6" />}
              </div>
              <h3 className="font-bold text-xs sm:text-sm text-slate-800 group-hover:text-lopes-blue transition-colors line-clamp-1">
                {dept.name}
              </h3>
              <span className="text-[11px] text-slate-400 mt-1">
                {dept.count} {dept.count === 1 ? 'item' : 'itens'}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. Vitrine de Produtos em Destaque */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-2">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
              Pronta Entrega no Balcão
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Materiais Mais Procurados em Franca
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md">
            Clique no botão <strong>Orçamento</strong> para negociar direto no WhatsApp ou em <strong>+ Cotação</strong> para montar sua lista.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/produtos"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-lopes-blue hover:bg-lopes-blue-700 text-white font-bold text-sm rounded-xl transition-colors shadow-md"
          >
            <span>Explorar Catálogo Completo com Filtros</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 4. Banner Especial para Profissionais da Obra */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="inline-block bg-lopes-orange text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Canal dos Profissionais
            </span>
            <h3 className="text-2xl sm:text-3xl font-black leading-tight">
              Pedreiro, Eletricista, Encanador ou Construtor em Franca?
            </h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Não perca tempo rodando pela cidade. Mande sua lista manuscrita ou arquivo de obra direto no nosso WhatsApp e receba a cotação com as melhores condições e entrega rápida no seu canteiro.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href={`https://api.whatsapp.com/send?phone=${STORE_CONFIG.whatsapp}&text=${encodeURIComponent(
                  'Olá, equipe Lopes e Lopes! Sou profissional da construção civil e gostaria de cadastrar minha lista de materiais para cotação.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-lopes-whatsapp hover:bg-lopes-whatsapp-hover text-white font-bold text-sm rounded-lg flex items-center gap-2 shadow-md transition-all"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
                <span>Cotar Lista de Obra no WhatsApp</span>
              </a>
              <span className="text-xs text-slate-400">
                Ou ligue: <strong className="text-white">{STORE_CONFIG.phone}</strong>
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
