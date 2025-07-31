import { useMemo } from 'react';

import { requestMastersSearch } from './request';

import { usePaginatedQuery } from '~/shared/api/query/usePaginatedQuery';
import { ENDPOINTS } from '~/shared/config/endpoints';
import { removeNullishFields } from '~/shared/lib/common/removeNullishFields';

/**
 * Поиск мастеров с бесконечной пагинацией
 */
export const useQueryMastersSearch = (params: Record<string, unknown>) => {
  const preparedParams = useMemo(() => removeNullishFields(params), [params]);

  return usePaginatedQuery({
    queryKey: [ENDPOINTS.mastersProfilesList.url(), preparedParams],
    queryFn: ({ pageParam }) =>
      requestMastersSearch({ pageParam, ...preparedParams }),
    staleTime: 5 * 60 * 1000, // 5 минут
  });
};
