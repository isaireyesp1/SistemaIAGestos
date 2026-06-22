import { useState } from "react";
import WebcamView from "../components/Camera/WebcamView";
import GestureDetector from "../components/Gestures/GestureDetector";

export default function Home() {
  const [video, setVideo] =
    useState<HTMLVideoElement | null>(null);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 40,
      }}
    >
      <h1>🖐️ Gesture Puzzle AI</h1>

      <p>
        ✌️ = Tomar Foto
        <br />
        👋 = Mostrar Gatito Bailarín
      </p>

      <div
        style={{
          position: "relative",
        }}
      >
        <WebcamView onReady={setVideo} />

        <GestureDetector video={video} />
      </div>
    </div>
  );
}