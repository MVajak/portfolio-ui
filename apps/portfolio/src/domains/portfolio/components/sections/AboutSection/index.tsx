import { Section } from '@/domains/shell';

import { AboutBio } from './components/AboutBio';
import { AboutStats } from './components/AboutStats';

export function AboutSection() {
  return (
    <Section id="about">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <AboutBio />
        <AboutStats />
      </div>
    </Section>
  );
}
