import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Filter, SlidersHorizontal, ArrowUpDown, X } from 'lucide-react';
import { searchProducts, getAllBrands, getDepartmentsWithCount } from '@/lib/db';
import { ProductCard } from '@/components/ProductCard';
import { STORE_CONFIG } from '@/lib/store-config';

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
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {currentDepartment !== 'todos' ? selectedDepartmentName : 'Catálogo Completo de Materiais'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
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
        {/* Filtros Laterais (Desktop) */}
        <aside className="bg-white p-5 rounded-xl border border-slate-200 space-y-6 shadow-2xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-lopes-blue" />
              <span>Filtrar Catálogo</span>
            </h3>
          </div>

          {/* Filtro por Departamento */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Departamentos
            </h4>
            <ul className="space-y-1 text-xs">
              <li>
                <Link
                  href={`/produtos?q=${currentQuery}&marca=${currentBrand}&ordem=${currentSort}`}
                  className={`block py-1.5 px-2 rounded-md transition-colors ${
                    currentDepartment === 'todos'
                      ? 'bg-lopes-blue text-white font-semibold'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Todos os Departamentos
                </Link>
              </li>
              {departments.map((dept) => (
                <li key={dept.id}>
                  <Link
                    href={`/produtos?depto=${dept.id}&q=${currentQuery}&marca=${currentBrand}&ordem=${currentSort}`}
                    className={`flex items-center justify-between py-1.5 px-2 rounded-md transition-colors ${
                      currentDepartment === dept.id
                        ? 'bg-lopes-blue text-white font-semibold'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <span>{dept.name}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                        currentDepartment === dept.id
                          ? 'bg-lopes-blue-800 text-white'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {dept.count}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Filtro por Marca */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Marcas Parceiras
            </h4>
            <div className="space-y-1 text-xs max-h-48 overflow-y-auto pr-1">
              <Link
                href={`/produtos?depto=${currentDepartment}&q=${currentQuery}&ordem=${currentSort}`}
                className={`block py-1 px-2 rounded-md ${
                  currentBrand === 'todas'
                    ? 'font-bold text-lopes-blue'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Todas as marcas
              </Link>
              {brands.map((brand) => (
                <Link
                  key={brand}
                  href={`/produtos?marca=${encodeURIComponent(brand)}&depto=${currentDepartment}&q=${currentQuery}&ordem=${currentSort}`}
                  className={`block py-1 px-2 rounded-md transition-colors ${
                    currentBrand.toLowerCase() === brand.toLowerCase()
                      ? 'font-bold text-lopes-blue bg-lopes-blue-50'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {brand}
                </Link>
              ))}
            </div>
          </div>
        </aside>

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
