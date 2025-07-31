import {
  Home,
  Search,
  Calendar,
  User,
  Settings,
  Sparkles,
  Heart,
} from 'lucide-react';

import type { NavItem } from './types';

export const userNavItems: NavItem[] = [
  {
    key: 'catalog',
    icon: Home,
    label: 'Home',
    path: '/catalog',
  },
  {
    key: 'search',
    icon: Search,
    label: 'Search',
    path: '/catalog/search',
  },
  {
    key: 'spark',
    icon: Sparkles,
    label: 'Spark',
    path: '/become-master',
    isSpecial: true,
  },
  {
    key: 'favorites',
    icon: Heart,
    label: 'Favorites',
    path: '/favorites', // TODO: создать роут для избранного
  },
  {
    key: 'profile',
    icon: User,
    label: 'Profile',
    path: '/profile', // TODO: создать роут для профиля пользователя
  },
];

export const masterNavItems: NavItem[] = [
  {
    key: 'dashboard',
    icon: Home,
    label: 'Dashboard',
    path: '/master/dashboard',
  },
  {
    key: 'search',
    icon: Search,
    label: 'Search',
    path: '/catalog/search',
  },
  {
    key: 'schedule',
    icon: Calendar,
    label: 'Schedule',
    path: '/master/schedule',
  },
  {
    key: 'profile',
    icon: User,
    label: 'Profile',
    path: '/master/profile',
  },
  {
    key: 'settings',
    icon: Settings,
    label: 'Settings',
    path: '/master/settings', // TODO: создать роут для настроек мастера
  },
];

/**
 * Роуты видимости навигационной панели
 */
export const NAVBAR_VISIBILITY_ROUTES = {
  // Страницы, где navbar НЕ должен показываться (точное совпадение)
  EXCLUDED_PATHS: [
    '/', // RoleSelection
    '/is-not-miniapp',
    '/master/onboarding',
    '/become-master', // BecomeMaster страница
  ],

  // Префиксы путей, где navbar НЕ должен показываться
  EXCLUDED_PREFIXES: ['/master/miniapp'],
};
