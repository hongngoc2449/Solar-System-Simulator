import { useFrame, useLoader } from "@react-three/fiber";
import React, { useRef } from "react";
import { TextureLoader } from "three";
import * as THREE from "three";

const Sun = ({
  onSelect,
  selectedName,
  onPositionUpdate,
  rotationSpeed = 0.5,
  sizeScale = 1,
  globalSizeScale = 1,
  timeScale = 1,
  isPaused = false,
}) => {
  const sunTexture = useLoader(TextureLoader, "/textures/sun.jpg");
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (!isPaused && meshRef.current) {
      meshRef.current.rotation.y += delta * rotationSpeed * timeScale;
    }
  });

  const finalRadius = 1.4 * sizeScale * globalSizeScale;

  return (
    <mesh
      ref={meshRef}
      onClick={(e) => {
        e.stopPropagation();
        onSelect?.("Sun");
      }}
      onPointerOver={() => onPositionUpdate?.("Sun", new THREE.Vector3(0, 0, 0))}
    >
      {selectedName === "Sun" && (
        <mesh>
          <sphereGeometry args={[finalRadius * 1.25, 32, 32]} />
          <meshBasicMaterial color="#ffcc00" transparent opacity={0.25} />
        </mesh>
      )}
      <sphereGeometry args={[finalRadius, 32, 32]} />
      <meshBasicMaterial map={sunTexture} />
    </mesh>
  );
};

export default Sun;
