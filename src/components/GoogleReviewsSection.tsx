import React from 'react';
import { Star } from 'lucide-react';

interface ReviewItem {
  name: string;
  rating: number;
  comment: string;
  avatarBg: string;
}

const REVIEWS: ReviewItem[] = [
  {
    name: 'Marcelo',
    rating: 5,
    comment: 'Preço justo, cumpre entrega como combinado! Atendimento excelente do Alexandre.',
    avatarBg: 'bg-blue-600',
  },
  {
    name: 'Leandro',
    rating: 5,
    comment: 'A gente se sente parte de lá, loja completa! Atendentes muito educados e eficientes, pra contar o preço bom, referência em qualidade.',
    avatarBg: 'bg-emerald-600',
  },
  {
    name: 'Juscilene',
    rating: 5,
    comment: 'Pessoal extremamente profissional. Entrega no prazo e funcionários competentes. Todos! Obrigada.',
    avatarBg: 'bg-purple-600',
  },
  {
    name: 'Carlos Eduardo',
    rating: 5,
    comment: 'Sempre compro aqui para as reformas e obras. Entrega ágil com frota própria e facilidade para fechar orçamento no WhatsApp.',
    avatarBg: 'bg-amber-600',
  },
  {
    name: 'Roberto Silva',
    rating: 5,
    comment: 'Atendimento no balcão e no WhatsApp nota 10. Agilidade na entrega dos materiais pesados e preço justo em Franca.',
    avatarBg: 'bg-sky-600',
  },
  {
    name: 'Marcos Vinícius',
    rating: 5,
    comment: 'Variedade completa do básico ao acabamento. Atendimento rápido e confiança total na tradição da loja.',
    avatarBg: 'bg-indigo-600',
  },
];

export function GoogleReviewsSection() {
  return (
    <section className="max-w-7xl mx-auto px-4">
      {/* Cabeçalho da Prova Social */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6 sm:mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Quem Constrói e Reforma Recomenda
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-1 max-w-xl">
            A opinião de quem confia na Lopes e Lopes para construir e reformar em Franca e região.
          </p>
        </div>

        {/* Resumo da Nota Oficial no Google Maps */}
        <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl px-4 py-2.5 shadow-xs shrink-0 self-start md:self-auto">
          <div className="flex items-center gap-1.5">
            <span className="text-2xl font-black text-slate-900 leading-none">4.6</span>
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
          </div>
          <div className="h-6 w-px bg-slate-200" />
          <div className="text-xs text-slate-600 leading-tight">
            <span className="font-bold text-slate-900 block">+150 avaliações</span>
            <span>no Google Maps</span>
          </div>
        </div>
      </div>

      {/* Grade de Avaliações Reais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {REVIEWS.map((rev) => (
          <div
            key={rev.name}
            className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs hover:shadow-md transition-shadow duration-200 flex flex-col justify-between gap-4"
          >
            <div className="space-y-3">
              {/* Estrelas */}
              <div className="flex items-center gap-0.5 text-amber-400">
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Depoimento Real */}
              <p className="text-slate-700 text-sm leading-relaxed">
                &ldquo;{rev.comment}&rdquo;
              </p>
            </div>

            {/* Informações do Avaliador */}
            <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
              <div
                className={`w-9 h-9 rounded-full ${rev.avatarBg} text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-xs`}
              >
                {rev.name.charAt(0)}
              </div>
              <div className="min-w-0">
                <div className="font-bold text-sm text-slate-900 truncate">
                  {rev.name}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
