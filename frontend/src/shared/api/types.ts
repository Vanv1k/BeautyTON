import type { InitApiConfig } from './initApi';

export type BaseResponse<D = undefined, E = undefined> =
  | {
      isError: false;
      data: D;
    }
  | {
      isError: true;
      data?: E;
    };

export type RequestFunctionInit = {
  url: string;

  /**
   * Параметры, попадающие в тело запроса в виде json
   */
  data?: Record<string, unknown> | FormData;

  /**
   * Параметры, попадающие в URL в виде квери-параметров
   */
  params?: Record<string, unknown>;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  /**
   * Конфиг для запросов к API. По умолчанию достаётся из глобальной области видимости (актуально при запросах на клиенте).
   * При запросах на сервере нужно создать и прокинуть вручную
   */
  apiConfig?: InitApiConfig;
} & Omit<RequestInit, 'method' | 'body'>;

export type FetchErrorPayload = {
  status: number;
};
