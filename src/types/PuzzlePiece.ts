export type PuzzlePiece = {
  id: number;

  // posición actual
  x: number;
  y: number;

  // posición correcta
  correctX: number;
  correctY: number;

  // tamaño de la pieza en grid
  size: number;

  // imagen completa (puede ser recortada después)
  image: string;
};