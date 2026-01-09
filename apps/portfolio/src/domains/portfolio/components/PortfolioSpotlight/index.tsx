import { useCallback } from 'react';
import confetti from 'canvas-confetti';
import { Coffee, Dice5, MessageCircle, Moon, PartyPopper, Sun, Terminal, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

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

  // Secret command handlers
  const handleSudoHireMe = useCallback(() => {
    close();
    toast('$ sudo hire mihkel', {
      description: '[sudo] password for recruiter: ********\nAccess granted. Sending offer...',
      duration: 4000,
    });
    setTimeout(() => {
      window.location.href = `mailto:${personalInfo.email}?subject=Job Opportunity&body=Hi Mihkel, I found your portfolio and would like to discuss an opportunity...`;
    }, 1500);
  }, [close]);

  const handleParty = useCallback(() => {
    close();
    // Confetti burst from multiple angles
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, [close]);

  const handleCoffee = useCallback(() => {
    close();
    toast.warning('☕ Fuel Level: CRITICAL', {
      description: 'Developer needs coffee to function. Please stand by...',
      duration: 4000,
    });
  }, [close]);

  const handleNpmInstall = useCallback(() => {
    close();
    const toastId = toast.loading('npm install talent', {
      description: 'Resolving dependencies...\nDownloading skills...\nLinking experience...',
    });
    setTimeout(() => {
      toast.success('Installation complete!', {
        id: toastId,
        description: 'Added 7+ years of experience to your team.',
        duration: 3000,
      });
    }, 3000);
  }, [close]);

  const handleGitBlame = useCallback(() => {
    close();
    toast('$ git blame portfolio.tsx', {
      description: 'Line 1-∞: Mihkel Vajak <mihkel.vajak@gmail.com>\n\n🤖 Assisted by Claude Code',
      duration: 4000,
    });
  }, [close]);

  const handleWhoami = useCallback(() => {
    close();
    toast('$ whoami', {
      description:
        'Mihkel Vajak\nLead Full Stack Developer\n7+ years React/TypeScript\nTallinn, Estonia\n\nCurrently: Open to opportunities',
      duration: 5000,
    });
  }, [close]);

  const handleRandom = useCallback(() => {
    const sections = navItems.map((item) => item.id);
    const randomSection = sections[Math.floor(Math.random() * sections.length)];
    navigateTo(randomSection);
    toast(`🎲 Random destination: ${randomSection}`, {
      duration: 2000,
    });
  }, [navigateTo]);

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

      {/* Secret Commands - hidden by default, shown when typed */}
      <CommandGroup heading="Secrets">
        <CommandItem keywords={['sudo', 'hire', 'me', 'job']} onSelect={handleSudoHireMe}>
          <Terminal />
          <span>sudo hire me</span>
          <CommandShortcut>🔐</CommandShortcut>
        </CommandItem>
        <CommandItem keywords={['party', 'celebrate', 'confetti']} onSelect={handleParty}>
          <PartyPopper />
          <span>party</span>
          <CommandShortcut>🎉</CommandShortcut>
        </CommandItem>
        <CommandItem keywords={['coffee', 'caffeine', 'fuel']} onSelect={handleCoffee}>
          <Coffee />
          <span>coffee</span>
          <CommandShortcut>☕</CommandShortcut>
        </CommandItem>
        <CommandItem keywords={['npm', 'install', 'yarn', 'pnpm']} onSelect={handleNpmInstall}>
          <Terminal />
          <span>npm install</span>
          <CommandShortcut>📦</CommandShortcut>
        </CommandItem>
        <CommandItem keywords={['git', 'blame', 'who']} onSelect={handleGitBlame}>
          <Terminal />
          <span>git blame</span>
          <CommandShortcut>🔍</CommandShortcut>
        </CommandItem>
        <CommandItem keywords={['whoami', 'who', 'am', 'i', 'about']} onSelect={handleWhoami}>
          <User />
          <span>whoami</span>
          <CommandShortcut>👤</CommandShortcut>
        </CommandItem>
        <CommandItem keywords={['random', 'surprise', 'lucky']} onSelect={handleRandom}>
          <Dice5 />
          <span>random</span>
          <CommandShortcut>🎲</CommandShortcut>
        </CommandItem>
      </CommandGroup>
    </Spotlight>
  );
}
