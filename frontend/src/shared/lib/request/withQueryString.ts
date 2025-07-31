export const withQueryString = (
  path: string,
  data: Record<string, unknown> = {},
  hash?: string | null,
): string => {
  const search = new URLSearchParams(data as Record<string, string>).toString();
  const searchPart = search ? `?${search}` : '';
  const hashPart = hash ? (hash.startsWith('#') ? hash : `#${hash}`) : '';

  return `${path}${searchPart}${hashPart}`;
};
