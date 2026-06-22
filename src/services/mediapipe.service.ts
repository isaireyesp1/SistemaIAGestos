declare const Hands: any;

export const createHands = () => {
  return new Hands({
    locateFile: (file: string) =>
      `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
  });
};