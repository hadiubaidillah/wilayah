<template>
  <div class="wilayah-info" v-if="data">
    <h3>{{ levelLabel }}: {{ data.nama }}</h3>
    <table>
      <tbody>
        <tr><td>{{ t.infoCode }}</td><td>{{ data.kode }}</td></tr>
        <tr v-if="data.luas">
          <td>{{ t.infoArea }}</td>
          <td>{{ data.luas.toLocaleString() }} {{ t.infoAreaUnit }}</td>
        </tr>
        <tr v-if="data.penduduk">
          <td>{{ t.infoPopulation }}</td>
          <td>{{ data.penduduk.toLocaleString() }} {{ t.infoPopulationUnit }}</td>
        </tr>
        <tr><td>{{ t.infoCoord }}</td><td>{{ data.lat }}, {{ data.lng }}</td></tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  data: Object,
  t: Object,
})

const levelLabel = computed(() => props.t.levelLabel[props.data?.kode?.length] || 'Wilayah')
</script>
