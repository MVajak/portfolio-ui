import { ArrowTopRightOnSquareIcon, BriefcaseIcon, CodeBracketIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';

import { Badge, Button, MotionCard } from '@portfolio/ui';

import type { Project } from '@/domains/portfolio';

export const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { t } = useTranslation();

  return (
    <MotionCard
      variants={cardVariants}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="overflow-hidden p-0"
    >
      {/* Project Image/Placeholder */}
      <div className="flex h-48 items-center justify-center bg-linear-to-br from-accent-indigo/20 via-accent-purple/20 to-accent-pink/20">
        <CodeBracketIcon className="h-16 w-16 text-muted-foreground/50 transition-colors group-hover:text-primary/50" />
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="mb-2 text-foreground text-title-small-bold">{t(project.titleKey)}</h3>
        <p className="mb-4 line-clamp-2 text-body-default text-muted-foreground">{t(project.descriptionKey)}</p>

        {/* Technologies */}
        <div className="mb-4 flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 4).map((tech) => (
            <Badge key={tech} variant="primary" className="rounded-md px-2 py-0.5">
              {tech}
            </Badge>
          ))}
          {project.technologies.length > 4 && (
            <Badge variant="secondary" className="rounded-md px-2 py-0.5">
              +{project.technologies.length - 4}
            </Badge>
          )}
        </div>

        {/* Links or Work Project Badge */}
        <div className="flex items-center gap-3">
          {project.isWorkProject && !project.liveUrl && !project.sourceUrl ? (
            <Badge variant="secondary" className="gap-1.5">
              <BriefcaseIcon className="h-3.5 w-3.5" />
              {t('projects.workProject')}
            </Badge>
          ) : (
            <>
              {project.liveUrl && (
                <Button
                  asChild
                  variant="link"
                  iconLeft={<ArrowTopRightOnSquareIcon className="h-4 w-4" />}
                  className="h-auto px-0 hover:text-primary"
                >
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    {t('projects.viewLive')}
                  </a>
                </Button>
              )}
              {project.sourceUrl && (
                <Button
                  asChild
                  variant="link"
                  iconLeft={<CodeBracketIcon className="h-4 w-4" />}
                  className="h-auto px-0 hover:text-primary"
                >
                  <a href={project.sourceUrl} target="_blank" rel="noopener noreferrer">
                    {t('projects.viewCode')}
                  </a>
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </MotionCard>
  );
}
