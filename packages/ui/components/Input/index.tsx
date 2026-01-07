import type { ComponentProps } from "react";

import { cn } from "@portfolio/ui/utils";

export const Input = ({ className, ...props }: ComponentProps<"input">) => {
	return (
		<input
			data-slot="input"
			className={cn(
				"w-full px-4 py-3 rounded-xl bg-background/50 border border-border text-body-default text-foreground placeholder:text-muted-foreground",
				"focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors",
				"aria-invalid:border-destructive aria-invalid:ring-1 aria-invalid:ring-destructive",
				"disabled:cursor-not-allowed disabled:opacity-50",
				className,
			)}
			{...props}
		/>
	);
};
