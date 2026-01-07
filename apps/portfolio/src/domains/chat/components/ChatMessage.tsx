import { Sparkles, User } from 'lucide-react';
import { motion } from 'motion/react';

import { Avatar } from '@portfolio/ui';
import { cn } from '@portfolio/ui/utils';

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
}

export function ChatMessage({ role, content }: ChatMessageProps) {
  const isAssistant = role === 'assistant';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn('flex gap-3', isAssistant ? 'flex-row' : 'flex-row-reverse')}
    >
      <Avatar
        size="sm"
        icon={isAssistant ? <Sparkles /> : <User />}
        className={cn(
          'shrink-0',
          isAssistant ? 'bg-accent-indigo/20 text-accent-indigo' : 'bg-primary/20 text-primary'
        )}
      />
      <div
        className={cn(
          'max-w-[80%] rounded-2xl px-4 py-2',
          isAssistant
            ? 'border border-border/50 bg-card/50 text-foreground backdrop-blur-sm'
            : 'bg-primary text-primary-foreground'
        )}
      >
        <p className="whitespace-pre-wrap text-body-small">{content}</p>
      </div>
    </motion.div>
  );
}
