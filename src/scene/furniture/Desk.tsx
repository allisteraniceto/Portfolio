import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Desk() {
  const screenRef = useRef<THREE.Mesh>(null)
  const lampGlowRef = useRef<THREE.Mesh>(null)
  const sidePanelRef = useRef<THREE.Mesh>(null)

  // Procedural code-like screen content lines
  const codeLines = useMemo(() => {
    const lines: { y: number; color: string; widths: number[]; indent: number }[] = []
    const palette = ['#7be1ff', '#7c5cff', '#56c596', '#ff7da6', '#f6e05e']
    for (let i = 0; i < 12; i++) {
      const indent = Math.random() < 0.4 ? 0 : Math.random() < 0.5 ? 0.05 : 0.1
      const tokens = 2 + Math.floor(Math.random() * 4)
      const widths: number[] = []
      for (let t = 0; t < tokens; t++) {
        widths.push(0.05 + Math.random() * 0.2)
      }
      lines.push({
        y: 0.32 - i * 0.06,
        color: palette[i % palette.length],
        widths,
        indent,
      })
    }
    return lines
  }, [])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (screenRef.current) {
      const material = screenRef.current.material as THREE.MeshStandardMaterial
      material.emissiveIntensity = 0.55 + Math.sin(t * 0.6) * 0.08
    }
    if (lampGlowRef.current) {
      const material = lampGlowRef.current.material as THREE.MeshBasicMaterial
      material.opacity = 0.85 + Math.sin(t * 1.4) * 0.05
    }
    if (sidePanelRef.current) {
      const material = sidePanelRef.current.material as THREE.MeshStandardMaterial
      material.emissiveIntensity = 0.4 + Math.sin(t * 1.1) * 0.15
    }
  })

  return (
    <group position={[3, 0, -3]}>
      {/* Desk top */}
      <mesh position={[0, 1.05, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.8, 0.08, 1.4]} />
        <meshStandardMaterial color="#2e2014" roughness={0.55} metalness={0.05} />
      </mesh>
      {/* Desk top edge highlight */}
      <mesh position={[0, 1.09, 0.71]}>
        <boxGeometry args={[2.8, 0.005, 0.001]} />
        <meshBasicMaterial color="#5a3d22" />
      </mesh>

      {/* Left leg */}
      <mesh position={[-1.3, 0.5, 0]} castShadow>
        <boxGeometry args={[0.06, 1, 1.3]} />
        <meshStandardMaterial color="#1a130a" roughness={0.7} />
      </mesh>

      {/* Right leg */}
      <mesh position={[1.3, 0.5, 0]} castShadow>
        <boxGeometry args={[0.06, 1, 1.3]} />
        <meshStandardMaterial color="#1a130a" roughness={0.7} />
      </mesh>

      {/* Back support */}
      <mesh position={[0, 0.5, -0.6]}>
        <boxGeometry args={[2.6, 0.8, 0.04]} />
        <meshStandardMaterial color="#1a130a" roughness={0.7} />
      </mesh>

      {/* Monitor stand */}
      <mesh position={[0, 1.25, -0.3]}>
        <cylinderGeometry args={[0.04, 0.08, 0.35, 12]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.85} roughness={0.25} />
      </mesh>
      <mesh position={[0, 1.09, -0.3]}>
        <boxGeometry args={[0.4, 0.02, 0.25]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.85} roughness={0.25} />
      </mesh>

      {/* Monitor frame */}
      <mesh position={[0, 1.75, -0.4]} castShadow>
        <boxGeometry args={[1.6, 0.95, 0.06]} />
        <meshStandardMaterial color="#0d0d0d" metalness={0.55} roughness={0.4} />
      </mesh>

      {/* Monitor screen */}
      <mesh ref={screenRef} position={[0, 1.75, -0.36]}>
        <boxGeometry args={[1.45, 0.82, 0.01]} />
        <meshStandardMaterial
          color="#0a1628"
          emissive="#1a3a6a"
          emissiveIntensity={0.55}
        />
      </mesh>

      {/* Window chrome bar */}
      <mesh position={[0, 2.12, -0.355]}>
        <boxGeometry args={[1.45, 0.06, 0.001]} />
        <meshBasicMaterial color="#101a2e" />
      </mesh>
      {/* Three traffic dots */}
      {[-0.62, -0.55, -0.48].map((x, i) => (
        <mesh key={i} position={[x, 2.12, -0.354]}>
          <circleGeometry args={[0.012, 12]} />
          <meshBasicMaterial color={['#ff5f56', '#ffbd2e', '#27c93f'][i]} />
        </mesh>
      ))}

      {/* Screen content — code-like lines */}
      {codeLines.map((line, i) => {
        let x = -0.65 + line.indent
        return (
          <group key={i}>
            {line.widths.map((w, j) => {
              const node = (
                <mesh key={j} position={[x + w / 2, 1.75 + line.y, -0.349]}>
                  <boxGeometry args={[w, 0.018, 0.001]} />
                  <meshBasicMaterial color={line.color} transparent opacity={0.7} />
                </mesh>
              )
              x += w + 0.02
              return node
            })}
          </group>
        )
      })}

      {/* Cursor blink */}
      <mesh position={[-0.6, 1.42, -0.349]}>
        <boxGeometry args={[0.014, 0.025, 0.001]} />
        <meshBasicMaterial color="#7c5cff" />
      </mesh>

      {/* Keyboard */}
      <mesh position={[0, 1.1, 0.2]} castShadow>
        <boxGeometry args={[0.78, 0.025, 0.27]} />
        <meshStandardMaterial color="#1c1c22" roughness={0.5} />
      </mesh>
      {/* Keyboard backlight glow */}
      <mesh position={[0, 1.114, 0.2]}>
        <boxGeometry args={[0.74, 0.001, 0.23]} />
        <meshBasicMaterial color="#7c5cff" transparent opacity={0.18} />
      </mesh>

      {/* Mouse pad */}
      <mesh position={[0.6, 1.092, 0.2]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.34, 0.27]} />
        <meshStandardMaterial color="#15131e" roughness={0.95} />
      </mesh>
      {/* Mouse */}
      <mesh position={[0.6, 1.115, 0.2]}>
        <boxGeometry args={[0.09, 0.025, 0.14]} />
        <meshStandardMaterial color="#1c1c22" roughness={0.4} />
      </mesh>
      <mesh position={[0.6, 1.13, 0.16]}>
        <boxGeometry args={[0.04, 0.001, 0.06]} />
        <meshBasicMaterial color="#7c5cff" transparent opacity={0.6} />
      </mesh>

      {/* Coffee mug */}
      <group position={[-0.95, 1.09, 0.2]}>
        <mesh>
          <cylinderGeometry args={[0.07, 0.06, 0.16, 16]} />
          <meshStandardMaterial color="#f3f3f0" roughness={0.4} />
        </mesh>
        {/* Coffee */}
        <mesh position={[0, 0.075, 0]}>
          <cylinderGeometry args={[0.062, 0.062, 0.005, 16]} />
          <meshStandardMaterial color="#3a1f10" roughness={0.4} />
        </mesh>
        {/* Handle */}
        <mesh position={[0.085, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.04, 0.012, 8, 16]} />
          <meshStandardMaterial color="#f3f3f0" roughness={0.4} />
        </mesh>
      </group>

      {/* Notebook */}
      <group position={[-0.55, 1.094, 0.25]} rotation={[0, 0.15, 0]}>
        <mesh>
          <boxGeometry args={[0.32, 0.012, 0.42]} />
          <meshStandardMaterial color="#1a1320" roughness={0.7} />
        </mesh>
        <mesh position={[0, 0.0065, 0]}>
          <boxGeometry args={[0.3, 0.001, 0.4]} />
          <meshBasicMaterial color="#7c5cff" transparent opacity={0.4} />
        </mesh>
        {/* Pen on top */}
        <mesh position={[0.05, 0.012, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.008, 0.008, 0.22, 8]} />
          <meshStandardMaterial color="#c0c0d0" metalness={0.7} roughness={0.3} />
        </mesh>
      </group>

      {/* Desk lamp — articulated */}
      <group position={[-1.05, 1.09, -0.4]}>
        {/* Base */}
        <mesh position={[0, 0.04, 0]}>
          <cylinderGeometry args={[0.12, 0.14, 0.04, 16]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.7} roughness={0.4} />
        </mesh>
        {/* Lower arm */}
        <mesh position={[0.12, 0.32, 0]} rotation={[0, 0, -0.5]}>
          <cylinderGeometry args={[0.012, 0.012, 0.55, 8]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.7} roughness={0.3} />
        </mesh>
        {/* Joint */}
        <mesh position={[0.27, 0.55, 0]}>
          <sphereGeometry args={[0.025, 12, 12]} />
          <meshStandardMaterial color="#0a0a0a" metalness={0.85} />
        </mesh>
        {/* Upper arm */}
        <mesh position={[0.42, 0.62, 0]} rotation={[0, 0, 0.4]}>
          <cylinderGeometry args={[0.012, 0.012, 0.4, 8]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.7} roughness={0.3} />
        </mesh>
        {/* Lamp head */}
        <group position={[0.58, 0.78, 0]} rotation={[0, 0, -0.7]}>
          <mesh>
            <coneGeometry args={[0.13, 0.18, 16, 1, true]} />
            <meshStandardMaterial color="#26262e" metalness={0.6} roughness={0.4} side={2} />
          </mesh>
          {/* Bulb */}
          <mesh ref={lampGlowRef} position={[0, -0.05, 0]}>
            <sphereGeometry args={[0.07, 12, 12]} />
            <meshBasicMaterial color="#ffd5a3" transparent opacity={0.9} />
          </mesh>
        </group>
      </group>

      {/* PC Tower */}
      <group position={[1.6, 0.55, -0.2]}>
        <mesh castShadow>
          <boxGeometry args={[0.24, 0.55, 0.5]} />
          <meshStandardMaterial color="#15151c" metalness={0.55} roughness={0.45} />
        </mesh>
        {/* Power LED */}
        <mesh position={[-0.125, 0.18, 0.251]}>
          <circleGeometry args={[0.012, 12]} />
          <meshBasicMaterial color="#56ffb6" />
        </mesh>
        {/* Brand panel slit */}
        <mesh position={[-0.125, 0, 0.251]}>
          <boxGeometry args={[0.001, 0.05, 0.18]} />
          <meshBasicMaterial color="#7c5cff" />
        </mesh>
        {/* Glass side panel with RGB glow */}
        <mesh ref={sidePanelRef} position={[0.121, 0, 0]}>
          <boxGeometry args={[0.005, 0.5, 0.45]} />
          <meshStandardMaterial
            color="#0a0a14"
            emissive="#7c5cff"
            emissiveIntensity={0.5}
            transparent
            opacity={0.4}
          />
        </mesh>
        {/* Fan circles on glass */}
        {[0.12, -0.05, -0.22].map((y, i) => (
          <mesh key={i} position={[0.123, y, 0]}>
            <ringGeometry args={[0.05, 0.06, 24]} />
            <meshBasicMaterial color="#00d4ff" transparent opacity={0.6} />
          </mesh>
        ))}
      </group>

      {/* Headphones hanging on monitor */}
      <group position={[-0.78, 1.95, -0.35]} rotation={[0, 0.2, 0]}>
        <mesh position={[0, 0, 0]}>
          <torusGeometry args={[0.13, 0.018, 8, 24, Math.PI]} />
          <meshStandardMaterial color="#15151c" metalness={0.4} roughness={0.5} />
        </mesh>
        <mesh position={[-0.13, -0.05, 0]}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshStandardMaterial color="#1a1a22" roughness={0.6} />
        </mesh>
        <mesh position={[0.13, -0.05, 0]}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshStandardMaterial color="#1a1a22" roughness={0.6} />
        </mesh>
      </group>

      {/* Chair — refined */}
      <group position={[0, 0, 1.5]}>
        {/* Seat */}
        <mesh position={[0, 0.7, 0]} castShadow>
          <boxGeometry args={[0.62, 0.08, 0.58]} />
          <meshStandardMaterial color="#15131e" roughness={0.7} />
        </mesh>
        {/* Seat cushion top */}
        <mesh position={[0, 0.745, 0]}>
          <boxGeometry args={[0.58, 0.005, 0.54]} />
          <meshBasicMaterial color="#1f1c2e" />
        </mesh>
        {/* Back rest */}
        <mesh position={[0, 1.2, -0.27]} castShadow>
          <boxGeometry args={[0.55, 0.86, 0.06]} />
          <meshStandardMaterial color="#15131e" roughness={0.7} />
        </mesh>
        {/* Headrest */}
        <mesh position={[0, 1.7, -0.27]}>
          <boxGeometry args={[0.4, 0.18, 0.07]} />
          <meshStandardMaterial color="#15131e" roughness={0.7} />
        </mesh>
        {/* Accent stripe on backrest */}
        <mesh position={[0, 1.2, -0.235]}>
          <boxGeometry args={[0.04, 0.7, 0.001]} />
          <meshBasicMaterial color="#7c5cff" transparent opacity={0.5} />
        </mesh>
        {/* Center column */}
        <mesh position={[0, 0.4, 0]}>
          <cylinderGeometry args={[0.035, 0.035, 0.55, 12]} />
          <meshStandardMaterial color="#1a1a22" metalness={0.85} roughness={0.25} />
        </mesh>
        {/* Star base */}
        {Array.from({ length: 5 }).map((_, i) => {
          const a = (i / 5) * Math.PI * 2
          return (
            <mesh
              key={i}
              position={[Math.cos(a) * 0.18, 0.05, Math.sin(a) * 0.18]}
              rotation={[0, -a, 0]}
            >
              <boxGeometry args={[0.32, 0.04, 0.06]} />
              <meshStandardMaterial color="#1a1a22" metalness={0.85} roughness={0.25} />
            </mesh>
          )
        })}
        {/* Wheels */}
        {Array.from({ length: 5 }).map((_, i) => {
          const a = (i / 5) * Math.PI * 2
          return (
            <mesh
              key={i}
              position={[Math.cos(a) * 0.32, 0.025, Math.sin(a) * 0.32]}
            >
              <sphereGeometry args={[0.025, 12, 12]} />
              <meshStandardMaterial color="#0a0a0e" roughness={0.4} />
            </mesh>
          )
        })}
      </group>
    </group>
  )
}
