import { X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface ChatHeaderProps {
  onClose: () => void;
}

export function ChatHeader({ onClose }: ChatHeaderProps) {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-between border-border/50 border-b px-4 py-3">
      <div className="flex items-center gap-2">
        <div className="h-2 w-2 animate-pulse rounded-full bg-accent-indigo" />
        <span className="text-body-small-bold text-foreground">{t('chat.title')}</span>
      </div>
      <button
        type="button"
        onClick={onClose}
        className="rounded-lg p-1 text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
