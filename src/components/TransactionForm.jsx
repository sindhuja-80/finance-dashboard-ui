import React, { useState, useEffect } from 'react'

export default function TransactionForm({ open, onClose, onSave, tx }) {
  const [form, setForm] = useState({ date: '', amount: 0, category: '', type: 'expense', note: '' })

  useEffect(() => { if (tx) setForm(tx); else setForm({ date: new Date().toISOString().slice(0,10), amount: 0, category: '', type: 'expense', note: '' }) }, [tx, open])

  if (!open) return null

  return (
    <div className="modal-over">
      <div className="modal">
        <h3>{tx ? 'Edit' : 'Add'} Transaction</h3>
        <label>Date</label>
        <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
        <label>Amount</label>
        <input type="number" value={form.amount} onChange={e => setForm({ ...form, amount: Number(e.target.value) })} />
        <label>Category</label>
        <input value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} />
        <label>Type</label>
        <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
        <label>Note</label>
        <input value={form.note} onChange={e => setForm({ ...form, note: e.target.value })} />

        <div className="modal-actions">
          <button onClick={() => { onSave(form); onClose() }}>Save</button>
          <button className="muted" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  )
}
