export type NavItemKey =
  | 'catalog'
  | 'search'
  | 'spark'
  | 'favorites'
  | 'profile'
  | 'dashboard'
  | 'schedule'
  | 'settings';

export type UserRole = 'user' | 'master';

export type NavItem = {
  key: NavItemKey;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  path: string;
  isSpecial?: boolean;
};
