import type { Recommendation } from '@/domains/portfolio';

interface TestimonialAuthorProps {
  recommendation: Recommendation;
}

export function TestimonialAuthor({ recommendation }: TestimonialAuthorProps) {
  const initials = recommendation.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2);

  return (
    <div className="flex items-center gap-4">
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-accent-indigo via-accent-purple to-accent-pink">
        <span className="text-primary-foreground text-title-small-bold">{initials}</span>
      </div>
      <div>
        <p className="text-body-large-bold text-foreground">{recommendation.name}</p>
        <p className="text-body-default text-muted-foreground">
          {recommendation.role} @ {recommendation.company}
        </p>
        <p className="mt-0.5 text-body-small text-muted-foreground">
          {recommendation.relationship} · {recommendation.date}
        </p>
      </div>
    </div>
  );
}
