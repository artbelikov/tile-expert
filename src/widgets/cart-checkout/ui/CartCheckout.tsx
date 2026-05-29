'use client';

import type { ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cn } from '@/shared/lib/cn';
import type { RootState } from '@/app-layer/store';
import { updateQuantity } from '@/entities/cart';
import { TileGraphic } from '@/entities/tile';

const thCell = 'py-3 px-2 text-center text-body-lg heading font-normal tracking-wider text-ink-soft w-[20%]';
const tdCell = 'p-2 text-center bordered-r';
const bracketWrap = 'flex items-center justify-center font-bebas text-heading-lg text-ink select-none';
const valueText = 'font-sans font-bold text-heading-sm text-ink';
const actionLabel = 'text-label-sm font-bold text-ink mt-1 uppercase select-none';
const actionBtn = 'interactive active:scale-95 duration-100';

function Brackets({ children }: { children: ReactNode }) {
  return (
    <>
      <span className="mr-1">[</span>
      {children}
      <span className="ml-1">]</span>
    </>
  );
}

function TotalRow({
  label,
  children,
  highlighted,
  connectTop,
}: {
  label: string;
  children: ReactNode;
  highlighted?: boolean;
  connectTop?: boolean;
}) {
  return (
    <div className={cn('flex items-center justify-end', !connectTop && '-mt-[3px]')}>
      <span className="text-heading-md tracking-wide mr-2 whitespace-nowrap">{label}</span>
      <div
        className={cn(
          'w-total px-2 py-1 text-center font-sans font-bold text-body-lg',
          connectTop ? 'border-3 border-t-0 border-ink' : 'bordered',
          highlighted && 'bg-surface-accent',
        )}
      >
        <Brackets>{children}</Brackets>
      </div>
    </div>
  );
}

export function CartCheckout() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.cart);

  const subtotal = cartItems.reduce((sum, item) => sum + item.quantity * item.tile.price, 0);
  const shipping = subtotal === 0 ? 0 : subtotal > 500 ? 0 : 25;
  const grandTotal = subtotal + shipping;

  return (
    <div className="w-full">
      <h2 className="text-display md:text-display-lg heading text-ink text-left">SHOPPING CART & DESIGN TOOL</h2>

      <div className="bordered bg-surface-table w-full overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-surface-table-head bordered-b">
                <th className={cn(thCell, 'bordered-r')}>TILE COLLECTION</th>
                <th className={cn(thCell, 'bordered-r')}>ITEM</th>
                <th className={cn(thCell, 'bordered-r')}>QUANTITY (sq. ft.)</th>
                <th className={cn(thCell, 'bordered-r')}>UNIT PRICE ($)</th>
                <th className={thCell}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => {
                const { tile, quantity } = item;
                const tileWithoutImage = { ...tile, image: undefined };

                return (
                  <tr key={tile.id} className="bordered-b last:border-b-0">
                    <td className={tdCell}>
                      <div className="flex flex-col items-center gap-1.5">
                        <TileGraphic tile={tileWithoutImage} size="md" />
                        <span className="font-bebas text-body-lg md:text-heading-sm text-ink tracking-wide select-none">{tile.name}</span>
                      </div>
                    </td>
                    <td className={tdCell}>
                      <div className="w-16 h-16 overflow-hidden mx-auto select-none">
                        {tile.image ? (
                          <img src={tile.image} alt={tile.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className={`w-full h-full bg-gradient-to-br ${tile.color}`} />
                        )}
                      </div>
                    </td>
                    <td className={tdCell}>
                      <div className={bracketWrap}>
                        <Brackets>
                          <input
                            type="number"
                            min="0"
                            value={quantity}
                            onChange={(e) => {
                              const val = Math.max(0, parseInt(e.target.value) || 0);
                              dispatch(updateQuantity({ tileId: tile.id, quantity: val }));
                            }}
                            className="w-16 text-center bg-transparent border-none outline-none font-sans font-bold text-heading-sm text-ink"
                          />
                        </Brackets>
                      </div>
                    </td>
                    <td className={tdCell}>
                      <div className={bracketWrap}>
                        <Brackets>
                          <span className={valueText}>${tile.price.toFixed(2)}</span>
                        </Brackets>
                      </div>
                    </td>
                    <td className="p-2 text-center">
                      <div className="flex items-center justify-center gap-4">
                        <div className="flex flex-col items-center">
                          <button
                            type="button"
                            onClick={() => dispatch(updateQuantity({ tileId: tile.id, quantity: quantity + 25 }))}
                            className={actionBtn}
                          >
                            <img src="/btn_add.png" alt="Add" className="size-icon-sm object-contain" />
                          </button>
                          <span className={actionLabel}>ADD</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <button
                            type="button"
                            onClick={() => dispatch(updateQuantity({ tileId: tile.id, quantity: 0 }))}
                            className={actionBtn}
                          >
                            <img src="/btn_remove.png" alt="Remove" className="size-icon-xs object-contain" />
                          </button>
                          <span className={actionLabel}>REMOVE</span>
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex flex-wrap-reverse items-center justify-between gap-6">
        <div className="hidden md:flex items-center gap-4">
          <img
            src="/hand_holding_tile_terracotta.png"
            alt="Hand holding tile"
            className="h-[72px] sm:h-[90px] w-auto object-contain shrink-0 select-none"
          />
          <button
            type="button"
            className="flex min-w-[160px] items-center gap-2 p-2 bordered rounded-sm bg-surface-accent font-bebas text-heading-sm leading-none text-ink uppercase select-none"
          >
            <span>+</span>
            <img src="/tile_empty_texture.png" alt="" className="w-8 h-8 border border-ink object-cover" />
            <span>ADD NEW TILE TO CART</span>
          </button>
        </div>

        <div className="flex flex-col font-bebas text-ink select-none grow">
          <TotalRow label="SUBTOTAL:" connectTop>{`$${subtotal.toFixed(2)}`}</TotalRow>
          <TotalRow label="SHIPPING:">{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</TotalRow>
          <TotalRow label="GRAND TOTAL:" highlighted>{`$${grandTotal.toFixed(2)}`}</TotalRow>
        </div>
      </div>
    </div>
  );
}
