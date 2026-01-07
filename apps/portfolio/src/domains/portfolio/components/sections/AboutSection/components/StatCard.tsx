import type { Variants } from 'motion/react';
import { useTranslation } from 'react-i18next';

import { MotionCard } from '@portfolio/ui';

interface StatCardProps {
  icon: React.ComponentType<{ className?: string }>;
  labelKey: string;
  value: string;
  suffix?: string;
  variants?: Variants;
}

export function StatCard({ icon: Icon, labelKey, value, suffix, variants }: StatCardProps) {
  const { t } = useTranslation();

  return (
    <MotionCard variants={variants} className="p-6">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <div>
          <p className="text-body-default text-muted-foreground">{t(labelKey)}</p>
          <p className="text-foreground text-title-default-bold">
            {value}
            {suffix && <span className="ml-1 text-body-default text-muted-foreground">{t(suffix)}</span>}
          </p>
        </div>
      </div>
    </MotionCard>
  );
}
