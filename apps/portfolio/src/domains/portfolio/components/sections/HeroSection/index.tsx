import { ArrowDownIcon } from '@heroicons/react/24/outline';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';

import { Avatar } from '@portfolio/ui';

import { personalInfo } from '@/domains/portfolio';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

export function HeroSection() {
  const { t } = useTranslation();

  return (
    <section id="hero" className="relative flex min-h-screen items-center justify-center px-6 pt-24 pb-12 md:px-8">
      <motion.div
        className="relative z-10 mx-auto max-w-4xl text-center"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {/* Avatar */}
        <motion.div variants={itemVariants} className="mb-8 flex justify-center">
          <div className="relative">
            <div className="glass h-32 w-32 rounded-full p-1 md:h-40 md:w-40">
              <Avatar src="/avatar.jpeg" alt={personalInfo.name} displayName={personalInfo.name} size="full" />
            </div>
            {/* Status indicator */}
            <motion.div
              className="absolute right-2 bottom-2 h-4 w-4 rounded-full border-2 border-background bg-success"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: 'easeInOut',
              }}
            />
          </div>
        </motion.div>

        {/* Greeting */}
        <motion.p variants={itemVariants} className="mb-2 text-muted-foreground text-title-small md:text-title-default">
          {t('hero.greeting')}
        </motion.p>

        {/* Name */}
        <motion.h1
          variants={itemVariants}
          className="mb-4 text-display-small-bold text-foreground md:text-display-default-bold lg:text-display-large-bold"
        >
          <span className="text-gradient">{personalInfo.name}</span>
        </motion.h1>

        {/* Role */}
        <motion.p
          variants={itemVariants}
          className="mb-2 text-foreground text-title-default-bold md:text-title-default-bold"
        >
          {personalInfo.role}
        </motion.p>
        <motion.div
          variants={itemVariants}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-success/30 bg-success/10 px-3 py-1"
        >
          <span className="h-2 w-2 animate-pulse rounded-full bg-success" />
          <span className="text-body-small-bold text-success">{t('hero.available')}</span>
        </motion.div>

        {/* Tagline */}
        <motion.p variants={itemVariants} className="mx-auto mb-10 max-w-2xl text-muted-foreground text-title-small">
          {t('hero.tagline')}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div variants={itemVariants} className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <motion.a
            href="#projects"
            className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-body-default-bold text-primary-foreground transition-colors hover:bg-primary/90"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            {t('hero.cta.projects')}
          </motion.a>
          <motion.a
            href="#contact"
            className="glass-hover inline-flex items-center justify-center rounded-full px-8 py-3 text-body-default-bold"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            {t('hero.cta.contact')}
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{
          duration: 1.5,
          repeat: Number.POSITIVE_INFINITY,
          ease: 'easeInOut',
        }}
      >
        <a
          href="#about"
          className="flex flex-col items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
        >
          <span className="text-body-small uppercase tracking-widest">{t('hero.scroll')}</span>
          <ArrowDownIcon className="h-5 w-5" />
        </a>
      </motion.div>
    </section>
  );
}
