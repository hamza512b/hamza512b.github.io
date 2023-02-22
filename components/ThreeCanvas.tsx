import { Canvas } from "@react-three/fiber";
import { useRef } from "react";
import { PCFSoftShadowMap } from "three";
import { Composition } from "./Composition";

export function ThreeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  return (
    <div>
      <Canvas
        orthographic
        shadows={{ type: PCFSoftShadowMap, enabled: true }}
        dpr={[1, 2]}
        ref={canvasRef}
      >
        <Composition canvasRef={canvasRef} />
      </Canvas>
    </div>
  );
}
