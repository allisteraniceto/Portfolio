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
    company: 'Pacific Northwest National Laboratory',
    role: 'Software Engineer I',
    period: 'Jan 2025 – Present',
    location: 'Richland, WA',
    type: 'full-time',
    bullets: [
      'Ported 27-endpoint Python FastAPI backend to C# .NET 8 Minimal API, maintaining schema and endpoint functionality under shortened delivery timeline',
      'Developed full-stack AI document reviewer and generation tool using React, C# .NET 8, and Azure Container Apps with end-to-end Playwright tests',
      'Translated and maintained 7 CI/CD pipeline templates from Azure DevOps to GitHub Actions across .NET Core, .NET Framework, SQL Server, and Power BI',
      'Built MCP servers exposing federal APIs for OpenWebUI integration, supporting lab-wide AI research initiatives',
      'Maintained 3D contaminant modeling React/Svelte applications with D3.js, Three.js, and OpenLayers visualization libraries',
    ],
    tech: ['React', 'TypeScript', 'C#', '.NET 8', 'Azure', 'GitHub Actions', 'Docker', 'Playwright', 'FastAPI'],
  },
  {
    id: 'exp-2',
    company: 'Pacific Northwest National Laboratory',
    role: 'Tech Intern',
    period: 'Jul 2023 – Dec 2024',
    location: 'Richland, WA',
    type: 'internship',
    bullets: [
      'Developed and debugged 22+ Svelte and React clients to enhance usability across research tools with Redux state management',
      'Built and documented .NET Framework and ASP.NET pipelines to automate builds, tests, and deployments',
      'Migrated CI/CD workflows from Azure DevOps to GitHub Actions alongside peer intern',
      'Created Power BI dashboards and automated Power Automate flows tracking internal processes, reducing manual work by 98%',
      'Contributed to data-driven features leveraging D3.js and Three.js visualization libraries',
    ],
    tech: ['Svelte', 'React', 'Redux', 'TypeScript', '.NET Framework', 'ASP.NET', 'GitHub Actions', 'Power BI', 'D3.js', 'Three.js'],
  },
]
