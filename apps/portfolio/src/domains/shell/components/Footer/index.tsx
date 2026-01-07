import { motion } from "motion/react";
import { useTranslation } from "react-i18next";

export function Footer() {
	const { t } = useTranslation();
	const currentYear = new Date().getFullYear();

	return (
		<footer className="border-t border-border bg-background/50 backdrop-blur-sm">
			<div className="mx-auto max-w-7xl px-6 py-8 md:px-8">
				<motion.div
					className="flex flex-col items-center justify-between gap-4 md:flex-row"
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5 }}
				>
					<p className="text-body-default text-muted-foreground">
						{currentYear} Mihkel Kristofer Vajak. {t("footer.copyright")}
					</p>
					<p className="text-body-default text-muted-foreground">
						{t("footer.builtWith")}{" "}
						<span className="text-body-default-bold text-foreground">
							React, TypeScript & Tailwind
						</span>
					</p>
				</motion.div>
			</div>
		</footer>
	);
}
