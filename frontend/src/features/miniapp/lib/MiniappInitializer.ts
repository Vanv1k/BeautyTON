import { useCanGoBack, useRouter } from '@tanstack/react-router';
import {
  backButton,
  setDebug,
  useLaunchParams,
} from '@telegram-apps/sdk-react';
import { useEffect } from 'react';

export const MiniappInitializer = () => {
  const router = useRouter();
  const canGoBack = useCanGoBack();

  const launchParams = useLaunchParams();

  useEffect(() => {
    setDebug(true);

    if (backButton.isSupported()) {
      backButton.onClick(() => {
        router.history.back();
      });
    }

    // eslint-disable-next-line no-console
    console.log(launchParams);
  }, [launchParams, router.history]);

  useEffect(() => {
    if (canGoBack) {
      backButton.show();
    } else {
      backButton.hide();
    }
  }, [canGoBack]);

  return null;
};
