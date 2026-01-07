import { QueryClient } from '@tanstack/react-query';
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import { ChatWidget } from '../domains/chat';
import { Footer, Header } from '../domains/shell';

interface RouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
});

function RootComponent() {
  return (
    <div className="min-h-screen bg-background text-foreground bg-glass-mesh">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
}
