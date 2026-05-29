import React from 'react';
import { cn } from '@/shared/lib/cn';

const footerText = 'text-heading-lg font-bebas tracking-wider text-ink-soft';
const decorImg = 'hidden lg:block absolute w-auto object-contain shrink-0 pointer-events-none -z-10';

export function Footer() {
  const links = [
    { name: 'Terms of Service', href: '#terms' },
    { name: 'Privacy Policy', href: '#privacy' },
    { name: 'Shipping Info', href: '#shipping' },
    { name: 'Contact Us', href: '#contact' },
  ];

  return (
    <footer className="w-full pt-4 pb-12 md:p-6 flex items-center justify-center select-none">
      <div className="relative gap-2 text-center px-4 w-fit">
        <img src="/hands_holding_tile_flower.png" alt="" className={cn(decorImg, 'right-full bottom-[-24px] h-[250px] mr-5')} />
        <nav className={cn('flex flex-wrap items-center justify-center gap-x-2 gap-y-2', footerText)}>
          {links.map((link, idx) => (
            <React.Fragment key={link.name}>
              {idx > 0 && <span className="text-ink-soft">|</span>}
              <a href={link.href} className="hover:text-accent-warm transition-colors duration-200 uppercase">
                {link.name}
              </a>
            </React.Fragment>
          ))}
        </nav>
        <div className={footerText}>&copy; 2026 THE ARTISAN KILN. ALL RIGHTS RESERVED.</div>
        <img src="/illustration_palette.png" alt="" className={cn(decorImg, 'left-full bottom-[-24px] h-[225px] ml-5')} />
      </div>
    </footer>
  );
}
