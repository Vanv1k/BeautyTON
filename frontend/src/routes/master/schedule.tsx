import { createFileRoute } from '@tanstack/react-router';

import MasterSchedule, {
  masterScheduleSearchSchema,
} from '~/views/MasterSchedule';

export const Route = createFileRoute('/master/schedule')({
  validateSearch: (search) => masterScheduleSearchSchema.parse(search),
  component: MasterSchedule,
});
