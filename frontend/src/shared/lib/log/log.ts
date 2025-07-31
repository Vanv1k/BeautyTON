export const logError = (...error: unknown[]) => {
  // eslint-disable-next-line no-console
  console.error('Error:', error);
};

export const logMessage = (...message: unknown[]) => {
  // eslint-disable-next-line no-console
  console.log('Message:', message);
};

export const logWarning = (...warning: unknown[]) => {
  // eslint-disable-next-line no-console
  console.warn('Warning:', warning);
};
