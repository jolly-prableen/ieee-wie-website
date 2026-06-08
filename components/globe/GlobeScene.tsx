"use client";

import { Environment } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Bloom, EffectComposer, Vignette } from "@react-three/postprocessing";
import HolographicGlobe from "@/components/globe/HolographicGlobe";
import GlobeParticles from "@/components/globe/GlobeParticles";
import GlobePlatform from "@/components/globe/GlobePlatform";

export default function GlobeScene() {
  return (
    <div className="absolute inset-0 z-10">
      <Canvas camera={{ position: [0, 1.05, 6.15], fov: 40 }} dpr={[1, 1.75]} gl={{ alpha: true, antialias: true }}>
        <color attach="background" args={["#000000"]} />
        <ambientLight intensity={0.35} />
        <pointLight position={[3, 4, 4]} intensity={5.5} color="#d946ef" />
        <pointLight position={[-4, -1, 3]} intensity={2.2} color="#8b5cf6" />
        <spotLight position={[0, 5, 2]} angle={0.42} penumbra={1} intensity={5} color="#f0abfc" />
        <GlobeParticles />
        <HolographicGlobe />
        <GlobePlatform />
        <Environment preset="night" />
        <EffectComposer>
          <Bloom intensity={1.65} luminanceThreshold={0.08} luminanceSmoothing={0.18} mipmapBlur />
          <Vignette eskil={false} offset={0.18} darkness={0.72} />
        </EffectComposer>
      </Canvas>
      <div className="pointer-events-none absolute inset-x-[12%] bottom-[18%] h-20 rounded-full bg-fuchsia-500/25 blur-3xl" />
    </div>
  );
}
