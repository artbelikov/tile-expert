import React from 'react';
import { cn } from '@/shared/lib/cn';
import type { Tile } from '../model/types';
import { DotPattern, FernPattern, StarPattern, WavePattern } from './svg-patterns';

interface TileGraphicProps {
  tile: Tile;
  size?: 'sm' | 'md' | 'lg';
}

export function TileGraphic({ tile, size = 'md' }: TileGraphicProps) {
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
  };

  return (
    <div className={cn('relative bg-tile-bg bordered flex items-center justify-center overflow-hidden', sizeClasses[size])}>
      {tile.image ? (
        <img src={tile.image} alt={tile.name} className="w-full h-full object-cover pointer-events-none" />
      ) : (
        <>
          <div className={`absolute inset-0 bg-gradient-to-br ${tile.color} opacity-80`} />
          {tile.pattern === 'wave' && <WavePattern />}
          {tile.pattern === 'fern' && <FernPattern />}
          {tile.pattern === 'dot' && <DotPattern />}
          {tile.pattern === 'star' && <StarPattern />}
        </>
      )}

      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/15 pointer-events-none" />
    </div>
  );
}
