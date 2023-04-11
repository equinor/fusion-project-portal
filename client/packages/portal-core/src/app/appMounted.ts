export function shouldSuspense() {
  return !appMounted();
}

export function appMounted() {
  return location.pathname.includes('apps');
}
