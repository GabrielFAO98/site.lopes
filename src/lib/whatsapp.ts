import { Product, QuoteItem } from '@/types';
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
export function getProductWhatsAppUrl(product: Product, currentUrl?: string): string {
  const priceText = product.price !== null ? formatCurrency(product.price) : 'Sob Consulta';
  const urlText = currentUrl || `${process.env.NEXT_PUBLIC_SITE_URL || 'https://site-lopes.vercel.app'}/produto/${product.slug}`;

  const message = [
    `Olá, equipe *${STORE_CONFIG.shortName}*! 👋`,
    `Gostaria de solicitar um orçamento para o seguinte produto:\n`,
    `📦 *Item:* ${product.name}`,
    `🏷️ *Código/SKU:* ${product.sku}`,
    `🏭 *Marca:* ${product.brand}`,
    `💰 *Preço:* ${priceText} (${product.unit})`,
    `🔗 *Link:* ${urlText}\n`,
    `Vocês possuem para pronta entrega em Franca - SP? Poderiam me passar as condições de pagamento?`,
  ].join('\n');

  return `${WHATSAPP_BASE_URL}?phone=${STORE_CONFIG.whatsapp}&text=${encodeURIComponent(message)}`;
}

/**
 * Gera a URL do WhatsApp para cotação com múltiplos itens da "Lista de Orçamento"
 */
export function getQuoteListWhatsAppUrl(items: QuoteItem[], customerBairro?: string): string {
  if (items.length === 0) return '';

  const itemsList = items
    .map((item, index) => {
      const priceText = item.product.price ? formatCurrency(item.product.price * item.quantity) : 'A calcular';
      return `${index + 1}. *${item.product.name}*\n   - Qtd: ${item.quantity} ${item.product.unit} | SKU: ${item.product.sku} | Subtotal: ${priceText}`;
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
