import React from 'react';
import { cn } from '@/shared/lib/cn';
import styles from './CompoundBackground.module.css';

interface CompoundBackgroundProps {
  children: React.ReactNode;
}

export function CompoundBackground({ children }: CompoundBackgroundProps) {
  return (
    <div className="relative min-h-content flex-1 flex flex-col w-full pt-4 md:pt-8 md:px-[130px] px-[60px]">
      <div className="hidden lg:block pointer-events-none select-none">
        <div className={cn('absolute left-0 top-[152px] bottom-0 w-[83.5px] z-10', styles.borderLeft)} />
        <div className={cn('absolute right-0 top-[152px] bottom-0 w-[83.5px] z-10', styles.borderRight)} />
        <div className={cn('absolute left-0 top-0 w-[402.5px] h-[152.5px] z-20', styles.topLeft)} />
        <div className={cn('absolute right-0 top-0 w-[402.5px] h-[155px] z-20', styles.topRight)} />
        <div className={cn('absolute left-0 bottom-0 w-[554px] h-[171.5px] z-30 bg-background', styles.bottomLeft)} />
        <div className={cn('absolute right-0 bottom-0 w-[544.5px] h-[171.5px] z-30 bg-background', styles.bottomRight)} />
      </div>
      <div className="block lg:hidden pointer-events-none select-none">
        <div className={cn('absolute left-0 top-0 w-[35.5px] h-[104.5px] z-20', styles.mobileTopLeft)} />
        <div className={cn('absolute right-0 top-0 w-[31px] h-[104.75px] z-20', styles.mobileTopRight)} />
        <div className={cn('absolute left-0 bottom-0 w-[218px] h-[128px] z-30', styles.mobileBottomLeft)} />
        <div className={cn('absolute right-0 bottom-0 w-[337px] h-[183px] z-30', styles.mobileBottomRight)} />
      </div>
      <div className="relative z-40 flex-1 flex flex-col">{children}</div>
    </div>
  );
}
