import { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

import { Button } from '@portfolio/ui';

import { ChatWindow } from './ChatWindow';

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <AnimatePresence>{isOpen && <ChatWindow onClose={() => setIsOpen(false)} />}</AnimatePresence>

      <motion.div
        className="fixed right-6 bottom-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 200 }}
      >
        <Button
          size="lg"
          onClick={() => setIsOpen(!isOpen)}
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
