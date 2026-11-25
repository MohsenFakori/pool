import { escapeHtml, icon } from '../app/utils.js';

export const button = (label, { variant = 'primary', size = 'md', type = 'button', iconName = '', attrs = '' } = {}) => {
  const variants = {
    primary: 'bg-gradient-to-l from-primary to-secondary text-white shadow-[0_4px_0_rgba(0,0,0,0.18)]',
    cta: 'bg-cta text-white shadow-[0_4px_0_rgba(0,0,0,0.18)]',
    outline: 'bg-transparent text-primary ring-2 ring-inset ring-primary',
    ghost: 'bg-transparent text-app-text'
  };
  const sizes = {
    sm: 'min-h-9 rounded-xl px-3 text-sm',
    md: 'min-h-11 rounded-2xl px-5 text-sm',
    lg: 'min-h-14 rounded-2xl px-7 text-base'
  };
  return `<button type="${type}" class="inline-flex items-center justify-center gap-2 font-display transition active:translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${sizes[size]}" ${attrs}>${iconName ? icon(iconName) : ''}<span>${escapeHtml(label)}</span></button>`;
};

export const card = content =>
  `<section class="rounded-card border-2 border-line bg-surface p-4 shadow-card">${content}</section>`;

export const field = ({ label, name, type = 'text', placeholder = '', value = '', hint = '' }) =>
  `<label class="block space-y-2"><span class="text-sm font-medium">${escapeHtml(label)}</span><input name="${escapeHtml(name)}" type="${escapeHtml(type)}" value="${escapeHtml(value)}" placeholder="${escapeHtml(placeholder)}" class="h-12 w-full rounded-xl border-2 border-line bg-surface px-4 text-sm text-app-text outline-none transition placeholder:text-muted focus:border-primary focus:ring-4 focus:ring-primary/15"><span class="block text-xs text-muted">${escapeHtml(hint)}</span></label>`;

export const pageTitle = (title, subtitle = '') =>
  `<div class="mb-5"><h1 class="font-display text-2xl">${escapeHtml(title)}</h1>${subtitle ? `<p class="mt-1 text-sm text-muted">${escapeHtml(subtitle)}</p>` : ''}</div>`;