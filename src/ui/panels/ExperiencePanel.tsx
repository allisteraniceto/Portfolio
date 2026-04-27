import { motion } from 'framer-motion'
import { experience } from '../../data/experience'

const TYPE_LABELS: Record<string, string> = {
  'full-time': 'Full-Time',
  'part-time': 'Part-Time',
  internship: 'Internship',
  contract: 'Contract',
}

export default function ExperiencePanel() {
  return (
    <div style={{ position: 'relative', paddingLeft: '1.5rem' }}>
      {/* Timeline rail */}
      <div
        style={{
          position: 'absolute',
          left: '0.4rem',
          top: '0.4rem',
          bottom: '0.4rem',
          width: 2,
          background:
            'linear-gradient(180deg, rgba(247, 151, 30, 0.4) 0%, rgba(255, 92, 138, 0.2) 50%, transparent 100%)',
          borderRadius: 1,
        }}
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
        {experience.map((exp, i) => (
          <motion.article
            key={exp.id}
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.32 + i * 0.1 }}
            style={{ position: 'relative' }}
          >
            {/* Timeline dot */}
            <div
              style={{
                position: 'absolute',
                left: '-1.45rem',
                top: '0.65rem',
                width: 12,
                height: 12,
                borderRadius: '50%',
                background: 'var(--color-accent-orange)',
                boxShadow: '0 0 0 4px rgba(247, 151, 30, 0.15), 0 0 12px rgba(247, 151, 30, 0.5)',
              }}
            />

            <div
              style={{
                padding: '1.05rem 1.15rem',
                background: 'rgba(255,255,255,0.025)',
                borderRadius: 12,
                border: '1px solid var(--color-border)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  flexWrap: 'wrap',
                  gap: '0.4rem',
                }}
              >
                <h3
                  style={{
                    fontFamily: "'Space Grotesk', var(--font-sans)",
                    fontSize: '1rem',
                    fontWeight: 600,
                    color: '#fff',
                    letterSpacing: '-0.005em',
                  }}
                >
                  {exp.role}
                </h3>
                <span
                  style={{
                    padding: '0.2rem 0.55rem',
                    fontSize: '0.62rem',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--color-accent-orange)',
                    background: 'rgba(247, 151, 30, 0.1)',
                    border: '1px solid rgba(247, 151, 30, 0.2)',
                    borderRadius: 999,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                  }}
                >
                  {TYPE_LABELS[exp.type] || exp.type}
                </span>
              </div>

              <p
                style={{
                  fontSize: '0.85rem',
                  color: 'var(--color-accent-orange)',
                  marginTop: '0.25rem',
                  fontWeight: 500,
                }}
              >
                {exp.company}
              </p>

              <div
                style={{
                  display: 'flex',
                  gap: '0.9rem',
                  marginTop: '0.35rem',
                  fontSize: '0.7rem',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--color-muted)',
                  letterSpacing: '0.04em',
                }}
              >
                <span>{exp.period}</span>
                <span style={{ color: 'var(--color-faint)' }}>·</span>
                <span>{exp.location}</span>
              </div>

              <ul
                style={{
                  marginTop: '0.85rem',
                  paddingLeft: 0,
                  listStyle: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.35rem',
                }}
              >
                {exp.bullets.map((bullet, j) => (
                  <li
                    key={j}
                    style={{
                      position: 'relative',
                      paddingLeft: '0.95rem',
                      fontSize: '0.8rem',
                      lineHeight: 1.55,
                      color: 'var(--color-text-soft)',
                    }}
                  >
                    <span
                      style={{
                        position: 'absolute',
                        left: 0,
                        top: '0.55rem',
                        width: 4,
                        height: 4,
                        borderRadius: '50%',
                        background: 'var(--color-accent-orange)',
                        opacity: 0.7,
                      }}
                    />
                    {bullet}
                  </li>
                ))}
              </ul>

              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.35rem',
                  marginTop: '0.9rem',
                }}
              >
                {exp.tech.map((t) => (
                  <span
                    key={t}
                    style={{
                      padding: '0.18rem 0.5rem',
                      fontSize: '0.66rem',
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
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  )
}
