'use client'

import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sphere, MeshDistortMaterial, Float, Environment } from '@react-three/drei'
import * as THREE from 'three'

function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!meshRef.current) return
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.08
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.12
  })

  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={1.2}>
      <Sphere ref={meshRef} args={[1.4, 128, 128]}>
        <MeshDistortMaterial
          color="#4A4AFF"
          attach="material"
          distort={0.42}
          speed={1.8}
          roughness={0.08}
          metalness={0.95}
          envMapIntensity={2}
        />
      </Sphere>
    </Float>
  )
}

function RingOrbit() {
  const groupRef = useRef<THREE.Group>(null)
  useFrame((state) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.18
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2
  })
  return (
    <group ref={groupRef}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.4, 0.018, 16, 120]} />
        <meshStandardMaterial color="#CC44BB" transparent opacity={0.35} />
      </mesh>
      <mesh rotation={[Math.PI / 3.5, Math.PI / 6, 0]}>
        <torusGeometry args={[2.1, 0.012, 16, 120]} />
        <meshStandardMaterial color="#4A4AFF" transparent opacity={0.25} />
      </mesh>
    </group>
  )
}

export default function HeroScene() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} color="#8B8BFF" />
        <directionalLight position={[-5, -3, -5]} intensity={0.8} color="#CC44BB" />
        <pointLight position={[0, 0, 4]} intensity={2.5} color="#4A4AFF" distance={8} />
        <Suspense fallback={null}>
          <Environment files="/potsdamer_platz_1k.hdr" />
          <AnimatedSphere />
          <RingOrbit />
        </Suspense>
      </Canvas>
    </div>
  )
}
