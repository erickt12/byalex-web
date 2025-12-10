'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere, Float } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    // Efecto de seguimiento sutil del mouse
    const { x, y } = state.mouse;
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, y / 2, 0.1);
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, x / 2, 0.1);
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere args={[1, 100, 100]} scale={2.2}>
        <MeshDistortMaterial
          color="#1a1a1a"
          attach="material"
          distort={0.5} // Intensidad de la distorsión líquida
          speed={2}     // Velocidad de movimiento
          roughness={0.2}
          metalness={0.9} // Aspecto cromado futurista
        />
      </Sphere>
    </Float>
  );
}

export default function Hero3D() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-60 mix-blend-screen">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} color="#00f3ff" intensity={2} />
        <pointLight position={[-10, -10, -10]} color="#bd00ff" intensity={2} />
        <AnimatedSphere />
      </Canvas>
    </div>
  );
}