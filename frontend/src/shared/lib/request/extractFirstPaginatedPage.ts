import type { InfiniteData } from '@tanstack/react-query';

import type {
  PaginatedDataResponse,
  ResponsePaginatedData,
} from '~/shared/api/requestPaginatedData';
import type { PaginationEntity } from '~/shared/model';

/**
 * Из поля data результата вызова useInfiniteQuery возвращает первую страницу пагинации
 */
export const extractFirstPaginatedPage = <
  T,
  ResponseT extends PaginationEntity<T> = PaginationEntity<T>,
>(
  data: InfiniteData<ResponsePaginatedData<T, ResponseT>> | undefined | null,
): PaginatedDataResponse<T, ResponseT> | null => {
  const page = data?.pages[0];

  if (!page || page.isError) {
    return null;
  }

  return page.data;
};
