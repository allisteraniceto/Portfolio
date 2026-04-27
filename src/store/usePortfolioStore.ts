import { create } from 'zustand'

export interface CameraConfig {
  position: [number, number, number]
  target: [number, number, number]
  fov: number
}

export const CAMERA_POSITIONS: Record<string, CameraConfig> = {
  overview: {
    position: [0, 2.9, 6.4],
    target: [0, 1.9, -1.5],
    fov: 50,
  },
  projects: {
    position: [3.1, 2.3, 0.4],
    target: [3, 1.7, -2],
    fov: 42,
  },
  education: {
    position: [-3.6, 2.4, -0.2],
    target: [-5, 2, -3],
    fov: 42,
  },
  experience: {
    position: [0, 2.6, -1.2],
    target: [0, 2.2, -4.5],
    fov: 38,
  },
}

interface PortfolioState {
  isLoaded: boolean
  hasEntered: boolean
  activeSection: string | null
  hoveredZone: string | null
  isTransitioning: boolean

  setLoaded: () => void
  enterSite: () => void
  navigateTo: (section: string) => void
  exitSection: () => void
  setTransitionDone: () => void
  setHoveredZone: (zone: string | null) => void
}

const usePortfolioStore = create<PortfolioState>((set) => ({
  isLoaded: false,
  hasEntered: false,
  activeSection: null,
  hoveredZone: null,
  isTransitioning: false,

  setLoaded: () => set({ isLoaded: true }),
  enterSite: () => set({ hasEntered: true }),
  navigateTo: (section) => set({ activeSection: section, isTransitioning: true }),
  exitSection: () => set({ activeSection: null, isTransitioning: true }),
  setTransitionDone: () => set({ isTransitioning: false }),
  setHoveredZone: (zone) => set({ hoveredZone: zone }),
}))

export default usePortfolioStore
