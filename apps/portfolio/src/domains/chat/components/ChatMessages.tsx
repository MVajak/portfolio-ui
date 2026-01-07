import { Spinner } from "@portfolio/ui";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import type { Message } from "../types";
import { ChatMessage } from "./ChatMessage";

interface ChatMessagesProps {
	messages: Message[];
	isLoading: boolean;
}

export function ChatMessages({ messages, isLoading }: ChatMessagesProps) {
	const { t } = useTranslation();
	const messagesEndRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	const showLoadingIndicator =
		isLoading && messages[messages.length - 1]?.role === "user";

	return (
		<div className="flex-1 overflow-y-auto p-4 space-y-4">
			{messages.length === 0 && (
				<div className="text-center text-muted-foreground text-body-small py-8">
					<p>{t("chat.greeting")}</p>
					<p className="mt-1">{t("chat.hint")}</p>
				</div>
			)}

			{messages.map((message) => (
				<ChatMessage
					key={message.id}
					role={message.role}
					content={message.content}
				/>
			))}

			{showLoadingIndicator && (
				<div className="flex gap-3">
					<div className="w-8 h-8 rounded-full bg-accent-indigo/20 flex items-center justify-center shrink-0">
						<Spinner className="size-4" />
					</div>
					<div className="rounded-2xl px-4 py-2 bg-card/50 backdrop-blur-sm border border-border/50">
						<p className="text-body-small text-muted-foreground">
							{t("chat.thinking")}
						</p>
					</div>
				</div>
			)}

			<div ref={messagesEndRef} />
		</div>
	);
}