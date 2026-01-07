import type React from 'react';
import { type ComponentProps } from 'react';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../../utils';
import { getInitials } from './getInitials';

const avatarVariants = cva('relative flex shrink-0 overflow-hidden rounded-full', {
  variants: {
    size: {
      sm: 'size-8',
      md: 'size-10',
      lg: 'size-16',
      xl: 'size-32 md:size-40',
      full: 'size-full',
    },
    variant: {
      default: 'bg-muted text-muted-foreground',
      gradient: 'bg-linear-to-br from-accent-indigo via-accent-purple to-accent-pink text-primary-foreground',
      glass: 'glass',
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'default',
  },
});

const fallbackTextVariants = cva('font-bold', {
  variants: {
    size: {
      sm: 'text-body-small-bold',
      md: 'text-body-default-bold',
      lg: 'text-title-default-bold',
      xl: 'text-display-small-bold md:text-display-default-bold',
      full: 'text-display-small-bold md:text-display-default-bold',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export interface AvatarProps
  extends Omit<ComponentProps<typeof AvatarPrimitive.Root>, 'children'>,
    VariantProps<typeof avatarVariants> {
  src?: string;
  alt?: string;
  displayName?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

export const Avatar = ({ src, alt, displayName, icon, size, variant, className, children, ...props }: AvatarProps) => {
  return (
    <AvatarPrimitive.Root className={cn(avatarVariants({ size, variant }), className)} {...props}>
      {src && (
        <AvatarPrimitive.Image src={src} alt={alt ?? displayName} className="aspect-square size-full object-cover" />
      )}
      <AvatarPrimitive.Fallback className="flex size-full items-center justify-center rounded-full">
        {children ??
          (icon ? (
            <div className="flex size-3/5 items-center justify-center">{icon}</div>
          ) : (
            <span className={cn(fallbackTextVariants({ size }))}>{getInitials(displayName ?? '')}</span>
          ))}
      </AvatarPrimitive.Fallback>
      {children}
    </AvatarPrimitive.Root>
  );
};

export { getInitials };
