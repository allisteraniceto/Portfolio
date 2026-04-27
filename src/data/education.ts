export interface Education {
  id: string
  type: 'degree' | 'certification' | 'course'
  institution: string
  degree: string
  period: string
  gpa?: string
  highlights: string[]
}

export interface Certification {
  id: string
  name: string
  issuer: string
  year: number
  credentialId?: string
}

export const education: Education[] = [
  {
    id: 'edu-1',
    type: 'degree',
    institution: 'Washington State University',
    degree: 'Bachelor of Science in Computer Science',
    period: 'Graduated',
    gpa: '3.8+',
    highlights: [
      'Magna Cum Laude',
      'Full-stack development',
      'Cloud architecture',
      'Software engineering practices',
    ],
  },
]

export const certifications: Certification[] = [
  {
    id: 'cert-1',
    name: 'Juniper Networks Certified Associate – Security',
    issuer: 'Juniper Networks',
    year: 2024,
  },
]
