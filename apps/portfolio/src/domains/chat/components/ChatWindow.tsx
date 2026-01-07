import { motion } from "motion/react";
import { useChat } from "@/domains/chat";
import { ChatHeader } from "./ChatHeader";
import { ChatInput } from "./ChatInput";
import { ChatMessages } from "./ChatMessages";

interface ChatWindowProps {
	onClose: () => void;
}

export function ChatWindow({ onClose }: ChatWindowProps) {
	const { messages, input, setInput, isLoading, sendMessage } = useChat();

	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.95, y: 20 }}
			animate={{ opacity: 1, scale: 1, y: 0 }}
			exit={{ opacity: 0, scale: 0.95, y: 20 }}
			className="fixed bottom-24 right-6 w-95 max-w-[calc(100vw-48px)] h-125 max-h-[calc(100vh-120px)] bg-card/80 backdrop-blur-xl border border-border/50 rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50"
		>
			<ChatHeader onClose={onClose} />
			<ChatMessages messages={messages} isLoading={isLoading} />
			<div className="p-4 border-t border-border/50">
				<ChatInput
					value={input}
					onChange={setInput}
					onSubmit={sendMessage}
					isLoading={isLoading}
				/>
			</div>
		</motion.div>
	);
}