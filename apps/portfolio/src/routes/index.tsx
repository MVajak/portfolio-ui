import { createFileRoute } from '@tanstack/react-router';

import {
  AboutSection,
  ContactSection,
  ExperienceSection,
  HeroSection,
  ProjectsSection,
  SkillsSection,
  TestimonialsSection,
} from '@/domains/portfolio';

export const Route = createFileRoute('/')({
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <div className="bg-linear-to-b from-transparent via-20% via-muted/30 to-transparent">
        <ExperienceSection />
        <TestimonialsSection />
      </div>

      <ContactSection />
    </>
  );
}
