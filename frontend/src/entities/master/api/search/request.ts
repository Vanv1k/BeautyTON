import {
  type MasterPreviewEntity,
  type MasterPreviewEntityApi,
} from '../../model';
import { masterListPaginatedSchema } from '../../model/MastersListPaginated';

import { queryRequestPaginatedData } from '~/shared/api/queryRequestPaginatedData';
import { ENDPOINTS } from '~/shared/config/endpoints';
import { zodSafeParse } from '~/shared/lib/zod/zodSafeParser';

export const requestMastersSearch = async ({
  pageParam,
  ...rest
}: {
  pageParam: number;
} & Record<string, unknown>) => {
  return queryRequestPaginatedData<MasterPreviewEntity, MasterPreviewEntityApi>(
    {
      startPage: pageParam,
      params: rest,
      url: ENDPOINTS.mastersProfilesList.url(),
      method: ENDPOINTS.mastersProfilesList.method,
      schemaParser: (raw) => zodSafeParse(raw, masterListPaginatedSchema),
    },
  );
};
