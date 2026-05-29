import Link from 'next/link';
import React from 'react';
import { cn } from '@/shared/lib/cn';

interface LogoProps {
  className?: string;
  imageClassName?: string;
}

export function Logo({ className, imageClassName }: LogoProps) {
  return (
    <Link href="/" className={cn('py-5 inline-block shrink-0 interactive', className)}>
      <img src="/logo.png" alt="The Artisan Kiln" className={cn('w-logo object-contain', imageClassName)} />
    </Link>
  );
}
