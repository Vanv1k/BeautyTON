import * as React from 'react';

import type { ResponsePaginatedData } from '~/shared/api/requestPaginatedData';

export const useInfiniteQueryPageExtractor = () => {
  const getPreviousPageParam = React.useCallback(
    (response: ResponsePaginatedData<unknown>) =>
      response.isError ? null : response.data.paginationEntity.page,
    [],
  );

  const getNextPageParam = React.useCallback(
    (response: ResponsePaginatedData<unknown>) =>
      response.isError ? null : response.data.paginationEntity.page + 1,
    [],
  );

  return {
    getPreviousPageParam,
    getNextPageParam,
  };
};
