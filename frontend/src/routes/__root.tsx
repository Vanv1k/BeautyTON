import type { QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';

import { MiniappInitializer } from '~/features/miniapp';
import { IS_DEV_DOMAIN, IS_TG_MINIAPP } from '~/shared/config/general';

type MyRouterContext = {
  queryClient: QueryClient;
};

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <>
      <Outlet />
      {IS_TG_MINIAPP && <MiniappInitializer />}
      {IS_DEV_DOMAIN && <ReactQueryDevtools />}
    </>
  ),
});
