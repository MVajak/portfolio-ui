import { motion } from "motion/react";
import type { ReactNode } from "react";

interface SectionProps {
	id: string;
	children: ReactNode;
	className?: string;
	fullHeight?: boolean;
}

export function Section({
	id,
	children,
	className = "",
	fullHeight = false,
}: SectionProps) {
	return (
		<motion.section
			id={id}
			className={`relative px-6 py-20 md:px-8 ${fullHeight ? "min-h-screen flex items-center" : ""} ${className}`}
			initial={{ opacity: 0, y: 30 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, margin: "-100px" }}
			transition={{ duration: 0.6, ease: "easeOut" }}
		>
			<div className="mx-auto max-w-7xl w-full">{children}</div>
		</motion.section>
	);
}
