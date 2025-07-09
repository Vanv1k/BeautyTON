import { HeroUIProvider } from '@heroui/react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider } from '@tanstack/react-router';
import type { Register } from '@tanstack/react-router';

import { QueryProvider } from './QueryProvider';

import { MiniappInitializer } from '~/features/miniapp';
import { IS_DEV_DOMAIN, IS_TG_MINIAPP } from '~/shared/config/general';

type Props = {
  router: Register['router'];
};

export const App: React.FC<Props> = ({ router }) => {
  return (
    <HeroUIProvider>
      <QueryProvider>
        <RouterProvider router={router} />

        {IS_TG_MINIAPP && <MiniappInitializer />}
        {IS_DEV_DOMAIN && <ReactQueryDevtools />}
      </QueryProvider>
    </HeroUIProvider>
  );
};
