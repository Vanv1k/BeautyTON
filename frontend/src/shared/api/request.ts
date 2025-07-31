import { logError } from '../lib/log/log';
import { withQueryString } from '../lib/request/withQueryString';

import { BffHeaders, initApiConfig, type InitApiConfig } from './initApi';
import type {
  BaseResponse,
  FetchErrorPayload,
  RequestFunctionInit,
} from './types';

const prependBaseUrl = (url: string, apiConfig: InitApiConfig): string => {
  if (url.startsWith('http')) {
    return url;
  }

  if (apiConfig.baseUrl.endsWith('/') && url.startsWith('/')) {
    return `${apiConfig.baseUrl.slice(0, -1)}${url}`;
  }

  return `${apiConfig.baseUrl}${url}`;
};

const appendQueryParams = (url: string, params?: Record<string, unknown>) => {
  if (!params) {
    return url;
  }

  return withQueryString(url, params);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const request = async <R extends Record<string, any> = object>({
  method = 'GET',
  data,
  params,
  headers = {},
  url,
  apiConfig = initApiConfig,
  ...restInit
}: RequestFunctionInit): Promise<BaseResponse<R, FetchErrorPayload>> => {
  const isFormData = data instanceof FormData;

  const body = isFormData ? data : data ? JSON.stringify(data) : null;

  const preparedHeaders: Record<string, string> = {
    ...apiConfig.baseHeaders,
  };

  if (!isFormData) {
    preparedHeaders[BffHeaders.ContentType] = 'application/json';
    preparedHeaders[BffHeaders.Accept] = 'application/json';
  }

  const init: RequestInit = {
    ...restInit,
    method,
    headers: {
      ...preparedHeaders,
      ...headers,
    },
    body,
  };

  const preparedUrl = appendQueryParams(prependBaseUrl(url, apiConfig), params);

  try {
    const res = await fetch(preparedUrl, init);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const data = await res.json();

    if (res.status !== 200) {
      return {
        isError: true,
        data: {
          status: (data as { code: number }).code,
        },
      };
    }

    return {
      isError: false,
      data: data as R,
    };
  } catch (e) {
    logError('Fetch error', e);

    return {
      isError: true,
    };
  }
};
