export const getLaunchParams = () => {
  const hash = window.location.hash.slice(1);
  return hash;
};
