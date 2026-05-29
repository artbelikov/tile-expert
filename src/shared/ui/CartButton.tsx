'use client';

import { useSelector } from 'react-redux';
import type { RootState } from '@/app-layer/store';
import { selectCartTotalQuantity } from '@/entities/cart';

export function CartButton() {
  const totalQuantity = useSelector((state: RootState) => selectCartTotalQuantity(state.cart));

  return (
    <button type="button" className="relative shrink-0 interactive">
      <img src="/icon_cart_header.png" className="h-icon object-contain" alt="Shopping Cart" />
      {totalQuantity > 0 && (
        <span className="absolute top-0 right-0 bg-accent-gold bordered text-heading-sm font-bold leading-none px-1 py-0.5 rounded-full select-none">
          {totalQuantity}
        </span>
      )}
    </button>
  );
}
