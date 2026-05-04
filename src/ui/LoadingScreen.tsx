import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import usePortfolioStore from '../store/usePortfolioStore'
import { site } from '../data/site'

export default function LoadingScreen() {
  const isLoaded = usePortfolioStore((s) => s.isLoaded)
  const setLoaded = usePortfolioStore((s) => s.setLoaded)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let frame: number
    const start = performance.now()
    const duration = 1600

    const tick = (now: number) => {
      const elapsed = now - start
      const pct = Math.min(elapsed / duration, 1) * 100
      setProgress(pct)
      if (pct < 100) {
        frame = requestAnimationFrame(tick)
      } else {
        setTimeout(() => setLoaded(), 300)
      }
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [setLoaded])

  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 200,
            pointerEvents: 'auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background:
              'radial-gradient(ellipse at center, #11111f 0%, #07070d 75%)',
            overflow: 'hidden',
          }}
        >
          <div className="ambient-grid" />

          {/* Brand mark */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: "'Space Grotesk', var(--font-sans)",
              fontSize: '1.4rem',
              fontWeight: 700,
              color: '#fff',
              background: 'var(--grad-hero)',
              boxShadow: '0 0 40px -8px rgba(124, 92, 255, 0.6)',
              marginBottom: '1.5rem',
              letterSpacing: '0.02em',
            }}
          >
            {site.initials}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.6 }}
            style={{
              fontFamily: "'Space Grotesk', var(--font-sans)",
              fontSize: '1.5rem',
              fontWeight: 600,
              color: 'var(--color-text)',
              letterSpacing: '0.02em',
            }}
          >
            {site.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              color: 'var(--color-muted)',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              marginTop: '0.5rem',
              marginBottom: '2.5rem',
            }}
          >
            {site.role}
          </motion.p>

          <div style={{
            width: 'min(220px, 70vw)',
            height: 2,
            background: 'rgba(255,255,255,0.08)',
            borderRadius: 1,
            overflow: 'hidden',
            position: 'relative',
          }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              style={{
                height: '100%',
                background: 'var(--grad-hero)',
                borderRadius: 1,
                boxShadow: '0 0 12px rgba(124, 92, 255, 0.6)',
              }}
            />
          </div>

          <p style={{
            marginTop: '0.9rem',
            fontSize: '0.7rem',
            color: 'var(--color-faint)',
            fontFamily: 'var(--font-mono)',
            letterSpacing: '0.15em',
          }}>
            {String(Math.round(progress)).padStart(3, '0')}%
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
