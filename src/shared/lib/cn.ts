import { type ClassValue, clsx } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        'text-label-sm',
        'text-body-md',
        'text-body-lg',
        'text-heading-sm',
        'text-heading-md',
        'text-heading-lg',
        'text-heading-xl',
        'text-display',
        'text-display-lg',
        'text-section-title',
        'text-section-title-lg',
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return customTwMerge(clsx(inputs));
}
