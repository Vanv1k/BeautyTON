import type { CityEntity, CityEntityApi } from '../../model';
import { citiesListPaginatedSchema } from '../../model';

import { queryRequestPaginatedData } from '~/shared/api/queryRequestPaginatedData';
import { ENDPOINTS } from '~/shared/config/endpoints';
import { zodSafeParse } from '~/shared/lib/zod/zodSafeParser';

export const requestCitiesList = async ({
  pageParam,
  ...rest
}: {
  pageParam: number;
} & Record<string, unknown>) => {
  return queryRequestPaginatedData<CityEntity, CityEntityApi>({
    startPage: pageParam,
    params: rest,
    url: ENDPOINTS.citiesList.url(),
    method: ENDPOINTS.citiesList.method,
    schemaParser: (raw) => zodSafeParse(raw, citiesListPaginatedSchema),
  });
};
