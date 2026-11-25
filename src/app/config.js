export const APP_CONFIG = Object.freeze({
  name: 'پول',
  defaultPassword: '123456',
  currency: 'تومان',
  locale: 'fa-IR',
  database: { name: 'pool-finance', version: 1 },
  storageKeys: { session: 'pool.active-session', welcome: 'pool.welcome-seen' },
  avatarOptions: ['user-circle', 'smiley', 'cat', 'dog', 'rocket', 'leaf', 'crown', 'ghost'],
  navigation: {
    bottom: [
      { label: 'خانه', route: 'dashboard', icon: 'house' },
      { label: 'تراکنش‌ها', route: 'transactions', icon: 'arrows-left-right' },
      { label: 'حساب‌ها', route: 'accounts', icon: 'wallet' },
      { label: 'گزارش‌ها', route: 'reports', icon: 'chart-line' },
      { label: 'بودجه', route: 'budgets', icon: 'chart-pie-slice' }
    ],
    drawer: [
      { label: 'داشبورد', route: 'dashboard', icon: 'squares-four' },
      { label: 'تراکنش‌ها', route: 'transactions', icon: 'arrows-left-right' },
      { label: 'حساب‌های من', route: 'accounts', icon: 'wallet' },
      { label: 'دسته‌بندی‌ها', route: 'categories', icon: 'shapes' },
      { label: 'گزارش‌های مالی', route: 'reports', icon: 'chart-line' },
      { label: 'بودجه‌بندی', route: 'budgets', icon: 'chart-pie-slice' },
      { label: 'اهداف مالی', route: 'goals', icon: 'target' },
      { label: 'تنظیمات', route: 'settings', icon: 'gear-six' }
    ]
  }
});