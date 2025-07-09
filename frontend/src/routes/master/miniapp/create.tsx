import { createFileRoute } from '@tanstack/react-router';

import { MiniappCreate } from '~/views/MiniappCreate';

export const Route = createFileRoute('/master/miniapp/create')({
  component: MiniappCreate,
});
