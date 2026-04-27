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
    title: 'Performance Review Capstone Project',
    description: 'Full-stack employee performance review system. Developed UI components with React API integrations to capture the review process, collaborated with stakeholders on Figma prototypes, and deployed CI/CD pipelines using Azure DevOps.',
    tech: ['React', 'TypeScript', 'Azure DevOps', 'Git', 'Figma'],
    year: 2024,
    featured: true,
  },
  {
    id: 'proj-2',
    title: 'AI Document Reviewer',
    description: 'Full-stack AI document reviewing and generation tool. Built React frontend with C# .NET 8 backends, integrated Azure Container Apps for deployment, and implemented comprehensive end-to-end testing with Playwright.',
    tech: ['React', 'TypeScript', 'C#', '.NET 8', 'Azure Container Apps', 'Playwright'],
    year: 2025,
    featured: true,
  },
  {
    id: 'proj-3',
    title: '3D Contaminant Modeling & Visualization Suite',
    description: 'Interactive React and Svelte applications for 3D contaminant modeling, mapping, and analysis. Integrated D3.js, Three.js, and OpenLayers visualization libraries with automated testing using Cypress.',
    tech: ['React', 'Svelte', 'TypeScript', 'D3.js', 'Three.js', 'OpenLayers', 'Cypress'],
    year: 2024,
    featured: true,
  },
  {
    id: 'proj-4',
    title: 'MCP Servers for Federal APIs',
    description: 'Built MCP (Model Context Protocol) servers integrating public federal APIs (Federal Register, Data.gov) for OpenWebUI integration. Developed using FastMCP, Pydantic, and OpenAPI specifications to support lab-wide AI research initiatives.',
    tech: ['Python', 'FastMCP', 'Pydantic', 'OpenAPI'],
    year: 2025,
    featured: false,
  },
]
