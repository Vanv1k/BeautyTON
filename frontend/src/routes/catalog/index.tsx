import { createFileRoute } from '@tanstack/react-router';
import { Catalog } from '~/views/Catalog';

export const Route = createFileRoute('/catalog/')({
  component: Catalog,
});
