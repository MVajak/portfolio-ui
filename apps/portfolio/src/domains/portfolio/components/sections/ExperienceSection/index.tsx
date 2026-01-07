import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';

import { formatDate } from '@/domains/date';
import { experience } from '@/domains/portfolio';
import { Section } from '@/domains/shell';

import { ExperienceCard } from './components/ExperienceCard';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0 },
};

export function ExperienceSection() {
  const { t } = useTranslation();

  // Filter to show only professional and significant leadership roles
  const professionalExperience = experience.filter(
    (exp) => exp.type === 'professional' || (exp.type === 'leadership' && exp.id !== 'ribs' && exp.id !== 'sak')
  );

  return (
    <Section id="experience">
      <div className="mb-12 text-center">
        <span className="mb-2 inline-block text-body-default-bold text-primary">{t('experience.subtitle')}</span>
        <h2 className="text-foreground text-title-large-bold md:text-display-small-bold">{t('experience.title')}</h2>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="relative mx-auto max-w-3xl"
      >
        {/* Timeline line */}
        <div className="absolute top-0 bottom-0 left-0 w-px bg-linear-to-b from-80% from-border to-transparent md:left-1/2 md:-translate-x-px" />

        {professionalExperience.map((exp, index) => (
          <motion.div
            key={exp.id}
            variants={itemVariants}
            className={`relative mb-12 flex flex-col gap-8 last:mb-0 md:flex-row ${
              index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
            }`}
          >
            {/* Timeline dot */}
            <div className="absolute left-0 z-10 h-4 w-4 -translate-x-1/2 rounded-full border-4 border-background bg-primary md:left-1/2" />

            {/* Date (left/right side on desktop) */}
            <div
              className={`hidden w-[calc(50%-2rem)] items-start justify-end md:flex ${
                index % 2 === 0 ? '' : 'flex-row-reverse'
              }`}
            >
              <span className="text-body-default text-muted-foreground">
                {formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : t('experience.present')}
              </span>
            </div>

            <ExperienceCard experience={exp} />
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
