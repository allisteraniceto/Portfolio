import { motion, AnimatePresence } from 'framer-motion'
import type { JSX } from 'react'
import usePortfolioStore from '../store/usePortfolioStore'
import { site } from '../data/site'
import { useIsMobile } from '../hooks/useIsMobile'
import { GitHubIcon, LinkedInIcon, MailIcon, CodeIcon, BookIcon, BriefcaseIcon } from './icons'

const ZONE_META: Record<
  string,
  { title: string; subtitle: string; label: string; color: string; Icon: (p: { size?: number }) => JSX.Element }
> = {
  projects: {
    title: 'The Desk',
    subtitle: 'Personal Projects',
    label: 'Projects',
    color: 'var(--color-accent-teal)',
    Icon: CodeIcon,
  },
  education: {
    title: 'The Bookshelf',
    subtitle: 'Education & Certifications',
    label: 'Education',
    color: 'var(--color-accent-green)',
    Icon: BookIcon,
  },
  experience: {
    title: 'The Whiteboard',
    subtitle: 'Work Experience',
    label: 'Work',
    color: 'var(--color-accent-orange)',
    Icon: BriefcaseIcon,
  },
}

const SOCIAL_LINKS = [
  { href: site.links.github, Icon: GitHubIcon, label: 'GitHub' },
  { href: site.links.linkedin, Icon: LinkedInIcon, label: 'LinkedIn' },
  { href: `mailto:${site.email}`, Icon: MailIcon, label: 'Email' },
] as const

export default function HUD() {
  const hasEntered = usePortfolioStore((s) => s.hasEntered)
  const activeSection = usePortfolioStore((s) => s.activeSection)
  const hoveredZone = usePortfolioStore((s) => s.hoveredZone)
  const navigateTo = usePortfolioStore((s) => s.navigateTo)
  const { isMobile, isTouch } = useIsMobile()

  if (!hasEntered || activeSection) return null

  if (isMobile) {
    return <MobileHUD navigateTo={navigateTo} />
  }

  return <DesktopHUD hoveredZone={hoveredZone} navigateTo={navigateTo} isTouch={isTouch} />
}

/* ── Desktop layout ─────────────────────────────────────────────────────── */
function DesktopHUD({
  hoveredZone,
  navigateTo,
  isTouch,
}: {
  hoveredZone: string | null
  navigateTo: (s: string) => void
  isTouch: boolean
}) {
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
        <BrandMark size={36} />
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.15 }}>
          <span style={{ fontFamily: "'Space Grotesk', var(--font-sans)", fontSize: '0.92rem', fontWeight: 600, color: 'var(--color-text)', letterSpacing: '0.01em' }}>
            {site.name}
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--color-muted)', letterSpacing: '0.18em', textTransform: 'uppercase', marginTop: 2 }}>
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
        {Object.entries(ZONE_META).map(([zone, meta]) => {
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
                minHeight: 36,
              }}
            >
              <span style={{ color: meta.color, display: 'flex' }}><Icon size={14} /></span>
              {meta.label}
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
        {SOCIAL_LINKS.map(({ href, Icon, label }) => (
          <SocialBtn key={label} href={href} Icon={Icon} label={label} />
        ))}
      </motion.div>

      {/* Hover zone label — top center */}
      <AnimatePresence>
        {!isTouch && hoveredZone && ZONE_META[hoveredZone] && (
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
            <span style={{ color: ZONE_META[hoveredZone].color, display: 'flex' }}>
              {(() => { const Icon = ZONE_META[hoveredZone].Icon; return <Icon size={16} /> })()}
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.82rem', fontWeight: 600, color: '#fff' }}>
                {ZONE_META[hoveredZone].title}
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--color-muted)', letterSpacing: '0.05em', marginTop: 2 }}>
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
            style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--color-accent-teal)', boxShadow: '0 0 8px var(--color-accent-teal)', flexShrink: 0 }}
          />
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--color-muted)', letterSpacing: '0.15em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
            Hover the room — click to explore
          </p>
        </motion.div>
      )}
    </>
  )
}

/* ── Mobile layout ──────────────────────────────────────────────────────── */
function MobileHUD({ navigateTo }: { navigateTo: (s: string) => void }) {
  return (
    <>
      {/* Top bar: brand mark */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          pointerEvents: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
          padding: '0.75rem 1rem',
          background: 'linear-gradient(180deg, rgba(7,7,13,0.85) 0%, transparent 100%)',
        }}
      >
        <BrandMark size={30} />
        <span style={{ fontFamily: "'Space Grotesk', var(--font-sans)", fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text)' }}>
          {site.name}
        </span>
      </motion.div>

      {/* Bottom floating bar: section nav + socials */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="safe-bottom"
        style={{
          position: 'fixed',
          bottom: '1rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 50,
          pointerEvents: 'auto',
          display: 'flex',
          alignItems: 'center',
          gap: '0.1rem',
          padding: '0.3rem',
          background: 'var(--color-surface-strong)',
          border: '1px solid var(--color-border-strong)',
          borderRadius: 999,
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          boxShadow: '0 8px 32px -8px rgba(0,0,0,0.6)',
        }}
      >
        {/* Section buttons — icon-only to keep the pill narrow */}
        {Object.entries(ZONE_META).map(([zone, meta]) => {
          const Icon = meta.Icon
          return (
            <button
              key={zone}
              onClick={() => navigateTo(zone)}
              aria-label={meta.label}
              title={meta.label}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 48,
                height: 48,
                background: 'transparent',
                border: 'none',
                borderRadius: 999,
                cursor: 'pointer',
                color: meta.color,
                transition: 'background 0.2s',
                flexShrink: 0,
              }}
              onTouchStart={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)' }}
              onTouchEnd={(e) => { e.currentTarget.style.background = 'transparent' }}
            >
              <Icon size={20} />
            </button>
          )
        })}

        {/* Divider */}
        <div style={{ width: 1, height: 24, background: 'var(--color-border-strong)', margin: '0 0.1rem', flexShrink: 0 }} />

        {/* Social links */}
        {SOCIAL_LINKS.map(({ href, Icon, label }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith('mailto') ? undefined : '_blank'}
            rel="noopener noreferrer"
            aria-label={label}
            title={label}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 40,
              height: 40,
              borderRadius: 999,
              color: 'var(--color-muted)',
              flexShrink: 0,
            }}
          >
            <Icon size={16} />
          </a>
        ))}
      </motion.div>

      {/* Tap hint — above bottom bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        style={{
          position: 'fixed',
          bottom: '5.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 40,
          pointerEvents: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '0.45rem',
          whiteSpace: 'nowrap',
        }}
      >
        <motion.span
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2.4, repeat: Infinity }}
          style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--color-accent-teal)', boxShadow: '0 0 6px var(--color-accent-teal)', flexShrink: 0 }}
        />
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--color-muted)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
          Swipe to look · Tap to explore
        </p>
      </motion.div>
    </>
  )
}

/* ── Shared sub-components ──────────────────────────────────────────────── */
function BrandMark({ size }: { size: number }) {
  return (
    <div style={{
      width: size,
      height: size,
      borderRadius: Math.round(size * 0.28),
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Space Grotesk', var(--font-sans)",
      fontSize: `${(size * 0.38).toFixed(0)}px`,
      fontWeight: 700,
      color: '#fff',
      background: 'var(--grad-hero)',
      boxShadow: '0 0 20px -6px rgba(124, 92, 255, 0.6)',
      flexShrink: 0,
    }}>
      {site.initials}
    </div>
  )
}

function SocialBtn({
  href,
  Icon,
  label,
}: {
  href: string
  Icon: (p: { size?: number }) => JSX.Element
  label: string
}) {
  return (
    <a
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
      onMouseEnter={(e) => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'var(--color-border-strong)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
      onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-muted)'; e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.transform = 'translateY(0)' }}
    >
      <Icon size={16} />
    </a>
  )
}
