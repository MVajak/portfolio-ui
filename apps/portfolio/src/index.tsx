import './index.css';
import '@portfolio/i18n';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import ReactDOM from 'react-dom/client';

import { routeTree } from './routeTree.gen';

// Console easter egg for curious developers
console.log(
  `%c
  ███╗   ███╗██╗  ██╗██╗   ██╗
  ████╗ ████║██║ ██╔╝██║   ██║
  ██╔████╔██║█████╔╝ ██║   ██║
  ██║╚██╔╝██║██╔═██╗ ╚██╗ ██╔╝
  ██║ ╚═╝ ██║██║  ██╗ ╚████╔╝
  ╚═╝     ╚═╝╚═╝  ╚═╝  ╚═══╝
  `,
  'color: #10b981; font-weight: bold;'
);
console.log('%cPsst... try the Konami code! ↑↑↓↓←→←→BA', 'font-size: 12px; color: #6b7280; font-style: italic;');

const queryClient = new QueryClient();

const router = createRouter({
  routeTree,
  context: { queryClient },
  defaultPreload: 'intent',
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Failed to find the root element');
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>
);
