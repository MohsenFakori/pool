import { APP_CONFIG } from '../app/config.js';
import { icon, escapeHtml } from '../app/utils.js';
import { navigate } from '../app/router.js';

export function renderShell({ user, profile, route, content }) {
  const active = APP_CONFIG.navigation.bottom.some(item => item.route === route) ? route : 'dashboard';
  const bottom = APP_CONFIG.navigation.bottom.map(item => `
    <button data-route="${item.route}" class="flex min-w-0 flex-1 flex-col items-center gap-1 rounded-xl py-2 text-xs transition ${active === item.route ? 'text-primary' : 'text-muted'}">
      ${icon(item.icon, 'text-2xl')}
      <span>${item.label}</span>
    </button>`).join('');

  const drawer = APP_CONFIG.navigation.drawer.map(item => `
    <button data-route="${item.route}" class="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-right text-sm transition hover:bg-primary/10">
      ${icon(item.icon, 'text-xl text-primary')}<span>${item.label}</span>
    </button>`).join('');

  return `
    <div class="relative mx-auto min-h-screen w-[390px] max-w-full overflow-hidden bg-app-bg pb-24 shadow-2xl">
      <header class="sticky top-0 z-20 flex h-16 items-center gap-3 border-b-2 border-line bg-app-bg/90 px-4 backdrop-blur">
        <button id="drawer-open" aria-label="باز کردن منو" class="grid size-11 place-items-center rounded-xl text-2xl text-app-text hover:bg-primary/10">${icon('list')}</button>
        <div class="flex-1">
          <p class="font-display text-xl text-primary">${APP_CONFIG.name}</p>
        </div>
        <button data-route="profile" class="flex items-center gap-2 rounded-full p-1.5 text-right hover:bg-primary/10">
          <span class="grid size-10 place-items-center rounded-full bg-gradient-to-br from-primary to-secondary text-xl text-white">${icon(profile?.avatar || 'user-circle')}</span>
          <span class="max-w-24 truncate text-sm font-bold">${escapeHtml(profile?.displayName || user.username)}</span>
        </button>
      </header>

      <main class="px-4 py-5">${content}</main>

      <nav class="fixed inset-x-0 bottom-0 z-30 mx-auto flex h-[76px] w-[390px] max-w-full items-center justify-around border-t-2 border-line bg-surface px-2 pb-2 shadow-[0_-8px_24px_rgba(30,27,75,0.06)]">
        ${bottom}
      </nav>

      <div id="drawer-backdrop" class="absolute inset-0 z-40 hidden bg-app-text/50"></div>
      <aside id="drawer-panel" class="absolute inset-y-0 right-0 z-50 hidden w-[82%] max-w-[320px] flex-col bg-surface p-4 shadow-2xl">
        <div class="mb-6 flex items-center justify-between border-b border-line pb-4">
          <div><p class="font-display text-2xl text-primary">پول</p><p class="text-xs text-muted">مدیریت مالی شخصی</p></div>
          <button id="drawer-close" aria-label="بستن منو" class="grid size-10 place-items-center rounded-xl text-xl hover:bg-primary/10">${icon('x')}</button>
        </div>
        <div class="mb-5 flex items-center gap-3 rounded-2xl bg-app-bg p-3">
          <span class="grid size-12 place-items-center rounded-full bg-gradient-to-br from-primary to-secondary text-2xl text-white">${icon(profile?.avatar || 'user-circle')}</span>
          <div class="min-w-0"><p class="truncate font-bold">${escapeHtml(profile?.displayName || user.username)}</p><p class="text-xs text-muted">حساب کاربری</p></div>
        </div>
        <nav class="flex-1 space-y-1 overflow-y-auto">${drawer}</nav>
        <button data-route="profile" class="mt-3 flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-muted hover:bg-primary/10">${icon('user-circle')} پروفایل کاربری</button>
      </aside>
    </div>`;
}

export function bindShellEvents(root) {
  const open = () => {
    root.querySelector('#drawer-backdrop')?.classList.remove('hidden');
    root.querySelector('#drawer-panel')?.classList.remove('hidden');
    root.querySelector('#drawer-panel')?.classList.add('flex');
  };
  const close = () => {
    root.querySelector('#drawer-backdrop')?.classList.add('hidden');
    root.querySelector('#drawer-panel')?.classList.add('hidden');
    root.querySelector('#drawer-panel')?.classList.remove('flex');
  };
  root.querySelector('#drawer-open')?.addEventListener('click', open);
  root.querySelector('#drawer-close')?.addEventListener('click', close);
  root.querySelector('#drawer-backdrop')?.addEventListener('click', close);
  root.querySelectorAll('[data-route]').forEach(element => element.addEventListener('click', () => {
    close();
    navigate(element.dataset.route);
  }));
}