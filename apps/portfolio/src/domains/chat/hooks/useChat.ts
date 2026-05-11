import { useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { primeChat, streamChatResponse } from '../queries';
import type { Message } from '../types';

const WARMUP_COOLDOWN_MS = 4 * 60 * 1000;

export function useChat() {
  const { t } = useTranslation();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const lastWarmupRef = useRef(0);

  const warmup = useCallback(() => {
    if (isLoading) return;
    const now = Date.now();
    if (now - lastWarmupRef.current < WARMUP_COOLDOWN_MS) return;
    lastWarmupRef.current = now;
    void primeChat();
  }, [isLoading]);

  const sendMessage = useCallback(async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: input.trim(),
    };

    const allMessages = [...messages, userMessage];
    setMessages(allMessages);
    setInput('');
    setIsLoading(true);

    const assistantMessage: Message = {
      id: crypto.randomUUID(),
      role: 'assistant',
      content: '',
    };

    try {
      const stream = streamChatResponse({
        messages: allMessages.map((m) => ({
          role: m.role,
          content: m.content,
        })),
      });

      let started = false;
      for await (const chunk of stream) {
        if (!started) {
          started = true;
          setMessages((prev) => [...prev, { ...assistantMessage, content: chunk }]);
          continue;
        }
        setMessages((prev) =>
          prev.map((m) => (m.id === assistantMessage.id ? { ...m, content: m.content + chunk } : m))
        );
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages((prev) => [
        ...prev.filter((m) => m.id !== assistantMessage.id),
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: t('chat.error'),
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
    warmup,
  };
}
