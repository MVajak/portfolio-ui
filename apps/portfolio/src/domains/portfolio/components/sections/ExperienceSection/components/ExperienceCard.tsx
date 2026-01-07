import { useTranslation } from 'react-i18next';

import { Badge, MotionCard } from '@portfolio/ui';

import { formatDate } from '@/domains/date';
import type { Experience } from '@/domains/portfolio';

import { getTypeColor, getTypeLabel } from '../utils';

interface ExperienceCardProps {
  experience: Experience;
}

export function ExperienceCard({ experience }: ExperienceCardProps) {
  const { t } = useTranslation();

  return (
    <MotionCard
      whileHover={{ y: -4, scale: 1.01 }}
      className="ml-6 w-[calc(100%-2rem)] gap-4 p-6 md:mr-2 md:ml-2 md:w-[calc(50%-2rem)]"
    >
      {/* Type badge */}
      <div className="flex items-center gap-2">
        <Badge variant="outline" className="gap-1.5 uppercase tracking-wider">
          <span className={`h-2 w-2 rounded-full ${getTypeColor(experience.type)}`} />
          {getTypeLabel(experience.type)}
        </Badge>
      </div>

      {/* Date (mobile only) */}
      <p className="text-body-default text-muted-foreground md:hidden">
        {formatDate(experience.startDate)} -{' '}
        {experience.endDate ? formatDate(experience.endDate) : t('experience.present')}
      </p>

      {/* Role & Company */}
      <div className="gap-2">
        <h3 className="text-foreground text-title-small-bold">{experience.role}</h3>
        <p className="text-body-large-bold text-primary">{experience.company}</p>
      </div>

      {/* Description */}
      <p className="text-body-default text-muted-foreground">{t(experience.descriptionKey)}</p>

      {/* Technologies */}
      {experience.technologies.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {experience.technologies.map((tech) => (
            <Badge key={tech} variant="primary" className="rounded-md px-2 py-0.5">
              {tech}
            </Badge>
          ))}
        </div>
      )}
    </MotionCard>
  );
}
