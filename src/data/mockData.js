export const initialTransactions = [
  { id: 1, date: '2026-04-05', amount: 1200, category: 'Salary', type: 'income', note: 'April salary' },
  { id: 2, date: '2026-04-07', amount: -45.5, category: 'Groceries', type: 'expense', note: 'Supermarket' },
  { id: 3, date: '2026-04-10', amount: -120, category: 'Transport', type: 'expense', note: 'Monthly pass' },
  { id: 4, date: '2026-03-28', amount: -60, category: 'Dining', type: 'expense', note: 'Dinner out' },
  { id: 5, date: '2026-03-20', amount: 200, category: 'Freelance', type: 'income', note: 'Project' }
]

export function computeSummary(transactions) {
  const income = transactions.filter(t => t.amount > 0).reduce((s, t) => s + t.amount, 0)
  const expense = transactions.filter(t => t.amount < 0).reduce((s, t) => s + t.amount, 0)
  const balance = income + expense
  return { income, expense: Math.abs(expense), balance }
}
