import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';

import { MotionBadge, MotionCard } from '@portfolio/ui';

import { skills } from '@/domains/portfolio';
import { Section } from '@/domains/shell';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const skillVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1 },
};

export function SkillsSection() {
  const { t } = useTranslation();

  return (
    <Section id="skills">
      <div className="mb-12 text-center">
        <span className="mb-2 inline-block text-body-default-bold text-primary">{t('skills.subtitle')}</span>
        <h2 className="text-foreground text-title-large-bold md:text-display-small-bold">{t('skills.title')}</h2>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid gap-6 md:grid-cols-2"
      >
        {skills.map((category) => (
          <MotionCard key={category.id} variants={cardVariants} className="h-full p-6">
            <h3 className="mb-4 text-foreground text-title-small-bold">{t(category.nameKey)}</h3>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="flex flex-wrap gap-2"
            >
              {category.skills.map((skill, index) => (
                <MotionBadge
                  key={skill.name}
                  variant="outline"
                  variants={skillVariants}
                  className="text-body-default-bold"
                  transition={{ delay: index * 0.03 }}
                >
                  {skill.name}
                </MotionBadge>
              ))}
            </motion.div>
          </MotionCard>
        ))}
      </motion.div>
    </Section>
  );
}
