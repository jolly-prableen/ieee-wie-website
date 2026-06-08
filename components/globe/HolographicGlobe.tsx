"use client";

import { Line, Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function isLand(lat: number, lon: number) {
  const regions = [
    { lat: 47, lon: -102, rx: 33, ry: 50 },
    { lat: -15, lon: -60, rx: 22, ry: 42 },
    { lat: 7, lon: 20, rx: 35, ry: 38 },
    { lat: 48, lon: 68, rx: 34, ry: 72 },
    { lat: 22, lon: 102, rx: 30, ry: 42 },
    { lat: -25, lon: 134, rx: 17, ry: 25 },
    { lat: 72, lon: -42, rx: 13, ry: 24 },
  ];

  return regions.some((region) => {
    const lonDelta = Math.abs(((lon - region.lon + 540) % 360) - 180);
    const latDelta = Math.abs(lat - region.lat);
    return (lonDelta / region.ry) ** 2 + (latDelta / region.rx) ** 2 < 1;
  });
}

function spherePoint(lat: number, lon: number, radius: number) {
  const phi = THREE.MathUtils.degToRad(90 - lat);
  const theta = THREE.MathUtils.degToRad(lon + 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
}

export default function HolographicGlobe() {
  const group = useRef<THREE.Group>(null);

  const landDots = useMemo(() => {
    const points: number[] = [];
    for (let lat = -66; lat <= 76; lat += 4) {
      for (let lon = -180; lon <= 180; lon += 4) {
        if (isLand(lat, lon)) {
          const point = spherePoint(lat, lon, 1.78);
          points.push(point.x, point.y, point.z);
        }
      }
    }
    return new Float32Array(points);
  }, []);

  const latLines = useMemo(() => {
    return [-60, -40, -20, 0, 20, 40, 60].map((lat) =>
      Array.from({ length: 145 }, (_, index) => spherePoint(lat, -180 + index * 2.5, 1.82)),
    );
  }, []);

  const lonLines = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => -180 + i * 30).map((lon) =>
      Array.from({ length: 97 }, (_, index) => spherePoint(-80 + index * 1.666, lon, 1.825)),
    );
  }, []);

  useFrame((_, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.16;
      group.current.rotation.x = Math.sin(Date.now() * 0.00035) * 0.035;
    }
  });

  return (
    <group ref={group} position={[0, 0.78, 0]}>
      <mesh>
        <sphereGeometry args={[1.77, 96, 96]} />
        <meshPhysicalMaterial
          color="#8c42ff"
          emissive="#6b21a8"
          emissiveIntensity={0.62}
          roughness={0.18}
          metalness={0.18}
          transmission={0.42}
          transparent
          opacity={0.18}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      <mesh>
        <sphereGeometry args={[1.86, 96, 96]} />
        <meshBasicMaterial color="#d946ef" transparent opacity={0.075} wireframe />
      </mesh>

      {latLines.map((line, index) => (
        <Line key={`lat-${index}`} points={line} color="#f0abfc" transparent opacity={0.36} lineWidth={0.75} />
      ))}
      {lonLines.map((line, index) => (
        <Line key={`lon-${index}`} points={line} color="#c084fc" transparent opacity={0.25} lineWidth={0.62} />
      ))}

      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[landDots, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.036}
          color="#f5d0fe"
          transparent
          opacity={0.92}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      <group position={[0, 0.02, 1.92]}>
        <Text fontSize={0.18} anchorX="center" anchorY="middle" color="#f5d0fe" letterSpacing={0.16}>
          IEEE
        </Text>
        <Text position={[0, -0.32, 0]} fontSize={0.52} anchorX="center" anchorY="middle" color="#ffffff" letterSpacing={0.03}>
          Wie
        </Text>
        <Text position={[0, -0.68, 0]} fontSize={0.105} anchorX="center" anchorY="middle" color="#f0abfc" letterSpacing={0.08}>
          Women in Engineering
        </Text>
      </group>
    </group>
  );
}
