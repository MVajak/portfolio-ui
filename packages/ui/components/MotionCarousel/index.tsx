import * as React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { AnimatePresence, motion } from 'motion/react';

import { cn } from '@portfolio/ui/utils';

interface MotionCarouselProps {
  children: React.ReactNode[];
  className?: string;
  showDots?: boolean;
  showNavigation?: boolean;
}

export function MotionCarousel({ children, className, showDots = true, showNavigation = true }: MotionCarouselProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const itemCount = React.Children.count(children);

  const scrollPrev = React.useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + itemCount) % itemCount);
  }, [itemCount]);

  const scrollNext = React.useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % itemCount);
  }, [itemCount]);

  const scrollTo = React.useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  return (
    <div className={cn('relative', className)}>
      {/* Carousel content with motion */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {children[currentIndex]}
        </motion.div>
      </AnimatePresence>

      {/* Navigation buttons */}
      {showNavigation && (
        <div className="pointer-events-none absolute top-1/2 right-0 left-0 flex -translate-y-1/2 justify-between px-2 mx-6 lg:-mx-16">
          <motion.button
            type="button"
            onClick={scrollPrev}
            className="glass pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-r from-background via-background/20 to-transparent text-foreground transition-colors hover:bg-glass-hover md:backdrop-blur-xl"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Previous slide"
          >
            <ChevronLeftIcon className="h-6 w-6" />
          </motion.button>
          <motion.button
            type="button"
            onClick={scrollNext}
            className="glass pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-l from-background via-background/20 to-transparent text-foreground transition-colors hover:bg-glass-hover md:backdrop-blur-xl"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Next slide"
          >
            <ChevronRightIcon className="h-6 w-6" />
          </motion.button>
        </div>
      )}

      {/* Dots indicator */}
      {showDots && (
        <div className="mt-8 flex justify-center gap-2">
          {children.map((_, index) => (
            <motion.button
              key={index}
              type="button"
              onClick={() => scrollTo(index)}
              className={cn(
                'h-2 rounded-full transition-all',
                index === currentIndex ? 'w-8 bg-primary' : 'w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'
              )}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
