import React, { InputHTMLAttributes } from 'react';
import { cn } from '@/shared/lib/cn';

const errorText = 'text-error text-label-sm font-bold font-sans mt-1';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  variant?: 'inline' | 'stacked';
  containerClassName?: string;
  labelClassName?: string;
  error?: string;
}

export function Input({
  label,
  variant = 'inline',
  containerClassName,
  labelClassName,
  error,
  className,
  ...props
}: InputProps) {
  if (variant === 'stacked') {
    return (
      <div className={cn('flex flex-col w-full', containerClassName)}>
        {label && (
          <label className={cn('font-bebas text-heading-sm tracking-wide text-ink select-none mb-1', labelClassName)}>
            {label}
          </label>
        )}
        <input
          className={cn(
            'w-full p-2 bg-surface-field bordered rounded-sm outline-none font-sans font-bold text-body-lg text-ink',
            error && 'border-error',
            className,
          )}
          {...props}
        />
        {error && <span className={errorText}>{error}</span>}
      </div>
    );
  }

  return (
    <div className={cn('flex flex-col w-full', containerClassName)}>
      <div className="flex items-end gap-2 w-full">
        {label && (
          <label className={cn('font-bebas tracking-wide text-ink whitespace-nowrap select-none', labelClassName || 'text-heading-sm')}>
            {label}
          </label>
        )}
        <input
          className={cn(
            'flex-1 bg-transparent border-0 border-b-3 outline-none font-sans font-semibold text-body-lg text-ink-soft pb-0.5 min-w-0',
            error ? 'border-error' : 'border-ink',
            className,
          )}
          {...props}
        />
      </div>
      {error && <span className={errorText}>{error}</span>}
    </div>
  );
}
