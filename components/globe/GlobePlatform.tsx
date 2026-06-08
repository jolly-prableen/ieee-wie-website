"use client";

import { Ring } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export default function GlobePlatform() {
  const outer = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (outer.current) outer.current.rotation.z += delta * 0.22;
    if (inner.current) inner.current.rotation.z -= delta * 0.34;
  });

  return (
    <group position={[0, -1.42, 0]} rotation={[Math.PI / 2, 0, 0]}>
      <group ref={outer}>
        {[1.25, 1.65, 2.05].map((radius, index) => (
          <Ring key={radius} args={[radius, radius + 0.018, 160]}>
            <meshBasicMaterial
              color={index === 1 ? "#f0abfc" : "#a855f7"}
              transparent
              opacity={0.65 - index * 0.12}
              blending={THREE.AdditiveBlending}
              side={THREE.DoubleSide}
            />
          </Ring>
        ))}
      </group>

      <group ref={inner}>
        <Ring args={[0.42, 0.48, 96]}>
          <meshBasicMaterial color="#f5d0fe" transparent opacity={0.75} blending={THREE.AdditiveBlending} side={THREE.DoubleSide} />
        </Ring>
        <Ring args={[0.78, 0.81, 128]}>
          <meshBasicMaterial color="#d946ef" transparent opacity={0.5} blending={THREE.AdditiveBlending} side={THREE.DoubleSide} />
        </Ring>
      </group>

      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -1.15]}>
        <cylinderGeometry args={[0.28, 0.64, 2.55, 80, 1, true]} />
        <meshBasicMaterial color="#c084fc" transparent opacity={0.12} blending={THREE.AdditiveBlending} side={THREE.DoubleSide} depthWrite={false} />
      </mesh>

      <mesh position={[0, 0, 0.015]}>
        <circleGeometry args={[2.35, 160]} />
        <meshBasicMaterial color="#a855f7" transparent opacity={0.055} blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
  );
}
