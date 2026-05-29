import { memo } from 'react';
import { cn } from '@/shared/lib/cn';
import type { Tile } from '@/shared/types/tile';

const CENTERED_FLEX = 'flex items-center justify-center';
const FULL_IMAGE = 'w-full h-full object-cover pointer-events-none';

interface GridCellProps {
  row: number;
  col: number;
  tile: Tile | null;
  onClick: (row: number, col: number) => void;
}

export const GridCell = memo(({ row, col, tile, onClick }: GridCellProps) => {
  return (
    <div
      data-row={row}
      data-col={col}
      onClick={() => onClick(row, col)}
      className={cn(
        'w-14 h-14 border border-ink/20 flex-shrink-0',
        CENTERED_FLEX,
        'cursor-pointer hover:bg-ink/5 transition-colors relative',
      )}
    >
      {tile && <img src={tile.image} alt={tile.name} className={cn(FULL_IMAGE, 'absolute inset-0')} />}
    </div>
  );
});
