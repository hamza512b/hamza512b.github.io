import { useEffect, useRef } from "react";
import { WavyBlob } from "./WavyBlob";

const WaveAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }
    const c = canvas.getContext("2d");

    if (!c) {
      return;
    }

    const blob = new WavyBlob(c);

    let lastUpdate = new Date();
    const render = () => {
      lastUpdate = new Date();
      c.clearRect(0, 0, canvas.width, canvas.height);
      blob.update();
      animationFrameId.current = window.requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationFrameId.current) {
        window.cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  return <canvas ref={canvasRef} width={400} height={400} />;
};

export default WaveAnimation;
