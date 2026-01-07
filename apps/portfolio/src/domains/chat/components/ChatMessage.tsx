import { Avatar } from "@portfolio/ui";
import { cn } from "@portfolio/ui/utils";
import { Sparkles, User } from "lucide-react";
import { motion } from "motion/react";

interface ChatMessageProps {
	role: "user" | "assistant";
	content: string;
}

export function ChatMessage({ role, content }: ChatMessageProps) {
	const isAssistant = role === "assistant";

	return (
		<motion.div
			initial={{ opacity: 0, y: 10 }}
			animate={{ opacity: 1, y: 0 }}
			className={cn("flex gap-3", isAssistant ? "flex-row" : "flex-row-reverse")}
		>
			<Avatar
				size="sm"
				icon={isAssistant ? <Sparkles /> : <User />}
				className={cn(
					"shrink-0",
					isAssistant
						? "bg-accent-indigo/20 text-accent-indigo"
						: "bg-primary/20 text-primary"
				)}
			/>
			<div
				className={cn(
					"rounded-2xl px-4 py-2 max-w-[80%]",
					isAssistant
						? "bg-card/50 backdrop-blur-sm border border-border/50 text-foreground"
						: "bg-primary text-primary-foreground"
				)}
			>
				<p className="text-body-small whitespace-pre-wrap">{content}</p>
			</div>
		</motion.div>
	);
}
