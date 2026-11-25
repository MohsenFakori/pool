import { DASHBOARD_FIXTURE as data } from '../data/demo-data.js';
import { formatMoney, formatNumber, icon, todayLabel, escapeHtml } from '../app/utils.js';
import { button, card, pageTitle } from '../components/ui.js';

const progressWidth = value => {
  const widths = ['w-[0%]', 'w-[10%]', 'w-[20%]', 'w-[30%]', 'w-[40%]', 'w-[50%]', 'w-[60%]', 'w-[70%]', 'w-[80%]', 'w-[90%]', 'w-full'];
  return widths[Math.min(10, Math.max(0, Math.round(value / 10)))];
};

function transactionList(items) {
  return items.map(item => `
    <div class="flex items-center gap-3 border-b border-line py-3 last:border-0">
      <span class="grid size-11 place-items-center rounded-2xl ${item.direction === 'income' ? 'bg-positive/10 text-positive' : 'bg-cta/10 text-cta'}">${icon(item.icon, 'text-xl')}</span>
      <div class="min-w-0 flex-1"><p class="truncate text-sm font-bold">${escapeHtml(item.title)}</p><p class="text-xs text-muted">${escapeHtml(item.category)} · ${escapeHtml(item.date)}</p></div>
      <p class="text-sm font-bold ${item.direction === 'income' ? 'text-positive' : 'text-app-text'}">${item.direction === 'income' ? '+' : '−'}${formatNumber(item.amount)}</p>
    </div>`).join('');
}

export function dashboardPage({ user, profile }) {
  const budgetTotal = data.budgets.reduce((sum, item) => sum + item.limit, 0);
  const budgetSpent = data.budgets.reduce((sum, item) => sum + item.spent, 0);
  const budgetPercent = budgetTotal ? budgetSpent / budgetTotal * 100 : 0;
  return `
    <div class="mb-5"><p class="text-sm text-muted">${todayLabel()}</p><h1 class="mt-1 font-display text-2xl">سلام ${escapeHtml(profile?.displayName || user.username)} 👋</h1><p class="text-sm text-muted">وضعیت مالی امروزت رو اینجا ببین.</p></div>
    <section class="rounded-card bg-gradient-to-br from-primary to-secondary p-5 text-white shadow-lg">
      <div class="flex items-center justify-between"><span class="text-sm text-white/80">موجودی کل</span><span class="rounded-full bg-white/20 px-3 py-1 text-xs text-white">نمای کلی</span></div>
      <p class="mt-3 font-display text-3xl">${formatMoney(data.balance)}</p>
      <div class="mt-5 grid grid-cols-2 gap-3">
        <div class="rounded-xl bg-white/15 p-3"><p class="text-xs text-white/75">درآمد این ماه</p><p class="mt-1 font-bold">${formatMoney(data.income)}</p></div>
        <div class="rounded-xl bg-white/15 p-3"><p class="text-xs text-white/75">هزینه این ماه</p><p class="mt-1 font-bold">${formatMoney(data.expense)}</p></div>
      </div>
    </section>
    <div class="mb-3 mt-6 flex items-center justify-between"><h2 class="font-display text-xl">دسترسی سریع</h2><span class="text-xs text-muted">میانبرها</span></div>
    <div class="grid grid-cols-4 gap-2">
      ${[['plus-circle','ثبت هزینه','transactions'],['wallet','حساب‌ها','accounts'],['chart-line','گزارش‌ها','reports'],['target','اهداف','goals']].map(([icn,label,route]) => `<button data-route="${route}" class="flex flex-col items-center gap-2 rounded-2xl border-2 border-line bg-surface p-3 text-primary"><span class="text-2xl">${icon(icn)}</span><span class="text-[11px] text-app-text">${label}</span></button>`).join('')}
    </div>
    <div class="mb-3 mt-6 flex items-center justify-between"><h2 class="font-display text-xl">آخرین تراکنش‌ها</h2><button data-route="transactions" class="text-xs font-bold text-primary">مشاهده همه</button></div>
    ${card(transactionList(data.transactions))}
    <div class="mb-3 mt-6 flex items-center justify-between"><h2 class="font-display text-xl">وضعیت بودجه</h2><button data-route="budgets" class="text-xs font-bold text-primary">جزئیات</button></div>
    ${card(`
      <div class="mb-2 flex justify-between text-sm"><span class="text-muted">مصرف‌شده</span><strong>${formatMoney(budgetSpent)}</strong></div>
      <div class="h-3 overflow-hidden rounded-full bg-line"><div class="h-full rounded-full bg-gradient-to-l from-primary to-secondary ${progressWidth(budgetPercent)}"></div></div>
      <p class="mt-2 text-xs text-muted">از مجموع ${formatMoney(budgetTotal)} بودجه تعیین‌شده</p>
    `)}
  `;
}

export function transactionsPage() {
  return pageTitle('تراکنش‌ها', 'مدیریت دریافت‌ها و پرداخت‌ها') + card(`
    <div class="mb-3 flex items-center justify-between"><span class="text-sm text-muted">تراکنش‌های اخیر</span>${button('افزودن', { size: 'sm', iconName: 'plus' })}</div>
    ${transactionList(data.transactions)}
  `);
}

export function accountsPage() {
  return pageTitle('حساب‌های من', 'موجودی حساب‌ها و کیف پول‌ها') + data.accounts.map(account => card(`
    <div class="flex items-center gap-3"><span class="grid size-12 place-items-center rounded-2xl bg-primary/10 text-2xl text-primary">${icon(account.icon)}</span><div class="flex-1"><p class="font-bold">${escapeHtml(account.title)}</p><p class="text-xs text-muted">حساب فعال</p></div><strong class="text-sm">${formatMoney(account.balance)}</strong></div>
  `)).join('') + '<div class="mt-4">' + button('افزودن حساب جدید', { variant: 'outline', className: 'w-full' }) + '</div>';
}

export function reportsPage() {
  const incomePercent = data.income + data.expense ? data.income / (data.income + data.expense) * 100 : 0;
  return pageTitle('گزارش‌های مالی', 'خلاصه عملکرد مالی در بازه انتخابی') + card(`
    <div class="grid grid-cols-2 gap-3"><div class="rounded-xl bg-positive/10 p-3"><p class="text-xs text-muted">مجموع درآمد</p><p class="mt-1 font-display text-lg text-positive">${formatMoney(data.income)}</p></div><div class="rounded-xl bg-negative/10 p-3"><p class="text-xs text-muted">مجموع هزینه</p><p class="mt-1 font-display text-lg text-negative">${formatMoney(data.expense)}</p></div></div>
    <div class="mt-5 space-y-3"><div class="flex justify-between text-sm"><span>مانده خالص</span><strong>${formatMoney(data.income - data.expense)}</strong></div><div class="h-4 overflow-hidden rounded-full bg-line"><div class="h-full rounded-full bg-primary ${progressWidth(incomePercent)}"></div></div><p class="text-xs text-muted">نمودار نمایشی؛ داده‌ها در نسخه اولیه نمونه هستند.</p></div>
  `);
}

export function budgetsPage() {
  return pageTitle('بودجه‌بندی', 'میزان مصرف هر دسته را دنبال کن') + data.budgets.map(item => {
    const percent = Math.min(100, item.spent / item.limit * 100);
    return card(`
      <div class="mb-3 flex items-center justify-between"><strong>${escapeHtml(item.title)}</strong><span class="text-xs text-muted">${formatNumber(Math.round(percent))}٪</span></div>
      <div class="h-3 overflow-hidden rounded-full bg-line"><div class="h-full rounded-full ${percent > 85 ? 'bg-cta' : 'bg-gradient-to-l from-primary to-secondary'} ${progressWidth(percent)}"></div></div>
      <div class="mt-2 flex justify-between text-xs text-muted"><span>مصرف: ${formatMoney(item.spent)}</span><span>سقف: ${formatMoney(item.limit)}</span></div>
    `);
  }).join('');
}

export function placeholderPage(route) {
  const titles = {
    categories: ['دسته‌بندی‌ها', 'مدیریت دسته‌های درآمد و هزینه'],
    goals: ['اهداف مالی', 'برای هدف‌های مالی خود برنامه‌ریزی کن'],
    settings: ['تنظیمات', 'تنظیمات عمومی برنامه']
  };
  const [title, subtitle] = titles[route] ?? ['صفحه در دست ساخت', 'این بخش در فاز بعدی تکمیل می‌شود.'];
  return pageTitle(title, subtitle) + card('<div class="py-8 text-center"><i class="ph ph-squares-four text-5xl text-primary"></i><p class="mt-3 text-sm text-muted">ساختار این صفحه آماده توسعه است.</p></div>');
}