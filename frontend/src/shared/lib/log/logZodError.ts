import type { ZodError } from 'zod';
import { fromError } from 'zod-validation-error';

import { logError } from './log';

/**
 * Показывает ошибку валидации zod в более удобочитаемом формате
 */
export const logZodError = (zodError: ZodError): void => {
  try {
    const normalized = fromError(zodError);
    logError(normalized);
  } catch (error) {
    logError({ error });
  }
};
