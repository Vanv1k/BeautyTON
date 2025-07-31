import { z } from 'zod';

/**
 * Универсальная схема для пагинированного ответа API
 */
export const getPaginatedResponseSchema = <T extends z.ZodTypeAny>(
  itemSchema: T,
) =>
  z.object({
    results: z.array(itemSchema),
    page: z.number(),
    page_size: z.number(),
    total: z.number(),
    total_pages: z.number(),
  });

export type PaginationEntity<T> = {
  results: T[];
  page: number;
  page_size: number;
  total: number;
  total_pages: number;
};
