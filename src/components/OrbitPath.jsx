import React from "react";
import * as THREE from "three";

const OrbitPath = ({ distance, opacity = 0.4, width = 0.05, segments = 128 }) => {
  const inner = Math.max(0, distance - width);
  const outer = distance + width;

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[inner, outer, segments]} />
      <meshBasicMaterial
        color="#ffffff"
        side={THREE.DoubleSide}
        transparent
        opacity={opacity}
      />
    </mesh>
  );
};

export default OrbitPath;
