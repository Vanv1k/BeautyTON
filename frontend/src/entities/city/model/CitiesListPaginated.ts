import type { z } from 'zod';

import { citySchema } from './City';

import { getPaginatedResponseSchema } from '~/shared/model';

export const citiesListPaginatedSchema = getPaginatedResponseSchema(citySchema);

export type CitiesListPaginated = z.infer<typeof citiesListPaginatedSchema>;

export type CitiesListPaginatedApi = z.input<typeof citiesListPaginatedSchema>;
