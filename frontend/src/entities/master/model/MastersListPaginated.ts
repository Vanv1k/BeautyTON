import type { z } from 'zod';

import { masterPreviewSchema } from './MasterPreview';

import { getPaginatedResponseSchema } from '~/shared/model';

export const masterListPaginatedSchema =
  getPaginatedResponseSchema(masterPreviewSchema);

export type MasterListPaginated = z.infer<typeof masterListPaginatedSchema>;

export type MasterListPaginatedApi = z.input<typeof masterListPaginatedSchema>;
