import { useLocation, useNavigate } from '@tanstack/react-router';
import { useCallback, useMemo } from 'react';

import { masterNavItems, userNavItems } from '../model/config';

export const useNavbar = (userRole: 'user' | 'master') => {
  const navigate = useNavigate();
  const pathname = useLocation({
    select: (location) => location.pathname,
  });

  const navItems = useMemo(() => {
    return userRole === 'user' ? userNavItems : masterNavItems;
  }, [userRole]);

  const handleNavigation = useCallback(
    (path: string) => {
      navigate({ to: path });
    },
    [navigate],
  );

  const isActive = useCallback(
    (path: string) => {
      if (path === '/catalog' && pathname === '/') return true;
      return pathname === path || pathname.startsWith(path + '/');
    },
    [pathname],
  );

  return {
    navItems,
    handleNavigation,
    isActive,
  };
};
