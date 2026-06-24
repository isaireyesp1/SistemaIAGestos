import { useEffect, useRef } from "react";

interface Props {
  onReady: (video: HTMLVideoElement) => void;
}

export default function WebcamView({ onReady }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;

          videoRef.current.onloadedmetadata = () => {
            onReady(videoRef.current!);
          };
        }
      } catch (error) {
        console.error("Error acceso cámara:", error);
      }
    };

    startCamera();
  }, []);

  return (
    <div
      className="
        relative
        w-full
        max-w-[900px]
      "
    >
      {/* Marco estilo Apple */}
      <div
        className="
          rounded-[40px]

          overflow-hidden

          bg-black/5

          shadow-[0_30px_80px_rgba(0,0,0,0.25)]

          border border-white/30

          backdrop-blur-2xl
        "
      >
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="
            w-full
            h-auto
            object-cover
            rounded-[40px]
          "
        />
      </div>

      {/* Glow suave tipo Vision Pro */}
      <div
        className="
          absolute
          inset-0
          rounded-[40px]
          pointer-events-none

          shadow-[inset_0_0_60px_rgba(255,255,255,0.15)]
        "
      />
    </div>
  );
}