import { MessageCircle } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

import { Button } from '@portfolio/ui';

import { useChat } from '../hooks/useChat';
import { ChatWindow } from './ChatWindow';

interface ChatWidgetProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function ChatWidget({ isOpen, onToggle }: ChatWidgetProps) {
  const chat = useChat();

  return (
    <>
      <AnimatePresence>{isOpen && <ChatWindow onClose={onToggle} chat={chat} />}</AnimatePresence>

      <motion.div
        className="fixed right-6 bottom-6 z-50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.3 }}
      >
        <Button
          size="lg"
          onClick={onToggle}
          className="h-14 w-14 rounded-full bg-linear-to-br from-accent-indigo to-accent-pink shadow-lg transition-shadow hover:shadow-xl"
        >
          <motion.div animate={{ rotate: isOpen ? 90 : 0 }} transition={{ duration: 0.2 }}>
            <MessageCircle className="h-6 w-6" />
          </motion.div>
        </Button>
      </motion.div>
    </>
  );
}
