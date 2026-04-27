import { Suspense } from 'react'
import Room from './room/Room'
import CameraRig from './CameraRig'
import RoomLighting from './effects/RoomLighting'
import PostProcessing from './effects/PostProcessing'
import DustParticles from './effects/DustParticles'
import ClickZone from './interactive/ClickZone'
import HotspotMarker from './interactive/HotspotMarker'

export default function Scene() {
  return (
    <>
      <color attach="background" args={['#07070d']} />
      <fog attach="fog" args={['#0a0a18', 11, 24]} />

      <RoomLighting />
      <CameraRig />

      <Suspense fallback={null}>
        <Room />
        <DustParticles />

        {/* Click zones — sized to wrap both the furniture and its hotspot marker */}
        <ClickZone zone="projects" position={[3, 1.95, -2.6]} size={[4, 4, 3]} />
        <ClickZone zone="education" position={[-5, 2.6, -3]} size={[2.8, 5.3, 2.8]} />
        <ClickZone zone="experience" position={[0, 2.8, -4.5]} size={[4.2, 3, 1.6]} />
      </Suspense>

      {/* Hotspot markers rendered after main scene to ensure they're on top */}
      <Suspense fallback={null}>
        <HotspotMarker zone="projects" position={[3, 3.2, -2]} color="#00d4ff" />
        <HotspotMarker zone="education" position={[-5, 4.85, -3]} color="#56c596" />
        <HotspotMarker zone="experience" position={[0, 4.05, -4.5]} color="#f7971e" />
      </Suspense>

      <PostProcessing />
    </>
  )
}
