import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Billboard } from '@react-three/drei'
import * as THREE from 'three'
import usePortfolioStore from '../../store/usePortfolioStore'
import { isTouch } from '../../hooks/useIsMobile'

interface HotspotMarkerProps {
  zone: string
  position: [number, number, number]
  color: string
}

export default function HotspotMarker({ zone, position, color }: HotspotMarkerProps) {
  const innerRingRef = useRef<THREE.Mesh>(null)
  const outerRingRef = useRef<THREE.Mesh>(null)
  const dotRef = useRef<THREE.Mesh>(null)
  const haloRef = useRef<THREE.Mesh>(null)

  const activeSection = usePortfolioStore((s) => s.activeSection)
  const hoveredZone = usePortfolioStore((s) => s.hoveredZone)
  const hasEntered = usePortfolioStore((s) => s.hasEntered)
  const navigateTo = usePortfolioStore((s) => s.navigateTo)
  const setHoveredZone = usePortfolioStore((s) => s.setHoveredZone)

  useFrame((state) => {
    const t = state.clock.elapsedTime
    const isHovered = hoveredZone === zone

    if (innerRingRef.current) {
      const m = innerRingRef.current.material as THREE.MeshBasicMaterial
      m.opacity = isHovered ? 1 : 0.85 + Math.sin(t * 2.5) * 0.1
      const s = isHovered ? 1.2 : 1 + Math.sin(t * 2.5) * 0.05
      innerRingRef.current.scale.setScalar(s)
    }

    if (outerRingRef.current) {
      const m = outerRingRef.current.material as THREE.MeshBasicMaterial
      const pulse = (Math.sin(t * 1.4) + 1) / 2
      m.opacity = (isHovered ? 0.8 : 0.5) * (1 - pulse * 0.7)
      outerRingRef.current.scale.setScalar(1 + pulse * 0.7)
    }

    if (dotRef.current) {
      const m = dotRef.current.material as THREE.MeshBasicMaterial
      m.opacity = isHovered ? 1 : 0.9 + Math.sin(t * 3) * 0.1
    }

    if (haloRef.current) {
      const m = haloRef.current.material as THREE.MeshBasicMaterial
      m.opacity = isHovered ? 0.55 : 0.28 + Math.sin(t * 2) * 0.06
      haloRef.current.scale.setScalar(isHovered ? 1.18 : 1)
    }
  })

  if (activeSection || !hasEntered) return null

  return (
    <Billboard position={position}>
      {/* Soft halo backdrop */}
      <mesh ref={haloRef} renderOrder={10}>
        <circleGeometry args={[0.55, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0.28} depthWrite={false} depthTest={false} />
      </mesh>

      {/* Outer pulsing ring */}
      <mesh ref={outerRingRef} renderOrder={11}>
        <ringGeometry args={[0.32, 0.36, 48]} />
        <meshBasicMaterial color={color} transparent opacity={0.5} depthWrite={false} depthTest={false} />
      </mesh>

      {/* Inner solid ring */}
      <mesh ref={innerRingRef} renderOrder={12}>
        <ringGeometry args={[0.18, 0.22, 48]} />
        <meshBasicMaterial color={color} transparent opacity={0.95} depthWrite={false} depthTest={false} />
      </mesh>

      {/* Center dot */}
      <mesh ref={dotRef} renderOrder={13}>
        <circleGeometry args={[0.05, 16]} />
        <meshBasicMaterial color={color} transparent opacity={1} depthWrite={false} depthTest={false} />
      </mesh>

      {/* Invisible click puck — guarantees the marker itself is interactive */}
      <mesh
        position={[0, 0, 0.01]}
        renderOrder={14}
        onPointerEnter={(e) => {
          e.stopPropagation()
          setHoveredZone(zone)
          if (!isTouch) document.body.style.cursor = 'pointer'
        }}
        onPointerLeave={() => {
          setHoveredZone(null)
          if (!isTouch) document.body.style.cursor = 'default'
        }}
        onClick={(e) => {
          e.stopPropagation()
          navigateTo(zone)
          setHoveredZone(null)
          if (!isTouch) document.body.style.cursor = 'default'
        }}
      >
        <circleGeometry args={[0.55, 24]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} depthTest={false} />
      </mesh>
    </Billboard>
  )
}
