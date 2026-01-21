import { useLoader } from "@react-three/fiber";
import React from "react";
import { TextureLoader } from "three";
import * as THREE from "three";

const Sun = ({ onSelect, selectedName, onPositionUpdate }) => {
  const sunTexture = useLoader(TextureLoader, "/textures/sun.jpg");

  return (
    <mesh
      onClick={(e) => {
        e.stopPropagation();
        onSelect?.("Sun");
      }}
      onPointerOver={() => onPositionUpdate?.("Sun", new THREE.Vector3(0, 0, 0))}
    >
      {selectedName === "Sun" && (
        <mesh>
          <sphereGeometry args={[1.4 * 1.25, 32, 32]} />
          <meshBasicMaterial color="#ffcc00" transparent opacity={0.25} />
        </mesh>
      )}
      <sphereGeometry args={[1.4, 32, 32]} />
      <meshBasicMaterial map={sunTexture} />
    </mesh>
  );
};

export default Sun;
