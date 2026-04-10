import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import SummaryCards from './components/SummaryCards'
import Charts from './components/Charts'
import Transactions from './components/Transactions'
import Insights from './components/Insights'
import RoleToggle from './components/RoleToggle'
import { initialTransactions, computeSummary } from './data/mockData'
import TransactionForm from './components/TransactionForm'
import { toCSV, download } from './utils/export'

function uid() { return Math.floor(Math.random()*100000) }

export default function App() {
  const [role, setRole] = useState(() => localStorage.getItem('role') || 'viewer')
  const [transactions, setTransactions] = useState(() => {
    try { const raw = localStorage.getItem('tx'); return raw ? JSON.parse(raw) : initialTransactions }
    catch { return initialTransactions }
  })
  const [dark, setDark] = useState(() => localStorage.getItem('dark') === '1')
  const [editing, setEditing] = useState(null)
  const [formOpen, setFormOpen] = useState(false)

  useEffect(() => { localStorage.setItem('tx', JSON.stringify(transactions)) }, [transactions])
  useEffect(() => { localStorage.setItem('role', role) }, [role])
  useEffect(() => { localStorage.setItem('dark', dark ? '1' : '0'); document.documentElement.dataset.theme = dark ? 'dark' : 'light' }, [dark])

  const summary = computeSummary(transactions)

  const handleAdd = () => {
    setEditing(null)
    setFormOpen(true)
  }

  const handleSave = (t) => {
    if (t.id) {
      setTransactions(prev => prev.map(p => p.id === t.id ? t : p))
    } else {
      t.id = uid();
      setTransactions(prev => [t, ...prev])
    }
  }

  const handleEdit = (t) => { setEditing(t); setFormOpen(true) }

  const handleDelete = (id) => { setTransactions(prev => prev.filter(p => p.id !== id)) }

  const handleExportCSV = () => { const csv = toCSV(transactions); download('transactions.csv', csv, 'text/csv') }
  const handleExportJSON = () => { download('transactions.json', JSON.stringify(transactions, null, 2), 'application/json') }

  return (
    <div className="app">
      <Header>
        <RoleToggle role={role} setRole={setRole} />
      </Header>

      <main className="container">
        <SummaryCards summary={summary} />

        <section className="grid">
          <div className="left">
            <Charts transactions={transactions} />
            <Insights transactions={transactions} />
          </div>
          <div className="right">
            <div style={{display:'flex',gap:8,marginBottom:8}}>
              <button onClick={handleExportCSV}>Export CSV</button>
              <button onClick={handleExportJSON}>Export JSON</button>
              <label style={{marginLeft:'auto'}}>Dark
                <input type="checkbox" checked={dark} onChange={e => setDark(e.target.checked)} />
              </label>
            </div>
            <Transactions transactions={transactions} onAdd={handleAdd} role={role} onEdit={handleEdit} onDelete={handleDelete} />
          </div>
        </section>
      </main>
      <TransactionForm open={formOpen} onClose={() => setFormOpen(false)} onSave={handleSave} tx={editing} />
    </div>
  )
}
