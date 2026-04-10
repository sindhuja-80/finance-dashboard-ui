import React from 'react'

export default function Insights({ transactions }) {
  if (!transactions || transactions.length === 0) return <div className="insights empty">No insights</div>

  const byCat = {}
  transactions.forEach(t => { const c = t.category || 'Other'; byCat[c] = (byCat[c] || 0) + Math.abs(t.amount) })
  const highest = Object.entries(byCat).sort((a,b)=>b[1]-a[1])[0]

  const months = {}
  transactions.forEach(t => { const m = t.date.slice(0,7); months[m] = (months[m] || 0) + t.amount })
  const monthKeys = Object.keys(months).sort()
  const monthlyComparison = monthKeys.length >= 2 ? `${monthKeys[monthKeys.length-1]} vs ${monthKeys[monthKeys.length-2]}` : 'N/A'

  return (
    <div className="insights">
      <div className="insight-card">
        <div className="insight-title">Highest Spending Category</div>
        <div className="insight-value">{highest ? `${highest[0]} ($${highest[1].toFixed(2)})` : '—'}</div>
      </div>
      <div className="insight-card">
        <div className="insight-title">Monthly Comparison</div>
        <div className="insight-value">{monthlyComparison}</div>
      </div>
    </div>
  )
}
