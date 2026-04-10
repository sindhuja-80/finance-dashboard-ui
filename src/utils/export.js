export function toCSV(transactions) {
  const headers = ['id','date','amount','category','type','note']
  const rows = transactions.map(t => headers.map(h => JSON.stringify(t[h] ?? '')).join(','))
  return [headers.join(','), ...rows].join('\n')
}

export function download(filename, content, type='text/csv'){
  const blob = new Blob([content], { type })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}
