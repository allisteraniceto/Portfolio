import { motion, AnimatePresence } from 'framer-motion'
import type { JSX } from 'react'
import usePortfolioStore from '../store/usePortfolioStore'
import { site } from '../data/site'
import { GitHubIcon, LinkedInIcon, MailIcon, CodeIcon, BookIcon, BriefcaseIcon } from './icons'

const ZONE_META: Record<
  string,
  { title: string; subtitle: string; color: string; Icon: (p: { size?: number }) => JSX.Element }
> = {
  projects: {
    title: 'The Desk',
    subtitle: 'Personal Projects',
    color: 'var(--color-accent-teal)',
    Icon: CodeIcon,
  },
  education: {
    title: 'The Bookshelf',
    subtitle: 'Education & Certifications',
    color: 'var(--color-accent-green)',
    Icon: BookIcon,
  },
  experience: {
    title: 'The Whiteboard',
    subtitle: 'Work Experience',
    color: 'var(--color-accent-orange)',
    Icon: BriefcaseIcon,
  },
}

export default function HUD() {
  const hasEntered = usePortfolioStore((s) => s.hasEntered)
  const activeSection = usePortfolioStore((s) => s.activeSection)
  const hoveredZone = usePortfolioStore((s) => s.hoveredZone)
  const navigateTo = usePortfolioStore((s) => s.navigateTo)

  if (!hasEntered || activeSection) return null

  return (
    <>
      {/* Brand mark — top left */}
      <motion.div
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        style={{
          position: 'fixed',
          top: '1.5rem',
          left: '1.5rem',
          zIndex: 50,
          pointerEvents: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '0.7rem',
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: "'Space Grotesk', var(--font-sans)",
            fontSize: '0.85rem',
            fontWeight: 700,
            color: '#fff',
            background: 'var(--grad-hero)',
            boxShadow: '0 0 20px -6px rgba(124, 92, 255, 0.6)',
          }}
        >
          {site.initials}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.15 }}>
          <span
            style={{
              fontFamily: "'Space Grotesk', var(--font-sans)",
              fontSize: '0.92rem',
              fontWeight: 600,
              color: 'var(--color-text)',
              letterSpacing: '0.01em',
            }}
          >
            {site.name}
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              color: 'var(--color-muted)',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              marginTop: 2,
            }}
          >
            {site.role}
          </span>
        </div>
      </motion.div>

      {/* Section nav — top right */}
      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.6 }}
        style={{
          position: 'fixed',
          top: '1.5rem',
          right: '1.5rem',
          zIndex: 50,
          pointerEvents: 'auto',
          display: 'flex',
          gap: '0.4rem',
          padding: '0.4rem',
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: 999,
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
        }}
      >
        {(['projects', 'education', 'experience'] as const).map((zone) => {
          const meta = ZONE_META[zone]
          const Icon = meta.Icon
          const isHover = hoveredZone === zone
          return (
            <button
              key={zone}
              onClick={() => navigateTo(zone)}
              onMouseEnter={() => usePortfolioStore.getState().setHoveredZone(zone)}
              onMouseLeave={() => usePortfolioStore.getState().setHoveredZone(null)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.45rem 0.85rem',
                background: isHover ? 'rgba(255,255,255,0.06)' : 'transparent',
                color: isHover ? '#fff' : 'var(--color-text-soft)',
                border: 'none',
                borderRadius: 999,
                cursor: 'pointer',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.78rem',
                fontWeight: 500,
                letterSpacing: '0.02em',
                transition: 'all 0.2s',
              }}
            >
              <span style={{ color: meta.color, display: 'flex' }}>
                <Icon size={14} />
              </span>
              {meta.subtitle.split(' ')[0]}
            </button>
          )
        })}
      </motion.nav>

      {/* Social links — bottom right */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        style={{
          position: 'fixed',
          bottom: '1.5rem',
          right: '1.5rem',
          zIndex: 50,
          pointerEvents: 'auto',
          display: 'flex',
          gap: '0.5rem',
        }}
      >
        {[
          { href: site.links.github, Icon: GitHubIcon, label: 'GitHub' },
          { href: site.links.linkedin, Icon: LinkedInIcon, label: 'LinkedIn' },
          { href: `mailto:${site.email}`, Icon: MailIcon, label: 'Email' },
        ].map(({ href, Icon, label }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith('mailto') ? undefined : '_blank'}
            rel="noopener noreferrer"
            aria-label={label}
            style={{
              width: 38,
              height: 38,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 10,
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              color: 'var(--color-muted)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              transition: 'all 0.25s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#fff'
              e.currentTarget.style.borderColor = 'var(--color-border-strong)'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--color-muted)'
              e.currentTarget.style.borderColor = 'var(--color-border)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            <Icon size={16} />
          </a>
        ))}
      </motion.div>

      {/* Hover zone label — top center */}
      <AnimatePresence>
        {hoveredZone && ZONE_META[hoveredZone] && (
          <motion.div
            key={hoveredZone}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed',
              top: '5.5rem',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 50,
              pointerEvents: 'none',
              padding: '0.7rem 1.2rem',
              background: 'var(--color-surface-strong)',
              borderRadius: 12,
              border: '1px solid var(--color-border-strong)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.7rem',
              boxShadow: 'var(--shadow-soft)',
            }}
          >
            <span
              style={{
                color: ZONE_META[hoveredZone].color,
                display: 'flex',
              }}
            >
              {(() => {
                const Icon = ZONE_META[hoveredZone].Icon
                return <Icon size={16} />
              })()}
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  color: '#fff',
                }}
              >
                {ZONE_META[hoveredZone].title}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.68rem',
                  color: 'var(--color-muted)',
                  letterSpacing: '0.05em',
                  marginTop: 2,
                }}
              >
                {ZONE_META[hoveredZone].subtitle}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Idle hint — bottom center */}
      {!hoveredZone && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          style={{
            position: 'fixed',
            bottom: '1.7rem',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 40,
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <motion.span
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 2.4, repeat: Infinity }}
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: 'var(--color-accent-teal)',
              boxShadow: '0 0 8px var(--color-accent-teal)',
            }}
          />
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              color: 'var(--color-muted)',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
            }}
          >
            Hover the room — click to explore
          </p>
        </motion.div>
      )}
    </>
  )
}
