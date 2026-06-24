import { create } from "zustand";
import type { PuzzlePiece } from "../types/PuzzlePiece";
import type { GameMode } from "../types/GameMode";

interface GameState {
  mode: GameMode;

  // imagen capturada
  image: string | null;

  // piezas del rompecabezas
  pieces: PuzzlePiece[];

  // pieza seleccionada con gesto
  activePieceId: number | null;

  setMode: (mode: GameMode) => void;

  setImage: (img: string) => void;

  setPieces: (pieces: PuzzlePiece[]) => void;

  setActivePiece: (id: number | null) => void;

  resetGame: () => void;
}

export const useGameStore = create<GameState>((set) => ({
  mode: "camera",
  image: null,
  pieces: [],
  activePieceId: null,

  setMode: (mode) => set({ mode }),

  setImage: (img) => set({ image: img }),

  setPieces: (pieces) => set({ pieces }),

  setActivePiece: (id) => set({ activePieceId: id }),

  resetGame: () =>
    set({
      mode: "camera",
      image: null,
      pieces: [],
      activePieceId: null,
    }),
}));