const DEV_HOSTS = ['localhost', 'pinggy.link', 'dev.miniapp.beautyton.com'];

export const IS_DEV_DOMAIN = DEV_HOSTS.some((host) =>
  window.location.hostname.includes(host),
);

export const IS_TG_MINIAPP = window.Telegram && window.Telegram.WebApp;
