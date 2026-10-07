import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { STORE_CONFIG, STORE_FULL_ADDRESS } from '@/lib/store-config';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { QuoteProvider } from '@/components/QuoteContext';
import { QuoteDrawer } from '@/components/QuoteDrawer';
import { WhatsAppFloatingButton } from '@/components/WhatsAppFloatingButton';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: `${STORE_CONFIG.name} | Materiais para Construção em Franca - SP`,
    template: `%s | ${STORE_CONFIG.shortName} Franca - SP`,
  },
  description:
    'Catálogo online e vitrine de materiais para construção em Franca-SP. Hidráulica, elétrica, tintas, ferramentas, cimento e acabamento com pronta entrega e cotação rápida no WhatsApp.',
  keywords: [
    'materiais de construção franca sp',
    'hidraulica franca sp',
    'eletrica franca',
    'cimento pronta entrega franca',
    'tubo tigre franca',
    'tintas franca',
    'lopes e lopes franca',
    'ferramentas obra franca',
  ],
  authors: [{ name: STORE_CONFIG.name }],
  creator: STORE_CONFIG.name,
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    siteName: STORE_CONFIG.name,
    title: `${STORE_CONFIG.name} | Materiais para Construção em Franca - SP`,
    description:
      'Catálogo online de materiais de construção em Franca-SP. Solicite orçamentos rápidos pelo WhatsApp com pronta entrega garantida.',
    images: [
      {
        url: '/images/logo.png',
        width: 800,
        height: 600,
        alt: STORE_CONFIG.name,
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HardwareStore',
    name: STORE_CONFIG.name,
    image: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/images/logo.png`,
    telephone: STORE_CONFIG.phone,
    email: STORE_CONFIG.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: STORE_CONFIG.address,
      addressLocality: STORE_CONFIG.city,
      addressRegion: STORE_CONFIG.state,
      postalCode: STORE_CONFIG.cep,
      addressCountry: 'BR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -20.5386,
      longitude: -47.4009,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '07:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '07:00',
        closes: '12:00',
      },
    ],
    priceRange: '$$',
  };

  return (
    <html lang="pt-BR" className={jakarta.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-slate-50 font-sans antialiased">
        <QuoteProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <QuoteDrawer />
          <WhatsAppFloatingButton />
        </QuoteProvider>
      </body>
    </html>
  );
}
