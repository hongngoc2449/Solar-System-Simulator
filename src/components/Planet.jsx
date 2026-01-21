import { useFrame, useLoader } from "@react-three/fiber";
import React, { useRef } from "react";
import { TextureLoader } from "three";

const Planet = ({
  name,
  radius,
  distance,
  orbitSpeed,
  rotationSpeed,
  timeScale,
  globalSizeScale,
  sizeScale,
  elapsed,
  isPaused,
  onSelect,
  selectedName,
  onPositionUpdate,
}) => {
  const texture = useLoader(
    TextureLoader,
    `/textures/${name.toLowerCase()}.jpg`
  );

  const meshRef = useRef();

  useFrame((state, delta) => {
    if (isPaused) return;

    meshRef.current.rotation.y += delta * rotationSpeed * timeScale;

    const angle = elapsed * orbitSpeed * timeScale;
    meshRef.current.position.x = Math.cos(angle) * distance;
    meshRef.current.position.z = Math.sin(angle) * distance;
    onPositionUpdate?.(name, meshRef.current.position);
  });

  return (
    <mesh
      onClick={() => onSelect(name)}
      ref={meshRef}
      position={[distance, 0, 0]}
    >
      {selectedName === name && (
        <mesh>
          <sphereGeometry args={[radius * sizeScale * globalSizeScale * 1.25, 32, 32]} />
          <meshBasicMaterial color="#ffcc00" transparent opacity={0.25} />
        </mesh>
      )}
      <sphereGeometry args={[radius * sizeScale * globalSizeScale, 32, 32]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
};

export default Planet;
