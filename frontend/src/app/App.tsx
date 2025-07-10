import { HeroUIProvider } from '@heroui/react';
import { RouterProvider } from '@tanstack/react-router';
import type { Register } from '@tanstack/react-router';

import { QueryProvider } from './QueryProvider';

import { ThemeProvider } from '~/entity/theme';

type Props = {
  router: Register['router'];
};

export const App: React.FC<Props> = ({ router }) => {
  return (
    <HeroUIProvider>
      <QueryProvider>
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      </QueryProvider>
    </HeroUIProvider>
  );
};
