import { createFileRoute } from '@tanstack/react-router';

import { MiniappConnect } from '~/views/MiniappConnect';

export const Route = createFileRoute('/master/miniapp/connect')({
  component: MiniappConnect,
});
