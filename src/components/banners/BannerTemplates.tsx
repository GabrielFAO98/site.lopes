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
 * Cada modelo tem uma versão 'desktop' (proporção larga) e 'mobile' (mais alta).
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

/** Tamanhos de texto por variante (desktop = referência 1600px, mobile = referência 400px) */
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
    tag: fs('2.7cqw'),
    titulo: fs('6.6cqw'),
    subtitulo: fs('max(11px, 3.3cqw)'),
    preco: fs('5.6cqw'),
    precoLegenda: fs('max(10px, 3cqw)'),
    cta: fs('max(11px, 3.4cqw)'),
    topico: fs('max(11px, 3.3cqw)'),
  },
};

const ESPACO = {
  desktop: { gap: '1.15cqw', tagPad: '0.35cqw 1.1cqw', ctaPad: '0.85cqw 2cqw', ctaMt: '0.5cqw' },
  mobile: { gap: '1.6cqw', tagPad: '0.8cqw 2.4cqw', ctaPad: '1.8cqw 4cqw', ctaMt: '0.8cqw' },
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
  const imagens = isDesktop ? banner.imagens.slice(0, 3) : banner.imagens.slice(0, 1);

  // Tamanho dos cartões de produto conforme a quantidade de fotos
  const cartao = isDesktop
    ? imagens.length === 1
      ? { w: '19cqw', h: '23cqw' }
      : imagens.length === 2
        ? { w: '15.5cqw', h: '20cqw' }
        : { w: '12.5cqw', h: '17cqw' }
    : { w: '31cqw', h: '42cqw' };

  return (
    <div
      className={`relative w-full h-full overflow-hidden ${tema.fundo}`}
      style={{ containerType: 'inline-size' }}
    >
      {/* Faixa diagonal da marca */}
      <div
        className="absolute inset-0 bg-white/15"
        style={{
          clipPath: isDesktop
            ? 'polygon(61.6% 0, 62.9% 0, 52.9% 100%, 51.6% 100%)'
            : 'polygon(67.4% 0, 68.9% 0, 56.9% 100%, 55.4% 100%)',
        }}
      />
      <div
        className={`absolute inset-0 ${tema.forma}`}
        style={{
          clipPath: isDesktop
            ? 'polygon(64% 0, 100% 0, 100% 100%, 54% 100%)'
            : 'polygon(70% 0, 100% 0, 100% 100%, 58% 100%)',
        }}
      />

      {/* Textos */}
      <div
        className="absolute inset-y-0 flex flex-col justify-center text-white"
        style={{
          left: isDesktop ? '6cqw' : '5.5cqw',
          width: isDesktop ? '46cqw' : '54cqw',
          gap: ESPACO[variant].gap,
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
          right: isDesktop ? '3cqw' : '3cqw',
          width: isDesktop ? '42cqw' : '38cqw',
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
              borderRadius: isDesktop ? '1.4cqw' : '3.5cqw',
              padding: isDesktop ? '1cqw' : '2.5cqw',
              transform: imagens.length === 3 && i === 1 ? 'translateY(-1.6cqw)' : undefined,
            }}
          >
            <div className="relative w-full h-full">
              <Image
                src={src}
                alt=""
                fill
                className="object-contain"
                sizes={isDesktop ? '20vw' : '35vw'}
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

  return (
    <div
      className="relative w-full h-full overflow-hidden bg-lopes-blue-900"
      style={{ containerType: 'inline-size' }}
    >
      <Image src={banner.fundo} alt="" fill className="object-cover" sizes="100vw" />
      <div
        className={`absolute inset-0 ${
          isDesktop
            ? 'bg-gradient-to-r from-lopes-blue-900 via-lopes-blue-900/85 to-lopes-blue-900/0'
            : 'bg-gradient-to-t from-lopes-blue-900 via-lopes-blue-900/85 to-lopes-blue-900/30'
        }`}
      />
      {/* Barra laranja da marca */}
      <div className="absolute inset-x-0 bottom-0 bg-lopes-orange" style={{ height: isDesktop ? '0.45cqw' : '1.2cqw' }} />

      <div
        className={`absolute flex flex-col text-white ${isDesktop ? 'inset-y-0 justify-center' : 'inset-x-0 bottom-0'}`}
        style={{
          left: isDesktop ? '6cqw' : '5.5cqw',
          right: isDesktop ? undefined : '5.5cqw',
          width: isDesktop ? '50cqw' : undefined,
          paddingBottom: isDesktop ? undefined : '6cqw',
          gap: ESPACO[variant].gap,
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
            className={`flex text-blue-50 ${isDesktop ? 'flex-wrap' : 'flex-col'}`}
            style={{ ...t.topico, columnGap: '1.8cqw', rowGap: isDesktop ? '0.5cqw' : '1cqw' }}
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
  const balao = fs('max(10px, 1.05cqw)');

  return (
    <div
      className="relative w-full h-full overflow-hidden bg-gradient-to-br from-[#064e46] via-[#075E54] to-[#128C7E]"
      style={{ containerType: 'inline-size' }}
    >
      {/* Círculos decorativos */}
      <div
        className="absolute rounded-full border border-white/10"
        style={{ width: isDesktop ? '42cqw' : '80cqw', height: isDesktop ? '42cqw' : '80cqw', right: isDesktop ? '8cqw' : '-22cqw', top: isDesktop ? '-6cqw' : '-9cqw' }}
      />
      <div
        className="absolute rounded-full border border-white/10"
        style={{ width: isDesktop ? '58cqw' : '110cqw', height: isDesktop ? '58cqw' : '110cqw', right: isDesktop ? '0cqw' : '-37cqw', top: isDesktop ? '-14cqw' : '-24cqw' }}
      />

      {/* Textos */}
      <div
        className="absolute inset-y-0 flex flex-col justify-center text-white"
        style={{
          left: isDesktop ? '6cqw' : '5.5cqw',
          width: isDesktop ? '46cqw' : '58cqw',
          gap: ESPACO[variant].gap,
        }}
      >
        {banner.tag && <Tag texto={banner.tag} className="bg-white/15 text-white ring-1 ring-white/30" variant={variant} />}
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

      {/* Ilustração: conversa no desktop, ícone no celular */}
      {isDesktop ? (
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
            <div className="self-end max-w-[85%] bg-[#DCF8C6] text-slate-800 shadow-sm" style={{ ...balao, padding: '0.6cqw 0.9cqw', borderRadius: '0.8cqw 0.8cqw 0.2cqw 0.8cqw' }}>
              Bom dia! Preciso de 20 sacos de cimento e 3 m³ de areia.
            </div>
            <div className="self-start max-w-[85%] bg-white text-slate-800 shadow-sm" style={{ ...balao, padding: '0.6cqw 0.9cqw', borderRadius: '0.8cqw 0.8cqw 0.8cqw 0.2cqw' }}>
              Bom dia! Orçamento pronto. Posso agendar a entrega?
            </div>
            <div className="self-end max-w-[85%] bg-[#DCF8C6] text-slate-800 shadow-sm" style={{ ...balao, padding: '0.6cqw 0.9cqw', borderRadius: '0.8cqw 0.8cqw 0.2cqw 0.8cqw' }}>
              Pode sim! 👍
            </div>
          </div>
        </div>
      ) : (
        <div
          className="absolute top-1/2 -translate-y-1/2 rounded-full bg-white shadow-2xl flex items-center justify-center"
          style={{ right: '7cqw', width: '28cqw', height: '28cqw' }}
        >
          <WhatsAppIcon className="w-[58%] h-[58%] fill-[#25D366]" />
        </div>
      )}
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
      <div className="relative w-full h-full">
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

