import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SEED_CART_ITEMS, SEED_PALETTE } from '@/shared/lib/seed-data';
import type { Tile } from '@/shared/types/tile';
import type { CartItem } from './types';

interface CartState {
  cart: CartItem[];
}

const initialCart: CartItem[] = SEED_CART_ITEMS.map(({ tileId, quantity }) => {
  const tile = SEED_PALETTE.find((t) => t.id === tileId)!;
  return { tile, quantity };
});

const initialState: CartState = {
  cart: initialCart,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<{ tile: Tile; quantity: number }>) {
      const { tile, quantity } = action.payload;
      const existing = state.cart.find((i) => i.tile.id === tile.id);
      if (existing) {
        existing.quantity += quantity;
      } else {
        state.cart.push({ tile, quantity });
      }
    },
    updateQuantity(state, action: PayloadAction<{ tileId: string; quantity: number }>) {
      const { tileId, quantity } = action.payload;
      const item = state.cart.find((i) => i.tile.id === tileId);
      if (item) {
        item.quantity = Math.max(0, quantity);
      }
    },
    removeFromCart(state, action: PayloadAction<string>) {
      state.cart = state.cart.filter((item) => item.tile.id !== action.payload);
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const { addToCart, updateQuantity, removeFromCart, clearCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
export type { CartState };
