export default function Whiteboard() {
  return (
    <group position={[0, 2.5, -4.95]}>
      {/* Frame */}
      <mesh castShadow>
        <boxGeometry args={[3.6, 2.05, 0.06]} />
        <meshStandardMaterial color="#7a7d8c" metalness={0.3} roughness={0.5} />
      </mesh>

      {/* Inner frame highlight */}
      <mesh position={[0, 0, 0.032]}>
        <boxGeometry args={[3.5, 1.95, 0.001]} />
        <meshBasicMaterial color="#a8aab8" />
      </mesh>

      {/* White surface */}
      <mesh position={[0, 0, 0.04]}>
        <boxGeometry args={[3.3, 1.8, 0.01]} />
        <meshStandardMaterial color="#f4f4ee" roughness={0.35} />
      </mesh>

      {/* Header band — like a marker title */}
      <mesh position={[-0.55, 0.7, 0.052]}>
        <boxGeometry args={[1.6, 0.06, 0.001]} />
        <meshBasicMaterial color="#1a1a4d" />
      </mesh>

      {/* Underline accent */}
      <mesh position={[-0.93, 0.62, 0.052]}>
        <boxGeometry args={[0.3, 0.012, 0.001]} />
        <meshBasicMaterial color="#f7971e" />
      </mesh>

      {/* Bullet writings */}
      {[
        { y: 0.4, w: 1.7, color: '#1a3a6a', dot: '#f7971e' },
        { y: 0.22, w: 1.4, color: '#1a3a6a', dot: '#f7971e' },
        { y: 0.04, w: 1.85, color: '#1a3a6a', dot: '#f7971e' },
        { y: -0.14, w: 1.2, color: '#1a3a6a', dot: '#f7971e' },
        { y: -0.32, w: 1.55, color: '#1a3a6a', dot: '#f7971e' },
      ].map((line, i) => (
        <group key={i}>
          {/* Bullet dot */}
          <mesh position={[-1.18, line.y, 0.052]}>
            <circleGeometry args={[0.018, 12]} />
            <meshBasicMaterial color={line.dot} />
          </mesh>
          {/* Line */}
          <mesh position={[-1.18 + line.w / 2 + 0.07, line.y, 0.052]}>
            <boxGeometry args={[line.w, 0.025, 0.001]} />
            <meshBasicMaterial color={line.color} transparent opacity={0.5} />
          </mesh>
        </group>
      ))}

      {/* Sticky note 1 */}
      <group position={[1.05, 0.35, 0.06]} rotation={[0, 0, 0.05]}>
        <mesh>
          <boxGeometry args={[0.4, 0.4, 0.005]} />
          <meshStandardMaterial color="#ffe066" roughness={0.5} />
        </mesh>
        {[0.1, 0, -0.1].map((y, i) => (
          <mesh key={i} position={[0, y, 0.003]}>
            <boxGeometry args={[0.3 - i * 0.04, 0.018, 0.001]} />
            <meshBasicMaterial color="#3a2a10" transparent opacity={0.6} />
          </mesh>
        ))}
      </group>

      {/* Sticky note 2 */}
      <group position={[1.0, -0.15, 0.06]} rotation={[0, 0, -0.08]}>
        <mesh>
          <boxGeometry args={[0.36, 0.36, 0.005]} />
          <meshStandardMaterial color="#ff8fa3" roughness={0.5} />
        </mesh>
        {[0.08, -0.02, -0.12].map((y, i) => (
          <mesh key={i} position={[0, y, 0.003]}>
            <boxGeometry args={[0.26 - i * 0.04, 0.016, 0.001]} />
            <meshBasicMaterial color="#3a1020" transparent opacity={0.6} />
          </mesh>
        ))}
      </group>

      {/* Magnet */}
      <mesh position={[0.45, 0.78, 0.058]}>
        <cylinderGeometry args={[0.04, 0.04, 0.012, 16]} />
        <meshStandardMaterial color="#e74c3c" roughness={0.4} metalness={0.3} />
      </mesh>

      {/* Ledge / marker tray */}
      <mesh position={[0, -0.97, 0.1]}>
        <boxGeometry args={[3.6, 0.06, 0.18]} />
        <meshStandardMaterial color="#5a5d6c" metalness={0.4} roughness={0.4} />
      </mesh>
      <mesh position={[0, -1.0, 0.18]}>
        <boxGeometry args={[3.6, 0.04, 0.04]} />
        <meshStandardMaterial color="#3e4150" metalness={0.4} />
      </mesh>

      {/* Markers on ledge */}
      {[
        { x: -0.5, color: '#e74c3c' },
        { x: -0.3, color: '#27c93f' },
        { x: -0.1, color: '#1a3a6a' },
        { x: 0.1, color: '#1a1a1a' },
        { x: 0.3, color: '#7c5cff' },
      ].map((marker, i) => (
        <mesh key={i} position={[marker.x, -0.92, 0.13]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.014, 0.014, 0.14, 8]} />
          <meshStandardMaterial color={marker.color} roughness={0.5} />
        </mesh>
      ))}

      {/* Eraser */}
      <mesh position={[0.55, -0.92, 0.13]}>
        <boxGeometry args={[0.18, 0.05, 0.06]} />
        <meshStandardMaterial color="#1a3a6a" roughness={0.7} />
      </mesh>
    </group>
  )
}
