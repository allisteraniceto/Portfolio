import { useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import usePortfolioStore, { CAMERA_POSITIONS, type CameraConfig } from '../store/usePortfolioStore'
import { isTouch } from '../hooks/useIsMobile'

// Mobile portrait: lower position than before to reduce excessive ceiling space.
// Swipe left/right reveals bookshelf (x=-5) and desk (x=3) without needing to
// fit the entire room width in one view.
const OVERVIEW_MOBILE: CameraConfig = {
  position: [0, 2.8, 7.5],
  target: [0, 1.5, -1.5],
  fov: 75,
}

const PAN_X_LIMIT = 4.0
const PAN_Y_MIN = -0.8
const PAN_Y_MAX = 1.2

function clamp(v: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, v))
}

function isPortrait() {
  return typeof window !== 'undefined' && window.innerWidth < window.innerHeight
}

function resolveOverview(): CameraConfig {
  return isTouch && isPortrait() ? OVERVIEW_MOBILE : CAMERA_POSITIONS.overview
}

export default function CameraRig() {
  const { camera, gl } = useThree()
  const startConfig = resolveOverview()
  const targetLook = useRef(new THREE.Vector3(...startConfig.target))
  const currentPos = useRef(new THREE.Vector3(...startConfig.position))
  const activeSection = usePortfolioStore((s) => s.activeSection)
  const setTransitionDone = usePortfolioStore((s) => s.setTransitionDone)
  const wasTransitioning = useRef(false)
  const mouse = useRef({ x: 0, y: 0 })

  // Pan offset (world units) applied to the look-at target — driven by swipe/drag
  const panOffset = useRef({ x: 0, y: 0 })
  const lastPointer = useRef<{ x: number; y: number } | null>(null)
  const isDragging = useRef(false)

  useEffect(() => {
    const canvas = gl.domElement

    // ── Touch: swipe to look around ──────────────────────────────────────────
    const onTouchStart = (e: TouchEvent) => {
      if (usePortfolioStore.getState().activeSection) return
      const t = e.touches[0]
      lastPointer.current = { x: t.clientX, y: t.clientY }
    }

    const onTouchMove = (e: TouchEvent) => {
      if (!lastPointer.current) return
      if (usePortfolioStore.getState().activeSection) return
      const t = e.touches[0]
      const dx = t.clientX - lastPointer.current.x
      const dy = t.clientY - lastPointer.current.y
      panOffset.current.x = clamp(panOffset.current.x - dx * 0.018, -PAN_X_LIMIT, PAN_X_LIMIT)
      panOffset.current.y = clamp(panOffset.current.y + dy * 0.010, PAN_Y_MIN, PAN_Y_MAX)
      lastPointer.current = { x: t.clientX, y: t.clientY }
    }

    const onTouchEnd = () => {
      lastPointer.current = null
    }

    // ── Mouse: drag to look around on desktop ────────────────────────────────
    const onMouseDown = (e: MouseEvent) => {
      if (e.button !== 0) return
      if (usePortfolioStore.getState().activeSection) return
      isDragging.current = false
      lastPointer.current = { x: e.clientX, y: e.clientY }
    }

    const onMouseMove = (e: MouseEvent) => {
      if (!lastPointer.current) return
      const dx = e.clientX - lastPointer.current.x
      const dy = e.clientY - lastPointer.current.y
      if (Math.abs(dx) > 2 || Math.abs(dy) > 2) isDragging.current = true
      if (isDragging.current) {
        panOffset.current.x = clamp(panOffset.current.x - dx * 0.008, -PAN_X_LIMIT, PAN_X_LIMIT)
        panOffset.current.y = clamp(panOffset.current.y + dy * 0.005, PAN_Y_MIN, PAN_Y_MAX)
      }
      lastPointer.current = { x: e.clientX, y: e.clientY }
    }

    const onMouseUp = () => {
      lastPointer.current = null
      // Defer clear so R3F onClick fires before isDragging is reset
      setTimeout(() => { isDragging.current = false }, 0)
    }

    canvas.addEventListener('touchstart', onTouchStart, { passive: true })
    canvas.addEventListener('touchmove', onTouchMove, { passive: true })
    canvas.addEventListener('touchend', onTouchEnd)
    canvas.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)

    return () => {
      canvas.removeEventListener('touchstart', onTouchStart)
      canvas.removeEventListener('touchmove', onTouchMove)
      canvas.removeEventListener('touchend', onTouchEnd)
      canvas.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
    }
  }, [gl])

  useFrame((state, delta) => {
    const config = activeSection
      ? CAMERA_POSITIONS[activeSection]
      : resolveOverview()

    if (!config) return

    const t = state.clock.elapsedTime

    // Decay pan offset back to zero while navigated into a section
    if (activeSection) {
      const decay = 1 - Math.min(delta * 4, 0.9)
      panOffset.current.x *= decay
      panOffset.current.y *= decay
    }

    // Mouse parallax: pointer devices only, overview only, not while dragging
    if (!isTouch && !activeSection && !isDragging.current) {
      mouse.current.x += (state.pointer.x - mouse.current.x) * 0.05
      mouse.current.y += (state.pointer.y - mouse.current.y) * 0.05
    } else if (activeSection) {
      mouse.current.x += (0 - mouse.current.x) * 0.1
      mouse.current.y += (0 - mouse.current.y) * 0.1
    }

    const idleFloatX = activeSection
      ? 0
      : Math.sin(t * 0.25) * 0.12 + (isDragging.current ? 0 : mouse.current.x * 0.4)
    const idleFloatY = activeSection
      ? 0
      : Math.cos(t * 0.2) * 0.07 + (isDragging.current ? 0 : mouse.current.y * 0.15)

    const targetPos = new THREE.Vector3(
      config.position[0] + idleFloatX,
      config.position[1] + idleFloatY,
      config.position[2],
    )

    // Apply pan offset to look-at target (always use current value; decay handles section reset)
    const targetLookAt = new THREE.Vector3(
      config.target[0] + panOffset.current.x,
      config.target[1] + panOffset.current.y,
      config.target[2],
    )

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
