<template>
  <div class="select-group">
    <label>{{ label }}</label>
    <select :value="modelValue" @change="$emit('update:modelValue', $event.target.value)" :disabled="disabled">
      <option value="">{{ placeholder }}</option>
      <option v-for="item in options" :key="item.kode" :value="item.kode">
        {{ item.nama }}
      </option>
    </select>
  </div>
</template>

<script setup>
defineProps({
  label: String,
  placeholder: String,
  options: { type: Array, default: () => [] },
  modelValue: String,
  disabled: Boolean,
})
defineEmits(['update:modelValue'])
</script>
