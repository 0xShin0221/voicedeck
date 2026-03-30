"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float } from "@react-three/drei";
import * as THREE from "three";

function EarbudBody({ position, rotation }: { position: [number, number, number]; rotation: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);

  return (
    <group ref={groupRef} position={position} rotation={rotation}>
      {/* Main body - rounded capsule shape */}
      <mesh position={[0, 0, 0]}>
        <capsuleGeometry args={[0.32, 0.35, 16, 32]} />
        <meshPhysicalMaterial
          color="#f0f0f5"
          roughness={0.08}
          metalness={0.15}
          clearcoat={1}
          clearcoatRoughness={0.05}
          reflectivity={0.9}
          envMapIntensity={1.2}
        />
      </mesh>

      {/* Stem */}
      <mesh position={[0, -0.65, 0.02]}>
        <capsuleGeometry args={[0.1, 0.55, 12, 24]} />
        <meshPhysicalMaterial
          color="#f0f0f5"
          roughness={0.08}
          metalness={0.15}
          clearcoat={1}
          clearcoatRoughness={0.05}
          reflectivity={0.9}
          envMapIntensity={1.2}
        />
      </mesh>

      {/* Stem tip - slightly wider at bottom */}
      <mesh position={[0, -1.0, 0.02]}>
        <capsuleGeometry args={[0.09, 0.08, 8, 16]} />
        <meshPhysicalMaterial
          color="#e8e8ed"
          roughness={0.12}
          metalness={0.1}
          clearcoat={0.8}
          clearcoatRoughness={0.1}
        />
      </mesh>

      {/* Ear tip - soft silicone look */}
      <mesh position={[0, 0.3, 0.08]}>
        <sphereGeometry args={[0.22, 24, 24]} />
        <meshPhysicalMaterial
          color="#e0e0e8"
          roughness={0.4}
          metalness={0.0}
          clearcoat={0.3}
          clearcoatRoughness={0.3}
          transmission={0.05}
        />
      </mesh>

      {/* Sensor/microphone dot on stem */}
      <mesh position={[0.1, -0.55, 0.1]}>
        <circleGeometry args={[0.03, 16]} />
        <meshStandardMaterial color="#c8c8d0" metalness={0.5} roughness={0.2} />
      </mesh>
    </group>
  );
}

function EarphonePair() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.15 + 0.1;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.08;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
      <group ref={groupRef}>
        {/* Left earbud */}
        <EarbudBody
          position={[-0.7, 0, 0]}
          rotation={[0.15, 0.2, 0.12]}
        />
        {/* Right earbud */}
        <EarbudBody
          position={[0.7, 0, 0]}
          rotation={[0.15, -0.2, -0.12]}
        />
      </group>
    </Float>
  );
}

export default function EarphoneHero() {
  return (
    <div className="relative w-[340px] h-[400px] sm:w-[400px] sm:h-[480px]">
      {/* Cyan glow behind canvas */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-64 h-64 rounded-full bg-[#00D4FF]/15 blur-[80px]" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-40 h-40 rounded-full bg-[#7C3AED]/10 blur-[60px] translate-x-8" />
      </div>

      {/* Pulsing glow rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {[0, 0.8, 1.6].map((delay, i) => (
          <div
            key={i}
            className="absolute w-48 h-48 rounded-full border border-[#00D4FF]/20 ring-expand"
            style={{ animationDelay: `${delay}s` }}
          />
        ))}
      </div>

      {/* Three.js Canvas */}
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 35 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.6} color="#ffffff" />
        <pointLight position={[-3, 2, 2]} intensity={1.8} color="#00D4FF" />
        <pointLight position={[3, 1, 2]} intensity={1.2} color="#FFE4C4" />
        <spotLight
          position={[0, 4, 3]}
          intensity={2}
          angle={0.4}
          penumbra={0.5}
          color="#ffffff"
        />
        <pointLight position={[0, -2, 3]} intensity={0.4} color="#7C3AED" />
        <EarphonePair />
        <Environment preset="studio" />
      </Canvas>

      {/* Audio waveform bars */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-end gap-[4px] h-10">
        {[0, 0.15, 0.3, 0.1, 0.25, 0.4, 0.2].map((delay, i) => (
          <div
            key={i}
            className="w-[3px] rounded-full bg-[#00D4FF] wave-bar origin-bottom"
            style={{
              animationDelay: `${delay}s`,
              height: `${16 + Math.sin(i * 1.2) * 12 + 10}px`,
              opacity: 0.5 + (i % 3) * 0.15,
            }}
          />
        ))}
      </div>
    </div>
  );
}
