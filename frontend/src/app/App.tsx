import { HeroUIProvider } from '@heroui/react';
import { RouterProvider } from '@tanstack/react-router';
import type { Register } from '@tanstack/react-router';

import { QueryProvider } from './QueryProvider';

type Props = {
  router: Register['router'];
};

export const App: React.FC<Props> = ({ router }) => {
  return (
    <HeroUIProvider>
      <QueryProvider>
        <RouterProvider router={router} />
      </QueryProvider>
    </HeroUIProvider>
  );
};
