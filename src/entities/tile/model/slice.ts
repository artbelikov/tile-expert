import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SEED_PALETTE } from '@/shared/lib/seed-data';
import type { Tile } from '@/shared/types/tile';

interface TileState {
  palette: Tile[];
  grid: Record<string, string>;
  selectedPaletteTileId: string | null;
}

const initialState: TileState = {
  palette: SEED_PALETTE,
  grid: {},
  selectedPaletteTileId: SEED_PALETTE[0].id,
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
