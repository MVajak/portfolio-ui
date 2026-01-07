import { EnvelopeIcon } from '@heroicons/react/24/outline';
import { motion } from 'motion/react';

import { GitHubIcon, LinkedInIcon } from '@portfolio/icons';

import { personalInfo } from '@/domains/portfolio/data/personal';

const socialLinkConfig = [
  { key: 'github' as const, icon: GitHubIcon, label: 'GitHub' },
  { key: 'linkedin' as const, icon: LinkedInIcon, label: 'LinkedIn' },
  { key: 'email' as const, icon: EnvelopeIcon, label: 'Email', isEmail: true },
];

export function SocialLinks() {
  return (
    <div className="flex items-center gap-2">
      {socialLinkConfig.map((config) => {
        const href = config.isEmail ? `mailto:${personalInfo.email}` : personalInfo[config.key];

        return (
          <motion.a
            key={config.key}
            href={href}
            target={config.isEmail ? undefined : '_blank'}
            rel={config.isEmail ? undefined : 'noopener noreferrer'}
            className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            aria-label={config.label}
          >
            <config.icon className="h-5 w-5" />
          </motion.a>
        );
      })}
    </div>
  );
}
