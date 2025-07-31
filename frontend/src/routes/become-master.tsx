import { createFileRoute } from '@tanstack/react-router';

import { BecomeMaster } from '~/views/BecomeMaster';

export const Route = createFileRoute('/become-master')({
  component: () => <BecomeMaster />,
});
