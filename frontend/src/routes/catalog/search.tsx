import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';

import CatalogSearch from '~/views/CatalogSearch/CatalogSearch';

const catalogSearchSchema = z.object({
  q: z.string().optional(),
  category: z.string().optional(),
  city: z.string().optional(),
  priceFrom: z.number().optional(),
  priceTo: z.number().optional(),
  rating: z.number().min(1).max(5).optional(),
  lookingForModels: z.boolean().optional(),
  sortBy: z.enum(['rating', 'price_asc', 'price_desc']).optional(),
  favorites: z.boolean().optional(),
});

export const Route = createFileRoute('/catalog/search')({
  component: CatalogSearch,
  validateSearch: (search) => catalogSearchSchema.parse(search),
});
