import { Button } from '@heroui/react';
import type { QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';

import { useTheme } from '~/entities/theme';
import { MiniappInitializer } from '~/features/miniapp';
import { BottomNavbar, useNavbarVisibility } from '~/features/navbar';
import { IS_DEV_DOMAIN, IS_TG_MINIAPP } from '~/shared/config/general';

type MyRouterContext = {
  queryClient: QueryClient;
};

function RootComponent() {
  const { isDark, setTheme } = useTheme();
  const shouldShowNavbar = useNavbarVisibility();

  // todo: заменить на реальную роль пользователя
  const userRole = 'user';

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

      {/* Bottom Navigation */}
      {shouldShowNavbar && <BottomNavbar userRole={userRole} />}

      {/* todo: убрать */}
      <div className="fixed bottom-0 left-0 right-0 z-40">
        <Button
          id="theme-toggle"
          variant="light"
          size="sm"
          className="w-full"
          onPress={() => {
            setTheme(isDark ? 'light' : 'dark');
          }}
        >
          Toggle Theme
        </Button>
      </div>
      {IS_TG_MINIAPP && <MiniappInitializer />}
      {IS_DEV_DOMAIN && <ReactQueryDevtools />}
    </>
  );
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: RootComponent,
});
