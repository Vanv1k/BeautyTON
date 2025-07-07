import ReactDOM from 'react-dom/client';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { HeroUIProvider } from '@heroui/react';
import * as telegramMiniapp from '@telegram-apps/sdk-react';

import * as TanStackQueryProvider from './app';

// Import the generated route tree
import { routeTree } from './routeTree.gen';

import './styles.css';
import { initEruda } from './shared/lib/init/initEruda';
import { IS_DEV_DOMAIN, IS_TG_MINIAPP } from './shared/config/general';
import { App } from './app/App';

const router = createRouter({
  routeTree,
  context: {
    ...TanStackQueryProvider.getContext(),
  },
  defaultPreload: 'intent',
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const startApp = () => {
  initEruda();

  if (IS_TG_MINIAPP) {
    const { init, swipeBehavior, backButton } = telegramMiniapp;
    init();

    backButton.mount();
    swipeBehavior.mount();

    if (swipeBehavior.disableVertical.isAvailable()) {
      swipeBehavior.disableVertical();
    }
  } else if (!IS_DEV_DOMAIN) {
    router.navigate({
      to: '/is-not-miniapp',
      replace: true,
    });
  }

  const rootElement = document.getElementById('app');
  if (rootElement && !rootElement.innerHTML) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(<App router={router} />);
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startApp);
} else {
  startApp();
}
