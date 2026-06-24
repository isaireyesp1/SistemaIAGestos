import type { PuzzlePiece } from "../types/PuzzlePiece";

export function generatePuzzle(
  image: string,
  rows = 4,
  cols = 4
): PuzzlePiece[] {
  const pieces: PuzzlePiece[] = [];

  const size = 100 / cols; // porcentaje

  let id = 0;

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      pieces.push({
        id: id++,

        x: Math.random() * 100, // posición inicial random
        y: Math.random() * 100,

        correctX: x * size,
        correctY: y * size,

        size,

        image,
      });
    }
  }

  return pieces;
}