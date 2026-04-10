import React from 'react'

function Card({ title, value }) {
  return (
    <div className="card">
      <div className="card-title">{title}</div>
      <div className="card-value">{value}</div>
    </div>
  )
}

export default function SummaryCards({ summary }) {
  return (
    <div className="cards">
      <Card title="Total Balance" value={`$${summary.balance.toFixed(2)}`} />
      <Card title="Income" value={`$${summary.income.toFixed(2)}`} />
      <Card title="Expenses" value={`$${summary.expense.toFixed(2)}`} />
    </div>
  )
}
