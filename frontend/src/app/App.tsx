import { HeroUIProvider, ToastProvider } from '@heroui/react';
import { RouterProvider } from '@tanstack/react-router';
import type { Register } from '@tanstack/react-router';

import { QueryProvider } from './QueryProvider';

import { ThemeProvider } from '~/entities/theme';
import { TOAST_OFFSET, TOAST_PLACEMENT } from '~/shared/config/heroui';

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
      <ToastProvider placement={TOAST_PLACEMENT} toastOffset={TOAST_OFFSET} />
    </HeroUIProvider>
  );
};
