import { createRouter } from '@tanstack/react-router';
import * as telegramMiniapp from '@telegram-apps/sdk-react';
import ReactDOM from 'react-dom/client';

import * as TanStackQueryProvider from './app';
import { App } from './app';
import { routeTree } from './routeTree.gen';
import './styles.css';
import { initApi } from './shared/api/initApi';
import { IS_DEV_DOMAIN, IS_TG_MINIAPP } from './shared/config/general';
import { initEruda } from './shared/lib/init/initEruda';

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
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Register {
    router: typeof router;
  }
}

const startApp = () => {
  initEruda();
  initApi();

  if (IS_TG_MINIAPP) {
    const {
      init: initMiniapp,
      swipeBehavior,
      backButton,
      themeParams,
    } = telegramMiniapp;
    initMiniapp();

    backButton.mount();
    swipeBehavior.mount();

    if (swipeBehavior.disableVertical.isAvailable()) {
      swipeBehavior.disableVertical();
    }

    if (themeParams.mountSync.isAvailable()) {
      themeParams.mountSync();
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
