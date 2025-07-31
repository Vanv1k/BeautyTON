import type {
  DefaultError,
  InfiniteData,
  QueryKey,
  UndefinedInitialDataInfiniteOptions,
  UseInfiniteQueryResult,
} from '@tanstack/react-query';
import { useInfiniteQuery } from '@tanstack/react-query';

import { useFlatPaginatedDataPages } from './useFlatPaginatedDataPages';
import { useInfiniteQueryPageExtractor } from './useInfiniteQueryPageExtractor';

import type {
  PaginatedDataResponse,
  ResponsePaginatedData,
} from '~/shared/api/requestPaginatedData';
import { PAGINATION_FIRST_PAGE_INDEX } from '~/shared/config/api';
import { extractFirstPaginatedPage } from '~/shared/lib/request/extractFirstPaginatedPage';
import type { SomePartial } from '~/shared/lib/types/SomePartial';
import type { PaginationEntity } from '~/shared/model';

export type PaginatedQueryEffectParams<T> = { lastPage: T[] };

export type PaginatedQueryParams<
  T,
  ResponseT extends PaginationEntity<T> = PaginationEntity<T>,
> = SomePartial<
  UndefinedInitialDataInfiniteOptions<
    ResponsePaginatedData<T, ResponseT>,
    DefaultError,
    InfiniteData<ResponsePaginatedData<T, ResponseT>, number>,
    QueryKey,
    number
  >,
  'getPreviousPageParam' | 'getNextPageParam' | 'initialPageParam'
> & {
  /**
   * В комбинации с react virtuoso может быть лишний фетч следующей страницы. Параметр решает проблему.
   * Действует лишь по отношению к функции-обёртке fetchNextPageDecorated и не вызывает fetchNextPage при первом рендере
   */
  skipFetchOnFirstRender?: boolean;
};

export type PaginatedQueryResult<
  T,
  ResponseT extends PaginationEntity<T> = PaginationEntity<T>,
> = UseInfiniteQueryResult<
  InfiniteData<ResponsePaginatedData<T, ResponseT>>
> & {
  flatData: T[];
  firstPage: PaginatedDataResponse<T, ResponseT> | null;
  total: number;
  isEmpty: boolean;
  cannotFetchNextPage: boolean;
};

export const usePaginatedQuery = <
  T,
  ResponseT extends PaginationEntity<T> = PaginationEntity<T>,
>(
  queryInit: PaginatedQueryParams<T, ResponseT>,
): PaginatedQueryResult<T, ResponseT> => {
  const { getPreviousPageParam, getNextPageParam } =
    useInfiniteQueryPageExtractor();

  const query = useInfiniteQuery<
    ResponsePaginatedData<T, ResponseT>,
    DefaultError,
    InfiniteData<ResponsePaginatedData<T, ResponseT>, number>,
    QueryKey,
    number
  >({
    ...queryInit,
    queryKey: queryInit.queryKey,
    queryFn: queryInit.queryFn,
    initialPageParam: queryInit.initialPageParam ?? PAGINATION_FIRST_PAGE_INDEX,
    getPreviousPageParam:
      queryInit.getPreviousPageParam ?? getPreviousPageParam,
    getNextPageParam: queryInit.getNextPageParam ?? getNextPageParam,
  });

  const flatData = useFlatPaginatedDataPages<T, ResponseT>(query.data);

  const firstPage = extractFirstPaginatedPage(query.data);

  return {
    ...query,
    flatData,
    firstPage,
    isEmpty: !flatData.length && query.isSuccess,
    cannotFetchNextPage: !query.hasNextPage && query.isSuccess,
    total: firstPage?.paginationEntity.total ?? 0,
  };
};
