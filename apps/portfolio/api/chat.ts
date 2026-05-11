import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

import { systemPrompt } from '../src/domains/chat/data/system-prompt';

export const config = {
  runtime: 'edge',
};

const DEFAULT_ALLOWED_ORIGINS = [
  'https://mvajak.com',
  'https://www.mvajak.com',
  'http://localhost:5173',
];

function isOriginAllowed(origin: string | null): boolean {
  if (!origin) return false;
  if (DEFAULT_ALLOWED_ORIGINS.includes(origin)) return true;
  try {
    const { hostname, protocol } = new URL(origin);
    return protocol === 'https:' && hostname.endsWith('.vercel.app');
  } catch {
    return false;
  }
}

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  if (!isOriginAllowed(req.headers.get('origin'))) {
    return new Response('Forbidden', { status: 403 });
  }

  try {
    const { messages } = await req.json();

    const result = streamText({
      model: openai('gpt-4o-mini'),
      system: systemPrompt,
      messages,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error('Chat API error:', error);
    return new Response('Internal server error', { status: 500 });
  }
}
