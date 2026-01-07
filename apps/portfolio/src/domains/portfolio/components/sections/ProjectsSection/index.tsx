import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';

import { Button } from '@portfolio/ui';

import { projects } from '@/domains/portfolio';
import { Section } from '@/domains/shell';

import { ProjectCard } from './components/ProjectCard';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

export function ProjectsSection() {
  const { t } = useTranslation();

  return (
    <Section id="projects">
      <div className="mb-12 text-center">
        <span className="mb-2 inline-block text-body-default-bold text-primary">{t('projects.subtitle')}</span>
        <h2 className="text-foreground text-title-large-bold md:text-display-small-bold">{t('projects.title')}</h2>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {projects
          .filter((p) => p.featured)
          .map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
      </motion.div>

      {/* View All Projects Link */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-10 text-center"
      >
        <Button
          asChild
          variant="ghost"
          iconRight={<ArrowTopRightOnSquareIcon className="h-4 w-4" />}
          className="text-muted-foreground hover:text-foreground"
        >
          <a href="https://github.com/MVajak" target="_blank" rel="noopener noreferrer">
            {t('projects.viewAll')}
          </a>
        </Button>
      </motion.div>
    </Section>
  );
}
