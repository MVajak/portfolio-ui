import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';

import { cn } from '../../utils';
import { Command, CommandEmpty, CommandInput, CommandList } from '../Command';

interface SpotlightProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  placeholder?: string;
  emptyMessage?: string;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
}

export function Spotlight({
  open,
  onOpenChange,
  placeholder = 'Type a command or search...',
  emptyMessage = 'No results found.',
  children,
  footer,
  className,
}: SpotlightProps) {
  // Handle Escape key and lock body scroll
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onOpenChange(false);
      }
    };

    // Lock body scroll
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [open, onOpenChange]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-50 bg-background/60 backdrop-blur-sm"
            onClick={() => onOpenChange(false)}
          />

          {/* Spotlight Dialog */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[15%] left-1/2 z-50 w-full max-w-xl -translate-x-1/2 px-4"
          >
            <Command
              className={cn(
                'overflow-hidden rounded-2xl border border-border/50 bg-card shadow-2xl backdrop-blur-xl',
                className
              )}
            >
              <CommandInput placeholder={placeholder} />
              <CommandList>
                <CommandEmpty>{emptyMessage}</CommandEmpty>
                {children}
              </CommandList>
              {footer}
            </Command>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
