'use client';

import React from 'react';
import { cn } from '@/shared/lib/cn';

export interface MenuItem {
  name: string;
  href: string;
}

export const menuItems: MenuItem[] = [
  { name: 'Home', href: '/' },
  { name: 'Shop', href: '#shop' },
  { name: 'Collections', href: '#collection' },
  { name: 'About us', href: '#about' },
  { name: 'FAQ', href: '#faq' },
  { name: 'Gallery', href: '#gallery' },
  { name: 'Blog', href: '#blog' },
];

interface MenuProps {
  className?: string;
  itemClassName?: string;
  onItemClick?: () => void;
}

export function Menu({ className, itemClassName, onItemClick }: MenuProps) {
  return (
    <nav
      className={cn('whitespace-nowrap min-w-0 overflow-x-auto no-scrollbar snap-x snap-mandatory shrink ml-auto mr-auto', className)}
      aria-label="Main Navigation"
    >
      <ul className="flex flex-nowrap items-center gap-10">
        {menuItems.map((item) => (
          <li key={item.name} className="snap-start">
            <a
              href={item.href}
              onClick={onItemClick}
              className={cn(
                'font-bebas text-heading-xl tracking-wider text-ink-soft hover:text-accent-warm transition-colors relative group py-2 block whitespace-nowrap',
                itemClassName,
              )}
            >
              {item.name}
              <span className="absolute bottom-1 left-0 w-0 h-0.5 bg-accent-warm transition-all duration-300 group-hover:w-full" />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
