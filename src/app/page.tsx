import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Building2, 
  Droplets, 
  Zap, 
  Paintbrush, 
  Hammer, 
  Wrench, 
  Sparkles, 
  ArrowRight,
} from 'lucide-react';
import { WhatsAppIcon } from '@/components/WhatsAppIcon';
import { getFeaturedProducts, getDepartmentsWithCount, getNewProducts } from '@/lib/db';
import { ProductCarousel } from '@/components/ProductCarousel';
import { HomeBannerSlider } from '@/components/HomeBannerSlider';
import { BrandsSection } from '@/components/BrandsSection';
import { GoogleReviewsSection } from '@/components/GoogleReviewsSection';
import { STORE_CONFIG } from '@/lib/store-config';

// Revalidação periódica (ISR): atualiza a cada 60s com novos produtos do Supabase
export const revalidate = 60;

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
  const newProducts = await getNewProducts(20);
  const departments = await getDepartmentsWithCount();

  // 20 produtos para a seção Mais Vendidos
  const topSellers = featuredProducts.slice(0, 20);

  return (
    <div className="space-y-12 sm:space-y-16 pb-16">
      {/* 1. Banners Principais */}
      <HomeBannerSlider />

      {/* 3. Seção de Departamentos */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="mb-5 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-bold tracking-wider text-lopes-blue uppercase">
            Departamentos da Loja
          </h2>
          <div className="w-14 sm:w-16 h-1 bg-lopes-orange rounded-full mt-2" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4 md:gap-5">
          {departments.map((dept) => (
            <Link
              key={dept.id}
              href={`/produtos?depto=${dept.id}`}
              className="relative bg-white rounded-2xl border border-slate-200/90 hover:border-lopes-blue shadow-2xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden group flex flex-col h-52 sm:h-56 md:h-60"
            >
              {/* Área da Imagem Ampliada com Respiro Superior */}
              <div className="relative w-full h-full p-3 sm:p-4 pb-14 sm:pb-16 flex items-center justify-center bg-gradient-to-b from-slate-50/60 via-white to-white">
                {dept.image ? (
                  <Image
                    src={dept.image}
                    alt={dept.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                    className="object-contain p-2 sm:p-3 group-hover:scale-108 transition-transform duration-300 drop-shadow-xs"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-2xl bg-lopes-blue-50 text-lopes-blue flex items-center justify-center">
                    {iconMap[dept.iconName] || <Building2 className="w-8 h-8" />}
                  </div>
                )}
              </div>

              {/* Título Sobreposto na Base com Altura Uniforme e Efeito Frosted Glass */}
              <div className="absolute inset-x-2.5 bottom-2.5 sm:inset-x-3 sm:bottom-3 z-10">
                <div className="bg-white/95 backdrop-blur-md px-2.5 py-1.5 rounded-xl border border-slate-200/80 shadow-xs group-hover:bg-lopes-blue group-hover:border-lopes-blue group-hover:shadow-md transition-all duration-300 text-center flex items-center justify-center h-[46px] sm:h-[50px]">
                  <h3 className="font-bold text-xs sm:text-[13px] text-slate-800 group-hover:text-white transition-colors leading-snug line-clamp-2">
                    {dept.name}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. Vitrine: Mais Vendidos (Padronizado como Carrossel com Prévia da Próxima Imagem) */}
      <ProductCarousel
        products={topSellers}
        title="Mais Vendidos"
      />

      {/* 5. Seção de Melhores Marcas Parceiras */}
      <BrandsSection />

      {/* 6. Seção de Novidades (Carrossel com Prévia da Próxima Imagem) */}
      <ProductCarousel
        products={newProducts}
        title="Novidades"
      />

      {/* Botão de Destaque para Catálogo Completo */}
      <div className="text-center pt-2">
        <Link
          href="/produtos"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-lopes-blue hover:bg-lopes-blue-700 text-white font-bold text-sm rounded-xl transition-colors shadow-md hover:shadow-lg"
        >
          <span>Explorar Catálogo Completo</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* 6. Seção Nossa História (Inspirada no modelo: Menos é mais) */}
      <section className="max-w-7xl mx-auto px-4 py-2 sm:py-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Imagem da Fachada com cantos arredondados */}
          <div className="lg:col-span-6">
            <div className="relative aspect-[16/10] sm:aspect-[4/3] lg:aspect-[16/10] w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm bg-slate-100 border border-slate-200">
              <Image
                src="/images/fachada-lopes.webp"
                alt="Fachada da loja Lopes e Lopes Materiais para Construção em Franca"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Texto Limpo e Direto */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <h2 className="text-xl sm:text-2xl font-bold tracking-wider text-lopes-blue uppercase">
              Nossa História
            </h2>
            <div className="w-14 sm:w-16 h-1 bg-lopes-orange rounded-full mt-2 mb-4 sm:mb-5" />
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Com mais de 35 anos de tradição em Franca, a Lopes e Lopes Materiais para Construção atende quem constrói e reforma com responsabilidade, agilidade e preço justo. Trabalhamos com as melhores marcas e amplo estoque a pronta entrega do básico ao acabamento.
            </p>
          </div>
        </div>
      </section>

      {/* 7. Prova Social: Avaliações Reais do Google Maps */}
      <GoogleReviewsSection />

      {/* 8. Banner Especial para Profissionais da Obra (Última Seção) */}
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
              Não perca tempo rodando pela cidade. Mande sua lista no nosso WhatsApp e receba a cotação com as melhores condições e entrega rápida na sua obra.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href={`https://api.whatsapp.com/send?phone=${STORE_CONFIG.whatsapp}&text=${encodeURIComponent(
                  'Olá, equipe Lopes e Lopes! Sou profissional da construção civil e gostaria de enviar minha lista de materiais para cotação.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-lopes-whatsapp hover:bg-lopes-whatsapp-hover text-white font-bold text-sm rounded-lg flex items-center gap-2 shadow-md transition-all"
              >
                <WhatsAppIcon className="w-5 h-5 fill-white" />
                <span>Cotar Lista de Obra no WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
