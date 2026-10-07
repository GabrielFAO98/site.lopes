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
    logo: '/images/marcas/vedacit.svg',
    alt: 'Impermeabilizantes Vedacit',
  },
  {
    name: 'Votoran',
    slug: 'Votoran',
    logo: '/images/marcas/votoran.svg',
    alt: 'Cimentos Votoran',
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
    alt: 'Argamassas Quartzolit',
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
    name: 'Atlas',
    slug: 'Atlas',
    logo: '/images/marcas/atlas.svg',
    alt: 'Pincéis e Ferramentas Atlas',
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
  // Duplicação exata da lista para o efeito de rolagem infinita linear contínua
  const duplicatedBrands = [...FEATURED_BRANDS, ...FEATURED_BRANDS];

  return (
    <section className="max-w-7xl mx-auto px-4 overflow-hidden">
      <div className="mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl font-bold tracking-wider text-lopes-blue uppercase">
          As Melhores Marcas
        </h2>
        <div className="w-14 sm:w-16 h-1 bg-lopes-orange rounded-full mt-2" />
      </div>

      <div className="relative w-full overflow-hidden py-1">
        {/* Gradientes sutis nas bordas para fade suave */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-slate-50 to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-slate-50 to-transparent z-10" />

        {/* Trilho de rolagem constante e linear */}
        <div className="animate-marquee flex items-center gap-3 sm:gap-4">
          {duplicatedBrands.map((brand, idx) => (
            <Link
              key={`${brand.name}-${idx}`}
              href={`/produtos?marca=${encodeURIComponent(brand.slug)}`}
              className="w-40 sm:w-48 h-20 sm:h-24 bg-white rounded-xl border border-slate-200 hover:border-lopes-blue hover:shadow-md transition-all duration-200 flex items-center justify-center p-3 sm:p-4 shrink-0 group"
              title={`Ver produtos da marca ${brand.name}`}
            >
              <div className="relative w-full h-10 sm:h-12 flex items-center justify-center">
                <Image
                  src={brand.logo}
                  alt={brand.alt}
                  fill
                  className="object-contain p-1 group-hover:scale-105 transition-transform duration-200"
                  sizes="192px"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
