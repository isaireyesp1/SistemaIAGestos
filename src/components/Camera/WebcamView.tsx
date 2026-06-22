import { useEffect, useRef } from "react";

interface Props {
  onReady: (video: HTMLVideoElement) => void;
}

export default function WebcamView({ onReady }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const startCamera = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;

        videoRef.current.onloadedmetadata = () => {
          onReady(videoRef.current!);
        };
      }
    };

    startCamera();
  }, []);

  return (
    <video
      ref={videoRef}
      autoPlay
      playsInline
      style={{
        width: "100%",
        maxWidth: "900px",
        borderRadius: "20px",
      }}
    />
  );
}