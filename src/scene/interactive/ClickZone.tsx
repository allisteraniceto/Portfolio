import usePortfolioStore from '../../store/usePortfolioStore'

interface ClickZoneProps {
  zone: string
  position: [number, number, number]
  size: [number, number, number]
}

export default function ClickZone({ zone, position, size }: ClickZoneProps) {
  const navigateTo = usePortfolioStore((s) => s.navigateTo)
  const setHoveredZone = usePortfolioStore((s) => s.setHoveredZone)
  const activeSection = usePortfolioStore((s) => s.activeSection)

  return (
    <mesh
      position={position}
      onPointerEnter={(e) => {
        if (!activeSection) {
          e.stopPropagation()
          setHoveredZone(zone)
          document.body.style.cursor = 'pointer'
        }
      }}
      onPointerLeave={() => {
        setHoveredZone(null)
        document.body.style.cursor = 'default'
      }}
      onClick={(e) => {
        if (!activeSection) {
          e.stopPropagation()
          navigateTo(zone)
          setHoveredZone(null)
          document.body.style.cursor = 'default'
        }
      }}
    >
      <boxGeometry args={size} />
      <meshBasicMaterial transparent opacity={0} />
    </mesh>
  )
}
