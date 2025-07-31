import type {
  ZodTypeAny,
  input as ZodInput,
  infer as ZodInfer,
  SafeParseReturnType,
} from 'zod';

import { logZodError } from '../log/logZodError';

/**
 * Обертка над методом safeParse из 'zod', добавляющая логирование ошибки парсинга
 */
export const zodSafeParse = <T extends ZodTypeAny>(
  data: ZodInput<T>,
  scheme: T,
): SafeParseReturnType<ZodInput<T>, ZodInfer<T>> => {
  const parsed = scheme.safeParse(data);

  if (!parsed.success) {
    logZodError(parsed.error);
  }

  return parsed;
};
