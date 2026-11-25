import { APP_CONFIG } from '../app/config.js';
import { escapeHtml, icon } from '../app/utils.js';
import { button, card, field, pageTitle } from '../components/ui.js';

export function profilePage({ user, profile }) {
  const avatars = APP_CONFIG.avatarOptions.map(name => `
    <button type="button" data-avatar="${name}" aria-label="انتخاب آواتار ${name}" class="grid size-12 place-items-center rounded-2xl border-2 ${profile?.avatar === name ? 'border-primary bg-primary/10 text-primary' : 'border-line bg-surface text-muted'} text-2xl">${icon(name)}</button>
  `).join('');

  return pageTitle('پروفایل کاربری', 'اطلاعات حساب و تنظیمات شخصی') + card(`
    <form id="profile-form" class="space-y-4">
      <div class="flex flex-col items-center gap-3"><div id="selected-avatar" class="grid size-20 place-items-center rounded-full bg-gradient-to-br from-primary to-secondary text-4xl text-white">${icon(profile?.avatar || 'user-circle')}</div><p class="text-sm font-bold">انتخاب آواتار</p><div class="flex flex-wrap justify-center gap-2">${avatars}</div></div>
      ${field({ label: 'نام نمایشی', name: 'displayName', value: profile?.displayName || user.username })}
      <div><span class="mb-2 block text-sm font-medium">نام کاربری</span><div class="rounded-xl bg-app-bg px-4 py-3 text-sm text-muted" dir="ltr">${escapeHtml(user.username)}</div><p class="mt-1 text-xs text-muted">نام کاربری در این نسخه قابل تغییر نیست.</p></div>
      <p id="profile-message" class="hidden rounded-xl bg-positive/10 p-3 text-sm text-positive"></p>
      ${button('ذخیره تغییرات', { type: 'submit', attrs: 'class="w-full inline-flex min-h-11 items-center justify-center rounded-2xl bg-gradient-to-l from-primary to-secondary px-5 font-display text-white"' })}
    </form>
    <div class="mt-5 border-t border-line pt-4"><button id="logout-button" class="flex w-full items-center justify-center gap-2 rounded-xl bg-negative/10 px-4 py-3 font-bold text-negative">${icon('sign-out')} خروج از حساب کاربری</button></div>
  `);
}