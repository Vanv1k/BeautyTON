import { createFileRoute } from '@tanstack/react-router';

import { MiniappSuccess } from '~/views/MiniappSuccess';

export const Route = createFileRoute('/master/miniapp/success')({
  component: MiniappSuccess,
});
