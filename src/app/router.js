const ROUTE_EVENT = 'pool:navigate';

export function navigate(route) {
  location.hash = route;
  window.dispatchEvent(new CustomEvent(ROUTE_EVENT, { detail: { route } }));
}

export function currentRoute() {
  return location.hash.replace(/^#\/?/, '') || 'dashboard';
}

export function onRouteChange(callback) {
  window.addEventListener('hashchange', callback);
  window.addEventListener(ROUTE_EVENT, callback);
  return () => {
    window.removeEventListener('hashchange', callback);
    window.removeEventListener(ROUTE_EVENT, callback);
  };
}