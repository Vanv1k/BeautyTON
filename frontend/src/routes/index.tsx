import { createFileRoute } from '@tanstack/react-router';
import { RoleSelection } from '~/views/RoleSelection';

export const Route = createFileRoute('/')({
  component: () => <RoleSelection />,
});
