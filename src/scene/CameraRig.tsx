import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import usePortfolioStore, { CAMERA_POSITIONS, type CameraConfig } from '../store/usePortfolioStore'
import { isTouch } from '../hooks/useIsMobile'

// Mobile portrait: pull back and raise camera so the wide room fits the narrow viewport.
// FOV 82 gives enough horizontal angle to show bookshelf (x=-5) and desk (x=3)
// without extreme fish-eye distortion.
const OVERVIEW_MOBILE: CameraConfig = {
  position: [0, 4.8, 9.0],
  target: [0, 1.8, -2.0],
  fov: 82,
}

function isPortrait() {
  return typeof window !== 'undefined' && window.innerWidth < window.innerHeight
}

function resolveOverview(): CameraConfig {
  return isTouch && isPortrait() ? OVERVIEW_MOBILE : CAMERA_POSITIONS.overview
}

export default function CameraRig() {
  const { camera } = useThree()
  const startConfig = resolveOverview()
  const targetLook = useRef(new THREE.Vector3(...startConfig.target))
  const currentPos = useRef(new THREE.Vector3(...startConfig.position))
  const activeSection = usePortfolioStore((s) => s.activeSection)
  const setTransitionDone = usePortfolioStore((s) => s.setTransitionDone)
  const wasTransitioning = useRef(false)
  const mouse = useRef({ x: 0, y: 0 })

  useFrame((state, delta) => {
    const config = activeSection
      ? CAMERA_POSITIONS[activeSection]
      : resolveOverview()

    if (!config) return

    const t = state.clock.elapsedTime

    // Mouse parallax only on pointer (non-touch) devices in overview
    if (!isTouch && !activeSection) {
      mouse.current.x += (state.pointer.x - mouse.current.x) * 0.05
      mouse.current.y += (state.pointer.y - mouse.current.y) * 0.05
    } else if (activeSection) {
      mouse.current.x += (0 - mouse.current.x) * 0.1
      mouse.current.y += (0 - mouse.current.y) * 0.1
    }

    const idleFloatX = activeSection
      ? 0
      : Math.sin(t * 0.25) * 0.12 + mouse.current.x * 0.4
    const idleFloatY = activeSection
      ? 0
      : Math.cos(t * 0.2) * 0.07 + mouse.current.y * 0.15

    const targetPos = new THREE.Vector3(
      config.position[0] + idleFloatX,
      config.position[1] + idleFloatY,
      config.position[2],
    )
    const targetLookAt = new THREE.Vector3(...config.target)

    const smoothing = 1 - Math.pow(0.001, delta)

    currentPos.current.lerp(targetPos, smoothing * 2)
    targetLook.current.lerp(targetLookAt, smoothing * 2)

    if ('fov' in camera) {
      const persp = camera as THREE.PerspectiveCamera
      persp.fov += (config.fov - persp.fov) * smoothing * 2
      persp.updateProjectionMatrix()
    }

    camera.position.copy(currentPos.current)
    camera.lookAt(targetLook.current)

    const distance = currentPos.current.distanceTo(
      new THREE.Vector3(...config.position),
    )
    if (wasTransitioning.current && distance < 0.05) {
      setTransitionDone()
      wasTransitioning.current = false
    }
    if (distance > 0.1) {
      wasTransitioning.current = true
    }
  })

  return null
}
