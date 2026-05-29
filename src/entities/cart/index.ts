export type { CartState } from './model/slice';
export {
  addToCart,
  cartReducer,
  clearCart,
  removeFromCart,
  selectCartTotalQuantity,
  updateQuantity,
} from './model/slice';
export type { CartItem, CheckoutReceipt } from './model/types';
