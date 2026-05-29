import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Tile } from './types';

interface TileState {
  palette: Tile[];
  grid: Record<string, string>;
  selectedPaletteTileId: string | null;
}

const initialPalette: Tile[] = [
  {
    id: 'ocean-wave',
    name: 'Ocean Wave',
    price: 28.0,
    color: 'from-blue-400 to-cyan-600',
    pattern: 'wave',
    image: '/tile_ocean_wave_pattern.png',
  },
  {
    id: 'forest-fern',
    name: 'Forest Fern',
    price: 30.0,
    color: 'from-emerald-500 to-green-700',
    pattern: 'fern',
    image: '/tile_forest_fern_pattern.png',
  },
  {
    id: 'terracotta-dot',
    name: 'Terracotta Dot',
    price: 26.0,
    color: 'from-orange-400 to-amber-700',
    pattern: 'dot',
    image: '/tile_terracotta_dot_pattern.png',
  },
  {
    id: 'yellow-star',
    name: 'Yellow Star',
    price: 29.0,
    color: 'from-yellow-300 to-amber-500',
    pattern: 'star',
    image: '/tile_yellow_star_pattern.png',
  },
  {
    id: 'terracotta-diamond',
    name: 'Terracotta Diamond',
    price: 27.0,
    color: 'from-orange-500 to-amber-800',
    pattern: 'dot',
    image: '/palette_tile_terracotta_diamond.png',
  },
  {
    id: 'blue-arcs',
    name: 'Blue Arcs',
    price: 28.0,
    color: 'from-blue-500 to-cyan-700',
    pattern: 'wave',
    image: '/palette_tile_blue_arcs.png',
  },
  {
    id: 'yellow-curves',
    name: 'Yellow Curves',
    price: 29.0,
    color: 'from-yellow-400 to-amber-600',
    pattern: 'star',
    image: '/palette_tile_yellow_curves.png',
  },
];

const initialState: TileState = {
  palette: initialPalette,
  grid: {},
  selectedPaletteTileId: initialPalette[0].id,
};

const tileSlice = createSlice({
  name: 'tile',
  initialState,
  reducers: {
    selectPaletteTile(state, action: PayloadAction<string | null>) {
      state.selectedPaletteTileId = action.payload;
    },
    placeTileInGrid(state, action: PayloadAction<{ row: number; col: number; tileId: string | null }>) {
      const { row, col, tileId } = action.payload;
      if (row >= 0 && row < 70 && col >= 0 && col < 70) {
        const key = `${row},${col}`;
        if (tileId === null) {
          delete state.grid[key];
        } else {
          state.grid[key] = tileId;
        }
      }
    },
    clearGrid(state) {
      state.grid = {};
    },
  },
});

export const { selectPaletteTile, placeTileInGrid, clearGrid } = tileSlice.actions;
export const tileReducer = tileSlice.reducer;
export type { TileState };
