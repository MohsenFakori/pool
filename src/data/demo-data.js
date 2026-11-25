// داده‌های نمایشی متمرکز؛ با اتصال API این ماژول با پاسخ سرویس جایگزین می‌شود.
export const DASHBOARD_FIXTURE = Object.freeze({
  balance: 42850000,
  income: 12500000,
  expense: 7340000,
  accounts: [
    { id: 'account-cash', title: 'کیف پول نقدی', type: 'cash', balance: 8500000, icon: 'money' },
    { id: 'account-bank', title: 'حساب بانکی', type: 'bank', balance: 34350000, icon: 'bank' }
  ],
  transactions: [
    { id: 'tx-1', title: 'حقوق ماهانه', category: 'درآمد', amount: 12500000, direction: 'income', date: 'امروز', icon: 'wallet' },
    { id: 'tx-2', title: 'خرید روزانه', category: 'خرید', amount: 850000, direction: 'expense', date: 'امروز', icon: 'shopping-bag' },
    { id: 'tx-3', title: 'قبض و خدمات', category: 'قبوض', amount: 420000, direction: 'expense', date: 'دیروز', icon: 'receipt' }
  ],
  budgets: [
    { id: 'budget-food', title: 'خوراک و خرید', spent: 3200000, limit: 5000000 },
    { id: 'budget-home', title: 'خانه و قبوض', spent: 1800000, limit: 3000000 },
    { id: 'budget-fun', title: 'تفریح', spent: 900000, limit: 1500000 }
  ]
});