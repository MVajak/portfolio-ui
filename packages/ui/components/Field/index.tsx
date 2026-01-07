import type { ComponentProps } from "react";

import { cn } from "@portfolio/ui/utils";
import { Label } from "../Label";

function Field({ className, ...props }: ComponentProps<"div">) {
	return (
		<div
			data-slot="field"
			className={cn("flex flex-col gap-2", className)}
			{...props}
		/>
	);
}

function FieldLabel({ className, ...props }: ComponentProps<typeof Label>) {
	return <Label data-slot="field-label" className={className} {...props} />;
}

function FieldDescription({ className, ...props }: ComponentProps<"p">) {
	return (
		<p
			data-slot="field-description"
			className={cn("text-body-small text-muted-foreground", className)}
			{...props}
		/>
	);
}

function FieldError({ className, ...props }: ComponentProps<"p">) {
	return (
		<p
			role="alert"
			data-slot="field-error"
			className={cn("text-body-small text-destructive", className)}
			{...props}
		/>
	);
}

export { Field, FieldLabel, FieldDescription, FieldError };
