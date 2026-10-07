import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Phone, 
  MapPin, 
  Mail, 
  Clock, 
  ExternalLink,
  ShieldCheck,
  Truck,
  Instagram
} from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { STORE_CONFIG, GOOGLE_MAPS_URL } from '@/lib/store-config';
import { DEPARTMENTS } from '@/lib/departments';

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
        {/* Coluna 1: Sobre a Loja & Identidade */}
        <div className="space-y-4">
          <div className="bg-white p-2 rounded-lg inline-block">
            <div className="relative w-40 h-14">
              <Image
                src="/images/logo.png"
                alt="Lopes e Lopes Materiais para Construção"
                fill
                className="object-contain"
              />
            </div>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed">
            Sua loja completa de materiais para construção em Franca - SP. Do alicerce ao acabamento, oferecemos pronta entrega, preço justo e negociação direta no WhatsApp para sua obra.
          </p>
          <div className="flex items-center gap-2 text-xs text-lopes-orange-400 font-medium">
            <Truck className="w-4 h-4" />
            <span>Entregas rápidas para toda a cidade de Franca</span>
          </div>
        </div>

        {/* Coluna 2: Departamentos */}
        <div>
          <h4 className="text-white font-bold text-xs uppercase tracking-wider">
            Departamentos
          </h4>
          <div className="w-10 h-0.5 bg-lopes-orange rounded-full mt-1.5 mb-4" />
          <ul className="space-y-2 text-sm">
            {DEPARTMENTS.map((dept) => (
              <li key={dept.id}>
                <Link
                  href={`/produtos?depto=${dept.id}`}
                  className="hover:text-lopes-orange-400 transition-colors flex items-center justify-between"
                >
                  <span>{dept.name}</span>
                  <span className="text-slate-600 text-xs">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Coluna 3: Atendimento & Horários */}
        <div>
          <h4 className="text-white font-bold text-xs uppercase tracking-wider">
            Horário de Funcionamento
          </h4>
          <div className="w-10 h-0.5 bg-lopes-orange rounded-full mt-1.5 mb-4" />
          <div className="space-y-3 text-sm text-slate-300">
            <div className="flex items-start gap-2.5">
              <Clock className="w-4 h-4 text-lopes-orange-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-white">Segunda a Sexta:</p>
                <p className="text-slate-400">7h às 18h</p>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <Clock className="w-4 h-4 text-lopes-orange-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-white">Sábados:</p>
                <p className="text-slate-400">7h às 12h</p>
              </div>
            </div>
          </div>
        </div>

        {/* Coluna 4: Contato & Endereço em Franca */}
        <div>
          <h4 className="text-white font-bold text-xs uppercase tracking-wider">
            Onde Estamos e Contato
          </h4>
          <div className="w-10 h-0.5 bg-lopes-orange rounded-full mt-1.5 mb-4" />
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-lopes-orange-400 shrink-0 mt-1" />
              <div>
                <p className="text-white font-medium">{STORE_CONFIG.address}</p>
                <p className="text-slate-400">{STORE_CONFIG.neighborhood} — Franca - SP</p>
                <p className="text-slate-500 text-xs">CEP: {STORE_CONFIG.cep}</p>
                <a
                  href={GOOGLE_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-lopes-orange-400 hover:text-lopes-orange-300 font-medium mt-1"
                >
                  <span>Abrir no Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            <div className="flex items-center gap-2.5 pt-1">
              <Phone className="w-4 h-4 text-lopes-orange-400 shrink-0" />
              <a href={`tel:${STORE_CONFIG.phone.replace(/\D/g, '')}`} className="hover:text-white">
                {STORE_CONFIG.phone}
              </a>
            </div>

            <div className="flex items-center gap-2.5">
              <WhatsAppIcon className="w-4 h-4 text-lopes-whatsapp shrink-0" />
              <a
                href={`https://api.whatsapp.com/send?phone=${STORE_CONFIG.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white font-medium text-lopes-whatsapp"
              >
                {STORE_CONFIG.whatsappDisplay} (WhatsApp)
              </a>
            </div>

            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-slate-400 shrink-0" />
              <a href={`mailto:${STORE_CONFIG.email}`} className="text-xs hover:text-white truncate">
                {STORE_CONFIG.email}
              </a>
            </div>

            {/* Redes Sociais: Instagram no mesmo padrão dos dados de contato (ícone + texto clicável) */}
            {STORE_CONFIG.instagram && (
              <div className="flex items-center gap-2.5">
                <a
                  href={STORE_CONFIG.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 hover:text-white transition-colors group"
                  title="Siga a Lopes e Lopes no Instagram (@lopeselopes_mc)"
                >
                  <Instagram className="w-4 h-4 text-[#E4405F] shrink-0" />
                  <span>{STORE_CONFIG.instagramDisplay || '@lopeselopes_mc'}</span>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Faixa Inferior de Direitos e SEO */}
      <div className="max-w-7xl mx-auto px-4 pt-6 border-t border-slate-800 text-xs text-slate-500 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="space-y-1 text-center md:text-left">
          <p>© {new Date().getFullYear()} {STORE_CONFIG.name}. Todos os direitos reservados. Franca - SP.</p>
          <p className="text-[11px] text-slate-500">CNPJ: {STORE_CONFIG.cnpj} • Inscrição Estadual: {STORE_CONFIG.ie}</p>
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Catálogo e Vitrine Virtual Oficial</span>
          </span>
          <span>•</span>
          <span>Orçamentos e Negociações via WhatsApp</span>
        </div>
      </div>
    </footer>
  );
}
