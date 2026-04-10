# Finance Dashboard UI

Simple Vite + React frontend demonstrating a finance dashboard UI for the assignment.

Features:
- Summary cards (balance, income, expenses)
- Line chart (balance trend) and pie chart (spending breakdown)
- Transactions list with search and type filter
- Role toggle (Viewer / Admin) — Admin can add, edit, delete transactions
- Dark mode toggle
- Export transactions to CSV / JSON
- Local storage persistence

Setup

1. Install dependencies

```bash
npm install
```

2. Run development server

```bash
npm run dev
```

Files
- [src/App.jsx](src/App.jsx) — main app
- [src/components](src/components) — UI components
- [src/data/mockData.js](src/data/mockData.js) — sample data

Notes
- This is a frontend-only demo using mock data. You can extend it with a mock API or add CSV export.
 - This is a frontend-only demo using mock data. Enhancements included: edit/delete modal, CSV/JSON export, and dark mode.
