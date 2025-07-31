/**
 * @example
 * const a: { a: number | null; b: string | null | undefined; c: null | undefined } = { a: 1, b: null };
 *
 * const b = removeNullishFields(a); // Результат: { a: 1 }, Тип: { a?: number, b?: string, c?: never }
 */
export const removeNullishFields = <
  T extends Record<string | number | symbol, unknown>,
>(
  entity: Partial<T>,
): {
  [K in keyof T]?: Exclude<T[K], null>;
} => {
  // @ts-expect-error Object.entries не типизирован
  return Object.fromEntries(
    Object.entries(entity).filter(
      ([, value]) => value !== null && value !== undefined,
    ),
  );
};
