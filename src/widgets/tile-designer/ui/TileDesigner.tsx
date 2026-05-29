'use client';

import React, { memo, useCallback, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import {
  DndContext,
  DragOverlay,
  useDraggable,
  useDroppable,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
} from '@dnd-kit/core';
import { cn } from '@/shared/lib/cn';
import { RootState } from '@/app-layer/store';
import {
  selectPaletteTile,
  placeTileInGrid,
  clearGrid,
  Tile,
} from '@/entities/tile';

const PANEL_BG = 'bg-surface-header';
const CENTERED_FLEX = 'flex items-center justify-center';
const FULL_IMAGE = 'w-full h-full object-cover pointer-events-none';
const SECTION_HEADER = 'px-6 py-4 border-b-3 border-ink';
const HEADER_TITLE = 'heading text-ink leading-tight text-center';
const SCROLL_CONTAINER = 'max-h-palette custom-scrollbar';

interface GridCellProps {
  row: number;
  col: number;
  tile: Tile | null;
  onClick: (row: number, col: number) => void;
}

const GridCell = memo(({ row, col, tile, onClick }: GridCellProps) => {
  return (
    <div
      data-row={row}
      data-col={col}
      onClick={() => onClick(row, col)}
      className={cn('w-14 h-14 border border-ink/20 flex-shrink-0', CENTERED_FLEX, 'cursor-pointer hover:bg-ink/5 transition-colors relative')}
    >
      {tile && <img src={tile.image} alt={tile.name} className={cn(FULL_IMAGE, 'absolute inset-0')} />}
    </div>
  );
});

GridCell.displayName = 'GridCell';

interface TileGridProps {
  grid: Record<string, string | null>;
  paletteMap: Record<string, Tile>;
  onCellClick: (row: number, col: number) => void;
}

const TileGrid = memo(({ grid, paletteMap, onCellClick }: TileGridProps) => {
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

TileGrid.displayName = 'TileGrid';

interface DraggableTileProps {
  tile: Tile;
  isDragging: boolean;
  onClick: () => void;
}

function DraggableTile({ tile, isDragging, onClick }: DraggableTileProps) {
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

interface DroppableGridProps {
  children: React.ReactNode;
}

function DroppableGrid({ children }: DroppableGridProps) {
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

export function TileDesigner() {
  const dispatch = useDispatch();
  const palette = useSelector((state: RootState) => state.tile.palette);
  const grid = useSelector((state: RootState) => state.tile.grid);
  const selectedPaletteTileId = useSelector((state: RootState) => state.tile.selectedPaletteTileId);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [showHand, setShowHand] = useState(true);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null);
    const { active, over, activatorEvent, delta } = event;
    if (!over || over.id !== 'tile-grid') return;

    const mouseEvent = activatorEvent as MouseEvent;
    const clientX = mouseEvent.clientX + delta.x;
    const clientY = mouseEvent.clientY + delta.y;

    const gridElement = document.getElementById('tile-grid');
    if (!gridElement) return;

    const rect = gridElement.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const col = Math.floor(x / 56);
    const row = Math.floor(y / 56);

    if (row >= 0 && row < 70 && col >= 0 && col < 70) {
      dispatch(placeTileInGrid({ row, col, tileId: active.id as string }));
    }
  };

  const handleCellClick = useCallback(
    (row: number, col: number) => {
      const key = `${row},${col}`;
      const currentTileId = grid[key];
      if (currentTileId === selectedPaletteTileId) {
        dispatch(placeTileInGrid({ row, col, tileId: null }));
      } else {
        dispatch(placeTileInGrid({ row, col, tileId: selectedPaletteTileId }));
      }
    },
    [grid, selectedPaletteTileId, dispatch],
  );

  const activeTile = activeId ? palette.find((t) => t.id === activeId) : null;

  const paletteMap = useMemo(() => {
    const map: Record<string, Tile> = {};
    palette.forEach((tile) => {
      map[tile.id] = tile;
    });
    return map;
  }, [palette]);

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className={cn('w-full bordered relative', PANEL_BG, 'rounded-xl flex flex-col md:flex-row overflow-hidden')}>
        <div className="flex-1 flex flex-col min-w-0">
          <div className={cn('flex justify-center items-start w-full', SECTION_HEADER)}>
            <div>
              <h2 className={cn(HEADER_TITLE, 'text-section-title')}>VISUALIZE YOUR ORDER:</h2>
              <p className="text-body-md text-ink-soft leading-normal">Drag and drop tiles here to create patterns.</p>
            </div>
          </div>

          <DroppableGrid>
            <TileGrid grid={grid} paletteMap={paletteMap} onCellClick={handleCellClick} />
          </DroppableGrid>
        </div>

        <div className={cn('flex flex-col', PANEL_BG, 'border-t-3 md:border-t-0 md:border-l-3 border-ink')}>
          <div className={SECTION_HEADER}>
            <h2 className={cn(HEADER_TITLE, 'text-section-title-lg')}>DESIGN PALATE</h2>
          </div>
          <div className={cn('p-4 grid grid-cols-2 gap-4 auto-rows-max', SCROLL_CONTAINER, 'justify-items-center')}>
            {palette.map((tile) => (
              <DraggableTile
                key={tile.id}
                tile={tile}
                isDragging={activeId === tile.id}
                onClick={() => dispatch(selectPaletteTile(tile.id))}
              />
            ))}
          </div>
        </div>

        {showHand && (
          <motion.img
            src="/hand_dragging_tile.png"
            alt=""
            initial={{ opacity: 0, y: 10 }}
            animate={{
              opacity: [0, 1, 1, 1, 0],
              y: [10, 0, -8, 0, 0],
            }}
            transition={{
              duration: 2.5,
              times: [0, 0.15, 0.45, 0.7, 1],
            }}
            onAnimationComplete={() => setShowHand(false)}
            className="absolute bottom-4 right-4 w-24 h-24 object-contain pointer-events-none z-10"
          />
        )}
      </div>

      <DragOverlay>
        {activeTile ? (
          <div
            className={cn('w-14 h-14 rounded-md border-3 border-ink', CENTERED_FLEX, 'overflow-hidden opacity-90 shadow-xl pointer-events-none scale-105')}
          >
            {activeTile.image ? (
              <img src={activeTile.image} alt={activeTile.name} className="w-full h-full object-cover" />
            ) : (
              <div className={`w-full h-full bg-gradient-to-br ${activeTile.color}`} />
            )}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
