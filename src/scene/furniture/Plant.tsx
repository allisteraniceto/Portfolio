import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Plant() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.elapsedTime
    groupRef.current.rotation.z = Math.sin(t * 0.4) * 0.015
  })

  // Sit in the back-left corner
  return (
    <group position={[-3.4, 0, -3.2]}>
      {/* Pot base */}
      <mesh position={[0, 0.35, 0]} castShadow>
        <cylinderGeometry args={[0.32, 0.24, 0.7, 16]} />
        <meshStandardMaterial color="#3d2418" roughness={0.7} />
      </mesh>
      {/* Pot rim */}
      <mesh position={[0, 0.7, 0]}>
        <cylinderGeometry args={[0.34, 0.32, 0.05, 16]} />
        <meshStandardMaterial color="#4a2d1f" roughness={0.5} />
      </mesh>
      {/* Soil */}
      <mesh position={[0, 0.69, 0]}>
        <cylinderGeometry args={[0.31, 0.31, 0.03, 16]} />
        <meshStandardMaterial color="#1a1208" roughness={0.95} />
      </mesh>

      {/* Foliage — animated cluster */}
      <group ref={groupRef} position={[0, 0.7, 0]}>
        {/* Stalks (long leaves like a snake plant / monstera vibe) */}
        {[
          { x: 0, z: 0, h: 1.4, rot: 0, tilt: 0, color: '#2d6b3a' },
          { x: 0.12, z: -0.05, h: 1.2, rot: 0.4, tilt: 0.15, color: '#34803f' },
          { x: -0.1, z: 0.08, h: 1.3, rot: -0.3, tilt: -0.1, color: '#286031' },
          { x: 0.05, z: 0.12, h: 1.0, rot: 0.7, tilt: 0.05, color: '#3a8c4a' },
          { x: -0.15, z: -0.1, h: 1.5, rot: -0.6, tilt: 0.18, color: '#2a6634' },
          { x: 0.18, z: 0.06, h: 0.85, rot: 0.2, tilt: -0.2, color: '#3d9a4f' },
          { x: -0.05, z: -0.18, h: 1.1, rot: 0.1, tilt: 0.08, color: '#2f7338' },
        ].map((leaf, i) => (
          <group key={i} position={[leaf.x, 0, leaf.z]} rotation={[leaf.tilt, leaf.rot, 0]}>
            <mesh position={[0, leaf.h / 2, 0]}>
              <boxGeometry args={[0.08, leaf.h, 0.01]} />
              <meshStandardMaterial color={leaf.color} roughness={0.7} side={THREE.DoubleSide} />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  )
}
