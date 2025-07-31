export const bearerTokenTemplate = (
  token: string,
  type: 'telegram' | 'web',
): string => {
  if (type === 'telegram') {
    return `tma ${token}`;
  }

  return `Bearer ${token}`;
};
