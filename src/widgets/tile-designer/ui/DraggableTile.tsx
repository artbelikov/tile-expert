import { useDraggable } from '@dnd-kit/core';
import { cn } from '@/shared/lib/cn';
import type { Tile } from '@/shared/types/tile';

const CENTERED_FLEX = 'flex items-center justify-center';
const FULL_IMAGE = 'w-full h-full object-cover pointer-events-none';

interface DraggableTileProps {
  tile: Tile;
  isDragging: boolean;
  onClick: () => void;
}

export function DraggableTile({ tile, isDragging, onClick }: DraggableTileProps) {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: tile.id,
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      onClick={onClick}
      className={cn(
        'relative w-20 h-20 rounded-md border-3',
        CENTERED_FLEX,
        'overflow-hidden cursor-pointer hover:scale-105 transition-all select-none outline-none border-ink',
        isDragging && 'opacity-0 pointer-events-none',
      )}
    >
      {tile.image ? (
        <img src={tile.image} alt={tile.name} className={FULL_IMAGE} />
      ) : (
        <div className={`w-full h-full bg-gradient-to-br ${tile.color}`} />
      )}
    </div>
  );
}
