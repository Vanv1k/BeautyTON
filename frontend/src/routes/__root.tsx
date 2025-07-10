import type { QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';

import { useTheme } from '~/entity/theme';
import { MiniappInitializer } from '~/features/miniapp';
import { IS_DEV_DOMAIN, IS_TG_MINIAPP } from '~/shared/config/general';

type MyRouterContext = {
  queryClient: QueryClient;
};

function RootComponent() {
  const { isDark } = useTheme();

  return (
    <>
      <div
        className={`min-h-screen transition-colors duration-700 ${
          isDark
            ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white'
            : 'bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 text-gray-900'
        }`}
      >
        <Outlet />
      </div>

      {IS_TG_MINIAPP && <MiniappInitializer />}
      {IS_DEV_DOMAIN && <ReactQueryDevtools />}
    </>
  );
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: RootComponent,
});
