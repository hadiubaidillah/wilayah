<template>
  <select class="backend-switcher" :value="currentId" @change="handleChange">
    <option v-for="b in backends" :key="b.id" :value="b.id">{{ b.name }}</option>
  </select>
</template>

<script setup>
import appsConfig from '../../../apps.config.json'
import { getBackendUrl, setBackendUrl } from '../api/wilayah'

const backends = appsConfig.backends
const currentUrl = getBackendUrl()
const currentId = backends.find((b) => b.url === currentUrl)?.id ?? backends[0].id

function handleChange(e) {
  const backend = backends.find((b) => b.id === e.target.value)
  if (backend) {
    setBackendUrl(backend.url)
    window.location.reload()
  }
}
</script>
