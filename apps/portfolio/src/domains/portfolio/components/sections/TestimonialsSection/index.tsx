import { LinkedInIcon, QuoteIcon } from "@portfolio/icons";
import { Button, MotionCarousel } from "@portfolio/ui";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { Section } from "@/domains/shell";
import { recommendations } from "@/domains/portfolio";
import { TestimonialAuthor } from "./components/TestimonialAuthor";

export function TestimonialsSection() {
	const { t } = useTranslation();

	return (
		<Section id="testimonials" className="bg-linear-to-b from-muted/30 from-80% to-transparent">
			<div className="text-center mb-12">
				<span className="inline-block text-body-default-bold text-primary mb-2">
					{t("testimonials.subtitle")}
				</span>
				<h2 className="text-title-large-bold md:text-display-small-bold text-foreground">
					{t("testimonials.title")}
				</h2>
			</div>

			<div className="max-w-4xl mx-auto">
				<MotionCarousel>
					{recommendations.map((rec) => (
						<div key={rec.id} className="glass rounded-3xl p-8 md:p-12">
							<QuoteIcon className="h-12 w-12 text-primary/20 mb-6" />

							<blockquote className="text-title-small text-foreground leading-relaxed mb-8">
								"{rec.text}"
							</blockquote>

							<TestimonialAuthor recommendation={rec} />
						</div>
					))}
				</MotionCarousel>

				{/* LinkedIn link */}
				<motion.div
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true }}
					className="text-center mt-8"
				>
					<Button
						variant="link"
						asChild
						iconRight={<LinkedInIcon className="h-4 w-4" />}
						className="text-muted-foreground hover:text-foreground hover:no-underline"
					>
						<a
							href="https://www.linkedin.com/in/mihkel-kristofer-vajak-a91539164/details/recommendations/"
							target="_blank"
							rel="noopener noreferrer"
						>
							{t("testimonials.viewAll")}
						</a>
					</Button>
				</motion.div>
			</div>
		</Section>
	);
}
