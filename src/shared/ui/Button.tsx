import React, { ButtonHTMLAttributes } from 'react';
import { cn } from '@/shared/lib/cn';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizeClasses = {
  sm: 'h-[40px] text-[14px] px-3',
  md: 'h-[48px] text-[16px] px-4',
  lg: 'h-[56px] text-[20px] px-5',
  xl: 'h-[68px] text-section-title-lg px-6',
};

export function Button({ children, size = 'md', className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'w-full flex items-center justify-center bordered rounded-lg bg-accent-navy text-text-on-dark font-bebas tracking-wider hover:bg-accent-navy-hover active:scale-[0.98] transition-all duration-100 cursor-pointer select-none',
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
