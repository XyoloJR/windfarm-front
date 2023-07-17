<script setup lang="ts">

const emit = defineEmits<{
  (e: 'refresh'): void
}>()
</script>

<template>
  <div>
    tree view
    <button @click="emit('refresh')">refresh data</button>
  </div>
</template>

<style scoped>

</style>
