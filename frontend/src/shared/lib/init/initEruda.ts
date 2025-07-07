import { IS_DEV_DOMAIN } from '~/shared/config/general';

export const initEruda = () => {
  if (IS_DEV_DOMAIN) {
    import('eruda').then((eruda) => {
      eruda.default.init();
    });
  }
};
