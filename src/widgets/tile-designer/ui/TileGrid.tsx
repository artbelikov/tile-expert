import { memo, useMemo } from 'react';
import type { Tile } from '@/shared/types/tile';
import { GridCell } from './GridCell';

interface TileGridProps {
  grid: Record<string, string | null>;
  paletteMap: Record<string, Tile>;
  onCellClick: (row: number, col: number) => void;
}

export const TileGrid = memo(({ grid, paletteMap, onCellClick }: TileGridProps) => {
  const cells = useMemo(() => {
    const result = [];
    for (let r = 0; r < 70; r++) {
      for (let c = 0; c < 70; c++) {
        const key = `${r},${c}`;
        const tileId = grid[key];
        const tile = tileId ? paletteMap[tileId] || null : null;
        result.push(<GridCell key={key} row={r} col={c} tile={tile} onClick={onCellClick} />);
      }
    }
    return result;
  }, [grid, paletteMap, onCellClick]);

  return (
    <div
      id="tile-grid"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(70, 56px)',
        gridTemplateRows: 'repeat(70, 56px)',
        width: 'max-content',
      }}
    >
      {cells}
    </div>
  );
});
