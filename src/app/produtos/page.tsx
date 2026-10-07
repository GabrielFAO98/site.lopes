import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Filter, SlidersHorizontal, ArrowUpDown, X } from 'lucide-react';
import { searchProducts, getAllBrands, getDepartmentsWithCount } from '@/lib/db';
import { ProductCard } from '@/components/ProductCard';
import { ProductFilters } from '@/components/ProductFilters';
import { STORE_CONFIG } from '@/lib/store-config';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Catálogo de Materiais de Construção em Franca - SP',
  description:
    'Consulte tubos, conexões, cimentos, argamassas, fios elétricos, disjuntores, tintas e ferramentas com pronta entrega em Franca na Lopes e Lopes.',
};

interface ProdutosPageProps {
  searchParams: {
    q?: string;
    depto?: string;
    marca?: string;
    ordem?: 'price-asc' | 'price-desc' | 'name-asc' | 'featured';
  };
}

export default async function ProdutosPage({ searchParams }: ProdutosPageProps) {
  const currentQuery = searchParams.q || '';
  const currentDepartment = searchParams.depto || 'todos';
  const currentBrand = searchParams.marca || 'todas';
  const currentSort = searchParams.ordem || 'featured';

  const products = await searchProducts({
    query: currentQuery,
    departmentId: currentDepartment,
    brand: currentBrand,
    sortBy: currentSort,
  });

  const departments = await getDepartmentsWithCount();
  const brands = await getAllBrands();

  const selectedDepartmentName =
    departments.find((d) => d.id === currentDepartment)?.name || 'Todos os Departamentos';

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      {/* Breadcrumb e Título */}
      <div className="border-b border-slate-200 pb-4">
        <nav className="text-xs text-slate-500 mb-2 flex items-center gap-1.5">
          <Link href="/" className="hover:text-lopes-blue">Início</Link>
          <span>/</span>
          <span className="text-slate-800 font-semibold">Catálogo de Produtos</span>
          {currentDepartment !== 'todos' && (
            <>
              <span>/</span>
              <span className="text-lopes-blue font-semibold">{selectedDepartmentName}</span>
            </>
          )}
        </nav>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-wider text-lopes-blue uppercase">
              {currentDepartment !== 'todos' ? selectedDepartmentName : 'Catálogo Completo de Materiais'}
            </h1>
            <div className="w-14 sm:w-16 h-1 bg-lopes-orange rounded-full mt-2 mb-3" />
            <p className="text-xs sm:text-sm text-slate-500">
              Encontrados <strong>{products.length}</strong> {products.length === 1 ? 'produto' : 'produtos'} em estoque na loja de Franca - SP
            </p>
          </div>

          {/* Filtros ativos (Chips) */}
          {(currentDepartment !== 'todos' || currentBrand !== 'todas' || currentQuery) && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-slate-400">Filtros:</span>
              {currentQuery && (
                <Link
                  href={`/produtos?depto=${currentDepartment}&marca=${currentBrand}&ordem=${currentSort}`}
                  className="inline-flex items-center gap-1 text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-1 rounded-full border border-slate-300"
                >
                  <span>Busca: "{currentQuery}"</span>
                  <X className="w-3 h-3" />
                </Link>
              )}
              {currentDepartment !== 'todos' && (
                <Link
                  href={`/produtos?q=${currentQuery}&marca=${currentBrand}&ordem=${currentSort}`}
                  className="inline-flex items-center gap-1 text-xs bg-lopes-blue-50 text-lopes-blue px-2.5 py-1 rounded-full border border-lopes-blue-200"
                >
                  <span>{selectedDepartmentName}</span>
                  <X className="w-3 h-3" />
                </Link>
              )}
              {currentBrand !== 'todas' && (
                <Link
                  href={`/produtos?q=${currentQuery}&depto=${currentDepartment}&ordem=${currentSort}`}
                  className="inline-flex items-center gap-1 text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full border border-slate-300"
                >
                  <span>Marca: {currentBrand}</span>
                  <X className="w-3 h-3" />
                </Link>
              )}
              <Link
                href="/produtos"
                className="text-xs text-red-600 hover:underline font-medium ml-1"
              >
                Limpar todos
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Grid Principal: Barra Lateral de Filtros + Lista de Produtos */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Filtros: Fechados por padrão no mobile, abertos no Desktop */}
        <ProductFilters
          departments={departments}
          brands={brands}
          currentDepartment={currentDepartment}
          currentBrand={currentBrand}
          currentQuery={currentQuery}
          currentSort={currentSort}
        />

        {/* Lista de Resultados */}
        <section className="lg:col-span-3 space-y-6">
          {products.length === 0 ? (
            <div className="bg-white rounded-xl border border-slate-200 p-12 text-center space-y-4">
              <span className="text-4xl block">🔍</span>
              <h3 className="text-lg font-bold text-slate-800">
                Nenhum material encontrado com estes filtros
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
                Tente ajustar a busca ou limpar os filtros para encontrar o que procura no estoque de Franca.
              </p>
              <Link
                href="/produtos"
                className="inline-block px-5 py-2.5 bg-lopes-blue text-white text-xs font-semibold rounded-lg hover:bg-lopes-blue-700"
              >
                Ver todos os produtos
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
