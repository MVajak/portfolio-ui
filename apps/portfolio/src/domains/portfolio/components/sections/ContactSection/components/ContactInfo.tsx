import {
	EnvelopeIcon,
	MapPinIcon,
} from "@heroicons/react/24/outline";
import { GitHubIcon, LinkedInIcon } from "@portfolio/icons";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { personalInfo } from "@/domains/portfolio";
import { ContactLinkItem } from "./ContactLinkItem";

const contactLinks = [
	{
		icon: EnvelopeIcon,
		label: "Email",
		value: personalInfo.email,
		href: `mailto:${personalInfo.email}`,
	},
	{
		icon: MapPinIcon,
		label: "Location",
		value: personalInfo.location,
	},
	{
		icon: GitHubIcon,
		label: "GitHub",
		value: "MVajak",
		href: personalInfo.github,
	},
	{
		icon: LinkedInIcon,
		label: "LinkedIn",
		value: "Mihkel Kristofer Vajak",
		href: personalInfo.linkedin,
	},
];

const containerVariants = {
	hidden: { opacity: 0 },
	show: {
		opacity: 1,
		transition: { staggerChildren: 0.1 },
	},
};

const itemVariants = {
	hidden: { opacity: 0, y: 20 },
	show: { opacity: 1, y: 0 },
};

export function ContactInfo() {
	const { t } = useTranslation();

	return (
		<motion.div
			variants={containerVariants}
			initial="hidden"
			whileInView="show"
			viewport={{ once: true }}
			className="space-y-6"
		>
			<motion.div variants={itemVariants}>
				<h3 className="text-title-default-bold text-foreground mb-4">
					{t("contact.info.title")}
				</h3>
				<p className="text-muted-foreground">
					{t("contact.info.description")}
				</p>
			</motion.div>

			<motion.div variants={itemVariants} className="space-y-4">
				{contactLinks.map((link) => (
					<ContactLinkItem
						key={link.label}
						icon={link.icon}
						label={link.label}
						value={link.value}
						href={link.href}
					/>
				))}
			</motion.div>
		</motion.div>
	);
}
