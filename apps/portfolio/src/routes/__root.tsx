import { useCallback, useEffect, useState } from 'react';
import { QueryClient } from '@tanstack/react-query';
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import confetti from 'canvas-confetti';
import { toast } from 'sonner';

import { Toaster } from '@portfolio/ui';

import { ChatWidget } from '@/domains/chat';
import { PortfolioSpotlight, useSpotlightStore } from '@/domains/portfolio';
import { Footer, Header } from '@/domains/shell';
import { useKonamiCode } from '@/hooks';

interface RouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
});

function RootComponent() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const toggleSpotlight = useSpotlightStore((state) => state.toggle);

  // Konami code easter egg
  const handleKonamiCode = useCallback(() => {
    // Fire confetti from both sides
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { x: 0.1, y: 0.6 },
    });
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { x: 0.9, y: 0.6 },
    });

    toast.success('Achievement Unlocked!', {
      description: 'You found the Konami code! You are a true gamer.',
      duration: 5000,
    });
  }, []);

  useKonamiCode(handleKonamiCode);

  // Handle Cmd+K keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggleSpotlight();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [toggleSpotlight]);

  const toggleChat = useCallback(() => {
    setIsChatOpen((prev) => !prev);
  }, []);

  const openChat = useCallback(() => {
    setIsChatOpen(true);
  }, []);

  return (
    <div className="min-h-screen bg-background bg-glass-mesh text-foreground">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <ChatWidget isOpen={isChatOpen} onToggle={toggleChat} />
      <PortfolioSpotlight onOpenChat={openChat} />
      <Toaster />
    </div>
  );
}
