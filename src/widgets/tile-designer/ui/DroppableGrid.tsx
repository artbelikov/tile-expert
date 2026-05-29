import { useDroppable } from '@dnd-kit/core';
import type { ReactNode } from 'react';
import { cn } from '@/shared/lib/cn';

const SCROLL_CONTAINER = 'max-h-palette custom-scrollbar';

interface DroppableGridProps {
  children: ReactNode;
}

export function DroppableGrid({ children }: DroppableGridProps) {
  const { setNodeRef } = useDroppable({
    id: 'tile-grid',
  });

  return (
    <div
      ref={setNodeRef}
      className={cn('flex-1 overflow-auto', SCROLL_CONTAINER, 'p-6 select-none bg-surface-table')}
      id="tile-grid-container"
    >
      {children}
    </div>
  );
}
