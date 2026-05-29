export interface Tile {
  id: string;
  name: string;
  price: number;
  color: string;
  pattern: 'wave' | 'fern' | 'dot' | 'star';
  image?: string;
}
