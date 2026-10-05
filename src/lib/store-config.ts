import { StoreInfo } from '@/types';

export const STORE_CONFIG: StoreInfo = {
  name: process.env.NEXT_PUBLIC_STORE_NAME || 'Lopes e Lopes Materiais para Construção',
  shortName: 'Lopes e Lopes',
  phone: process.env.NEXT_PUBLIC_STORE_PHONE || '(16) 3725-2097',
  whatsapp: process.env.NEXT_PUBLIC_STORE_WHATSAPP || '5516999142727',
  whatsappDisplay: process.env.NEXT_PUBLIC_STORE_WHATSAPP_DISPLAY || '(16) 99914-2727',
  email: process.env.NEXT_PUBLIC_STORE_EMAIL || 'lopes.financeiro@hotmail.com',
  address: 'Av. Brasil, 3640',
  neighborhood: 'Jardim Paulistano',
  city: 'Franca',
  state: 'SP',
  cep: '14402-440',
  cnpj: '07.656.731/0001-39',
  ie: '310.400.671.116',
  openingHours: {
    weekdays: 'Segunda a Sexta: 07:30 às 18:00',
    saturday: 'Sábado: 07:30 às 12:30',
    sunday: 'Domingo e Feriados: Fechado',
  },
};

export const STORE_FULL_ADDRESS = `${STORE_CONFIG.address} ${STORE_CONFIG.neighborhood} - ${STORE_CONFIG.city} - ${STORE_CONFIG.state} CEP: ${STORE_CONFIG.cep}`;

// Gera o link do Google Maps para a loja
export const GOOGLE_MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `Lopes e Lopes Materiais para Construção ${STORE_FULL_ADDRESS}`
)}`;
