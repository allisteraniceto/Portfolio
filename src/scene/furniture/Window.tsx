export default function Window() {
  // Mounted on the right wall (x = 6, facing -x)
  return (
    <group position={[5.97, 3, 0]} rotation={[0, -Math.PI / 2, 0]}>
      {/* Outer frame */}
      <mesh position={[0, 0, 0.01]}>
        <boxGeometry args={[3.6, 2.6, 0.06]} />
        <meshStandardMaterial color="#13192e" roughness={0.7} />
      </mesh>

      {/* Sky pane — soft gradient via two stacked plates */}
      <mesh position={[0, 0, 0.04]}>
        <planeGeometry args={[3.4, 2.4]} />
        <meshBasicMaterial color="#3a4f88" />
      </mesh>
      <mesh position={[0, 0.6, 0.045]}>
        <planeGeometry args={[3.4, 1.2]} />
        <meshBasicMaterial color="#7896d8" transparent opacity={0.9} />
      </mesh>

      {/* Sun glow */}
      <mesh position={[0.7, 0.4, 0.05]}>
        <circleGeometry args={[0.35, 32]} />
        <meshBasicMaterial color="#fff0d0" />
      </mesh>
      <mesh position={[0.7, 0.4, 0.049]}>
        <circleGeometry args={[0.7, 32]} />
        <meshBasicMaterial color="#ffd5a3" transparent opacity={0.35} />
      </mesh>

      {/* Cross mullions */}
      <mesh position={[0, 0, 0.07]}>
        <boxGeometry args={[3.4, 0.05, 0.02]} />
        <meshStandardMaterial color="#0a0d1a" />
      </mesh>
      <mesh position={[0, 0, 0.07]}>
        <boxGeometry args={[0.05, 2.4, 0.02]} />
        <meshStandardMaterial color="#0a0d1a" />
      </mesh>

      {/* Sill */}
      <mesh position={[0, -1.38, 0.1]}>
        <boxGeometry args={[3.7, 0.1, 0.2]} />
        <meshStandardMaterial color="#23304f" roughness={0.6} />
      </mesh>
    </group>
  )
}
