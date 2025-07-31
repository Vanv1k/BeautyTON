import type { InfiniteData } from '@tanstack/react-query';
import { useMemo } from 'react';

import type { ResponsePaginatedData } from '../requestPaginatedData';

import { flatPaginatedDataPages } from '~/shared/lib/request/flatPaginatedDataPages';
import type { PaginationEntity } from '~/shared/model';

export const useFlatPaginatedDataPages = <
  T,
  ResponseT extends PaginationEntity<T>,
>(
  data: InfiniteData<ResponsePaginatedData<T, ResponseT>> | undefined | null,
) => useMemo<T[]>(() => flatPaginatedDataPages<T, ResponseT>(data), [data]);
