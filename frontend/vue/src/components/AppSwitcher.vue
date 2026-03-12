<template>
  <select class="app-switcher" :value="currentId" @change="handleChange">
    <option v-for="a in apps" :key="a.id" :value="a.id">{{ a.name }}</option>
  </select>
</template>

<script setup>
import appsConfig from '../../../apps.config.json'

const apps = appsConfig.apps

const currentId = apps.find(
  (a) => a.url === `${location.protocol}//${location.host}`
)?.id ?? 'vue'

function handleChange(e) {
  const app = apps.find((a) => a.id === e.target.value)
  if (app) window.location.href = app.url
}
</script>
