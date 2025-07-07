import { createFileRoute } from '@tanstack/react-router';
import { MasterDashboard } from '~/views/MasterDashboard';

export const Route = createFileRoute('/master/dashboard')({
  component: MasterDashboard,
});
