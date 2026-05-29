import { configureStore } from '@reduxjs/toolkit';
import { cartReducer } from '@/entities/cart';
import { tileReducer } from '@/entities/tile';

export const store = configureStore({
  reducer: {
    tile: tileReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
