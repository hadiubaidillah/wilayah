import React from 'react'
import appsConfig from '../../../apps.config.json'

export default function AppSwitcher() {
  const currentId = appsConfig.apps.find(
    (a) => a.url === `${location.protocol}//${location.host}`
  )?.id ?? 'react'

  function handleChange(e) {
    const app = appsConfig.apps.find((a) => a.id === e.target.value)
    if (app) window.location.href = app.url
  }

  return (
    <select className="app-switcher" value={currentId} onChange={handleChange}>
      {appsConfig.apps.map((a) => (
        <option key={a.id} value={a.id}>{a.name}</option>
      ))}
    </select>
  )
}
