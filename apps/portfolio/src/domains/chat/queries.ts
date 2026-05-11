import { config } from '@/config';

import type { Message } from './types';

interface ChatRequest {
  messages: Pick<Message, 'role' | 'content'>[];
}

export async function primeChat(): Promise<void> {
  try {
    const response = await fetch(`${config.chatApiUrl}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: [{ role: 'user', content: 'hi' }] }),
    });
    const reader = response.body?.getReader();
    if (reader) {
      await reader.read();
      await reader.cancel();
    }
  } catch {
    // best-effort warmup; intentionally swallow errors
  }
}

export async function* streamChatResponse(request: ChatRequest): AsyncGenerator<string, void, unknown> {
  const response = await fetch(`${config.chatApiUrl}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch');
  }

  const reader = response.body?.getReader();
  if (!reader) return;

  const decoder = new TextDecoder();

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    const text = decoder.decode(value, { stream: true });
    if (text) {
      yield text;
    }
  }
}
