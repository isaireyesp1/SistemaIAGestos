import { useEffect, useState } from "react";
import WebcamView from "../components/Camera/WebcamView";
import GestureDetector from "../components/Gestures/GestureDetector";
import PuzzleView from "../components/Puzzle/PuzzleView";
import { useGameStore } from "../store/useGameStore";

export default function Home() {
  const [video, setVideo] = useState<HTMLVideoElement | null>(null);
  const mode = useGameStore((s) => s.mode);

  const isCamera = mode === "camera";
  const isPuzzle = mode === "puzzle";

  // opcional: reset de video cuando cambias de modo
  useEffect(() => {
    if (!isCamera) setVideo(null);
  }, [isCamera]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-100 via-white to-zinc-200 flex flex-col items-center px-6 py-10">

      {/* HEADER */}
      <header className="text-center mb-10 max-w-2xl">
        <p className="uppercase tracking-[0.35em] text-zinc-400 text-xs font-medium">
          Gesture AI System
        </p>

        <h1 className="text-5xl font-extrabold text-zinc-900 mt-3">
          Gesture Puzzle AI
        </h1>

        <p className="mt-4 text-zinc-500 text-lg">
          Controla la aplicación con gestos de mano en tiempo real usando visión por computadora.
        </p>
      </header>

      {/* VIEW ROUTER */}
      <main className="w-full flex flex-col items-center">

        {/* CAMERA MODE */}
        {isCamera && (
          <section className="w-full flex flex-col items-center gap-8 animate-fadeIn">

            {/* Camera Frame */}
            <div className="relative w-full max-w-3xl overflow-hidden rounded-[40px] bg-white/70 backdrop-blur-2xl border border-white/50 shadow-[0_30px_80px_rgba(0,0,0,0.12)]">
              <WebcamView onReady={setVideo} />
              <GestureDetector video={video} />
            </div>

            {/* Info Panel */}
            <div className="w-full max-w-2xl bg-white/70 backdrop-blur-xl border border-white/40 rounded-3xl px-8 py-5 shadow-lg text-center">
              <p className="text-zinc-700 font-semibold">Gestos disponibles</p>

              <div className="mt-3 flex justify-center gap-10 text-zinc-500 text-sm">
                <span>✌️ Dos dedos → Puzzle</span>
                <span>👋 Mano abierta → Acción especial</span>
              </div>
            </div>
          </section>
        )}

        {/* PUZZLE MODE */}
        {isPuzzle && (
          <section className="w-full flex justify-center animate-fadeIn">
            <PuzzleView />
          </section>
        )}

      </main>
    </div>
  );
}