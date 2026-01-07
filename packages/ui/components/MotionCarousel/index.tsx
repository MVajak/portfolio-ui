import * as React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "motion/react";

import { cn } from "@portfolio/ui/utils";

interface MotionCarouselProps {
	children: React.ReactNode[];
	className?: string;
	showDots?: boolean;
	showNavigation?: boolean;
}

export function MotionCarousel({
	children,
	className,
	showDots = true,
	showNavigation = true,
}: MotionCarouselProps) {
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
		<div className={cn("relative", className)}>
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
				<div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between pointer-events-none px-2 md:-mx-16">
					<motion.button
						type="button"
						onClick={scrollPrev}
						className="pointer-events-auto h-12 w-12 rounded-full glass flex items-center justify-center text-foreground hover:bg-glass-hover transition-colors"
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.9 }}
						aria-label="Previous slide"
					>
						<ChevronLeftIcon className="h-6 w-6" />
					</motion.button>
					<motion.button
						type="button"
						onClick={scrollNext}
						className="pointer-events-auto h-12 w-12 rounded-full glass flex items-center justify-center text-foreground hover:bg-glass-hover transition-colors"
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
				<div className="flex justify-center gap-2 mt-8">
					{children.map((_, index) => (
						<motion.button
							key={index}
							type="button"
							onClick={() => scrollTo(index)}
							className={cn(
								"h-2 rounded-full transition-all",
								index === currentIndex
									? "w-8 bg-primary"
									: "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50",
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
