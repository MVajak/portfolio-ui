import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import {
	Button,
	Field,
	FieldError,
	FieldLabel,
	Input,
	Card,
	Textarea,
} from "@portfolio/ui";
import { motion } from "motion/react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { personalInfo } from "@/domains/portfolio";

interface ContactFormData {
	name: string;
	email: string;
	message: string;
}

const isValidEmail = (email: string): boolean => {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
};

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

export function ContactForm() {
	const { t } = useTranslation();
	const {
		control,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm<ContactFormData>({
		defaultValues: { name: "", email: "", message: "" },
		mode: "onChange",
	});

	const onSubmit = (data: ContactFormData) => {
		const subject = encodeURIComponent(`Portfolio Contact from ${data.name}`);
		const body = encodeURIComponent(
			`Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`,
		);
		window.location.href = `mailto:${personalInfo.email}?subject=${subject}&body=${body}`;
	};

	return (
		<motion.div
			variants={containerVariants}
			initial="hidden"
			whileInView="show"
			viewport={{ once: true }}
		>
			<motion.div variants={itemVariants}>
				<Card className="p-8">
					<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
						<Controller
							name="name"
							control={control}
							rules={{ required: t("contact.form.nameRequired") }}
							render={({ field }) => (
								<Field>
									<FieldLabel htmlFor="name">
										{t("contact.form.name")}
									</FieldLabel>
									<Input
										id="name"
										placeholder={t("contact.form.namePlaceholder")}
										aria-invalid={!!errors.name}
										{...field}
									/>
									{errors.name && <FieldError>{errors.name.message}</FieldError>}
								</Field>
							)}
						/>

						<Controller
							name="email"
							control={control}
							rules={{
								required: t("contact.form.emailRequired"),
								validate: (value) => isValidEmail(value) || t("contact.form.emailInvalid"),
							}}
							render={({ field }) => (
								<Field>
									<FieldLabel htmlFor="email">
										{t("contact.form.email")}
									</FieldLabel>
									<Input
										id="email"
										type="email"
										placeholder={t("contact.form.emailPlaceholder")}
										aria-invalid={!!errors.email}
										{...field}
									/>
									{errors.email && <FieldError>{errors.email.message}</FieldError>}
								</Field>
							)}
						/>

						<Controller
							name="message"
							control={control}
							rules={{ required: t("contact.form.messageRequired") }}
							render={({ field }) => (
								<Field>
									<FieldLabel htmlFor="message">
										{t("contact.form.message")}
									</FieldLabel>
									<Textarea
										id="message"
										rows={5}
										placeholder={t("contact.form.messagePlaceholder")}
										aria-invalid={!!errors.message}
										{...field}
									/>
									{errors.message && <FieldError>{errors.message.message}</FieldError>}
								</Field>
							)}
						/>

						<Button
							type="submit"
							className="w-full"
							iconLeft={<PaperAirplaneIcon className="h-5 w-5" />}
							disabled={!isValid}
						>
							{t("contact.form.send")}
						</Button>
					</form>
				</Card>
			</motion.div>
		</motion.div>
	);
}
