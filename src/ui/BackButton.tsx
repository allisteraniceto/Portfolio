import { motion, AnimatePresence } from 'framer-motion'
import usePortfolioStore from '../store/usePortfolioStore'
import { ArrowLeftIcon } from './icons'

export default function BackButton() {
  const activeSection = usePortfolioStore((s) => s.activeSection)
  const exitSection = usePortfolioStore((s) => s.exitSection)

  return (
    <AnimatePresence>
      {activeSection && (
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          onClick={exitSection}
          style={{
            position: 'fixed',
            top: '1.5rem',
            left: '1.5rem',
            zIndex: 110,
            pointerEvents: 'auto',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.6rem 1.1rem',
            background: 'var(--color-surface-strong)',
            border: '1px solid var(--color-border)',
            borderRadius: 999,
            color: 'var(--color-text-soft)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            letterSpacing: '0.05em',
            cursor: 'pointer',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            transition: 'all 0.25s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--color-accent-teal)'
            e.currentTarget.style.color = '#fff'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--color-border)'
            e.currentTarget.style.color = 'var(--color-text-soft)'
          }}
        >
          <ArrowLeftIcon size={14} />
          Back to Room
        </motion.button>
      )}
    </AnimatePresence>
  )
}
