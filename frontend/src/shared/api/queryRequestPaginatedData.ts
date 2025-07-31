import {
  requestPaginatedData,
  type RequestPaginatedDataParams,
} from './requestPaginatedData';

import { generateResponseError } from '~/shared/lib/request/generateResponseError';
import type { PaginationEntity } from '~/shared/model/pagination';

export const queryRequestPaginatedData = async <
  T,
  TApi,
  ResponseT extends PaginationEntity<T> = PaginationEntity<T>,
  ResponseTApi extends PaginationEntity<TApi> = PaginationEntity<TApi>,
>(
  params: RequestPaginatedDataParams<T, TApi, ResponseT, ResponseTApi>,
) => {
  const response = await requestPaginatedData<T, TApi, ResponseT, ResponseTApi>(
    params,
  );

  if (response.isError) {
    throw generateResponseError({
      status: response.data?.status,
      endpoint: params.url,
    });
  }

  return response;
};
