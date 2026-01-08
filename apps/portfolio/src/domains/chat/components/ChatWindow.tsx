import { useEffect } from 'react';
import { motion } from 'motion/react';

import { ChatHeader } from './ChatHeader';
import { ChatInput } from './ChatInput';
import { ChatMessages } from './ChatMessages';

interface ChatWindowProps {
  onClose: () => void;
  chat: {
    messages: { id: string; role: 'user' | 'assistant'; content: string }[];
    input: string;
    setInput: (value: string) => void;
    isLoading: boolean;
    sendMessage: () => void;
  };
}

export function ChatWindow({ onClose, chat }: ChatWindowProps) {
  const { messages, input, setInput, isLoading, sendMessage } = chat;

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

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
