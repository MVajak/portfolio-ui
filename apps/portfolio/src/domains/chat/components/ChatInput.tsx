import { Button } from "@portfolio/ui";
import { cn } from "@portfolio/ui/utils";
import { Send } from "lucide-react";
import type { FormEvent, KeyboardEvent } from "react";
import { useTranslation } from "react-i18next";

interface ChatInputProps {
	value: string;
	onChange: (value: string) => void;
	onSubmit: () => void;
	isLoading?: boolean;
}

export function ChatInput({
	value,
	onChange,
	onSubmit,
	isLoading,
}: ChatInputProps) {
	const { t } = useTranslation();
	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		if (value.trim() && !isLoading) {
			onSubmit();
		}
	};

	const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			if (value.trim() && !isLoading) {
				onSubmit();
			}
		}
	};

	return (
		<form onSubmit={handleSubmit} className="flex gap-2">
			<textarea
				value={value}
				onChange={(e) => onChange(e.target.value)}
				onKeyDown={handleKeyDown}
				placeholder={t("chat.placeholder")}
				disabled={isLoading}
				rows={1}
				className={cn(
					"flex-1 px-4 py-3 rounded-xl bg-background/50 border border-border text-body-small text-foreground placeholder:text-muted-foreground",
					"focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors",
					"disabled:cursor-not-allowed disabled:opacity-50",
					"resize-none min-h-[44px] max-h-[120px]"
				)}
			/>
			<Button
				type="submit"
				size="sm"
				disabled={!value.trim() || isLoading}
				className="shrink-0 h-[44px] w-[44px] p-0"
			>
				<Send className="h-4 w-4" />
			</Button>
		</form>
	);
}
