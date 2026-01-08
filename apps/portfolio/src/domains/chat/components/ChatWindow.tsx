import { motion } from 'motion/react';

import { useChat } from '@/domains/chat';

import { ChatHeader } from './ChatHeader';
import { ChatInput } from './ChatInput';
import { ChatMessages } from './ChatMessages';

interface ChatWindowProps {
  onClose: () => void;
}

export function ChatWindow({ onClose }: ChatWindowProps) {
  const { messages, input, setInput, isLoading, sendMessage } = useChat();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.2 }}
      className="fixed right-6 bottom-24 z-50 flex h-125 max-h-[calc(100vh-120px)] w-95 max-w-[calc(100vw-48px)] flex-col overflow-hidden rounded-2xl border border-border/50 bg-card shadow-2xl backdrop-blur-sm"
    >
      <ChatHeader onClose={onClose} />
      <ChatMessages messages={messages} isLoading={isLoading} />
      <div className="border-border/50 border-t p-4">
        <ChatInput value={input} onChange={setInput} onSubmit={sendMessage} isLoading={isLoading} />
      </div>
    </motion.div>
  );
}
