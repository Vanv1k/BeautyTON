import { useLocation } from '@tanstack/react-router';
import { useMemo } from 'react';

import { NAVBAR_VISIBILITY_CONFIG } from '../model';

export const useNavbarVisibility = () => {
  const { pathname } = useLocation() as { pathname: string };

  return useMemo(() => {
    // Проверяем точное совпадение
    if (NAVBAR_VISIBILITY_CONFIG.EXCLUDED_PATHS.includes(pathname)) {
      return false;
    }

    // Проверяем, начинается ли путь с определенных префиксов (для вложенных роутов)
    return !NAVBAR_VISIBILITY_CONFIG.EXCLUDED_PREFIXES.some((prefix) =>
      pathname.startsWith(prefix),
    );
  }, [pathname]);
};
