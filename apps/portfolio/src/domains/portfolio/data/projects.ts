import type { Project } from '../types';

export const projects: Project[] = [
  {
    id: 'portfolio',
    titleKey: 'projects.portfolio.title',
    descriptionKey: 'projects.portfolio.description',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vite'],
    liveUrl: 'https://mvajak.com',
    sourceUrl: 'https://github.com/MVajak/portfolio-ui',
    featured: true,
  },
  {
    id: 'url-enrich',
    titleKey: 'projects.urlEnrich.title',
    descriptionKey: 'projects.urlEnrich.description',
    technologies: ['React', 'TypeScript', 'Node.js', 'Fastify', 'Anthropic SDK', 'Zod', 'Tailwind CSS'],
    sourceUrl: 'https://github.com/MVajak/url-enrich',
    featured: true,
  },
  {
    id: 'lottolens',
    titleKey: 'projects.lottolens.title',
    descriptionKey: 'projects.lottolens.description',
    technologies: ['React', 'TypeScript', 'TanStack Query', 'Zustand', 'Tailwind CSS', 'Node.js'],
    liveUrl: 'https://lottolens.io',
    featured: true,
  },
  {
    id: 'katana-features',
    titleKey: 'projects.katanaFeatures.title',
    descriptionKey: 'projects.katanaFeatures.description',
    technologies: ['Node.js', 'PostgreSQL', 'React', 'Redux'],
    featured: true,
    isWorkProject: true,
  },
  // Kept in codebase but not displayed
  {
    id: 'obsidianos',
    titleKey: 'projects.obsidianos.title',
    descriptionKey: 'projects.obsidianos.description',
    technologies: ['React', 'TypeScript', 'Zustand', 'TanStack Query', 'Tailwind CSS'],
    featured: false,
    isWorkProject: true,
  },
];
