import { ResponseStatus } from '~/shared/config/responseStatus';

export class ErrorNotFound extends Error {}

export const generateResponseError = ({
  status,
  endpoint,
}: {
  status?: number;
  endpoint?: string;
}) => {
  if (status === ResponseStatus.s404) {
    return new ErrorNotFound(
      `Resource not found at ${endpoint} with status ${status}`,
    );
  }

  return new Error(
    `Error occurred at ${endpoint} with status ${status ?? 'unknown'}`,
  );
};
