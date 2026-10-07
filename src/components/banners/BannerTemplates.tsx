import React from 'react';
import Image from 'next/image';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { WhatsAppIcon } from '@/components/WhatsAppIcon';
import type {
  BannerConfig,
  BannerProduto,
  BannerInstitucional,
  BannerWhatsApp,
  TemaBanner,
} from '@/lib/banners';

/**
 * Modelos de banner montados em código.
 *
 * Todos os tamanhos usam a unidade `cqw` (1% da largura do banner), então o banner
 * escala como uma imagem: o layout fica idêntico em qualquer largura de tela.
 * Cada modelo tem uma versão 'desktop' (proporção larga) e 'mobile' (vertical, ocupando
 * a maior parte da tela inicial no celular).
 */

export type BannerVariant = 'desktop' | 'mobile';

/* ------------------------------- Utilitários ------------------------------ */

/** Converte '*palavra*' em destaque colorido. */
function TituloComDestaque({ texto, destaqueClass }: { texto: string; destaqueClass: string }) {
  const partes = texto.split(/(\*[^*]+\*)/g).filter(Boolean);
  return (
    <>
      {partes.map((parte, i) =>
        parte.startsWith('*') && parte.endsWith('*') ? (
          <span key={i} className={destaqueClass}>
            {parte.slice(1, -1)}
          </span>
        ) : (
          <React.Fragment key={i}>{parte}</React.Fragment>
        )
      )}
    </>
  );
}

const fs = (size: string): React.CSSProperties => ({ fontSize: size });

/** Tamanhos de texto por variante (desktop = referência 1600px, mobile = referência 400px vertical) */
const TIPO = {
  desktop: {
    tag: fs('max(10px, 0.95cqw)'),
    titulo: fs('3.6cqw'),
    subtitulo: fs('max(12px, 1.4cqw)'),
    preco: fs('2.9cqw'),
    precoLegenda: fs('max(11px, 1.1cqw)'),
    cta: fs('max(12px, 1.2cqw)'),
    topico: fs('max(11px, 1.25cqw)'),
  },
  mobile: {
    tag: fs('max(11px, 3cqw)'),
    titulo: fs('max(23px, 6.6cqw)'),
    subtitulo: fs('max(13px, 3.6cqw)'),
    preco: fs('max(23px, 6.8cqw)'),
    precoLegenda: fs('max(11px, 3.1cqw)'),
    cta: fs('max(13px, 3.8cqw)'),
    topico: fs('max(13px, 3.6cqw)'),
  },
};

const ESPACO = {
  desktop: { gap: '1.15cqw', tagPad: '0.35cqw 1.1cqw', ctaPad: '0.85cqw 2cqw', ctaMt: '0.5cqw' },
  mobile: { gap: '2.4cqw', tagPad: '0.7cqw 2.4cqw', ctaPad: '2.5cqw 5.5cqw', ctaMt: '1.2cqw' },
};

function Tag({ texto, className, variant }: { texto: string; className: string; variant: BannerVariant }) {
  return (
    <span
      className={`inline-flex self-start items-center rounded-full font-bold uppercase tracking-wider ${className}`}
      style={{ ...TIPO[variant].tag, padding: ESPACO[variant].tagPad }}
    >
      {texto}
    </span>
  );
}

function Cta({
  texto,
  className,
  variant,
  icone,
}: {
  texto: string;
  className: string;
  variant: BannerVariant;
  icone?: React.ReactNode;
}) {
  return (
    <span
      className={`inline-flex self-start items-center gap-[0.5em] rounded-full font-bold shadow-lg transition-transform duration-200 group-hover/banner:translate-x-1 ${className}`}
      style={{ ...TIPO[variant].cta, padding: ESPACO[variant].ctaPad, marginTop: ESPACO[variant].ctaMt }}
    >
      {icone}
      <span>{texto}</span>
      {!icone && <ArrowRight className="w-[1.1em] h-[1.1em]" />}
    </span>
  );
}

/* --------------------------------- Temas --------------------------------- */

const TEMAS: Record<
  TemaBanner,
  { fundo: string; forma: string; tag: string; destaque: string; subtitulo: string; cta: string }
> = {
  azul: {
    fundo: 'bg-gradient-to-br from-lopes-blue-900 via-lopes-blue-800 to-lopes-blue-700',
    forma: 'bg-lopes-orange',
    tag: 'bg-lopes-orange text-white',
    destaque: 'text-lopes-orange-400',
    subtitulo: 'text-blue-100',
    cta: 'bg-lopes-orange text-white',
  },
  laranja: {
    fundo: 'bg-gradient-to-r from-lopes-orange-700 via-lopes-orange-600 to-lopes-orange-500',
    forma: 'bg-lopes-blue-800',
    tag: 'bg-white text-lopes-orange-700',
    destaque: 'text-lopes-blue-900',
    subtitulo: 'text-orange-50',
    cta: 'bg-lopes-blue-800 text-white',
  },
  escuro: {
    fundo: 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800',
    forma: 'bg-lopes-orange',
    tag: 'bg-lopes-orange text-white',
    destaque: 'text-lopes-orange-400',
    subtitulo: 'text-slate-300',
    cta: 'bg-lopes-orange text-white',
  },
};

/* --------------------------- Modelo: Produto ----------------------------- */

export function BannerProdutoTemplate({ banner, variant }: { banner: BannerProduto; variant: BannerVariant }) {
  const tema = TEMAS[banner.tema ?? 'azul'];
  const t = TIPO[variant];
  const isDesktop = variant === 'desktop';

  if (!isDesktop) {
    // Layout Vertical Especial para Mobile (ocupa a maior parte da tela inicial)
    return (
      <div
        className={`relative w-full h-full overflow-hidden ${tema.fundo}`}
        style={{ containerType: 'inline-size' }}
      >
        {/* Elemento de fundo decorativo da marca */}
        <div
          className={`absolute inset-0 ${tema.forma} opacity-20`}
          style={{
            clipPath: 'polygon(0 68%, 100% 52%, 100% 100%, 0 100%)',
          }}
        />
        <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full bg-white/5 pointer-events-none" />

        {/* Conteúdo Vertical Estruturado */}
        <div
          className="absolute inset-0 flex flex-col justify-between text-white"
          style={{
            padding: '7cqw 6cqw 14cqw 6cqw',
          }}
        >
          {/* Topo: Tag, Título e Subtítulo */}
          <div className="flex flex-col" style={{ gap: '2cqw' }}>
            {banner.tag && <Tag texto={banner.tag} className={tema.tag} variant={variant} />}
            <h2 className="font-extrabold leading-[1.12] tracking-tight" style={t.titulo}>
              <TituloComDestaque texto={banner.titulo} destaqueClass={tema.destaque} />
            </h2>
            {banner.subtitulo && (
              <p className={`leading-snug line-clamp-2 ${tema.subtitulo}`} style={t.subtitulo}>
                {banner.subtitulo}
              </p>
            )}
          </div>

          {/* Centro: Vitrine de Fotos dos Produtos com destaque generoso */}
          <div className="flex items-center justify-center my-auto py-2" style={{ gap: '2.5cqw' }}>
            {banner.imagens.length === 1 ? (
              <div
                className="relative bg-white shadow-2xl shrink-0"
                style={{
                  width: '54cqw',
                  height: '46cqw',
                  borderRadius: '4cqw',
                  padding: '2.8cqw',
                }}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={banner.imagens[0]}
                    alt=""
                    fill
                    className="object-contain"
                    sizes="60vw"
                  />
                </div>
              </div>
            ) : (
              banner.imagens.slice(0, 3).map((src, i) => (
                <div
                  key={src + i}
                  className="relative bg-white shadow-xl shrink-0"
                  style={{
                    width: banner.imagens.length === 2 ? '38cqw' : '26.5cqw',
                    height: banner.imagens.length === 2 ? '42cqw' : '34cqw',
                    borderRadius: '3cqw',
                    padding: '2cqw',
                    transform:
                      banner.imagens.length === 3 && i === 1 ? 'translateY(-2cqw) scale(1.08)' : undefined,
                    zIndex: banner.imagens.length === 3 && i === 1 ? 10 : 1,
                  }}
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={src}
                      alt=""
                      fill
                      className="object-contain"
                      sizes="35vw"
                    />
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Rodapé: Preço e Botão de Ação */}
          <div className="flex items-end justify-between gap-3 pt-1">
            {banner.preco ? (
              <div className="flex flex-col leading-none">
                {banner.precoLegenda && (
                  <span
                    className={`uppercase font-bold tracking-wider mb-1.5 ${tema.subtitulo}`}
                    style={t.precoLegenda}
                  >
                    {banner.precoLegenda}
                  </span>
                )}
                <span className="font-black" style={t.preco}>
                  {banner.preco}
                </span>
              </div>
            ) : (
              <div />
            )}
            <Cta texto={banner.cta} className={tema.cta} variant={variant} />
          </div>
        </div>
      </div>
    );
  }

  // Desktop (preservado)
  const imagens = banner.imagens.slice(0, 3);
  const cartao =
    imagens.length === 1
      ? { w: '19cqw', h: '23cqw' }
      : imagens.length === 2
        ? { w: '15.5cqw', h: '20cqw' }
        : { w: '12.5cqw', h: '17cqw' };

  return (
    <div
      className={`relative w-full h-full overflow-hidden ${tema.fundo}`}
      style={{ containerType: 'inline-size' }}
    >
      {/* Faixa diagonal da marca */}
      <div
        className="absolute inset-0 bg-white/15"
        style={{
          clipPath: 'polygon(61.6% 0, 62.9% 0, 52.9% 100%, 51.6% 100%)',
        }}
      />
      <div
        className={`absolute inset-0 ${tema.forma}`}
        style={{
          clipPath: 'polygon(64% 0, 100% 0, 100% 100%, 54% 100%)',
        }}
      />

      {/* Textos */}
      <div
        className="absolute inset-y-0 flex flex-col justify-center text-white"
        style={{
          left: '6cqw',
          width: '46cqw',
          gap: ESPACO.desktop.gap,
        }}
      >
        {banner.tag && <Tag texto={banner.tag} className={tema.tag} variant={variant} />}
        <h2 className="font-extrabold leading-[1.05] tracking-tight line-clamp-2" style={t.titulo}>
          <TituloComDestaque texto={banner.titulo} destaqueClass={tema.destaque} />
        </h2>
        {banner.subtitulo && (
          <p className={`leading-snug line-clamp-2 ${tema.subtitulo}`} style={t.subtitulo}>
            {banner.subtitulo}
          </p>
        )}
        {banner.preco && (
          <div className="flex items-baseline gap-[0.4em] leading-none">
            <span className="font-black" style={t.preco}>
              {banner.preco}
            </span>
            {banner.precoLegenda && (
              <span className={tema.subtitulo} style={t.precoLegenda}>
                {banner.precoLegenda}
              </span>
            )}
          </div>
        )}
        <Cta texto={banner.cta} className={tema.cta} variant={variant} />
      </div>

      {/* Fotos dos produtos em cartões brancos */}
      <div
        className="absolute inset-y-0 flex items-center justify-center"
        style={{
          right: '3cqw',
          width: '42cqw',
          gap: '1.4cqw',
        }}
      >
        {imagens.map((src, i) => (
          <div
            key={src + i}
            className="relative bg-white shadow-2xl shrink-0"
            style={{
              width: cartao.w,
              height: cartao.h,
              borderRadius: '1.4cqw',
              padding: '1cqw',
              transform: imagens.length === 3 && i === 1 ? 'translateY(-1.6cqw)' : undefined,
            }}
          >
            <div className="relative w-full h-full">
              <Image
                src={src}
                alt=""
                fill
                className="object-contain"
                sizes="20vw"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------ Modelo: Institucional -------------------------- */

export function BannerInstitucionalTemplate({
  banner,
  variant,
}: {
  banner: BannerInstitucional;
  variant: BannerVariant;
}) {
  const t = TIPO[variant];
  const isDesktop = variant === 'desktop';

  if (!isDesktop) {
    // Layout Vertical Especial para Mobile (fundo azul limpo e foto em card centralizado)
    return (
      <div
        className="relative w-full h-full overflow-hidden bg-gradient-to-br from-[#02182B] via-[#04223A] to-[#0A5C9C]"
        style={{ containerType: 'inline-size' }}
      >
        {/* Elementos decorativos sutis da marca no fundo */}
        <div className="absolute -top-16 -right-16 w-72 h-72 rounded-full bg-white/5 pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-lopes-orange/10 pointer-events-none" />

        {/* Barra laranja da marca na base */}
        <div className="absolute inset-x-0 bottom-0 bg-lopes-orange" style={{ height: '1.2cqw' }} />

        {/* Conteúdo estruturado em 3 blocos harmônicos */}
        <div
          className="absolute inset-0 flex flex-col justify-between text-white"
          style={{
            padding: '7cqw 6cqw 14cqw 6cqw',
          }}
        >
          {/* Topo: Tag e Título com legibilidade 100% cristalina */}
          <div className="flex flex-col" style={{ gap: '1.8cqw' }}>
            {banner.tag && <Tag texto={banner.tag} className="bg-lopes-orange text-white" variant={variant} />}
            <h2 className="font-extrabold leading-[1.12] tracking-tight" style={t.titulo}>
              <TituloComDestaque texto={banner.titulo} destaqueClass="text-lopes-orange-400" />
            </h2>
            {banner.subtitulo && (
              <p className="leading-snug text-blue-100 line-clamp-2" style={t.subtitulo}>
                {banner.subtitulo}
              </p>
            )}
          </div>

          {/* Centro: Foto da Fachada emoldurada com clareza (sem texto competindo por cima) */}
          <div
            className="relative self-center shadow-2xl overflow-hidden border-2 border-white/20 shrink-0 my-auto"
            style={{
              width: '88cqw',
              height: '38cqw',
              borderRadius: '3.5cqw',
            }}
          >
            <Image
              src={banner.fundo}
              alt="Fachada da loja Lopes e Lopes Materiais para Construção em Franca"
              fill
              className="object-cover"
              sizes="90vw"
              priority
            />
            {/* Badge sutil sobre a foto */}
            <div
              className="absolute bottom-2 left-2.5 bg-black/65 backdrop-blur-xs text-white font-medium px-2.5 py-1 rounded-md flex items-center gap-1.5 shadow-sm"
              style={{ fontSize: 'max(10px, 2.6cqw)' }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Loja física em Franca - SP</span>
            </div>
          </div>

          {/* Base: 3 diferenciais com checkmark + Botão de ação destacado */}
          <div className="flex flex-col" style={{ gap: '2.5cqw' }}>
            {banner.topicos && banner.topicos.length > 0 && (
              <ul className="flex flex-col text-blue-50" style={{ ...t.topico, gap: '1.6cqw' }}>
                {banner.topicos.slice(0, 3).map((topico) => (
                  <li key={topico} className="flex items-center gap-[0.5em] font-semibold">
                    <CheckCircle2 className="w-[1.2em] h-[1.2em] text-lopes-orange-400 shrink-0" />
                    <span>{topico}</span>
                  </li>
                ))}
              </ul>
            )}

            <div>
              <Cta texto={banner.cta} className="bg-lopes-orange text-white shadow-xl" variant={variant} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Desktop (preservado com degradê sólido à esquerda para legibilidade total)
  return (
    <div
      className="relative w-full h-full overflow-hidden bg-[#04223A]"
      style={{ containerType: 'inline-size' }}
    >
      <Image src={banner.fundo} alt="" fill className="object-cover object-right" sizes="100vw" />
      <div
        className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#04223A] via-[#04223A] to-transparent"
        style={{ width: '68%' }}
      />

      {/* Barra laranja da marca */}
      <div className="absolute inset-x-0 bottom-0 bg-lopes-orange" style={{ height: '0.45cqw' }} />

      <div
        className="absolute inset-y-0 flex flex-col justify-center text-white"
        style={{
          left: '6cqw',
          width: '50cqw',
          gap: ESPACO.desktop.gap,
        }}
      >
        {banner.tag && <Tag texto={banner.tag} className="bg-lopes-orange text-white" variant={variant} />}
        <h2 className="font-extrabold leading-[1.05] tracking-tight line-clamp-2" style={t.titulo}>
          <TituloComDestaque texto={banner.titulo} destaqueClass="text-lopes-orange-400" />
        </h2>
        {banner.subtitulo && (
          <p className="leading-snug text-blue-100 line-clamp-2" style={t.subtitulo}>
            {banner.subtitulo}
          </p>
        )}
        {banner.topicos && banner.topicos.length > 0 && (
          <ul
            className="flex flex-wrap text-blue-50"
            style={{ ...t.topico, columnGap: '1.8cqw', rowGap: '0.5cqw' }}
          >
            {banner.topicos.slice(0, 3).map((topico) => (
              <li key={topico} className="flex items-center gap-[0.4em] font-semibold">
                <CheckCircle2 className="w-[1.15em] h-[1.15em] text-lopes-orange-400 shrink-0" />
                <span>{topico}</span>
              </li>
            ))}
          </ul>
        )}
        <Cta texto={banner.cta} className="bg-lopes-orange text-white" variant={variant} />
      </div>
    </div>
  );
}

/* --------------------------- Modelo: WhatsApp ---------------------------- */

export function BannerWhatsAppTemplate({ banner, variant }: { banner: BannerWhatsApp; variant: BannerVariant }) {
  const t = TIPO[variant];
  const isDesktop = variant === 'desktop';

  if (!isDesktop) {
    // Layout Vertical Especial para Mobile (ocupa a maior parte da tela inicial)
    const balao = fs('max(11px, 2.9cqw)');
    return (
      <div
        className="relative w-full h-full overflow-hidden bg-gradient-to-br from-[#064e46] via-[#075E54] to-[#128C7E]"
        style={{ containerType: 'inline-size' }}
      >
        {/* Círculos decorativos */}
        <div
          className="absolute rounded-full border border-white/10 pointer-events-none"
          style={{ width: '80cqw', height: '80cqw', right: '-25cqw', top: '-15cqw' }}
        />
        <div
          className="absolute rounded-full border border-white/10 pointer-events-none"
          style={{ width: '100cqw', height: '100cqw', right: '-35cqw', top: '-25cqw' }}
        />

        <div
          className="absolute inset-0 flex flex-col justify-between text-white"
          style={{
            padding: '7cqw 6cqw 14cqw 6cqw',
          }}
        >
          {/* Topo: Tag, Título e Subtítulo */}
          <div className="flex flex-col" style={{ gap: '2cqw' }}>
            {banner.tag && (
              <Tag texto={banner.tag} className="bg-white/15 text-white ring-1 ring-white/30" variant={variant} />
            )}
            <h2 className="font-extrabold leading-[1.12] tracking-tight" style={t.titulo}>
              <TituloComDestaque texto={banner.titulo} destaqueClass="text-[#7CF0A8]" />
            </h2>
            {banner.subtitulo && (
              <p className="leading-snug text-emerald-50/90" style={t.subtitulo}>
                {banner.subtitulo}
              </p>
            )}
          </div>

          {/* Centro: Chat Realista do WhatsApp */}
          <div
            className="my-auto bg-[#ECE5DD] shadow-2xl overflow-hidden self-center"
            style={{ width: '86cqw', borderRadius: '3cqw' }}
          >
            <div
              className="flex items-center bg-[#075E54] text-white"
              style={{ gap: '2cqw', padding: '2cqw 3cqw' }}
            >
              <div
                className="rounded-full bg-white flex items-center justify-center shrink-0"
                style={{ width: '6.5cqw', height: '6.5cqw' }}
              >
                <WhatsAppIcon className="w-[60%] h-[60%] fill-[#25D366]" />
              </div>
              <div className="leading-tight">
                <div className="font-bold" style={fs('max(12px, 3.2cqw)')}>
                  Lopes e Lopes Franca
                </div>
                <div className="text-emerald-100/80" style={fs('max(10px, 2.5cqw)')}>
                  online agora
                </div>
              </div>
            </div>
            <div className="flex flex-col" style={{ gap: '1.8cqw', padding: '3cqw' }}>
              <div
                className="self-end max-w-[85%] bg-[#DCF8C6] text-slate-800 shadow-xs"
                style={{
                  ...balao,
                  padding: '1.6cqw 2.6cqw',
                  borderRadius: '2cqw 2cqw 0.5cqw 2cqw',
                }}
              >
                Bom dia! Preciso de cimento e areia pra minha obra.
              </div>
              <div
                className="self-start max-w-[85%] bg-white text-slate-800 shadow-xs"
                style={{
                  ...balao,
                  padding: '1.6cqw 2.6cqw',
                  borderRadius: '2cqw 2cqw 2cqw 0.5cqw',
                }}
              >
                Bom dia! Orçamento pronto em minutos. Quer agendar?
              </div>
              <div
                className="self-end max-w-[85%] bg-[#DCF8C6] text-slate-800 shadow-xs"
                style={{
                  ...balao,
                  padding: '1.6cqw 2.6cqw',
                  borderRadius: '2cqw 2cqw 0.5cqw 2cqw',
                }}
              >
                Pode sim! 👍
              </div>
            </div>
          </div>

          {/* Rodapé: Botão CTA do WhatsApp */}
          <div>
            <Cta
              texto={banner.cta}
              className="bg-white text-[#075E54] shadow-xl w-full justify-center"
              variant={variant}
              icone={<WhatsAppIcon className="w-[1.25em] h-[1.25em] fill-[#25D366]" />}
            />
          </div>
        </div>
      </div>
    );
  }

  // Desktop (preservado)
  const balaoDesktop = fs('max(10px, 1.05cqw)');
  return (
    <div
      className="relative w-full h-full overflow-hidden bg-gradient-to-br from-[#064e46] via-[#075E54] to-[#128C7E]"
      style={{ containerType: 'inline-size' }}
    >
      {/* Círculos decorativos */}
      <div
        className="absolute rounded-full border border-white/10"
        style={{ width: '42cqw', height: '42cqw', right: '8cqw', top: '-6cqw' }}
      />
      <div
        className="absolute rounded-full border border-white/10"
        style={{ width: '58cqw', height: '58cqw', right: '0cqw', top: '-14cqw' }}
      />

      {/* Textos */}
      <div
        className="absolute inset-y-0 flex flex-col justify-center text-white"
        style={{
          left: '6cqw',
          width: '46cqw',
          gap: ESPACO.desktop.gap,
        }}
      >
        {banner.tag && (
          <Tag texto={banner.tag} className="bg-white/15 text-white ring-1 ring-white/30" variant={variant} />
        )}
        <h2 className="font-extrabold leading-[1.05] tracking-tight line-clamp-2" style={t.titulo}>
          <TituloComDestaque texto={banner.titulo} destaqueClass="text-[#7CF0A8]" />
        </h2>
        {banner.subtitulo && (
          <p className="leading-snug text-emerald-50/90 line-clamp-2" style={t.subtitulo}>
            {banner.subtitulo}
          </p>
        )}
        <Cta
          texto={banner.cta}
          className="bg-white text-[#075E54]"
          variant={variant}
          icone={<WhatsAppIcon className="w-[1.2em] h-[1.2em] fill-[#25D366]" />}
        />
      </div>

      {/* Ilustração conversa no desktop */}
      <div
        className="absolute top-1/2 -translate-y-1/2 bg-[#ECE5DD] shadow-2xl overflow-hidden"
        style={{ right: '9cqw', width: '29cqw', borderRadius: '1.4cqw' }}
      >
        <div className="flex items-center bg-[#075E54] text-white" style={{ gap: '0.8cqw', padding: '0.9cqw 1.2cqw' }}>
          <div className="rounded-full bg-white flex items-center justify-center shrink-0" style={{ width: '2.6cqw', height: '2.6cqw' }}>
            <WhatsAppIcon className="w-[60%] h-[60%] fill-[#25D366]" />
          </div>
          <div className="leading-tight">
            <div className="font-bold" style={fs('max(11px, 1.1cqw)')}>Lopes e Lopes</div>
            <div className="text-emerald-100/80" style={fs('max(9px, 0.85cqw)')}>online</div>
          </div>
        </div>
        <div className="flex flex-col" style={{ gap: '0.7cqw', padding: '1.2cqw' }}>
          <div className="self-end max-w-[85%] bg-[#DCF8C6] text-slate-800 shadow-sm" style={{ ...balaoDesktop, padding: '0.6cqw 0.9cqw', borderRadius: '0.8cqw 0.8cqw 0.2cqw 0.8cqw' }}>
            Bom dia! Preciso de 20 sacos de cimento e 3 m³ de areia.
          </div>
          <div className="self-start max-w-[85%] bg-white text-slate-800 shadow-sm" style={{ ...balaoDesktop, padding: '0.6cqw 0.9cqw', borderRadius: '0.8cqw 0.8cqw 0.8cqw 0.2cqw' }}>
            Bom dia! Orçamento pronto. Posso agendar a entrega?
          </div>
          <div className="self-end max-w-[85%] bg-[#DCF8C6] text-slate-800 shadow-sm" style={{ ...balaoDesktop, padding: '0.6cqw 0.9cqw', borderRadius: '0.8cqw 0.8cqw 0.2cqw 0.8cqw' }}>
            Pode sim! 👍
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------- Renderizador Universal de Slide -------------------- */

export function BannerSlideContent({
  banner,
  variant,
  priority = false,
}: {
  banner: BannerConfig;
  variant: BannerVariant;
  priority?: boolean;
}) {
  if (banner.tipo === 'imagem') {
    const src = variant === 'mobile' ? (banner.mobile || banner.desktop) : banner.desktop;
    return (
      <div className="relative w-full h-full bg-slate-900 overflow-hidden">
        <Image
          src={src}
          alt={banner.alt}
          fill
          priority={priority}
          className="object-cover"
          sizes="100vw"
        />
      </div>
    );
  }

  if (banner.tipo === 'produto') {
    return <BannerProdutoTemplate banner={banner} variant={variant} />;
  }

  if (banner.tipo === 'institucional') {
    return <BannerInstitucionalTemplate banner={banner} variant={variant} />;
  }

  if (banner.tipo === 'whatsapp') {
    return <BannerWhatsAppTemplate banner={banner} variant={variant} />;
  }

  return null;
}
