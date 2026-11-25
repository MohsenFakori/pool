import { APP_CONFIG } from './config.js';

export const createId = () => globalThis.crypto?.randomUUID?.() ?? `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;

export const formatMoney = (value, currency = APP_CONFIG.currency) =>
  `${new Intl.NumberFormat(APP_CONFIG.locale).format(Number(value || 0))} ${currency}`;

export const formatNumber = value =>
  new Intl.NumberFormat(APP_CONFIG.locale).format(Number(value || 0));

export const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, char => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
})[char]);

export const icon = (name, classes = 'text-xl') =>
  `<i aria-hidden="true" class="ph ph-${escapeHtml(name)} ${classes}"></i>`;

export const todayLabel = () =>
  new Intl.DateTimeFormat(APP_CONFIG.locale, { weekday: 'long', day: 'numeric', month: 'long' }).format(new Date());