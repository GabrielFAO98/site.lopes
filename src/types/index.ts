export interface Product {
  id: string;
  sku: string;
  name: string;
  slug: string;
  description: string;
  price: number | null; // null quando for "sob consulta"
  priceFormatted?: string;
  unit: string; // 'UN', 'Saco 50kg', 'Barra 3m', 'Lata 18L', 'Metro', 'Caixa'
  departmentId: string;
  departmentName: string;
  category: string;
  brand: string;
  inStock: boolean;
  stockBadge?: 'Pronta Entrega' | 'Últimas Unidades' | 'Sob Encomenda';
  featured: boolean;
  images: string[];
  technicalSpecs: Record<string, string>;
  applications: string[];
  warranty?: string;
  relatedSkus?: string[];
  variationType?: string; // Ex: 'Cor', 'Voltagem', 'Espessura', 'Modelo', 'Medida'
  variations?: ProductVariation[];
  detailedDescription?: string;
  yieldInfo?: string;
  faq?: ProductFaqItem[];
}

export interface ProductFaqItem {
  question: string;
  answer: string;
}

export interface ProductVariation {
  name: string;          // Ex: "Preto Fosco", "1.5 mm", "220V", "Azul"
  sku: string;           // Código específico no OrgSystem daquela variação
  price?: number | null; // Preço específico opcional da variação (se for diferente do preço base)
  hex?: string;          // Cor em hexadecimal opcional (ex: "#000000", "#FF0000") para exibir bolinha colorida
  image?: string;        // Foto opcional específica desta variação
  inStock?: boolean;     // Disponibilidade opcional
}

export interface Department {
  id: string;
  slug: string;
  name: string;
  description: string;
  iconName: string;
  color: string;
  image?: string;
}

export interface QuoteItem {
  product: Product;
  quantity: number;
  selectedVariation?: ProductVariation;
}

export interface StoreInfo {
  name: string;
  shortName: string;
  phone: string;
  whatsapp: string;
  whatsappDisplay: string;
  email: string;
  address: string;
  neighborhood: string;
  city: string;
  state: string;
  cep: string;
  instagram?: string;
  instagramDisplay?: string;
  openingHours: {
    weekdays: string;
    saturday: string;
    sunday?: string;
  };
  cnpj?: string;
  ie?: string;
}
