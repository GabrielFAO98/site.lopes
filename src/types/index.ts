export interface Product {
  id: string;
  sku: string;
  name: string;
  slug: string;
  description: string;
  price: number | null; // null quando for "sob consulta"
  priceFormatted?: string;
  wholesaleNotice?: string; // ex: "Consulte desconto para carga fechada ou pedidos de obra"
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
}

export interface Department {
  id: string;
  slug: string;
  name: string;
  description: string;
  iconName: string;
  color: string;
}

export interface QuoteItem {
  product: Product;
  quantity: number;
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
  openingHours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
}
