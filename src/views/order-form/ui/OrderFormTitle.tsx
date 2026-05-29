import React from 'react';
import { cn } from '@/shared/lib/cn';

const decorImg = 'w-auto object-contain shrink-0 hover:scale-105 transition-transform duration-300 ease-out';
const sideDecorImg =
  'w-auto object-contain shrink-0 hover:scale-110 transition-transform duration-300 ease-out';

export function OrderFormTitle() {
  return (
    <div className="flex items-center justify-center gap-3 sm:gap-5 md:gap-6 lg:gap-7 xl:gap-8 select-none font-bebas text-ink text-center">
      <img src="/logo_bank.png" alt="Bank Logo" className={cn('h-[clamp(60px,8vw,105px)]', decorImg)} />

      <div className="flex flex-col items-center justify-center">
        <h1 className="text-[clamp(44px,5vw,60px)] font-normal leading-none tracking-wide uppercase select-none">
          CERAMIC TILE ORDER FORM
        </h1>

        <div className="flex items-center justify-center gap-1.5 sm:gap-4 mt-1 sm:mt-2">
          <img src="/title_left.png" alt="" className={cn(sideDecorImg, 'h-[clamp(20px,3vw,40px)]', 'hover:-rotate-3')} />
          <span className="text-[clamp(24px,3vw,35px)] font-normal leading-none tracking-wider uppercase select-none">
            THE ARTISAN KILN
          </span>
          <img src="/title_right.png" alt="" className={cn(sideDecorImg, 'h-[clamp(20px,3vw,40px)]', 'hover:rotate-3')} />
        </div>
      </div>

      <img src="/logo_kiln.png" alt="Kiln Logo" className={cn('h-[clamp(56px,7vw,99px)]', decorImg)} />
    </div>
  );
}
