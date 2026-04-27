export interface Project {
  id: string
  title: string
  description: string
  tech: string[]
  githubUrl?: string
  liveUrl?: string
  year: number
  featured: boolean
}

export const projects: Project[] = [
  {
    id: 'proj-1',
    title: 'E-Commerce Platform',
    description: 'Full-stack e-commerce application with real-time inventory management, payment processing, and admin dashboard.',
    tech: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
    githubUrl: 'https://github.com/allister18/ecommerce',
    year: 2025,
    featured: true,
  },
  {
    id: 'proj-2',
    title: 'AI Chat Assistant',
    description: 'Conversational AI interface powered by large language models with streaming responses and conversation memory.',
    tech: ['TypeScript', 'Next.js', 'OpenAI API', 'Redis'],
    githubUrl: 'https://github.com/allister18/ai-chat',
    liveUrl: 'https://ai-chat-demo.vercel.app',
    year: 2025,
    featured: true,
  },
  {
    id: 'proj-3',
    title: 'Task Management App',
    description: 'Kanban-style task manager with drag-and-drop, real-time collaboration, and sprint planning.',
    tech: ['React', 'Firebase', 'Tailwind CSS'],
    githubUrl: 'https://github.com/allister18/taskflow',
    year: 2024,
    featured: false,
  },
  {
    id: 'proj-4',
    title: 'Weather Dashboard',
    description: 'Interactive weather visualization with 7-day forecasts, radar maps, and severe weather alerts.',
    tech: ['Vue.js', 'D3.js', 'Weather API'],
    githubUrl: 'https://github.com/allister18/weather-dash',
    year: 2024,
    featured: false,
  },
]
