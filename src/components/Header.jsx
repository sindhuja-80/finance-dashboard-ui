import React from 'react'

export default function Header({ children }) {
  return (
    <header className="header">
      <div className="brand">Finance Dashboard</div>
      <div className="header-right">{children}</div>
    </header>
  )
}
