import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import usePortfolioStore, { CAMERA_POSITIONS } from '../store/usePortfolioStore'

export default function CameraRig() {
  const { camera } = useThree()
  const targetLook = useRef(new THREE.Vector3(0, 1.9, -1.5))
  const currentPos = useRef(new THREE.Vector3(0, 2.9, 6.4))
  const activeSection = usePortfolioStore((s) => s.activeSection)
  const setTransitionDone = usePortfolioStore((s) => s.setTransitionDone)
  const wasTransitioning = useRef(false)
  const mouse = useRef({ x: 0, y: 0 })

  useFrame((state, delta) => {
    const config = activeSection
      ? CAMERA_POSITIONS[activeSection]
      : CAMERA_POSITIONS.overview

    if (!config) return

    const t = state.clock.elapsedTime
    // Smooth pointer parallax — only in overview mode
    const targetMx = activeSection ? 0 : state.pointer.x
    const targetMy = activeSection ? 0 : state.pointer.y
    mouse.current.x += (targetMx - mouse.current.x) * 0.05
    mouse.current.y += (targetMy - mouse.current.y) * 0.05

    const idleFloatX = activeSection ? 0 : Math.sin(t * 0.25) * 0.15 + mouse.current.x * 0.4
    const idleFloatY = activeSection ? 0 : Math.cos(t * 0.2) * 0.08 + mouse.current.y * 0.18

    const targetPos = new THREE.Vector3(
      config.position[0] + idleFloatX,
      config.position[1] + idleFloatY,
      config.position[2],
    )
    const targetLookAt = new THREE.Vector3(...config.target)

    const smoothing = 1 - Math.pow(0.001, delta)

    currentPos.current.lerp(targetPos, smoothing * 2)
    targetLook.current.lerp(targetLookAt, smoothing * 2)

    // Smoothly interpolate FOV
    if ('fov' in camera) {
      const persp = camera as THREE.PerspectiveCamera
      const targetFov = config.fov
      persp.fov += (targetFov - persp.fov) * smoothing * 2
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
