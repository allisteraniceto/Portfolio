export interface Experience {
  id: string
  company: string
  role: string
  period: string
  location: string
  type: 'full-time' | 'part-time' | 'internship' | 'contract'
  bullets: string[]
  tech: string[]
}

export const experience: Experience[] = [
  {
    id: 'exp-1',
    company: 'Tech Corp',
    role: 'Software Engineer',
    period: 'Jun 2024 – Present',
    location: 'Remote',
    type: 'full-time',
    bullets: [
      'Led development of microservices architecture serving 100K+ daily active users',
      'Reduced API response times by 40% through query optimization and caching strategies',
      'Mentored 3 junior developers and led weekly code review sessions',
    ],
    tech: ['React', 'TypeScript', 'Node.js', 'AWS', 'PostgreSQL'],
  },
  {
    id: 'exp-2',
    company: 'StartupXYZ',
    role: 'Full Stack Developer',
    period: 'Jan 2024 – May 2024',
    location: 'San Francisco, CA',
    type: 'internship',
    bullets: [
      'Built customer-facing dashboard with React and D3.js for data visualization',
      'Implemented CI/CD pipeline reducing deployment time from 30 min to 5 min',
      'Collaborated with design team to ship 12 new features in 5 months',
    ],
    tech: ['React', 'Python', 'Django', 'Docker', 'GitHub Actions'],
  },
  {
    id: 'exp-3',
    company: 'Digital Agency',
    role: 'Junior Web Developer',
    period: 'Jun 2023 – Dec 2023',
    location: 'New York, NY',
    type: 'part-time',
    bullets: [
      'Developed responsive websites for 8 client projects using modern web standards',
      'Integrated third-party APIs and payment gateways for e-commerce clients',
    ],
    tech: ['JavaScript', 'HTML/CSS', 'WordPress', 'PHP'],
  },
]
