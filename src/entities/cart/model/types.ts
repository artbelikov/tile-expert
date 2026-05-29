import type { Tile } from '@/entities/tile';

export interface CartItem {
  tile: Tile;
  quantity: number;
}

export interface CheckoutReceipt {
  orderId: string;
  name: string;
  email: string;
  subtotal: number;
  shipping: number;
  grandTotal: number;
  paymentMethod: string;
  itemsCount: number;
}
