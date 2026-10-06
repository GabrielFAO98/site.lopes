import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface BrandItem {
  name: string;
  slug: string;
  logo: string;
  alt: string;
}

export const FEATURED_BRANDS: BrandItem[] = [
  {
    name: 'Vedacit',
    slug: 'Vedacit',
    logo: '/images/marcas/vedacit.png',
    alt: 'Produtos Vedacit na Lopes e Lopes',
  },
  {
    name: 'Votoran',
    slug: 'Votoran',
    logo: '/images/marcas/votoran.svg',
    alt: 'Cimentos Votoran na Lopes e Lopes',
  },
  {
    name: 'Gerdau',
    slug: 'Gerdau',
    logo: '/images/marcas/gerdau.svg',
    alt: 'Aço e Ferragens Gerdau',
  },
  {
    name: 'Quartzolit',
    slug: 'Quartzolit',
    logo: '/images/marcas/quartzolit.png',
    alt: 'Argamassas e Impermeabilizantes Quartzolit',
  },
  {
    name: 'Lorenzetti',
    slug: 'Lorenzetti',
    logo: '/images/marcas/lorenzetti.svg',
    alt: 'Chuveiros e Metais Lorenzetti',
  },
  {
    name: 'Tekbond',
    slug: 'Tekbond',
    logo: '/images/marcas/tekbond.png',
    alt: 'Adesivos e Selantes Tekbond',
  },
  {
    name: 'Amanco',
    slug: 'Amanco',
    logo: '/images/marcas/amanco.png',
    alt: 'Tubos e Conexões Amanco Wavin',
  },
  {
    name: 'CSN Cimentos',
    slug: 'CSN',
    logo: '/images/marcas/csn.svg',
    alt: 'Cimento CSN',
  },
  {
    name: 'Sil Fios',
    slug: 'Sil',
    logo: '/images/marcas/sil.png',
    alt: 'Fios e Cabos Elétricos SIL',
  },
  {
    name: 'Cortag',
    slug: 'Cortag',
    logo: '/images/marcas/cortag.png',
    alt: 'Cortadores e Niveladores Cortag',
  },
  {
    name: 'Vonder',
    slug: 'Vonder',
    logo: '/images/marcas/vonder.png',
    alt: 'Ferramentas Profissionais Vonder',
  },
  {
    name: 'Irwin',
    slug: 'Irwin',
    logo: '/images/marcas/irwin.svg',
    alt: 'Ferramentas Irwin',
  },
];

export function BrandsSection() {
  return (
    <section className="max-w-7xl mx-auto px-4">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          As Melhores Marcas
        </h2>
        <Link
          href="/produtos"
          className="text-xs sm:text-sm font-semibold text-lopes-blue hover:text-lopes-blue-700 hover:underline"
        >
          Ver todo o catálogo →
        </Link>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 sm:gap-4">
        {FEATURED_BRANDS.map((brand) => (
          <Link
            key={brand.name}
            href={`/produtos?marca=${encodeURIComponent(brand.slug)}`}
            className="bg-white rounded-xl border border-slate-200 hover:border-lopes-blue hover:shadow-md transition-all duration-200 flex items-center justify-center p-3 sm:p-4 h-20 sm:h-24 group"
            title={`Ver produtos da marca ${brand.name}`}
          >
            <div className="relative w-full h-full flex items-center justify-center">
              <Image
                src={brand.logo}
                alt={brand.alt}
                fill
                className="object-contain p-1 group-hover:scale-105 transition-transform duration-200"
                sizes="(max-width: 640px) 33vw, (max-width: 768px) 25vw, 16vw"
              />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

