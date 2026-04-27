import { motion } from 'framer-motion'
import { education, certifications } from '../../data/education'

export default function EducationPanel() {
  return (
    <div>
      {/* Degrees */}
      {education.map((edu, i) => (
        <motion.div
          key={edu.id}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.32 + i * 0.07 }}
          style={{
            padding: '1.2rem',
            background:
              'linear-gradient(180deg, rgba(86, 197, 150, 0.06) 0%, rgba(255,255,255,0.02) 100%)',
            borderRadius: 12,
            border: '1px solid rgba(86, 197, 150, 0.18)',
            marginBottom: '1.5rem',
          }}
        >
          <h3
            style={{
              fontFamily: "'Space Grotesk', var(--font-sans)",
              fontSize: '1.05rem',
              fontWeight: 600,
              color: '#fff',
              letterSpacing: '-0.005em',
            }}
          >
            {edu.degree}
          </h3>
          <p
            style={{
              fontSize: '0.85rem',
              color: 'var(--color-accent-green)',
              marginTop: '0.3rem',
              fontWeight: 500,
            }}
          >
            {edu.institution}
          </p>
          <div
            style={{
              display: 'flex',
              gap: '1rem',
              marginTop: '0.45rem',
              fontSize: '0.72rem',
              fontFamily: 'var(--font-mono)',
              color: 'var(--color-muted)',
              letterSpacing: '0.04em',
            }}
          >
            <span>{edu.period}</span>
            {edu.gpa && <span>GPA {edu.gpa}</span>}
          </div>

          {edu.highlights.length > 0 && (
            <div style={{ marginTop: '1rem' }}>
              <p
                style={{
                  fontSize: '0.66rem',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--color-faint)',
                  marginBottom: '0.5rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.18em',
                }}
              >
                Relevant Coursework
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                {edu.highlights.map((h) => (
                  <span
                    key={h}
                    style={{
                      padding: '0.2rem 0.55rem',
                      fontSize: '0.7rem',
                      color: 'var(--color-text-soft)',
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid var(--color-border)',
                      borderRadius: 6,
                    }}
                  >
                    {h}
                  </span>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      ))}

      {/* Certifications */}
      {certifications.length > 0 && (
        <>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            style={{
              fontSize: '0.66rem',
              fontFamily: 'var(--font-mono)',
              color: 'var(--color-faint)',
              textTransform: 'uppercase',
              letterSpacing: '0.18em',
              marginBottom: '0.7rem',
            }}
          >
            Certifications
          </motion.p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
            {certifications.map((cert, i) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 + i * 0.07 }}
                style={{
                  padding: '0.85rem 1rem',
                  background: 'rgba(255,255,255,0.025)',
                  borderRadius: 10,
                  border: '1px solid var(--color-border)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '0.8rem',
                }}
              >
                <div style={{ minWidth: 0 }}>
                  <h4
                    style={{
                      fontSize: '0.85rem',
                      fontWeight: 500,
                      color: '#fff',
                    }}
                  >
                    {cert.name}
                  </h4>
                  <p
                    style={{
                      fontSize: '0.72rem',
                      color: 'var(--color-muted)',
                      marginTop: '0.2rem',
                    }}
                  >
                    {cert.issuer}
                  </p>
                </div>
                <span
                  style={{
                    flexShrink: 0,
                    padding: '0.2rem 0.55rem',
                    fontSize: '0.68rem',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--color-accent-green)',
                    background: 'rgba(86, 197, 150, 0.1)',
                    border: '1px solid rgba(86, 197, 150, 0.2)',
                    borderRadius: 6,
                  }}
                >
                  {cert.year}
                </span>
              </motion.div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
