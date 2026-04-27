import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const COUNT = 140

export default function DustParticles() {
  const pointsRef = useRef<THREE.Points>(null)
  const baseY = useRef<Float32Array>(new Float32Array(COUNT))
  const phase = useRef<Float32Array>(new Float32Array(COUNT))

  const { positions } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3)
    for (let i = 0; i < COUNT; i++) {
      const x = (Math.random() - 0.5) * 11
      const y = 0.3 + Math.random() * 5
      const z = (Math.random() - 0.5) * 9 - 0.5
      positions[i * 3] = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = z
      baseY.current[i] = y
      phase.current[i] = Math.random() * Math.PI * 2
    }
    return { positions }
  }, [])

  useFrame((state) => {
    if (!pointsRef.current) return
    const t = state.clock.elapsedTime
    const geom = pointsRef.current.geometry
    const arr = geom.attributes.position.array as Float32Array
    for (let i = 0; i < COUNT; i++) {
      arr[i * 3 + 1] = baseY.current[i] + Math.sin(t * 0.3 + phase.current[i]) * 0.18
      arr[i * 3] += Math.sin(t * 0.15 + phase.current[i]) * 0.0006
    }
    geom.attributes.position.needsUpdate = true
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#fff2d8"
        size={0.025}
        sizeAttenuation
        transparent
        opacity={0.45}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
