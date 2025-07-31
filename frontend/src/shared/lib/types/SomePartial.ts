/**
 * Сделать определённые поля объекта необязательными
 *
 * @example
 * SomePartial<{ a: number, b: string, c: boolean }, 'a'> // { a?: number, b: string, c: boolean }>
 */
export type SomePartial<T, K extends keyof T> = Omit<T, K> &
  Partial<Pick<T, K>>;
