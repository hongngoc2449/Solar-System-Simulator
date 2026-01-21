import { useFrame, useLoader } from "@react-three/fiber";
import React, { useRef } from "react";
import { TextureLoader } from "three";

const SaturnGroup = ({
  onSelect,
  elapsed,
  isPaused,
  orbitSpeed,
  rotationSpeed,
  timeScale,
  sizeScale,
  globalSizeScale,
  selectedName,
  onPositionUpdate,
}) => {
  const saturnTexture = useLoader(TextureLoader, "/textures/saturn.jpg");
  const ringTexture = useLoader(TextureLoader, "/textures/saturn_ring.png");

  const groupRef = useRef();

  useFrame((state, delta) => {
    if (isPaused) return;

    const angle = elapsed * orbitSpeed * timeScale;
    groupRef.current.position.x = Math.cos(angle) * 16;
    groupRef.current.position.z = Math.sin(angle) * 16;
    groupRef.current.rotation.y += delta * rotationSpeed * timeScale;
    onPositionUpdate?.("Saturn", groupRef.current.position);
  });

  return (
    <group ref={groupRef}>
      <mesh
        onClick={(e) => {
          e.stopPropagation();
          onSelect("Saturn");
        }}
      >
        {selectedName === "Saturn" && (
          <mesh>
            <sphereGeometry args={[1.0 * sizeScale * globalSizeScale * 1.25, 32, 32]} />
            <meshBasicMaterial color="#ffcc00" transparent opacity={0.25} />
          </mesh>
        )}
        <sphereGeometry args={[1.0 * sizeScale * globalSizeScale, 32, 32]} />
        <meshStandardMaterial map={saturnTexture} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.2 * sizeScale * globalSizeScale, 2.0 * sizeScale * globalSizeScale, 64]} />
        <meshStandardMaterial map={ringTexture} side={2} transparent={true} />
      </mesh>
    </group>
  );
};

export default SaturnGroup;
