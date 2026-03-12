import React from 'react'
import appsConfig from '../../../apps.config.json'
import { getBackendUrl, setBackendUrl } from '../api/wilayah'

export default function BackendSwitcher() {
  const currentUrl = getBackendUrl()
  const currentId = appsConfig.backends.find((b) => b.url === currentUrl)?.id
    ?? appsConfig.backends[0].id

  function handleChange(e) {
    const backend = appsConfig.backends.find((b) => b.id === e.target.value)
    if (backend) {
      setBackendUrl(backend.url)
      window.location.reload()
    }
  }

  return (
    <select className="backend-switcher" value={currentId} onChange={handleChange}>
      {appsConfig.backends.map((b) => (
        <option key={b.id} value={b.id}>{b.name}</option>
      ))}
    </select>
  )
}
