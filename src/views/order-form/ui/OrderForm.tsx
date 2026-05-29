import React, { memo } from 'react';
import { cn } from '@/shared/lib/cn';
import { CartCheckout } from '@/widgets/cart-checkout';
import { CheckoutForm } from '@/widgets/checkout-form';
import { TileDesigner } from '@/widgets/tile-designer';
import { OrderFormTitle } from './OrderFormTitle';

const gridCell = 'w-full min-h-content min-w-0';

export function OrderForm() {
  return (
    <div className="flex flex-col gap-8 md:gap-12 w-full mx-auto">
      <OrderFormTitle />

      <div className="grid grid-cols-1 lg:grid-cols-[772fr_1002fr_587fr] gap-6 lg:gap-8 w-full">
        <div className={gridCell}>
          <CartCheckout />
        </div>

        <div className={cn(gridCell, 'hidden md:block')}>
          <TileDesigner />
        </div>

        <div className={gridCell}>
          <CheckoutForm />
        </div>
      </div>
    </div>
  );
}
