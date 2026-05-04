import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'
import Scene from './scene/Scene'
import LoadingScreen from './ui/LoadingScreen'
import IntroOverlay from './ui/IntroOverlay'
import HUD from './ui/HUD'
import SectionPanel from './ui/SectionPanel'
import BackButton from './ui/BackButton'
import { useIsMobile } from './hooks/useIsMobile'

export default function App() {
  const { isMobile } = useIsMobile()

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', background: '#07070d' }}>
      <Canvas
        camera={{ position: [0, 2.9, 6.4], fov: 50, near: 0.1, far: 60 }}
        dpr={[1, isMobile ? 1.5 : 2]}
        shadows
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.22,
        }}
        style={{ position: 'absolute', inset: 0 }}
      >
        <Scene />
      </Canvas>

      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <LoadingScreen />
        <IntroOverlay />
        <HUD />
        <BackButton />
        <SectionPanel />
      </div>
    </div>
  )
}
