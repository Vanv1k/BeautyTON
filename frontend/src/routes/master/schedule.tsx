import { createFileRoute } from '@tanstack/react-router';

import MasterSchedule from '~/views/MasterSchedule';

export const Route = createFileRoute('/master/schedule')({
  component: MasterSchedule,
});
