// Calendar configuration
export const DAYS_OF_WEEK = [
  'Mon',
  'Tue',
  'Wed',
  'Thu',
  'Fri',
  'Sat',
  'Sun',
] as const;

export const DAY_STATUS_COLORS = {
  free: 'bg-green-100 text-green-600 border-green-200',
  light: 'bg-yellow-100 text-yellow-600 border-yellow-200',
  heavy: 'bg-red-100 text-red-600 border-red-200',
  inactive: 'bg-gray-100 text-gray-400 border-gray-200',
} as const;

// Time picker configuration
export const TIME_SLOTS_PER_PAGE = 14; // Show 14 hours (8:00 - 22:00)

// Animation durations
export const MODAL_ANIMATION_DURATION = 300;

export const SLOT_HOVER_ANIMATION_DURATION = 150;
