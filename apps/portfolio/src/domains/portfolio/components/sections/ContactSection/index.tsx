import { useTranslation } from "react-i18next";
import { Section } from "@/domains/shell";
import { ContactForm } from "./components/ContactForm";
import { ContactInfo } from "./components/ContactInfo";

export function ContactSection() {
	const { t } = useTranslation();

	return (
		<Section id="contact">
			<div className="text-center mb-12">
				<span className="inline-block text-body-default-bold text-primary mb-2">
					{t("contact.subtitle")}
				</span>
				<h2 className="text-title-large-bold md:text-display-small-bold text-foreground">
					{t("contact.title")}
				</h2>
			</div>

			<div className="grid gap-12 lg:grid-cols-2">
				<ContactForm />
				<ContactInfo />
			</div>
		</Section>
	);
}
