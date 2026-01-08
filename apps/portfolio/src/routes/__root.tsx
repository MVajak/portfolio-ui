import { useCallback, useEffect, useState } from 'react';
import { QueryClient } from '@tanstack/react-query';
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';

import { ChatWidget } from '@/domains/chat';
import { PortfolioSpotlight, useSpotlightStore } from '@/domains/portfolio';
import { Footer, Header } from '@/domains/shell';

interface RouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
});

function RootComponent() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const toggleSpotlight = useSpotlightStore((state) => state.toggle);

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
    </div>
  );
}
