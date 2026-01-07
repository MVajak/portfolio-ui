import { ArrowDownIcon } from "@heroicons/react/24/outline";
import { Avatar } from "@portfolio/ui";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { personalInfo } from "@/domains/portfolio";

const containerVariants = {
	hidden: { opacity: 0 },
	show: {
		opacity: 1,
		transition: {
			staggerChildren: 0.15,
			delayChildren: 0.3,
		},
	},
};

const itemVariants = {
	hidden: { opacity: 0, y: 20 },
	show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export function HeroSection() {
	const { t } = useTranslation();

	return (
		<section
			id="hero"
			className="relative min-h-screen flex items-center justify-center px-6 pt-24 pb-12 md:px-8"
		>
			{/* Floating Glass Orbs */}
			<motion.div
				className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-accent-indigo/10 blur-3xl"
				animate={{
					y: [0, -30, 0],
					x: [0, 20, 0],
					scale: [1, 1.1, 1],
				}}
				transition={{
					duration: 8,
					repeat: Number.POSITIVE_INFINITY,
					ease: "easeInOut",
				}}
			/>
			<motion.div
				className="absolute bottom-1/4 right-1/4 h-72 w-72 rounded-full bg-accent-pink/10 blur-3xl"
				animate={{
					y: [0, 20, 0],
					x: [0, -30, 0],
					scale: [1, 1.15, 1],
				}}
				transition={{
					duration: 10,
					repeat: Number.POSITIVE_INFINITY,
					ease: "easeInOut",
					delay: 1,
				}}
			/>
			<motion.div
				className="absolute top-1/3 right-1/3 h-48 w-48 rounded-full bg-success/10 blur-3xl"
				animate={{
					y: [0, 15, 0],
					x: [0, -15, 0],
				}}
				transition={{
					duration: 6,
					repeat: Number.POSITIVE_INFINITY,
					ease: "easeInOut",
					delay: 2,
				}}
			/>

			<motion.div
				className="relative z-10 text-center max-w-4xl mx-auto"
				variants={containerVariants}
				initial="hidden"
				animate="show"
			>
				{/* Avatar */}
				<motion.div
					variants={itemVariants}
					className="mb-8 flex justify-center"
				>
					<div className="relative">
						<div className="h-32 w-32 rounded-full glass p-1 md:h-40 md:w-40">
							<Avatar
								src="/avatar.jpeg"
								alt={personalInfo.name}
								displayName={personalInfo.name}
								size="full"
							/>
						</div>
						{/* Status indicator */}
						<motion.div
							className="absolute bottom-2 right-2 h-4 w-4 rounded-full bg-success border-2 border-background"
							animate={{ scale: [1, 1.2, 1] }}
							transition={{
								duration: 2,
								repeat: Number.POSITIVE_INFINITY,
								ease: "easeInOut",
							}}
						/>
					</div>
				</motion.div>

				{/* Greeting */}
				<motion.p
					variants={itemVariants}
					className="mb-2 text-title-small md:text-title-default text-muted-foreground"
				>
					{t("hero.greeting")}
				</motion.p>

				{/* Name */}
				<motion.h1
					variants={itemVariants}
					className="mb-4 text-display-small-bold md:text-display-default-bold lg:text-display-large-bold text-foreground"
				>
					<span className="text-gradient">{personalInfo.name}</span>
				</motion.h1>

				{/* Role */}
				<motion.p
					variants={itemVariants}
					className="mb-2 text-title-default-bold md:text-title-default-bold text-foreground"
				>
					{personalInfo.role}
				</motion.p>
				<motion.div
					variants={itemVariants}
					className="mb-6 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-success/10 border border-success/30"
				>
					<span className="h-2 w-2 rounded-full bg-success animate-pulse" />
					<span className="text-body-small-bold text-success">{t("hero.available")}</span>
				</motion.div>

				{/* Tagline */}
				<motion.p
					variants={itemVariants}
					className="mb-10 text-title-small text-muted-foreground max-w-2xl mx-auto"
				>
					{t("hero.tagline")}
				</motion.p>

				{/* CTA Buttons */}
				<motion.div
					variants={itemVariants}
					className="flex flex-col sm:flex-row items-center justify-center gap-4"
				>
					<motion.a
						href="#projects"
						className="inline-flex items-center justify-center px-8 py-3 text-body-default-bold rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
						whileHover={{ scale: 1.05, y: -2 }}
						whileTap={{ scale: 0.95 }}
					>
						{t("hero.cta.projects")}
					</motion.a>
					<motion.a
						href="#contact"
						className="inline-flex items-center justify-center px-8 py-3 text-body-default-bold rounded-full glass-hover"
						whileHover={{ scale: 1.05, y: -2 }}
						whileTap={{ scale: 0.95 }}
					>
						{t("hero.cta.contact")}
					</motion.a>
				</motion.div>
			</motion.div>

			{/* Scroll indicator */}
			<motion.div
				className="absolute bottom-8 left-1/2 -translate-x-1/2"
				animate={{ y: [0, 10, 0] }}
				transition={{
					duration: 1.5,
					repeat: Number.POSITIVE_INFINITY,
					ease: "easeInOut",
				}}
			>
				<a
					href="#about"
					className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
				>
					<span className="text-body-small uppercase tracking-widest">
						{t("hero.scroll")}
					</span>
					<ArrowDownIcon className="h-5 w-5" />
				</a>
			</motion.div>
		</section>
	);
}
