'use client';

import { DndContext, type DragEndEvent, DragOverlay, type DragStartEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { motion } from 'framer-motion';
import { useCallback, useMemo, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/app-layer/store/hooks';
import { placeTileInGrid, selectPaletteTile } from '@/entities/tile';
import { cn } from '@/shared/lib/cn';
import type { Tile } from '@/shared/types/tile';
import { DraggableTile } from './DraggableTile';
import { DroppableGrid } from './DroppableGrid';
import { TileGrid } from './TileGrid';

const PANEL_BG = 'bg-surface-header';
const CENTERED_FLEX = 'flex items-center justify-center';
const SECTION_HEADER = 'px-6 py-4 border-b-3 border-ink';
const HEADER_TITLE = 'heading text-ink leading-tight text-center';
const SCROLL_CONTAINER = 'max-h-palette custom-scrollbar';

export function TileDesigner() {
  const dispatch = useAppDispatch();
  const palette = useAppSelector((state) => state.tile.palette);
  const grid = useAppSelector((state) => state.tile.grid);
  const selectedPaletteTileId = useAppSelector((state) => state.tile.selectedPaletteTileId);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [showHand, setShowHand] = useState(true);
  const gridRef = useRef<HTMLDivElement>(null);

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

    const gridElement = gridRef.current?.querySelector('#tile-grid') as HTMLElement | null;
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

          <DroppableGrid gridRef={(node) => { gridRef.current = node; }}>
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
            className="absolute bottom-4 w-72 h-72 object-contain pointer-events-none z-10"
            style={{ right: 220 }}
          />
        )}
      </div>

      <DragOverlay>
        {activeTile ? (
          <div
            className={cn(
              'w-14 h-14 rounded-md border-3 border-ink',
              CENTERED_FLEX,
              'overflow-hidden opacity-90 shadow-xl pointer-events-none scale-105',
            )}
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
