import React from 'react';
import { Star, CheckCircle2 } from 'lucide-react';

function GoogleIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      />
    </svg>
  );
}

interface ReviewItem {
  name: string;
  role: string;
  rating: number;
  source: string;
  comment: string;
  avatarBg: string;
}

const REVIEWS: ReviewItem[] = [
  {
    name: 'Marcelo',
    role: 'Cliente Verificado',
    rating: 5,
    source: 'Google Maps',
    comment: 'Preço justo, cumpre entrega como combinado! Atendimento excelente do Alexandre.',
    avatarBg: 'bg-blue-600',
  },
  {
    name: 'Leandro',
    role: 'Cliente Verificado',
    rating: 5,
    source: 'Google Maps',
    comment: 'A gente se sente parte de lá, loja completa! Atendentes muito educados e eficientes, pra contar o preço bom, referência em qualidade.',
    avatarBg: 'bg-emerald-600',
  },
  {
    name: 'Juscilene',
    role: 'Cliente Verificada',
    rating: 5,
    source: 'Google Maps',
    comment: 'Pessoal extremamente profissional. Entrega no prazo e funcionários competentes. Todos! Obrigada.',
    avatarBg: 'bg-purple-600',
  },
  {
    name: 'Carlos Eduardo',
    role: 'Local Guide',
    rating: 5,
    source: 'Google Maps',
    comment: 'Sempre compro aqui para as reformas e obras. Entrega ágil com frota própria e facilidade para fechar orçamento no WhatsApp.',
    avatarBg: 'bg-amber-600',
  },
  {
    name: 'Roberto Silva',
    role: 'Cliente Verificado',
    rating: 5,
    source: 'Google Maps',
    comment: 'Atendimento no balcão e no WhatsApp nota 10. Agilidade na entrega dos materiais pesados e preço justo em Franca.',
    avatarBg: 'bg-sky-600',
  },
  {
    name: 'Marcos Vinícius',
    role: 'Cliente Verificado',
    rating: 5,
    source: 'Google Maps',
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
          <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200/80 text-amber-900 px-3 py-1 rounded-full text-xs font-semibold mb-2">
            <GoogleIcon className="w-3.5 h-3.5" />
            <span>Avaliações Reais no Google Maps</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Quem Constrói e Reforma Recomenda
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-1 max-w-xl">
            A opinião de quem confia na Lopes e Lopes para construir e reformar em Franca e região.
          </p>
        </div>

        {/* Resumo da Nota Oficial */}
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
              {/* Estrelas e Tag Google Maps */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-0.5 text-amber-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                  <GoogleIcon className="w-3.5 h-3.5" />
                  <span>{rev.source}</span>
                </div>
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
                <div className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 shrink-0" />
                  <span>{rev.role}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

