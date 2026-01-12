'use client';

import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { createContext, useContext } from 'react';
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../../utils';

const toggleGroupVariants = cva('inline-flex items-center gap-1 rounded-full p-1', {
  variants: {
    variant: {
      default: 'bg-muted',
      glass: 'glass backdrop-blur-xl',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const toggleGroupItemVariants = cva(
  'relative inline-flex items-center justify-center whitespace-nowrap rounded-full text-body-default-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      size: {
        sm: 'h-7 px-2.5 text-body-small-bold',
        default: 'h-8 px-3',
        lg: 'h-9 px-4',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

// Context to pass animation config and active value to items
const ToggleGroupContext = createContext<{
  animated?: boolean;
  activeValue?: string;
}>({});

type ToggleGroupProps = VariantProps<typeof toggleGroupVariants> & {
  type: 'single';
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /** Enable animated indicator sliding between items */
  animated?: boolean;
  className?: string;
  children?: ReactNode;
  disabled?: boolean;
};

export function ToggleGroup({
  className,
  variant,
  animated,
  value,
  defaultValue,
  onValueChange,
  children,
  type: _type,
  ...props
}: ToggleGroupProps) {
  return (
    <ToggleGroupContext.Provider value={{ animated, activeValue: value }}>
      <ToggleGroupPrimitive.Root
        className={cn(toggleGroupVariants({ variant, className }))}
        type="single"
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        {...props}
      >
        {children}
      </ToggleGroupPrimitive.Root>
    </ToggleGroupContext.Provider>
  );
}

type ToggleGroupItemProps = ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> &
  VariantProps<typeof toggleGroupItemVariants> & {
    children: ReactNode;
  };

export function ToggleGroupItem({ className, size, children, value, ...props }: ToggleGroupItemProps) {
  const { animated, activeValue } = useContext(ToggleGroupContext);
  const isActive = activeValue === value;

  return (
    <ToggleGroupPrimitive.Item
      className={cn(
        toggleGroupItemVariants({ size }),
        'text-muted-foreground hover:text-foreground',
        'data-[state=on]:text-primary-foreground',
        className
      )}
      value={value}
      {...props}
    >
      {/* Background indicator - always rendered but only visible when active */}
      <span
        className={cn(
          'absolute inset-0 rounded-full bg-primary',
          animated
            ? 'transition-all duration-200 ease-out'
            : 'transition-opacity duration-150',
          isActive ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
        )}
      />
      <span className="relative z-10">{children}</span>
    </ToggleGroupPrimitive.Item>
  );
}
