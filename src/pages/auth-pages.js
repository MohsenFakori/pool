import { APP_CONFIG } from '../app/config.js';
import { button, card, field } from '../components/ui.js';
import { icon } from '../app/utils.js';

export function welcomePage() {
  return `
    <div class="mx-auto flex min-h-screen w-[390px] max-w-full flex-col items-center justify-center bg-app-bg px-6 text-center">
      <div class="mb-8 grid size-28 place-items-center rounded-[2rem] bg-gradient-to-br from-primary to-secondary text-6xl text-white shadow-xl">${icon('wallet')}</div>
      <p class="font-display text-4xl text-primary">به پول خوش آمدی!</p>
      <p class="mt-3 max-w-xs text-sm leading-7 text-muted">مدیریت درآمدها، هزینه‌ها و اهداف مالی؛ ساده‌تر و شفاف‌تر از همیشه.</p>
      <div class="mt-10 w-full">${button('شروع کنیم', { attrs: 'id="welcome-continue" class="w-full ' + 'inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl bg-gradient-to-l from-primary to-secondary px-5 font-display text-white shadow-[0_4px_0_rgba(0,0,0,0.18)] transition active:translate-y-0.5' })}</div>
    </div>`;
}

export function loginPage() {
  return `
    <div class="mx-auto flex min-h-screen w-[390px] max-w-full flex-col justify-center bg-app-bg px-5 py-10">
      <div class="mb-7 text-center"><div class="mx-auto mb-4 grid size-20 place-items-center rounded-3xl bg-gradient-to-br from-primary to-secondary text-4xl text-white">${icon('wallet')}</div><h1 class="font-display text-3xl text-primary">ورود به پول</h1><p class="mt-2 text-sm text-muted">برای ادامه وارد حساب خودت شو</p></div>
      ${card(`
        <form id="login-form" class="space-y-4">
          ${field({ label: 'نام کاربری', name: 'username', placeholder: 'نام کاربری خود را وارد کنید' })}
          ${field({ label: 'رمز عبور', name: 'password', type: 'password', placeholder: 'رمز عبور' })}
          <div class="rounded-xl border border-line bg-app-bg p-3 text-xs leading-6 text-muted">رمز پیش‌فرض این نسخه آزمایشی: <strong class="font-bold text-primary">${APP_CONFIG.defaultPassword}</strong></div>
          <p id="auth-error" class="hidden rounded-xl bg-negative/10 p-3 text-sm text-negative"></p>
          ${button('ورود به حساب', { type: 'submit', attrs: 'class="w-full inline-flex min-h-11 items-center justify-center rounded-2xl bg-gradient-to-l from-primary to-secondary px-5 font-display text-white shadow-[0_4px_0_rgba(0,0,0,0.18)]"' })}
        </form>
        <div class="mt-4 text-center text-sm text-muted">حساب کاربری نداری؟ <button id="go-register" class="font-bold text-primary">ثبت‌نام کن</button></div>
      `)}
    </div>`;
}

export function registerPage() {
  return `
    <div class="mx-auto flex min-h-screen w-[390px] max-w-full flex-col justify-center bg-app-bg px-5 py-10">
      <div class="mb-7 text-center"><h1 class="font-display text-3xl text-primary">ساخت حساب کاربری</h1><p class="mt-2 text-sm text-muted">برای شروع فقط یک نام کاربری انتخاب کن</p></div>
      ${card(`
        <form id="register-form" class="space-y-4">
          ${field({ label: 'نام کاربری', name: 'username', placeholder: 'مثلاً mohsen' })}
          <div class="rounded-xl border border-line bg-app-bg p-3 text-xs leading-6 text-muted">رمز عبور به‌صورت خودکار روی <strong class="text-primary">${APP_CONFIG.defaultPassword}</strong> تنظیم می‌شود.</div>
          <p id="auth-error" class="hidden rounded-xl bg-negative/10 p-3 text-sm text-negative"></p>
          ${button('ایجاد حساب', { type: 'submit', attrs: 'class="w-full inline-flex min-h-11 items-center justify-center rounded-2xl bg-gradient-to-l from-primary to-secondary px-5 font-display text-white"' })}
        </form>
        <div class="mt-4 text-center text-sm text-muted">قبلاً ثبت‌نام کرده‌ای؟ <button id="go-login" class="font-bold text-primary">ورود</button></div>
      `)}
    </div>`;
}