import { createFileRoute } from '@tanstack/react-router';
import { MasterOnboarding } from '~/views/MasterOnboarding';

export const Route = createFileRoute('/master/onboarding')({
  component: MasterOnboarding,
});
