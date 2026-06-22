import { useEffect, useRef, useState } from "react";
import { Camera } from "@mediapipe/camera_utils";
import { createHands } from "../../services/mediapipe.service";
import DancingCat from "../Pets/DancingCat";

interface Props {
  video: HTMLVideoElement | null;
}

export default function GestureDetector({ video }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [catVisible, setCatVisible] = useState(false);

  const lastX = useRef<number | null>(null);

  useEffect(() => {
    if (!video) return;

    const hands = createHands();

    hands.onResults((results) => {
      const canvas = canvasRef.current;

      if (!canvas) return;

      const ctx = canvas.getContext("2d");

      if (!ctx) return;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (!results.multiHandLandmarks?.length) return;

      const landmarks = results.multiHandLandmarks[0];

      const wrist = landmarks[0];

      const currentX = wrist.x;

      if (lastX.current !== null) {
        const diff = Math.abs(currentX - lastX.current);

        if (diff > 0.08) {
          setCatVisible(true);

          setTimeout(() => {
            setCatVisible(false);
          }, 2000);
        }
      }

      lastX.current = currentX;

      const indexTip = landmarks[8];
      const middleTip = landmarks[12];
      const ringTip = landmarks[16];
      const pinkyTip = landmarks[20];

      const peaceGesture =
        indexTip.y < landmarks[6].y &&
        middleTip.y < landmarks[10].y &&
        ringTip.y > landmarks[14].y &&
        pinkyTip.y > landmarks[18].y;

      if (peaceGesture) {
        capturePhoto(video);
      }
    });

    const camera = new Camera(video, {
      onFrame: async () => {
        await hands.send({ image: video });
      },
      width: 1280,
      height: 720,
    });

    camera.start();
  }, [video]);

  const capturePhoto = (video: HTMLVideoElement) => {
    const canvas = document.createElement("canvas");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    ctx.drawImage(video, 0, 0);

    const image = canvas.toDataURL("image/png");

    const link = document.createElement("a");

    link.href = image;
    link.download = `photo-${Date.now()}.png`;

    link.click();
  };

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
        }}
      />

      <DancingCat visible={catVisible} />
    </>
  );
}