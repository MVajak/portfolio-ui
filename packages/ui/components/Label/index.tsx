import type { ComponentProps } from "react";

import { cn } from "@portfolio/ui/utils";

export const Label = ({ className, ...props }: ComponentProps<"label">) => {
	return (
		<label
			data-slot="label"
			className={cn(
				"block text-body-default-bold text-foreground",
				className,
			)}
			{...props}
		/>
	);
};
