import { motion, AnimatePresence } from 'framer-motion'
import usePortfolioStore from '../store/usePortfolioStore'
import { useIsMobile } from '../hooks/useIsMobile'
import ProjectsPanel from './panels/ProjectsPanel'
import EducationPanel from './panels/EducationPanel'
import ExperiencePanel from './panels/ExperiencePanel'
import { CodeIcon, BookIcon, BriefcaseIcon, CloseIcon } from './icons'
import type { JSX } from 'react'

const SECTION_META: Record<
  string,
  {
    title: string
    subtitle: string
    color: string
    gradient: string
    Icon: (p: { size?: number }) => JSX.Element
  }
> = {
  projects: {
    title: 'Personal Projects',
    subtitle: 'A selection of things I have been building.',
    color: 'var(--color-accent-teal)',
    gradient: 'linear-gradient(135deg, #00d4ff 0%, #7c5cff 100%)',
    Icon: CodeIcon,
  },
  education: {
    title: 'Education & Certifications',
    subtitle: 'Where I learned the fundamentals — and what I keep adding.',
    color: 'var(--color-accent-green)',
    gradient: 'linear-gradient(135deg, #56c596 0%, #00d4ff 100%)',
    Icon: BookIcon,
  },
  experience: {
    title: 'Work Experience',
    subtitle: 'Roles and the impact I delivered.',
    color: 'var(--color-accent-orange)',
    gradient: 'linear-gradient(135deg, #ff5c8a 0%, #f7971e 100%)',
    Icon: BriefcaseIcon,
  },
}

export default function SectionPanel() {
  const activeSection = usePortfolioStore((s) => s.activeSection)
  const exitSection = usePortfolioStore((s) => s.exitSection)
  const { isMobile } = useIsMobile()

  const meta = activeSection ? SECTION_META[activeSection] : null

  return (
    <AnimatePresence>
      {activeSection && meta && (
        <motion.div
          key={activeSection}
          initial={isMobile ? { y: '100%' } : { x: '100%' }}
          animate={isMobile ? { y: 0 } : { x: 0 }}
          exit={isMobile ? { y: '100%' } : { x: '100%' }}
          transition={{ type: 'spring', stiffness: 130, damping: 22 }}
          style={{
            position: 'fixed',
            ...(isMobile
              ? { bottom: 0, left: 0, right: 0, top: 'auto', width: '100%', height: '88dvh', maxHeight: '88dvh', borderRadius: '20px 20px 0 0', borderTop: '1px solid var(--color-border-strong)', borderLeft: 'none' }
              : { right: 0, top: 0, width: 'min(440px, 100vw)', height: '100vh', borderLeft: '1px solid var(--color-border-strong)', borderRadius: 0 }),
            background: 'linear-gradient(180deg, rgba(18,20,36,0.97) 0%, rgba(12,14,28,0.97) 100%)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            zIndex: 100,
            overflowY: 'auto',
            overflowX: 'hidden',
            pointerEvents: 'auto',
            boxShadow: isMobile
              ? '0 -20px 60px -10px rgba(0,0,0,0.7)'
              : '-30px 0 60px -20px rgba(0,0,0,0.5)',
          }}
        >
          {/* Top accent stripe / drag handle indicator */}
          {isMobile ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '0.75rem', paddingBottom: '0.25rem' }}>
              <div style={{ width: 36, height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.2)' }} />
            </div>
          ) : (
            <div style={{ position: 'sticky', top: 0, height: 3, background: meta.gradient, zIndex: 5 }} />
          )}

          {/* Close button */}
          <button
            onClick={exitSection}
            aria-label="Close panel"
            style={{
              position: 'absolute',
              top: isMobile ? '0.75rem' : '1rem',
              right: isMobile ? '0.75rem' : '1rem',
              width: isMobile ? 44 : 34,
              height: isMobile ? 44 : 34,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid var(--color-border)',
              borderRadius: isMobile ? 12 : 8,
              color: 'var(--color-muted)',
              cursor: 'pointer',
              zIndex: 10,
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'var(--color-border-strong)' }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-muted)'; e.currentTarget.style.borderColor = 'var(--color-border)' }}
          >
            <CloseIcon size={14} />
          </button>

          {/* Header */}
          <div style={{ padding: isMobile ? '0.75rem 1rem 1rem' : '2.2rem 1.6rem 1.2rem' }}>
            {/* Accent stripe (mobile shows it inside header) */}
            {isMobile && (
              <div style={{ height: 3, background: meta.gradient, borderRadius: 2, marginBottom: '1rem', width: 40 }} />
            )}

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.35rem 0.7rem',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid var(--color-border)',
                borderRadius: 999,
                marginBottom: '0.75rem',
              }}
            >
              <span style={{ color: meta.color, display: 'flex' }}>
                {(() => { const Icon = meta.Icon; return <Icon size={14} /> })()}
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--color-muted)', textTransform: 'uppercase', letterSpacing: '0.18em' }}>
                Section
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              style={{
                fontFamily: "'Space Grotesk', var(--font-sans)",
                fontSize: isMobile ? '1.4rem' : '1.7rem',
                fontWeight: 700,
                color: '#fff',
                letterSpacing: '-0.01em',
                lineHeight: 1.15,
              }}
            >
              {meta.title}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: 'var(--color-muted)', lineHeight: 1.55 }}
            >
              {meta.subtitle}
            </motion.p>
          </div>

          {/* Content */}
          <div style={{ padding: isMobile ? '0 1rem 2rem' : '0 1.6rem 2.5rem' }}>
            {activeSection === 'projects' && <ProjectsPanel />}
            {activeSection === 'education' && <EducationPanel />}
            {activeSection === 'experience' && <ExperiencePanel />}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
