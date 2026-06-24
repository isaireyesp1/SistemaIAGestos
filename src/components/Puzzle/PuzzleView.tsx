import { useRef, useState } from "react";
import { useGameStore } from "../../store/useGameStore";

export default function PuzzleView() {
  const image = useGameStore((s) => s.image);
  const pieces = useGameStore((s) => s.pieces);
  const setMode = useGameStore((s) => s.setMode);

  const boardRef = useRef<HTMLDivElement>(null);

  const [dragging, setDragging] = useState<number | null>(null);
  const offset = useRef({ x: 0, y: 0 });

  const size = 320;
  const grid = 3;
  const pieceSize = size / grid;

  const SNAP_DISTANCE = 25; // 🔥 qué tan cerca para encajar

  const handleMouseDown = (e: React.MouseEvent, id: number) => {
    const el = document.getElementById(`piece-${id}`);
    if (!el || !boardRef.current) return;

    const rect = el.getBoundingClientRect();

    offset.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };

    setDragging(id);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (dragging === null || !boardRef.current) return;

    const boardRect = boardRef.current.getBoundingClientRect();
    const el = document.getElementById(`piece-${dragging}`);
    if (!el) return;

    let x = e.clientX - boardRect.left - offset.current.x;
    let y = e.clientY - boardRect.top - offset.current.y;

    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (dragging === null) return;

    const piece = pieces.find((p) => p.id === dragging);
    const el = document.getElementById(`piece-${dragging}`);

    if (piece && el && boardRef.current) {
      const boardRect = boardRef.current.getBoundingClientRect();

      const currentX =
        parseFloat(el.style.left || "0");
      const currentY =
        parseFloat(el.style.top || "0");

      const dx = Math.abs(currentX - piece.correctX);
      const dy = Math.abs(currentY - piece.correctY);

      // 🧲 SNAP SI ESTÁ CERCA
      if (dx < SNAP_DISTANCE && dy < SNAP_DISTANCE) {
        el.style.left = `${piece.correctX}px`;
        el.style.top = `${piece.correctY}px`;

        el.style.transition = "all 0.2s ease";
      }
    }

    setDragging(null);
  };

  if (!image) {
    return (
      <div className="text-center mt-20">
        <p>No hay imagen</p>
        <button
          onClick={() => setMode("camera")}
          className="mt-4 px-4 py-2 bg-black text-white rounded-xl"
        >
          Volver
        </button>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col items-center gap-6 mt-10 select-none"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <h2 className="text-2xl font-bold">🧩 Puzzle PRO</h2>

      {/* TABLERO */}
      <div
        ref={boardRef}
        className="relative border shadow-xl bg-white"
        style={{
          width: size,
          height: size,
        }}
      >
        {/* 🟦 GRID VISUAL (slots) */}
        {Array.from({ length: grid * grid }).map((_, i) => (
          <div
            key={i}
            className="absolute border border-black/10"
            style={{
              width: pieceSize,
              height: pieceSize,
              left: (i % grid) * pieceSize,
              top: Math.floor(i / grid) * pieceSize,
            }}
          />
        ))}

        {/* 🧩 PIEZAS */}
        {pieces.map((p: any) => (
          <div
            key={p.id}
            id={`piece-${p.id}`}
            onMouseDown={(e) => handleMouseDown(e, p.id)}
            className="absolute cursor-grab active:cursor-grabbing shadow-md"
            style={{
              width: pieceSize,
              height: pieceSize,
              left: p.x,
              top: p.y,
              backgroundImage: `url(${image})`,
              backgroundSize: `${size}px ${size}px`,
              backgroundPosition: `-${p.col * pieceSize}px -${
                p.row * pieceSize
              }px`,
            }}
          />
        ))}
      </div>

      <button
        onClick={() => setMode("camera")}
        className="px-6 py-3 bg-black text-white rounded-xl"
      >
        Volver
      </button>
    </div>
  );
}