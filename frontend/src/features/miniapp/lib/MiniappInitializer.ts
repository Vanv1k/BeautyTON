import { useCanGoBack, useRouter } from '@tanstack/react-router';
import {
  backButton,
  setDebug,
  useLaunchParams,
  themeParamsBackgroundColor,
} from '@telegram-apps/sdk-react';
import { useEffect } from 'react';

import { useTheme } from '~/entities/theme';
import { isDarkColor } from '~/shared/lib/color/isDarkColor';

export const MiniappInitializer = () => {
  const router = useRouter();
  const canGoBack = useCanGoBack();

  const { setTheme } = useTheme();

  const launchParams = useLaunchParams();
  const backgroundColor = themeParamsBackgroundColor();

  useEffect(() => {
    setDebug(true);

    if (backButton.isSupported()) {
      backButton.onClick(() => {
        router.history.back();
      });
    }

    if (backgroundColor) {
      const isDark = isDarkColor(backgroundColor);
      setTheme(isDark ? 'dark' : 'light');
    }
  }, [backgroundColor, launchParams, router.history, setTheme]);

  useEffect(() => {
    if (canGoBack) {
      backButton.show();
    } else {
      backButton.hide();
    }
  }, [canGoBack]);

  return null;
};
