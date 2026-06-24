export type PuzzlePiece = {
  id: number;

  // posición actual (drag)
  x: number;
  y: number;

  // posición correcta (snap target)
  correctX: number;
  correctY: number;

  // posición en grid para recorte visual
  row: number;
  col: number;

  // tamaño de cada pieza
  size: number;

  // imagen base
  image: string;
};