import { useEffect, useRef, useState } from "react";
import { WavyBlob } from "./WavyBlob";
var canUseDOM = !!(
  typeof window !== "undefined" &&
  window.document &&
  window.document.createElement
);
const WaveAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isLight, setIsLight] = useState(() => {
    if (canUseDOM) {
      return window.matchMedia!("(prefers-color-scheme: light)").matches;
    }

    return true;
  });
  useEffect(() => {
    if (isVisible) {
      const canvas = canvasRef.current;

      if (!canvas) {
        return;
      }
      const c = canvas.getContext("2d");

      if (!c) {
        return;
      }

      const blob = new WavyBlob(c, isLight ? "#fff" : "#010f0f");

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
    }
  }, [isVisible, isLight]);

  useEffect(() => {
    const queryList = window.matchMedia!("(min-width: 800px)");
    console.log(queryList);
    const updateMatch = () => {
      setIsVisible(queryList.matches);
    };
    updateMatch();

    queryList.addEventListener("change", updateMatch);
    return () => {
      queryList.removeEventListener("change", updateMatch);
    };
  }, []);
  useEffect(() => {
    const queryList = window.matchMedia!("(prefers-color-scheme: light)");
    console.log(queryList);
    const updateMatch = () => {
      setIsLight(queryList.matches);
    };
    updateMatch();

    queryList.addEventListener("change", updateMatch);
    return () => {
      queryList.removeEventListener("change", updateMatch);
    };
  }, []);

  if (isVisible) return <canvas ref={canvasRef} width={400} height={400} />;

  return (
    <img
      src={
        isLight
          ? "/images/default-artifact-light.png"
          : "/images/default-artifact-dark.png"
      }
      width={400}
      height={400}
      alt=""
    />
  );
};

export default WaveAnimation;
