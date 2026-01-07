import type { ComponentProps } from 'react';

import { cn } from '@portfolio/ui/utils';

export const Input = ({ className, ...props }: ComponentProps<'input'>) => {
  return (
    <input
      data-slot="input"
      className={cn(
        'w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-body-default text-foreground placeholder:text-muted-foreground',
        'outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary',
        'aria-invalid:border-destructive aria-invalid:ring-1 aria-invalid:ring-destructive',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    />
  );
};
