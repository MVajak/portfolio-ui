import type * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { type HTMLMotionProps, motion } from 'motion/react';

import { cn } from '@portfolio/ui/utils';

const badgeVariants = cva(
  'inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-full px-3 py-1 text-body-small-bold transition-colors',
  {
    variants: {
      variant: {
        default: 'glass text-foreground',
        primary: 'bg-primary text-primary-foreground',
        secondary: 'bg-secondary text-secondary-foreground',
        outline: 'border border-border text-foreground',
        success: 'border border-success/30 bg-success/10 text-success',
        gradient: 'bg-linear-to-r from-accent-indigo to-accent-pink text-primary-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<'span'> & VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'span';

  return <Comp data-slot="badge" className={cn(badgeVariants({ variant }), className)} {...props} />;
}

function MotionBadge({ className, variant, ...props }: HTMLMotionProps<'span'> & VariantProps<typeof badgeVariants>) {
  return (
    <motion.span
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      {...props}
    />
  );
}

export { Badge, MotionBadge, badgeVariants };
