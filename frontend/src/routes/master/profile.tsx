import { createFileRoute } from '@tanstack/react-router';

import { MasterProfile } from '~/views/MasterProfile';

export const Route = createFileRoute('/master/profile')({
  component: MasterProfile,
});
