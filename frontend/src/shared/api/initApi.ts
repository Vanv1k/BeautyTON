// import { retrieveLaunchParams } from '@telegram-apps/sdk-react';

// import { bearerTokenTemplate } from '../lib/request/bearerTokenTemplate';

export enum BffHeaders {
  Authorization = 'authorization',
  Platform = 'Platform',
  ContentType = 'Content-Type',
  Accept = 'Accept',
}

// const getAuthHeader = () => {
// const { initDataRaw } = retrieveLaunchParams();
// console.log('initDataRaw', initDataRaw);

// if (initDataRaw) {
//   return bearerTokenTemplate(initDataRaw, 'telegram');
// }

//   return null;
// };

export type InitApiConfig = {
  baseUrl: string;
  baseHeaders?: Record<string, string>;
};

const DEFAULT_INIT_API_CONFIG: InitApiConfig = {
  baseUrl: '',
  baseHeaders: {},
};

/**
 * Конфигурация API. Используется для обращения к API.
 */
export const initApiConfig = DEFAULT_INIT_API_CONFIG;

export const initApi = () => {
  initApiConfig.baseUrl = 'https://bff.dev.beautyton.com';
  initApiConfig.baseHeaders = {
    [BffHeaders.Platform]: 'telegram',
  };

  // const authHeader = getAuthHeader();

  // if (authHeader) {
  //   initApiConfig.baseHeaders[BffHeaders.Authorization] = authHeader;
  // }

  // initApiConfig.baseHeaders[BffHeaders.Authorization] =
  //   'tma user=%7B%22id%22%3A1376169224%2C%22first_name%22%3A%22%D0%90%D0%B7%D0%B0%D1%82%22%2C%22last_name%22%3A%22%D0%91%D0%B8%D0%BB%D0%B0%D0%BB%D0%BE%D0%B2%22%2C%22username%22%3A%22azat_bil%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2FhvxlkryVxs6_-Q6N3Jv91gHs8_9kHISSEkCh_4-rUwM.svg%22%7D&chat_instance=3360277051526229327&chat_type=private&auth_date=1752881355&signature=kb6UbEPLltRo5_0sAjwKSsQ29AoA3vzfjYs5H8vZgfKCPoIHzruUQRiGfsTOKQ5mSrKSz_iClPvsGixo-Tj6AA&hash=90f32d6b0a4c03d5b909291141080b94ccc680f600e1816ac89b4d6048ba6b41';
};
