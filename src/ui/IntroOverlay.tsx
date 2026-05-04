import { motion, AnimatePresence } from 'framer-motion'
import usePortfolioStore from '../store/usePortfolioStore'
import { useIsMobile } from '../hooks/useIsMobile'
import { site } from '../data/site'

const ACCENT_DOTS = [
  { x: '12%', y: '22%', d: 0, c: '#7c5cff' },
  { x: '85%', y: '18%', d: 0.4, c: '#00d4ff' },
  { x: '78%', y: '78%', d: 0.8, c: '#ff5c8a' },
  { x: '15%', y: '76%', d: 1.2, c: '#56c596' },
] as const

export default function IntroOverlay() {
  const isLoaded = usePortfolioStore((s) => s.isLoaded)
  const hasEntered = usePortfolioStore((s) => s.hasEntered)
  const enterSite = usePortfolioStore((s) => s.enterSite)
  const { isMobile, isTouch } = useIsMobile()

  const show = isLoaded && !hasEntered

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          onClick={enterSite}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 150,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            pointerEvents: 'auto',
            background:
              'radial-gradient(ellipse at 50% 60%, rgba(124, 92, 255, 0.18) 0%, transparent 55%), linear-gradient(180deg, rgba(7,7,13,0.4) 0%, rgba(7,7,13,0.85) 100%)',
            overflow: 'hidden',
            padding: '0 1.5rem',
          }}
        >
          <div className="ambient-grid" />

          {/* Floating accent dots — hidden on mobile to avoid text overlap */}
          {!isMobile && ACCENT_DOTS.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.2, 0.6, 0.2] }}
              transition={{ duration: 4, repeat: Infinity, delay: p.d }}
              style={{
                position: 'absolute',
                left: p.x,
                top: p.y,
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: p.c,
                boxShadow: `0 0 16px ${p.c}`,
              }}
            />
          ))}

          {/* Status chip */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            style={{
              padding: '0.4rem 0.9rem',
              borderRadius: 999,
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid var(--color-border-strong)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--color-text-soft)',
              marginBottom: '1.4rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              backdropFilter: 'blur(8px)',
            }}
          >
            <span style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: '#56c596',
              boxShadow: '0 0 8px #56c596',
              animation: 'pulseDot 2s ease-in-out infinite',
            }} />
            Available for opportunities
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7 }}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.78rem',
              color: 'var(--color-muted)',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              marginBottom: '0.8rem',
            }}
          >
            Hello, I'm
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.8 }}
            style={{
              fontFamily: "'Space Grotesk', var(--font-sans)",
              fontSize: 'clamp(1.9rem, 8vw, 5rem)',
              fontWeight: 700,
              color: '#fff',
              letterSpacing: '-0.02em',
              textAlign: 'center',
              lineHeight: 1.05,
              backgroundImage: 'var(--grad-hero)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {site.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.7 }}
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(0.9rem, 2.5vw, 1.25rem)',
              fontWeight: 400,
              color: 'var(--color-text-soft)',
              marginTop: '0.9rem',
              textAlign: 'center',
              maxWidth: '34ch',
              lineHeight: 1.5,
            }}
          >
            {site.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            style={{
              marginTop: isMobile ? '2rem' : '3rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.6rem',
            }}
          >
            <div style={{
              padding: '0.75rem 1.6rem',
              borderRadius: 999,
              border: '1px solid rgba(124, 92, 255, 0.4)',
              background: 'rgba(124, 92, 255, 0.1)',
              color: '#fff',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.78rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              backdropFilter: 'blur(8px)',
            }}>
              Step Inside
            </div>
            <motion.p
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2.4, repeat: Infinity }}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                color: 'var(--color-muted)',
                letterSpacing: '0.1em',
              }}
            >
              {isTouch ? 'tap anywhere to continue' : 'click anywhere to continue'}
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
