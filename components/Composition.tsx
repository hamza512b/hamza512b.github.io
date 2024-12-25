import { useFrame } from "@react-three/fiber";
import React, { useRef } from "react";
import { Laptop } from "@/components/Laptop";
import { DirectionalLight, OrthographicCamera, ShadowMaterial } from "three";
import { Plane } from "@react-three/drei";

export function Composition({
  canvasRef,
}: {
  canvasRef: React.RefObject<HTMLCanvasElement>;
}) {
  const lightRef = useRef<DirectionalLight>(null);
  useFrame((state) => {
    const camera = state.camera as OrthographicCamera;
    const ratio = state.viewport.aspect;
    camera.top = 200;
    camera.bottom = -200;
    camera.right = 200 * ratio;
    camera.left = -200 * ratio;

    camera.position.set(-1, 3.5, -3.5);
    camera.lookAt(0.03, 0, 0.15);
    camera.zoom = 1000;
    camera.updateProjectionMatrix();

    const dirLight = lightRef.current;
    if (dirLight) {
      dirLight.castShadow = true;
      dirLight.shadow.camera.left = -0.3;
      dirLight.shadow.camera.right = 0.4;
      dirLight.shadow.camera.top = -0.2;
      dirLight.shadow.camera.bottom = 0.2;
      dirLight.position.set(0, 1, 0.2);
      dirLight.shadow.mapSize.width = 1024;
      dirLight.shadow.mapSize.height = 1024;
    }
  });

  return (
    <>
      <hemisphereLight
        color={0xeeeeee}
        intensity={0.1}
        groundColor={0x000000}
      />
      <directionalLight color={0xffffff} ref={lightRef} />
      <Laptop canvasRef={canvasRef} />
    </>
  );
}
