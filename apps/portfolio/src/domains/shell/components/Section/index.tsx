import type { ReactNode } from 'react';
import { motion } from 'motion/react';

interface SectionProps {
  id: string;
  children: ReactNode;
  className?: string;
  fullHeight?: boolean;
}

export function Section({ id, children, className = '', fullHeight = false }: SectionProps) {
  return (
    <motion.section
      id={id}
      className={`relative px-6 py-20 md:px-8 ${fullHeight ? 'flex min-h-screen items-center' : ''} ${className}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="mx-auto w-full max-w-7xl">{children}</div>
    </motion.section>
  );
}
