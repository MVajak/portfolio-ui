import type * as React from 'react';
import { type HTMLMotionProps, motion } from 'motion/react';

import { cn } from '@portfolio/ui/utils';

function Card({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card"
      className={cn(
        'group flex w-full flex-col gap-2 rounded-2xl glass p-4 text-foreground',
        className
      )}
      {...props}
    />
  );
}

function MotionCard({ className, ...props }: HTMLMotionProps<'div'>) {
  return (
    <motion.div
      data-slot="card"
      className={cn(
        'group flex w-full flex-col gap-2 rounded-2xl glass p-4 text-foreground',
        className
      )}
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-header"
      className={cn('@container/card-header grid items-start gap-2 px-4 [.border-b]:pb-4', className)}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="card-title" className={cn('text-title-default leading-none', className)} {...props} />;
}

function CardDescription({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div data-slot="card-description" className={cn('text-body-default text-muted-foreground', className)} {...props} />
  );
}

function CardAction({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-action"
      className={cn('col-start-2 row-span-full row-start-1 self-start justify-self-end', className)}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="card-content" className={cn('', className)} {...props} />;
}

function CardFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="card-footer" className={cn('flex items-center px-4', className)} {...props} />;
}

export { Card, MotionCard, CardHeader, CardFooter, CardTitle, CardAction, CardDescription, CardContent };
