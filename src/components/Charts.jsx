import React from 'react'
import { Line, Pie } from 'react-chartjs-2'
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

export default function Charts({ transactions }) {
  const sorted = [...transactions].sort((a, b) => new Date(a.date) - new Date(b.date))
  const labels = sorted.map(t => t.date)
  const dataVals = sorted.map(t => t.amount)

  // category breakdown
  const byCat = {}
  transactions.forEach(t => { const c = t.category || 'Other'; byCat[c] = (byCat[c] || 0) + Math.abs(t.amount) })

  const pieData = {
    labels: Object.keys(byCat),
    datasets: [{ data: Object.values(byCat), backgroundColor: ['#4f46e5','#06b6d4','#f97316','#ef4444','#10b981'] }]
  }

  const lineData = { labels, datasets: [{ label: 'Amount', data: dataVals, borderColor: '#4f46e5', tension: 0.3, fill: false }] }

  return (
    <div className="charts">
      <div className="chart-card">
        <h4>Balance Trend</h4>
        <Line data={lineData} />
      </div>
      <div className="chart-card">
        <h4>Spending Breakdown</h4>
        <Pie data={pieData} />
      </div>
    </div>
  )
}
