'use client';

import React from 'react';
import { cn } from '@/shared/lib/cn';

interface ProfileButtonProps {
  className?: string;
}

export function ProfileButton({ className }: ProfileButtonProps) {
  return (
    <button type="button" className={cn('flex items-center shrink-0 gap-3 interactive focus:outline-none select-none', className)}>
      <img src="/icon_user_header.png" className="size-icon object-contain" alt="User Profile" />
      <span className="bg-accent-navy text-text-on-dark whitespace-nowrap bordered font-sans font-semibold text-body-md px-2 py-2.5 rounded-xl leading-none flex items-center justify-center">
        A. Smith
      </span>
    </button>
  );
}
