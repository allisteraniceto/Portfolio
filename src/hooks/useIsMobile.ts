import { useEffect, useState } from 'react'

const MOBILE_BREAKPOINT = 768

// isTouch is set once — it never changes after mount
const isTouch: boolean =
  typeof window !== 'undefined' &&
  ('ontouchstart' in window || navigator.maxTouchPoints > 0)

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < MOBILE_BREAKPOINT : false,
  )

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  return { isMobile, isTouch }
}

/** Statically check touch without React — safe to use outside components */
export { isTouch }
