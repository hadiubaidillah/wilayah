<template>
  <div ref="mapEl" class="map-container" />
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import L from 'leaflet'

const props = defineProps({ wilayah: Object })
const mapEl = ref(null)
let mapInstance = null
let layer = null

onMounted(() => {
  mapInstance = L.map(mapEl.value, { center: [-2.5, 118], zoom: 5 })
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(mapInstance)
})

watch(() => props.wilayah, (w) => {
  if (!w || !mapInstance) return
  if (layer) mapInstance.removeLayer(layer)

  try {
    const coords = JSON.parse(w.path)
    const latlngs = Array.isArray(coords[0]) && Array.isArray(coords[0][0])
      ? coords.map((ring) => ring.map(([lat, lng]) => [lat, lng]))
      : coords.map(([lat, lng]) => [lat, lng])

    layer = L.polygon(latlngs, {
      color: '#3b82f6', fillColor: '#93c5fd', fillOpacity: 0.4, weight: 2,
    }).addTo(mapInstance)
    mapInstance.fitBounds(layer.getBounds())
  } catch {
    mapInstance.setView([w.lat, w.lng], 10)
    layer = L.marker([w.lat, w.lng]).addTo(mapInstance).bindPopup(w.nama).openPopup()
  }
})
</script>
