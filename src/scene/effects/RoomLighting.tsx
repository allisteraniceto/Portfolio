export default function RoomLighting() {
  return (
    <>
      {/* Soft ambient base */}
      <ambientLight intensity={0.55} color="#bcc4dc" />

      {/* Hemisphere fill — sky tint above, warm bounce below */}
      <hemisphereLight args={['#6f86c8', '#1f1428', 0.55]} />

      {/* Key ceiling light */}
      <pointLight
        position={[0, 5.2, 0]}
        intensity={3.4}
        distance={16}
        decay={2}
        color="#fff2d8"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      {/* Window light from right side */}
      <directionalLight
        position={[7, 4.5, 1]}
        intensity={1.0}
        color="#a8c6ff"
      />

      {/* Sun glow accent through window */}
      <pointLight
        position={[5.7, 3, 0]}
        intensity={0.9}
        distance={6}
        decay={2}
        color="#ffd5a3"
      />

      {/* Monitor screen glow — cool */}
      <pointLight
        position={[3, 1.85, -1.4]}
        intensity={1.1}
        distance={4}
        decay={2}
        color="#00d4ff"
      />

      {/* Desk lamp warm glow */}
      <pointLight
        position={[2.05, 1.7, -2.6]}
        intensity={1.4}
        distance={3.8}
        decay={2}
        color="#ffb066"
      />

      {/* Whiteboard area soft fill */}
      <pointLight
        position={[0, 3.2, -3.5]}
        intensity={0.75}
        distance={7}
        decay={2}
        color="#e8eeff"
      />

      {/* Bookshelf area subtle warm */}
      <pointLight
        position={[-5, 3, -2.2]}
        intensity={0.7}
        distance={6}
        decay={2}
        color="#ffb66a"
      />

      {/* Accent rim from far back */}
      <pointLight
        position={[0, 0.6, 4]}
        intensity={0.4}
        distance={10}
        decay={2}
        color="#7c5cff"
      />
    </>
  )
}
