import { BriefcaseIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { Coffee } from 'lucide-react';
import { motion } from 'motion/react';

import { personalInfo } from '@/domains/portfolio';

import { StatCard } from './StatCard';

const stats = [
  {
    icon: MapPinIcon,
    labelKey: 'about.stats.location',
    value: personalInfo.location,
  },
  {
    icon: BriefcaseIcon,
    labelKey: 'about.stats.experience',
    value: `${personalInfo.yearsOfExperience}+`,
    suffix: 'about.stats.years',
  },
  {
    icon: Coffee,
    labelKey: 'about.stats.coffee',
    value: '∞',
    suffix: 'about.stats.cups',
  },
];

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

export function AboutStats() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1"
    >
      {stats.map((stat) => (
        <StatCard
          key={stat.labelKey}
          icon={stat.icon}
          labelKey={stat.labelKey}
          value={stat.value}
          suffix={stat.suffix}
          variants={itemVariants}
        />
      ))}
    </motion.div>
  );
}
