import { useCallback, useMemo } from 'react';
import { MessageCircle, Moon, Sun } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import { GitHubIcon, LinkedInIcon } from '@portfolio/icons';
import { CommandGroup, CommandItem, CommandShortcut, runToastSequence, Spotlight } from '@portfolio/ui';

import { personalInfo } from '@/domains/portfolio/data/personal';
import { type SpotlightSecretId, secretCommands, useDiscoveryStore, useWithDiscovery } from '@/domains/secrets';
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
  const withDiscovery = useWithDiscovery();
  const discoveredCount = useDiscoveryStore((s) => s.discoveredCount);
  const totalCount = useDiscoveryStore((s) => s.totalCount);

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
      description: (
        <>
          [sudo] password for recruiter: ********
          <br />
          Access granted. Sending offer...
        </>
      ),
      duration: 4000,
    });
    setTimeout(() => {
      window.location.href = `mailto:${personalInfo.email}?subject=Job Opportunity&body=Hi Mihkel, I found your portfolio and would like to discuss an opportunity...`;
    }, 1500);
  }, [close]);

  const handleCoffee = useCallback(() => {
    close();
    void runToastSequence({
      steps: [
        { message: '☕ Checking fuel levels...', type: 'loading' },
        { message: '⚠️ Fuel: 20%', type: 'warning' },
        { message: '🚨 FUEL CRITICAL: 5%', type: 'error' },
        { message: '☕ Emergency coffee deployed!', type: 'loading' },
      ],
      finalToast: {
        message: '✅ Fuel restored to 100%',
        type: 'success',
        description: 'Developer is now fully operational.',
      },
    });
  }, [close]);

  const handleDebug = useCallback(() => {
    close();
    void runToastSequence({
      steps: [
        { message: '🔧 Initializing debug mode...', type: 'loading' },
        { message: '📊 Components rendered: 47' },
        { message: '⚡ Performance: Blazingly fast™' },
        { message: '🐛 Bugs: None (probably)' },
      ],
      finalToast: {
        message: `✨ Easter eggs found: ${discoveredCount()}/${totalCount()}`,
        type: 'success',
        description: 'Keep exploring...',
      },
    });
  }, [close, discoveredCount, totalCount]);

  const handleNpmInstall = useCallback(() => {
    close();
    void runToastSequence({
      steps: [
        { message: 'Resolving dependencies...', type: 'loading' },
        { message: 'Downloading skills...', type: 'loading' },
        { message: 'Linking experience...', type: 'loading' },
      ],
      finalToast: {
        message: 'Installation complete!',
        type: 'success',
        description: 'Added 7+ years of experience to your team.',
      },
      sequential: true,
    });
  }, [close]);

  const handleGitBlame = useCallback(() => {
    close();
    toast('$ git blame portfolio.tsx', {
      description: (
        <>
          Line 1-∞: Mihkel Vajak
          <br />
          <br />
          🤖 Assisted by Claude Code
        </>
      ),
      duration: 4000,
    });
  }, [close]);

  const handleWhoami = useCallback(() => {
    close();
    toast('$ whoami', {
      description: (
        <>
          Mihkel Vajak
          <br />
          Lead Full Stack Developer
          <br />
          7+ years React/TypeScript
          <br />
          Tallinn, Estonia
          <br />
          <br />
          Currently: Open to opportunities
        </>
      ),
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

  const secretHandlers: Record<SpotlightSecretId, () => void> = useMemo(
    () => ({
      sudoHireMe: withDiscovery('sudoHireMe', handleSudoHireMe),
      coffee: withDiscovery('coffee', handleCoffee),
      debug: withDiscovery('debug', handleDebug),
      npmInstall: withDiscovery('npmInstall', handleNpmInstall),
      gitBlame: withDiscovery('gitBlame', handleGitBlame),
      whoami: withDiscovery('whoami', handleWhoami),
      random: withDiscovery('random', handleRandom),
    }),
    [withDiscovery, handleSudoHireMe, handleCoffee, handleDebug, handleNpmInstall, handleGitBlame, handleWhoami, handleRandom]
  );

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
      <CommandGroup heading={t('spotlight.secrets')}>
        {secretCommands.map((cmd) => (
          <CommandItem key={cmd.id} keywords={[...cmd.keywords]} onSelect={secretHandlers[cmd.id]}>
            <cmd.icon />
            <span>{cmd.label}</span>
            <CommandShortcut>{cmd.shortcut}</CommandShortcut>
          </CommandItem>
        ))}
      </CommandGroup>
    </Spotlight>
  );
}
