import Desk from '../furniture/Desk'
import Bookshelf from '../furniture/Bookshelf'
import Whiteboard from '../furniture/Whiteboard'
import Plant from '../furniture/Plant'
import WallArt from '../furniture/WallArt'
import Window from '../furniture/Window'
import CeilingLight from '../furniture/CeilingLight'

export default function Room() {
  return (
    <group>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[12, 10]} />
        <meshStandardMaterial color="#221a30" roughness={0.85} metalness={0.05} />
      </mesh>

      {/* Floor planks (subtle stripes) */}
      {Array.from({ length: 6 }).map((_, i) => (
        <mesh
          key={i}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, 0.001, -4 + i * 1.6]}
          receiveShadow
        >
          <planeGeometry args={[12, 0.02]} />
          <meshBasicMaterial color="#0d0a14" transparent opacity={0.4} />
        </mesh>
      ))}

      {/* Ceiling */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 6, 0]}>
        <planeGeometry args={[12, 10]} />
        <meshStandardMaterial color="#0e0c18" roughness={0.95} />
      </mesh>

      {/* Back wall */}
      <mesh position={[0, 3, -5]} receiveShadow>
        <planeGeometry args={[12, 6]} />
        <meshStandardMaterial color="#28315a" roughness={0.85} />
      </mesh>

      {/* Left wall */}
      <mesh position={[-6, 3, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[10, 6]} />
        <meshStandardMaterial color="#2a3560" roughness={0.85} />
      </mesh>

      {/* Right wall */}
      <mesh position={[6, 3, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[10, 6]} />
        <meshStandardMaterial color="#2a3560" roughness={0.85} />
      </mesh>

      {/* Wall accent — back wall horizontal line trim at picture rail height */}
      <mesh position={[0, 4.2, -4.97]}>
        <boxGeometry args={[12, 0.04, 0.04]} />
        <meshStandardMaterial color="#2a3760" roughness={0.6} />
      </mesh>

      {/* Baseboards */}
      <mesh position={[0, 0.08, -4.97]}>
        <boxGeometry args={[12, 0.16, 0.06]} />
        <meshStandardMaterial color="#0d0f1a" roughness={0.6} />
      </mesh>
      <mesh position={[-5.97, 0.08, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[10, 0.16, 0.06]} />
        <meshStandardMaterial color="#0d0f1a" roughness={0.6} />
      </mesh>
      <mesh position={[5.97, 0.08, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <boxGeometry args={[10, 0.16, 0.06]} />
        <meshStandardMaterial color="#0d0f1a" roughness={0.6} />
      </mesh>

      {/* Rug under desk area */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.012, -1]}>
        <planeGeometry args={[8, 6]} />
        <meshStandardMaterial color="#241a36" roughness={0.95} />
      </mesh>
      {/* Rug border accent */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.013, -1]}>
        <ringGeometry args={[3.85, 3.95, 64]} />
        <meshBasicMaterial color="#7c5cff" transparent opacity={0.18} />
      </mesh>

      {/* Furniture and decor */}
      <Desk />
      <Bookshelf />
      <Whiteboard />
      <Window />
      <Plant />
      <WallArt />
      <CeilingLight />
    </group>
  )
}
