import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { Spinner } from '@portfolio/ui';

import type { Message } from '../types';
import { ChatMessage } from './ChatMessage';

interface ChatMessagesProps {
  messages: Message[];
  isLoading: boolean;
}

export function ChatMessages({ messages, isLoading }: ChatMessagesProps) {
  const { t } = useTranslation();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const showLoadingIndicator = isLoading && messages[messages.length - 1]?.role === 'user';

  return (
    <div className="flex-1 space-y-4 overflow-y-auto p-4">
      {messages.length === 0 && (
        <div className="py-8 text-center text-body-small text-muted-foreground">
          <p>{t('chat.greeting')}</p>
          <p className="mt-1">{t('chat.hint')}</p>
        </div>
      )}

      {messages.map((message) => (
        <ChatMessage key={message.id} role={message.role} content={message.content} />
      ))}

      {showLoadingIndicator && (
        <div className="flex gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-indigo/20">
            <Spinner className="size-4" />
          </div>
          <div className="rounded-2xl border border-border/50 bg-card/50 px-4 py-2 backdrop-blur-sm">
            <p className="text-body-small text-muted-foreground">{t('chat.thinking')}</p>
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
}
