import React, { useState, useMemo } from 'react'

export default function Transactions({ transactions, onAdd, role, onEdit, onDelete }) {
  const [q, setQ] = useState('')
  const [type, setType] = useState('all')

  const filtered = useMemo(() => transactions.filter(t => {
    if (type !== 'all' && t.type !== type) return false
    if (!q) return true
    const s = q.toLowerCase()
    return t.category.toLowerCase().includes(s) || String(t.amount).includes(s) || (t.note||'').toLowerCase().includes(s)
  }), [transactions, q, type])

  return (
    <div className="transactions">
      <div className="transactions-header">
        <div>
          <input placeholder="Search" value={q} onChange={e => setQ(e.target.value)} />
          <select value={type} onChange={e => setType(e.target.value)}>
            <option value="all">All</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
        <div>
          {role === 'admin' && (
            <>
              <button onClick={() => onAdd()}>Add Transaction</button>
            </>
          )}
        </div>
      </div>

      <table>
        <thead>
          <tr><th>Date</th><th>Note</th><th>Category</th><th>Amount</th><th>Type</th></tr>
        </thead>
        <tbody>
          {filtered.length === 0 && (
            <tr><td colSpan="5" className="empty">No transactions</td></tr>
          )}
          {filtered.map(t => (
            <tr key={t.id}>
              <td>{t.date}</td>
              <td>{t.note}</td>
              <td>{t.category}</td>
              <td className={t.amount < 0 ? 'neg' : 'pos'}>{t.amount}</td>
              <td>{t.type}</td>
              <td>
                {role === 'admin' && (
                  <div className="row-actions">
                    <button className="link" onClick={() => onEdit(t)}>Edit</button>
                    <button className="link muted" onClick={() => onDelete(t.id)}>Delete</button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
