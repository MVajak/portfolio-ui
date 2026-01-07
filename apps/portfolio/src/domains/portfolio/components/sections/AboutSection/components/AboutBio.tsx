import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';

import { MotionBadge } from '@portfolio/ui';

import { achievements, education } from '@/domains/portfolio';

const highlightedAchievements = achievements.slice(0, 3).map((a) => `${a.name} (${a.year})`);

const mainEducation = education[0];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function AboutBio() {
  const { t } = useTranslation();

  return (
    <motion.div variants={containerVariants} initial="hidden" whileInView="show" viewport={{ once: true }}>
      <motion.span variants={itemVariants} className="mb-2 inline-block text-body-default-bold text-primary">
        {t('about.subtitle')}
      </motion.span>
      <motion.h2
        variants={itemVariants}
        className="mb-6 text-foreground text-title-large-bold md:text-display-small-bold"
      >
        {t('about.title')}
      </motion.h2>
      <motion.div variants={itemVariants} className="space-y-4 text-muted-foreground">
        <p>{t('about.bio.p1')}</p>
        <p>{t('about.bio.p2')}</p>
        <p>{t('about.bio.p3')}</p>
      </motion.div>

      {/* Achievements Highlight */}
      <motion.div variants={itemVariants} className="mt-8">
        <h3 className="mb-3 text-foreground text-title-small-bold">{t('about.achievements.title')}</h3>
        <div className="flex flex-wrap gap-2">
          {highlightedAchievements.map((achievement) => (
            <MotionBadge key={achievement}>{achievement}</MotionBadge>
          ))}
        </div>
      </motion.div>

      {/* Education */}
      <motion.div variants={itemVariants} className="mt-6">
        <h3 className="mb-3 text-foreground text-title-small-bold">{t('about.education.title')}</h3>
        <div className="flex flex-wrap gap-2">
          <MotionBadge variant="outline">
            {mainEducation.degree} - {mainEducation.school} ({mainEducation.startYear}-{mainEducation.endYear})
          </MotionBadge>
        </div>
      </motion.div>
    </motion.div>
  );
}
