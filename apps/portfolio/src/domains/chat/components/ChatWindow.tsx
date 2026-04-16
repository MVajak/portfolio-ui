import { useEffect, useRef } from 'react';
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
  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 639px)');
    if (!mq.matches) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  useEffect(() => {
    const vv = window.visualViewport;
    const mq = window.matchMedia('(max-width: 639px)');
    if (!vv || !mq.matches) return;
    const el = sheetRef.current;
    if (!el) return;
    const sync = () => {
      el.style.top = `${vv.offsetTop}px`;
      el.style.height = `${vv.height}px`;
    };
    sync();
    vv.addEventListener('resize', sync);
    vv.addEventListener('scroll', sync);
    return () => {
      vv.removeEventListener('resize', sync);
      vv.removeEventListener('scroll', sync);
      el.style.top = '';
      el.style.height = '';
    };
  }, []);

  return (
    <>
      <motion.div
        className="fixed inset-0 z-40 bg-black/40 sm:hidden"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      />

      <div
        ref={sheetRef}
        className="fixed inset-x-0 top-0 z-50 h-[100dvh] sm:inset-x-auto sm:top-auto sm:right-6 sm:bottom-24 sm:h-125 sm:max-h-[calc(100dvh-120px)] sm:w-95 sm:max-w-[calc(100vw-48px)]"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.2 }}
          className="flex h-full w-full flex-col overflow-hidden overscroll-contain border-border/50 bg-card shadow-2xl backdrop-blur-sm sm:rounded-2xl sm:border"
        >
          <ChatHeader onClose={onClose} />
          <ChatMessages messages={messages} isLoading={isLoading} />
          <div className="border-border/50 border-t p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
            <ChatInput value={input} onChange={setInput} onSubmit={sendMessage} isLoading={isLoading} />
          </div>
        </motion.div>
      </div>
    </>
  );
}
