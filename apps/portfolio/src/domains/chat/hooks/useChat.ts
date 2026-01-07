import { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { streamChatResponse } from "../queries";
import type { Message } from "../types";

export function useChat() {
	const { t } = useTranslation();
	const [messages, setMessages] = useState<Message[]>([]);
	const [input, setInput] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const sendMessage = useCallback(async () => {
		if (!input.trim() || isLoading) return;

		const userMessage: Message = {
			id: crypto.randomUUID(),
			role: "user",
			content: input.trim(),
		};

		const allMessages = [...messages, userMessage];
		setMessages(allMessages);
		setInput("");
		setIsLoading(true);

		const assistantMessage: Message = {
			id: crypto.randomUUID(),
			role: "assistant",
			content: "",
		};

		try {
			setMessages((prev) => [...prev, assistantMessage]);

			const stream = streamChatResponse({
				messages: allMessages.map((m) => ({
					role: m.role,
					content: m.content,
				})),
			});

			for await (const chunk of stream) {
				setMessages((prev) =>
					prev.map((m) =>
						m.id === assistantMessage.id
							? { ...m, content: m.content + chunk }
							: m
					)
				);
			}
		} catch (error) {
			console.error("Chat error:", error);
			setMessages((prev) => [
				...prev.filter((m) => m.id !== assistantMessage.id),
				{
					id: crypto.randomUUID(),
					role: "assistant",
					content: t("chat.error"),
				},
			]);
		} finally {
			setIsLoading(false);
		}
	}, [input, isLoading, messages, t]);

	const clearMessages = useCallback(() => {
		setMessages([]);
	}, []);

	return {
		messages,
		input,
		setInput,
		isLoading,
		sendMessage,
		clearMessages,
	};
}