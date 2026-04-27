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
    institution: 'University of Technology',
    degree: 'Bachelor of Science in Computer Science',
    period: '2020 – 2024',
    gpa: '3.8',
    highlights: [
      'Data Structures & Algorithms',
      'Software Engineering',
      'Machine Learning',
      'Database Systems',
    ],
  },
]

export const certifications: Certification[] = [
  {
    id: 'cert-1',
    name: 'AWS Solutions Architect Associate',
    issuer: 'Amazon Web Services',
    year: 2024,
    credentialId: 'ABC-123-XYZ',
  },
]
