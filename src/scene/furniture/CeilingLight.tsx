export default function CeilingLight() {
  return (
    <group position={[0, 5.95, 0]}>
      {/* Mount */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.06, 0.06, 0.06, 12]} />
        <meshStandardMaterial color="#1a1a2a" />
      </mesh>
      {/* Cord */}
      <mesh position={[0, -0.12, 0]}>
        <cylinderGeometry args={[0.012, 0.012, 0.18, 8]} />
        <meshStandardMaterial color="#0a0a14" />
      </mesh>
      {/* Lamp shade — pendant */}
      <mesh position={[0, -0.35, 0]}>
        <coneGeometry args={[0.32, 0.32, 24, 1, true]} />
        <meshStandardMaterial color="#2a2540" roughness={0.6} side={2} />
      </mesh>
      {/* Bulb glow */}
      <mesh position={[0, -0.42, 0]}>
        <sphereGeometry args={[0.13, 16, 16]} />
        <meshBasicMaterial color="#fff2d8" />
      </mesh>
      <mesh position={[0, -0.42, 0]}>
        <sphereGeometry args={[0.22, 16, 16]} />
        <meshBasicMaterial color="#fff2d8" transparent opacity={0.18} />
      </mesh>
    </group>
  )
}
