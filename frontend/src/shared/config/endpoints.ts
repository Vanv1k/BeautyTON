const API_PREFIX = '';

export const ENDPOINTS = {
  citiesList: {
    url: () => `${API_PREFIX}/cities`,
    method: 'GET',
  },
  mastersProfilesList: {
    url: () => `${API_PREFIX}/master_profiles`,
    method: 'GET',
  },
} as const;
