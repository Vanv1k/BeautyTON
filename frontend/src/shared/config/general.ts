const DEV_HOSTS = ['localhost', 'pinggy.link', 'dev.miniapp.beautyton.com'];

export const IS_DEV_DOMAIN = DEV_HOSTS.some((host) =>
  window.location.hostname.includes(host),
);

export const IS_TG_MINIAPP = (() => {
  const hash = window.location.hash.slice(1);
  const params = new URLSearchParams(hash);
  return Boolean(params.get('tgWebAppVersion'));
})();
