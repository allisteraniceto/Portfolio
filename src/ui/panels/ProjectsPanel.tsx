import { motion } from 'framer-motion'
import { projects } from '../../data/projects'
import { ExternalLinkIcon, GitHubIcon } from '../icons'

export default function ProjectsPanel() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
      {projects.map((project, i) => (
        <motion.article
          key={project.id}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.32 + i * 0.07 }}
          style={{
            position: 'relative',
            padding: '1.15rem',
            background: project.featured
              ? 'linear-gradient(180deg, rgba(0, 212, 255, 0.06) 0%, rgba(255,255,255,0.02) 100%)'
              : 'rgba(255,255,255,0.025)',
            borderRadius: 12,
            border: project.featured
              ? '1px solid rgba(0, 212, 255, 0.25)'
              : '1px solid var(--color-border)',
            transition: 'all 0.25s',
          }}
          whileHover={{
            y: -2,
            transition: { duration: 0.2 },
          }}
        >
          {project.featured && (
            <span
              style={{
                position: 'absolute',
                top: 12,
                right: 12,
                padding: '0.18rem 0.5rem',
                fontSize: '0.62rem',
                fontFamily: 'var(--font-mono)',
                fontWeight: 500,
                color: 'var(--color-accent-teal)',
                background: 'rgba(0, 212, 255, 0.1)',
                border: '1px solid rgba(0, 212, 255, 0.25)',
                borderRadius: 999,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}
            >
              Featured
            </span>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
            <h3
              style={{
                fontFamily: "'Space Grotesk', var(--font-sans)",
                fontSize: '1.05rem',
                fontWeight: 600,
                color: '#fff',
                letterSpacing: '-0.005em',
              }}
            >
              {project.title}
            </h3>
            <span
              style={{
                fontSize: '0.68rem',
                fontFamily: 'var(--font-mono)',
                color: 'var(--color-faint)',
                letterSpacing: '0.05em',
              }}
            >
              · {project.year}
            </span>
          </div>

          <p
            style={{
              marginTop: '0.55rem',
              fontSize: '0.85rem',
              lineHeight: 1.6,
              color: 'var(--color-text-soft)',
            }}
          >
            {project.description}
          </p>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.35rem',
              marginTop: '0.85rem',
            }}
          >
            {project.tech.map((t) => (
              <span
                key={t}
                style={{
                  padding: '0.18rem 0.5rem',
                  fontSize: '0.68rem',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--color-text-soft)',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 6,
                }}
              >
                {t}
              </span>
            ))}
          </div>

          {(project.githubUrl || project.liveUrl) && (
            <div style={{ display: 'flex', gap: '0.6rem', marginTop: '0.95rem' }}>
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    padding: '0.4rem 0.7rem',
                    fontSize: '0.72rem',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--color-text-soft)',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 8,
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#fff'
                    e.currentTarget.style.borderColor = 'var(--color-border-strong)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--color-text-soft)'
                    e.currentTarget.style.borderColor = 'var(--color-border)'
                  }}
                >
                  <GitHubIcon size={12} />
                  Code
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    padding: '0.4rem 0.7rem',
                    fontSize: '0.72rem',
                    fontFamily: 'var(--font-mono)',
                    color: '#fff',
                    background: 'rgba(0, 212, 255, 0.12)',
                    border: '1px solid rgba(0, 212, 255, 0.3)',
                    borderRadius: 8,
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(0, 212, 255, 0.2)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(0, 212, 255, 0.12)'
                  }}
                >
                  <ExternalLinkIcon size={12} />
                  Live
                </a>
              )}
            </div>
          )}
        </motion.article>
      ))}
    </div>
  )
}
