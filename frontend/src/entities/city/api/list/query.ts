import { useMemo } from 'react';

import { requestCitiesList } from './request';

import { usePaginatedQuery } from '~/shared/api/query/usePaginatedQuery';
import { ENDPOINTS } from '~/shared/config/endpoints';
import { removeNullishFields } from '~/shared/lib/common/removeNullishFields';

/**
 * Список городов с бесконечной пагинацией
 */
export const useQueryCitiesList = (params: Record<string, unknown>) => {
  const preparedParams = useMemo(() => removeNullishFields(params), [params]);

  return usePaginatedQuery({
    queryKey: [ENDPOINTS.citiesList.url(), preparedParams],
    queryFn: ({ pageParam }) =>
      requestCitiesList({ pageParam, ...preparedParams }),
    staleTime: 5 * 60 * 1000, // 5 минут
  });
};
