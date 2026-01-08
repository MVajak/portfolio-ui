import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';

import { LinkedInIcon, QuoteIcon } from '@portfolio/icons';
import { Button, MotionCarousel } from '@portfolio/ui';

import { recommendations } from '@/domains/portfolio';
import { Section } from '@/domains/shell';

import { TestimonialAuthor } from './components/TestimonialAuthor';

export function TestimonialsSection() {
  const { t } = useTranslation();

  return (
    <Section id="testimonials">
      <div className="mb-12 text-center">
        <span className="mb-2 inline-block text-body-default-bold text-primary">{t('testimonials.subtitle')}</span>
        <h2 className="text-foreground text-title-large-bold md:text-display-small-bold">{t('testimonials.title')}</h2>
      </div>

      <div className="mx-auto max-w-4xl">
        <MotionCarousel>
          {recommendations.map((rec) => (
            <div key={rec.id} className="glass rounded-3xl p-8 backdrop-blur-xl md:p-12">
              <QuoteIcon className="mb-6 h-12 w-12 text-primary/20" />

              <blockquote className="mb-8 text-foreground text-title-small leading-relaxed">"{rec.text}"</blockquote>

              <TestimonialAuthor recommendation={rec} />
            </div>
          ))}
        </MotionCarousel>

        {/* LinkedIn link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <Button
            variant="link"
            asChild
            iconRight={<LinkedInIcon className="h-4 w-4" />}
            className="text-muted-foreground hover:text-foreground hover:no-underline"
          >
            <a
              href="https://www.linkedin.com/in/mihkel-kristofer-vajak-a91539164/details/recommendations/"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('testimonials.viewAll')}
            </a>
          </Button>
        </motion.div>
      </div>
    </Section>
  );
}
