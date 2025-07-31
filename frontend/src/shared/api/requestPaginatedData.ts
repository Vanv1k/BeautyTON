import type { SafeParseReturnType } from 'zod';

import type { PaginationEntity } from '../model';

import { request } from './request';
import type {
  BaseResponse,
  FetchErrorPayload,
  RequestFunctionInit,
} from './types';

import { PAGINATION_FIRST_PAGE_INDEX } from '~/shared/config/api';

export type RequestPaginatedDataParams<
  T,
  TApi,
  ResponseT extends PaginationEntity<T> = PaginationEntity<T>,
  ResponseTApi extends PaginationEntity<TApi> = PaginationEntity<TApi>,
> = {
  schemaParser: (
    raw: ResponseTApi,
  ) => SafeParseReturnType<ResponseTApi, ResponseT>;
  responseEntry?: string | null;
  pageLimit?: number;
  startPage?: number;
} & RequestFunctionInit;

/**
 * Разделение на два дженерика T и ResponseT необходимо для того, чтобы при использовании
 * функции requestPaginatedData TypeScript мог определить, что внутри возвращаемых данных в поле results
 * лежат именно объекты типа T, а не какого-то другого типа
 */
export type PaginatedDataResponse<
  T,
  ResponseT extends PaginationEntity<T> = PaginationEntity<T>,
> = {
  paginationEntity: ResponseT;
  extra: { responseEntry: string | null };
};

export type ResponsePaginatedData<
  T,
  ResponseT extends PaginationEntity<T> = PaginationEntity<T>,
> = BaseResponse<PaginatedDataResponse<T, ResponseT>, FetchErrorPayload>;

/**
 * - T — тип сущностей, после того, как они преобразовываются из данных с бэка.
 * - TApi — тип сущностей, который ожидаем с бэка.
 * - ResponseT и ResponseTApi нужны для описания полного формата ответа в случае,
 *   если в нем есть дополнительные поля, выходящие за рамки типа PaginationEntity
 */
export const requestPaginatedData = async <
  T,
  TApi,
  ResponseT extends PaginationEntity<T> = PaginationEntity<T>,
  ResponseTApi extends PaginationEntity<TApi> = PaginationEntity<TApi>,
>({
  url,
  params,
  schemaParser,
  responseEntry,
  pageLimit,
  startPage,
  ...init
}: RequestPaginatedDataParams<T, TApi, ResponseT, ResponseTApi>): Promise<
  ResponsePaginatedData<T, ResponseT>
> => {
  const START_PAGE = startPage ?? PAGINATION_FIRST_PAGE_INDEX;
  const PAGE_SIZE = pageLimit ?? 10;

  const response = await request<ResponseTApi>({
    url,
    params: {
      page: START_PAGE,
      page_size: PAGE_SIZE,
      ...params,
    },
    ...init,
  });

  if (response.isError) {
    return response;
  }

  const parsedResponse = schemaParser(response.data);

  if (parsedResponse.success) {
    return {
      isError: false,
      data: {
        paginationEntity: parsedResponse.data,
        extra: {
          responseEntry: responseEntry ?? null,
        },
      },
    };
  }

  return {
    isError: true,
  };
};
