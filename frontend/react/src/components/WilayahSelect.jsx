import React from 'react'

export default function WilayahSelect({ label, placeholder, options, value, onChange, disabled }) {
  return (
    <div className="select-group">
      <label>{label}</label>
      <select value={value} onChange={(e) => onChange(e.target.value)} disabled={disabled}>
        <option value="">{placeholder}</option>
        {options.map((item) => (
          <option key={item.kode} value={item.kode}>
            {item.nama}
          </option>
        ))}
      </select>
    </div>
  )
}
