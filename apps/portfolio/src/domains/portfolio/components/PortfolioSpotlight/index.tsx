import { useCallback } from 'react';
import { MessageCircle, Moon, Sun } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { GitHubIcon, LinkedInIcon } from '@portfolio/icons';
import { CommandGroup, CommandItem, CommandShortcut, Spotlight } from '@portfolio/ui';

import { personalInfo } from '@/domains/portfolio/data/personal';
import { navItems } from '@/domains/shell/data/navigation';
import { useThemeStore } from '@/domains/theme';

import { useSpotlightStore } from './store';

export { useSpotlightStore } from './store';

interface PortfolioSpotlightProps {
  onOpenChat: () => void;
}

export function PortfolioSpotlight({ onOpenChat }: PortfolioSpotlightProps) {
  const { t } = useTranslation();
  const { isOpen, close, toggle } = useSpotlightStore();
  const { theme, toggleTheme } = useThemeStore();

  const runCommand = useCallback(
    (command: () => void) => {
      close();
      command();
    },
    [close]
  );

  const navigateTo = useCallback(
    (id: string) => {
      close();
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    },
    [close]
  );

  const handleOpenChat = useCallback(() => {
    close();
    onOpenChat();
  }, [close, onOpenChat]);

  return (
    <Spotlight
      open={isOpen}
      onOpenChange={(open) => (open ? toggle() : close())}
      placeholder={t('spotlight.placeholder')}
      emptyMessage={t('spotlight.empty')}
      footer={
        <div className="flex items-center justify-center gap-4 border-border/50 border-t px-4 py-3 text-body-small text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <kbd className="rounded-md bg-muted/50 px-1.5 py-0.5 text-xs">↑↓</kbd>
            <span>{t('spotlight.navigate')}</span>
          </span>
          <span className="flex items-center gap-1.5">
            <kbd className="rounded-md bg-muted/50 px-1.5 py-0.5 text-xs">↵</kbd>
            <span>{t('spotlight.select')}</span>
          </span>
          <span className="flex items-center gap-1.5">
            <kbd className="rounded-md bg-muted/50 px-1.5 py-0.5 text-xs">esc</kbd>
            <span>{t('spotlight.close')}</span>
          </span>
        </div>
      }
    >
      {/* Navigation */}
      <CommandGroup heading={t('spotlight.navigation')}>
        {navItems.map((item) => (
          <CommandItem key={item.key} onSelect={() => navigateTo(item.id)}>
            <item.icon />
            <span>{t(`nav.${item.key}`)}</span>
          </CommandItem>
        ))}
      </CommandGroup>

      {/* Actions */}
      <CommandGroup heading={t('spotlight.actions')}>
        <CommandItem onSelect={() => runCommand(toggleTheme)}>
          {theme === 'dark' ? <Sun /> : <Moon />}
          <span>{t('spotlight.toggleTheme')}</span>
          <CommandShortcut>Theme</CommandShortcut>
        </CommandItem>
        <CommandItem onSelect={handleOpenChat}>
          <MessageCircle />
          <span>{t('spotlight.openChat')}</span>
          <CommandShortcut>AI</CommandShortcut>
        </CommandItem>
      </CommandGroup>

      {/* Links */}
      <CommandGroup heading={t('spotlight.links')}>
        <CommandItem onSelect={() => runCommand(() => window.open(personalInfo.github, '_blank'))}>
          <GitHubIcon />
          <span>GitHub</span>
          <CommandShortcut>github.com</CommandShortcut>
        </CommandItem>
        <CommandItem onSelect={() => runCommand(() => window.open(personalInfo.linkedin, '_blank'))}>
          <LinkedInIcon />
          <span>LinkedIn</span>
          <CommandShortcut>linkedin.com</CommandShortcut>
        </CommandItem>
      </CommandGroup>
    </Spotlight>
  );
}
