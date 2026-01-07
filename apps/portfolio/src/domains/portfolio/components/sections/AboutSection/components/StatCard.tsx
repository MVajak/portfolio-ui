import { MotionCard } from "@portfolio/ui";
import type { Variants } from "motion/react";
import { useTranslation } from "react-i18next";

interface StatCardProps {
	icon: React.ComponentType<{ className?: string }>;
	labelKey: string;
	value: string;
	suffix?: string;
	variants?: Variants;
}

export function StatCard({
	icon: Icon,
	labelKey,
	value,
	suffix,
	variants,
}: StatCardProps) {
	const { t } = useTranslation();

	return (
		<MotionCard variants={variants} className="p-6">
			<div className="flex items-center gap-4">
				<div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
					<Icon className="h-6 w-6 text-primary" />
				</div>
				<div>
					<p className="text-body-default text-muted-foreground">
						{t(labelKey)}
					</p>
					<p className="text-title-default-bold text-foreground">
						{value}
						{suffix && (
							<span className="text-body-default text-muted-foreground ml-1">
								{t(suffix)}
							</span>
						)}
					</p>
				</div>
			</div>
		</MotionCard>
	);
}
