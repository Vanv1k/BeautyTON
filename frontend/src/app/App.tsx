import { HeroUIProvider } from '@heroui/react';
import { RouterProvider } from '@tanstack/react-router';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryProvider } from './QueryProvider';
import type { Register } from '@tanstack/react-router';
import { IS_DEV_DOMAIN, IS_TG_MINIAPP } from '~/shared/config/general';
import { MiniappInitializer } from '~/features/miniapp';

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
