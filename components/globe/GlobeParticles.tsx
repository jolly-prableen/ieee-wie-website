"use client";

import { useMemo } from "react";
import * as THREE from "three";

function seededRandom(index: number) {
  const value = Math.sin(index * 12.9898) * 43758.5453;
  return value - Math.floor(value);
}

export default function GlobeParticles() {
  const positions = useMemo(() => {
    const count = 900;
    const data = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      const radius = 2.6 + seededRandom(i + 1) * 2.6;
      const theta = seededRandom(i + 2) * Math.PI * 2;
      const phi = Math.acos(2 * seededRandom(i + 3) - 1);
      data[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      data[i * 3 + 1] = radius * Math.cos(phi);
      data[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
    }
    return data;
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.014}
        color="#df8cff"
        transparent
        opacity={0.62}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
