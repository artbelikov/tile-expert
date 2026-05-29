import type { CartState } from './slice';

export const selectCartTotalQuantity = (state: CartState) => state.cart.reduce((sum, item) => sum + item.quantity, 0);

export const selectSubtotal = (state: CartState) => state.cart.reduce((sum, item) => sum + item.quantity * item.tile.price, 0);

export const selectShipping = (state: CartState) => {
  const subtotal = selectSubtotal(state);
  return subtotal === 0 ? 0 : subtotal > 500 ? 0 : 25;
};

export const selectGrandTotal = (state: CartState) => selectSubtotal(state) + selectShipping(state);
