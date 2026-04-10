import React from 'react'

export default function RoleToggle({ role, setRole }) {
  return (
    <div className="role-toggle">
      <label>Role: </label>
      <select value={role} onChange={e => setRole(e.target.value)}>
        <option value="viewer">Viewer</option>
        <option value="admin">Admin</option>
      </select>
    </div>
  )
}
