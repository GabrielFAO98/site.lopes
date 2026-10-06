import { Product, QuoteItem, ProductVariation } from '@/types';
import { STORE_CONFIG } from './store-config';

const WHATSAPP_BASE_URL = 'https://api.whatsapp.com/send';

/**
 * Formata um valor numérico para Moeda Brasileira (R$)
 */
export function formatCurrency(value: number | null | undefined): string {
  if (value === null || value === undefined) return 'Sob consulta';
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

/**
 * Gera a URL do WhatsApp para solicitação de orçamento de um produto individual
 */
export function getProductWhatsAppUrl(
  product: Product, 
  currentUrl?: string,
  selectedVariation?: ProductVariation
): string {
  const priceToUse = (selectedVariation && selectedVariation.price !== undefined && selectedVariation.price !== null) 
    ? selectedVariation.price 
    : product.price;

  const priceText = priceToUse !== null ? formatCurrency(priceToUse) : 'Sob Consulta';
  const urlText = currentUrl || `${process.env.NEXT_PUBLIC_SITE_URL || 'https://site-lopes.vercel.app'}/produto/${product.slug}`;
  const effectiveSku = selectedVariation ? selectedVariation.sku : product.sku;

  const messageLines = [
    `Olá, equipe *${STORE_CONFIG.shortName}*! 👋`,
    `Gostaria de solicitar um orçamento para o seguinte produto:\n`,
    `📦 *Item:* ${product.name}`,
  ];

  if (selectedVariation) {
    const varLabel = product.variationType || 'Opção';
    messageLines.push(`⚙️ *${varLabel}:* ${selectedVariation.name}`);
  }

  messageLines.push(
    `🏷️ *Código/SKU:* ${effectiveSku}`,
    `🏭 *Marca:* ${product.brand}`,
    `💰 *Preço:* ${priceText} (${product.unit})`,
    `🔗 *Link:* ${urlText}\n`,
    `Vocês possuem para pronta entrega em Franca - SP? Poderiam me passar as condições de pagamento?`
  );

  return `${WHATSAPP_BASE_URL}?phone=${STORE_CONFIG.whatsapp}&text=${encodeURIComponent(messageLines.join('\n'))}`;
}

/**
 * Gera a URL do WhatsApp para cotação com múltiplos itens da "Lista de Orçamento"
 */
export function getQuoteListWhatsAppUrl(items: QuoteItem[], customerBairro?: string): string {
  if (items.length === 0) return '';

  const itemsList = items
    .map((item, index) => {
      const itemPrice = (item.selectedVariation && item.selectedVariation.price !== undefined && item.selectedVariation.price !== null)
        ? item.selectedVariation.price
        : item.product.price;
      const priceText = itemPrice ? formatCurrency(itemPrice * item.quantity) : 'A calcular';
      const effectiveSku = item.selectedVariation ? item.selectedVariation.sku : item.product.sku;
      const varSuffix = item.selectedVariation ? ` (${item.selectedVariation.name})` : '';

      return `${index + 1}. *${item.product.name}${varSuffix}*\n   - Qtd: ${item.quantity} ${item.product.unit} | SKU: ${effectiveSku} | Subtotal: ${priceText}`;
    })
    .join('\n\n');

  const message = [
    `Olá, equipe *${STORE_CONFIG.shortName}*! 👋`,
    `Gostaria de solicitar uma cotação para a seguinte *Lista de Materiais de Obra*:\n`,
    itemsList,
    '',
    customerBairro
      ? `📍 *Bairro para entrega em Franca:* ${customerBairro}`
      : `📍 Gostaria de saber o valor total e o prazo de entrega/retirada em Franca - SP.`,
    `\nFico no aguardo do retorno! Obrigado(a).`,
  ].join('\n');

  return `${WHATSAPP_BASE_URL}?phone=${STORE_CONFIG.whatsapp}&text=${encodeURIComponent(message)}`;
}
