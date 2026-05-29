import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Tile } from '@/entities/tile';
import type { CartItem } from './types';

interface CartState {
  cart: CartItem[];
}

const initialCart: CartItem[] = [
  {
    tile: {
      id: 'ocean-wave',
      name: 'Ocean Wave',
      price: 28.0,
      color: 'from-blue-400 to-cyan-600',
      pattern: 'wave',
      image: '/tile_ocean_wave_pattern.png',
    },
    quantity: 150,
  },
  {
    tile: {
      id: 'forest-fern',
      name: 'Forest Fern',
      price: 30.0,
      color: 'from-emerald-500 to-green-700',
      pattern: 'fern',
      image: '/tile_forest_fern_pattern.png',
    },
    quantity: 75,
  },
  {
    tile: {
      id: 'terracotta-dot',
      name: 'Terracotta Dot',
      price: 26.0,
      color: 'from-orange-400 to-amber-700',
      pattern: 'dot',
      image: '/tile_terracotta_dot_pattern.png',
    },
    quantity: 200,
  },
  {
    tile: {
      id: 'yellow-star',
      name: 'Yellow Star',
      price: 29.0,
      color: 'from-yellow-300 to-amber-500',
      pattern: 'star',
      image: '/tile_yellow_star_pattern.png',
    },
    quantity: 50,
  },
];

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

export const selectCartTotalQuantity = (state: CartState) => state.cart.reduce((sum, item) => sum + item.quantity, 0);

export const { addToCart, updateQuantity, removeFromCart, clearCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
export type { CartState };
