interface FrameProps {
  position: [number, number, number]
  size: [number, number]
  innerColor: string
  accentColor?: string
}

function Frame({ position, size, innerColor, accentColor }: FrameProps) {
  const [w, h] = size
  return (
    <group position={position}>
      {/* Frame */}
      <mesh>
        <boxGeometry args={[w, h, 0.03]} />
        <meshStandardMaterial color="#0a0d1a" roughness={0.6} />
      </mesh>
      {/* Inner art */}
      <mesh position={[0, 0, 0.018]}>
        <planeGeometry args={[w - 0.08, h - 0.08]} />
        <meshBasicMaterial color={innerColor} />
      </mesh>
      {accentColor && (
        <mesh position={[0, 0, 0.019]}>
          <ringGeometry args={[Math.min(w, h) * 0.18, Math.min(w, h) * 0.26, 32]} />
          <meshBasicMaterial color={accentColor} transparent opacity={0.85} />
        </mesh>
      )}
    </group>
  )
}

export default function WallArt() {
  // Picture rail of three frames on the back wall, far enough from whiteboard
  return (
    <group>
      {/* Left grouping above bookshelf area */}
      <Frame
        position={[-2.6, 4.5, -4.94]}
        size={[0.6, 0.8]}
        innerColor="#7c5cff"
        accentColor="#ffd5a3"
      />
      <Frame
        position={[-1.85, 4.5, -4.94]}
        size={[0.5, 0.5]}
        innerColor="#ff5c8a"
      />

      {/* Right grouping above PC tower area */}
      <Frame
        position={[1.95, 4.5, -4.94]}
        size={[0.55, 0.65]}
        innerColor="#00d4ff"
      />
      <Frame
        position={[2.65, 4.5, -4.94]}
        size={[0.45, 0.45]}
        innerColor="#56c596"
        accentColor="#ffffff"
      />
      <Frame
        position={[3.3, 4.5, -4.94]}
        size={[0.5, 0.7]}
        innerColor="#1a1a4d"
        accentColor="#ffd5a3"
      />
    </group>
  )
}
