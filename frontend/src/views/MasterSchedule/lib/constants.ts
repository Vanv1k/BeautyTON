// Schedule constants
export const SLOT_INTERVAL = 1; // 1 hour

export const WORK_START_HOUR = 8;

export const WORK_END_HOUR = 22;

// Service options for booking creation
export const SERVICE_OPTIONS = [
  'Manicure',
  'Pedicure',
  'Hair Cut',
  'Hair Color',
  'Hair Styling',
  'Facial',
  'Massage',
  'Eyebrow Shaping',
  'Eyelash Extension',
  'Makeup',
] as const;

// Mock data for demo
export const MOCK_CLIENT_NAMES = [
  'Anna K.',
  'Maria S.',
  'Elena P.',
  'Sofia M.',
] as const;

export const MOCK_TELEGRAM_HANDLES = [
  'anna_k',
  'maria_s',
  'elena_p',
  'sofia_m',
] as const;

export const MOCK_SERVICES = [
  'Manicure',
  'Hair Cut',
  'Hair Color',
  'Facial',
] as const;
