'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  SlidersHorizontal,
  ChevronDown,
  X,
  ArrowUpDown,
  CircleDollarSign,
  ArrowRight,
  Check,
} from 'lucide-react';
import { Department } from '@/types';

interface ProductFiltersProps {
  departments: (Department & { count: number })[];
  brands: string[];
  currentDepartment: string;
  currentBrand: string;
  currentQuery: string;
  currentSort: string;
  currentMinPrice?: string;
  currentMaxPrice?: string;
}

export function ProductFilters({
  departments,
  brands,
  currentDepartment,
  currentBrand,
  currentQuery,
  currentSort,
  currentMinPrice = '',
  currentMaxPrice = '',
}: ProductFiltersProps) {
  const router = useRouter();
  // Fechado por padrão no mobile
  const [isOpenMobile, setIsOpenMobile] = useState(false);

  // Estados dos inputs de preço manual
  const [minInput, setMinInput] = useState(currentMinPrice);
  const [maxInput, setMaxInput] = useState(currentMaxPrice);

  const hasPriceFilter = Boolean(currentMinPrice || currentMaxPrice);
  const hasSortFilter = currentSort && currentSort !== 'featured';

  const activeFiltersCount =
    (currentDepartment !== 'todos' ? 1 : 0) +
    (currentBrand !== 'todas' ? 1 : 0) +
    (hasPriceFilter ? 1 : 0) +
    (hasSortFilter ? 1 : 0);

  const selectedDepartmentObj = departments.find((d) => d.id === currentDepartment);

  // Constrói URL com parâmetros preservados
  const buildUrl = (overrides: {
    depto?: string;
    marca?: string;
    ordem?: string;
    q?: string;
    minPreco?: string;
    maxPreco?: string;
  }) => {
    const params = new URLSearchParams();

    const depto = overrides.depto !== undefined ? overrides.depto : currentDepartment;
    if (depto && depto !== 'todos') params.set('depto', depto);

    const marca = overrides.marca !== undefined ? overrides.marca : currentBrand;
    if (marca && marca !== 'todas') params.set('marca', marca);

    const ordem = overrides.ordem !== undefined ? overrides.ordem : currentSort;
    if (ordem && ordem !== 'featured') params.set('ordem', ordem);

    const q = overrides.q !== undefined ? overrides.q : currentQuery;
    if (q && q.trim()) params.set('q', q.trim());

    const minP = overrides.minPreco !== undefined ? overrides.minPreco : currentMinPrice;
    if (minP && minP.trim()) params.set('minPreco', minP.trim());

    const maxP = overrides.maxPreco !== undefined ? overrides.maxPreco : currentMaxPrice;
    if (maxP && maxP.trim()) params.set('maxPreco', maxP.trim());

    const qs = params.toString();
    return qs ? `/produtos?${qs}` : '/produtos';
  };

  const handleApplyPrice = (e: React.FormEvent) => {
    e.preventDefault();
    const url = buildUrl({
      minPreco: minInput.trim(),
      maxPreco: maxInput.trim(),
    });
    router.push(url);
    if (isOpenMobile) setIsOpenMobile(false);
  };

  const handleClearPrice = () => {
    setMinInput('');
    setMaxInput('');
    const url = buildUrl({ minPreco: '', maxPreco: '' });
    router.push(url);
  };

  const sortOptions = [
    { id: 'featured', label: 'Destaques da Loja' },
    { id: 'price-asc', label: 'Menor Preço (R$)' },
    { id: 'price-desc', label: 'Maior Preço (R$)' },
    { id: 'name-asc', label: 'Nome (A a Z)' },
  ];

  const priceRanges = [
    { label: 'Até R$ 25', min: '', max: '25' },
    { label: 'R$ 25 a R$ 50', min: '25', max: '50' },
    { label: 'R$ 50 a R$ 150', min: '50', max: '150' },
    { label: 'Acima de R$ 150', min: '150', max: '' },
  ];

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
                Filtros e Ordenação
              </span>
              <span className="block text-[11px] text-slate-500 font-medium">
                {activeFiltersCount > 0
                  ? `${activeFiltersCount} ${activeFiltersCount === 1 ? 'filtro ativo' : 'filtros ativos'}${
                      selectedDepartmentObj ? ` (${selectedDepartmentObj.name})` : ''
                    }`
                  : 'Filtrar por preço, ordem, departamento ou marca'}
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
          <h3 className="font-bold text-xs uppercase tracking-wider text-lopes-blue flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-lopes-blue" />
            <span>Filtrar e Ordenar</span>
          </h3>
          {activeFiltersCount > 0 && (
            <Link
              href={currentDepartment !== 'todos' ? `/produtos?depto=${currentDepartment}` : '/produtos'}
              className="text-[11px] text-red-500 hover:underline font-medium"
            >
              Limpar filtros
            </Link>
          )}
        </div>

        {/* 1. Filtro de Ordenação */}
        <div>
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-lopes-blue flex items-center gap-1.5">
              <ArrowUpDown className="w-3.5 h-3.5" />
              <span>Ordenar por</span>
            </h4>
            {hasSortFilter && (
              <Link
                href={buildUrl({ ordem: 'featured' })}
                className="text-[10px] text-slate-400 hover:text-red-500"
              >
                Padrão
              </Link>
            )}
          </div>
          <div className="w-8 h-0.5 bg-lopes-orange rounded-full mt-1 mb-2.5" />
          <ul className="space-y-1 text-xs">
            {sortOptions.map((opt) => {
              const isSelected = currentSort === opt.id || (!currentSort && opt.id === 'featured');
              return (
                <li key={opt.id}>
                  <Link
                    href={buildUrl({ ordem: opt.id })}
                    onClick={() => {
                      if (isOpenMobile) setIsOpenMobile(false);
                    }}
                    className={`flex items-center justify-between py-1.5 px-2.5 rounded-lg transition-colors ${
                      isSelected
                        ? 'bg-lopes-blue text-white font-bold shadow-2xs'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <span>{opt.label}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 stroke-[2.5]" />}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* 2. Filtro de Faixa de Preço */}
        <div>
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-lopes-blue flex items-center gap-1.5">
              <CircleDollarSign className="w-3.5 h-3.5" />
              <span>Faixa de Preço</span>
            </h4>
            {hasPriceFilter && (
              <button
                type="button"
                onClick={handleClearPrice}
                className="text-[10px] text-red-500 hover:underline cursor-pointer"
              >
                Limpar
              </button>
            )}
          </div>
          <div className="w-8 h-0.5 bg-lopes-orange rounded-full mt-1 mb-2.5" />

          {/* Form com inputs Min e Max */}
          <form onSubmit={handleApplyPrice} className="space-y-2 pt-1">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label htmlFor="minPriceInput" className="block text-[10px] text-slate-500 font-medium mb-0.5">
                  Mínimo (R$)
                </label>
                <input
                  id="minPriceInput"
                  type="number"
                  min="0"
                  step="any"
                  placeholder="0"
                  value={minInput}
                  onChange={(e) => setMinInput(e.target.value)}
                  className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800 focus:outline-none focus:ring-1 focus:ring-lopes-blue focus:border-lopes-blue"
                />
              </div>
              <div>
                <label htmlFor="maxPriceInput" className="block text-[10px] text-slate-500 font-medium mb-0.5">
                  Máximo (R$)
                </label>
                <input
                  id="maxPriceInput"
                  type="number"
                  min="0"
                  step="any"
                  placeholder="300"
                  value={maxInput}
                  onChange={(e) => setMaxInput(e.target.value)}
                  className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800 focus:outline-none focus:ring-1 focus:ring-lopes-blue focus:border-lopes-blue"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-1.5 px-3 bg-lopes-blue hover:bg-lopes-blue-700 text-white rounded-lg text-xs font-bold transition-colors shadow-2xs flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Filtrar por Valor</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Faixas Pré-configuradas em Botões */}
          <div className="space-y-1 pt-3 text-xs">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              Valores mais buscados
            </span>
            <div className="grid grid-cols-2 gap-1.5">
              {priceRanges.map((range) => {
                const isActive =
                  currentMinPrice === range.min && currentMaxPrice === range.max;
                return (
                  <Link
                    key={range.label}
                    href={buildUrl({ minPreco: range.min, maxPreco: range.max })}
                    onClick={() => {
                      setMinInput(range.min);
                      setMaxInput(range.max);
                      if (isOpenMobile) setIsOpenMobile(false);
                    }}
                    className={`text-center py-1 px-1.5 rounded-md border text-[11px] font-medium transition-colors ${
                      isActive
                        ? 'bg-lopes-blue-50 border-lopes-blue text-lopes-blue font-bold shadow-2xs'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300'
                    }`}
                  >
                    {range.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* 3. Filtro por Departamento */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-lopes-blue">
            Departamentos
          </h4>
          <div className="w-8 h-0.5 bg-lopes-orange rounded-full mt-1 mb-2.5" />
          <ul className="space-y-1 text-xs">
            <li>
              <Link
                href={buildUrl({ depto: 'todos' })}
                onClick={() => {
                  if (isOpenMobile) setIsOpenMobile(false);
                }}
                className={`block py-1.5 px-2.5 rounded-lg transition-colors ${
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
                  href={buildUrl({ depto: dept.id })}
                  onClick={() => {
                    if (isOpenMobile) setIsOpenMobile(false);
                  }}
                  className={`flex items-center justify-between py-1.5 px-2.5 rounded-lg transition-colors ${
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

        {/* 4. Filtro por Marca */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-lopes-blue">
            Marcas Parceiras
          </h4>
          <div className="w-8 h-0.5 bg-lopes-orange rounded-full mt-1 mb-2.5" />
          <div className="space-y-1 text-xs max-h-48 overflow-y-auto pr-1">
            <Link
              href={buildUrl({ marca: 'todas' })}
              onClick={() => {
                if (isOpenMobile) setIsOpenMobile(false);
              }}
              className={`block py-1 px-2.5 rounded-md ${
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
                href={buildUrl({ marca: brand })}
                onClick={() => {
                  if (isOpenMobile) setIsOpenMobile(false);
                }}
                className={`block py-1 px-2.5 rounded-md transition-colors ${
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
