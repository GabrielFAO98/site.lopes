'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { SlidersHorizontal, ChevronDown, X, Filter } from 'lucide-react';
import { Department } from '@/types';

interface ProductFiltersProps {
  departments: (Department & { count: number })[];
  brands: string[];
  currentDepartment: string;
  currentBrand: string;
  currentQuery: string;
  currentSort: string;
}

export function ProductFilters({
  departments,
  brands,
  currentDepartment,
  currentBrand,
  currentQuery,
  currentSort,
}: ProductFiltersProps) {
  // Fechado por padrão no mobile
  const [isOpenMobile, setIsOpenMobile] = useState(false);

  const activeFiltersCount =
    (currentDepartment !== 'todos' ? 1 : 0) + (currentBrand !== 'todas' ? 1 : 0);

  const selectedDepartmentObj = departments.find((d) => d.id === currentDepartment);

  return (
    <aside className="space-y-3">
      {/* Botão de Abrir/Fechar Filtros no Mobile (Exibido apenas em telas menores que lg) */}
      <div className="lg:hidden">
        <button
          type="button"
          onClick={() => setIsOpenMobile((prev) => !prev)}
          className="w-full flex items-center justify-between p-3.5 bg-white border border-slate-200 rounded-xl shadow-xs hover:border-lopes-blue-300 transition-all cursor-pointer text-slate-800"
          aria-expanded={isOpenMobile}
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-lopes-blue-50 flex items-center justify-center text-lopes-blue">
              <SlidersHorizontal className="w-4 h-4" />
            </div>
            <div className="text-left">
              <span className="block font-bold text-xs text-slate-900 leading-tight">
                Filtrar Catálogo
              </span>
              <span className="block text-[11px] text-slate-500 font-medium">
                {activeFiltersCount > 0
                  ? `${activeFiltersCount} ${activeFiltersCount === 1 ? 'filtro ativo' : 'filtros ativos'}${
                      selectedDepartmentObj ? ` (${selectedDepartmentObj.name})` : ''
                    }`
                  : 'Filtrar por departamento ou marca'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-semibold text-lopes-blue">
            <span>{isOpenMobile ? 'Fechar' : 'Abrir'}</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-200 ${
                isOpenMobile ? 'rotate-180' : ''
              }`}
            />
          </div>
        </button>
      </div>

      {/* Caixa de Filtros (Oculta no mobile por padrão quando isOpenMobile = false; Sempre visível no Desktop) */}
      <div
        className={`bg-white p-5 rounded-xl border border-slate-200 space-y-6 shadow-2xs ${
          isOpenMobile ? 'block' : 'hidden lg:block'
        }`}
      >
        {/* Cabeçalho do Card (Desktop) */}
        <div className="hidden lg:flex items-center justify-between pb-3 border-b border-slate-200">
          <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-lopes-blue" />
            <span>Filtrar Catálogo</span>
          </h3>
          {activeFiltersCount > 0 && (
            <Link
              href="/produtos"
              className="text-[11px] text-red-500 hover:underline font-medium"
            >
              Limpar
            </Link>
          )}
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
                href={`/produtos?marca=${encodeURIComponent(
                  brand
                )}&depto=${currentDepartment}&q=${currentQuery}&ordem=${currentSort}`}
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

        {/* Botão de fechar filtros no mobile após abrir */}
        <div className="lg:hidden pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={() => setIsOpenMobile(false)}
            className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors"
          >
            Fechar filtros
          </button>
        </div>
      </div>
    </aside>
  );
}
