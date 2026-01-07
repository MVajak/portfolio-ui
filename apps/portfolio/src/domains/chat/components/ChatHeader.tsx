import { X } from "lucide-react";
import { useTranslation } from "react-i18next";

interface ChatHeaderProps {
	onClose: () => void;
}

export function ChatHeader({ onClose }: ChatHeaderProps) {
	const { t } = useTranslation();

	return (
		<div className="flex items-center justify-between px-4 py-3 border-b border-border/50">
			<div className="flex items-center gap-2">
				<div className="w-2 h-2 rounded-full bg-accent-indigo animate-pulse" />
				<span className="text-body-small-bold text-foreground">
					{t("chat.title")}
				</span>
			</div>
			<button
				type="button"
				onClick={onClose}
				className="p-1 rounded-lg hover:bg-muted/50 transition-colors text-muted-foreground hover:text-foreground"
			>
				<X className="h-4 w-4" />
			</button>
		</div>
	);
}