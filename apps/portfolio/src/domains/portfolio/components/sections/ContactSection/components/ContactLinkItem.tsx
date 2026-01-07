import { motion } from "motion/react";
import React from "react";

interface ContactLinkItemProps {
	icon: React.ComponentType<{ className?: string }>;
	label: string;
	value: string;
	href?: string;
}

export function ContactLinkItem({
	icon: Icon,
	label,
	value,
	href,
}: ContactLinkItemProps) {
	return (
		<motion.div whileHover={{ x: 4 }} className="flex items-center gap-4">
			<div className="flex h-12 w-12 items-center justify-center rounded-xl glass">
				<Icon className="h-5 w-5 text-primary" />
			</div>
			<div>
				<p className="text-body-default text-muted-foreground">{label}</p>
				{href ? (
					<a
						href={href}
						target={href.startsWith("mailto") ? undefined : "_blank"}
						rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
						className="text-body-large-bold text-foreground hover:text-primary transition-colors"
					>
						{value}
					</a>
				) : (
					<p className="text-body-large-bold text-foreground">{value}</p>
				)}
			</div>
		</motion.div>
	);
}
