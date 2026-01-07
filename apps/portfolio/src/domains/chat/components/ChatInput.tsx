import type { FormEvent, KeyboardEvent } from 'react';
import { Send } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { Button } from '@portfolio/ui';
import { cn } from '@portfolio/ui/utils';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  isLoading?: boolean;
}

export function ChatInput({ value, onChange, onSubmit, isLoading }: ChatInputProps) {
  const { t } = useTranslation();
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (value.trim() && !isLoading) {
      onSubmit();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (value.trim() && !isLoading) {
        onSubmit();
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={t('chat.placeholder')}
        disabled={isLoading}
        rows={1}
        className={cn(
          'flex-1 rounded-xl border border-border bg-background/50 px-4 py-3 text-body-small text-foreground placeholder:text-muted-foreground',
          'outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary',
          'disabled:cursor-not-allowed disabled:opacity-50',
          'max-h-[120px] min-h-[44px] resize-none'
        )}
      />
      <Button type="submit" size="sm" disabled={!value.trim() || isLoading} className="h-[44px] w-[44px] shrink-0 p-0">
        <Send className="h-4 w-4" />
      </Button>
    </form>
  );
}
