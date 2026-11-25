import { authService } from '../services/auth-service.js';
import { currentRoute, navigate, onRouteChange } from './router.js';
import { welcomePage, loginPage, registerPage } from '../pages/auth-pages.js';
import { dashboardPage, transactionsPage, accountsPage, reportsPage, budgetsPage, placeholderPage } from '../pages/finance-pages.js';
import { profilePage } from '../pages/profile-page.js';
import { renderShell, bindShellEvents } from '../components/shell.js';
import { APP_CONFIG } from './config.js';

const root = document.querySelector('#app');
let authState = null;
let profile = null;
let rendering = false;

function showError(message) {
  const target = root.querySelector('#auth-error');
  if (!target) return;
  target.textContent = message;
  target.classList.remove('hidden');
}

async function render() {
  if (rendering) return;
  rendering = true;
  try {
    authState = await authService.currentUser();
    if (!authService.hasSeenWelcome() && !authState) {
      root.innerHTML = welcomePage();
      root.querySelector('#welcome-continue')?.addEventListener('click', () => {
        authService.markWelcomeSeen();
        navigate('login');
        render();
      });
      return;
    }

    if (!authState) {
      const route = currentRoute();
      root.innerHTML = route === 'register' ? registerPage() : loginPage();
      root.querySelector('#go-register')?.addEventListener('click', () => { navigate('register'); render(); });
      root.querySelector('#go-login')?.addEventListener('click', () => { navigate('login'); render(); });
      root.querySelector('#login-form')?.addEventListener('submit', async event => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        try {
          await authService.login(String(form.get('username') || ''), String(form.get('password') || ''));
          navigate('dashboard');
          await render();
        } catch (error) { showError(error.message); }
      });
      root.querySelector('#register-form')?.addEventListener('submit', async event => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        try {
          await authService.register(String(form.get('username') || ''));
          navigate('dashboard');
          await render();
        } catch (error) { showError(error.message); }
      });
      return;
    }

    const route = currentRoute();
    profile = await authService.getProfile(authState.user.id);
    const context = { user: authState.user, profile };
    const pages = {
      dashboard: () => dashboardPage(context),
      transactions: transactionsPage,
      accounts: accountsPage,
      reports: reportsPage,
      budgets: budgetsPage,
      profile: () => profilePage(context),
      categories: () => placeholderPage('categories'),
      goals: () => placeholderPage('goals'),
      settings: () => placeholderPage('settings')
    };
    const content = (pages[route] ?? pages.dashboard)();
    root.innerHTML = renderShell({ ...context, route, content });
    bindShellEvents(root);

    root.querySelector('#profile-form')?.addEventListener('submit', async event => {
      event.preventDefault();
      const form = new FormData(event.currentTarget);
      const selectedAvatar = root.querySelector('[data-avatar].ring-2')?.dataset.avatar
        ?? root.querySelector('[data-avatar].border-primary')?.dataset.avatar
        ?? profile.avatar;
      profile = { ...profile, displayName: String(form.get('displayName') || '').trim() || authState.user.username, avatar: selectedAvatar };
      await authService.saveProfile(profile);
      const message = root.querySelector('#profile-message');
      message.textContent = 'تغییرات ذخیره شد.';
      message.classList.remove('hidden');
    });

    root.querySelectorAll('[data-avatar]').forEach(element => element.addEventListener('click', () => {
      root.querySelectorAll('[data-avatar]').forEach(button => button.classList.remove('border-primary', 'bg-primary/10', 'text-primary'));
      element.classList.add('border-primary', 'bg-primary/10', 'text-primary');
      root.querySelector('#selected-avatar').innerHTML = element.innerHTML;
    }));

    root.querySelector('#logout-button')?.addEventListener('click', async () => {
      await authService.logout();
      profile = null;
      navigate('login');
      await render();
    });
  } finally {
    rendering = false;
  }
}

export async function bootstrap() {
  try {
    await render();
    onRouteChange(() => render());
  } catch (error) {
    root.innerHTML = '<main class="mx-auto flex min-h-screen w-[390px] max-w-full items-center justify-center bg-app-bg p-6 text-center"><p class="text-negative">راه‌اندازی برنامه ناموفق بود. لطفاً صفحه را تازه‌سازی کنید.</p></main>';
    console.error('Pool bootstrap error:', error);
  }
}