import type { InfiniteData } from '@tanstack/react-query';

import type { ResponsePaginatedData } from '~/shared/api/requestPaginatedData';
import type { PaginationEntity } from '~/shared/model';

/**
 * Приводит постраничный вывод useInfiniteQuery в массив
 */
export const flatPaginatedDataPages = <
  T,
  ResponseT extends PaginationEntity<T> = PaginationEntity<T>,
>(
  data: InfiniteData<ResponsePaginatedData<T, ResponseT>> | undefined | null,
): T[] =>
  data?.pages
    .map((page) => (page.isError ? [] : page.data.paginationEntity.results))
    .flat() ?? [];
